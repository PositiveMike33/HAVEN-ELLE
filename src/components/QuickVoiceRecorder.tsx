import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Square,
  Play,
  Pause,
  Lock,
  ShieldCheck,
  Download,
  Trash2,
  FileAudio,
  Volume2,
  VolumeX,
  Sparkles,
  Eye,
  EyeOff,
  Clock,
  AlertTriangle,
  FilePlus,
  Radio,
  CheckCircle2,
  KeyRound,
  Fingerprint,
  RotateCcw,
  Tag,
} from 'lucide-react';
import { VoiceRecordingEvidence, IncidentRecord } from '../types';
import { CryptoVault } from '../utils/cryptoVault';
import { StorageService } from '../utils/storage';

interface QuickVoiceRecorderProps {
  incidents: IncidentRecord[];
  onUpdateIncidents?: (incidents: IncidentRecord[]) => void;
  onRecordingSaved?: (recording: VoiceRecordingEvidence) => void;
}

export const QuickVoiceRecorder: React.FC<QuickVoiceRecorderProps> = ({
  incidents,
  onUpdateIncidents,
  onRecordingSaved,
}) => {
  // State
  const [recordings, setRecordings] = useState<VoiceRecordingEvidence[]>(() =>
    StorageService.getVoiceRecordings()
  );
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [recordingCategory, setRecordingCategory] = useState<
    'ambient_sound' | 'testimony' | 'emergency_audio' | 'threat_capture'
  >('testimony');
  const [recordingTitle, setRecordingTitle] = useState('');
  const [recordingNotes, setRecordingNotes] = useState('');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('');
  const [stealthMode, setStealthMode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Playback state
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState<number>(0);
  const [playbackDuration, setPlaybackDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [decryptedAudioUrl, setDecryptedAudioUrl] = useState<string | null>(null);

  // Refs for media recording & audio analysis
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (decryptedAudioUrl) {
        URL.revokeObjectURL(decryptedAudioUrl);
      }
    };
  }, [decryptedAudioUrl]);

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start live audio capture
  const startRecording = async () => {
    try {
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      // Audio analysis for real-time waveform
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = audioCtx;
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        analyserRef.current = analyser;
        const source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateLevel = () => {
          if (analyserRef.current) {
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const average = sum / dataArray.length;
            setAudioLevel(Math.min(100, Math.round((average / 128) * 100)));
            animFrameRef.current = requestAnimationFrame(updateLevel);
          }
        };
        updateLevel();
      } catch (err) {
        console.warn('AudioContext analyzer not supported in this environment:', err);
      }

      // Pick supported mime type
      const mimeTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/ogg;codecs=opus',
        '',
      ];
      let selectedMime = '';
      for (const mime of mimeTypes) {
        if (!mime || MediaRecorder.isTypeSupported(mime)) {
          selectedMime = mime;
          break;
        }
      }

      const options = selectedMime ? { mimeType: selectedMime } : undefined;
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(250); // Collect slice every 250ms
      setIsRecording(true);
      setIsPaused(false);
      setRecordingDuration(0);

      // Start duration counter
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error('Failed to access microphone:', err);
      alert('Impossible d\'accéder au microphone. Veuillez autoriser l\'accès audio dans votre navigateur.');
    }
  };

  // Stop recording and perform local AES-GCM encryption
  const stopRecording = async () => {
    if (!mediaRecorderRef.current || !isRecording) return;

    setIsProcessing(true);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const recorder = mediaRecorderRef.current;
    const finalDuration = Math.max(1, recordingDuration);

    recorder.onstop = async () => {
      try {
        const mimeType = recorder.mimeType || 'audio/webm';
        const rawAudioBlob = new Blob(audioChunksRef.current, { type: mimeType });

        // Local AES-256-GCM Encryption + SHA-256 Digital Checksum
        const { encryptedData, iv, checksumSha256, sizeBytes } =
          await CryptoVault.encryptAudioBlob(rawAudioBlob);

        const now = new Date();
        const categoryLabels = {
          ambient_sound: 'Son Ambiant Discret',
          testimony: 'Témoignage Vocal',
          emergency_audio: 'Enregistrement d\'Urgence',
          threat_capture: 'Enregistrement Menaces / Faits',
        };

        const newRecording: VoiceRecordingEvidence = {
          id: `rec-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
          title:
            recordingTitle.trim() ||
            `${categoryLabels[recordingCategory]} du ${now.toLocaleDateString('fr-FR')}`,
          date: now.toISOString().split('T')[0],
          time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          durationSeconds: finalDuration,
          encryptedData,
          iv,
          checksumSha256,
          mimeType,
          fileSizeBytes: sizeBytes,
          category: recordingCategory,
          notes: recordingNotes.trim() || undefined,
          isEncrypted: true,
          incidentId: selectedIncidentId || undefined,
          createdAt: now.toISOString(),
        };

        // Save in local vault
        const updatedRecordings = [newRecording, ...recordings];
        setRecordings(updatedRecordings);
        StorageService.saveVoiceRecordings(updatedRecordings);

        // If attached to an incident, update incident record too
        if (selectedIncidentId && onUpdateIncidents) {
          const updatedIncidents = incidents.map((inc) => {
            if (inc.id === selectedIncidentId) {
              const existingVoice = inc.voiceRecordings || [];
              return {
                ...inc,
                voiceRecordings: [newRecording, ...existingVoice],
              };
            }
            return inc;
          });
          onUpdateIncidents(updatedIncidents);
          StorageService.saveIncidents(updatedIncidents);
        }

        if (onRecordingSaved) {
          onRecordingSaved(newRecording);
        }

        // Reset form
        setRecordingTitle('');
        setRecordingNotes('');
        setSelectedIncidentId('');
        setStealthMode(false);
        setFeedbackMsg('Enregistrement scellé et crypté avec succès (AES-256) !');
        setTimeout(() => setFeedbackMsg(null), 4000);
      } catch (err) {
        console.error('Error encrypting audio recording:', err);
        alert('Erreur lors du cryptage de l\'enregistrement vocal.');
      } finally {
        setIsProcessing(false);
        setIsRecording(false);
        setIsPaused(false);
        setRecordingDuration(0);
        setAudioLevel(0);

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
        }
      }
    };

    recorder.stop();
  };

  // Cancel recording without saving
  const cancelRecording = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    setIsRecording(false);
    setIsPaused(false);
    setRecordingDuration(0);
    setAudioLevel(0);
    setStealthMode(false);
  };

  // Play decrypted recording in memory
  const handlePlayRecording = async (rec: VoiceRecordingEvidence) => {
    if (playingId === rec.id && audioElementRef.current) {
      if (audioElementRef.current.paused) {
        audioElementRef.current.play();
      } else {
        audioElementRef.current.pause();
      }
      return;
    }

    try {
      // Decrypt in memory
      const decryptedBlob = await CryptoVault.decryptAudioBlob(
        rec.encryptedData,
        rec.iv,
        rec.mimeType
      );

      if (decryptedAudioUrl) {
        URL.revokeObjectURL(decryptedAudioUrl);
      }

      const tempUrl = URL.createObjectURL(decryptedBlob);
      setDecryptedAudioUrl(tempUrl);
      setPlayingId(rec.id);
      setPlaybackProgress(0);

      const audio = new Audio(tempUrl);
      audio.playbackRate = playbackSpeed;
      audioElementRef.current = audio;

      audio.onloadedmetadata = () => {
        setPlaybackDuration(audio.duration || rec.durationSeconds);
      };

      audio.ontimeupdate = () => {
        setPlaybackProgress(audio.currentTime);
      };

      audio.onended = () => {
        setPlayingId(null);
        setPlaybackProgress(0);
      };

      audio.play();
    } catch (err) {
      console.error('Failed to decrypt and play audio recording:', err);
      alert('Échec du déchiffrement local du fichier audio.');
    }
  };

  const handleStopPlayback = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }
    setPlayingId(null);
    setPlaybackProgress(0);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (audioElementRef.current) {
      audioElementRef.current.playbackRate = speed;
    }
  };

  // Export decrypted audio file to disk
  const handleDownloadDecrypted = async (rec: VoiceRecordingEvidence) => {
    try {
      const decryptedBlob = await CryptoVault.decryptAudioBlob(
        rec.encryptedData,
        rec.iv,
        rec.mimeType
      );
      const url = URL.createObjectURL(decryptedBlob);
      const a = document.createElement('a');
      a.href = url;
      const extension = rec.mimeType.includes('mp4') ? 'mp4' : rec.mimeType.includes('ogg') ? 'ogg' : 'webm';
      a.download = `HAVEN_Preuve_Audio_${rec.date}_${rec.id}.${extension}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading audio:', err);
      alert('Impossible d\'exporter le fichier audio.');
    }
  };

  // Export encrypted legal certificate (Tamper-proof JSON with SHA-256 seal)
  const handleDownloadLegalCertificate = (rec: VoiceRecordingEvidence) => {
    const certificate = {
      header: 'CERTIFICAT NUMÉRIQUE DE PREUVE VOCALE - HAVEN-ELLE',
      legalDisclaimer:
        'Fichier audio chiffré localement selon le standard AES-256-GCM avec empreinte cryptographique SHA-256 infalsifiable.',
      recordingMetadata: {
        id: rec.id,
        title: rec.title,
        recordedDate: rec.date,
        recordedTime: rec.time,
        durationSeconds: rec.durationSeconds,
        category: rec.category,
        notes: rec.notes,
        mimeType: rec.mimeType,
        sizeBytes: rec.fileSizeBytes,
      },
      cryptographicProof: {
        algorithm: 'AES-256-GCM',
        sha256Seal: rec.checksumSha256,
        iv: rec.iv,
        encryptedPayload: rec.encryptedData,
      },
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(certificate, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificat_Legal_Audio_${rec.date}_${rec.checksumSha256.substring(0, 8)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Delete recording
  const handleDeleteRecording = (id: string) => {
    if (confirm('Supprimer définitivement cet enregistrement vocal chiffré du coffre-fort ?')) {
      const updated = recordings.filter((r) => r.id !== id);
      setRecordings(updated);
      StorageService.saveVoiceRecordings(updated);
      if (playingId === id) {
        handleStopPlayback();
      }
    }
  };

  return (
    <div id="quick-voice-recorder-hub" className="space-y-6">
      {/* Stealth Mode Overlay when active */}
      {stealthMode && isRecording && (
        <div
          onClick={() => setStealthMode(false)}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-6 cursor-pointer select-none text-white/40 font-mono text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A64D4D] animate-ping" />
            <span className="text-white/60">Écran furtif actif (Toucher pour réafficher)</span>
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-white/30 tracking-widest">
              {formatTime(recordingDuration)}
            </p>
            <p className="text-[10px] text-white/20">Enregistrement audio sécurisé en cours...</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              stopRecording();
            }}
            className="px-6 py-2.5 rounded-full bg-[#A64D4D]/40 text-white border border-white/10 hover:bg-[#A64D4D] transition-colors"
          >
            Arrêter & Cryptage Immédiat
          </button>
        </div>
      )}

      {/* Main Voice Capture Dashboard Card */}
      <div className="bg-[#FFFFFF]/95 backdrop-blur-md rounded-3xl border border-[#CED6C1] p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E2D9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center shadow-2xs">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A9A5B]">
                  Module Audio Sécurisé
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#5A5A40]/10 text-[#5A5A40] text-[10px] font-bold flex items-center gap-1 border border-[#CED6C1]">
                  <Lock className="w-2.5 h-2.5" /> Chiffrement AES-256 Local
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#3E3B39]">
                Enregistreur Vocal & Sons Ambiants
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#8E8B82]">
            <span className="flex items-center gap-1 bg-[#F8F7F2] px-2.5 py-1 rounded-xl border border-[#E5E2D9]">
              <Fingerprint className="w-3.5 h-3.5 text-[#8A9A5B]" />
              Sceau SHA-256 Inviolable
            </span>
          </div>
        </div>

        {/* Feedback Message */}
        {feedbackMsg && (
          <div className="p-3 bg-[#E5EAD9] text-[#5A5A40] text-xs font-semibold rounded-2xl flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#8A9A5B]" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Active Recording State vs. Standby Trigger State */}
        {isRecording ? (
          <div className="bg-[#1E1E1E] text-white p-6 rounded-3xl border border-white/10 space-y-5 animate-in fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-[#A64D4D] animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#ff9999]">
                  Enregistrement en direct ({recordingCategory})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStealthMode(true)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-[#E5EAD9] flex items-center gap-1.5 transition-colors border border-white/10"
                  title="Passer en écran noir discret"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Mode Furtif / Écran Noir</span>
                </button>
              </div>
            </div>

            {/* Timer & Live Audio Waveform */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-bold tracking-tight text-white">
                  {formatTime(recordingDuration)}
                </span>
                <span className="text-xs text-[#CED6C1]">secondes enregistrées</span>
              </div>

              {/* Dynamic Sound Level Bar */}
              <div className="flex items-center gap-1 h-8 w-48 max-w-full">
                {[...Array(16)].map((_, i) => {
                  const barHeight = Math.max(
                    15,
                    Math.min(100, (audioLevel / 100) * (Math.sin((i / 16) * Math.PI) * 120))
                  );
                  return (
                    <div
                      key={i}
                      className="w-2 rounded-full transition-all duration-75"
                      style={{
                        height: `${barHeight}%`,
                        backgroundColor:
                          barHeight > 70 ? '#A64D4D' : barHeight > 40 ? '#8A9A5B' : '#CED6C1',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Quick in-progress tags & notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <input
                type="text"
                placeholder="Titre facultatif (Ex: Menaces verbales du soir...)"
                value={recordingTitle}
                onChange={(e) => setRecordingTitle(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-white/10 text-white placeholder-white/40 border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
              />

              <select
                value={selectedIncidentId}
                onChange={(e) => setSelectedIncidentId(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl bg-[#2A2A2A] text-white border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
              >
                <option value="">Lier à un fait du journal (facultatif)</option>
                {incidents.map((inc) => (
                  <option key={inc.id} value={inc.id}>
                    {inc.date} - {inc.description.substring(0, 35)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Control buttons */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={cancelRecording}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white/80 transition-colors"
              >
                Annuler sans enregistrer
              </button>

              <button
                type="button"
                onClick={stopRecording}
                disabled={isProcessing}
                className="px-5 py-2.5 rounded-xl bg-[#8A9A5B] hover:bg-[#78884d] text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>{isProcessing ? 'Chiffrement AES-256...' : 'Terminer & Sceller au Coffre'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Standby State with Preset Launchers */
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                {
                  id: 'testimony',
                  label: 'Témoignage Personnel',
                  desc: 'Raconter et documenter les faits subis',
                  icon: Mic,
                },
                {
                  id: 'ambient_sound',
                  label: 'Sons Ambiants Discrets',
                  desc: 'Capturer l\'ambiance sonore d\'un conflit',
                  icon: Radio,
                },
                {
                  id: 'threat_capture',
                  label: 'Menaces & Faits Graves',
                  desc: 'Enregistrer une escalade de violence',
                  icon: AlertTriangle,
                },
                {
                  id: 'emergency_audio',
                  label: 'Urgence Immédiate',
                  desc: 'Déclenchement instantané à l\'aveugle',
                  icon: Sparkles,
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setRecordingCategory(item.id as any);
                    startRecording();
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 group hover:shadow-xs ${
                    recordingCategory === item.id
                      ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#3E3B39]'
                      : 'bg-[#F8F7F2] border-[#E5E2D9] text-[#5A5A40] hover:bg-[#E5EAD9]/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-white text-[#5A5A40] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                      <item.icon className="w-4 h-4 text-[#8A9A5B]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#8A9A5B] bg-white px-2 py-0.5 rounded-md border border-[#CED6C1]">
                      1-Clic
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#3E3B39]">{item.label}</h4>
                    <p className="text-[10px] text-[#8E8B82] leading-tight mt-0.5">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Privacy Promise Banner */}
            <div className="p-3 bg-[#F8F7F2] rounded-2xl border border-[#E5E2D9] text-[11px] text-[#5A5A40] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#8A9A5B] shrink-0" />
                <span>
                  <strong>Confidentialité garantie :</strong> Le son est crypté avec la clé AES-256 de votre appareil avant toute sauvegarde. Aucun tiers n'a accès à vos audios.
                </span>
              </div>
              <button
                type="button"
                onClick={startRecording}
                className="px-4 py-2 bg-[#5A5A40] hover:bg-[#484833] text-white rounded-xl text-xs font-bold shrink-0 transition-colors flex items-center gap-1.5 justify-center"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Démarrer un enregistrement</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* List of Encrypted Voice Recordings in the Vault */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
            <FileAudio className="w-4 h-4 text-[#8A9A5B]" />
            Témoignages & Preuves Vocales Chiffrées ({recordings.length})
          </h4>
          <span className="text-[11px] text-[#8E8B82]">
            Déchiffrement instantané en mémoire
          </span>
        </div>

        {recordings.length === 0 ? (
          <div className="bg-[#FFFFFF]/80 backdrop-blur-md rounded-2xl p-6 border border-[#E5E2D9] text-center space-y-2">
            <FileAudio className="w-8 h-8 text-[#8E8B82] mx-auto opacity-50" />
            <p className="text-xs font-bold text-[#3E3B39]">Aucun enregistrement vocal dans le coffre</p>
            <p className="text-[11px] text-[#8E8B82] max-w-md mx-auto">
              Utilisez les boutons ci-dessus pour capturer discrètement vos témoignages, conversations ou sons ambiants.
            </p>
          </div>
        ) : (
          recordings.map((rec) => {
            const isThisPlaying = playingId === rec.id;
            const categoryLabels = {
              ambient_sound: 'Son Ambiant',
              testimony: 'Témoignage',
              emergency_audio: 'Urgence',
              threat_capture: 'Menaces / Faits',
            };

            return (
              <div
                key={rec.id}
                className={`bg-[#FFFFFF]/95 backdrop-blur-md rounded-2xl border transition-all p-4.5 space-y-3 shadow-xs ${
                  isThisPlaying ? 'border-[#8A9A5B] ring-1 ring-[#8A9A5B]/30' : 'border-[#E5E2D9]'
                }`}
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E5EAD9] text-[#5A5A40] text-[10px] font-bold border border-[#CED6C1]">
                      {categoryLabels[rec.category]}
                    </span>
                    <span className="text-xs font-bold text-[#3E3B39]">{rec.title}</span>
                    <span className="text-[10px] text-[#8E8B82]">
                      ({formatTime(rec.durationSeconds)})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-[#8E8B82]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#8A9A5B]" /> {rec.date} à {rec.time}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteRecording(rec.id)}
                      className="text-[#8E8B82] hover:text-[#A64D4D] p-1 transition-colors ml-1"
                      title="Supprimer définitivement"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Player Bar if playing or available */}
                <div className="p-3 bg-[#F8F7F2] rounded-xl border border-[#E5E2D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => handlePlayRecording(rec)}
                      className="w-8 h-8 rounded-full bg-[#5A5A40] hover:bg-[#484833] text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs"
                      title={isThisPlaying ? 'Pause' : 'Écouter (Déchiffrement mémoire)'}
                    >
                      {isThisPlaying ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>

                    <div className="flex flex-col flex-1 sm:w-64">
                      <div className="flex justify-between text-[10px] text-[#5A5A40] font-mono">
                        <span>{isThisPlaying ? formatTime(playbackProgress) : '00:00'}</span>
                        <span>{formatTime(rec.durationSeconds)}</span>
                      </div>
                      <div className="w-full bg-[#CED6C1] h-1.5 rounded-full overflow-hidden mt-1">
                        <div
                          className="bg-[#8A9A5B] h-full transition-all duration-100"
                          style={{
                            width: isThisPlaying
                              ? `${(playbackProgress / (playbackDuration || rec.durationSeconds)) * 100}%`
                              : '0%',
                          }}
                        />
                      </div>
                    </div>

                    {isThisPlaying && (
                      <div className="flex items-center gap-1">
                        {[1, 1.25, 1.5].map((spd) => (
                          <button
                            key={spd}
                            type="button"
                            onClick={() => handleSpeedChange(spd)}
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              playbackSpeed === spd
                                ? 'bg-[#5A5A40] text-white'
                                : 'bg-white text-[#5A5A40] border border-[#E5E2D9]'
                            }`}
                          >
                            {spd}x
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions & Export */}
                  <div className="flex items-center gap-1.5 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleDownloadDecrypted(rec)}
                      className="px-2.5 py-1.5 bg-white border border-[#E5E2D9] hover:bg-[#F5F2ED] text-[#5A5A40] rounded-xl text-[11px] font-semibold transition-colors flex items-center gap-1"
                      title="Télécharger le fichier audio déchiffré"
                    >
                      <Download className="w-3 h-3 text-[#8A9A5B]" />
                      <span>Audio</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownloadLegalCertificate(rec)}
                      className="px-2.5 py-1.5 bg-[#E5EAD9] hover:bg-[#dbe2ce] text-[#5A5A40] rounded-xl text-[11px] font-bold transition-colors flex items-center gap-1"
                      title="Télécharger le certificat juridique avec empreinte SHA-256"
                    >
                      <ShieldCheck className="w-3 h-3 text-[#8A9A5B]" />
                      <span>Certificat Juridique</span>
                    </button>
                  </div>
                </div>

                {/* Cryptographic hash seal badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#8E8B82] pt-1">
                  <div className="flex items-center gap-1.5 font-mono truncate max-w-md">
                    <span className="text-[#8A9A5B] font-bold">SHA-256 :</span>
                    <span className="truncate">{rec.checksumSha256}</span>
                  </div>
                  <span className="text-[#5A5A40] font-medium">
                    {Math.round((rec.fileSizeBytes || 0) / 1024)} Ko • Chiffré AES-GCM
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
