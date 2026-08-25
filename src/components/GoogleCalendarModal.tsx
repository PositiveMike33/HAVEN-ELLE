import React, { useState, useEffect } from 'react';
import { Calendar, X, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { fetchGoogleCalendarEvents } from '../utils/googleWorkspace';
import { DiscreetAppointment } from '../types';

interface GoogleCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventsImported: (appointments: DiscreetAppointment[]) => void;
}

export const GoogleCalendarModal: React.FC<GoogleCalendarModalProps> = ({
  isOpen,
  onClose,
  onEventsImported,
}) => {
  const [googleEvents, setGoogleEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndices, setSelectedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (isOpen) {
      loadEvents();
    }
  }, [isOpen]);

  const loadEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const events = await fetchGoogleCalendarEvents();
      // Only keep events that are likely related to wellness/appointments
      // or let user choose, but we can filter by keywords to be safe
      const keywords = ['bilan', 'santé', 'rdv', 'rendez-vous', 'consultation', 'dr.', 'thérapeute', 'médical', 'avocat'];
      
      const filteredEvents = events.filter((ev: any) => {
        const title = (ev.summary || '').toLowerCase();
        const desc = (ev.description || '').toLowerCase();
        // If it matches a keyword, or just show all upcoming so they can select
        return true; 
      });

      setGoogleEvents(filteredEvents);
    } catch (err: any) {
      console.error(err);
      setError('Impossible de récupérer vos événements Google. Veuillez vérifier votre connexion et vos permissions.');
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
    const importedAppointments: DiscreetAppointment[] = [];
    selectedIndices.forEach((index) => {
      const ev = googleEvents[index];
      const startDateTime = ev.start?.dateTime || ev.start?.date;
      if (!startDateTime) return;

      const dateObj = new Date(startDateTime);
      const dateStr = dateObj.toISOString().split('T')[0];
      const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      importedAppointments.push({
        id: ev.id || `apt-${Date.now().toString(36)}-${index}`,
        professionalName: 'Praticien Importé', // A guess, or we could extract from title
        role: 'Psychologue', // Default role
        date: dateStr,
        time: timeStr,
        discreetTitle: ev.summary || 'Événement Importé',
        meetLink: ev.hangoutLink || `https://meet.google.com/hvn-${Math.random().toString(36).substring(2, 6)}`,
        status: 'CONFIRMED',
      });
    });

    onEventsImported(importedAppointments);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FFFFFF] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E2D9] my-8 flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[#3E3B39] font-serif-natural flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#4285F4]" />
            Importer Google Calendar
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
            <p className="text-xs font-semibold">Chargement de votre agenda...</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto pr-2 space-y-2 mb-4">
            <p className="text-xs text-[#8E8B82] mb-3">Sélectionnez les événements liés à votre suivi (rendez-vous médicaux, consultations, etc.) pour les centraliser ici.</p>
            {googleEvents.length === 0 ? (
              <p className="text-center text-xs text-[#8E8B82] py-8">Aucun événement à venir trouvé.</p>
            ) : (
              googleEvents.map((ev, idx) => {
                const title = ev.summary || 'Sans titre';
                const startDateTime = ev.start?.dateTime || ev.start?.date;
                if (!startDateTime) return null;
                const dateObj = new Date(startDateTime);
                const dateStr = dateObj.toLocaleDateString();
                const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const isSelected = selectedIndices.has(idx);

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
                      <p className="text-sm font-bold text-[#3E3B39] truncate">{title}</p>
                      <p className="text-[11px] text-[#8E8B82] truncate">
                        {dateStr} à {timeStr}
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
