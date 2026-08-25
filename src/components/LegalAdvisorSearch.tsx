import React, { useState } from 'react';
import {
  Scale,
  Search,
  RefreshCw,
  BookOpen,
  ShieldCheck,
  FileText,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  PhoneCall,
  ArrowRight,
  Bookmark,
  Sparkles,
  Info
} from 'lucide-react';
import { LEGAL_FACT_SHEETS, LegalFactSheet } from '../data/legalFactSheets';

export const LegalAdvisorSearch: React.FC = () => {
  const [selectedSheetId, setSelectedSheetId] = useState<string>(LEGAL_FACT_SHEETS[0].id);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedSheet, setCopiedSheet] = useState(false);
  const [activeTabMode, setActiveTabMode] = useState<'fiches' | 'search'>('fiches');
  const [result, setResult] = useState<{ answer: string; sources: string[] } | null>({
    answer: "En cas de violences au sein du couple, vous avez le droit de quitter immédiatement le domicile avec vos enfants sans que cela ne constitue un 'abandon de domicile'. Vous pouvez solliciter en urgence une Ordonnance de Protection auprès du Juge aux Affaires Familiales (délivrée sous 6 jours maximum), qui ordonne l'éviction du conjoint violent, vous attribue la jouissance du logement et fixe les modalités de garde des enfants.",
    sources: ["Article 515-9 du Code Civil", "Ministère de la Justice", "Fédération Nationale Solidarité Femmes (3919)"],
  });

  const selectedSheet = LEGAL_FACT_SHEETS.find((s) => s.id === selectedSheetId) || LEGAL_FACT_SHEETS[0];

  const popularQuestions = [
    "Puis-je partir du domicile avec mes enfants sans risque pénal ?",
    "Qu'est-ce que l'Ordonnance de Protection et comment l'obtenir ?",
    "Comment faire constater mes blessures à l'hôpital sans porter plainte ?",
    "Quelles sont les aides financières d'urgence (aide universelle d'urgence CAF) ?",
    "Comment obtenir un Téléphone Grave Danger (TGD) ?",
  ];

  const handleSearch = async (qToSend?: string) => {
    const q = qToSend || question.trim();
    if (!q) return;

    setActiveTabMode('search');
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/search-legal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });

      const data = await response.json();
      setResult({
        answer: data.answer || "Information juridique disponible.",
        sources: data.sources || ["Législation en vigueur"],
      });
    } catch (err) {
      console.error('Error in search-legal:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyFactSheet = async (sheet: LegalFactSheet) => {
    const text = `=== FICHE RÉFLEXE JURIDIQUE : ${sheet.title.toUpperCase()} ===\n\n` +
      `Résumé :\n${sheet.summary}\n\n` +
      `Étapes réflexes prioritaires :\n` +
      sheet.keySteps.map((s, idx) => `${idx + 1}. ${s.step} : ${s.detail}`).join('\n') +
      `\n\nBases légales & Articles de loi :\n` +
      sheet.legalBasis.map((b) => `- ${b}`).join('\n') +
      `\n\nConseils pratiques :\n` +
      sheet.practicalAdvice.map((a) => `- ${a}`).join('\n') +
      `\n\nContacts d'urgence utiles :\n` +
      sheet.emergencyContacts.map((c) => `- ${c.name} (${c.number}) : ${c.description}`).join('\n');

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedSheet(true);
        setTimeout(() => setCopiedSheet(false), 2500);
      }
    } catch (e) {
      console.warn('Copy failed:', e);
    }
  };

  const handleAskAboutSheet = (sheet: LegalFactSheet) => {
    const prompt = `Précise les démarches exactes et recours légaux pour : ${sheet.title} (${sheet.subtitle})`;
    setQuestion(prompt);
    handleSearch(prompt);
  };

  return (
    <div id="legal-advisor-section" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center shrink-0">
              <Scale className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#3E3B39] font-serif-natural">
                Conseiller Juridique & Droits des Victimes
              </h2>
              <p className="text-xs text-[#8E8B82]">
                Bibliothèque de fiches réflexes d'urgence et moteur de vérification légale par IA.
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-[#F8F7F2] p-1 rounded-2xl border border-[#E5E2D9] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTabMode('fiches')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTabMode === 'fiches'
                  ? 'bg-[#8A9A5B] text-white shadow-2xs'
                  : 'text-[#5A5A40] hover:text-[#3E3B39]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Fiches Réflexes ({LEGAL_FACT_SHEETS.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTabMode('search')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTabMode === 'search'
                  ? 'bg-[#8A9A5B] text-white shadow-2xs'
                  : 'text-[#5A5A40] hover:text-[#3E3B39]'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Recherche & IA</span>
            </button>
          </div>
        </div>

        {/* FACT SHEETS QUICK ACCESS DROPDOWN & SELECTOR */}
        <div className="mt-5 pt-4 border-t border-[#F0EEE6] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label htmlFor="legal-fact-sheet-select" className="text-xs font-bold text-[#5A5A40] flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-[#8A9A5B]" />
              <span>Sélectionnez une Fiche Réflexe d'accès immédiat :</span>
            </label>
            <span className="text-[11px] text-[#8E8B82]">
              Accès garanti sans recherche ni connexion requise
            </span>
          </div>

          {/* Interactive Dropdown Select */}
          <div className="relative">
            <select
              id="legal-fact-sheet-select"
              value={selectedSheetId}
              onChange={(e) => {
                setSelectedSheetId(e.target.value);
                setActiveTabMode('fiches');
              }}
              className="w-full appearance-none px-4 py-3 pr-10 rounded-2xl border-2 border-[#CED6C1] bg-[#FAF9F5] text-xs sm:text-sm font-semibold text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] transition-all cursor-pointer shadow-xs"
            >
              {LEGAL_FACT_SHEETS.map((sheet) => (
                <option key={sheet.id} value={sheet.id}>
                  {sheet.title} — [{sheet.badge}]
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#5A5A40]">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Quick Pill Jump Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
            {LEGAL_FACT_SHEETS.map((sheet) => (
              <button
                key={sheet.id}
                type="button"
                onClick={() => {
                  setSelectedSheetId(sheet.id);
                  setActiveTabMode('fiches');
                }}
                className={`whitespace-nowrap px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all shrink-0 border ${
                  selectedSheetId === sheet.id && activeTabMode === 'fiches'
                    ? 'bg-[#E5EAD9] text-[#48592E] border-[#A8BC8C] font-bold shadow-2xs'
                    : 'bg-[#F8F7F2] text-[#716E65] border-[#E5E2D9] hover:bg-[#F0EEE6]'
                }`}
              >
                {sheet.badge}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: ACTIVE FACT SHEET PRESENTATION */}
      {activeTabMode === 'fiches' && selectedSheet && (
        <div id="legal-fact-sheet-card" className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs space-y-5 animate-in fade-in duration-200">
          {/* Fact Sheet Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-[#F0EEE6]">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E5EAD9] text-[#4E6130] border border-[#CED6C1]">
                  {selectedSheet.badge}
                </span>
                <span className="text-[11px] text-[#8E8B82]">Fiche d'intervention immédiate</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#3E3B39] font-serif-natural">
                {selectedSheet.title}
              </h3>
              <p className="text-xs text-[#5A5A40] font-medium mt-0.5">
                {selectedSheet.subtitle}
              </p>
            </div>

            {/* Quick Actions for Fact Sheet */}
            <div className="flex items-center gap-2 self-start shrink-0">
              <button
                type="button"
                onClick={() => handleCopyFactSheet(selectedSheet)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  copiedSheet
                    ? 'bg-[#8A9A5B] text-white border-[#8A9A5B]'
                    : 'bg-[#F8F7F2] hover:bg-[#F0EEE6] text-[#5A5A40] border-[#E5E2D9]'
                }`}
                title="Copier la fiche complète pour conservation ou envoi"
              >
                {copiedSheet ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSheet ? 'Fiche Copiée !' : 'Copier'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleAskAboutSheet(selectedSheet)}
                className="px-3 py-1.5 rounded-xl bg-[#5A5A40] hover:bg-[#464630] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
                title="Poser des questions juridiques ciblées sur cette fiche"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Approfondir via IA</span>
              </button>
            </div>
          </div>

          {/* Core Summary Callout */}
          <div className="p-4 rounded-2xl bg-[#F8F7F2] border border-[#E5E2D9] text-xs sm:text-sm text-[#3E3B39] leading-relaxed">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#8A9A5B] shrink-0 mt-0.5" />
              <p>{selectedSheet.summary}</p>
            </div>
          </div>

          {/* Key Reflex Steps Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8A9A5B]" />
              <span>Démarches & Étapes Réflexes à Suivre</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedSheet.keySteps.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-[#E5E2D9] hover:border-[#CED6C1] shadow-2xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#E5EAD9] text-[#4E6130] text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-[#3E3B39]">{item.step}</span>
                  </div>
                  <p className="text-[11px] text-[#716E65] pl-7 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Basis & Practical Advice */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
            {/* Legal Articles */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E2D9] space-y-2">
              <span className="text-xs font-bold text-[#5A5A40] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#8A9A5B]" />
                <span>Textes & Fondements Légaux Applicables</span>
              </span>
              <ul className="space-y-1.5 text-[11px] text-[#716E65]">
                {selectedSheet.legalBasis.map((law, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#8A9A5B] font-bold">•</span>
                    <span>{law}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practical Advice */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E5E2D9] space-y-2">
              <span className="text-xs font-bold text-[#5A5A40] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8A9A5B]" />
                <span>Conseils Pratiques & Précautions Terrain</span>
              </span>
              <ul className="space-y-1.5 text-[11px] text-[#716E65]">
                {selectedSheet.practicalAdvice.map((advice, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#8A9A5B] font-bold">✓</span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Emergency Contacts for this Sheet */}
          {selectedSheet.emergencyContacts && selectedSheet.emergencyContacts.length > 0 && (
            <div className="pt-2 border-t border-[#F0EEE6]">
              <span className="text-[11px] font-bold text-[#8E8B82] block mb-2">
                Numéros & Services d'urgence recommandés pour cette démarche :
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedSheet.emergencyContacts.map((contact, idx) => (
                  <a
                    key={idx}
                    href={`tel:${contact.number}`}
                    className="p-2.5 rounded-xl bg-[#F2F6EC] hover:bg-[#E5EAD9] border border-[#CEDEC0] text-[#3E3B39] flex items-center justify-between transition-colors shadow-2xs"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-xs font-bold text-[#4F6331]">{contact.name}</div>
                      <div className="text-[10px] text-[#716E65] truncate">{contact.description}</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-white bg-[#8A9A5B] px-2.5 py-1 rounded-lg shrink-0">
                      <PhoneCall className="w-3 h-3" />
                      <span>{contact.number}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: CUSTOM AI SEARCH & GROUNDED QUESTIONS */}
      {activeTabMode === 'search' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Search Box */}
          <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#5A5A40]">
              <Sparkles className="w-4 h-4 text-[#8A9A5B]" />
              <span>Posez une question juridique spécifique à l'IA</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Ex : Comment faire valoir mes droits lors d'une séparation urgente, garde exclusive..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E2D9] text-xs text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] bg-white"
              />
              <button
                type="button"
                onClick={() => handleSearch()}
                disabled={loading}
                className="px-5 py-2.5 bg-[#5A5A40] hover:bg-[#4a4a35] disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>Interroger les Textes</span>
              </button>
            </div>

            {/* Popular Questions */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-[#8E8B82] self-center mr-1">Exemples :</span>
              {popularQuestions.map((pq, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setQuestion(pq);
                    handleSearch(pq);
                  }}
                  className="px-2.5 py-1 bg-[#F8F7F2] hover:bg-[#F5F2ED] text-[#5A5A40] border border-[#E5E2D9] rounded-lg text-xs font-medium transition-colors"
                >
                  {pq}
                </button>
              ))}
            </div>
          </div>

          {/* Results Box */}
          {result && (
            <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5A5A40]">
                <ShieldCheck className="w-4 h-4 text-[#8A9A5B]" />
                Réponse Juridique & Textes Applicables
              </div>

              <div className="text-xs md:text-sm text-[#3E3B39] leading-relaxed whitespace-pre-wrap bg-[#F8F7F2] p-4 rounded-2xl border border-[#E5E2D9]">
                {result.answer}
              </div>

              {result.sources && result.sources.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-semibold text-[#8E8B82] block mb-1.5">Sources & Références légales :</span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.sources.map((src, i) => (
                      <span key={i} className="px-2.5 py-1 bg-[#E5EAD9] text-[#5A5A40] border border-[#CED6C1] rounded-md text-[10px] font-medium flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-[#5A5A40]" /> {src}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

