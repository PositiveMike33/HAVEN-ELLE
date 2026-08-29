import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  Maximize2, 
  Minimize2, 
  Trash2, 
  Copy, 
  Check, 
  HelpCircle, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  MessageSquare, 
  Users, 
  Flame, 
  Compass, 
  Heart,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { THERAPEUTIC_TEAM_AGENTS } from '../data/therapeuticAgents';
import { TherapeuticAgentId, TherapeuticPerspectiveAgent } from '../types';

interface AgentChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  thoughtProcess?: string;
}

interface TherapeuticTeamPerspectiveProps {
  onBackToSanctuary?: () => void;
}

export const TherapeuticTeamPerspective: React.FC<TherapeuticTeamPerspectiveProps> = ({
  onBackToSanctuary,
}) => {
  // Active agent focus for single agent mode (null = all 3 side-by-side)
  const [focusedAgentId, setFocusedAgentId] = useState<TherapeuticAgentId | null>(null);

  // Broadcast question input
  const [broadcastInput, setBroadcastInput] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Individual chat states
  const [agentChats, setAgentChats] = useState<Record<TherapeuticAgentId, AgentChatMessage[]>>({
    somatic_trauma: [
      {
        id: 'init-1',
        role: 'model',
        content: THERAPEUTIC_TEAM_AGENTS.somatic_trauma.initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ],
    financial_sovereignty: [
      {
        id: 'init-2',
        role: 'model',
        content: THERAPEUTIC_TEAM_AGENTS.financial_sovereignty.initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ],
    gaslighting_clarity: [
      {
        id: 'init-3',
        role: 'model',
        content: THERAPEUTIC_TEAM_AGENTS.gaslighting_clarity.initialGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ],
  });

  const [individualInputs, setIndividualInputs] = useState<Record<TherapeuticAgentId, string>>({
    somatic_trauma: '',
    financial_sovereignty: '',
    gaslighting_clarity: '',
  });

  const [agentLoading, setAgentLoading] = useState<Record<TherapeuticAgentId, boolean>>({
    somatic_trauma: false,
    financial_sovereignty: false,
    gaslighting_clarity: false,
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [showThoughts, setShowThoughts] = useState<Record<string, boolean>>({});

  const chatEndRefs = {
    somatic_trauma: useRef<HTMLDivElement>(null),
    financial_sovereignty: useRef<HTMLDivElement>(null),
    gaslighting_clarity: useRef<HTMLDivElement>(null),
  };

  const scrollToBottom = (agentId: TherapeuticAgentId) => {
    chatEndRefs[agentId].current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Broadcast common question scenarios
  const teamScenarios = [
    {
      title: '🌪️ Situation de Choc & Sidération',
      prompt: 'Je vis un moment de grande détresse et d\'agression récente. Je me sens figée, apeurée pour mes ressources et confuse sur ce qu\'il s\'est réellement passé. Éclairez-moi selon vos 3 expertises respectives.',
    },
    {
      title: '🚪 Décision de Départ & Reprise de Contrôle',
      prompt: 'Je prépare mon départ et ma reconstruction. Comment libérer mon corps de la terreur, sécuriser mon autonomie financière et déjouer les pièges de culpabilité de l\'agresseur ?',
    },
    {
      title: '🕊️ Reconnexion à ma Dignité & Guérison Racine',
      prompt: 'Après des mois de violences cumulées, comment réhabiliter mon corps pour reprendre ma souveraineté personnelle, reconstruire ma prospérité et faire taire définitivement la voix du doute et du gaslighting ?',
    },
  ];

  // Helper to extract <thought_process> if returned
  const parseThoughtProcess = (rawText: string): { cleanText: string; thoughtProcess?: string } => {
    const match = rawText.match(/<thought_process>([\s\S]*?)<\/thought_process>/i);
    if (match) {
      const cleanText = rawText.replace(/<thought_process>[\s\S]*?<\/thought_process>/i, '').trim();
      return { cleanText, thoughtProcess: match[1].trim() };
    }
    return { cleanText: rawText };
  };

  // Send message to a specific agent
  const sendMessageToAgent = async (agentId: TherapeuticAgentId, customText?: string) => {
    const text = customText || individualInputs[agentId].trim();
    if (!text || agentLoading[agentId]) return;

    const userMessage: AgentChatMessage = {
      id: `usr-${agentId}-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAgentChats((prev) => ({
      ...prev,
      [agentId]: [...prev[agentId], userMessage],
    }));

    if (!customText) {
      setIndividualInputs((prev) => ({ ...prev, [agentId]: '' }));
    }

    setAgentLoading((prev) => ({ ...prev, [agentId]: true }));
    setTimeout(() => scrollToBottom(agentId), 100);

    const agent = THERAPEUTIC_TEAM_AGENTS[agentId];

    try {
      const history = [...agentChats[agentId], userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          urgency: 'critical',
          systemPrompt: agent.systemPrompt,
          overrideSystemPrompt: true,
        }),
      });

      const data = await res.json();
      const rawReply = data.reply || agent.initialGreeting;
      const { cleanText, thoughtProcess } = parseThoughtProcess(rawReply);

      const aiMessage: AgentChatMessage = {
        id: `ai-${agentId}-${Date.now()}`,
        role: 'model',
        content: cleanText,
        thoughtProcess,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setAgentChats((prev) => ({
        ...prev,
        [agentId]: [...prev[agentId], aiMessage],
      }));
    } catch (err) {
      console.error(`Error consulting agent ${agentId}:`, err);
      const fallbackMsg: AgentChatMessage = {
        id: `err-${agentId}-${Date.now()}`,
        role: 'model',
        content: `Je suis là à vos côtés pour vous protéger et vous guider avec bienveillance. Votre sécurité est inaliénable. Que souhaitez-vous approfondir ?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setAgentChats((prev) => ({
        ...prev,
        [agentId]: [...prev[agentId], fallbackMsg],
      }));
    } finally {
      setAgentLoading((prev) => ({ ...prev, [agentId]: false }));
      setTimeout(() => scrollToBottom(agentId), 150);
    }
  };

  // Broadcast to all 3 agents simultaneously
  const handleBroadcastSubmit = async (promptToSend?: string) => {
    const text = promptToSend || broadcastInput.trim();
    if (!text || isBroadcasting) return;

    setIsBroadcasting(true);
    if (!promptToSend) setBroadcastInput('');

    // Trigger all 3 agents in parallel
    const agentKeys: TherapeuticAgentId[] = ['somatic_trauma', 'financial_sovereignty', 'gaslighting_clarity'];

    await Promise.all(
      agentKeys.map(async (agentKey) => {
        await sendMessageToAgent(agentKey, text);
      })
    );

    setIsBroadcasting(false);
  };

  // Audio speech synthesis
  const handleSpeak = (text: string, msgId: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (playingAudioId === msgId) {
        setPlayingAudioId(null);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text.slice(0, 700));
      utterance.lang = 'fr-FR';
      utterance.rate = 0.95;
      utterance.onend = () => setPlayingAudioId(null);
      utterance.onerror = () => setPlayingAudioId(null);
      setPlayingAudioId(msgId);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = (agentId: TherapeuticAgentId) => {
    setAgentChats((prev) => ({
      ...prev,
      [agentId]: [
        {
          id: `init-reset-${agentId}`,
          role: 'model',
          content: THERAPEUTIC_TEAM_AGENTS[agentId].initialGreeting,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    }));
  };

  const activeAgentsList: TherapeuticPerspectiveAgent[] = focusedAgentId
    ? [THERAPEUTIC_TEAM_AGENTS[focusedAgentId]]
    : Object.values(THERAPEUTIC_TEAM_AGENTS);

  return (
    <div id="therapeutic-team-perspective-container" className="space-y-4">
      {/* 1. Header Banner: Team Perspective Presentation & Navigation */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#8A9A5B] to-[#5A5A40] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-[#3E3B39] font-serif-natural">
                  Team Perspective • Intelligence Thérapeutique Tri-Prismes
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E5EAD9] text-[#5A5A40] border border-[#CED6C1]">
                  3 Agents Méta-Orchestrés
                </span>
              </div>
              <p className="text-xs text-[#8E8B82] mt-0.5 max-w-3xl">
                Mobilisez simultanément 3 spécialistes d'élite aux méthodologies cognitives avancées (Loop Therapy × ToT 3 Branches × Healing Atoms) pour une prise en charge holistique de vos blessures.
              </p>
            </div>
          </div>

          {/* View Mode Controls */}
          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            {onBackToSanctuary && (
              <button
                type="button"
                onClick={onBackToSanctuary}
                className="px-3 py-1.5 rounded-xl border border-[#E5E2D9] bg-white hover:bg-[#F8F7F2] text-xs font-semibold text-[#5A5A40] transition-colors"
              >
                Retour Souveraineté
              </button>
            )}

            {/* Quick Agent Focus Chips */}
            <div className="flex items-center bg-[#F8F7F2] p-1 rounded-xl border border-[#E5E2D9] text-xs">
              <button
                type="button"
                onClick={() => setFocusedAgentId(null)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  focusedAgentId === null
                    ? 'bg-[#5A5A40] text-white shadow-2xs'
                    : 'text-[#5A5A40] hover:text-[#3E3B39]'
                }`}
                title="Afficher les 3 agents côte à côte"
              >
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> 3 Côte à Côte
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFocusedAgentId('somatic_trauma')}
                className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                  focusedAgentId === 'somatic_trauma'
                    ? 'bg-[#8A9A5B] text-white shadow-2xs'
                    : 'text-[#5A5A40] hover:text-[#3E3B39]'
                }`}
                title="Focus sur le Prisme Somatique"
              >
                🪷 Somatique
              </button>

              <button
                type="button"
                onClick={() => setFocusedAgentId('financial_sovereignty')}
                className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                  focusedAgentId === 'financial_sovereignty'
                    ? 'bg-[#B87D4B] text-white shadow-2xs'
                    : 'text-[#5A5A40] hover:text-[#3E3B39]'
                }`}
                title="Focus sur le Prisme Matériel & Économique"
              >
                🏛️ Bâtisseuse
              </button>

              <button
                type="button"
                onClick={() => setFocusedAgentId('gaslighting_clarity')}
                className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                  focusedAgentId === 'gaslighting_clarity'
                    ? 'bg-[#4E7D8A] text-white shadow-2xs'
                    : 'text-[#5A5A40] hover:text-[#3E3B39]'
                }`}
                title="Focus sur le Prisme Vérité & Clarté"
              >
                🛡️ Vérité
              </button>
            </div>
          </div>
        </div>

        {/* Synchronized Broadcast Dispatcher (Single input to all 3 agents) */}
        <div className="mt-4 pt-4 border-t border-[#F0EEE6] space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-[#5A5A40] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#8A9A5B]" />
              Consultation Parallèle Multi-Prismes (Diffusion aux 3 Agents en 1 Clic)
            </span>
            <span className="text-[10px] text-[#8E8B82] hidden sm:inline">
              Chaque agent appliquera sa méthodologie (Somatique, Bâtisseuse, Vérité)
            </span>
          </div>

          {/* Quick Scenario Buttons */}
          <div className="flex flex-wrap gap-1.5">
            {teamScenarios.map((sc, idx) => (
              <button
                key={idx}
                type="button"
                disabled={isBroadcasting}
                onClick={() => handleBroadcastSubmit(sc.prompt)}
                className="px-2.5 py-1 bg-[#F8F7F2] hover:bg-[#E5EAD9] text-[#5A5A40] hover:text-[#3E3B39] border border-[#E5E2D9] rounded-lg text-xs font-medium transition-colors shadow-2xs flex items-center gap-1 disabled:opacity-50"
              >
                <span>{sc.title}</span>
              </button>
            ))}
          </div>

          {/* Broadcast Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleBroadcastSubmit();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Décrivez votre situation ou blocage pour obtenir les 3 perspectives d'analyse simultanées..."
              value={broadcastInput}
              onChange={(e) => setBroadcastInput(e.target.value)}
              disabled={isBroadcasting}
              className="flex-1 px-4 py-2.5 bg-[#FAF9F5] rounded-xl border border-[#CED6C1] text-xs md:text-sm text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B]"
            />

            <button
              type="submit"
              disabled={!broadcastInput.trim() || isBroadcasting}
              className="px-4 py-2.5 bg-[#5A5A40] hover:bg-[#4a4a35] disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-2xs"
            >
              {isBroadcasting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#CED6C1]" />
                  <span>Consultation en cours...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Consulter l'Équipe</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* 2. Main Side-by-Side 3-Column Multi-Agent Board */}
      <div
        className={`grid gap-4 ${
          focusedAgentId
            ? 'grid-cols-1'
            : 'grid-cols-1 lg:grid-cols-3'
        }`}
      >
        {activeAgentsList.map((agent) => {
          const agentId = agent.id;
          const messages = agentChats[agentId];
          const isLoading = agentLoading[agentId];

          return (
            <div
              key={agentId}
              id={`agent-panel-${agentId}`}
              className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] shadow-xs flex flex-col h-[700px] overflow-hidden transition-all"
              style={{
                borderTop: `4px solid ${agent.themeColor}`,
              }}
            >
              {/* Agent Column Header */}
              <div
                className="p-3.5 border-b border-[#E5E2D9] flex items-start justify-between gap-2"
                style={{ backgroundColor: agent.bgColor }}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div
                    className="w-9 h-9 rounded-2xl flex items-center justify-center text-lg shrink-0 shadow-2xs border"
                    style={{
                      backgroundColor: `${agent.themeColor}20`,
                      borderColor: agent.borderColor,
                    }}
                  >
                    {agent.avatarEmoji}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#3E3B39] truncate">
                        {agent.name}
                      </span>
                    </div>
                    <span
                      className="text-[10px] font-semibold block truncate"
                      style={{ color: agent.themeColor }}
                    >
                      {agent.archetype}
                    </span>
                    <span className="text-[9px] text-[#8E8B82] block truncate">
                      {agent.specialization}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setFocusedAgentId(focusedAgentId === agentId ? null : agentId)
                    }
                    className="p-1.5 hover:bg-white rounded-lg text-[#5A5A40] transition-colors"
                    title={
                      focusedAgentId === agentId
                        ? 'Revenir à la vue 3 agents côte à côte'
                        : 'Agrandir cette perspective en plein écran'
                    }
                  >
                    {focusedAgentId === agentId ? (
                      <Minimize2 className="w-3.5 h-3.5" />
                    ) : (
                      <Maximize2 className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => clearChat(agentId)}
                    className="p-1.5 hover:bg-[#FDF2F2] rounded-lg text-[#A65B5B] transition-colors"
                    title="Effacer cet historique pour cet agent"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Agent Quick Prompt Chips */}
              <div className="p-2 bg-[#FAF9F5] border-b border-[#E5E2D9] flex items-center gap-1.5 overflow-x-auto">
                <span className="text-[10px] font-semibold text-[#8E8B82] whitespace-nowrap">
                  Suggestions :
                </span>
                {agent.fastSuggestions.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => sendMessageToAgent(agentId, sug.prompt)}
                    disabled={isLoading}
                    className="px-2 py-0.5 bg-white hover:bg-[#F5F2ED] text-[#5A5A40] border border-[#E5E2D9] rounded-md text-[10px] whitespace-nowrap transition-colors shadow-2xs shrink-0"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-[#FAF9F5]/50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[92%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                        msg.role === 'user'
                          ? 'bg-[#5A5A40] text-white rounded-tr-xs'
                          : 'bg-white border border-[#E5E2D9] text-[#3E3B39] rounded-tl-xs'
                      }`}
                    >
                      {/* Formatted Text Content */}
                      <div className="whitespace-pre-wrap font-sans text-xs sm:text-[13px] leading-relaxed">
                        {msg.content}
                      </div>

                      {/* Expandable Thought Process (Tree of Healing Thoughts) */}
                      {msg.thoughtProcess && (
                        <div className="mt-2.5 pt-2 border-t border-[#E5E2D9]/60">
                          <button
                            type="button"
                            onClick={() =>
                              setShowThoughts((prev) => ({
                                ...prev,
                                [msg.id]: !prev[msg.id],
                              }))
                            }
                            className="flex items-center gap-1.5 text-[10px] font-bold text-[#8A9A5B] hover:text-[#5A5A40] transition-colors"
                          >
                            {showThoughts[msg.id] ? (
                              <>
                                <ChevronUp className="w-3 h-3" />
                                <span>Masquer la réflexion ToT x AoT</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown className="w-3 h-3" />
                                <span>Voir le raisonnement interne ToT & Atomes de Guérison</span>
                              </>
                            )}
                          </button>

                          {showThoughts[msg.id] && (
                            <div className="mt-2 p-2.5 bg-[#F8F7F2] rounded-xl border border-[#CED6C1] text-[11px] text-[#5A5A40] font-mono whitespace-pre-wrap leading-relaxed animate-in fade-in">
                              <div className="text-[10px] font-bold text-[#8A9A5B] mb-1 font-sans">
                                🧠 MATRICE COGNITIVE & SCORING ÉVALUATION :
                              </div>
                              {msg.thoughtProcess}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Message Actions */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/5 text-[10px] text-[#8E8B82]">
                        <span>{msg.timestamp}</span>

                        {msg.role === 'model' && (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleSpeak(msg.content, msg.id)}
                              className="hover:text-[#3E3B39] flex items-center gap-1 text-[#8A9A5B] font-medium"
                              title="Écouter avec la synthèse vocale"
                            >
                              {playingAudioId === msg.id ? (
                                <>
                                  <VolumeX className="w-3 h-3 text-[#A64D4D]" />
                                  <span className="text-[#A64D4D]">Arrêter</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3 h-3" />
                                  <span>Écouter</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleCopy(msg.content, msg.id)}
                              className="hover:text-[#3E3B39] flex items-center gap-1 text-[#5A5A40]"
                              title="Copier le protocole"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3 h-3 text-[#8A9A5B]" />
                                  <span className="text-[#8A9A5B]">Copié</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copier</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-xs p-2 text-[#5A5A40] animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ color: agent.themeColor }} />
                    <span className="text-[11px]">
                      {agent.name} évalue la situation selon sa matrice {agent.methodology}...
                    </span>
                  </div>
                )}

                <div ref={chatEndRefs[agentId]} />
              </div>

              {/* Agent Individual Message Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessageToAgent(agentId);
                }}
                className="p-2.5 bg-white border-t border-[#E5E2D9] flex items-center gap-1.5"
              >
                <input
                  type="text"
                  placeholder={`Question spécifique à ${agent.name}...`}
                  value={individualInputs[agentId]}
                  onChange={(e) =>
                    setIndividualInputs((prev) => ({
                      ...prev,
                      [agentId]: e.target.value,
                    }))
                  }
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 rounded-xl border border-[#E5E2D9] text-xs text-[#3E3B39] bg-white focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
                />

                <button
                  type="submit"
                  disabled={!individualInputs[agentId].trim() || isLoading}
                  className="p-2 text-white rounded-xl transition-colors shrink-0 shadow-2xs disabled:opacity-40"
                  style={{ backgroundColor: agent.themeColor }}
                  title="Envoyer à cet agent"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
};
