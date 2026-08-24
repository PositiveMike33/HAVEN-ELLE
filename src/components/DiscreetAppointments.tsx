import React, { useState } from 'react';
import { 
  Calendar, Video, Clock, User, ShieldCheck, Plus, 
  ExternalLink, CheckCircle, Lock, CalendarCheck 
} from 'lucide-react';
import { DiscreetAppointment } from '../types';
import { StorageService } from '../utils/storage';

interface DiscreetAppointmentsProps {
  appointments: DiscreetAppointment[];
  onUpdateAppointments: (appointments: DiscreetAppointment[]) => void;
}

export const DiscreetAppointments: React.FC<DiscreetAppointmentsProps> = ({
  appointments,
  onUpdateAppointments,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    professionalName: 'Dr. Sophie Laurent',
    role: 'Psychologue' as 'Psychologue' | 'Avocate' | 'Assistante Sociale' | 'Médecin Légiste',
    date: '2026-08-27',
    time: '14:00',
    discreetTitle: 'Rendez-vous Bilan Santé',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newApt: DiscreetAppointment = {
      id: `apt-${Date.now().toString(36)}`,
      professionalName: formData.professionalName,
      role: formData.role,
      date: formData.date,
      time: formData.time,
      discreetTitle: formData.discreetTitle,
      meetLink: `https://meet.google.com/hvn-${Math.random().toString(36).substring(2, 6)}`,
      status: 'CONFIRMED',
    };

    const updated = [newApt, ...appointments];
    onUpdateAppointments(updated);
    StorageService.saveAppointments(updated);
    setShowModal(false);
  };

  return (
    <div id="discreet-appointments-section" className="space-y-6">
      {/* Header */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E5EAD9] text-[#5A5A40] flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#3E3B39] font-serif-natural">
                Téléconsultations & Rendez-vous Discrets
              </h2>
              <p className="text-xs text-[#8E8B82]">
                Consultations chiffrées via <strong className="text-[#5A5A40]">Google Meet</strong> & synchronisation <strong className="text-[#5A5A40]">Google Calendar</strong> sous intitulé neutre.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2.5 bg-[#8A9A5B] hover:bg-[#78884d] text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Planifier une Consultation
          </button>
        </div>
      </div>

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-[#FFFFFF] rounded-2xl border border-[#E5E2D9] p-5 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[#5A5A40] bg-[#E5EAD9] px-2.5 py-0.5 rounded-full border border-[#CED6C1]">
                  {apt.role}
                </span>
                <span className="text-xs font-bold text-[#5A5A40] flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-[#8A9A5B]" /> Confirmé
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#3E3B39] font-serif-natural mt-1">{apt.professionalName}</h3>
              
              <div className="p-3 bg-[#F8F7F2] rounded-xl border border-[#E5E2D9] my-3 space-y-1 text-xs text-[#5A5A40]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#8A9A5B]" />
                  <span>{apt.date} à {apt.time}</span>
                </div>
                <div className="flex items-center gap-2 text-[#8E8B82] text-[11px]">
                  <Lock className="w-3.5 h-3.5 text-[#8E8B82]" />
                  <span>Intitulé discret calendrier : <em>"{apt.discreetTitle}"</em></span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E5E2D9] flex items-center justify-between">
              <a
                href={apt.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-[#5A5A40] hover:bg-[#4a4a35] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Video className="w-4 h-4" /> Rejoindre la Consultation Meet
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#3E3B39]/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E5E2D9]">
            <h3 className="text-lg font-bold text-[#3E3B39] font-serif-natural mb-1">Prendre un Rendez-vous Sécurisé</h3>
            <p className="text-xs text-[#8E8B82] mb-4">
              L'événement sera enregistré sous un nom neutre sur votre calendrier pour ne pas susciter de questions.
            </p>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#5A5A40] block mb-1">Spécialiste / Rôle</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] text-[#3E3B39] bg-white focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
                >
                  <option value="Psychologue">Psychologue (Soutien & Traumatisme)</option>
                  <option value="Avocate">Avocate (Conseil juridique & Plainte)</option>
                  <option value="Assistante Sociale">Assistante Sociale (Hébergement & Aides)</option>
                  <option value="Médecin Légiste">Médecin Légiste (Constat & ITT)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5A5A40] block mb-1">Nom du praticien</label>
                <input
                  type="text"
                  required
                  value={formData.professionalName}
                  onChange={(e) => setFormData({ ...formData, professionalName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#5A5A40] block mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#5A5A40] block mb-1">Heure</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#5A5A40] block mb-1">
                  Intitulé camouflé sur le calendrier
                </label>
                <input
                  type="text"
                  required
                  value={formData.discreetTitle}
                  onChange={(e) => setFormData({ ...formData, discreetTitle: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5E2D9] text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#E5E2D9]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#5A5A40] hover:bg-[#F5F2ED] rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#5A5A40] hover:bg-[#4a4a35] rounded-xl shadow-xs"
                >
                  Confirmer le RDV
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
