import React, { useState, useEffect } from 'react';
import { Users, X, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { fetchGoogleContacts } from '../utils/googleWorkspace';
import { TrustedContact } from '../types';

interface GoogleContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactsImported: (contacts: TrustedContact[]) => void;
}

export const GoogleContactsModal: React.FC<GoogleContactsModalProps> = ({
  isOpen,
  onClose,
  onContactsImported,
}) => {
  const [googleContacts, setGoogleContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isOpen) {
      loadContacts();
    }
  }, [isOpen]);

  const loadContacts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const connections = await fetchGoogleContacts();
      setGoogleContacts(connections);
    } catch (err: any) {
      console.error(err);
      setError('Impossible de récupérer vos contacts Google. Veuillez vérifier votre connexion et vos permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSelection = (index: number) => {
    const newSelection = new Set(selectedIndices);
    if (newSelection.has(index)) {
      newSelection.delete(index);
    } else {
      newSelection.add(index);
    }
    setSelectedIndices(newSelection);
  };

  const handleImport = () => {
    const importedContacts: TrustedContact[] = [];
    selectedIndices.forEach((index) => {
      const contact = googleContacts[index];
      const name = contact.names?.[0]?.displayName || 'Contact Inconnu';
      const phone = contact.phoneNumbers?.[0]?.value || '';
      const email = contact.emailAddresses?.[0]?.value || '';

      if (phone || email) {
        importedContacts.push({
          id: `gc-${Date.now().toString(36)}-${index}`,
          name,
          relationship: 'Contact Google',
          phone,
          email,
          tier: 'primary_sos',
          notifyBy: 'all',
          secretCodeWord: '',
          notes: '',
          isActive: true,
        });
      }
    });

    onContactsImported(importedContacts);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FFFFFF] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E2D9] my-8 flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#3E3B39] font-serif-natural flex items-center gap-2">
            <Users className="w-5 h-5 text-[#4285F4]" />
            Importer Google Contacts
          </h3>
          <button onClick={onClose} className="p-2 text-[#8E8B82] hover:bg-[#F5F2ED] rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-[#F5E6E0] border border-[#A64D4D]/30 text-[#A64D4D] rounded-xl text-xs flex items-start gap-2 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-[#5A5A40]">
            <RefreshCw className="w-8 h-8 animate-spin mb-3 text-[#4285F4]" />
            <p className="text-xs font-semibold">Chargement de vos contacts Google...</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-2 space-y-2 mb-4">
            {googleContacts.length === 0 ? (
              <p className="text-center text-xs text-[#8E8B82] py-8">Aucun contact Google trouvé avec email ou téléphone.</p>
            ) : (
              googleContacts.map((contact, idx) => {
                const name = contact.names?.[0]?.displayName || 'Sans nom';
                const phone = contact.phoneNumbers?.[0]?.value;
                const email = contact.emailAddresses?.[0]?.value;
                const isSelected = selectedIndices.has(idx);

                if (!phone && !email) return null;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleSelection(idx)}
                    className={`w-full text-left flex items-center gap-3 p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-[#E5EAD9]/30 border-[#8A9A5B] shadow-xs'
                        : 'bg-[#F8F7F2] border-[#E5E2D9] hover:bg-white hover:border-[#CED6C1]'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                      isSelected ? 'bg-[#8A9A5B] border-[#8A9A5B] text-white' : 'bg-white border-[#CED6C1]'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[#3E3B39] truncate">{name}</p>
                      <p className="text-[11px] text-[#8E8B82] truncate">
                        {[phone, email].filter(Boolean).join(' • ')}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}

        <div className="pt-4 border-t border-[#E5E2D9] flex justify-end gap-2 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#5A5A40] hover:bg-[#F5F2ED] rounded-xl"
          >
            Annuler
          </button>
          <button
            type="button"
            disabled={selectedIndices.size === 0 || isLoading}
            onClick={handleImport}
            className="px-5 py-2 text-xs font-bold text-white bg-[#4285F4] hover:bg-[#3367D6] disabled:opacity-50 rounded-xl shadow-xs"
          >
            Importer {selectedIndices.size > 0 ? `(${selectedIndices.size})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
};
