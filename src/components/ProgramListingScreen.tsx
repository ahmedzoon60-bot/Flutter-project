import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, ChevronRight, Star, Clock, Flame, Dumbbell, ShieldCheck, Heart, Check } from 'lucide-react';
import { CuratedProgram } from '../types';
import { CURATED_PROGRAMS } from '../data/programs';

interface ProgramListingScreenProps {
  onSelectProgram: (programId: string) => void;
  activeProgramId: string | null;
}

export default function ProgramListingScreen({
  onSelectProgram,
  activeProgramId,
}: ProgramListingScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'loss' | 'gain' | 'wellness' | 'endurance'>('all');

  // Filter programs based on category and search query
  const filteredPrograms = CURATED_PROGRAMS.filter((program) => {
    const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory;
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          program.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-24 font-sans max-w-5xl mx-auto px-4 md:px-6">
      
      {/* Header section */}
      <div className="space-y-2 pt-4">
        <h2 className="text-3xl font-serif text-zinc-100 tracking-wide">Curated Nutritional Architectures</h2>
        <p className="text-zinc-500 text-xs font-light">
          Select an expert-vetted dietary framework configured with precise calories, macros, and scheduled recipe lists.
        </p>
      </div>

      {/* Search & Categories Filter bar */}
      <div className="flex flex-col md:flex-row gap-3.5 items-center justify-between pb-3">
        {/* Search input */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3.5 top-3 text-zinc-500" size={16} />
          <input
            type="text"
            placeholder="Search programs, tags, recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#121214] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-xs font-sans"
          />
        </div>

        {/* Categories selector tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto overflow-x-auto scrollbar-none pb-1">
          {[
            { id: 'all', label: 'All Architectures' },
            { id: 'loss', label: 'Fat Shredding (Keto)' },
            { id: 'gain', label: 'Muscle Building' },
            { id: 'wellness', label: 'Longevity & Health' },
            { id: 'endurance', label: 'Metabolic & Fasting' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white border-emerald-500/20 shadow-md shadow-emerald-950/20 font-bold'
                  : 'bg-[#121214] border-zinc-850 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of curations */}
      {filteredPrograms.length === 0 ? (
        <div className="text-center py-16 bg-[#121214] border border-zinc-800 rounded-3xl space-y-3">
          <p className="text-zinc-400 text-sm">No dietary architectures match your filter criteria.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} 
            className="text-xs text-emerald-400 underline font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrograms.map((program) => {
            const isActive = activeProgramId === program.id;
            
            return (
              <motion.div
                key={program.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-[#121214] border border-zinc-800/80 rounded-[2.5rem] overflow-hidden shadow-lg flex flex-col justify-between"
              >
                {/* Visual Accent Header with gradient */}
                <div className={`p-6 bg-gradient-to-br ${program.imageColor} relative`}>
                  <div className="absolute top-4 right-4 bg-zinc-950/40 backdrop-blur-md px-2.5 py-1 rounded-xl text-zinc-100 text-[10px] font-bold tracking-wider font-mono uppercase">
                    {program.difficulty}
                  </div>

                  <span className="text-4xl block mb-2">{program.emoji}</span>
                  <h3 className="text-2xl font-serif text-white tracking-wide leading-tight">
                    {program.title}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-300 block mt-1">Curated by {program.author}</span>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <p className="text-xs text-zinc-400 leading-relaxed font-light">
                      {program.description}
                    </p>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-zinc-800/80 text-center font-mono">
                      <div>
                        <span className="text-[10px] text-zinc-500 block">Duration</span>
                        <span className="text-xs font-bold text-zinc-200">{program.durationWeeks} Weeks</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block">Daily Target</span>
                        <span className="text-xs font-bold text-zinc-200">{program.dailyCalories} kcal</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block">Reviews</span>
                        <span className="text-xs font-bold text-zinc-200 flex items-center justify-center gap-0.5">
                          <Star size={11} className="text-amber-400 fill-current" />
                          {program.rating}
                        </span>
                      </div>
                    </div>

                    {/* Macro ratio preview bubbles */}
                    <div className="flex items-center gap-4 text-[11px] text-zinc-400">
                      <span className="font-semibold text-zinc-300">Macro Split:</span>
                      <div className="flex gap-1.5 font-mono">
                        <span className="px-2 py-0.5 bg-blue-950/40 text-blue-400 border border-blue-900/30 rounded-md font-bold text-[10px]">
                          P {program.macros.protein}%
                        </span>
                        <span className="px-2 py-0.5 bg-amber-950/40 text-amber-400 border border-amber-900/30 rounded-md font-bold text-[10px]">
                          C {program.macros.carbs}%
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 rounded-md font-bold text-[10px]">
                          F {program.macros.fat}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {isActive && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950 text-emerald-450 border border-emerald-800/50 px-2 py-0.5 rounded-full">
                          <Check size={10} strokeWidth={3} />
                          Active Plan
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectProgram(program.id)}
                      className="px-4 py-2 bg-zinc-900 hover:bg-emerald-600 hover:text-white text-zinc-300 border border-zinc-800 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Review Details</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      )}

    </div>
  );
}
