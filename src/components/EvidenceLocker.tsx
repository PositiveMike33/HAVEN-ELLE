import React, { useState } from 'react';
import { 
  FolderLock, FilePlus, ShieldAlert, Upload, Eye, FileText, 
  Download, CheckCircle, Trash2, Calendar, Lock, Sparkles, RefreshCw,
  Mic, FileAudio, ShieldCheck, Fingerprint, Play, Pause, Volume2
} from 'lucide-react';
import { IncidentRecord, VoiceRecordingEvidence } from '../types';
import { StorageService } from '../utils/storage';
import { QuickVoiceRecorder } from './QuickVoiceRecorder';
import { CryptoVault } from '../utils/cryptoVault';

interface EvidenceLockerProps {
  incidents: IncidentRecord[];
  onUpdateIncidents: (incidents: IncidentRecord[]) => void;
}

export const EvidenceLocker: React.FC<EvidenceLockerProps> = ({ incidents, onUpdateIncidents }) => {
  const [activeSubTab, setActiveSubTab] = useState<'all_incidents' | 'voice_recorder'>('all_incidents');
  const [showAddModal, setShowAddModal] = useState(false);
  const [generatingStatement, setGeneratingStatement] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<{ title: string; content: string } | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState<{
    date: string;
    time: string;
    type: 'physical' | 'psychological' | 'financial' | 'stalking_tech' | 'threat' | 'voice_recording';
    severity: 1 | 2 | 3 | 4 | 5;
    description: string;
    location: string;
    witnesses: string;
  }>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: 'psychological',
    severity: 3,
    description: '',
    location: '',
    witnesses: '',
  });

  const handleAddIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description.trim()) return;

    const newRecord: IncidentRecord = {
      id: `inc-${Date.now().toString(36)}`,
      ...form,
      evidenceFiles: [],
      hasReportedToPolice: false,
      createdAt: new Date().toISOString(),
    };

    const updated = [newRecord, ...incidents];
    onUpdateIncidents(updated);
    StorageService.saveIncidents(updated);
    setShowAddModal(false);
    setForm({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'psychological',
      severity: 3,
      description: '',
      location: '',
      witnesses: '',
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Supprimer cette entrée du coffre-fort ?')) {
      const updated = incidents.filter((i) => i.id !== id);
      onUpdateIncidents(updated);
      StorageService.saveIncidents(updated);
    }
  };

  const handlePlayIncidentAudio = async (voiceRec: VoiceRecordingEvidence) => {
    if (playingAudioId === voiceRec.id) {
      setPlayingAudioId(null);
      return;
    }

    try {
      if (currentAudioUrl) {
        URL.revokeObjectURL(currentAudioUrl);
      }
      const decryptedBlob = await CryptoVault.decryptAudioBlob(
        voiceRec.encryptedData,
        voiceRec.iv,
        voiceRec.mimeType
      );
      const url = URL.createObjectURL(decryptedBlob);
      setCurrentAudioUrl(url);
      setPlayingAudioId(voiceRec.id);
      const audio = new Audio(url);
      audio.onended = () => setPlayingAudioId(null);
      audio.play();
    } catch (err) {
      console.error('Error playing incident voice note:', err);
      alert('Impossible de déchiffrer la note vocale.');
    }
  };

  const handleGenerateOfficialStatement = async (anonymized: boolean = true) => {
    setGeneratingStatement(true);
    try {
      const assessment = StorageService.getAssessmentProfile();
      const preferredName = assessment.personalInfo.preferredName || 'Personne Protégée HAVEN-ELLE';
      const declaredName = anonymized ? 'Personne Déclarante (Identité Sécurisée sous Numéro Confidentiel HAVEN)' : preferredName;

      const res = await fetch('/api/docs/generate-statement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incidents,
          victimName: declaredName,
          summaryNotes: assessment.childrenInfo.hasChildren
            ? `Demande urgente de protection pour la personne déclarante et ${assessment.childrenInfo.childrenCount || assessment.childrenInfo.children.length} enfant(s) à charge.`
            : 'Demande de protection individuelle et d\'ordonnance d\'éloignement (procédure confidentielle).',
        }),
      });

      const data = await res.json();
      setGeneratedDoc({
        title: data.documentTitle || 'Declaration_Officielle.docx',
        content: data.content || '',
      });
    } catch (err) {
      console.error('Error generating statement doc:', err);
    } finally {
      setGeneratingStatement(false);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'physical': return { label: 'Violences Physiques', color: 'bg-[#F5E6E0] text-[#A64D4D] border border-[#A64D4D]/20' };
      case 'psychological': return { label: 'Violences Psychologiques / Emprise', color: 'bg-[#E5EAD9] text-[#5A5A40] border border-[#CED6C1]' };
      case 'financial': return { label: 'Violence Économique', color: 'bg-[#F8F7F2] text-[#5A5A40] border border-[#E5E2D9]' };
      case 'stalking_tech': return { label: 'Surveillance / Cyberharcèlement', color: 'bg-[#E5EAD9] text-[#5A5A40] border border-[#CED6C1]' };
      case 'threat': return { label: 'Menaces de mort / Intimidation', color: 'bg-[#F5E6E0] text-[#A64D4D] border border-[#A64D4D]/20' };
      case 'voice_recording': return { label: 'Preuve Vocale / Témoignage Audio', color: 'bg-[#E5EAD9] text-[#5A5A40] border border-[#8A9A5B]/30' };
      default: return { label: type, color: 'bg-[#F8F7F2] text-[#5A5A40] border border-[#E5E2D9]' };
    }
  };

  return (
    <div id="evidence-locker-section" className="space-y-6">
      {/* Header with Sub-tabs */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center">
              <FolderLock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#3E3B39] font-serif-natural">
                Coffre-Fort Numérique & Journal des Preuves
              </h2>
              <p className="text-xs text-[#8E8B82]">
                Stockage sécurisé chiffré (AES-256) avec horodatage, empreinte SHA-256 et formalisation <strong className="text-[#5A5A40]">Google Docs</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleGenerateOfficialStatement}
              disabled={generatingStatement || incidents.length === 0}
              className="px-4 py-2.5 bg-[#5A5A40] hover:bg-[#4a4a35] disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              {generatingStatement ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-[#CED6C1]" />
              )}
              Dossier Officiel (Docs)
            </button>

            <button
              onClick={() => setActiveSubTab('voice_recorder')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeSubTab === 'voice_recorder'
                  ? 'bg-[#5A5A40] text-white'
                  : 'bg-[#E5EAD9] text-[#5A5A40] hover:bg-[#d8e0cc] border border-[#CED6C1]'
              }`}
            >
              <Mic className="w-4 h-4 text-[#8A9A5B]" />
              Enregistreur Vocal
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-[#8A9A5B] hover:bg-[#78884d] text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <FilePlus className="w-4 h-4" />
              Consigner un Fait
            </button>
          </div>
        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="flex items-center gap-2 pt-3 border-t border-[#E5E2D9]">
          <button
            type="button"
            onClick={() => setActiveSubTab('all_incidents')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'all_incidents'
                ? 'bg-[#5A5A40] text-white shadow-2xs'
                : 'text-[#8E8B82] hover:text-[#3E3B39] hover:bg-[#F8F7F2]'
            }`}
          >
            📋 Chronologie des Faits ({incidents.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('voice_recorder')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeSubTab === 'voice_recorder'
                ? 'bg-[#5A5A40] text-white shadow-2xs'
                : 'text-[#8E8B82] hover:text-[#3E3B39] hover:bg-[#F8F7F2]'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-[#8A9A5B]" />
            🎙️ Témoignages Vocaux & Sons Chiffrés
          </button>
        </div>
      </div>

      {/* Generated Doc Modal */}
      {generatedDoc && (
        <div className="bg-[#5A5A40] text-white rounded-3xl p-6 shadow-xl border border-[#CED6C1]/20 animate-in fade-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#E5EAD9]" />
              <h3 className="text-sm font-bold text-white font-serif-natural">{generatedDoc.title}</h3>
            </div>
            <button
              onClick={() => setGeneratedDoc(null)}
              className="text-xs text-[#E5EAD9] hover:text-white"
            >
              Fermer l'aperçu
            </button>
          </div>
          <pre className="p-4 bg-white/10 rounded-2xl text-xs text-[#F8F7F2] whitespace-pre-wrap font-sans leading-relaxed border border-white/15 max-h-80 overflow-y-auto">
            {generatedDoc.content}
          </pre>
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => {
                const blob = new Blob([generatedDoc.content], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = generatedDoc.title;
                a.click();
              }}
              className="px-4 py-2 bg-white text-[#5A5A40] font-bold text-xs rounded-xl hover:bg-[#F5F2ED] flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Télécharger / Exporter
            </button>
          </div>
        </div>
      )}

      {/* Subtab View: Voice Recorder Hub vs. Incidents Chronology */}
      {activeSubTab === 'voice_recorder' ? (
        <QuickVoiceRecorder
          incidents={incidents}
          onUpdateIncidents={onUpdateIncidents}
          onRecordingSaved={(newRec) => {
            // Also automatically create an incident item in chronology if requested
            const incidentRecord: IncidentRecord = {
              id: `inc-${newRec.id}`,
              date: newRec.date,
              time: newRec.time,
              type: 'voice_recording',
              severity: newRec.category === 'threat_capture' || newRec.category === 'emergency_audio' ? 4 : 3,
              description: `[Enregistrement Vocal Chiffré] ${newRec.title}${newRec.notes ? `\n\nNotes: ${newRec.notes}` : ''}`,
              location: 'Enregistrement audio certifié',
              witnesses: 'Sceau d\'intégrité cryptographique SHA-256 généré localement',
              evidenceFiles: [],
              voiceRecordings: [newRec],
              hasReportedToPolice: false,
              createdAt: newRec.createdAt,
            };
            const updated = [incidentRecord, ...incidents];
            onUpdateIncidents(updated);
            StorageService.saveIncidents(updated);
          }}
        />
      ) : (
        /* Incident List */
        <div className="space-y-3">
          {incidents.length === 0 ? (
            <div className="bg-[#FFFFFF] rounded-2xl p-8 border border-[#E5E2D9] text-center">
              <FolderLock className="w-10 h-10 text-[#8E8B82] mx-auto mb-2 opacity-50" />
              <h4 className="text-sm font-bold text-[#3E3B39] font-serif-natural">Aucun incident consigné</h4>
              <p className="text-xs text-[#8E8B82] mt-1">Consignez les faits avec dates et preuves pour constituer votre dossier juridique.</p>
            </div>
          ) : (
            incidents.map((inc) => {
              const typeMeta = getTypeLabel(inc.type);
              return (
                <div
                  key={inc.id}
                  className="bg-[#FFFFFF] rounded-2xl border border-[#E5E2D9] p-5 shadow-xs hover:border-[#CED6C1] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${typeMeta.color}`}>
                        {typeMeta.label}
                      </span>
                      <span className="text-xs font-semibold text-[#5A5A40]">
                        Gravité: {inc.severity}/5
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#8E8B82]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#8A9A5B]" /> {inc.date} à {inc.time}
                      </span>
                      <button
                        onClick={() => handleDelete(inc.id)}
                        className="text-[#8E8B82] hover:text-[#A64D4D] p-1 transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-[#3E3B39] leading-relaxed whitespace-pre-wrap mb-3">
                    {inc.description}
                  </p>

                  {/* Attached Voice Recordings */}
                  {inc.voiceRecordings && inc.voiceRecordings.length > 0 && (
                    <div className="mb-3 space-y-2">
                      {inc.voiceRecordings.map((vr) => (
                        <div
                          key={vr.id}
                          className="p-3 rounded-xl bg-[#E5EAD9]/40 border border-[#CED6C1] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handlePlayIncidentAudio(vr)}
                              className="w-7 h-7 rounded-full bg-[#5A5A40] text-white flex items-center justify-center shrink-0 hover:bg-[#484833] transition-colors"
                              title={playingAudioId === vr.id ? 'Pause' : 'Écouter l\'enregistrement'}
                            >
                              {playingAudioId === vr.id ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
                            </button>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <FileAudio className="w-3.5 h-3.5 text-[#8A9A5B]" />
                                <span className="text-xs font-bold text-[#3E3B39]">{vr.title}</span>
                              </div>
                              <p className="text-[10px] text-[#8E8B82]">
                                {Math.floor(vr.durationSeconds / 60)}m {vr.durationSeconds % 60}s • Scellé SHA-256
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <span className="text-[10px] bg-white px-2 py-0.5 rounded-md text-[#5A5A40] border border-[#CED6C1] flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" /> AES-256 Chiffré
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {(inc.location || inc.witnesses) && (
                    <div className="p-2.5 bg-[#F8F7F2] rounded-xl border border-[#E5E2D9] text-[11px] text-[#5A5A40] flex flex-wrap gap-4">
                      {inc.location && <span><strong className="text-[#3E3B39]">Lieu :</strong> {inc.location}</span>}
                      {inc.witnesses && <span><strong className="text-[#3E3B39]">Témoins / Contexte :</strong> {inc.witnesses}</span>}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Add Incident Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#3E3B39]/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E2D9] my-8">
            <h3 className="text-lg font-bold text-[#3E3B39] font-serif-natural mb-1">Consigner un Incident au Coffre-Fort</h3>
            <p className="text-xs text-[#8E8B82] mb-4">
              Chaque entrée est horodatée et archivée pour votre protection juridique.
            </p>

            <form onSubmit={handleAddIncident} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#5A5A40] block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5A5A40] block mb-1">Heure approximative</label>
                  <input
                    type="time"
                    required
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#5A5A40] block mb-1">Type de faits</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] text-[#3E3B39] bg-white focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
                  >
                    <option value="psychological">Violences Psychologiques / Emprise</option>
                    <option value="physical">Violences Physiques</option>
                    <option value="threat">Menaces / Intimidation</option>
                    <option value="financial">Violence Économique</option>
                    <option value="stalking_tech">Surveillance / Cyberharcèlement</option>
                    <option value="voice_recording">Témoignage Audio / Enregistrement</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5A5A40] block mb-1">Gravité (1 à 5)</label>
                  <select
                    value={form.severity}
                    onChange={(e) => setForm({ ...form, severity: Number(e.target.value) as any })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] text-[#3E3B39] bg-white focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
                  >
                    <option value="1">1 - Minime / Tension</option>
                    <option value="2">2 - Verbal / Insultes</option>
                    <option value="3">3 - Menaces graves / Objet cassé</option>
                    <option value="4">4 - Violence physique / Hématome</option>
                    <option value="5">5 - Danger de mort / Arme</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5A5A40] block mb-1">Description précise des faits *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Décrivez les mots prononcés, les gestes, le déroulement chronologique..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-3 text-xs rounded-xl border border-[#E5E2D9] text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#5A5A40] block mb-1">Lieu précis</label>
                  <input
                    type="text"
                    placeholder="Ex: Domicile, voiture..."
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5A5A40] block mb-1">Témoins éventuels</label>
                  <input
                    type="text"
                    placeholder="Ex: Voisins, enfants, collègue..."
                    value={form.witnesses}
                    onChange={(e) => setForm({ ...form, witnesses: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E5E2D9]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#5A5A40] hover:bg-[#F5F2ED] rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#5A5A40] hover:bg-[#4a4a35] rounded-xl"
                >
                  Enregistrer au Coffre-Fort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
