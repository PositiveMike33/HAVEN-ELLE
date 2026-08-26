import React, { useState, useEffect } from 'react';
import { 
  Users, UserPlus, ShieldAlert, Phone, Mail, Edit3, Trash2, CheckCircle, 
  AlertCircle, Key, Radio, MapPin, Plus, Lock, HeartHandshake, FileText, Check, Shield, MessageSquare, Video
} from 'lucide-react';
import { TrustedContact, AlertTier, NotifyChannel, EmergencyAlert } from '../types';
import { StorageService } from '../utils/storage';
import { AlertTriggerModal } from './AlertTriggerModal';
import { GoogleContactsModal } from './GoogleContactsModal';
import { googleSignIn, initAuth } from '../utils/firebaseAuth';
import { createGoogleMeet, sendGoogleChatMessage, getGoogleChatSpaces } from '../utils/workspaceApi';

interface TrustedContactsManagerProps {
  contacts: TrustedContact[];
  onUpdateContacts: (contacts: TrustedContact[]) => void;
  alerts: EmergencyAlert[];
  onAlertDispatched: (alert: EmergencyAlert) => void;
}

export const TrustedContactsManager: React.FC<TrustedContactsManagerProps> = ({
  contacts,
  onUpdateContacts,
  alerts,
  onAlertDispatched,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportGoogleContacts, setShowImportGoogleContacts] = useState(false);
  const [editingContact, setEditingContact] = useState<TrustedContact | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMode, setAlertMode] = useState<'emergency_sos' | 'secret_code' | 'check_in'>('emergency_sos');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const [needsAuth, setNeedsAuth] = useState(true);
  const [chatSpaces, setChatSpaces] = useState<{name: string; displayName: string}[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  
  useEffect(() => {
    initAuth(
      (user, token) => {
        setNeedsAuth(false);
        loadChatSpaces();
      },
      () => setNeedsAuth(true)
    );
  }, []);

  const loadChatSpaces = async () => {
    const spaces = await getGoogleChatSpaces();
    setChatSpaces(spaces);
    if (spaces.length > 0) {
      setSelectedSpace(spaces[0].name);
    }
  };

  const handleLogin = async () => {
    try {
      await googleSignIn();
      setNeedsAuth(false);
      loadChatSpaces();
    } catch (err) {
      showToast('Erreur lors de la connexion Google');
    }
  };

  const handleCreateMeet = async () => {
    const uri = await createGoogleMeet();
    if (uri) {
      showToast('Lien Google Meet créé avec succès !');
      window.open(uri, '_blank');
    } else {
      showToast('Erreur lors de la création du Google Meet');
    }
  };

  const handleSendChatMessage = async () => {
    if (!selectedSpace) {
      showToast('Sélectionnez un espace Google Chat');
      return;
    }
    const success = await sendGoogleChatMessage(selectedSpace, 'ALERTE SILENCIEUSE - Ceci est un message d\'urgence depuis Haven.');
    if (success) {
      showToast('Message Google Chat envoyé avec succès !');
    } else {
      showToast('Erreur lors de l\'envoi du message Google Chat');
    }
  };

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    relationship: string;
    phone: string;
    email: string;
    tier: AlertTier;
    notifyBy: NotifyChannel;
    secretCodeWord: string;
    notes: string;
    isActive: boolean;
  }>({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    tier: 'primary_sos',
    notifyBy: 'all',
    secretCodeWord: '',
    notes: '',
    isActive: true,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingContact(null);
    setFormData({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      tier: 'primary_sos',
      notifyBy: 'all',
      secretCodeWord: 'Café annulé',
      notes: '',
      isActive: true,
    });
    setShowAddModal(true);
  };

  const handleOpenEdit = (contact: TrustedContact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      email: contact.email,
      tier: contact.tier,
      notifyBy: contact.notifyBy,
      secretCodeWord: contact.secretCodeWord || '',
      notes: contact.notes || '',
      isActive: contact.isActive,
    });
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûre de vouloir retirer ce contact de confiance ?')) {
      const updated = contacts.filter((c) => c.id !== id);
      onUpdateContacts(updated);
      StorageService.saveContacts(updated);
      showToast('Contact retiré avec succès.');
    }
  };

  const handleToggleActive = (id: string) => {
    const updated = contacts.map((c) =>
      c.id === id ? { ...c, isActive: !c.isActive } : c
    );
    onUpdateContacts(updated);
    StorageService.saveContacts(updated);
  };

  const handleQuickSilentSms = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const targetNumber = '1-438-543-2555';
    const cleanNumber = '14385432555';
    const secretPass = 'Mamadou';

    const dispatchAndOpenSms = (lat?: number, lng?: number, accuracy?: number) => {
      const mapsUrl = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : 'Localisation GPS en cours de transmission';
      const bodyText = `ALERTE SILENCIEUSE - Mot de passe secret : ${secretPass}. Besoin d'assistance immédiate. Localisation automatique : ${mapsUrl}`;

      const alertPayload: EmergencyAlert = {
        id: `ALT-SMS-${Date.now().toString(36).toUpperCase()}`,
        timestamp: new Date().toISOString(),
        mode: 'silent_beacon',
        message: bodyText,
        status: 'DISPATCHED',
        recipients: [
          {
            name: 'Michael Gauthier Guillet (Contact Prioritaire)',
            phone: targetNumber,
            email: 'mikegauthierguillet@gmail.com',
            tier: 'primary_sos',
          },
        ],
        location: lat && lng ? {
          latitude: lat,
          longitude: lng,
          accuracy: accuracy || 10,
          mapsUrl: mapsUrl,
          address: 'Coordonnées GPS directes en temps réel',
          timestamp: Date.now(),
        } : undefined,
        isTest: false,
      };

      try {
        fetch('/api/alert/dispatch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contacts: [{ name: 'Michael Gauthier Guillet', phone: targetNumber, tier: 'primary_sos' }],
            message: bodyText,
            location: alertPayload.location,
            mode: 'silent_beacon',
            secretCodeWord: secretPass,
          }),
        }).catch(() => {});
      } catch {}

      StorageService.saveAlert(alertPayload);
      onAlertDispatched(alertPayload);
      showToast(`SMS silencieux préparé pour le ${targetNumber} avec géolocalisation et mot secret : ${secretPass}`);

      // Open SMS app on user device
      const smsUri = `sms:${cleanNumber}?body=${encodeURIComponent(bodyText)}`;
      window.location.href = smsUri;
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          dispatchAndOpenSms(
            Number(pos.coords.latitude.toFixed(6)),
            Number(pos.coords.longitude.toFixed(6)),
            Math.round(pos.coords.accuracy)
          );
        },
        () => {
          dispatchAndOpenSms();
        },
        { enableHighAccuracy: true, timeout: 4000, maximumAge: 0 }
      );
    } else {
      dispatchAndOpenSms();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || (!formData.phone.trim() && !formData.email.trim())) {
      alert('Veuillez renseigner un nom et au moins un numéro de téléphone ou un email.');
      return;
    }

    if (editingContact) {
      const updated = contacts.map((c) =>
        c.id === editingContact.id ? { ...c, ...formData } : c
      );
      onUpdateContacts(updated);
      StorageService.saveContacts(updated);
      showToast('Contact de confiance mis à jour.');
    } else {
      const newContact: TrustedContact = {
        id: `tc-${Date.now().toString(36)}`,
        ...formData,
      };
      const updated = [newContact, ...contacts];
      onUpdateContacts(updated);
      StorageService.saveContacts(updated);
      showToast('Nouveau contact de confiance enregistré.');
    }

    setShowAddModal(false);
  };

  const applyPresetTemplate = (type: 'friend' | 'sister' | 'lawyer' | 'social_worker') => {
    switch (type) {
      case 'friend':
        setFormData({
          name: 'Amie de confiance',
          relationship: 'Amie proche',
          phone: '+33 6 00 00 00 00',
          email: 'amie.confiance@safe-mail.org',
          tier: 'primary_sos',
          notifyBy: 'all',
          secretCodeWord: 'Café reporté',
          notes: 'Alerte immédiate avec clé de secours',
          isActive: true,
        });
        break;
      case 'sister':
        setFormData({
          name: 'Soeur / Famille sûre',
          relationship: 'Famille',
          phone: '+33 6 11 22 33 44',
          email: 'famille.safe@secure.org',
          tier: 'primary_sos',
          notifyBy: 'sms',
          secretCodeWord: 'Appelle-moi vite',
          notes: 'Lieu de repli d\'urgence pour moi et mes enfants',
          isActive: true,
        });
        break;
      case 'lawyer':
        setFormData({
          name: 'Cabinet d\'Avocate Juriste',
          relationship: 'Avocate spécialisée violences intrafamiliales',
          phone: '+33 1 40 00 00 00',
          email: 'avocat.droits@barreau-safe.org',
          tier: 'legal',
          notifyBy: 'email',
          secretCodeWord: '',
          notes: 'Dossier d\'ordonnance de protection et aide juridictionnelle',
          isActive: true,
        });
        break;
      case 'social_worker':
        setFormData({
          name: 'Assistante Sociale / CIDFF',
          relationship: 'Travailleuse sociale référente',
          phone: '+33 1 44 93 44 00',
          email: 'referente.sociale@cidff.fr',
          tier: 'discreet_support',
          notifyBy: 'email',
          secretCodeWord: '',
          notes: 'Dispositif de mise à l\'abri et bons de transport d\'urgence',
          isActive: true,
        });
        break;
    }
  };

  const filteredContacts = contacts.filter((c) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return c.isActive;
    return c.tier === activeFilter;
  });

  const getTierBadge = (tier: AlertTier) => {
    switch (tier) {
      case 'primary_sos':
        return { label: 'SOS Principal (Urgence)', bg: 'bg-[#F5E6E0] text-[#A64D4D] border-[#A64D4D]/30' };
      case 'medical':
        return { label: 'Soutien Médical / Soins', bg: 'bg-[#E5EAD9] text-[#5A5A40] border-[#CED6C1]' };
      case 'legal':
        return { label: 'Accompagnement Juridique', bg: 'bg-[#F5F2ED] text-[#5A5A40] border-[#D9D4C7]' };
      case 'discreet_support':
        return { label: 'Soutien Discret / Hébergement', bg: 'bg-[#EDF1E6] text-[#8A9A5B] border-[#CED6C1]' };
    }
  };

  return (
    <div id="trusted-contacts-section" className="space-y-6">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#5A5A40] text-[#F8F7F2] px-4 py-2.5 rounded-xl shadow-lg text-xs font-medium z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 border border-[#CED6C1]/30">
          <CheckCircle className="w-4 h-4 text-[#8A9A5B]" />
          {toastMessage}
        </div>
      )}

      {/* Hero Banner: Emergency Alert Trigger & Quick Numbers */}
      <div className="bg-[#5A5A40] rounded-3xl p-6 text-white shadow-md border border-[#CED6C1]/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A9A5B]/30 border border-[#8A9A5B]/40 text-[#E5EAD9] text-xs font-semibold mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-[#E5EAD9]" /> Dispositif d'Alerte Sécurisé
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight font-serif-natural">Contacts de Confiance & Réseau de Secours</h2>
            <p className="text-xs md:text-sm text-[#E5EAD9]/90 mt-1 max-w-xl">
              Gérez votre cercle de protection. Déclenchez instantanément une alerte géolocalisée et chiffrée avec confirmation avant envoi ou prévenez les numéros d'urgence vitale.
            </p>
          </div>

          {/* Direct Alert Launch Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {needsAuth ? (
              <button
                onClick={handleLogin}
                className="w-full sm:w-auto px-4 py-3 bg-[#4285F4] hover:bg-[#3367D6] text-white rounded-2xl text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                Connexion Google (Meet & Chat)
              </button>
            ) : (
              <>
                <button
                  onClick={handleCreateMeet}
                  className="w-full sm:w-auto px-4 py-3 bg-[#34A853] hover:bg-[#2c8f46] text-white rounded-2xl text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  Démarrer Google Meet
                </button>
                {chatSpaces.length > 0 && (
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedSpace}
                      onChange={(e) => setSelectedSpace(e.target.value)}
                      className="w-32 px-2 py-3 bg-white/10 border border-white/20 text-[#F8F7F2] rounded-xl text-xs"
                    >
                      {chatSpaces.map(space => (
                        <option key={space.name} value={space.name} className="text-black">
                          {space.displayName || space.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleSendChatMessage}
                      className="px-4 py-3 bg-[#FBBC05] hover:bg-[#e0a805] text-[#3E3B39] rounded-2xl text-xs font-semibold shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Alerte Chat
                    </button>
                  </div>
                )}
              </>
            )}

            <button
              id="open-secret-alert-btn"
              onClick={() => {
                setAlertMode('secret_code');
                setShowAlertModal(true);
              }}
              className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-[#F8F7F2] rounded-2xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 backdrop-blur-xs"
            >
              <Key className="w-4 h-4 text-[#E5EAD9]" />
              Code Secret
            </button>

            <button
              id="open-sos-alert-btn"
              onClick={() => {
                setAlertMode('emergency_sos');
                setShowAlertModal(true);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-[#A64D4D] hover:bg-[#8F3F3F] text-white rounded-2xl text-xs md:text-sm font-bold shadow-md shadow-[#A64D4D]/25 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-5 h-5" />
              DÉCLENCHER ALERTE SOS
            </button>
          </div>
        </div>

        {/* Quick Emergency Hotlines Bar */}
        <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <a
            href="tel:911"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2.5 transition-colors"
          >
            <div className="w-8 h-7 rounded-lg bg-[#A64D4D]/40 text-white flex items-center justify-center font-bold text-xs">911</div>
            <div>
              <span className="font-bold block text-white">911 / Police & Secours</span>
              <span className="text-[10px] text-[#E5EAD9]">Urgence vitale</span>
            </div>
          </a>

          <a
            id="quick-silent-sms-btn"
            href="sms:14385432555?body=ALERTE%20SILENCIEUSE%20-%20Mot%20de%20passe%20secret%20%3A%20Mamadou.%20Besoin%20d%27assistance%20imm%C3%A9diate."
            onClick={handleQuickSilentSms}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2.5 transition-colors cursor-pointer"
            title="Envoyer SMS Silencieux au 1-438-543-2555 avec géolocalisation automatique et mot secret Mamadou"
          >
            <div className="w-8 h-7 rounded-lg bg-[#8A9A5B]/40 text-white flex items-center justify-center font-bold text-xs">SMS</div>
            <div>
              <span className="font-bold block text-white">SMS Silencieux (438)</span>
              <span className="text-[10px] text-[#E5EAD9]">1-438-543-2555 • Mamadou</span>
            </div>
          </a>

          <a
            href="tel:3919"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2.5 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-[#8A9A5B]/50 text-white flex items-center justify-center font-bold">3919</div>
            <div>
              <span className="font-bold block text-white">Femmes Info</span>
              <span className="text-[10px] text-[#E5EAD9]">Gratuit, anonyme 24/7</span>
            </div>
          </a>

          <a
            href="tel:15"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2.5 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-white/15 text-[#E5EAD9] flex items-center justify-center font-bold">15</div>
            <div>
              <span className="font-bold block text-white">SAMU Médical</span>
              <span className="text-[10px] text-[#E5EAD9]">Blessures & Urgences</span>
            </div>
          </a>
        </div>
      </div>

      {/* Main Contacts Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: `Tous (${contacts.length})` },
            { id: 'active', label: `Actifs (${contacts.filter((c) => c.isActive).length})` },
            { id: 'primary_sos', label: 'SOS Principal' },
            { id: 'legal', label: 'Juridique' },
            { id: 'discreet_support', label: 'Soutien Discret' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                activeFilter === tab.id
                  ? 'bg-[#5A5A40] text-white shadow-xs'
                  : 'bg-[#FFFFFF] text-[#5A5A40] border border-[#E5E2D9] hover:bg-[#F5F2ED]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={async () => { if (needsAuth) { try { await googleSignIn(); setShowImportGoogleContacts(true); } catch (e) { console.error(e); } } else { setShowImportGoogleContacts(true); } }}
            className="px-4 py-2.5 bg-[#4285F4] hover:bg-[#3367D6] text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            Importer Google Contacts
          </button>
          {/* Add Contact Button */}
          <button
            id="add-new-contact-btn"
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-[#8A9A5B] hover:bg-[#78884d] text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            Ajouter un Contact Sûr
          </button>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContacts.length === 0 ? (
          <div className="col-span-2 p-8 bg-[#FFFFFF] rounded-2xl border border-[#E5E2D9] text-center">
            <Users className="w-10 h-10 text-[#8E8B82] mx-auto mb-2" />
            <h4 className="text-sm font-bold text-[#3E3B39]">Aucun contact dans cette catégorie</h4>
            <p className="text-xs text-[#8E8B82] mt-1">Ajoutez un proche ou une intervenante de confiance pour votre sécurité.</p>
            <button
              onClick={handleOpenAdd}
              className="mt-3 px-4 py-2 bg-[#5A5A40] text-white text-xs font-semibold rounded-xl hover:bg-[#4a4a35]"
            >
              Ajouter un contact
            </button>
          </div>
        ) : (
          filteredContacts.map((contact) => {
            const tierInfo = getTierBadge(contact.tier);
            return (
              <ContactCard
                key={contact.id}
                contact={contact}
                tierInfo={tierInfo}
                onToggleActive={handleToggleActive}
                onDelete={handleDelete}
                onSave={(updated) => {
                  const newContacts = contacts.map(c => c.id === updated.id ? updated : c);
                  onUpdateContacts(newContacts);
                  StorageService.saveContacts(newContacts);
                  showToast('Contact mis à jour avec succès');
                }}
              />
            );
          })
        )}
      </div>

      {/* Recent Alert Logs */}
      {alerts.length > 0 && (
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E2D9] p-5 shadow-xs">
          <h3 className="text-sm font-bold text-[#3E3B39] mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#8A9A5B]" />
            Historique des Alertes Déclenchées ({alerts.length})
          </h3>
          <div className="space-y-2.5">
            {alerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                className="p-3 bg-[#F8F7F2] rounded-xl border border-[#E5E2D9] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#3E3B39]">{alert.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      alert.isTest ? 'bg-[#F5F2ED] text-[#5A5A40] border border-[#D9D4C7]' : 'bg-[#E5EAD9] text-[#5A5A40] border border-[#CED6C1]'
                    }`}>
                      {alert.isTest ? 'TEST SIMULATION' : 'DÉCLENCHÉ'}
                    </span>
                    <span className="text-[#8E8B82]">{new Date(alert.timestamp).toLocaleString('fr-FR')}</span>
                  </div>
                  <p className="text-[#5A5A40] mt-1 italic line-clamp-1">"{alert.message}"</p>
                </div>

                {alert.location && (
                  <a
                    href={alert.location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8A9A5B] font-semibold hover:underline flex items-center gap-1 shrink-0"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Voir GPS Maps
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add / Edit Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E2D9] my-8">
            <h3 className="text-lg font-bold text-[#3E3B39] mb-1 font-serif-natural">
              {editingContact ? 'Modifier le Contact de Confiance' : 'Nouveau Contact de Confiance'}
            </h3>
            <p className="text-xs text-[#8E8B82] mb-4">
              Ce contact sera prévenu lors du déclenchement d'une alerte avec vos coordonnées sécurisées.
            </p>

            {/* Quick Presets */}
            {!editingContact && (
              <div className="mb-4">
                <span className="text-[11px] font-semibold text-[#5A5A40] block mb-1.5">
                  Remplissage rapide avec un modèle :
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => applyPresetTemplate('friend')}
                    className="p-1.5 rounded-lg border border-[#E5E2D9] text-[11px] font-medium text-[#3E3B39] hover:bg-[#F5F2ED] text-center"
                  >
                    Amie Proche
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPresetTemplate('sister')}
                    className="p-1.5 rounded-lg border border-[#E5E2D9] text-[11px] font-medium text-[#3E3B39] hover:bg-[#F5F2ED] text-center"
                  >
                    Soeur / Famille
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPresetTemplate('lawyer')}
                    className="p-1.5 rounded-lg border border-[#E5E2D9] text-[11px] font-medium text-[#3E3B39] hover:bg-[#F5F2ED] text-center"
                  >
                    Avocate
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPresetTemplate('social_worker')}
                    className="p-1.5 rounded-lg border border-[#E5E2D9] text-[11px] font-medium text-[#3E3B39] hover:bg-[#F5F2ED] text-center"
                  >
                    CIDFF / Social
                  </button>
                </div>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#5A5A40] block mb-1">
                    Nom / Pseudonyme *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Michael, Me Dupont..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] text-[#3E3B39] bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5A5A40] block mb-1">
                    Lien / Rôle
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Amie, Soeur, Avocate..."
                    value={formData.relationship}
                    onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] text-[#3E3B39] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#5A5A40] block mb-1">
                    Numéro de Téléphone (SMS & Appel)
                  </label>
                  <input
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] text-[#3E3B39] font-mono bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5A5A40] block mb-1">
                    Adresse Email (Rapports & Alerte)
                  </label>
                  <input
                    type="email"
                    placeholder="contact@exemple.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] text-[#3E3B39] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#5A5A40] block mb-1">
                    Niveau d'Alerte / Rôle
                  </label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value as AlertTier })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] text-[#3E3B39] bg-white"
                  >
                    <option value="primary_sos">SOS Principal (Urgence vitale)</option>
                    <option value="medical">Soutien Médical / Soins</option>
                    <option value="legal">Accompagnement Juridique</option>
                    <option value="discreet_support">Soutien Discret / Hébergement</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#5A5A40] block mb-1">
                    Canal de transmission
                  </label>
                  <select
                    value={formData.notifyBy}
                    onChange={(e) => setFormData({ ...formData, notifyBy: e.target.value as NotifyChannel })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] text-[#3E3B39] bg-white"
                  >
                    <option value="all">Tous (SMS + Email + Push)</option>
                    <option value="sms">SMS uniquement</option>
                    <option value="email">Email uniquement</option>
                    <option value="call">Appel d'urgence</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#A64D4D] block mb-1">
                  Mot de Code Secret (Optionnel pour message camouflé)
                </label>
                <input
                  type="text"
                  placeholder="Ex: 'Café annulé', 'Mon train a du retard'..."
                  value={formData.secretCodeWord}
                  onChange={(e) => setFormData({ ...formData, secretCodeWord: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#F5E6E0] bg-[#F5E6E0]/40 focus:outline-none focus:ring-2 focus:ring-[#A64D4D]/30 focus:border-[#A64D4D] text-[#3E3B39]"
                />
                <p className="text-[10px] text-[#8E8B82] mt-1">
                  Permet d'envoyer un message anodin convenu à l'avance sans alerter l'agresseur s'il regarde votre écran.
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5A5A40] block mb-1">
                  Notes confidentielles (Ex: a les clés, connaît le code porte...)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] text-[#3E3B39] bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E2D9]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#5A5A40] hover:bg-[#F5F2ED] rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#8A9A5B] hover:bg-[#78884d] rounded-xl shadow-xs"
                >
                  {editingContact ? 'Enregistrer les modifications' : 'Ajouter le contact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SOS Alert Modal */}
      <AlertTriggerModal
        contacts={contacts}
        isOpen={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        onAlertDispatched={(alert) => {
          onAlertDispatched(alert);
          showToast('Alerte consignée avec succès.');
        }}
        preselectedMode={alertMode}
      />

      {/* Google Contacts Import Modal */}
      <GoogleContactsModal
        isOpen={showImportGoogleContacts}
        onClose={() => setShowImportGoogleContacts(false)}
        onContactsImported={(imported) => {
          const updated = [...imported, ...contacts];
          onUpdateContacts(updated);
          StorageService.saveContacts(updated);
          showToast(`${imported.length} contact(s) Google importé(s) avec succès.`);
        }}
      />
    </div>
  );
};



const ContactCard: React.FC<{
  contact: TrustedContact;
  tierInfo: { label: string; bg: string };
  onToggleActive: (id: string) => void;
  onDelete: (id: string) => void;
  onSave: (updatedContact: TrustedContact) => void;
}> = ({ contact, tierInfo, onToggleActive, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editForm, setEditForm] = React.useState({
    name: contact.name,
    relationship: contact.relationship,
    phone: contact.phone || '',
    email: contact.email || '',
  });

  const handleSave = () => {
    onSave({
      ...contact,
      name: editForm.name,
      relationship: editForm.relationship,
      phone: editForm.phone,
      email: editForm.email,
    });
    setIsEditing(false);
  };

  return (
    <div
      className={`bg-[#FFFFFF] rounded-2xl border p-5 shadow-[0_2px_12px_-2px_rgba(90,90,64,0.04)] transition-all ${
        contact.isActive
          ? 'border-[#E5E2D9] hover:border-[#CED6C1]'
          : 'border-[#E5E2D9] opacity-60 bg-[#F5F2ED]/60'
      }`}
    >
      {isEditing ? (
        <div className="space-y-3 mb-3">
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            className="w-full text-sm font-bold text-[#3E3B39] p-2 rounded-lg border border-[#CED6C1] focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
            placeholder="Nom du contact"
          />
          <input
            type="text"
            value={editForm.relationship}
            onChange={(e) => setEditForm({ ...editForm, relationship: e.target.value })}
            className="w-full text-xs text-[#8E8B82] p-2 rounded-lg border border-[#CED6C1] focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
            placeholder="Relation (ex: Sœur, Avocate)"
          />
        </div>
      ) : (
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center font-bold text-sm">
              {contact.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#3E3B39] flex items-center gap-2">
                {contact.name}
                {contact.isActive && (
                  <span className="w-2 h-2 rounded-full bg-[#8A9A5B]" title="Contact Actif" />
                )}
              </h4>
              <p className="text-xs text-[#8E8B82]">{contact.relationship}</p>
            </div>
          </div>
          <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${tierInfo.bg}`}>
            {tierInfo.label}
          </span>
        </div>
      )}

      <div className="space-y-1.5 text-xs text-[#3E3B39] bg-[#F8F7F2] p-3 rounded-xl border border-[#E5E2D9] mb-3">
        {isEditing ? (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-[#8E8B82] uppercase">Téléphone</label>
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                className="w-full p-1.5 rounded border border-[#CED6C1] text-xs focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
              />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <label className="text-[10px] font-bold text-[#8E8B82] uppercase">Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full p-1.5 rounded border border-[#CED6C1] text-xs focus:outline-none focus:ring-1 focus:ring-[#8A9A5B]"
              />
            </div>
          </>
        ) : (
          <>
            {contact.phone && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#8E8B82]">
                  <Phone className="w-3.5 h-3.5 text-[#8A9A5B]" /> Téléphone :
                </span>
                <a href={`tel:${contact.phone}`} className="font-mono text-[#3E3B39] font-medium hover:underline">
                  {contact.phone}
                </a>
              </div>
            )}
            {contact.email && (
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[#8E8B82]">
                  <Mail className="w-3.5 h-3.5 text-[#8A9A5B]" /> Email :
                </span>
                <a href={`mailto:${contact.email}`} className="font-mono text-[#3E3B39] font-medium truncate max-w-[180px] hover:underline">
                  {contact.email}
                </a>
              </div>
            )}
            {contact.secretCodeWord && (
              <div className="flex items-center justify-between pt-1 border-t border-[#E5E2D9]">
                <span className="flex items-center gap-1.5 text-[#5A5A40] font-medium">
                  <Key className="w-3.5 h-3.5 text-[#8A9A5B]" /> Mot de code secret :
                </span>
                <span className="font-bold text-[#5A5A40] bg-[#E5EAD9] px-2 py-0.5 rounded-md text-[11px]">
                  "{contact.secretCodeWord}"
                </span>
              </div>
            )}
            {contact.notes && (
              <p className="text-[11px] text-[#8E8B82] pt-1 border-t border-[#E5E2D9] italic">
                Note : {contact.notes}
              </p>
            )}
          </>
        )}
      </div>

      <div className="flex items-center justify-between pt-1">
        {!isEditing ? (
          <button
            type="button"
            onClick={() => onToggleActive(contact.id)}
            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
              contact.isActive
                ? 'bg-[#E5EAD9] text-[#5A5A40] border-[#CED6C1] hover:bg-[#d8e0ca]'
                : 'bg-[#F5F2ED] text-[#8E8B82] border-[#E5E2D9] hover:bg-[#eae6de]'
            }`}
          >
            {contact.isActive ? 'Actif en cas d\'alerte' : 'Désactivé'}
          </button>
        ) : (
          <div /> // Spacer
        )}
        <div className="flex items-center gap-1">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-3 py-1.5 bg-[#8A9A5B] hover:bg-[#78884d] text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
            >
              Sauvegarder
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 bg-[#F8F7F2] border border-[#E5E2D9] hover:bg-[#E5EAD9] text-[#5A5A40] rounded-lg text-xs font-bold transition-colors"
                title="Modifier / Renommer"
              >
                Modifier
              </button>
              <button
                onClick={() => onDelete(contact.id)}
                className="p-1.5 text-[#8E8B82] hover:text-[#A64D4D] hover:bg-[#F5E6E0] rounded-lg transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
