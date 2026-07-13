import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calculator, ShieldCheck, Flame, Dumbbell, Scale, ChevronRight } from 'lucide-react';

interface MacroCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTargets: (calories: number, protein: number, carbs: number, fat: number) => void;
  initialWeight?: number;
}

export default function MacroCalculatorModal({
  isOpen,
  onClose,
  onApplyTargets,
  initialWeight = 75,
}: MacroCalculatorModalProps) {
  const [weight, setWeight] = useState<string>(initialWeight.toString());
  const [height, setHeight] = useState<string>('175');
  const [age, setAge] = useState<string>('28');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<string>('moderate');
  const [goal, setGoal] = useState<'loss' | 'maintenance' | 'gain'>('loss');

  const [result, setResult] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  const calculateMacros = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    if (isNaN(w) || isNaN(h) || isNaN(a)) {
      alert('Please enter valid numbers');
      return;
    }

    // BMR using Mifflin-St Jeor
    let bmr = 10 * w + 6.25 * h - 5 * a;
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // Activity multiplier
    let multiplier = 1.2;
    if (activity === 'light') multiplier = 1.375;
    else if (activity === 'moderate') multiplier = 1.55;
    else if (activity === 'active') multiplier = 1.725;

    let tdee = Math.round(bmr * multiplier);

    // Goal adjustments
    let targetCal = tdee;
    let pPct = 30, cPct = 40, fPct = 30; // default split

    if (goal === 'loss') {
      targetCal = Math.round(tdee - 500); // 500 kcal deficit
      pPct = 35; // higher protein for muscle retention
      cPct = 30;
      fPct = 35;
    } else if (goal === 'gain') {
      targetCal = Math.round(tdee + 400); // surplus
      pPct = 30;
      cPct = 45;
      fPct = 25;
    } else {
      // maintenance
      pPct = 25;
      cPct = 45;
      fPct = 30;
    }

    // Ensure calories don't drop too low
    if (targetCal < 1200) targetCal = 1200;

    // Gram calculations (1g Protein = 4 kcal, 1g Carb = 4 kcal, 1g Fat = 9 kcal)
    const protGrams = Math.round((targetCal * (pPct / 100)) / 4);
    const carbGrams = Math.round((targetCal * (cPct / 100)) / 4);
    const fatGrams = Math.round((targetCal * (fPct / 100)) / 9);

    setResult({
      calories: targetCal,
      protein: protGrams,
      carbs: carbGrams,
      fat: fatGrams,
    });
  };

  const handleApply = () => {
    if (result) {
      onApplyTargets(result.calories, result.protein, result.carbs, result.fat);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg bg-[#121214] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800/80 bg-[#121214]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-950/40 rounded-xl border border-emerald-800/50 text-emerald-400">
                  <Calculator size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-serif text-zinc-100 font-normal tracking-wide">Macro Target Calculator</h3>
                  <p className="text-xs text-zinc-500 font-light">Scientific baseline calorie & macro split</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 rounded-lg transition cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-zinc-300">
              {!result ? (
                <div className="space-y-4">
                  {/* Gender Selector */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2">Gender</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setGender('male')}
                        className={`py-2.5 rounded-xl border text-center transition font-semibold text-xs cursor-pointer ${
                          gender === 'male'
                            ? 'bg-emerald-950/20 border-emerald-800 text-emerald-400'
                            : 'bg-[#09090b] border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                        }`}
                      >
                        Male
                      </button>
                      <button
                        type="button"
                        onClick={() => setGender('female')}
                        className={`py-2.5 rounded-xl border text-center transition font-semibold text-xs cursor-pointer ${
                          gender === 'female'
                            ? 'bg-emerald-950/20 border-emerald-800 text-emerald-400'
                            : 'bg-[#09090b] border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                        }`}
                      >
                        Female
                      </button>
                    </div>
                  </div>

                  {/* Weight / Height / Age Inputs */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Weight (kg)</label>
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="w-full px-3 py-2 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 font-mono text-xs"
                        placeholder="70"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Height (cm)</label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full px-3 py-2 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 font-mono text-xs"
                        placeholder="175"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Age (yrs)</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-3 py-2 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 font-mono text-xs"
                        placeholder="25"
                      />
                    </div>
                  </div>

                  {/* Activity Level */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2">Activity Level</label>
                    <div className="space-y-2">
                      {[
                        { id: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise, desk job' },
                        { id: 'light', label: 'Lightly Active', desc: 'Light exercise or sports 1-3 days/week' },
                        { id: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
                        { id: 'active', label: 'Very Active', desc: 'Hard exercise/sports 6-7 days/week' },
                      ].map((act) => (
                        <button
                          key={act.id}
                          type="button"
                          onClick={() => setActivity(act.id)}
                          className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                            activity === act.id
                              ? 'bg-emerald-950/20 border-emerald-800 text-emerald-400'
                              : 'bg-[#09090b] border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                          }`}
                        >
                          <div>
                            <span className="font-semibold block text-zinc-100 text-xs">{act.label}</span>
                            <span className="text-[11px] text-zinc-500 font-light">{act.desc}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Fitness Goal */}
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-2">Fitness Goal</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'loss', label: 'Lose Fat', icon: Scale },
                        { id: 'maintenance', label: 'Maintain', icon: Flame },
                        { id: 'gain', label: 'Build Muscle', icon: Dumbbell },
                      ].map((g) => {
                        const Icon = g.icon;
                        return (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => setGoal(g.id as any)}
                            className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-center transition cursor-pointer ${
                              goal === g.id
                                ? 'bg-emerald-950/20 border-emerald-800 text-emerald-400'
                                : 'bg-[#09090b] border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                            }`}
                          >
                            <Icon size={16} />
                            <span className="font-semibold text-xs text-zinc-200">{g.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <button
                    type="button"
                    onClick={calculateMacros}
                    className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-950/40 transition flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    <Calculator size={18} />
                    Calculate My Baseline
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Results Display */}
                  <div className="p-6 bg-[#09090b] rounded-2xl border border-zinc-800 text-center space-y-4 shadow-inner">
                    <p className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-widest">Your Custom Daily Target</p>
                    <div className="space-y-1">
                      <span className="text-5xl font-extrabold text-emerald-400 font-mono tracking-tight">{result.calories}</span>
                      <span className="text-xs text-zinc-400 block font-medium">kcal / day</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-800/80">
                      <div className="bg-[#121214] p-2.5 rounded-xl border border-zinc-800/50">
                        <span className="text-xs text-zinc-400 block">Protein</span>
                        <span className="font-bold text-zinc-100 text-sm font-mono">{result.protein}g</span>
                        <span className="text-[10px] text-zinc-500 block font-mono">{result.protein * 4} kcal</span>
                      </div>
                      <div className="bg-[#121214] p-2.5 rounded-xl border border-zinc-800/50">
                        <span className="text-xs text-zinc-400 block">Carbs</span>
                        <span className="font-bold text-zinc-100 text-sm font-mono">{result.carbs}g</span>
                        <span className="text-[10px] text-zinc-500 block font-mono">{result.carbs * 4} kcal</span>
                      </div>
                      <div className="bg-[#121214] p-2.5 rounded-xl border border-zinc-800/50">
                        <span className="text-xs text-zinc-400 block">Fats</span>
                        <span className="font-bold text-zinc-100 text-sm font-mono">{result.fat}g</span>
                        <span className="text-[10px] text-zinc-500 block font-mono">{result.fat * 9} kcal</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2.5">
                    <ShieldCheck size={16} className="text-emerald-450 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-zinc-450 leading-relaxed font-light">
                      These figures are based on the Mifflin-St Jeor formula, widely recognized as the most accurate estimation for personal dietary planners.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setResult(null)}
                      className="py-2.5 border border-zinc-800 bg-[#09090b] hover:bg-zinc-900 text-zinc-300 font-semibold text-xs rounded-xl transition cursor-pointer"
                    >
                      Recalculate
                    </button>
                    <button
                      type="button"
                      onClick={handleApply}
                      className="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl transition shadow-md shadow-emerald-950/20 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Apply Targets
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
