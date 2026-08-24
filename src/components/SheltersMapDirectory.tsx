import React, { useState } from 'react';
import { 
  MapPin, Phone, ShieldCheck, Navigation, Search, RefreshCw, 
  ExternalLink, Building, HeartPulse, Shield, Compass, Check 
} from 'lucide-react';
import { ShelterResource } from '../types';

export const SheltersMapDirectory: React.FC = () => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState<ShelterResource[]>([
    {
      name: "Maison des Femmes & Refuge d'Urgence",
      type: "Refuge & Hébergement sécurisé",
      address: "Centre-ville d'accueil d'urgence (Adresse confidentielle transmise sur appel)",
      distance: "1.2 km",
      phone: "3919",
      safeAccess: "Interphone discret 24h/24, accueil bienveillant sans rendez-vous préalable.",
      services: ["Hébergement d'urgence", "Accompagnement juridique", "Vestiaire & repas chaud", "Prise en charge enfants"],
    },
    {
      name: "Centre Hospitalier - Urgences Médico-Judiciaires (UMJ)",
      type: "Hôpital & Constat médico-légal",
      address: "Service des Urgences Générales - Pavillon Médico-Judiciaire",
      distance: "2.4 km",
      phone: "15",
      safeAccess: "Accès prioritaire confidentiel. Possibilité de faire constater les blessures (certificat ITT) sans obligation de porter plainte immédiatement.",
      services: ["Certificat descriptif ITT", "Soins d'urgence", "Intervenante sociale de garde", "Soutien psychologique"],
    },
    {
      name: "Commissariat Central / Brigade de Protection de la Famille",
      type: "Poste de Police / Sécurité",
      address: "Hôtel de Police Central",
      distance: "0.9 km",
      phone: "17",
      safeAccess: "Espace d'audition dédié aux victimes de violences conjugales avec intervenant social en commissariat.",
      services: ["Dépôt de plainte prioritaire", "Téléphone Grave Danger (TGD)", "Mise à l'abri immédiate"],
    },
    {
      name: "CIDFF - Permanence Juridique & Droits des Femmes",
      type: "Aide juridique & Droits",
      address: "Maison de la Justice et du Droit",
      distance: "3.1 km",
      phone: "01 44 93 44 00",
      safeAccess: "Consultation gratuite et confidentielle avec une juriste spécialisée.",
      services: ["Avocates gratuites", "Dossier ordonnance de protection", "Aide au relogement"],
    },
  ]);

  const searchShelters = async () => {
    if (!city.trim() && !navigator.geolocation) return;
    setLoading(true);
    try {
      let lat = 48.8566;
      let lng = 2.3522;

      const response = await fetch('/api/gemini/places-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, latitude: lat, longitude: lng }),
      });

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setResources(data.results);
      }
    } catch (err) {
      console.error('Error searching shelters:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    if (type.includes('Hôpital') || type.includes('Médico')) return <HeartPulse className="w-5 h-5 text-rose-600" />;
    if (type.includes('Police') || type.includes('Sécurité')) return <Shield className="w-5 h-5 text-blue-600" />;
    return <Building className="w-5 h-5 text-emerald-600" />;
  };

  return (
    <div id="shelters-directory-section" className="space-y-5">
      {/* Header with Search */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[#3E3B39] font-serif-natural">
              Refuges, Hébergements & Centres de Soins Sûrs
            </h2>
            <p className="text-xs text-[#8E8B82]">
              Cartographie et géolocalisation des structures d'accueil d'urgence via <strong className="text-[#5A5A40]">Google Maps Grounding</strong>.
            </p>
          </div>
        </div>

        {/* Search input */}
        <div className="mt-5 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8B82]" />
            <input
              type="text"
              placeholder="Entrez votre ville, code postal ou quartier (ex: Lyon, Bordeaux, 75011)..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchShelters()}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E2D9] text-xs text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 focus:border-[#8A9A5B] bg-white"
            />
          </div>

          <button
            id="search-shelters-btn"
            onClick={searchShelters}
            disabled={loading}
            className="px-5 py-2.5 bg-[#8A9A5B] hover:bg-[#78884d] disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            Localiser les Refuges
          </button>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((res, i) => (
          <div
            key={i}
            className="bg-[#FFFFFF] rounded-2xl border border-[#E5E2D9] p-5 shadow-xs hover:border-[#CED6C1] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F8F7F2] flex items-center justify-center shrink-0">
                    {getTypeIcon(res.type)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#3E3B39] line-clamp-1">{res.name}</h3>
                    <span className="text-[11px] font-semibold text-[#8A9A5B]">{res.type}</span>
                  </div>
                </div>
                {res.distance && (
                  <span className="text-[11px] font-medium text-[#5A5A40] bg-[#E5EAD9] px-2 py-0.5 rounded-md whitespace-nowrap">
                    ~{res.distance}
                  </span>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-[#5A5A40] bg-[#F8F7F2] p-3 rounded-xl border border-[#E5E2D9] my-3">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8A9A5B] shrink-0 mt-0.5" />
                  <span className="text-[#3E3B39]">{res.address}</span>
                </div>

                {res.safeAccess && (
                  <div className="pt-1.5 border-t border-[#E5E2D9] text-[11px] text-[#5A5A40]">
                    <strong className="text-[#3E3B39]">Accès discret :</strong> {res.safeAccess}
                  </div>
                )}
              </div>

              {/* Services Tags */}
              {res.services && res.services.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {res.services.map((srv, si) => (
                    <span key={si} className="px-2 py-0.5 bg-[#E5EAD9] text-[#5A5A40] rounded-md text-[10px] font-medium border border-[#CED6C1]">
                      {srv}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#E5E2D9]">
              <a
                href={`tel:${res.phone}`}
                className="flex-1 py-2 bg-[#5A5A40] hover:bg-[#4a4a35] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#E5EAD9]" /> Appeler ({res.phone})
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(res.name + ' ' + res.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[#E5E2D9] hover:bg-[#F5F2ED] text-[#5A5A40] rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
                title="Itinéraire Google Maps"
              >
                <Navigation className="w-4 h-4 text-[#8A9A5B]" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
