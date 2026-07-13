import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Droplet, Dumbbell, Scale, ChevronRight, Check, Sparkles, 
  Flame, Salad, Zap, ArrowUpRight, TrendingDown, BookOpen, UserCheck, HelpCircle
} from 'lucide-react';
import { UserProfile, Meal, CuratedProgram } from '../types';

interface HomeScreenProps {
  user: UserProfile;
  activeProgram: CuratedProgram | null;
  onUpdateWater: (amount: number) => void;
  onLogMeal: (meal: Meal, category: 'breakfast' | 'lunch' | 'dinner' | 'snack') => void;
  onRemoveLoggedMeal: (id: string) => void;
  onAddWeight: (weight: number) => void;
  onOpenCalculator: () => void;
  onNavigateToPrograms: () => void;
}

export default function HomeScreen({
  user,
  activeProgram,
  onUpdateWater,
  onLogMeal,
  onRemoveLoggedMeal,
  onAddWeight,
  onOpenCalculator,
  onNavigateToPrograms,
}: HomeScreenProps) {
  const [customWeight, setCustomWeight] = useState('');
  const [activeTab, setActiveTab] = useState<'today' | 'history'>('today');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Calculate consumed macros from logged meals
  const consumed = user.loggedMeals.reduce(
    (acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const calorieProgress = Math.min((consumed.calories / user.targetCalories) * 100, 100);
  const proteinProgress = Math.min((consumed.protein / user.targetProtein) * 100, 100);
  const carbsProgress = Math.min((consumed.carbs / user.targetCarbs) * 100, 100);
  const fatProgress = Math.min((consumed.fat / user.targetFat) * 100, 100);
  const waterProgress = Math.min((user.waterIntake / user.waterGoal) * 100, 100);

  // Get active day meals if a program is active
  const currentDayPlan = activeProgram?.days.find(
    (d) => d.dayNumber === user.activeProgramDay
  ) || null;

  // Handler for ticking off meals
  const handleMealCheck = (meal: Meal, category: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    onLogMeal(meal, category);
    setSuccessToast(`Logged "${meal.name}"! +${meal.calories} kcal`);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(customWeight);
    if (!isNaN(w) && w > 30 && w < 250) {
      onAddWeight(w);
      setCustomWeight('');
      setSuccessToast(`Weight logged: ${w} kg`);
      setTimeout(() => setSuccessToast(null), 3000);
    }
  };

  // Default balanced meals if no program is active
  const defaultMeals: Record<'breakfast' | 'lunch' | 'dinner' | 'snack', Meal> = {
    breakfast: {
      id: 'd-b-1',
      name: 'Organic Avocado & Soft Egg Slices',
      calories: 380,
      protein: 14,
      carbs: 24,
      fat: 22,
      time: '08:30 AM',
      ingredients: ['1 Egg', '1/2 Avocado', '1 slice Sprouted Bread']
    },
    lunch: {
      id: 'd-l-1',
      name: 'Seared Lemon Chicken & Quinoa',
      calories: 550,
      protein: 38,
      carbs: 45,
      fat: 12,
      time: '01:00 PM',
      ingredients: ['150g Chicken Breast', '1/2 cup Quinoa', 'Mixed Greens']
    },
    dinner: {
      id: 'd-d-1',
      name: 'Fresh Baked Salmon with Asparagus',
      calories: 490,
      protein: 34,
      carbs: 12,
      fat: 26,
      time: '07:00 PM',
      ingredients: ['140g Salmon Fillet', '1 cup Asparagus', '1 tsp Olive Oil']
    },
    snack: {
      id: 'd-s-1',
      name: 'Greek Yogurt & Honey Berry Cup',
      calories: 180,
      protein: 12,
      carbs: 22,
      fat: 4,
      time: '04:30 PM',
      ingredients: ['150g Greek Yogurt', '1 tsp Organic Honey', 'Berries']
    }
  };

  const getRecommendedMeal = (category: 'breakfast' | 'lunch' | 'dinner' | 'snack'): Meal => {
    if (currentDayPlan) {
      return currentDayPlan[category];
    }
    return defaultMeals[category];
  };

  // Check if a specific default/recommended meal is already logged today
  const isMealLogged = (mealName: string) => {
    return user.loggedMeals.some(m => m.name === mealName);
  };

  return (
    <div className="space-y-6 pb-24 font-sans max-w-5xl mx-auto px-4 md:px-6">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-stone-950 px-4 py-3 rounded-2xl shadow-xl border border-emerald-400 font-bold flex items-center gap-2 text-sm"
          >
            <Sparkles size={16} className="animate-pulse" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Greeting & Quick Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
        <div>
          <h2 className="text-3xl font-serif text-zinc-100 tracking-wide flex items-center gap-2">
            Hello, {user.name}! <Sparkles className="text-emerald-500" size={22} />
          </h2>
          <p className="text-zinc-500 text-xs mt-0.5 font-light">
            {activeProgram 
              ? `Day ${user.activeProgramDay} of "${activeProgram.title}" program` 
              : 'Establish a custom baseline or choose a targeted nutrition program below.'
            }
          </p>
        </div>

        {/* Shortcut buttons */}
        <div className="flex gap-2.5">
          <button
            onClick={onOpenCalculator}
            className="px-3.5 py-2 bg-[#121214] border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300 rounded-xl transition text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={14} className="text-emerald-500" />
            Adjust Target Macros
          </button>
          {!activeProgram && (
            <button
              onClick={onNavigateToPrograms}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950/20"
            >
              <BookOpen size={14} />
              Browse Programs
            </button>
          )}
        </div>
      </div>

      {/* Program Quickbar (if active) */}
      {activeProgram && (
        <div className="p-4 bg-[#121214] border border-zinc-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/3 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-3 z-10">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/40 flex items-center justify-center text-emerald-400 border border-emerald-900/40 text-lg">
              {activeProgram.emoji}
            </div>
            <div>
              <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest block font-mono">Active Program</span>
              <h4 className="font-semibold text-zinc-100 text-sm leading-tight">{activeProgram.title}</h4>
            </div>
          </div>
          <div className="flex items-center gap-4 z-10">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-zinc-500 block font-mono">Today’s Focus</span>
              <span className="text-xs font-medium text-zinc-300">
                {activeProgram.days.find(d => d.dayNumber === user.activeProgramDay)?.tip.substring(0, 45)}...
              </span>
            </div>
            <button
              onClick={onNavigateToPrograms}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-xl transition text-xs font-semibold shrink-0 flex items-center gap-1 cursor-pointer"
            >
              View Day {user.activeProgramDay} Recommended Meals
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Stats Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Calorie Progress Ring / Widget */}
        <div className="bg-[#121214] border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-between relative overflow-hidden shadow-lg shadow-black/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">Calorie Balance</span>
            <div className="p-1.5 bg-emerald-950/40 rounded-lg text-emerald-400 border border-emerald-900/30">
              <Flame size={14} />
            </div>
          </div>

          <div className="my-6 flex items-center justify-around gap-4">
            {/* SVG Ring */}
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background track */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  strokeWidth="8"
                  stroke="#1f1f23"
                  fill="transparent"
                />
                {/* Active circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  strokeWidth="8"
                  stroke="url(#emerald-grad)"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - calorieProgress / 100)}`}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
                <defs>
                  <linearGradient id="emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Inner details */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-serif text-zinc-100 tracking-tight">{consumed.calories}</span>
                <span className="text-[10px] text-zinc-500 font-medium font-mono">/ {user.targetCalories} kcal</span>
              </div>
            </div>

            {/* Simple Legend */}
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-zinc-500 block font-mono">Remaining</span>
                <span className="font-semibold text-zinc-200 font-mono text-base">
                  {Math.max(user.targetCalories - consumed.calories, 0)} <span className="text-[10px] font-normal text-zinc-500">kcal</span>
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block font-mono">Burn Goal</span>
                <span className="font-semibold text-emerald-400 font-mono">
                  {calorieProgress.toFixed(0)}% Done
                </span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-zinc-500 text-center border-t border-zinc-800/60 pt-3 font-medium">
            {consumed.calories > user.targetCalories 
              ? '⚠️ Over daily baseline target budget.' 
              : `Fuel deficit buffer is ${user.targetCalories - consumed.calories} kcal`
            }
          </p>
        </div>

        {/* Macronutrient Bars Tracker */}
        <div className="bg-[#121214] border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-between shadow-lg shadow-black/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">Macronutrient Targets</span>
            <div className="p-1.5 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
              <Salad size={14} />
            </div>
          </div>

          <div className="my-5 space-y-4">
            {/* Protein bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-zinc-300">Protein (Hypertrophy)</span>
                <span className="font-mono text-zinc-400 font-medium">{consumed.protein}g / {user.targetProtein}g</span>
              </div>
              <div className="h-2.5 bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${proteinProgress}%` }}
                />
              </div>
            </div>

            {/* Carbs bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-zinc-300">Carbohydrates (Energy)</span>
                <span className="font-mono text-zinc-400 font-medium">{consumed.carbs}g / {user.targetCarbs}g</span>
              </div>
              <div className="h-2.5 bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-600 to-orange-600 rounded-full transition-all duration-500"
                  style={{ width: `${carbsProgress}%` }}
                />
              </div>
            </div>

            {/* Fats bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-zinc-300">Lipids / Fats (Hormonal)</span>
                <span className="font-mono text-zinc-400 font-medium">{consumed.fat}g / {user.targetFat}g</span>
              </div>
              <div className="h-2.5 bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full transition-all duration-500"
                  style={{ width: `${fatProgress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-around text-[10px] text-zinc-500 border-t border-zinc-800/60 pt-3 font-mono">
            <span>P: {consumed.protein * 4} kcal</span>
            <span>C: {consumed.carbs * 4} kcal</span>
            <span>F: {consumed.fat * 9} kcal</span>
          </div>
        </div>

        {/* Water Hydro Logger & Weight Track */}
        <div className="space-y-4">
          
          {/* Hydration Widget */}
          <div className="bg-[#121214] border border-zinc-800 rounded-[2rem] p-5 flex items-center justify-between relative overflow-hidden shadow-lg shadow-black/20">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block font-mono">Hydration Goal</span>
              <div>
                <span className="text-3xl font-serif text-blue-400 tracking-tight">{user.waterIntake}</span>
                <span className="text-xs text-zinc-400 font-medium font-mono"> / {user.waterGoal} ml</span>
              </div>
              
              <div className="flex gap-1.5 pt-1">
                <button
                  onClick={() => onUpdateWater(250)}
                  className="px-2.5 py-1 bg-[#09090b] hover:bg-zinc-900 hover:text-blue-400 hover:border-blue-500/30 text-zinc-400 rounded-lg text-[10px] font-semibold border border-zinc-800 transition cursor-pointer"
                >
                  +250ml
                </button>
                <button
                  onClick={() => onUpdateWater(500)}
                  className="px-2.5 py-1 bg-[#09090b] hover:bg-zinc-900 hover:text-blue-400 hover:border-blue-500/30 text-zinc-400 rounded-lg text-[10px] font-semibold border border-zinc-800 transition cursor-pointer"
                >
                  +500ml
                </button>
              </div>
            </div>

            {/* Large Water droplet SVG button with active scaling */}
            <button 
              onClick={() => onUpdateWater(250)}
              className="relative w-16 h-16 rounded-2xl bg-blue-950/30 hover:bg-blue-950/50 text-blue-400 border border-blue-900/40 flex items-center justify-center transition active:scale-95 cursor-pointer shadow-lg shadow-blue-550/5"
            >
              <Droplet size={28} className="fill-current animate-pulse" />
              <span className="absolute bottom-1 text-[8px] font-black uppercase tracking-wider text-blue-300">Tap</span>
            </button>
          </div>

          {/* Quick Weight Logger */}
          <div className="bg-[#121214] border border-zinc-800 rounded-[2rem] p-5 shadow-lg shadow-black/20">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-2 font-mono">Weight Progression</span>
            
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-serif text-zinc-100 tracking-tight">
                  {user.weightHistory.length > 0 
                    ? user.weightHistory[user.weightHistory.length - 1].weight 
                    : '--'}
                </span>
                <span className="text-xs text-zinc-400 font-medium font-mono"> kg</span>
                
                {user.weightHistory.length > 1 && (
                  <span className="text-[10px] text-emerald-400 font-mono ml-2 inline-flex items-center">
                    <TrendingDown size={10} className="mr-0.5" />
                    {(user.weightHistory[0].weight - user.weightHistory[user.weightHistory.length - 1].weight).toFixed(1)} kg dropped
                  </span>
                )}
              </div>

              <form onSubmit={handleWeightSubmit} className="flex gap-1.5">
                <input
                  type="number"
                  step="0.1"
                  required
                  placeholder="74.5"
                  value={customWeight}
                  onChange={(e) => setCustomWeight(e.target.value)}
                  className="w-16 px-2 py-1.5 bg-[#09090b] border border-zinc-800 rounded-xl text-zinc-100 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                />
                <button
                  type="submit"
                  className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-xl transition cursor-pointer"
                >
                  <Scale size={14} />
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>

      {/* Tabs Selector for Todays Planner vs Logged History */}
      <div className="border-b border-zinc-800/80 flex gap-4">
        <button
          onClick={() => setActiveTab('today')}
          className={`py-2 text-sm font-semibold border-b-2 transition relative ${
            activeTab === 'today' ? 'border-emerald-500 text-zinc-150' : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Today’s Food Planner
          {activeTab === 'today' && <span className="absolute -top-1 -right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`py-2 text-sm font-semibold border-b-2 transition relative ${
            activeTab === 'history' ? 'border-emerald-500 text-zinc-150' : 'border-transparent text-zinc-400 hover:text-zinc-200'
          }`}
        >
          Daily Consumption Log ({user.loggedMeals.length})
        </button>
      </div>

      {/* Active Tab Area */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {activeTab === 'today' ? (
            <motion.div
              key="today-tab"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((cat) => {
                const meal = getRecommendedMeal(cat);
                const eaten = isMealLogged(meal.name);
                
                return (
                  <div 
                    key={cat}
                    className={`p-5 rounded-[2rem] border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                      eaten 
                        ? 'bg-emerald-950/15 border-emerald-800/40' 
                        : 'bg-[#121214] border-zinc-800 hover:border-zinc-700/80'
                    }`}
                  >
                    <div>
                      {/* Category Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold uppercase tracking-widest font-mono ${
                          cat === 'breakfast' ? 'text-blue-400' :
                          cat === 'lunch' ? 'text-amber-400' :
                          cat === 'dinner' ? 'text-purple-400' : 'text-emerald-450'
                        }`}>
                          {cat} recommended • {meal.time}
                        </span>

                        {eaten && (
                          <span className="flex items-center gap-1 text-[10px] bg-emerald-950 text-emerald-450 border border-emerald-800/50 px-2 py-0.5 rounded-full font-bold">
                            <Check size={10} strokeWidth={3} />
                            Completed
                          </span>
                        )}
                      </div>

                      {/* Meal Title & Calorie Bubble */}
                      <div className="flex justify-between items-start gap-2">
                        <h5 className="font-serif text-lg text-zinc-100 tracking-wide font-normal leading-snug">
                          {meal.name}
                        </h5>
                        <div className="px-2 py-1 bg-[#09090b] border border-zinc-800 rounded-lg text-zinc-300 font-mono text-xs text-right whitespace-nowrap shrink-0">
                          <span className="font-bold block text-zinc-100 leading-none">{meal.calories}</span>
                          <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider">kcal</span>
                        </div>
                      </div>

                      {/* Ingredient tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {meal.ingredients.map((ing, i) => (
                          <span key={i} className="text-[10px] bg-[#09090b]/80 text-zinc-400 px-2 py-0.5 rounded-md border border-zinc-800/40">
                            {ing}
                          </span>
                        ))}
                      </div>

                      {/* Mini Macros Row */}
                      <div className="flex gap-4 mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400 font-mono">
                        <div>Protein: <span className="text-blue-400 font-bold">{meal.protein}g</span></div>
                        <div>Carbs: <span className="text-amber-400 font-bold">{meal.carbs}g</span></div>
                        <div>Fats: <span className="text-emerald-400 font-bold">{meal.fat}g</span></div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-zinc-500 font-medium">Meticulously pre-calculated</span>
                      
                      {eaten ? (
                        <div className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                          <UserCheck size={14} />
                          Added to Macro Budget
                        </div>
                      ) : (
                        <button
                          onClick={() => handleMealCheck(meal, cat)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition flex items-center gap-1 cursor-pointer"
                        >
                          <Check size={14} strokeWidth={2.5} />
                          Mark as Consumed
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="history-tab"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="bg-[#121214] border border-zinc-800 rounded-[2rem] p-6 shadow-lg shadow-black/20"
            >
              {user.loggedMeals.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#09090b] border border-zinc-800 flex items-center justify-center text-zinc-500 mx-auto">
                    <HelpCircle size={22} />
                  </div>
                  <div>
                    <h5 className="font-serif text-lg text-zinc-300">No Meals Logged Yet</h5>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1 font-light">
                      Check off recommended plan meals on the left, or calculate your custom macro constraints to begin logging!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">Consolidated Ledger</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">Total: {consumed.calories} kcal logged today</span>
                  </div>

                  <div className="divide-y divide-zinc-800/80">
                    {user.loggedMeals.map((meal) => (
                      <div key={meal.id} className="py-3 flex items-center justify-between gap-4 group">
                        <div className="flex items-start gap-3">
                          <div className={`p-1.5 rounded-lg text-xs font-bold font-mono tracking-wider uppercase shrink-0 mt-0.5 ${
                            meal.category === 'breakfast' ? 'bg-blue-950/40 text-blue-400 border border-blue-900/30' :
                            meal.category === 'lunch' ? 'bg-amber-950/40 text-amber-400 border border-amber-900/30' :
                            meal.category === 'dinner' ? 'bg-purple-950/40 text-purple-400 border border-purple-900/30' :
                            'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30'
                          }`}>
                            {meal.category[0]}
                          </div>
                          <div>
                            <h6 className="font-semibold text-zinc-200 text-sm leading-tight">{meal.name}</h6>
                            <span className="text-[10px] text-zinc-500 font-mono">{meal.timestamp}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-sm font-bold text-zinc-150 font-mono">+{meal.calories} <span className="text-[10px] text-zinc-500 font-normal">kcal</span></span>
                            <div className="text-[10px] text-zinc-500 font-mono">P:{meal.protein}g | C:{meal.carbs}g | F:{meal.fat}g</div>
                          </div>

                          <button
                            onClick={() => onRemoveLoggedMeal(meal.id)}
                            className="text-xs text-zinc-500 hover:text-rose-400 p-1 rounded-md transition font-mono cursor-pointer"
                            title="Remove meal entry"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
