import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Check,
  Copy,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  Loader2,
  Share2,
  Navigation,
  Sparkles
} from 'lucide-react';

interface QuickLocationShareProps {
  isNightMode?: boolean;
}

export const QuickLocationShare: React.FC<QuickLocationShareProps> = ({ isNightMode }) => {
  const [status, setStatus] = useState<'idle' | 'locating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [locationData, setLocationData] = useState<{
    lat: number;
    lng: number;
    accuracy: number;
    googleMapsUrl: string;
    smsText: string;
    timestamp: string;
  } | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [copiedType, setCopiedType] = useState<'all' | 'url' | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setStatus('error');
      setErrorMessage("La géolocalisation n'est pas supportée par votre navigateur.");
      setShowPopup(true);
      return;
    }

    setStatus('locating');
    setShowPopup(true);
    setErrorMessage('');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = Math.round(pos.coords.accuracy || 10);
        const googleMapsUrl = `https://www.google.com/maps?q=${lat.toFixed(6)},${lng.toFixed(6)}`;
        const smsText = `URGENT: Voici ma position exacte en temps réel : ${googleMapsUrl} (Précision: ~${accuracy}m)`;
        const timeString = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        const data = {
          lat,
          lng,
          accuracy,
          googleMapsUrl,
          smsText,
          timestamp: timeString,
        };

        setLocationData(data);
        setStatus('success');

        // Copy full SMS text to clipboard automatically
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(smsText);
            setCopiedType('all');
            setTimeout(() => setCopiedType(null), 3000);
          }
        } catch {
          // Ignore clipboard failure if permissions restricted
        }
      },
      (err) => {
        setStatus('error');
        if (err.code === 1) {
          setErrorMessage("Permission de localisation refusée. Veuillez autoriser l'accès GPS dans les paramètres de votre navigateur.");
        } else if (err.code === 2) {
          setErrorMessage("Position GPS indisponible. Vérifiez votre connexion ou activez le GPS de votre appareil.");
        } else {
          setErrorMessage("Délai d'attente dépassé pour obtenir votre position.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );
  };

  const copyToClipboard = async (text: string, type: 'all' | 'url') => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedType(type);
        setTimeout(() => setCopiedType(null), 2500);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        setCopiedType(type);
        setTimeout(() => setCopiedType(null), 2500);
      }
    } catch (e) {
      console.warn('Clipboard write error:', e);
    }
  };

  return (
    <div className="relative inline-flex items-center" ref={containerRef}>
      {/* Trigger Button in Header */}
      <button
        type="button"
        id="header-quick-geolocation-btn"
        onClick={handleGetLocation}
        disabled={status === 'locating'}
        className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs active:scale-95 ${
          status === 'locating'
            ? 'bg-[#E5EAD9] text-[#5A5A40] opacity-80 cursor-wait'
            : isNightMode
            ? 'bg-[#2D2F2A] hover:bg-[#383B34] text-[#D8E4C7] border border-[#44483E]'
            : 'bg-[#F2F6EC] hover:bg-[#E2EBD5] text-[#4F6331] border border-[#CEDEC0]'
        }`}
        title="Localiser et copier automatiquement mon lien Google Maps pour SMS"
      >
        {status === 'locating' ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8A9A5B]" />
        ) : (
          <MapPin className="w-3.5 h-3.5 text-[#728642] shrink-0" />
        )}
        <span className="font-bold">Partager GPS</span>
        {copiedType && (
          <span className="bg-[#8A9A5B] text-white text-[9px] px-1.5 py-0.2 rounded-full font-mono animate-bounce">
            Copié !
          </span>
        )}
      </button>

      {/* Interactive Popup / Floating Modal */}
      {showPopup && (
        <div
          id="geolocation-share-popover"
          className={`absolute right-0 top-full mt-2 z-50 w-80 sm:w-96 p-4 rounded-2xl shadow-2xl border text-xs font-sans animate-in fade-in slide-in-from-top-2 duration-150 ${
            isNightMode
              ? 'bg-[#222420]/95 backdrop-blur-md border-[#3E4238] text-[#DCDAD4]'
              : 'bg-white/95 backdrop-blur-md border-[#CED6C1] text-[#3E3B39]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-2 mb-3 border-current/10">
            <div className="flex items-center gap-2 font-bold text-sm text-[#8A9A5B]">
              <Navigation className="w-4 h-4" />
              <span>Partage Rapide de Géolocalisation</span>
            </div>
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="opacity-60 hover:opacity-100 px-1.5 py-0.5 rounded-md hover:bg-black/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Loading State */}
          {status === 'locating' && (
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
              <Loader2 className="w-7 h-7 animate-spin text-[#8A9A5B]" />
              <p className="font-semibold">Acquisition des coordonnées GPS précises...</p>
              <p className="text-[11px] opacity-70">
                Veuillez autoriser l'accès si votre navigateur vous le demande.
              </p>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="space-y-3">
              <div className="flex items-start gap-2 p-3 rounded-xl bg-[#F5E6E0] text-[#A64D4D] border border-[#EAC4B8]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <p className="font-bold">Impossible d'obtenir la position</p>
                  <p>{errorMessage}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleGetLocation}
                className="w-full py-2 bg-[#8A9A5B] hover:bg-[#77884a] text-white rounded-xl font-bold text-xs transition-colors"
              >
                Réessayer la localisation
              </button>
            </div>
          )}

          {/* Success State */}
          {status === 'success' && locationData && (
            <div className="space-y-3">
              {/* Copy confirmation banner */}
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#EAF2DE] text-[#475C28] border border-[#C6DCAC]">
                <Check className="w-4 h-4 text-[#658336] shrink-0" />
                <div className="text-[11px] leading-tight">
                  <span className="font-bold">Lien Google Maps copié dans le presse-papier !</span>
                  <p className="text-[10px] text-[#5D733B] mt-0.5">Prêt à être collé et envoyé par SMS ou messagerie.</p>
                </div>
              </div>

              {/* Coordinates & Accuracy Card */}
              <div className={`p-3 rounded-xl border text-[11px] space-y-1.5 ${
                isNightMode ? 'bg-[#1C1D1A] border-[#343630]' : 'bg-[#F8F7F2] border-[#E5E2D9]'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="opacity-70">Coordonnées GPS :</span>
                  <span className="font-mono font-bold text-[#8A9A5B]">
                    {locationData.lat.toFixed(5)}, {locationData.lng.toFixed(5)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="opacity-70">Précision estimée :</span>
                  <span className="font-medium">± {locationData.accuracy} mètres</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="opacity-70">Horodatage de la position :</span>
                  <span className="font-mono">{locationData.timestamp}</span>
                </div>
              </div>

              {/* Message Preview Box */}
              <div className={`p-2.5 rounded-xl border font-mono text-[11px] leading-relaxed break-all select-all ${
                isNightMode ? 'bg-[#181917] border-[#343630] text-[#D8E4C7]' : 'bg-white border-[#E5E2D9] text-[#5A5A40]'
              }`}>
                {locationData.smsText}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {/* 1-Click Native SMS opener */}
                <a
                  href={`sms:?&body=${encodeURIComponent(locationData.smsText)}`}
                  className="px-3 py-2 bg-[#5A5A40] hover:bg-[#464630] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  title="Ouvrir directement l'application SMS du téléphone"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Envoyer par SMS</span>
                </a>

                {/* Open in Google Maps */}
                <a
                  href={locationData.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-[#8A9A5B] hover:bg-[#78884d] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  title="Voir le point sur Google Maps"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>

              {/* Secondary Copy Options */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(locationData.smsText, 'all')}
                  className={`flex-1 py-1.5 rounded-lg border text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors ${
                    copiedType === 'all'
                      ? 'bg-[#8A9A5B] text-white border-[#8A9A5B]'
                      : 'hover:bg-black/5 border-current/20'
                  }`}
                >
                  {copiedType === 'all' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedType === 'all' ? 'Message complet copié' : 'Copier texte SMS'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => copyToClipboard(locationData.googleMapsUrl, 'url')}
                  className={`flex-1 py-1.5 rounded-lg border text-[10px] font-semibold flex items-center justify-center gap-1 transition-colors ${
                    copiedType === 'url'
                      ? 'bg-[#8A9A5B] text-white border-[#8A9A5B]'
                      : 'hover:bg-black/5 border-current/20'
                  }`}
                >
                  {copiedType === 'url' ? <Check className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
                  <span>{copiedType === 'url' ? 'Lien URL copié' : 'Copier lien Maps'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
