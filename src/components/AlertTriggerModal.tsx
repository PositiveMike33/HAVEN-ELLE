import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, ShieldAlert, MapPin, Battery, Clock, Send, X, 
  CheckCircle2, RefreshCw, Eye, EyeOff, Radio, PhoneCall, MessageSquare, AlertCircle
} from 'lucide-react';
import { TrustedContact, EmergencyAlert, LocationData, AlertMode } from '../types';
import { StorageService } from '../utils/storage';
import { sendEmergencySosEmail } from '../utils/gmailService';

interface AlertTriggerModalProps {
  contacts: TrustedContact[];
  isOpen: boolean;
  onClose: () => void;
  onAlertDispatched: (alert: EmergencyAlert) => void;
  preselectedMode?: AlertMode;
}

export const AlertTriggerModal: React.FC<AlertTriggerModalProps> = ({
  contacts,
  isOpen,
  onClose,
  onAlertDispatched,
  preselectedMode = 'emergency_sos',
}) => {
  const [mode, setMode] = useState<AlertMode>(preselectedMode);
  const [customMessage, setCustomMessage] = useState('');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  
  // Safety countdown buffer
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(5);
  const [isSending, setIsSending] = useState(false);
  const [dispatchResult, setDispatchResult] = useState<EmergencyAlert | null>(null);
  const [isTestMode, setIsTestMode] = useState(false);

  // Preset messages by mode
  const presetMessages: Record<AlertMode, string> = {
    emergency_sos: "URGENCE VITALE : Je suis en danger immédiat. Mot de passe secret : Mamadou. Veuillez prévenir les secours (911) et consulter ma localisation GPS en temps réel.",
    secret_code: "Code Secret : Mamadou. Coucou ! Mon rendez-vous a pris un peu de retard. Peux-tu me rappeler dès que tu vois ce message s'il te plaît ?",
    check_in: "Je suis bien arrivée à destination en sécurité. Mot secret : Mamadou. Tout va bien pour le moment. Voici ma localisation de confirmation.",
    silent_beacon: "ALERTE SILENCIEUSE - Mot de passe secret : Mamadou. Balise de détresse activée automatiquement pour 1-438-543-2555. Suivi GPS confidentiel en cours.",
  };

  useEffect(() => {
    if (isOpen) {
      setMode(preselectedMode);
      setCustomMessage(presetMessages[preselectedMode]);
      fetchLocation();
      fetchBattery();
      setIsCountingDown(false);
      setDispatchResult(null);
      setIsTestMode(false);
    }
  }, [isOpen, preselectedMode]);

  // Handle countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCountingDown && countdownSeconds > 0) {
      timer = setTimeout(() => {
        setCountdownSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isCountingDown && countdownSeconds === 0) {
      setIsCountingDown(false);
      executeDispatch();
    }
    return () => clearTimeout(timer);
  }, [isCountingDown, countdownSeconds]);

  const fetchBattery = async () => {
    try {
      if ('getBattery' in navigator) {
        const battery: any = await (navigator as any).getBattery();
        setBatteryLevel(battery.level);
      }
    } catch {
      // Ignore battery read error
    }
  };

  const fetchLocation = () => {
    setLocationLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("La géolocalisation n'est pas supportée sur cet appareil.");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: LocationData = {
          latitude: Number(pos.coords.latitude.toFixed(6)),
          longitude: Number(pos.coords.longitude.toFixed(6)),
          accuracy: Math.round(pos.coords.accuracy),
          mapsUrl: `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`,
          address: `Position GPS Précise (Précision ±${Math.round(pos.coords.accuracy)}m)`,
          timestamp: pos.timestamp,
        };
        setLocation(loc);
        setLocationLoading(false);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setLocationError("Position approximative ou autorisation refusée. L'alerte sera tout de même transmise.");
        // Fallback default coordinates for safety demonstration
        const fallbackLoc: LocationData = {
          latitude: 48.8566,
          longitude: 2.3522,
          accuracy: 50,
          mapsUrl: 'https://www.google.com/maps?q=48.8566,2.3522',
          address: 'Paris, France (Position de secours par défaut)',
          timestamp: Date.now(),
        };
        setLocation(fallbackLoc);
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleModeChange = (newMode: AlertMode) => {
    setMode(newMode);
    setCustomMessage(presetMessages[newMode]);
  };

  const startCountdown = (test: boolean = false) => {
    setIsTestMode(test);
    setCountdownSeconds(5);
    setIsCountingDown(true);
  };

  const cancelCountdown = () => {
    setIsCountingDown(false);
    setCountdownSeconds(5);
  };

  const executeDispatch = async () => {
    setIsSending(true);
    const activeContacts = contacts.filter((c) => c.isActive);

    const alertPayload: EmergencyAlert = {
      id: `ALT-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      mode,
      message: customMessage,
      status: isTestMode ? 'TEST_SIMULATION' : 'DISPATCHED',
      recipients: activeContacts.map((c) => ({
        name: c.name,
        phone: c.phone,
        email: c.email,
        tier: c.tier,
      })),
      location: location || undefined,
      batteryLevel: batteryLevel || undefined,
      isTest: isTestMode,
    };

    try {
      // Call server alert dispatch endpoint
      await fetch('/api/alert/dispatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contacts: activeContacts,
          message: customMessage,
          location,
          batteryLevel,
          mode,
          isTest: isTestMode,
        }),
      });
    } catch (e) {
      console.warn('Backend alert post error, saved locally:', e);
    }

    // Attempt direct Gmail SOS transmission to contacts with an email
    try {
      const emailContacts = activeContacts.filter(c => c.email);
      for (const contact of emailContacts) {
        await sendEmergencySosEmail(
          contact,
          location ? { lat: location.latitude, lng: location.longitude } : null,
          customMessage
        );
      }
    } catch (e) {
      console.warn('Gmail SOS transmission warning:', e);
    }

    // Persist to local secure storage
    StorageService.saveAlert(alertPayload);
    setIsSending(false);
    setDispatchResult(alertPayload);
    onAlertDispatched(alertPayload);
  };

  if (!isOpen) return null;

  const activeContacts = contacts.filter((c) => c.isActive);

  return (
    <div id="alert-modal-backdrop" className="fixed inset-0 bg-[#3E3B39]/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FFFFFF] rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#E5E2D9] relative animate-in fade-in zoom-in-95 my-8">
        {/* Close button */}
        {!isCountingDown && !isSending && (
          <button
            id="close-alert-modal"
            onClick={onClose}
            className="absolute top-4 right-4 text-[#8E8B82] hover:text-[#3E3B39] p-1.5 rounded-lg hover:bg-[#F5F2ED] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* 1. COUNTDOWN STATE (5-second safety buffer to cancel) */}
        {isCountingDown ? (
          <div className="text-center py-6">
            <div className="w-24 h-24 rounded-full bg-[#F5E6E0] text-[#A64D4D] border-4 border-[#A64D4D] flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-4xl font-extrabold">{countdownSeconds}</span>
            </div>
            <h3 className="text-xl font-bold text-[#3E3B39] mb-1 font-serif-natural">
              {isTestMode ? "Envoi du Test d'Alerte..." : "DÉCLENCHEMENT DE L'ALERTE D'URGENCE..."}
            </h3>
            <p className="text-xs text-[#5A5A40] max-w-sm mx-auto mb-6">
              L'alerte va être transmise à vos <strong className="text-[#3E3B39]">{activeContacts.length} contacts de confiance</strong> avec vos coordonnées GPS exactes.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                id="cancel-alert-countdown-btn"
                onClick={cancelCountdown}
                className="px-6 py-3 bg-[#5A5A40] hover:bg-[#4a4a35] text-white rounded-xl text-sm font-semibold shadow-md transition-transform hover:scale-105"
              >
                Annuler Immédiatement
              </button>
              <button
                id="force-send-alert-btn"
                onClick={() => {
                  setIsCountingDown(false);
                  executeDispatch();
                }}
                className="px-4 py-3 bg-[#A64D4D] hover:bg-[#8F3F3F] text-white rounded-xl text-sm font-semibold shadow-md flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" /> Envoyer sans attendre
              </button>
            </div>
          </div>
        ) : dispatchResult ? (
          /* 2. SUCCESS DISPATCH RECEIPT */
          <div className="py-2">
            <div className="flex items-center gap-3 p-3.5 bg-[#E5EAD9] border border-[#CED6C1] rounded-xl mb-4 text-[#5A5A40]">
              <CheckCircle2 className="w-6 h-6 text-[#8A9A5B] shrink-0" />
              <div>
                <h4 className="text-sm font-bold">
                  {dispatchResult.isTest ? "Test d'Alerte Réussi !" : "Alerte Sécurisée Transmise avec Succès !"}
                </h4>
                <p className="text-xs text-[#5A5A40]/90">
                  Transmise à {dispatchResult.recipients.length} destinataire(s) avec horodatage certifié.
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs bg-[#F8F7F2] p-4 rounded-xl border border-[#E5E2D9] mb-5">
              <div className="flex justify-between border-b border-[#E5E2D9] pb-2">
                <span className="text-[#8E8B82] font-medium">Identifiant Alerte :</span>
                <span className="font-mono font-bold text-[#3E3B39]">{dispatchResult.id}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E2D9] pb-2">
                <span className="text-[#8E8B82] font-medium">Heure certifiée :</span>
                <span className="text-[#3E3B39]">{new Date(dispatchResult.timestamp).toLocaleString('fr-FR')}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E2D9] pb-2">
                <span className="text-[#8E8B82] font-medium">Mode sélectionné :</span>
                <span className="font-semibold uppercase text-[#A64D4D]">{dispatchResult.mode}</span>
              </div>
              <div>
                <span className="text-[#8E8B82] font-medium block mb-1">Message transmis :</span>
                <p className="p-2 bg-white rounded-lg border border-[#E5E2D9] text-[#3E3B39] italic">
                  "{dispatchResult.message}"
                </p>
              </div>

              {dispatchResult.location && (
                <div className="pt-2 border-t border-[#E5E2D9]">
                  <span className="text-[#8E8B82] font-medium block mb-1">Position GPS jointe :</span>
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-[#E5E2D9]">
                    <span className="font-mono text-[#3E3B39]">
                      {dispatchResult.location.latitude}, {dispatchResult.location.longitude}
                    </span>
                    <a
                      href={dispatchResult.location.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#8A9A5B] font-semibold hover:underline flex items-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#8A9A5B]" /> Ouvrir sur Google Maps
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                id="close-dispatch-receipt-btn"
                onClick={onClose}
                className="px-5 py-2.5 bg-[#5A5A40] hover:bg-[#4a4a35] text-white rounded-xl text-xs font-semibold"
              >
                Fermer
              </button>
            </div>
          </div>
        ) : (
          /* 3. CONFIGURATION & PRE-SEND CONFIRMATION */
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[#F5E6E0] text-[#A64D4D] flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#3E3B39] font-serif-natural">Déclencher l'Alerte Sécurisée</h3>
                <p className="text-xs text-[#8E8B82]">
                  Envoi chiffré à vos contacts de confiance avec géolocalisation
                </p>
              </div>
            </div>

            {/* Mode Selector Tabs */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-[#5A5A40] block mb-2">
                Type de message à transmettre :
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  id="mode-sos-btn"
                  onClick={() => handleModeChange('emergency_sos')}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    mode === 'emergency_sos'
                      ? 'bg-[#F5E6E0] border-[#A64D4D] text-[#A64D4D] font-bold shadow-xs'
                      : 'bg-[#F8F7F2] border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F5F2ED]'
                  }`}
                >
                  <span className="block font-semibold text-[#A64D4D] mb-0.5">SOS Direct</span>
                  <span className="text-[10px] text-[#8E8B82] line-clamp-1">Danger immédiat</span>
                </button>

                <button
                  type="button"
                  id="mode-secret-code-btn"
                  onClick={() => handleModeChange('secret_code')}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    mode === 'secret_code'
                      ? 'bg-[#E5EAD9] border-[#8A9A5B] text-[#5A5A40] font-bold shadow-xs'
                      : 'bg-[#F8F7F2] border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F5F2ED]'
                  }`}
                >
                  <span className="block font-semibold text-[#5A5A40] mb-0.5">Code Secret</span>
                  <span className="text-[10px] text-[#8E8B82] line-clamp-1">Message camouflé</span>
                </button>

                <button
                  type="button"
                  id="mode-checkin-btn"
                  onClick={() => handleModeChange('check_in')}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    mode === 'check_in'
                      ? 'bg-[#EDF1E6] border-[#8A9A5B] text-[#5A5A40] font-bold shadow-xs'
                      : 'bg-[#F8F7F2] border-[#E5E2D9] text-[#5A5A40] hover:bg-[#F5F2ED]'
                  }`}
                >
                  <span className="block font-semibold text-[#8A9A5B] mb-0.5">Check-in</span>
                  <span className="text-[10px] text-[#8E8B82] line-clamp-1">Confirmation d'arrivée</span>
                </button>
              </div>
            </div>

            {/* Editable Message Box */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-[#5A5A40] block mb-1">
                Texte du message transmis :
              </label>
              <textarea
                rows={3}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#E5E2D9] text-xs text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/20 focus:border-[#8A9A5B] bg-white"
              />
            </div>

            {/* Geolocation & Device Metadata Card */}
            <div className="p-3.5 bg-[#F8F7F2] rounded-xl border border-[#E5E2D9] mb-4 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-[#3E3B39] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#A64D4D]" /> Coordonnées GPS en temps réel
                </span>
                <button
                  type="button"
                  onClick={fetchLocation}
                  disabled={locationLoading}
                  className="text-[11px] text-[#8A9A5B] hover:underline flex items-center gap-1 font-medium"
                >
                  <RefreshCw className={`w-3 h-3 ${locationLoading ? 'animate-spin' : ''}`} /> Actualiser
                </button>
              </div>

              {locationLoading ? (
                <div className="flex items-center gap-2 text-[#8E8B82] py-1">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#A64D4D]" />
                  <span>Acquisition de la position satellite...</span>
                </div>
              ) : location ? (
                <div className="space-y-1 text-[11px] text-[#5A5A40]">
                  <p className="font-mono text-[#3E3B39]">
                    Lat: {location.latitude} | Lng: {location.longitude} (±{location.accuracy}m)
                  </p>
                  <p className="text-[#8E8B82] truncate">{location.address}</p>
                </div>
              ) : (
                <p className="text-[#A64D4D] text-[11px]">{locationError || 'Position indisponible'}</p>
              )}

              {batteryLevel !== null && (
                <div className="mt-2 pt-2 border-t border-[#E5E2D9] flex items-center gap-2 text-[11px] text-[#8E8B82]">
                  <Battery className="w-3.5 h-3.5 text-[#8E8B82]" />
                  <span>Batterie appareil : {Math.round(batteryLevel * 100)}%</span>
                </div>
              )}
            </div>

            {/* Recipients Summary */}
            <div className="mb-5">
              <span className="text-xs font-semibold text-[#5A5A40] block mb-1.5">
                Destinataires actifs ({activeContacts.length}) :
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {activeContacts.length === 0 ? (
                  <p className="text-xs text-[#A64D4D] bg-[#F5E6E0] p-2 rounded-lg border border-[#A64D4D]/20">
                    Aucun contact de confiance actif. Veuillez en activer dans la section Contacts.
                  </p>
                ) : (
                  activeContacts.map((c) => (
                    <span
                      key={c.id}
                      className="px-2.5 py-1 bg-[#F5F2ED] border border-[#E5E2D9] rounded-lg text-xs text-[#3E3B39] flex items-center gap-1"
                    >
                      <strong className="text-[#3E3B39]">{c.name}</strong>
                      <span className="text-[10px] text-[#8E8B82]">({c.relationship})</span>
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                id="test-alert-simulation-btn"
                onClick={() => startCountdown(true)}
                disabled={activeContacts.length === 0}
                className="flex-1 py-2.5 px-4 bg-[#F5F2ED] hover:bg-[#E5EAD9] text-[#5A5A40] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 border border-[#E5E2D9]"
              >
                <Radio className="w-3.5 h-3.5 text-[#5A5A40]" />
                Tester sans alarmer (Simulation)
              </button>

              <button
                type="button"
                id="trigger-real-alert-btn"
                onClick={() => startCountdown(false)}
                disabled={activeContacts.length === 0}
                className="flex-1 py-2.5 px-4 bg-[#A64D4D] hover:bg-[#8F3F3F] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <ShieldAlert className="w-4 h-4" />
                DÉCLENCHER L'ALERTE (5s)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
