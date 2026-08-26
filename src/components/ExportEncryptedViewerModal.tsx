import React, { useState } from 'react';
import { Download, Lock, X, AlertCircle } from 'lucide-react';
import { generateOfflineEncryptedViewer } from '../utils/exportEncryptedViewer';
import { DiscreetAppointment } from '../types';

interface ExportEncryptedViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: DiscreetAppointment[];
}

export const ExportEncryptedViewerModal: React.FC<ExportEncryptedViewerModalProps> = ({
  isOpen,
  onClose,
  appointments,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setIsExporting(true);
    try {
      const htmlContent = await generateOfflineEncryptedViewer(appointments, password);
      
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `haven-elle-calendrier-suivi-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      onClose();
    } catch (err: any) {
      setError('Erreur lors de la génération de l\'archive cryptée.');
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#E5E2D9] animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-[#3E3B39] font-serif-natural flex items-center gap-2">
            <Download className="w-5 h-5 text-[#8A9A5B]" />
            Exporter l'Archive
          </h3>
          <button onClick={onClose} className="p-2 text-[#8E8B82] hover:bg-[#F5F2ED] rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#8E8B82] mb-4">
          Générez une copie sécurisée et cryptée de vos rendez-vous que vous pourrez consulter hors ligne via un simple navigateur web.
        </p>

        <form onSubmit={handleExport} className="space-y-4">
          {error && (
            <div className="p-3 bg-[#F5E6E0] border border-[#A64D4D]/30 text-[#A64D4D] rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-[#5A5A40] block mb-1">Mot de passe d'encryption</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8E8B82] absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Créer un mot de passe fort"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
              />
            </div>
            <p className="text-[10px] text-[#8E8B82] mt-1">Nécessaire pour ouvrir l'archive hors ligne.</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#5A5A40] block mb-1">Confirmer le mot de passe</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8E8B82] absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Répéter le mot de passe"
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#5A5A40] hover:bg-[#F5F2ED] rounded-xl"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isExporting}
              className="px-5 py-2 text-xs font-bold text-white bg-[#8A9A5B] hover:bg-[#78884d] disabled:opacity-50 rounded-xl shadow-xs flex items-center gap-2"
            >
              {isExporting ? 'Génération...' : 'Télécharger (.html)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
