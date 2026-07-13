import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, Dumbbell, ClipboardList, LogOut, Sparkles, 
  Calendar, ShieldCheck, Heart, User, Sparkle, Menu, X 
} from 'lucide-react';
import { UserProfile, Meal, CuratedProgram, LoggedMeal } from './types';
import { CURATED_PROGRAMS } from './data/programs';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import ProgramListingScreen from './components/ProgramListingScreen';
import ProgramDetailsScreen from './components/ProgramDetailsScreen';
import MacroCalculatorModal from './components/MacroCalculatorModal';

// Pre-fill some starting weight records
const INITIAL_WEIGHT_HISTORY = [
  { date: '2026-07-07', weight: 77.0 },
  { date: '2026-07-09', weight: 76.5 },
  { date: '2026-07-11', weight: 75.8 },
  { date: '2026-07-13', weight: 75.2 },
];

export default function App() {
  // Global User State
  const [user, setUser] = useState<UserProfile>({
    name: '',
    email: '',
    targetCalories: 2000,
    targetProtein: 150, // grams
    targetCarbs: 200,   // grams
    targetFat: 66,      // grams
    activeProgramId: null,
    activeProgramDay: 1,
    waterIntake: 750,  // ml
    waterGoal: 2500,   // ml
    weightHistory: INITIAL_WEIGHT_HISTORY,
    loggedMeals: [],
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'programs' | 'details'>('dashboard');
  const [selectedProgramId, setSelectedProgramId] = useState<string>('keto-kickstart');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load user from localStorage on mount if desired
  useEffect(() => {
    const savedUser = localStorage.getItem('vitality_user_profile');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Failed to parse saved user state', e);
      }
    }
  }, []);

  // Save user profile state changes
  const saveState = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
    localStorage.setItem('vitality_user_profile', JSON.stringify(updatedProfile));
  };

  const handleLoginSuccess = (name: string, email: string) => {
    const updated = {
      ...user,
      name,
      email,
    };
    saveState(updated);
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('vitality_user_profile');
    setIsLoggedIn(false);
    setUser({
      name: '',
      email: '',
      targetCalories: 2000,
      targetProtein: 150,
      targetCarbs: 200,
      targetFat: 66,
      activeProgramId: null,
      activeProgramDay: 1,
      waterIntake: 750,
      waterGoal: 2500,
      weightHistory: INITIAL_WEIGHT_HISTORY,
      loggedMeals: [],
    });
    setCurrentScreen('dashboard');
  };

  const handleUpdateWater = (amount: number) => {
    const updated = {
      ...user,
      waterIntake: Math.max(0, user.waterIntake + amount),
    };
    saveState(updated);
  };

  const handleLogMeal = (meal: Meal, category: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    const newLoggedMeal: LoggedMeal = {
      id: `${meal.id}-${Date.now()}`,
      name: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
      category,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = {
      ...user,
      loggedMeals: [newLoggedMeal, ...user.loggedMeals],
    };
    saveState(updated);
  };

  const handleRemoveLoggedMeal = (id: string) => {
    const updated = {
      ...user,
      loggedMeals: user.loggedMeals.filter((m) => m.id !== id),
    };
    saveState(updated);
  };

  const handleAddWeight = (weight: number) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newHistory = [...user.weightHistory];
    const existingIndex = newHistory.findIndex((item) => item.date === todayStr);

    if (existingIndex > -1) {
      newHistory[existingIndex].weight = weight;
    } else {
      newHistory.push({ date: todayStr, weight });
    }

    const updated = {
      ...user,
      weightHistory: newHistory,
    };
    saveState(updated);
  };

  // Adjust baseline metrics calculated from modal
  const handleApplyCalculatorTargets = (
    calories: number,
    protein: number,
    carbs: number,
    fat: number
  ) => {
    const updated = {
      ...user,
      targetCalories: calories,
      targetProtein: protein,
      targetCarbs: carbs,
      targetFat: fat,
    };
    saveState(updated);
  };

  // Activate program logic: Sync targets based on macros percentage!
  const handleActivateProgram = (programId: string) => {
    const program = CURATED_PROGRAMS.find((p) => p.id === programId);
    if (!program) return;

    // Calculate gram splits based on program calorie allocation and percentages
    // 1g Protein = 4 kcal, 1g Carb = 4 kcal, 1g Fat = 9 kcal
    const calories = program.dailyCalories;
    const proteinGrams = Math.round((calories * (program.macros.protein / 100)) / 4);
    const carbGrams = Math.round((calories * (program.macros.carbs / 100)) / 4);
    const fatGrams = Math.round((calories * (program.macros.fat / 100)) / 9);

    const updated = {
      ...user,
      activeProgramId: programId,
      activeProgramDay: 1, // Start on day 1
      targetCalories: calories,
      targetProtein: proteinGrams,
      targetCarbs: carbGrams,
      targetFat: fatGrams,
      loggedMeals: [], // Flush history for fresh program day track if desired (or keep)
    };

    saveState(updated);
    setCurrentScreen('dashboard');
  };

  // Find active program
  const activeProgram = CURATED_PROGRAMS.find((p) => p.id === user.activeProgramId) || null;
  // Selected program details screen target
  const selectedProgram = CURATED_PROGRAMS.find((p) => p.id === selectedProgramId) || CURATED_PROGRAMS[0];

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar Navigation (Large Screens) */}
      <aside className="hidden md:flex flex-col justify-between w-64 bg-[#121214] border-r border-zinc-800 p-6 shrink-0 relative overflow-hidden">
        <div className="space-y-8 z-10">
          {/* Brand header */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400 shadow-md">
              <Sparkle size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-xl font-serif italic text-emerald-500 tracking-wide leading-none">Vitality</h1>
              <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest leading-none mt-1">Nutrition Architect</p>
            </div>
          </div>

          {/* Nav menu links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                currentScreen === 'dashboard'
                  ? 'bg-emerald-600 text-white border-emerald-500/30 shadow-lg shadow-emerald-950/20'
                  : 'text-zinc-400 bg-transparent border-transparent hover:bg-zinc-900 hover:text-zinc-200 hover:border-zinc-850'
              }`}
            >
              <Home size={16} />
              <span>Dashboard Core</span>
            </button>

            <button
              onClick={() => setCurrentScreen('programs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                currentScreen === 'programs'
                  ? 'bg-emerald-600 text-white border-emerald-500/30 shadow-lg shadow-emerald-950/20'
                  : 'text-zinc-400 bg-transparent border-transparent hover:bg-zinc-900 hover:text-zinc-200 hover:border-zinc-850'
              }`}
            >
              <Dumbbell size={16} />
              <span>Curated Plans</span>
            </button>

            <button
              onClick={() => {
                setSelectedProgramId(user.activeProgramId || 'keto-kickstart');
                setCurrentScreen('details');
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition cursor-pointer border ${
                currentScreen === 'details'
                  ? 'bg-emerald-600 text-white border-emerald-500/30 shadow-lg shadow-emerald-950/20'
                  : 'text-zinc-400 bg-transparent border-transparent hover:bg-zinc-900 hover:text-zinc-200 hover:border-zinc-850'
              }`}
            >
              <ClipboardList size={16} />
              <span>Plan Specifications</span>
            </button>
          </nav>
        </div>

        {/* User Account / Footer info */}
        <div className="space-y-4 z-10 pt-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500 text-xs font-bold uppercase">
              {user.name.substring(0, 2)}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-zinc-200 block truncate">{user.name}</span>
              <span className="text-[10px] text-zinc-500 block truncate font-mono">{user.email}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2 bg-zinc-900 hover:bg-rose-950/25 hover:text-rose-400 hover:border-rose-900/30 border border-zinc-800 text-zinc-400 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut size={14} />
            Logout Account
          </button>
        </div>

        {/* Decorative backdrop glow */}
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/3 rounded-full blur-3xl pointer-events-none" />
      </aside>

      {/* Mobile Header and Bar */}
      <header className="md:hidden bg-[#121214] border-b border-zinc-800 px-4 py-3 flex items-center justify-between z-40 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 shadow-md">
            <Sparkle size={16} className="stroke-[2.5]" />
          </div>
          <span className="text-lg font-serif italic text-emerald-500 tracking-wide">Vitality</span>
        </div>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 hover:bg-zinc-800"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Mobile Drawer menu list */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#121214] border-b border-zinc-800 z-35 overflow-hidden sticky top-[53px]"
          >
            <div className="p-4 space-y-3.5">
              <nav className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => { setCurrentScreen('dashboard'); setMobileMenuOpen(false); }}
                  className={`p-2.5 rounded-xl text-[11px] font-bold text-center flex flex-col items-center gap-1 cursor-pointer border ${
                    currentScreen === 'dashboard' 
                      ? 'bg-emerald-600 text-white border-emerald-500/20' 
                      : 'text-zinc-400 bg-zinc-900/50 border-zinc-800/40'
                  }`}
                >
                  <Home size={14} />
                  Dashboard
                </button>
                <button
                  onClick={() => { setCurrentScreen('programs'); setMobileMenuOpen(false); }}
                  className={`p-2.5 rounded-xl text-[11px] font-bold text-center flex flex-col items-center gap-1 cursor-pointer border ${
                    currentScreen === 'programs' 
                      ? 'bg-emerald-600 text-white border-emerald-500/20' 
                      : 'text-zinc-400 bg-zinc-900/50 border-zinc-800/40'
                  }`}
                >
                  <Dumbbell size={14} />
                  Programs
                </button>
                <button
                  onClick={() => { 
                    setSelectedProgramId(user.activeProgramId || 'keto-kickstart'); 
                    setCurrentScreen('details'); 
                    setMobileMenuOpen(false); 
                  }}
                  className={`p-2.5 rounded-xl text-[11px] font-bold text-center flex flex-col items-center gap-1 cursor-pointer border ${
                    currentScreen === 'details' 
                      ? 'bg-emerald-600 text-white border-emerald-500/20' 
                      : 'text-zinc-400 bg-zinc-900/50 border-zinc-800/40'
                  }`}
                >
                  <ClipboardList size={14} />
                  Recipes/Detail
                </button>
              </nav>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-500 text-[10px] font-bold">
                    {user.name.substring(0, 2)}
                  </div>
                  <span className="font-bold text-zinc-300">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-2.5 py-1 bg-zinc-900 border border-zinc-850 hover:bg-rose-950/20 hover:text-rose-400 rounded-lg text-[10px] font-bold transition flex items-center gap-1"
                >
                  <LogOut size={11} />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Screen Router Workspace */}
      <main className="flex-1 overflow-y-auto bg-[#09090b]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="p-4 md:p-8"
          >
            {currentScreen === 'dashboard' && (
              <HomeScreen
                user={user}
                activeProgram={activeProgram}
                onUpdateWater={handleUpdateWater}
                onLogMeal={handleLogMeal}
                onRemoveLoggedMeal={handleRemoveLoggedMeal}
                onAddWeight={handleAddWeight}
                onOpenCalculator={() => setIsCalculatorOpen(true)}
                onNavigateToPrograms={() => setCurrentScreen('programs')}
              />
            )}

            {currentScreen === 'programs' && (
              <ProgramListingScreen
                activeProgramId={user.activeProgramId}
                onSelectProgram={(id) => {
                  setSelectedProgramId(id);
                  setCurrentScreen('details');
                }}
              />
            )}

            {currentScreen === 'details' && (
              <ProgramDetailsScreen
                program={selectedProgram}
                isActive={user.activeProgramId === selectedProgram.id}
                onBack={() => setCurrentScreen('programs')}
                onActivate={handleActivateProgram}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Macro Calculator Dialog */}
      <MacroCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onApplyTargets={handleApplyCalculatorTargets}
        initialWeight={user.weightHistory.length > 0 ? user.weightHistory[user.weightHistory.length - 1].weight : 75}
      />

    </div>
  );
}
