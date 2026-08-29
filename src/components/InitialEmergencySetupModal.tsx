import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Mail,
  Phone,
  MessageSquare,
  UserPlus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Lock,
  HeartHandshake,
  Sparkles,
  ArrowRight,
  X,
  VolumeX,
  Users
} from 'lucide-react';
import { TrustedContact, NotifyChannel, AlertTier } from '../types';
import { StorageService } from '../utils/storage';
import { getGoogleContacts } from '../utils/workspaceApi';

interface InitialEmergencySetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: TrustedContact[];
  onSaveContacts: (updatedContacts: TrustedContact[]) => void;
  onOpenGmailSos?: () => void;
}

export const InitialEmergencySetupModal: React.FC<InitialEmergencySetupModalProps> = ({
  isOpen,
  onClose,
  contacts,
  onSaveContacts,
  onOpenGmailSos,
}) => {
  const [localContacts, setLocalContacts] = useState<TrustedContact[]>(contacts);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState('Amie de confiance');
  const [secretCodeWord, setSecretCodeWord] = useState('Code Rouge - Besoin d\'aide');
  const [tier, setTier] = useState<AlertTier>('primary_sos');
  const [enableSimultaneousAlert, setEnableSimultaneousAlert] = useState(true);
  const [notes, setNotes] = useState('');

  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  useEffect(() => {
    if (contacts.length > 0) {
      setLocalContacts(contacts);
    }
  }, [contacts]);

  if (!isOpen) return null;

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFeedback({ type: 'error', text: 'Veuillez renseigner le nom ou le pseudonyme du contact.' });
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setFeedback({ type: 'error', text: 'Veuillez renseigner au moins un numéro de téléphone ou une adresse courriel.' });
      return;
    }

    const notifyChannel: NotifyChannel = enableSimultaneousAlert ? 'all' : (phone ? 'sms' : 'email');

    const newContact: TrustedContact = {
      id: `tc-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      relationship: relationship.trim(),
      tier,
      notifyBy: notifyChannel,
      isActive: true,
      secretCodeWord: secretCodeWord.trim(),
      notes: notes.trim(),
    };

    const updated = [...localContacts, newContact];
    setLocalContacts(updated);
    onSaveContacts(updated);
    StorageService.saveContacts(updated);

    // Reset form fields for adding another contact
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setFeedback({
      type: 'success',
      text: `« ${newContact.name} » a été ajouté(e) à votre réseau d'alerte silencieux simultané (Courriel, Téléphone & SMS).`,
    });
  };

  const handleRemoveContact = (id: string) => {
    const updated = localContacts.filter(c => c.id !== id);
    setLocalContacts(updated);
    onSaveContacts(updated);
    StorageService.saveContacts(updated);
  };

  const handleImportGoogle = async () => {
    setIsImporting(true);
    setFeedback(null);
    try {
      const gContacts = await getGoogleContacts();
      if (gContacts && gContacts.length > 0) {
        const mapped: TrustedContact[] = [];
        gContacts.forEach((gc: any, i: number) => {
          const cName = gc.names?.[0]?.displayName || 'Contact Google';
          const cPhone = gc.phoneNumbers?.[0]?.value || '';
          const cEmail = gc.emailAddresses?.[0]?.value || '';
          if (cPhone || cEmail) {
            mapped.push({
              id: `gc-${Date.now()}-${i}`,
              name: cName,
              phone: cPhone,
              email: cEmail,
              relationship: 'Contact importé Google',
              tier: 'primary_sos',
              notifyBy: 'all',
              isActive: true,
              secretCodeWord: 'Besoin d\'assistance',
              notes: 'Importé depuis Google Contacts',
            });
          }
        });

        if (mapped.length > 0) {
          const combined = [...localContacts, ...mapped];
          setLocalContacts(combined);
          onSaveContacts(combined);
          StorageService.saveContacts(combined);
          setFeedback({
            type: 'success',
            text: `${mapped.length} contact(s) importé(s) avec succès depuis Google.`,
          });
        } else {
          setFeedback({ type: 'info', text: 'Aucun contact avec numéro ou courriel trouvé.' });
        }
      } else {
        setFeedback({ type: 'info', text: 'Aucun contact pertinent trouvé dans votre compte Google.' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message || 'Impossible d\'importer les contacts Google.' });
    } finally {
      setIsImporting(false);
    }
  };

  const handleFinishSetup = () => {
    StorageService.setInitialEmergencyConfigured();
    onClose();
  };

  return (
    <div
      id="initial-emergency-setup-modal-backdrop"
      className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div
        id="initial-emergency-setup-modal"
        className="bg-[#FFFFFF] rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border border-[#E5E2D9] my-6 flex flex-col max-h-[92vh] text-[#3E3B39] relative animate-in fade-in zoom-in-95"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E5E2D9]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#DC2626]/10 border border-[#DC2626]/20 flex items-center justify-center text-[#DC2626] shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2 font-serif-natural">
                Réseau d'Urgence Silencieux (Gmail, SMS & Téléphone)
              </h2>
              <p className="text-xs text-[#64748B]">
                Ajoutez vos contacts de confiance pour être secourue ou protégée instantanément et silencieusement.
              </p>
            </div>
          </div>
          <button
            onClick={handleFinishSetup}
            className="p-1.5 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Protection Banner */}
        <div className="mt-3 p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-2.5">
          <VolumeX className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
          <div className="text-xs text-[#991B1B] leading-relaxed">
            <strong>Alerte Silencieuse Simultanée :</strong> En cas de danger ou d'activation SOS, HAVEN-ELLE transmet votre position GPS chiffrée et votre message codé <strong>simultanément par courriel Gmail, texto SMS et téléphone</strong>, sans émettre le moindre son.
          </div>
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div
            className={`mt-2.5 p-2.5 rounded-xl text-xs flex items-center justify-between border ${
              feedback.type === 'success'
                ? 'bg-[#ECFDF5] border-[#10B981]/30 text-[#065F46]'
                : feedback.type === 'error'
                ? 'bg-[#FEF2F2] border-[#EF4444]/30 text-[#991B1B]'
                : 'bg-[#EFF6FF] border-[#3B82F6]/30 text-[#1E40AF]'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#10B981]" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0 text-[#DC2626]" />
              )}
              <span>{feedback.text}</span>
            </div>
            <button onClick={() => setFeedback(null)} className="text-[11px] underline">Fermer</button>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1">
          {/* Quick Import Bar */}
          <div className="flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-xl">
            <span className="text-xs text-[#475569] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EA4335]" />
              Gagnez du temps en important vos contacts Google :
            </span>
            <button
              onClick={handleImportGoogle}
              disabled={isImporting}
              className="px-3 py-1.5 bg-white border border-[#CBD5E1] hover:border-[#EA4335] text-[#1E293B] text-xs font-bold rounded-lg shadow-2xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <Users className="w-3.5 h-3.5 text-[#EA4335]" />
              <span>{isImporting ? 'Importation...' : 'Importer Google Contacts'}</span>
            </button>
          </div>

          {/* Form to add a new contact */}
          <form onSubmit={handleAddContact} className="bg-[#FFFFFF] border border-[#CBD5E1] p-4 rounded-xl space-y-3 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
              <h3 className="text-xs font-bold text-[#0F172A] flex items-center gap-1.5 uppercase tracking-wider">
                <UserPlus className="w-4 h-4 text-[#15803D]" />
                Ajouter un contact d'urgence silencieux
              </h3>
              <span className="text-[11px] text-[#64748B] font-medium">Étape prioritaire</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  Nom / Surnom du contact <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex : Julie (Amie), Soeur Sarah, Me Tremblay"
                  className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-hidden focus:border-[#15803D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  Rôle / Relation
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-hidden focus:border-[#15803D]"
                >
                  <option value="Amie de confiance">Amie de confiance</option>
                  <option value="Famille proche">Famille proche (Soeur, Mère, Frère...)</option>
                  <option value="Avocate / Conseillère juridique">Avocate / Conseillère juridique</option>
                  <option value="Travailleuse sociale / CIDFF">Travailleuse sociale / Intervenante</option>
                  <option value="Voisine bienveillante">Voisine bienveillante</option>
                  <option value="Autre allié">Autre allié sûr</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#15803D]" />
                  Téléphone (Appels & SMS / Textos)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex : +33 6 12 34 56 78 ou (514) 555-0199"
                  className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-hidden focus:border-[#15803D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#EA4335]" />
                  Courriel (Alertes directes Gmail)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex : julie.confiance@gmail.com"
                  className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-hidden focus:border-[#EA4335]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#B45309]" />
                  Mot de passe secret / Phrase code
                </label>
                <input
                  type="text"
                  value={secretCodeWord}
                  onChange={(e) => setSecretCodeWord(e.target.value)}
                  placeholder="Ex : « Le soleil se lève », « Peux-tu me rappeler ? »"
                  className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-hidden focus:border-[#15803D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#334155] mb-1">
                  Niveau d'intervention
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl focus:outline-hidden focus:border-[#15803D]"
                >
                  <option value="primary_sos">Niveau 1 : SOS Prioritaire & Immédiat</option>
                  <option value="discreet_support">Niveau 2 : Soutien Discret & Hébergement</option>
                  <option value="legal">Niveau 3 : Assistance Juridique & Preuves</option>
                </select>
              </div>
            </div>

            {/* Multi-channel simultaneous toggle */}
            <div className="pt-2 border-t border-[#E2E8F0]">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#0F172A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableSimultaneousAlert}
                  onChange={(e) => setEnableSimultaneousAlert(e.target.checked)}
                  className="rounded text-[#DC2626] focus:ring-[#DC2626]"
                />
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
                  Activer la transmission silencieuse simultanée (Courriel Gmail + Texto SMS + Appel)
                </span>
              </label>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Ajouter ce contact</span>
              </button>
            </div>
          </form>

          {/* List of currently registered contacts */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#334155] flex items-center justify-between">
              <span>Contacts enregistrés dans votre réseau ({localContacts.length}) :</span>
              {onOpenGmailSos && (
                <button
                  type="button"
                  onClick={() => {
                    handleFinishSetup();
                    onOpenGmailSos();
                  }}
                  className="text-[11px] font-bold text-[#EA4335] hover:underline flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  Tester l'alerte Gmail SOS
                </button>
              )}
            </h4>

            {localContacts.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-[#CBD5E1] text-center text-xs text-[#64748B] bg-[#F8FAFC]">
                <HeartHandshake className="w-6 h-6 mx-auto text-[#94A3B8] mb-1" />
                Aucun contact configuré pour l'instant. Renseignez au moins un proche ci-dessus.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {localContacts.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl border border-[#E2E8F0] bg-white flex items-start justify-between gap-2 shadow-2xs"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#15803D] shrink-0" />
                        <span className="text-xs font-bold text-[#0F172A] truncate">{c.name}</span>
                        <span className="text-[10px] text-[#64748B] px-1.5 py-0.5 bg-[#F1F5F9] rounded-md truncate">
                          {c.relationship}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#475569] space-y-0.5">
                        {c.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-[#15803D]" />
                            <span>{c.phone}</span>
                          </div>
                        )}
                        {c.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-[#EA4335]" />
                            <span className="truncate">{c.email}</span>
                          </div>
                        )}
                        {c.secretCodeWord && (
                          <div className="text-[10px] text-[#B45309] font-mono">
                            Code : « {c.secretCodeWord} »
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveContact(c.id)}
                      className="p-1 text-[#94A3B8] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                      title="Supprimer ce contact"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-[#E5E2D9] flex items-center justify-between">
          <span className="text-xs text-[#64748B]">
            {localContacts.length} contact{localContacts.length > 1 ? 's' : ''} prêt{localContacts.length > 1 ? 's' : ''} pour alerte simultanée.
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleFinishSetup}
              className="px-5 py-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
            >
              <span>Enregistrer & Activer la Protection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
