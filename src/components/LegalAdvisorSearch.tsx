import React, { useState } from 'react';
import { Scale, Search, RefreshCw, BookOpen, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';

export const LegalAdvisorSearch: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ answer: string; sources: string[] } | null>({
    answer: "En cas de violences au sein du couple, vous avez le droit de quitter immédiatement le domicile avec vos enfants sans que cela ne constitue un 'abandon de domicile'. Vous pouvez solliciter en urgence une Ordonnance de Protection auprès du Juge aux Affaires Familiales (délivrée sous 6 jours maximum), qui ordonne l'éviction du conjoint violent, vous attribue la jouissance du logement et fixe les modalités de garde des enfants.",
    sources: ["Article 515-9 du Code Civil", "Ministère de la Justice", "Fédération Nationale Solidarité Femmes (3919)"],
  });

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

  return (
    <div id="legal-advisor-section" className="space-y-5">
      {/* Header */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[#3E3B39] font-serif-natural">
              Conseiller Juridique & Droits des Victimes
            </h2>
            <p className="text-xs text-[#8E8B82]">
              Informations légales à jour, articles de loi et procédures d'urgence vérifiés via <strong className="text-[#5A5A40]">Google Search Grounding</strong>.
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="mt-5 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Posez votre question juridique (ex: garde des enfants, ordonnance de protection, plainte)..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E2D9] text-xs text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] bg-white"
          />
          <button
            onClick={() => handleSearch()}
            disabled={loading}
            className="px-5 py-2.5 bg-[#5A5A40] hover:bg-[#4a4a35] disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            Consulter les Droits
          </button>
        </div>

        {/* Question chips */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="text-[11px] font-semibold text-[#8E8B82] self-center mr-1">Questions fréquentes :</span>
          {popularQuestions.map((pq, i) => (
            <button
              key={i}
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
  );
};
