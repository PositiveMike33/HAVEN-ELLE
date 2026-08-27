import React from 'react';
import { Headphones, Play, Pause, FastForward, Rewind } from 'lucide-react';

export const WellnessPodcastSection: React.FC = () => {
  return (
    <div className="bg-[#1E1E1E] text-white rounded-3xl border border-white/10 overflow-hidden shadow-xl max-w-2xl mx-auto">
      {/* Screen Header Bar */}
      <div className="px-4 py-3 bg-[#2A2A2A] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E5EAD9] flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5 text-[#8A9A5B]" />
            Podcast Bien-être & Développement Personnel
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8A9A5B]/30 text-[#E5EAD9] font-medium border border-[#8A9A5B]/40">
          Épisode 1
        </span>
      </div>

      {/* Main Podcast Frame (Visual representation) */}
      <div className="relative w-full aspect-video bg-[#121212] overflow-hidden flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-[#8A9A5B]/20 flex items-center justify-center mb-4 border border-[#8A9A5B]/40">
          <Headphones className="w-10 h-10 text-[#8A9A5B]" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Comprendre les mécanismes du trauma</h3>
        <p className="text-xs text-[#CED6C1] max-w-md">
          Un épisode pour déconstruire les croyances limitantes et amorcer le cheminement de la résilience émotionnelle.
        </p>
      </div>

      {/* Podcast Controls */}
      <div className="p-4 bg-[#242424] border-t border-white/5 space-y-3">
        <div className="flex items-center justify-center gap-6">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Rewind className="w-5 h-5 text-[#CED6C1]" />
          </button>
          <button className="p-4 rounded-full bg-[#8A9A5B] hover:bg-[#7a8a4b] text-white shadow-lg transition-colors">
            <Play className="w-6 h-6 fill-current" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <FastForward className="w-5 h-5 text-[#CED6C1]" />
          </button>
        </div>
      </div>
    </div>
  );
};
