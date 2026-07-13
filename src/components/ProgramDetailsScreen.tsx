import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Calendar, Check, Flame, Star, ShoppingBag, 
  ChefHat, Sparkles, AlertCircle, Play, ClipboardList
} from 'lucide-react';
import { CuratedProgram, Meal } from '../types';

interface ProgramDetailsScreenProps {
  program: CuratedProgram;
  onBack: () => void;
  onActivate: (programId: string) => void;
  isActive: boolean;
}

export default function ProgramDetailsScreen({
  program,
  onBack,
  onActivate,
  isActive,
}: ProgramDetailsScreenProps) {
  const [selectedDay, setSelectedDay] = useState(1);
  const [activeTab, setActiveTab] = useState<'meals' | 'shopping'>('meals');
  const [purchasedIngredients, setPurchasedIngredients] = useState<Record<string, boolean>>({});

  // Fetch the plan for the selected day
  const dayPlan = program.days.find((d) => d.dayNumber === selectedDay) || program.days[0];

  // Consolidate all unique ingredients from the active day's meals for the shopping list
  const dailyMeals: Meal[] = [
    dayPlan.breakfast,
    dayPlan.lunch,
    dayPlan.dinner,
    dayPlan.snack,
  ];

  const allIngredients = dailyMeals.reduce<string[]>((acc, meal) => {
    meal.ingredients.forEach((ing) => {
      if (!acc.includes(ing)) acc.push(ing);
    });
    return acc;
  }, []);

  const toggleIngredient = (ing: string) => {
    setPurchasedIngredients((prev) => ({
      ...prev,
      [ing]: !prev[ing],
    }));
  };

  return (
    <div className="space-y-6 pb-24 font-sans max-w-4xl mx-auto px-4 md:px-6">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-emerald-500 transition cursor-pointer font-semibold font-mono tracking-tight"
      >
        <ArrowLeft size={16} />
        Back to Nutritional Programs
      </button>

      {/* Program Hero Header */}
      <div className={`p-6 md:p-8 rounded-[2rem] bg-gradient-to-br ${program.imageColor} relative overflow-hidden shadow-xl`}>
        {/* Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-black/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <span className="text-5xl block">{program.emoji}</span>
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-300">
                Dietary Architecture • {program.category.toUpperCase()}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-white tracking-wide leading-tight">
                {program.title}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-200 font-light">
              <div className="flex items-center gap-1 font-normal">
                <Star size={14} className="text-amber-400 fill-current" />
                <span className="font-semibold">{program.rating}</span>
                <span className="text-zinc-350 font-light">({program.reviewsCount} reviews)</span>
              </div>
              <span>•</span>
              <span className="font-medium">{program.durationWeeks} Weeks Duration</span>
              <span>•</span>
              <span className="font-medium capitalize">{program.difficulty} Level</span>
            </div>
          </div>

          {/* Activation Button Action */}
          <div className="shrink-0">
            {isActive ? (
              <div className="px-5 py-3.5 bg-emerald-950/40 border border-emerald-800 text-emerald-400 rounded-2xl text-center space-y-1 font-bold">
                <span className="text-sm block">✓ Active Protocol</span>
                <span className="text-[10px] font-mono font-medium block text-zinc-400">Syncing with your home panel</span>
              </div>
            ) : (
              <button
                onClick={() => onActivate(program.id)}
                className="w-full md:w-auto px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-2xl shadow-xl shadow-emerald-950/40 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={18} className="animate-pulse" />
                <span>Activate Program Protocol</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Narrative & Macro splits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Long Narrative */}
        <div className="md:col-span-2 bg-[#121214] border border-zinc-800 p-6 rounded-[2rem] space-y-3 shadow-lg">
          <h4 className="font-serif text-lg tracking-wide text-zinc-150 font-normal">Metabolic Strategy</h4>
          <p className="text-zinc-400 text-xs leading-relaxed font-light">
            {program.longDescription}
          </p>
        </div>

        {/* Dynamic Targets summary */}
        <div className="bg-[#121214] border border-zinc-800 p-6 rounded-[2rem] space-y-4 flex flex-col justify-between shadow-lg">
          <div>
            <h4 className="font-serif text-lg tracking-wide text-zinc-150 font-normal">Target Balance</h4>
            <span className="text-[10px] text-zinc-500 font-mono block">Baseline targets upon activation</span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">{program.dailyCalories}</span>
            <span className="text-xs text-zinc-400">kcal / day</span>
          </div>

          {/* Macro ratios breakdown */}
          <div className="space-y-1.5 pt-2 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-sans">Protein Ratio</span>
              <span className="font-bold text-zinc-300">{program.macros.protein}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-sans">Carbs Ratio</span>
              <span className="font-bold text-zinc-300">{program.macros.carbs}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-sans">Fats Ratio</span>
              <span className="font-bold text-zinc-300">{program.macros.fat}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Day Selector Calendar Carousel */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">Curated Calendar (Choose Day)</h3>
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
          {program.days.map((day) => (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDay(day.dayNumber)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition shrink-0 cursor-pointer flex items-center gap-1.5 ${
                selectedDay === day.dayNumber
                  ? 'bg-emerald-600 text-white border-emerald-500/20 font-bold'
                  : 'bg-[#121214] border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Calendar size={14} />
              Day {day.dayNumber} Recommendations
            </button>
          ))}
        </div>
      </div>

      {/* Inner tabs: Recommended meals vs day shopping list checklist */}
      <div className="border-b border-zinc-800/80 flex gap-4">
        <button
          onClick={() => setActiveTab('meals')}
          className={`py-2 text-sm font-semibold border-b-2 transition ${
            activeTab === 'meals' ? 'border-emerald-500 text-zinc-100' : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Day {selectedDay} Meal Recipes
        </button>
        <button
          onClick={() => setActiveTab('shopping')}
          className={`py-2 text-sm font-semibold border-b-2 transition ${
            activeTab === 'shopping' ? 'border-emerald-500 text-zinc-100' : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Day {selectedDay} Prep Shopping Checklist ({allIngredients.length})
        </button>
      </div>

      {/* Tab contents */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {activeTab === 'meals' ? (
            <motion.div
              key="meals-subtab"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="space-y-5"
            >
              {/* Healthy daily wisdom quote block */}
              <div className="p-4 bg-[#121214] border-l-4 border-emerald-500 rounded-r-2xl text-xs text-zinc-300 leading-relaxed italic shadow-md">
                <strong>💡 Metabolic Tip:</strong> {dayPlan.tip}
              </div>

              {/* Recipe card lists */}
              <div className="space-y-4">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((cat) => {
                  const meal = dayPlan[cat];
                  return (
                    <div key={cat} className="p-6 bg-[#121214] border border-zinc-800 rounded-[2rem] space-y-4 shadow-lg">
                      
                      {/* Recipe category header */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${
                          cat === 'breakfast' ? 'text-blue-400' :
                          cat === 'lunch' ? 'text-amber-400' :
                          cat === 'dinner' ? 'text-purple-400' : 'text-emerald-450'
                        }`}>
                          {cat} slot • recommended eating time: {meal.time}
                        </span>

                        <span className="px-2.5 py-1 bg-[#09090b] border border-zinc-800 rounded-lg text-zinc-300 font-mono text-xs font-semibold">
                          {meal.calories} kcal
                        </span>
                      </div>

                      {/* Recipe title */}
                      <div>
                        <h4 className="text-xl font-serif text-zinc-100 tracking-wide font-normal mb-1">
                          {meal.name}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono pt-1">
                          <span>Protein: <span className="text-blue-400 font-semibold">{meal.protein}g</span></span>
                          <span>Carbohydrates: <span className="text-amber-400 font-semibold">{meal.carbs}g</span></span>
                          <span>Healthy Lipids: <span className="text-emerald-400 font-semibold">{meal.fat}g</span></span>
                        </div>
                      </div>

                      {/* Ingredients list & instructions column splits */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-zinc-800/80">
                        
                        {/* Ingredients */}
                        <div className="space-y-2">
                          <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1 font-mono">
                            <ClipboardList size={14} className="text-zinc-500" />
                            Ingredients List:
                          </span>
                          <ul className="space-y-1.5">
                            {meal.ingredients.map((ing, i) => (
                              <li key={i} className="text-xs text-zinc-400 flex items-start gap-2 font-light">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 mt-1.5 shrink-0" />
                                <span>{ing}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Cooking instructions */}
                        <div className="space-y-2">
                          <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1 font-mono">
                            <ChefHat size={14} className="text-zinc-500" />
                            Prep Instructions:
                          </span>
                          <ol className="space-y-2 pl-1 text-xs text-zinc-400 font-light">
                            {meal.instructions ? (
                              meal.instructions.map((step, i) => (
                                <li key={i} className="leading-relaxed">
                                  <span className="font-semibold text-emerald-400 mr-1 font-mono">{i + 1}.</span>
                                  {step}
                                </li>
                              ))
                            ) : (
                              <li className="italic text-zinc-500">Standard clean culinary assembly or raw consumption. No complex cooking required.</li>
                            )}
                          </ol>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="shopping-subtab"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="bg-[#121214] border border-zinc-800 rounded-[2rem] p-6 space-y-4 shadow-lg"
            >
              <div>
                <h4 className="font-serif text-lg text-zinc-200">Day {selectedDay} Combined Prep Basket</h4>
                <p className="text-xs text-zinc-500 mt-1 font-light">
                  We compiled all ingredients across Breakfast, Lunch, Dinner, and Snack for Day {selectedDay}. Tap ingredients to check them off as bought/available.
                </p>
              </div>

              {/* Shopping checkboxes list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80">
                {allIngredients.map((ing) => {
                  const checked = !!purchasedIngredients[ing];
                  return (
                    <button
                      key={ing}
                      onClick={() => toggleIngredient(ing)}
                      className={`p-3 rounded-2xl border text-left flex items-center justify-between transition cursor-pointer ${
                        checked 
                          ? 'bg-emerald-950/20 border-emerald-500/20 text-zinc-500' 
                          : 'bg-[#09090b] border-zinc-800 text-zinc-300 hover:border-zinc-700/85'
                      }`}
                    >
                      <span className={`text-xs font-medium ${checked ? 'line-through text-zinc-600' : ''}`}>{ing}</span>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        checked ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-zinc-800 bg-[#09090b]'
                      }`}>
                        {checked && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Reset shopping list */}
              <div className="pt-3 border-t border-zinc-800/80 flex justify-between items-center text-xs text-zinc-500 font-mono">
                <span>SOURCING ACCOUNTABILITY</span>
                <button
                  onClick={() => setPurchasedIngredients({})}
                  className="text-zinc-400 hover:text-emerald-400 underline font-semibold cursor-pointer"
                >
                  Uncheck All Items
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
