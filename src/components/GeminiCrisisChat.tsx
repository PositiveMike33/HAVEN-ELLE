import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Volume2, 
  Sparkles, 
  Mic, 
  MicOff, 
  RefreshCw, 
  Heart, 
  StopCircle,
  Award,
  BookOpen,
  ChevronRight,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Lock,
  Users,
  Layers,
  MessageCircle
} from 'lucide-react';
import { CompanionMemoryService } from '../utils/companionMemory';
import { CompanionMemoryProfile } from '../types';
import { TherapeuticTeamPerspective } from './TherapeuticTeamPerspective';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export const GeminiCrisisChat: React.FC = () => {
  const [chatViewMode, setChatViewMode] = useState<'team' | 'sanctuary'>('team');
  const [profile, setProfile] = useState<CompanionMemoryProfile>(() => CompanionMemoryService.getProfile());
  const [showMemoryJournal, setShowMemoryJournal] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const prof = CompanionMemoryService.getProfile();
    return [
      {
        id: 'msg-init',
        role: 'model',
        content: `Bonjour. Je suis HAVEN-ELLE, votre sanctuaire d'écoute et votre alliée fidèle (Niveau ${prof.relationshipLevel} : ${prof.relationshipTitle}). Je me rappelle de nos échanges et de votre force. Vous êtes en sécurité ici. Comment vous sentez-vous en cet instant ?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [urgencyMode, setUrgencyMode] = useState<'normal' | 'critical' | 'legal' | 'fast'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [liveVoiceActive, setLiveVoiceActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setProfile(customEvent.detail);
      } else {
        setProfile(CompanionMemoryService.getProfile());
      }
    };
    window.addEventListener('haven-resilience-updated', handleUpdate);
    return () => window.removeEventListener('haven-resilience-updated', handleUpdate);
  }, []);

  const quickPrompts = [
    { label: "💖 Ma Liste de Valeurs & Regard Bienveillant (Cycle 1)", prompt: "Aide-moi à identifier mes valeurs fondamentales (dignité, respect, douceur, sécurité) et à transformer mon regard intérieur pour me voir avec la plus haute bienveillance.", urgency: 'normal' },
    { label: "🕊️ Consultation Thérapeutique Holistique", prompt: "Je traverse une épreuve douloureuse et un blocage intérieur. Guide-moi avec le protocole thérapeutique intégral (Corps, Cœur, Esprit).", urgency: 'critical' },
    { label: "🌿 Régulation Somatique & Panique", prompt: "Je ressens une vive angoisse et des tensions physiques intenses, guide-moi avec une micro-action somatique immédiate.", urgency: 'fast' },
    { label: "💔 Guérison Enfant Intérieur", prompt: "Je ressens de la culpabilité et un profond sentiment de rejet/honte, aide-moi à déconstruire cette croyance racine.", urgency: 'normal' },
    { label: "⚖️ Protection & Sécurité Réelle", prompt: "Quelles sont les démarches d'urgence (ordonnance de protection, sac de départ, numéros utiles) pour me protéger ?", urgency: 'legal' },
  ];

  const handleSendMessage = async (textToSend?: string, specificUrgency?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text || loading) return;

    const urgency = (specificUrgency || urgencyMode) as 'normal' | 'critical' | 'legal' | 'fast';

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setLoading(true);

    try {
      const companionContext = CompanionMemoryService.getSystemContextPrompt();

      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          urgency,
          systemPrompt: companionContext,
        }),
      });

      const data = await response.json();
      const aiReply = data.reply || "Je suis à vos côtés. Votre sécurité est la priorité absolue.";

      const aiMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'model',
        content: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Record interaction in companion memory
      const updatedProfile = CompanionMemoryService.recordInteraction(
        text.slice(0, 40) + '...',
        urgency === 'critical' ? 'Urgence / Alerte' : urgency === 'fast' ? 'Besoin d\'apaisement' : 'Échange constructif',
        aiReply.slice(0, 60) + '...'
      );
      setProfile(updatedProfile);

      if (isSpeaking || liveVoiceActive) {
        speakText(aiReply);
      }
    } catch (err) {
      const fallbackMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'model',
        content: "Je suis avec vous. Si vous êtes en danger physique immédiat, appelez sans attendre le 17 (Police) ou envoyez un SMS au 114.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setLoading(false);
    }
  };

  const speakText = async (text: string) => {
    try {
      const res = await fetch('/api/gemini/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();

      if (data.audioBase64) {
        const audio = new Audio(`data:${data.mimeType};base64,${data.audioBase64}`);
        audio.play();
        return;
      }
    } catch {
      // Fallback
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const toggleLiveVoice = () => {
    if (liveVoiceActive) {
      setLiveVoiceActive(false);
      stopSpeaking();
    } else {
      setLiveVoiceActive(true);
      setIsSpeaking(true);
      speakText("Mode vocal d'urgence activé. Je vous écoute avec bienveillance.");
    }
  };

  return (
    <div className="space-y-4">
      {/* Top View Mode Switcher Header */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E2D9] p-2 sm:p-2.5 flex items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setChatViewMode('team')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              chatViewMode === 'team'
                ? 'bg-[#5A5A40] text-white shadow-xs'
                : 'text-[#5A5A40] hover:bg-[#F8F7F2]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Team Perspective (3 Agents Côte à Côte)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#8A9A5B] text-white font-mono">
              3
            </span>
          </button>

          <button
            type="button"
            onClick={() => setChatViewMode('sanctuary')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              chatViewMode === 'sanctuary'
                ? 'bg-[#5A5A40] text-white shadow-xs'
                : 'text-[#5A5A40] hover:bg-[#F8F7F2]'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Sanctuaire Solo (HAVEN-ELLE)</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 pr-2 text-xs text-[#8E8B82]">
          <span className="w-2 h-2 rounded-full bg-[#8A9A5B] animate-pulse" />
          <span>Loop Therapy • ToT 3 Branches • Healing Atoms</span>
        </div>
      </div>

      {/* Main View Content */}
      {chatViewMode === 'team' ? (
        <TherapeuticTeamPerspective onBackToSanctuary={() => setChatViewMode('sanctuary')} />
      ) : (
        <div id="gemini-crisis-chat" className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] shadow-sm overflow-hidden flex flex-col h-[660px]">
          {/* Chat Top Bar */}
          <div className="p-4 bg-[#5A5A40] text-white flex items-center justify-between border-b border-[#CED6C1]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#8A9A5B]/30 border border-[#8A9A5B]/40 flex items-center justify-center text-[#E5EAD9]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-tight font-serif-natural">HAVEN-ELLE • Intelligence Thérapeutique Méta-Orchestrée</h3>
                  <span className="w-2 h-2 rounded-full bg-[#8A9A5B] animate-pulse" />
                </div>
                <p className="text-[11px] text-[#E5EAD9]/80 flex items-center gap-1.5">
                  <span className="bg-white/15 px-1.5 py-0.2 rounded font-medium text-[10px]">ToT × AoT × Loop</span>
                  <span>{profile.relationshipTitle}</span> • 
                  <span className="text-[#CED6C1]">{profile.resiliencePoints} pts de résilience</span>
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMemoryJournal(true)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-[#F8F7F2] flex items-center gap-1.5 transition-colors"
                title="Consulter le journal de votre relation et mémoire"
              >
                <BookOpen className="w-3.5 h-3.5" /> Journal d'Alliance
              </button>

              <button
                onClick={toggleLiveVoice}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  liveVoiceActive
                    ? 'bg-[#A64D4D] text-white animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 text-[#F8F7F2]'
                }`}
                title="Conversation Vocale Mains Libres"
              >
                {liveVoiceActive ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                {liveVoiceActive ? 'Voix Active' : 'Voix (Live)'}
              </button>

              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="p-2 rounded-xl bg-white/10 text-[#F5E6E0] hover:bg-white/20"
                  title="Arrêter la voix"
                >
                  <StopCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

      {/* Quick Prompt Chips */}
      <div className="p-2.5 bg-[#F8F7F2] border-b border-[#E5E2D9] flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-semibold text-[#5A5A40] whitespace-nowrap pl-1">
          Aide rapide :
        </span>
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => {
              setUrgencyMode(qp.urgency as any);
              handleSendMessage(qp.prompt, qp.urgency);
            }}
            className="px-2.5 py-1 bg-white hover:bg-[#F5F2ED] text-[#3E3B39] border border-[#E5E2D9] rounded-lg text-xs font-medium whitespace-nowrap transition-colors shadow-2xs"
          >
            {qp.label}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8F7F2]/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'model' && (
              <div className="w-7 h-7 rounded-lg bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[82%] rounded-2xl p-3.5 text-xs md:text-sm leading-relaxed shadow-2xs ${
                msg.role === 'user'
                  ? 'bg-[#5A5A40] text-white rounded-tr-xs'
                  : 'bg-white border border-[#E5E2D9] text-[#3E3B39] rounded-tl-xs'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>

              <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/5 text-[10px] text-[#8E8B82]">
                <span>{msg.timestamp}</span>
                {msg.role === 'model' && (
                  <button
                    onClick={() => speakText(msg.content)}
                    className="hover:text-[#3E3B39] flex items-center gap-1 text-[#8A9A5B] font-medium"
                    title="Écouter avec la voix apaisante"
                  >
                    <Volume2 className="w-3 h-3 text-[#8A9A5B]" /> Écouter
                  </button>
                )}
              </div>
            </div>

            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-[#3E3B39] text-[#F8F7F2] flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-[#5A5A40] text-xs p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#8A9A5B]" />
            <span>HAVEN-ELLE formule sa réponse avec attention et empathie...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Live Voice Active Bar */}
      {liveVoiceActive && (
        <div className="px-4 py-2 bg-[#E5EAD9] border-t border-[#CED6C1] flex items-center justify-between text-xs text-[#5A5A40]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1 items-end h-4">
              <span className="w-1 bg-[#8A9A5B] h-2 animate-bounce" />
              <span className="w-1 bg-[#8A9A5B] h-4 animate-bounce delay-75" />
              <span className="w-1 bg-[#8A9A5B] h-3 animate-bounce delay-150" />
              <span className="w-1 bg-[#8A9A5B] h-4 animate-bounce" />
            </div>
            <span className="font-semibold">Microphone actif • Écoute continue</span>
          </div>
          <span className="text-[11px] text-[#5A5A40]/80">Parlez naturellement</span>
        </div>
      )}

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white border-t border-[#E5E2D9] flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Exprimez-vous librement en toute sécurité..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading}
          className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E2D9] text-xs md:text-sm text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] bg-white"
        />

        <button
          type="submit"
          disabled={!inputValue.trim() || loading}
          className="p-2.5 bg-[#5A5A40] hover:bg-[#4a4a35] disabled:opacity-40 text-white rounded-xl transition-colors shrink-0 shadow-2xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  )}

      {/* Memory Journal Modal */}
      {showMemoryJournal && (
        <div className="fixed inset-0 bg-[#3E3B39]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E2D9] max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E2D9]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#8A9A5B]">Votre Alliance Évolutive</span>
                  <h3 className="text-base font-bold text-[#3E3B39] font-serif-natural">
                    Journal de Compagnonnage HAVEN-ELLE
                  </h3>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-[#E5EAD9] text-[#5A5A40] text-xs font-semibold">
                Niveau {profile.relationshipLevel}
              </span>
            </div>

            <div className="py-4 space-y-4">
              <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-[#E5E2D9] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#5A5A40] block">Stade de la relation</span>
                  <p className="text-sm font-bold text-[#3E3B39] font-serif-natural mt-0.5">
                    « {profile.relationshipTitle} »
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#8E8B82] block">Points de Résilience</span>
                  <span className="text-base font-bold text-[#8A9A5B] font-mono">
                    {profile.resiliencePoints} pts
                  </span>
                </div>
              </div>

              {/* Notes from Haven */}
              <div>
                <h4 className="text-xs font-bold text-[#5A5A40] mb-2 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#A64D4D]" /> Mots d'encouragement de HAVEN-ELLE :
                </h4>
                <div className="space-y-2">
                  {profile.userContext.notesFromHaven?.map((note, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#E5EAD9]/40 border border-[#CED6C1] text-xs text-[#3E3B39] leading-relaxed">
                      💬 {note}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Victories */}
              <div>
                <h4 className="text-xs font-bold text-[#5A5A40] mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9A5B]" /> Victoires & Étapes Franchies :
                </h4>
                <div className="space-y-1.5">
                  {profile.userContext.keyVictories?.map((victory, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white border border-[#E5E2D9] text-xs text-[#3E3B39] flex items-start gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8A9A5B] shrink-0 mt-0.5" />
                      <span>{victory}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#F8F7F2] rounded-xl border border-[#E5E2D9] text-[11px] text-[#8E8B82] flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                <span>Ce journal reste chiffré sur votre appareil et évolue à chacune de vos victoires.</span>
              </div>
            </div>

            <button
              onClick={() => setShowMemoryJournal(false)}
              className="w-full py-2.5 bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-semibold rounded-xl transition-colors shadow-2xs"
            >
              Fermer le Journal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
