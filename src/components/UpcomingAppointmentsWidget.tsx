import React from 'react';
import { DiscreetAppointment } from '../types';
import { Calendar, Clock, Video, ChevronRight } from 'lucide-react';

interface UpcomingAppointmentsWidgetProps {
  appointments: DiscreetAppointment[];
  onNavigateToAppointments: () => void;
}

export const UpcomingAppointmentsWidget: React.FC<UpcomingAppointmentsWidgetProps> = ({
  appointments,
  onNavigateToAppointments
}) => {
  const now = new Date();
  
  const upcoming = appointments
    .filter(apt => {
      const aptDate = new Date(`${apt.date}T${apt.time}`);
      return aptDate >= now && apt.status === 'CONFIRMED';
    })
    .sort((a, b) => {
      return new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime();
    })
    .slice(0, 2);

  if (upcoming.length === 0) return null;

  return (
    <div className="mb-6 bg-white/80 backdrop-blur-md rounded-2xl border border-[#E5E2D9] p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-2xl bg-[#E5EAD9] flex items-center justify-center text-[#5A5A40]">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#3E3B39]">Prochains Rendez-vous</h3>
          <p className="text-[11px] text-[#8E8B82]">Synchronisés & Sécurisés</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 overflow-hidden">
        {upcoming.map(apt => {
          const aptDate = new Date(`${apt.date}T${apt.time}`);
          const isToday = aptDate.toDateString() === now.toDateString();
          const dateStr = isToday ? "Aujourd'hui" : aptDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
          
          return (
            <div key={apt.id} className="flex-1 min-w-0 bg-[#F8F7F2] rounded-xl p-2.5 border border-[#E5E2D9] flex items-center justify-between gap-2 hover:border-[#CED6C1] transition-colors">
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#3E3B39] truncate">{apt.discreetTitle}</p>
                <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-semibold text-[#8E8B82]">
                  <span className={`flex items-center gap-1 ${isToday ? 'text-[#8A9A5B]' : ''}`}>
                    <Clock className="w-3 h-3" />
                    {dateStr} à {apt.time}
                  </span>
                </div>
              </div>
              <a
                href={apt.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white hover:bg-[#E5EAD9] text-[#5A5A40] border border-[#E5E2D9] hover:border-[#CED6C1] flex items-center justify-center transition-all shrink-0 shadow-2xs"
                title="Rejoindre la téléconsultation"
              >
                <Video className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </div>

      <button
        onClick={onNavigateToAppointments}
        className="shrink-0 flex items-center justify-center w-8 h-8 rounded-xl hover:bg-[#F5F2ED] text-[#8E8B82] transition-colors"
        title="Gérer les rendez-vous"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
