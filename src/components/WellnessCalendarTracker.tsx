import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Heart, Sparkles, 
  Smile, ShieldCheck, Moon, Sun, Wind, Check, Trash2, Eye, EyeOff, 
  TrendingDown, TrendingUp, Activity, Award, Info
} from 'lucide-react';
import { StorageService } from '../utils/storage';
import { WellnessDailyEntry, WellnessMood } from '../types';

interface WellnessCalendarTrackerProps {
  onStartBreathing?: () => void;
  isNightMode?: boolean;
}

const MOOD_CONFIG: Record<WellnessMood, { label: string; icon: string; color: string; bgLight: string; bgDark: string; border: string }> = {
  serene: {
    label: 'Sereine & Apaisée',
    icon: '🌿',
    color: '#6B8E23',
    bgLight: 'bg-[#8A9A5B]/15',
    bgDark: 'bg-[#8A9A5B]/25',
    border: 'border-[#8A9A5B]/40',
  },
  peaceful: {
    label: 'Calme & Stable',
    icon: '🕊️',
    color: '#5A7D7C',
    bgLight: 'bg-[#5A7D7C]/15',
    bgDark: 'bg-[#5A7D7C]/25',
    border: 'border-[#5A7D7C]/40',
  },
  neutral: {
    label: 'Neutre & En observation',
    icon: '🌾',
    color: '#8E8B82',
    bgLight: 'bg-[#8E8B82]/15',
    bgDark: 'bg-[#8E8B82]/25',
    border: 'border-[#8E8B82]/40',
  },
  tired: {
    label: 'Fatiguée / Besoin de repos',
    icon: '☁️',
    color: '#B08D57',
    bgLight: 'bg-[#B08D57]/15',
    bgDark: 'bg-[#B08D57]/25',
    border: 'border-[#B08D57]/40',
  },
  anxious: {
    label: 'Anxieuse / Tension interne',
    icon: '🌊',
    color: '#C27A56',
    bgLight: 'bg-[#C27A56]/15',
    bgDark: 'bg-[#C27A56]/25',
    border: 'border-[#C27A56]/40',
  },
  fragile: {
    label: 'Vulnérable / Besoin de douceur',
    icon: '🪷',
    color: '#A64D4D',
    bgLight: 'bg-[#A64D4D]/15',
    bgDark: 'bg-[#A64D4D]/25',
    border: 'border-[#A64D4D]/40',
  },
};

const STRESS_LEVEL_CONFIG: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: 'Tension minime / Sérénité', color: '#6B8E23', bg: 'bg-[#8A9A5B]' },
  2: { label: 'Légère vigilance', color: '#7A8D50', bg: 'bg-[#7A8D50]' },
  3: { label: 'Stress modéré', color: '#B08D57', bg: 'bg-[#B08D57]' },
  4: { label: 'Stress élevé / Inquiétude', color: '#C27A56', bg: 'bg-[#C27A56]' },
  5: { label: 'Surcharge aiguë / Besoin d\'ancrage', color: '#A64D4D', bg: 'bg-[#A64D4D]' },
};

const SOOTHING_PRACTICES = [
  { id: 'breathing', label: 'Cohérence cardiaque', icon: '🫁' },
  { id: 'ambient_music', label: 'Musique Haven', icon: '🎵' },
  { id: 'art_avatar', label: 'Art-thérapie', icon: '🎨' },
  { id: 'rest', label: 'Repos / Sieste', icon: '🛌' },
  { id: 'walk', label: 'Marche d\'ancrage', icon: '🚶‍♀️' },
  { id: 'reading', label: 'Lecture apaisante', icon: '📖' },
];

export const WellnessCalendarTracker: React.FC<WellnessCalendarTrackerProps> = ({ 
  onStartBreathing,
  isNightMode = false 
}) => {
  const [entries, setEntries] = useState<WellnessDailyEntry[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  // Editor form state for selected date
  const [selectedMood, setSelectedMood] = useState<WellnessMood>('peaceful');
  const [selectedStress, setSelectedStress] = useState<1 | 2 | 3 | 4 | 5>(2);
  const [selectedSleep, setSelectedSleep] = useState<'restful' | 'average' | 'disturbed'>('average');
  const [selectedPractice, setSelectedPractice] = useState<string>('breathing');
  const [discreetNote, setDiscreetNote] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDiscreetMaskActive, setIsDiscreetMaskActive] = useState(false);

  // Load entries from storage
  useEffect(() => {
    const loaded = StorageService.getWellnessEntries();
    setEntries(loaded);
  }, []);

  // Sync form when selected date changes
  useEffect(() => {
    const entry = entries.find((e) => e.date === selectedDateStr);
    if (entry) {
      setSelectedMood(entry.mood);
      setSelectedStress(entry.stressLevel);
      setSelectedSleep(entry.sleepQuality || 'average');
      setSelectedPractice(entry.soothingPractice || 'breathing');
      setDiscreetNote(entry.discreetNote || '');
    } else {
      // Default reset for empty date
      setSelectedMood('peaceful');
      setSelectedStress(2);
      setSelectedSleep('average');
      setSelectedPractice('breathing');
      setDiscreetNote('');
    }
    setSaveSuccess(false);
  }, [selectedDateStr, entries]);

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  // Day of week offset (Monday = 0)
  const startDayOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = lastDayOfMonth.getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleGoToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDateStr(today.toISOString().split('T')[0]);
  };

  const handleSaveTodayEntry = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const newEntry: WellnessDailyEntry = {
      id: `wellness-${selectedDateStr}-${Date.now()}`,
      date: selectedDateStr,
      mood: selectedMood,
      stressLevel: selectedStress,
      sleepQuality: selectedSleep,
      soothingPractice: selectedPractice as any,
      discreetNote: discreetNote.trim().slice(0, 140), // short discreet note
      createdAt: new Date().toISOString(),
    };

    StorageService.saveWellnessEntry(newEntry);
    const updated = StorageService.getWellnessEntries();
    setEntries(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDeleteCurrentEntry = () => {
    StorageService.deleteWellnessEntry(selectedDateStr);
    const updated = StorageService.getWellnessEntries();
    setEntries(updated);
    // Reset to defaults
    setSelectedMood('peaceful');
    setSelectedStress(2);
    setSelectedSleep('average');
    setSelectedPractice('breathing');
    setDiscreetNote('');
  };

  // Streak & Statistics calculation
  const stats = useMemo(() => {
    if (entries.length === 0) return { streak: 0, avgStress: 2, totalLogged: 0 };
    
    // Sort entries by date desc
    const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
    
    // Calculate streak from today or yesterday
    let streak = 0;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Check if logged today or yesterday
    let checkDate = new Date(today);
    let checkDateStr = todayStr;
    
    const hasToday = entries.some(e => e.date === todayStr);
    if (!hasToday) {
      checkDate.setDate(checkDate.getDate() - 1);
      checkDateStr = checkDate.toISOString().split('T')[0];
    }
    
    while (entries.some(e => e.date === checkDateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
      checkDateStr = checkDate.toISOString().split('T')[0];
    }

    const last7Entries = sorted.slice(0, 7);
    const avgStress = (last7Entries.reduce((acc, curr) => acc + curr.stressLevel, 0) / (last7Entries.length || 1)).toFixed(1);

    return {
      streak,
      avgStress,
      totalLogged: entries.length
    };
  }, [entries]);

  const todayStr = new Date().toISOString().split('T')[0];
  const isSelectedToday = selectedDateStr === todayStr;
  const currentSelectedEntry = entries.find(e => e.date === selectedDateStr);

  return (
    <div id="wellness-calendar-module" className="bg-[#FFFFFF] rounded-3xl border border-[#E5E2D9] p-6 md:p-8 shadow-xs space-y-6">
      {/* 1. Header & Privacy Assurance */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E2D9] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#8A9A5B]/15 text-[#8A9A5B] flex items-center justify-center shrink-0">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg md:text-xl font-bold text-[#3E3B39] font-serif-natural">
                Calendrier de Suivi de Bien-être & Ancrage
              </h3>
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#E5EAD9] text-[#5A5A40] border border-[#CED6C1] hidden sm:inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#8A9A5B]" /> 100% Confidentiel
              </span>
            </div>
            <p className="text-xs text-[#8E8B82] mt-0.5">
              Observez l'évolution de votre météo intérieure (humeur et niveau de tension) en toute sécurité, sans aucun détail compromettant ni lieu.
            </p>
          </div>
        </div>

        {/* Action Pills & Discreet Toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setIsDiscreetMaskActive(!isDiscreetMaskActive)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              isDiscreetMaskActive 
                ? 'bg-[#5A5A40] text-white border-[#5A5A40]' 
                : 'bg-[#F8F7F2] text-[#5A5A40] border-[#E5E2D9] hover:bg-[#E5EAD9]'
            }`}
            title="Masquer les notes pour une discrétion totale visuelle"
          >
            {isDiscreetMaskActive ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isDiscreetMaskActive ? 'Mode Masqué' : 'Affichage Clair'}</span>
          </button>

          <button
            type="button"
            onClick={handleGoToday}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#E5EAD9] text-[#5A5A40] hover:bg-[#d9e0cc] transition-colors border border-[#CED6C1]"
          >
            Aujourd'hui
          </button>
        </div>
      </div>

      {/* 2. Micro-Stats Bar */}
      <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#F8F7F2] border border-[#E5E2D9] text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#8A9A5B]/15 text-[#8A9A5B]">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-[#8E8B82] uppercase tracking-wider font-semibold">Régularité</p>
            <p className="font-bold text-[#3E3B39]">{stats.streak} {stats.streak > 1 ? 'jours consécutifs' : 'jour'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 border-x border-[#E5E2D9] px-3">
          <div className="p-2 rounded-xl bg-[#B08D57]/15 text-[#B08D57]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-[#8E8B82] uppercase tracking-wider font-semibold">Tension Moyenne</p>
            <p className="font-bold text-[#3E3B39]">{stats.avgStress} <span className="text-[10px] text-[#8E8B82]">/ 5</span></p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#5A7D7C]/15 text-[#5A7D7C]">
            <Heart className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-[#8E8B82] uppercase tracking-wider font-semibold">Séances Notées</p>
            <p className="font-bold text-[#3E3B39]">{stats.totalLogged} <span className="text-[10px] text-[#8E8B82]">jours</span></p>
          </div>
        </div>
      </div>

      {/* 3. Main Grid Layout: Interactive Calendar + Daily Point Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Monthly Calendar Matrix (7 cols) */}
        <div className="lg:col-span-7 bg-[#FAF9F5] p-5 rounded-2xl border border-[#E5E2D9] space-y-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-[#3E3B39] flex items-center gap-2">
              <span>{monthNames[month]}</span>
              <span className="text-[#8E8B82] font-normal">{year}</span>
            </h4>
            
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg hover:bg-[#E5EAD9] text-[#5A5A40] transition-colors"
                title="Mois précédent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg hover:bg-[#E5EAD9] text-[#5A5A40] transition-colors"
                title="Mois suivant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-[#8E8B82] pb-1 border-b border-[#E5E2D9]">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mer</span>
            <span>Jeu</span>
            <span>Ven</span>
            <span>Sam</span>
            <span>Dim</span>
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Empty slots for offset */}
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="h-14 rounded-xl opacity-20 pointer-events-none" />
            ))}

            {/* Actual Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const entry = entries.find((e) => e.date === dateStr);
              const isSelected = selectedDateStr === dateStr;
              const isToday = dateStr === todayStr;
              const moodInfo = entry ? MOOD_CONFIG[entry.mood] : null;

              return (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() => setSelectedDateStr(dateStr)}
                  className={`h-14 rounded-xl p-1 flex flex-col justify-between items-center transition-all relative border text-xs ${
                    isSelected
                      ? 'ring-2 ring-[#8A9A5B] border-[#8A9A5B] bg-white shadow-xs z-10'
                      : entry
                      ? 'bg-white hover:border-[#8A9A5B]/50 border-[#E5E2D9]'
                      : 'bg-[#F8F7F2]/60 hover:bg-white border-[#E5E2D9]/60 text-[#8E8B82]'
                  } ${isToday ? 'font-bold' : ''}`}
                >
                  <div className="w-full flex items-center justify-between px-1">
                    <span className={`text-[11px] ${isToday ? 'text-[#8A9A5B]' : 'text-[#3E3B39]'}`}>
                      {dayNum}
                    </span>
                    {isToday && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A9A5B]" title="Aujourd'hui" />
                    )}
                  </div>

                  {/* Mood & Stress indicator */}
                  {entry ? (
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-xs leading-none" title={moodInfo?.label}>
                        {moodInfo?.icon}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <div 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{ backgroundColor: STRESS_LEVEL_CONFIG[entry.stressLevel]?.color }} 
                          title={`Tension: ${entry.stressLevel}/5`}
                        />
                        <span className="text-[9px] font-mono text-[#8E8B82]">
                          {entry.stressLevel}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[9px] text-[#CED6C1] font-light">—</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="pt-3 border-t border-[#E5E2D9] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#8E8B82]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#8A9A5B]" /> Tension 1-2 (Apaisé)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#B08D57]" /> Tension 3 (Modéré)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#A64D4D]" /> Tension 4-5 (Élevé)
              </span>
            </div>
            <span className="text-[#5A5A40]">Cliquez sur un jour pour saisir ou consulter</span>
          </div>
        </div>

        {/* Right Column: Daily Check-in & Soothing Logger (5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF9F5] p-5 rounded-2xl border border-[#E5E2D9] space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-3">
            <div>
              <span className="text-[10px] font-semibold text-[#8A9A5B] uppercase tracking-wider">
                {isSelectedToday ? 'Point du Jour' : 'Revue de la Date'}
              </span>
              <h4 className="font-bold text-sm text-[#3E3B39]">
                {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </h4>
            </div>

            {currentSelectedEntry && (
              <button
                type="button"
                onClick={handleDeleteCurrentEntry}
                className="text-xs text-[#8E8B82] hover:text-[#A64D4D] p-1.5 rounded-lg hover:bg-black/5 transition-colors"
                title="Supprimer la saisie de ce jour"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <form onSubmit={handleSaveTodayEntry} className="space-y-4">
            {/* Mood selector */}
            <div>
              <label className="text-xs font-semibold text-[#5A5A40] block mb-1.5 flex items-center justify-between">
                <span>1. Météo Intérieure / Humeur</span>
                <span className="text-[10px] text-[#8E8B82] font-normal">Sans jugement</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(MOOD_CONFIG) as WellnessMood[]).map((m) => {
                  const cfg = MOOD_CONFIG[m];
                  const isSelected = selectedMood === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedMood(m)}
                      className={`p-2 rounded-xl text-left text-xs transition-all flex items-center gap-2 border ${
                        isSelected
                          ? 'bg-[#8A9A5B] text-white border-[#8A9A5B] shadow-xs'
                          : 'bg-white text-[#3E3B39] border-[#E5E2D9] hover:bg-[#F8F7F2]'
                      }`}
                    >
                      <span className="text-base shrink-0">{cfg.icon}</span>
                      <span className="text-[11px] font-medium leading-tight truncate">{cfg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stress Level Stepper / Range */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[#5A5A40]">2. Niveau de Tension & Stress</span>
                <span className="font-bold font-mono px-2 py-0.5 rounded-md text-white text-[11px]" style={{ backgroundColor: STRESS_LEVEL_CONFIG[selectedStress].color }}>
                  {selectedStress} / 5
                </span>
              </div>
              <p className="text-[10px] text-[#8E8B82]">
                {STRESS_LEVEL_CONFIG[selectedStress].label}
              </p>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={selectedStress}
                onChange={(e) => setSelectedStress(Number(e.target.value) as any)}
                className="w-full h-2 bg-[#CED6C1] rounded-lg appearance-none cursor-pointer accent-[#8A9A5B]"
              />
              <div className="flex justify-between text-[9px] text-[#8E8B82]">
                <span>1 - Sérénité</span>
                <span>3 - Modéré</span>
                <span>5 - Surcharge</span>
              </div>
            </div>

            {/* High Stress Alert / Anchor Suggestion */}
            {selectedStress >= 4 && (
              <div className="p-3 rounded-xl bg-[#A64D4D]/10 border border-[#A64D4D]/30 text-xs text-[#A64D4D] space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 font-semibold">
                  <Wind className="w-4 h-4 shrink-0 text-[#A64D4D]" />
                  <span>Tension élevée détectée</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#3E3B39]">
                  Une séance de 2 minutes de cohérence cardiaque peut immédiatement ralentir les battements de votre cœur.
                </p>
                {onStartBreathing && (
                  <button
                    type="button"
                    onClick={onStartBreathing}
                    className="px-3 py-1 bg-[#A64D4D] hover:bg-[#914040] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Wind className="w-3 h-3" /> Lancer la Respiration Guidée
                  </button>
                )}
              </div>
            )}

            {/* Sleep Quality */}
            <div>
              <label className="text-xs font-semibold text-[#5A5A40] block mb-1.5">
                3. Qualité du Sommeil / Repos
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {[
                  { id: 'restful', label: 'Réparateur', icon: '✨' },
                  { id: 'average', label: 'Intermédiaire', icon: '🌓' },
                  { id: 'disturbed', label: 'Agité / Insomnie', icon: '⚡' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSleep(s.id as any)}
                    className={`py-1.5 px-2 rounded-xl text-[11px] border font-medium transition-all ${
                      selectedSleep === s.id
                        ? 'bg-[#5A5A40] text-white border-[#5A5A40]'
                        : 'bg-white text-[#5A5A40] border-[#E5E2D9] hover:bg-[#F8F7F2]'
                    }`}
                  >
                    <span>{s.icon} {s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Soothing Practice practiced */}
            <div>
              <label className="text-xs font-semibold text-[#5A5A40] block mb-1.5">
                4. Ancrage & Pratique Pratiquée
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {SOOTHING_PRACTICES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPractice(p.id)}
                    className={`p-1.5 rounded-xl text-[10px] border font-medium transition-all flex items-center justify-center gap-1 ${
                      selectedPractice === p.id
                        ? 'bg-[#8A9A5B] text-white border-[#8A9A5B]'
                        : 'bg-white text-[#5A5A40] border-[#E5E2D9] hover:bg-[#F8F7F2]'
                    }`}
                  >
                    <span>{p.icon}</span>
                    <span className="truncate">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Discreet Anonymized Note (strictly no locations or names) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-[#5A5A40] flex items-center gap-1">
                  <span>5. Note d'Ancrage ou Mantra Personnel</span>
                  <span className="text-[10px] text-[#8E8B82] font-normal">(Facultatif)</span>
                </label>
              </div>
              <p className="text-[10px] text-[#8E8B82] mb-1.5 flex items-center gap-1">
                <Info className="w-3 h-3 text-[#8A9A5B] shrink-0" />
                <span>Ne notez aucun lieu, nom ni détail d'incident compromettant.</span>
              </p>
              <input
                type="text"
                maxLength={140}
                placeholder="Ex: J'ai réussi à prendre du temps pour moi / Pensée positive..."
                value={discreetNote}
                onChange={(e) => setDiscreetNote(e.target.value)}
                className={`w-full p-2.5 text-xs rounded-xl border border-[#E5E2D9] bg-white text-[#3E3B39] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 ${
                  isDiscreetMaskActive ? 'filter blur-sm hover:blur-none transition-all' : ''
                }`}
              />
            </div>

            {/* Save Button & Feedback */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-[#8A9A5B] hover:bg-[#78884d] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" /> Enregistré en toute confidentialité !
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4" /> Enregistrer le Suivi de Bien-être
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
