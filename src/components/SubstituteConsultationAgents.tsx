import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, User, Sparkles, Volume2, ShieldCheck, Heart, 
  Scale, FileText, Send, RefreshCw, StopCircle, ArrowRight, 
  CheckCircle2, Clock, Info, Copy, Check, MessageSquare, 
  ExternalLink, PhoneCall, AlertTriangle, ChevronRight, X
} from 'lucide-react';
import { SubstituteAgent } from '../types';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  agentId: 'psy_substitute' | 'legal_substitute';
}

const SUBSTITUTE_AGENTS: Record<'psy_substitute' | 'legal_substitute', SubstituteAgent> = {
  psy_substitute: {
    id: 'psy_substitute',
    name: 'Dr. Éléonore Vaneau (Substitut IA)',
    title: 'Psychologue Clinicienne & Thérapeute d\'Urgence',
    roleDescription: 'Soutien psychologique immédiat, décompression émotionnelle et préparation bienveillante de votre consultation avec le praticien humain.',
    specialties: ['Gestion de la sidération & angoisse', 'Déculpabilisation & Écoute active', 'Stabilisation émotionnelle 24/7', 'Préparation du récit de consultation'],
    avatarIcon: '🪷',
    accentColor: '#8A9A5B',
    statusBadge: 'Disponible immédiatement • Relais d\'attente',
    systemPrompt: `Vous êtes Dr. Éléonore Vaneau, une Psychologue Clinicienne et Thérapeute d'Urgence bienveillante, agissant comme agent substitut numérique immédiat sur la plateforme HAVEN-ELLE.
Votre mission :
1. Accueillir l'utilisatrice avec une empathie absolue, une douceur réconfortante et sans aucun jugement.
2. L'aider à surmonter l'anxiété, la peur, la culpabilité ou la sidération pendant qu'elle attend son rendez-vous avec un vrai professionnel de santé.
3. L'aider à formuler ses émotions et clarifier ce qu'elle souhaite aborder lors de sa future téléconsultation avec le psychologue ou médecin titulaire.
4. Si nécessaire, proposer une micro-action d'ancrage corporel (respiration, relâchement des épaules, verre d'eau).
5. Rappeler avec tact que vous êtes un agent substitut d'accompagnement immédiat et que sa sécurité physique prime (17/114 en cas de danger immédiat). Répondez en français chaleureux, posé et rassurant.`,
    initialGreeting: `Bonjour. Je suis le Dr. Éléonore, votre psychologue substitut disponible à tout instant. Je suis là pour vous écouter, vous aider à apaiser toute tension et préparer sereinement votre future consultation avec votre praticien. Comment vous sentez-vous en ce moment ?`,
    recommendedPrompts: [
      { label: "🌿 Calmer mon angoisse tout de suite", text: "Je ressens une boule d'angoisse et des tremblements intenses en attendant mon rendez-vous, comment me calmer ?" },
      { label: "💬 J'ai peur de ne pas savoir quoi dire au médecin", text: "J'ai peur de bégayer ou d'oublier des choses essentielles pendant ma future consultation. Comment me préparer ?" },
      { label: "💔 Culpabilité et doutes", text: "J'ai l'impression que tout est de ma faute et je doute d'avoir pris la bonne décision en demandant ce rendez-vous." },
      { label: "🕊️ Micro-exercice de retour au calme", text: "Guide-moi pas à pas à travers un exercice rapide de respiration pour retrouver mon ancrage." },
    ],
  },
  legal_substitute: {
    id: 'legal_substitute',
    name: 'Me Clara Delmas (Substitut IA)',
    title: 'Juriste Spécialisée & Avocate Conseil',
    roleDescription: 'Conseil juridique préliminaire, inventaire des pièces justificatives et clarification de vos droits avant votre rendez-vous formel avec l\'avocate.',
    specialties: ['Ordonnance de Protection (JAF)', 'Préservation des preuves & ITT', 'Droit de quitter le domicile en sécurité', 'Préparation du dossier d\'aide juridictionnelle'],
    avatarIcon: '⚖️',
    accentColor: '#5A7D7C',
    statusBadge: 'Disponible immédiatement • Relais juridique',
    systemPrompt: `Vous êtes Me Clara Delmas, Juriste Spécialisée et Avocate Conseil d'Urgence, intervenant en tant qu'agent substitut numérique sur la plateforme HAVEN-ELLE.
Votre mission :
1. Informer l'utilisatrice de ses droits stricts en droit français/européen concernant les violences conjugales, familiales ou le harcèlement.
2. Clarifier des notions clés : l'ordonnance de protection (délivrée sous 6 jours), l'absence d'obligation de rester au domicile en cas de violences (pas de faute pour départ pour violences), la valeur des certificats médicaux ITT et la conservation des preuves.
3. Aider l'utilisatrice à structurer chronologiquement ses faits et préparer sa liste de documents (pièces d'identité, justificatifs, captures d'écran, témoignages) pour son rendez-vous avec son avocate réelle.
4. Répondre avec rigueur juridique, clarté pédagogique et bienveillance rassurante. Rappelez que vos conseils préparent et complètent le travail de son avocat désigné.`,
    initialGreeting: `Bonjour. Je suis Me Clara Delmas, votre juriste substitut. En attendant votre rendez-vous avec votre avocat ou juriste, je peux répondre à toutes vos questions de droit, vérifier la conformité de vos preuves et lister les démarches prioritaires. Que souhaitez-vous clarifier ?`,
    recommendedPrompts: [
      { label: "📁 Quels documents préparer pour l'avocat ?", text: "Quels documents, attestations et preuves dois-je réunir pour mon premier rendez-vous avec l'avocate ?" },
      { label: "⚖️ Comment fonctionne l'Ordonnance de Protection ?", text: "Qu'est-ce que l'Ordonnance de Protection en urgence (Art. 515-9) et quels sont les délais pour l'obtenir ?" },
      { label: "🚪 Ai-je le droit de partir avec mes enfants ?", text: "Si je quitte le domicile avec mes enfants en raison des violences, est-ce considéré comme un abandon de domicile ou un enlèvement ?" },
      { label: "🏥 Comment obtenir une ITT ou un certificat ?", text: "Comment faire constater mes blessures ou mon retentissement psychologique aux Urgences Médico-Judiciaires (UMJ) ?" },
    ],
  },
};

export const SubstituteConsultationAgents: React.FC = () => {
  const [activeAgentId, setActiveAgentId] = useState<'psy_substitute' | 'legal_substitute'>('psy_substitute');
  const [messages, setMessages] = useState<Record<'psy_substitute' | 'legal_substitute', Message[]>>({
    psy_substitute: [
      {
        id: 'init-psy',
        role: 'model',
        content: SUBSTITUTE_AGENTS.psy_substitute.initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentId: 'psy_substitute',
      },
    ],
    legal_substitute: [
      {
        id: 'init-legal',
        role: 'model',
        content: SUBSTITUTE_AGENTS.legal_substitute.initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentId: 'legal_substitute',
      },
    ],
  });

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeAgent = SUBSTITUTE_AGENTS[activeAgentId];
  const currentChatMessages = messages[activeAgentId];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChatMessages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text || loading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agentId: activeAgentId,
    };

    setMessages((prev) => ({
      ...prev,
      [activeAgentId]: [...prev[activeAgentId], userMessage],
    }));

    if (!textToSend) setInputValue('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...currentChatMessages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          urgency: activeAgentId === 'legal_substitute' ? 'legal' : 'normal',
          systemPrompt: activeAgent.systemPrompt,
        }),
      });

      const data = await response.json();
      const reply = data.reply || (activeAgentId === 'psy_substitute' 
        ? "Je vous entends et je suis à vos côtés. Respirez lentement. Votre santé et votre paix d'esprit sont précieuses."
        : "Vos droits sont protégés par la loi. Notez chaque fait précis avec date et heure pour votre rendez-vous.");

      const aiReply: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'model',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentId: activeAgentId,
      };

      setMessages((prev) => ({
        ...prev,
        [activeAgentId]: [...prev[activeAgentId], aiReply],
      }));
    } catch {
      const fallbackReply: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'model',
        content: activeAgentId === 'psy_substitute'
          ? "Je suis à votre écoute. Prenez une profonde inspiration. Vous n'êtes plus seule dans cette épreuve."
          : "Pour préparer votre consultation juridique, notez les faits dans l'ordre chronologique et conservez vos preuves en lieu sûr.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentId: activeAgentId,
      };

      setMessages((prev) => ({
        ...prev,
        [activeAgentId]: [...prev[activeAgentId], fallbackReply],
      }));
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Generate a structured preparation note for the human professional
  const generateDoctorBriefing = () => {
    const userMsgs = currentChatMessages.filter((m) => m.role === 'user').map((m) => `• ${m.content}`).join('\n');
    return `FICHE PRÉPARATOIRE DE CONSULTATION HAVEN-ELLE
Date : ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
Destinataire : Professionnel de santé / Avocat titulaire du RDV
Agent Substitut d'accueil : ${activeAgent.name} (${activeAgent.title})

1. POINTS CLÉS SOULEVÉS PAR L'UTILISATRICE LORS DU RELAIS D'ATTENTE :
${userMsgs || 'Échange préliminaire d\'apaisement et prise de contact.'}

2. ÉTAT D'ESPRIT ET PRIORITÉS IDENTIFIÉES :
- L'utilisatrice a sollicité un accompagnement préliminaire pour structurer sa demande.
- Les consignes d'apaisement immédiat et d'organisation des preuves ont été transmises.

3. NOTE DE CONFIDENTIALITÉ :
Document généré localement pour fluidifier le premier contact et respecter le temps d'écoute du praticien.`;
  };

  const handleCopySummary = () => {
    const text = generateDoctorBriefing();
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <div id="substitute-agents-section" className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs space-y-6">
      {/* 1. Header with Relay Explanation */}
      <div className="border-b border-[#E5E2D9] pb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#5A7D7C]/15 text-[#5A7D7C] flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg md:text-xl font-bold text-[#3E3B39] font-serif-natural">
                  Agents Substituts d'Accueil & Préparation 24/7
                </h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E5EAD9] text-[#5A5A40] border border-[#CED6C1] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#8A9A5B] animate-pulse" />
                  Relais Immédiat Actif
                </span>
              </div>
              <p className="text-xs text-[#8E8B82] mt-0.5">
                En attendant votre rendez-vous avec un praticien humain, ces 2 spécialistes numériques dédiés sont disponibles pour vous soutenir, répondre à vos questions et préparer votre dossier.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSummaryModal(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F8F7F2] text-[#5A5A40] hover:bg-[#E5EAD9] border border-[#E5E2D9] transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#8A9A5B]" />
              Fiche de Synthèse pour le Vrai Praticien
            </button>
          </div>
        </div>
      </div>

      {/* 2. Agent Selection Switcher Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Agent 1 : Psychologue Substitut */}
        <div
          onClick={() => setActiveAgentId('psy_substitute')}
          className={`cursor-pointer rounded-2xl p-4 transition-all border text-left flex flex-col justify-between ${
            activeAgentId === 'psy_substitute'
              ? 'bg-[#8A9A5B]/10 border-[#8A9A5B] ring-2 ring-[#8A9A5B]/30 shadow-xs'
              : 'bg-[#FAF9F5] border-[#E5E2D9] hover:border-[#8A9A5B]/50'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{SUBSTITUTE_AGENTS.psy_substitute.avatarIcon}</span>
                <div>
                  <h4 className="font-bold text-sm text-[#3E3B39]">
                    {SUBSTITUTE_AGENTS.psy_substitute.name}
                  </h4>
                  <span className="text-[11px] font-medium text-[#8A9A5B]">
                    {SUBSTITUTE_AGENTS.psy_substitute.title}
                  </span>
                </div>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                activeAgentId === 'psy_substitute'
                  ? 'bg-[#8A9A5B] text-white'
                  : 'bg-[#E5EAD9] text-[#5A5A40]'
              }`}>
                {activeAgentId === 'psy_substitute' ? 'En direct' : 'Consulter'}
              </span>
            </div>

            <p className="text-xs text-[#5A5A40] mb-3 leading-relaxed">
              {SUBSTITUTE_AGENTS.psy_substitute.roleDescription}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-2">
              {SUBSTITUTE_AGENTS.psy_substitute.specialties.map((spec, i) => (
                <span key={i} className="text-[10px] bg-white px-2 py-0.5 rounded-lg border border-[#E5E2D9] text-[#5A5A40]">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 mt-2 border-t border-[#E5E2D9]/80 flex items-center justify-between text-[11px] font-bold text-[#8A9A5B]">
            <span>Apaisement psychologique immédiat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Agent 2 : Juriste & Avocate Substitut */}
        <div
          onClick={() => setActiveAgentId('legal_substitute')}
          className={`cursor-pointer rounded-2xl p-4 transition-all border text-left flex flex-col justify-between ${
            activeAgentId === 'legal_substitute'
              ? 'bg-[#5A7D7C]/10 border-[#5A7D7C] ring-2 ring-[#5A7D7C]/30 shadow-xs'
              : 'bg-[#FAF9F5] border-[#E5E2D9] hover:border-[#5A7D7C]/50'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{SUBSTITUTE_AGENTS.legal_substitute.avatarIcon}</span>
                <div>
                  <h4 className="font-bold text-sm text-[#3E3B39]">
                    {SUBSTITUTE_AGENTS.legal_substitute.name}
                  </h4>
                  <span className="text-[11px] font-medium text-[#5A7D7C]">
                    {SUBSTITUTE_AGENTS.legal_substitute.title}
                  </span>
                </div>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                activeAgentId === 'legal_substitute'
                  ? 'bg-[#5A7D7C] text-white'
                  : 'bg-[#CED6C1] text-[#3E3B39]'
              }`}>
                {activeAgentId === 'legal_substitute' ? 'En direct' : 'Consulter'}
              </span>
            </div>

            <p className="text-xs text-[#5A5A40] mb-3 leading-relaxed">
              {SUBSTITUTE_AGENTS.legal_substitute.roleDescription}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-2">
              {SUBSTITUTE_AGENTS.legal_substitute.specialties.map((spec, i) => (
                <span key={i} className="text-[10px] bg-white px-2 py-0.5 rounded-lg border border-[#E5E2D9] text-[#5A5A40]">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 mt-2 border-t border-[#E5E2D9]/80 flex items-center justify-between text-[11px] font-bold text-[#5A7D7C]">
            <span>Conseil & Préparation juridique</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 3. Live Interactive Consultation Console */}
      <div className="bg-[#FAF9F5] rounded-2xl border border-[#E5E2D9] overflow-hidden flex flex-col h-[460px]">
        {/* Console Header */}
        <div className="px-4 py-3 bg-[#5A5A40] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{activeAgent.avatarIcon}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs md:text-sm">{activeAgent.name}</span>
                <span className="w-2 h-2 rounded-full bg-[#8A9A5B] animate-pulse" />
              </div>
              <p className="text-[10px] text-[#E5EAD9]/80">{activeAgent.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSpeaking && (
              <button
                type="button"
                onClick={stopSpeaking}
                className="px-2.5 py-1 rounded-lg bg-white/15 text-xs text-white hover:bg-white/25 flex items-center gap-1"
                title="Stopper la lecture audio"
              >
                <StopCircle className="w-3.5 h-3.5 text-[#F5E6E0]" />
                <span>Stop Voix</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setMessages((prev) => ({
                  ...prev,
                  [activeAgentId]: [
                    {
                      id: `init-${Date.now()}`,
                      role: 'model',
                      content: activeAgent.initialGreeting,
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      agentId: activeAgentId,
                    },
                  ],
                }));
              }}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Réinitialiser l'échange"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recommended Prompts Carousel */}
        <div className="px-3 py-2 bg-[#F8F7F2] border-b border-[#E5E2D9] flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-[#8E8B82] font-semibold whitespace-nowrap text-[10px] pl-1">
            Suggestions rapides :
          </span>
          {activeAgent.recommendedPrompts.map((rp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(rp.text)}
              className="px-2.5 py-1 bg-white hover:bg-[#E5EAD9] text-[#3E3B39] border border-[#E5E2D9] rounded-lg whitespace-nowrap transition-colors shadow-2xs text-[11px] font-medium"
            >
              {rp.label}
            </button>
          ))}
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {currentChatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'model' && (
                <div className="w-7 h-7 rounded-lg bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  {activeAgent.avatarIcon}
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
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
                      type="button"
                      onClick={() => speakText(msg.content)}
                      className="hover:text-[#3E3B39] flex items-center gap-1 text-[#8A9A5B] font-medium"
                      title="Écouter la réponse à voix haute"
                    >
                      <Volume2 className="w-3 h-3 text-[#8A9A5B]" /> Écouter
                    </button>
                  )}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-[#3E3B39] text-[#F8F7F2] flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-[#5A5A40] text-xs p-2 bg-white/70 rounded-xl border border-[#E5E2D9]/60 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#8A9A5B]" />
              <span>{activeAgent.name} formule ses conseils avec soin...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-2.5 bg-white border-t border-[#E5E2D9] flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={`Posez votre question à ${activeAgent.name}...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
            className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#E5E2D9] text-[#3E3B39] bg-white focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
          />

          <button
            type="submit"
            disabled={!inputValue.trim() || loading}
            className="p-2 bg-[#5A5A40] hover:bg-[#4a4a35] disabled:opacity-40 text-white rounded-xl transition-colors shrink-0 shadow-2xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 4. Practical Preparation Guide Card */}
      <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-[#E5E2D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#5A5A40]">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#8A9A5B] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[#3E3B39]">Relais d'urgence et passage de témoin sécurisé</p>
            <p className="text-[11px] text-[#8E8B82]">
              Vos échanges avec Dr. Éléonore et Me Clara restent confidentiels sur votre terminal. Vous pouvez générer un résumé synthétique pour votre médecin ou avocat d'un simple clic.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowSummaryModal(true)}
          className="px-3.5 py-2 bg-[#8A9A5B] hover:bg-[#78884d] text-white rounded-xl text-xs font-bold shrink-0 transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5" /> Voir la Fiche Préparatoire
        </button>
      </div>

      {/* 5. Summary Modal for Human Professional */}
      {showSummaryModal && (
        <div className="fixed inset-0 bg-[#3E3B39]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E2D9] max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E2D9]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#3E3B39]">
                    Fiche Préparatoire pour le Praticien Humain
                  </h4>
                  <span className="text-[10px] text-[#8E8B82]">
                    Synthèse générée via HAVEN-ELLE
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSummaryModal(false)}
                className="p-1.5 rounded-lg hover:bg-black/5 text-[#8E8B82]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#5A5A40]">
              Cette fiche récapitule vos interrogations préliminaires avec votre agent substitut ({activeAgent.name}). Vous pouvez la copier ou la transmettre lors de votre téléconsultation Google Meet.
            </p>

            <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E5E2D9] font-mono text-[11px] text-[#3E3B39] whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
              {generateDoctorBriefing()}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E2D9]">
              <button
                type="button"
                onClick={() => setShowSummaryModal(false)}
                className="px-4 py-2 text-xs font-semibold text-[#5A5A40] hover:bg-[#F8F7F2] rounded-xl"
              >
                Fermer
              </button>

              <button
                type="button"
                onClick={handleCopySummary}
                className="px-4 py-2 bg-[#5A5A40] hover:bg-[#4a4a35] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-[#8A9A5B]" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSummary ? 'Copié dans le presse-papier !' : 'Copier la Fiche'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
