import React, { useState, useEffect } from 'react';
import { Users, Video } from 'lucide-react';
import { TrustedContactsManager } from './TrustedContactsManager';
import { DiscreetAppointments } from './DiscreetAppointments';
import { TrustedContact, EmergencyAlert, DiscreetAppointment } from '../types';

interface ContactsEtConsultationsProps {
  contacts: TrustedContact[];
  onUpdateContacts: (contacts: TrustedContact[]) => void;
  alerts: EmergencyAlert[];
  onAlertDispatched: (alert: EmergencyAlert) => void;
  appointments: DiscreetAppointment[];
  onUpdateAppointments: (appointments: DiscreetAppointment[]) => void;
  requestedSubTab: 'contacts' | 'appointments';
  onSubTabChange: (subTab: 'contacts' | 'appointments') => void;
  onOpenGmail?: (options?: { mode?: 'inbox' | 'compose' | 'sos' | 'dossier'; recipient?: string; subject?: string; body?: string }) => void;
}

export const ContactsEtConsultations: React.FC<ContactsEtConsultationsProps> = ({
  contacts,
  onUpdateContacts,
  alerts,
  onAlertDispatched,
  appointments,
  onUpdateAppointments,
  requestedSubTab,
  onSubTabChange,
  onOpenGmail,
}) => {
  return (
    <div className="space-y-4 animate-in fade-in zoom-in duration-300">
      {/* Sub-Navigation for Contacts & Consultations */}
      <div className="bg-[#FFFFFF]/92 backdrop-blur-md border border-[#E5E2D9] rounded-2xl p-2 flex items-center gap-2 overflow-x-auto scrollbar-none shadow-sm">
        <button
          onClick={() => onSubTabChange('contacts')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            requestedSubTab === 'contacts'
              ? 'bg-[#8A9A5B] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#F5F2ED]'
          }`}
        >
          <Users className="w-4 h-4" />
          Contacts de Confiance
        </button>
        <button
          onClick={() => onSubTabChange('appointments')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            requestedSubTab === 'appointments'
              ? 'bg-[#8A9A5B] text-white shadow-xs'
              : 'text-[#5A5A40] hover:bg-[#F5F2ED]'
          }`}
        >
          <Video className="w-4 h-4" />
          Téléconsultations
        </button>
      </div>

      {/* Content Area */}
      <div>
        {requestedSubTab === 'contacts' && (
          <TrustedContactsManager
            contacts={contacts}
            onUpdateContacts={onUpdateContacts}
            alerts={alerts}
            onAlertDispatched={onAlertDispatched}
            onOpenGmail={onOpenGmail}
          />
        )}
        {requestedSubTab === 'appointments' && (
          <DiscreetAppointments
            appointments={appointments}
            onUpdateAppointments={onUpdateAppointments}
          />
        )}
      </div>
    </div>
  );
};
