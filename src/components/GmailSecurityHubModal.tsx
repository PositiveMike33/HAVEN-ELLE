import React, { useState, useEffect } from 'react';
import {
  Mail,
  X,
  RefreshCw,
  Send,
  Trash2,
  ShieldCheck,
  AlertTriangle,
  FileText,
  UserCheck,
  MapPin,
  CheckCircle2,
  Eye,
  EyeOff,
  Inbox,
  PenSquare,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import {
  listGmailMessages,
  getGmailMessageDetails,
  sendGmailMessage,
  deleteGmailMessage,
  sendEmergencySosEmail,
  sendEvidenceDossierEmail,
  GmailMessageSummary,
  GmailMessageFull
} from '../utils/gmailService';
import { TrustedContact, IncidentRecord } from '../types';
import { StorageService } from '../utils/storage';

interface GmailSecurityHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: TrustedContact[];
  incidents: IncidentRecord[];
  initialMode?: 'inbox' | 'compose' | 'sos' | 'dossier';
  initialRecipient?: string;
  initialSubject?: string;
  initialBody?: string;
}

export const GmailSecurityHubModal: React.FC<GmailSecurityHubModalProps> = ({
  isOpen,
  onClose,
  contacts,
  incidents,
  initialMode = 'inbox',
  initialRecipient = '',
  initialSubject = '',
  initialBody = '',
}) => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'compose' | 'sos'>('inbox');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<GmailMessageFull | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Compose State
  const [composeTo, setComposeTo] = useState(initialRecipient);
  const [composeSubject, setComposeSubject] = useState(initialSubject);
  const [composeBody, setComposeBody] = useState(initialBody);
  const [isSending, setIsSending] = useState(false);

  // Confirmation Modal state for destructive operations / sending
  const [confirmationAction, setConfirmationAction] = useState<{
    type: 'delete' | 'send' | 'sos';
    targetId?: string;
    title: string;
    description: string;
    onConfirm: () => Promise<void>;
  } | null>(null);

  // SOS mass email state
  const [selectedContactIds, setSelectedContactIds] = useState<Set<string>>(new Set());
  const [includeLocationInSos, setIncludeLocationInSos] = useState(true);
  const [sosCustomNote, setSosCustomNote] = useState('Je sollicite une assistance immédiate et sécurisée. Merci de me contacter ou de prévenir les secours.');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Discreet Camouflage Toggle
  const [isDiscreetView, setIsDiscreetView] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialMode === 'compose' || initialMode === 'dossier') {
        setActiveTab('compose');
      } else if (initialMode === 'sos') {
        setActiveTab('sos');
      } else {
        setActiveTab('inbox');
      }

      if (initialRecipient) setComposeTo(initialRecipient);
      if (initialSubject) setComposeSubject(initialSubject);
      if (initialBody) setComposeBody(initialBody);

      // Pre-select all contacts with email for SOS tab
      const validIds = new Set(contacts.filter(c => c.email && c.isEmergencyContact).map(c => c.id));
      setSelectedContactIds(validIds);

      // Get GPS if available
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          (err) => console.log('Location not available:', err.message),
          { timeout: 8000 }
        );
      }

      if (activeTab === 'inbox') {
        loadInbox();
      }
    }
  }, [isOpen, initialMode, initialRecipient, initialSubject, initialBody]);

  const loadInbox = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const msgs = await listGmailMessages(searchQuery || undefined, 15);
      setMessages(msgs);
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Impossible de charger vos courriels Gmail. Vérifiez votre connexion.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMessage = async (msgSummary: GmailMessageSummary) => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const full = await getGmailMessageDetails(msgSummary.id);
      setSelectedMessage(full);
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Erreur lors du chargement du message.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const requestDeleteMessage = (msgId: string, subjectTitle: string) => {
    setConfirmationAction({
      type: 'delete',
      targetId: msgId,
      title: 'Supprimer définitivement ce courriel ?',
      description: `Êtes-vous certaine de vouloir supprimer le message « ${subjectTitle} » de votre compte Gmail ? Cette action est irréversible.`,
      onConfirm: async () => {
        setIsLoading(true);
        try {
          await deleteGmailMessage(msgId);
          setMessages(prev => prev.filter(m => m.id !== msgId));
          if (selectedMessage?.id === msgId) {
            setSelectedMessage(null);
          }
          setStatusMessage({ type: 'success', text: 'Courriel supprimé avec succès de votre boîte Gmail.' });
        } catch (err: any) {
          setStatusMessage({ type: 'error', text: err.message || 'Erreur lors de la suppression.' });
        } finally {
          setIsLoading(false);
          setConfirmationAction(null);
        }
      },
    });
  };

  const handleApplyTemplate = (templateType: 'sos' | 'dossier' | 'appointment' | 'legal') => {
    if (templateType === 'sos') {
      setComposeSubject(`[URGENT] Demande d'assistance prioritaire • HAVEN-ELLE`);
      const locStr = currentLocation ? `\nPosition GPS actuelle : https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}` : '';
      setComposeBody(`Bonjour,\n\nJe t'envoie ce message en urgence. J'ai besoin de ton aide rapide et sécurisée.${locStr}\n\nMerci de me contacter par appel ou texto dès réception.`);
    } else if (templateType === 'dossier') {
      setComposeSubject(`[CONFIDENTIEL] Dossier d'incidents & Chronologie des faits`);
      const dossierSummary = incidents.map((inc, i) => `#${i + 1} (${inc.date}) - ${inc.title}: ${inc.description}`).join('\n\n');
      setComposeBody(`Bonjour,\n\nVeuillez trouver ci-dessous l'état de mes démarches et le relevé des faits enregistrés en toute souveraineté :\n\n${dossierSummary || '(Aucun incident consigné pour le moment)'}\n\nRestant à votre disposition pour tout échange confidentiel.`);
    } else if (templateType === 'appointment') {
      setComposeSubject(`Demande de rendez-vous confidentiel`);
      setComposeBody(`Bonjour,\n\nJe souhaiterais planifier un rendez-vous confidentiel (en personne ou par visioconférence sécurisée) afin de faire le point sur ma situation personnelle et mes démarches.\n\nQuelles seraient vos disponibilités prochaines ?\n\nBien cordialement.`);
    } else if (templateType === 'legal') {
      setComposeSubject(`Demande d'assistance juridique et protection`);
      setComposeBody(`Madame, Monsieur l'avocat,\n\nJe sollicite vos conseils juridiques concernant ma situation personnelle et la protection de mes droits (garde d'enfants, logement, mesures de protection).\n\nJe dispose d'un dossier documenté prêt à vous être transmis en toute confidentialité.\n\nMerci pour votre écoute.`);
    }
  };

  const handleSendCompose = () => {
    if (!composeTo.trim()) {
      setStatusMessage({ type: 'error', text: 'Veuillez renseigner une adresse e-mail destinataire.' });
      return;
    }
    if (!composeSubject.trim()) {
      setStatusMessage({ type: 'error', text: 'Veuillez saisir un objet pour votre courriel.' });
      return;
    }

    setConfirmationAction({
      type: 'send',
      title: 'Confirmer l\'envoi du courriel',
      description: `Vous êtes sur le point d'envoyer un courriel à ${composeTo} avec l'objet « ${composeSubject} ». Confirmez-vous l'expédition ?`,
      onConfirm: async () => {
        setIsSending(true);
        setStatusMessage(null);
        try {
          await sendGmailMessage(composeTo, composeSubject, composeBody);
          setStatusMessage({ type: 'success', text: `Courriel transmis avec succès à ${composeTo} via Gmail !` });
          setComposeSubject('');
          setComposeBody('');
          setComposeTo('');
        } catch (err: any) {
          setStatusMessage({ type: 'error', text: err.message || 'Échec de l\'envoi du courriel.' });
        } finally {
          setIsSending(false);
          setConfirmationAction(null);
        }
      },
    });
  };

  const handleSendSimultaneousMultiChannelSos = () => {
    const selectedContacts = contacts.filter(c => selectedContactIds.has(c.id));
    if (selectedContacts.length === 0) {
      setStatusMessage({ type: 'error', text: 'Veuillez sélectionner au moins un contact.' });
      return;
    }

    setConfirmationAction({
      type: 'sos',
      title: `Déclencher l'Alerte Silencieuse Totale (Gmail + SMS + Appel) ?`,
      description: `Une alerte discrète sera diffusée simultanément par courriel Gmail et préparée par SMS / Appel à : ${selectedContacts.map(c => c.name).join(', ')}.`,
      onConfirm: async () => {
        setIsSending(true);
        setStatusMessage(null);
        let successCount = 0;
        let errors: string[] = [];

        // 1. Send Gmail SOS
        const emailContacts = selectedContacts.filter(c => c.email);
        for (const contact of emailContacts) {
          const res = await sendEmergencySosEmail(
            contact,
            includeLocationInSos ? currentLocation : null,
            sosCustomNote
          );
          if (res.success) {
            successCount++;
          } else if (res.error) {
            errors.push(`${contact.name}: ${res.error}`);
          }
        }

        // 2. Build SMS URI for phones
        const phoneContacts = selectedContacts.filter(c => c.phone);
        if (phoneContacts.length > 0) {
          const locationText = includeLocationInSos && currentLocation
            ? `\nGPS: https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`
            : '';
          const smsPayload = `[SOS HAVEN-ELLE] ${sosCustomNote}${locationText}`;
          const phoneList = phoneContacts.map(c => c.phone).join(',');
          
          // Open SMS window quietly if possible
          const smsUri = `sms:${phoneList}?body=${encodeURIComponent(smsPayload)}`;
          window.open(smsUri, '_self');
        }

        // 3. Save alert in storage
        StorageService.saveAlert({
          id: `alert-multi-${Date.now()}`,
          timestamp: new Date().toISOString(),
          mode: 'emergency_sos',
          message: sosCustomNote,
          status: 'DISPATCHED',
          recipients: selectedContacts.map(c => ({
            name: c.name,
            phone: c.phone,
            email: c.email,
            tier: c.tier,
          })),
          location: currentLocation ? {
            latitude: currentLocation.lat,
            longitude: currentLocation.lng,
            accuracy: 10,
            mapsUrl: `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`,
            timestamp: Date.now(),
          } : undefined,
          isTest: false,
        });

        setIsSending(false);
        setConfirmationAction(null);

        setStatusMessage({
          type: 'success',
          text: `Alerte silencieuse multi-canal activée ! (${successCount} courriel(s) Gmail envoyés + SMS/Appels prêts).`,
        });
      },
    });
  };

  const handleSendMassSos = () => {
    const selectedContacts = contacts.filter(c => selectedContactIds.has(c.id) && c.email);
    if (selectedContacts.length === 0) {
      setStatusMessage({ type: 'error', text: 'Veuillez sélectionner au moins un contact ayant une adresse e-mail valide.' });
      return;
    }

    setConfirmationAction({
      type: 'sos',
      title: `Déclencher l'alerte e-mail SOS (${selectedContacts.length} destinataire${selectedContacts.length > 1 ? 's' : ''}) ?`,
      description: `Un courriel d'alerte avec ${includeLocationInSos && currentLocation ? 'votre position géographique' : 'votre note d\'urgence'} sera immédiatement envoyé à : ${selectedContacts.map(c => c.name).join(', ')}.`,
      onConfirm: async () => {
        setIsSending(true);
        setStatusMessage(null);
        let successCount = 0;
        let errors: string[] = [];

        for (const contact of selectedContacts) {
          const res = await sendEmergencySosEmail(
            contact,
            includeLocationInSos ? currentLocation : null,
            sosCustomNote
          );
          if (res.success) {
            successCount++;
          } else if (res.error) {
            errors.push(`${contact.name}: ${res.error}`);
          }
        }

        setIsSending(false);
        setConfirmationAction(null);

        if (successCount > 0) {
          setStatusMessage({
            type: 'success',
            text: `Alerte SOS transmise à ${successCount} contact(s) de confiance via Gmail.`,
          });
        }
        if (errors.length > 0) {
          setStatusMessage({
            type: 'error',
            text: `Erreurs pour certains contacts : ${errors.join(', ')}`,
          });
        }
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        id="gmail-security-hub-modal"
        className="bg-[#FFFFFF] rounded-2xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl border border-[#E5E2D9] my-6 flex flex-col max-h-[90vh] text-[#3E3B39]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E2D9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EA4335]/10 border border-[#EA4335]/20 flex items-center justify-center text-[#EA4335] shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1E293B] flex items-center gap-2 font-serif-natural">
                {isDiscreetView ? 'Messagerie & Notes Sécurisées' : 'Passerelle Gmail Sécurisée HAVEN-ELLE'}
              </h2>
              <p className="text-xs text-[#64748B]">
                {isDiscreetView
                  ? 'Gestion confidentielle de vos échanges et sauvegardes'
                  : 'Connexion directe à votre compte Gmail pour alertes, preuves et échanges confidentiels'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDiscreetView(!isDiscreetView)}
              title={isDiscreetView ? 'Mode standard' : 'Mode discret / camouflage'}
              className="p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded-xl transition-colors text-xs flex items-center gap-1 border border-transparent hover:border-[#CBD5E1]"
            >
              {isDiscreetView ? <Eye className="w-4 h-4 text-[#059669]" /> : <EyeOff className="w-4 h-4" />}
              <span className="hidden sm:inline">{isDiscreetView ? 'Mode clair' : 'Discret'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-[#F1F5F9] rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E5E2D9] pt-3 gap-2 text-sm overflow-x-auto">
          <button
            onClick={() => { setActiveTab('inbox'); loadInbox(); }}
            className={`pb-3 px-3.5 font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'inbox'
                ? 'border-[#EA4335] text-[#EA4335] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            Boîte de Réception
          </button>
          <button
            onClick={() => setActiveTab('compose')}
            className={`pb-3 px-3.5 font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'compose'
                ? 'border-[#EA4335] text-[#EA4335] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <PenSquare className="w-4 h-4" />
            Rédiger / Modèles
          </button>
          <button
            onClick={() => setActiveTab('sos')}
            className={`pb-3 px-3.5 font-medium flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'sos'
                ? 'border-[#E11D48] text-[#E11D48] font-bold'
                : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-[#E11D48]" />
            Alerte SOS E-mail ({contacts.filter(c => c.email).length})
          </button>
        </div>

        {/* Status Notification */}
        {statusMessage && (
          <div
            className={`mt-3 p-3 rounded-xl text-xs flex items-center justify-between border ${
              statusMessage.type === 'success'
                ? 'bg-[#ECFDF5] border-[#10B981]/30 text-[#065F46]'
                : statusMessage.type === 'error'
                ? 'bg-[#FEF2F2] border-[#EF4444]/30 text-[#991B1B]'
                : 'bg-[#EFF6FF] border-[#3B82F6]/30 text-[#1E40AF]'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#10B981]" />
              ) : (
                <AlertTriangle className="w-4 h-4 shrink-0 text-[#EF4444]" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              onClick={() => setStatusMessage(null)}
              className="text-xs underline hover:opacity-75 ml-2"
            >
              Fermer
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4">
          {/* TAB 1: INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && loadInbox()}
                    placeholder="Rechercher par expéditeur, mot-clé..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-hidden focus:border-[#EA4335]"
                  />
                </div>
                <button
                  onClick={loadInbox}
                  disabled={isLoading}
                  className="px-3 py-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Actualiser</span>
                </button>
              </div>

              {selectedMessage ? (
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2 border-b border-[#E2E8F0] pb-3">
                    <div>
                      <h3 className="font-bold text-sm text-[#0F172A]">{selectedMessage.subject}</h3>
                      <div className="text-xs text-[#64748B] mt-1 space-y-0.5">
                        <p><strong className="text-[#334155]">De :</strong> {selectedMessage.from}</p>
                        <p><strong className="text-[#334155]">À :</strong> {selectedMessage.to}</p>
                        <p><strong className="text-[#334155]">Date :</strong> {selectedMessage.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setComposeTo(selectedMessage.from?.match(/<([^>]+)>/)?.[1] || selectedMessage.from || '');
                          setComposeSubject(`Re: ${selectedMessage.subject}`);
                          setActiveTab('compose');
                        }}
                        className="px-2.5 py-1.5 bg-[#FFFFFF] border border-[#CBD5E1] text-[#334155] text-xs font-medium rounded-lg hover:bg-[#F1F5F9] flex items-center gap-1"
                      >
                        <Send className="w-3 h-3" />
                        Répondre
                      </button>
                      <button
                        onClick={() => requestDeleteMessage(selectedMessage.id, selectedMessage.subject || 'Message')}
                        className="p-1.5 text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-colors"
                        title="Supprimer ce courriel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedMessage(null)}
                        className="p-1.5 text-[#64748B] hover:bg-[#E2E8F0] rounded-lg transition-colors text-xs"
                      >
                        Retour
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-[#1E293B] leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap font-sans bg-white p-3.5 rounded-lg border border-[#E2E8F0]">
                    {selectedMessage.bodyText || 'Contenu textuel non disponible directement.'}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {isLoading && messages.length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#64748B] space-y-2">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#EA4335]" />
                      <p>Synchronisation sécurisée avec Gmail...</p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#64748B] bg-[#F8FAFC] rounded-xl border border-dashed border-[#CBD5E1] p-6">
                      <Mail className="w-8 h-8 mx-auto text-[#94A3B8] mb-2" />
                      <p className="font-semibold text-[#334155]">Aucun courriel récent trouvé.</p>
                      <p className="text-[11px] text-[#64748B] mt-1">Utilisez l'onglet Rédiger pour envoyer une alerte ou transmettre des éléments.</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        onClick={() => handleSelectMessage(msg)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          msg.unread
                            ? 'bg-[#FEF2F2]/60 border-[#FECACA] hover:bg-[#FEE2E2]/70 font-semibold'
                            : 'bg-[#FFFFFF] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            {msg.unread && (
                              <span className="w-2 h-2 rounded-full bg-[#EA4335] shrink-0" />
                            )}
                            <span className="text-xs font-bold text-[#1E293B] truncate">
                              {msg.from?.replace(/<.*>/, '') || 'Expéditeur'}
                            </span>
                            <span className="text-[10px] text-[#94A3B8] shrink-0 ml-auto">
                              {msg.date ? new Date(msg.date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' }) : ''}
                            </span>
                          </div>
                          <p className="text-xs text-[#334155] font-medium truncate mt-0.5">
                            {msg.subject || '(Sans objet)'}
                          </p>
                          <p className="text-[11px] text-[#64748B] truncate mt-0.5">
                            {msg.snippet || ''}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              requestDeleteMessage(msg.id, msg.subject || 'Message');
                            }}
                            className="p-1.5 text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#FEE2E2] rounded-lg transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: COMPOSE & TEMPLATES */}
          {activeTab === 'compose' && (
            <div className="space-y-4">
              {/* Quick Template Badges */}
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#334155] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#EA4335]" />
                    Modèles de courriels rapides & sécurisés :
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    onClick={() => handleApplyTemplate('sos')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] hover:bg-[#FEE2E2] font-semibold transition-colors flex items-center gap-1"
                  >
                    <AlertTriangle className="w-3 h-3 text-[#DC2626]" />
                    Alerte SOS Immédiate
                  </button>
                  <button
                    onClick={() => handleApplyTemplate('dossier')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] hover:bg-[#DBEAFE] font-semibold transition-colors flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3 text-[#2563EB]" />
                    Dossier de Preuves ({incidents.length})
                  </button>
                  <button
                    onClick={() => handleApplyTemplate('legal')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#FAF5FF] border border-[#E9D5FF] text-[#6B21A8] hover:bg-[#F3E8FF] font-semibold transition-colors flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3 h-3 text-[#9333EA]" />
                    Assistance Juridique
                  </button>
                  <button
                    onClick={() => handleApplyTemplate('appointment')}
                    className="px-2.5 py-1.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] hover:bg-[#DCFCE7] font-semibold transition-colors flex items-center gap-1"
                  >
                    <UserCheck className="w-3 h-3 text-[#16A34A]" />
                    Rendez-vous Thérapeutique
                  </button>
                </div>
              </div>

              {/* Recipient from contacts */}
              {contacts.filter(c => c.email).length > 0 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  <span className="text-[#64748B] shrink-0 font-medium">Contacts enregistrés :</span>
                  {contacts.filter(c => c.email).map(c => (
                    <button
                      key={c.id}
                      onClick={() => setComposeTo(c.email || '')}
                      className="px-2.5 py-1 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-[#CBD5E1] text-[#334155] font-medium shrink-0 transition-colors"
                    >
                      {c.name} ({c.email})
                    </button>
                  ))}
                </div>
              )}

              {/* Form fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Destinataire (E-mail) :
                  </label>
                  <input
                    type="email"
                    value={composeTo}
                    onChange={(e) => setComposeTo(e.target.value)}
                    placeholder="exemple@domaine.com, avocat@justice.qc.ca..."
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl focus:outline-hidden focus:border-[#EA4335]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Objet :
                  </label>
                  <input
                    type="text"
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                    placeholder="Objet de votre message..."
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl focus:outline-hidden focus:border-[#EA4335]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Corps du message :
                  </label>
                  <textarea
                    value={composeBody}
                    onChange={(e) => setComposeBody(e.target.value)}
                    rows={6}
                    placeholder="Rédigez votre message ici..."
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl focus:outline-hidden focus:border-[#EA4335] leading-relaxed resize-y"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setComposeTo('');
                      setComposeSubject('');
                      setComposeBody('');
                    }}
                    className="px-4 py-2 text-xs font-medium text-[#64748B] hover:bg-[#F1F5F9] rounded-xl transition-colors"
                  >
                    Effacer
                  </button>
                  <button
                    onClick={handleSendCompose}
                    disabled={isSending || !composeTo || !composeSubject}
                    className="px-5 py-2 bg-[#EA4335] hover:bg-[#DC2626] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSending ? 'Envoi en cours...' : 'Envoyer le courriel via Gmail'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MASS SOS EMAIL */}
          {activeTab === 'sos' && (
            <div className="space-y-4">
              <div className="bg-[#FEF2F2] border border-[#FECACA] p-4 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-[#991B1B]">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-[#DC2626]" />
                  <h3 className="font-bold text-sm">Déclencheur d'Alerte SOS par Courriel</h3>
                </div>
                <p className="text-xs text-[#7F1D1D] leading-relaxed">
                  Cette fonction envoie instantanément un courriel d'urgence officiel et sécurisé à vos contacts de confiance préalablement configurés avec une adresse e-mail.
                </p>

                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold text-[#334155] block">Sélectionnez les destinataires :</span>
                  {contacts.filter(c => c.email).length === 0 ? (
                    <p className="text-xs text-[#64748B] italic bg-white p-3 rounded-lg border border-[#E2E8F0]">
                      Aucun de vos contacts n'a d'adresse e-mail configurée. Ajoutez une adresse dans l'onglet « Contacts de confiance ».
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {contacts.filter(c => c.email).map((c) => (
                        <label
                          key={c.id}
                          className={`p-2.5 rounded-xl border flex items-center gap-3 cursor-pointer text-xs transition-colors ${
                            selectedContactIds.has(c.id)
                              ? 'bg-white border-[#DC2626] shadow-xs'
                              : 'bg-white/60 border-[#E2E8F0] opacity-70'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedContactIds.has(c.id)}
                            onChange={(e) => {
                              const newSet = new Set(selectedContactIds);
                              if (e.target.checked) newSet.add(c.id);
                              else newSet.delete(c.id);
                              setSelectedContactIds(newSet);
                            }}
                            className="rounded text-[#DC2626] focus:ring-[#DC2626]"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-[#1E293B] block truncate">{c.name}</span>
                            <span className="text-[11px] text-[#64748B] block truncate">{c.email}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-[#FECACA]">
                  <label className="flex items-center gap-2 text-xs font-semibold text-[#1E293B] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeLocationInSos}
                      onChange={(e) => setIncludeLocationInSos(e.target.checked)}
                      className="rounded text-[#DC2626] focus:ring-[#DC2626]"
                    />
                    <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>Inclure mes coordonnées géographiques actuelles (GPS)</span>
                  </label>
                  {includeLocationInSos && currentLocation && (
                    <p className="text-[11px] text-[#059669] pl-5">
                      Coordonnées prêtes : {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] mb-1">
                    Message d'accompagnement de l'alerte :
                  </label>
                  <textarea
                    value={sosCustomNote}
                    onChange={(e) => setSosCustomNote(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 text-xs bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl focus:outline-hidden focus:border-[#DC2626]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
                  <button
                    onClick={handleSendMassSos}
                    disabled={isSending || selectedContactIds.size === 0}
                    className="px-4 py-2.5 bg-white border border-[#DC2626] text-[#DC2626] hover:bg-[#FEF2F2] text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Courriel Gmail Uniquement</span>
                  </button>
                  <button
                    onClick={handleSendSimultaneousMultiChannelSos}
                    disabled={isSending || selectedContactIds.size === 0}
                    className="px-6 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>
                      {isSending ? 'Transmission en cours...' : `Alerte Silencieuse Totale (Gmail + SMS + Appel)`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirmation Modal Overlay (Mandatory for mutating/destructive actions) */}
        {confirmationAction && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-60 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#CBD5E1] space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    confirmationAction.type === 'delete'
                      ? 'bg-[#FEE2E2] text-[#DC2626]'
                      : confirmationAction.type === 'sos'
                      ? 'bg-[#FEF2F2] text-[#DC2626]'
                      : 'bg-[#EFF6FF] text-[#2563EB]'
                  }`}
                >
                  {confirmationAction.type === 'delete' ? (
                    <Trash2 className="w-5 h-5" />
                  ) : confirmationAction.type === 'sos' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A]">{confirmationAction.title}</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">Confirmation explicite requise</p>
                </div>
              </div>

              <p className="text-xs text-[#334155] leading-relaxed bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                {confirmationAction.description}
              </p>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setConfirmationAction(null)}
                  disabled={isLoading || isSending}
                  className="px-4 py-2 text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9] rounded-xl transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => confirmationAction.onConfirm()}
                  disabled={isLoading || isSending}
                  className={`px-5 py-2 text-xs font-bold text-white rounded-xl shadow-md transition-all ${
                    confirmationAction.type === 'delete'
                      ? 'bg-[#DC2626] hover:bg-[#B91C1C]'
                      : confirmationAction.type === 'sos'
                      ? 'bg-[#DC2626] hover:bg-[#B91C1C]'
                      : 'bg-[#2563EB] hover:bg-[#1D4ED8]'
                  }`}
                >
                  {isLoading || isSending ? 'Traitement...' : 'Confirmer l\'action'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
