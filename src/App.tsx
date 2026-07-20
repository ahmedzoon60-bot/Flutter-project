import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, RefreshCw, Star, ArrowLeft, ClipboardList, 
  User, Check, AlertCircle, Sparkle, Menu, X, MessageSquare, 
  CheckCircle, ChevronRight, BarChart, Phone, Mail, Lock
} from 'lucide-react';

// Program interface matching our Flutter model
interface Program {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export default function App() {
  // Screen Router state: 'splash' | 'list' | 'details' | 'register' | 'feedback'
  const [screen, setScreen] = useState<'splash' | 'list' | 'details' | 'register' | 'feedback'>('splash');
  
  // App states
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  
  // Cache state (Last Visited)
  const [lastVisited, setLastVisited] = useState<{ id: number; title: string } | null>(null);
  
  // Refresh state
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  // Menu dropdown for mobile/web appbar
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // Success Snackbars
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  
  // Custom dialog state for feedback submission summary
  const [feedbackSummary, setFeedbackSummary] = useState<{
    name: string;
    email: string;
    rating: number;
    category: string;
    message: string;
  } | null>(null);

  // Splash Screen timer (2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('list');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fetch programs from API
  const fetchProgramsList = async (showRefreshState = false) => {
    if (showRefreshState) setIsRefreshing(true);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Ensure we convert dynamic response strictly to our Program schema
      const mapped: Program[] = data.map((item: any) => ({
        id: Number(item.id),
        userId: Number(item.userId),
        title: String(item.title),
        body: String(item.body),
      }));
      setPrograms(mapped);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch nutritional programs.');
    } finally {
      setLoading(false);
      if (showRefreshState) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProgramsList();
    // Load last visited program from localStorage
    const savedId = localStorage.getItem('last_visited_program_id');
    const savedTitle = localStorage.getItem('last_visited_program_title');
    if (savedId && savedTitle) {
      setLastVisited({ id: Number(savedId), title: savedTitle });
    }
  }, []);

  // Navigation handlers
  const navigateToDetails = (program: Program) => {
    setSelectedProgram(program);
    setLastVisited({ id: program.id, title: program.title });
    localStorage.setItem('last_visited_program_id', String(program.id));
    localStorage.setItem('last_visited_program_title', program.title);
    setScreen('details');
  };

  const handleBackToList = () => {
    setScreen('list');
  };

  // Helper to show custom snackbar
  const triggerSnackbar = (msg: string) => {
    setSnackbarMessage(msg);
    setTimeout(() => {
      setSnackbarMessage(null);
    }, 4000);
  };

  // Form states and validators
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLevel, setRegLevel] = useState('Beginner');
  const [regTerms, setRegTerms] = useState(false);
  const [regErrors, setRegErrors] = useState<Record<string, string>>({});

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    // Name check (required, min 3 chars)
    if (!regName.trim()) {
      errors.name = 'Full name is required';
    } else if (regName.trim().length < 3) {
      errors.name = 'Full name must be at least 3 characters';
    }

    // Email check (required, @ and correct pattern)
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regEmail.trim()) {
      errors.email = 'Email address is required';
    } else if (!regEmail.includes('@') || !emailRegex.test(regEmail.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    // Password check (required, min 8, letters + numbers)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regPassword) {
      errors.password = 'Password is required';
    } else if (regPassword.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!passwordRegex.test(regPassword)) {
      errors.password = 'Password must contain at least one letter and one number';
    }

    // Confirm password check
    if (!regConfirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (regConfirmPassword !== regPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Phone check (required, digits only, min 10)
    const phoneRegex = /^\d{10,}$/;
    if (!regPhone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(regPhone.trim())) {
      errors.phone = 'Phone number must be digits only and at least 10 digits';
    }

    // Terms check
    if (!regTerms) {
      errors.terms = 'You must agree to the Terms & Conditions';
    }

    setRegErrors(errors);

    if (Object.keys(errors).length === 0) {
      triggerSnackbar(`Registration Successful! Welcome ${regName}`);
      
      // Clear forms
      setRegName('');
      setRegEmail('');
      setRegPassword('');
      setRegConfirmPassword('');
      setRegPhone('');
      setRegLevel('Beginner');
      setRegTerms(false);
      setRegErrors({});

      // Back to details
      setTimeout(() => {
        setScreen('details');
      }, 1500);
    }
  };

  // Feedback form states and validation
  const [feedName, setFeedName] = useState('');
  const [feedEmail, setFeedEmail] = useState('');
  const [feedRating, setFeedRating] = useState(4);
  const [feedMessage, setFeedMessage] = useState('');
  const [feedCategory, setFeedCategory] = useState('General');
  const [feedErrors, setFeedErrors] = useState<Record<string, string>>({});

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!feedName.trim()) {
      errors.name = 'Name is required';
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!feedEmail.trim()) {
      errors.email = 'Email address is required';
    } else if (!feedEmail.includes('@') || !emailRegex.test(feedEmail.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!feedMessage.trim()) {
      errors.message = 'Feedback message is required';
    } else if (feedMessage.trim().length < 20) {
      errors.message = 'Feedback details must be at least 20 characters';
    }

    setFeedErrors(errors);

    if (Object.keys(errors).length === 0) {
      const summary = {
        name: feedName,
        email: feedEmail,
        rating: feedRating,
        category: feedCategory,
        message: feedMessage
      };

      // Simulating API POST and printing to Console log
      console.log('=============================');
      console.log('FEEDBACK POST SUCCESS (201)');
      console.log('Payload Summary:', summary);
      console.log('=============================');

      // Trigger summary AlertDialog
      setFeedbackSummary(summary);
    }
  };

  const closeFeedbackSummaryAndReset = () => {
    setFeedbackSummary(null);
    setFeedName('');
    setFeedEmail('');
    setFeedRating(4);
    setFeedMessage('');
    setFeedCategory('General');
    setFeedErrors({});
    setScreen('list');
  };

  // Filter programs based on Search query
  const filteredPrograms = programs.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans flex flex-col relative selection:bg-emerald-500 selection:text-black">
      
      {/* 1. Splash Screen Overlay */}
      <AnimatePresence>
        {screen === 'splash' && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#064E3B] flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="p-5 bg-white/10 rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center mb-6"
            >
              <Sparkle className="text-white w-16 h-16 animate-pulse" strokeWidth={1.5} />
            </motion.div>
            <h1 className="text-4xl font-serif tracking-wider text-white font-bold">Vitality App</h1>
            <p className="text-[10px] font-mono tracking-widest text-emerald-200 mt-2 font-bold uppercase">
              Nutritional Frameworks Protocol
            </p>
            <div className="mt-12 w-32 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="relative h-full bg-white w-1/2 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Global AppBar Header */}
      {screen !== 'splash' && (
        <header className="sticky top-0 z-40 bg-[#121214]/95 backdrop-blur-md border-b border-zinc-800/80 px-4 py-3 flex items-center justify-between shadow-md">
          <div 
            onClick={() => setScreen('list')}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 active:scale-95 transition"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-800/70 flex items-center justify-center text-emerald-400">
              <Sparkle size={16} className="stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg font-serif italic text-emerald-500 tracking-wide font-bold">Vitality</span>
              <span className="hidden sm:inline-block text-[9px] text-zinc-500 font-mono uppercase tracking-widest ml-2 border-l border-zinc-800 pl-2">
                Nutrition Architect
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { setScreen('feedback'); setMenuOpen(false); }}
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-semibold tracking-tight transition cursor-pointer ${screen === 'feedback' ? 'bg-emerald-600 text-white' : 'text-zinc-300'}`}
            >
              <MessageSquare size={13} />
              Feedback Form
            </button>

            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-300 transition cursor-pointer"
              >
                {menuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-[#121214] border border-zinc-800 rounded-2xl shadow-2xl p-2 text-xs flex flex-col gap-1 z-50"
                  >
                    <div className="px-3 py-2 border-b border-zinc-850/50 text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold">
                      Navigate Options
                    </div>
                    <button
                      onClick={() => { setScreen('list'); setMenuOpen(false); }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-zinc-850 text-zinc-300 font-medium transition cursor-pointer"
                    >
                      Nutritional Program List
                    </button>
                    {selectedProgram && (
                      <button
                        onClick={() => { setScreen('details'); setMenuOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-zinc-850 text-zinc-300 font-medium transition cursor-pointer"
                      >
                        Active Details Specifications
                      </button>
                    )}
                    <button
                      onClick={() => { setScreen('feedback'); setMenuOpen(false); }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-zinc-850 text-zinc-300 font-medium transition cursor-pointer flex items-center justify-between"
                    >
                      <span>Share App Feedback</span>
                      <MessageSquare size={12} className="text-emerald-400" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>
      )}

      {/* 3. Success Notification Toast (SnackBar) */}
      <AnimatePresence>
        {snackbarMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white font-semibold px-5 py-4 rounded-2xl border border-emerald-500/30 shadow-2xl flex items-center gap-3"
          >
            <CheckCircle size={18} className="text-emerald-100" />
            <span className="text-xs">{snackbarMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Core Body Page Layout */}
      {screen !== 'splash' && (
        <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8">
          
          {/* ================== A. PROGRAM LIST SCREEN ================== */}
          {screen === 'list' && (
            <div className="space-y-6">
              
              {/* Screen title & subtitle */}
              <div className="space-y-1.5">
                <h2 className="text-3xl font-serif text-zinc-100 tracking-wide font-normal">
                  Curated Nutritional Architectures
                </h2>
                <p className="text-zinc-500 text-xs font-light">
                  Select an expert-vetted dietary framework configured with precise targets. Uses live feeds from mock JSONPlaceholder.
                </p>
              </div>

              {/* Cache banner (Last Visited Program) */}
              {lastVisited && (
                <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-4 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-950 border border-emerald-800/50 rounded-xl text-emerald-400">
                      <Star size={14} className="fill-current" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase tracking-widest">
                        Last Visited Plan
                      </span>
                      <span 
                        onClick={() => {
                          const matched = programs.find(p => p.id === lastVisited.id);
                          if (matched) {
                            navigateToDetails(matched);
                          } else {
                            // Fetch again or mock detail
                            navigateToDetails({ id: lastVisited.id, userId: 1, title: lastVisited.title, body: "Detailed parameters are fetched on click..." });
                          }
                        }}
                        className="text-xs font-semibold text-zinc-200 hover:text-emerald-400 hover:underline transition cursor-pointer"
                      >
                        {lastVisited.title} (ID: {lastVisited.id})
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('last_visited_program_id');
                      localStorage.removeItem('last_visited_program_title');
                      setLastVisited(null);
                    }}
                    className="p-1 text-zinc-500 hover:text-zinc-200 transition cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {/* Toolbar: Search input & Pull to Refresh */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-[#121214]/60 border border-zinc-800/60 p-3 rounded-2xl">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3.5 top-2.5 text-zinc-500" size={15} />
                  <input
                    type="text"
                    value={searchQuery}
                    placeholder="Search frameworks by title..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-xs font-sans placeholder:text-zinc-600"
                  />
                </div>

                <button
                  onClick={() => fetchProgramsList(true)}
                  disabled={loading}
                  className="w-full sm:w-auto px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-emerald-400' : ''} />
                  <span>Pull to Refresh</span>
                </button>
              </div>

              {/* List body */}
              {loading && programs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest animate-pulse">
                    Fetching API Programs...
                  </span>
                </div>
              ) : error ? (
                <div className="p-6 bg-rose-950/15 border border-rose-900/30 rounded-3xl text-center space-y-3">
                  <AlertCircle size={28} className="text-rose-400 mx-auto" />
                  <p className="text-zinc-300 text-sm font-medium">{error}</p>
                  <button 
                    onClick={() => fetchProgramsList()}
                    className="px-4 py-2 bg-rose-900/45 hover:bg-rose-900/75 border border-rose-800/50 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Retry Connection
                  </button>
                </div>
              ) : filteredPrograms.length === 0 ? (
                <div className="text-center py-16 bg-[#121214] border border-zinc-800/80 rounded-3xl space-y-3">
                  <p className="text-zinc-400 text-sm font-light">No dietary frameworks match your criteria.</p>
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="text-xs text-emerald-400 underline font-semibold cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredPrograms.map((prog) => (
                    <motion.div
                      key={prog.id}
                      whileHover={{ y: -2 }}
                      onClick={() => navigateToDetails(prog)}
                      className="bg-[#121214] border border-zinc-800/80 hover:border-emerald-800/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between cursor-pointer transition-all duration-200 group relative overflow-hidden"
                    >
                      {/* Hover subtle accent glow */}
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-600 scale-y-0 group-hover:scale-y-100 transition-all duration-200" />
                      
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-base font-semibold text-white tracking-wide group-hover:text-emerald-400 transition line-clamp-2 leading-snug">
                            {prog.title}
                          </h3>
                          <span className="shrink-0 text-[10px] font-mono font-bold bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-md text-zinc-400 uppercase">
                            ID: {prog.id}
                          </span>
                        </div>
                        <p className="text-zinc-400 text-xs font-light leading-relaxed line-clamp-3">
                          {prog.body.substring(0, 80)}...
                        </p>
                      </div>

                      <div className="pt-4 mt-2 border-t border-zinc-850/50 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-zinc-600 font-bold uppercase tracking-wider">
                          Author: User {prog.userId}
                        </span>
                        <span className="text-emerald-400 flex items-center gap-0.5 group-hover:translate-x-1 transition duration-200 font-sans font-bold">
                          Review details <ChevronRight size={13} />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ================== B. PROGRAM DETAILS SCREEN ================== */}
          {screen === 'details' && selectedProgram && (
            <div className="space-y-6">
              
              {/* Back navigation button */}
              <button
                onClick={handleBackToList}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-emerald-500 transition cursor-pointer font-semibold font-mono tracking-tight"
              >
                <ArrowLeft size={16} />
                Back to Nutritional Programs
              </button>

              {/* Program Details Hero */}
              <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#064E3B] to-[#121214] border border-zinc-800/80 relative overflow-hidden shadow-xl">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950 px-2.5 py-1 border border-emerald-800/50 rounded-md">
                      Protocol ID: {selectedProgram.id}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 bg-zinc-900 px-2.5 py-1 border border-zinc-800 rounded-md">
                      Author/User ID: {selectedProgram.userId}
                    </span>
                  </div>

                  <h2 className="text-3xl font-serif text-white tracking-wide leading-tight">
                    {selectedProgram.title}
                  </h2>
                </div>
              </div>

              {/* Strategy Card */}
              <div className="bg-[#121214] border border-zinc-800 p-6 rounded-3xl space-y-4 shadow-lg">
                <div className="flex items-center gap-2 border-b border-zinc-800/50 pb-3">
                  <ClipboardList className="text-emerald-500" size={18} />
                  <h4 className="font-serif text-lg tracking-wide text-zinc-200">Architectural Specifications</h4>
                </div>
                <p className="text-zinc-300 text-xs leading-relaxed font-light whitespace-pre-wrap">
                  {selectedProgram.body}
                </p>
              </div>

              {/* Bottom Nav Action Bar */}
              <div className="pt-4">
                <button
                  onClick={() => setScreen('register')}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-2xl shadow-xl shadow-emerald-950/40 transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Check size={18} />
                  <span>Register Now for this Program</span>
                </button>
              </div>
            </div>
          )}

          {/* ================== C. REGISTRATION FORM SCREEN ================== */}
          {screen === 'register' && selectedProgram && (
            <div className="space-y-6">
              
              {/* Back navigation button */}
              <button
                onClick={() => setScreen('details')}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-emerald-500 transition cursor-pointer font-semibold font-mono tracking-tight"
              >
                <ArrowLeft size={16} />
                Back to Specifications
              </button>

              {/* Title Section */}
              <div className="space-y-1.5">
                <h2 className="text-3xl font-serif text-zinc-100 tracking-wide font-normal">
                  Program Registration
                </h2>
                <p className="text-zinc-500 text-xs font-light">
                  Complete the protocol authorization registration below.
                </p>
              </div>

              {/* Form card */}
              <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl">
                
                {/* Chosen program specification */}
                <div className="bg-[#09090b] border border-zinc-800 p-4 rounded-2xl mb-6">
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider mb-1">
                    TARGET ARCHITECTURE:
                  </span>
                  <span className="text-xs font-semibold text-zinc-200">
                    {selectedProgram.title} (ID: {selectedProgram.id})
                  </span>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 text-zinc-600" size={15} />
                      <input
                        type="text"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-xs"
                      />
                    </div>
                    {regErrors.name && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 font-mono">
                        <AlertCircle size={10} /> {regErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 text-zinc-600" size={15} />
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-xs"
                      />
                    </div>
                    {regErrors.email && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 font-mono">
                        <AlertCircle size={10} /> {regErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 text-zinc-600" size={15} />
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-xs"
                      />
                    </div>
                    {regErrors.password && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 font-mono">
                        <AlertCircle size={10} /> {regErrors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 text-zinc-600" size={15} />
                      <input
                        type="password"
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-xs"
                      />
                    </div>
                    {regErrors.confirmPassword && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 font-mono">
                        <AlertCircle size={10} /> {regErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 text-zinc-600" size={15} />
                      <input
                        type="text"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="1234567890"
                        className="w-full pl-10 pr-4 py-3 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-xs font-mono"
                      />
                    </div>
                    {regErrors.phone && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 font-mono">
                        <AlertCircle size={10} /> {regErrors.phone}
                      </p>
                    )}
                  </div>

                  {/* Program Level Select */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      Select Program Level
                    </label>
                    <div className="relative">
                      <BarChart className="absolute left-3.5 top-3.5 text-zinc-600" size={15} />
                      <select
                        value={regLevel}
                        onChange={(e) => setRegLevel(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-xs cursor-pointer appearance-none"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div className="space-y-1.5 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        checked={regTerms}
                        onChange={(e) => setRegTerms(e.target.checked)}
                        className="mt-0.5 accent-emerald-500 cursor-pointer h-4 w-4 rounded"
                      />
                      <span className="text-zinc-400 font-light leading-relaxed select-none">
                        I agree to all Terms and Conditions of the selected Nutritional Framework protocol.
                      </span>
                    </label>
                    {regErrors.terms && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 font-mono">
                        <AlertCircle size={10} /> {regErrors.terms}
                      </p>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                  >
                    <span>Submit Authorization</span>
                    <ChevronRight size={15} />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ================== D. FEEDBACK FORM SCREEN ================== */}
          {screen === 'feedback' && (
            <div className="space-y-6">
              
              {/* Back navigation button */}
              <button
                onClick={handleBackToList}
                className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-emerald-500 transition cursor-pointer font-semibold font-mono tracking-tight"
              >
                <ArrowLeft size={16} />
                Back to Program List
              </button>

              {/* Header Title */}
              <div className="space-y-1.5">
                <h2 className="text-3xl font-serif text-zinc-100 tracking-wide font-normal">
                  Feedback & Bug Reports
                </h2>
                <p className="text-zinc-500 text-xs font-light">
                  Your feedback helps maintain scientific precision. All submissions log to developer console.
                </p>
              </div>

              {/* Form Card */}
              <div className="bg-[#121214] border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl">
                <form onSubmit={handleFeedbackSubmit} className="space-y-5">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={feedName}
                      onChange={(e) => setFeedName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-xs"
                    />
                    {feedErrors.name && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 font-mono">
                        <AlertCircle size={10} /> {feedErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={feedEmail}
                      onChange={(e) => setFeedEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-xs"
                    />
                    {feedErrors.email && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 font-mono">
                        <AlertCircle size={10} /> {feedErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Category select */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      Feedback Category
                    </label>
                    <select
                      value={feedCategory}
                      onChange={(e) => setFeedCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-xs cursor-pointer"
                    >
                      <option value="General">General</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Suggestion">Suggestion</option>
                    </select>
                  </div>

                  {/* Rating Selector Slider */}
                  <div className="space-y-2 bg-[#09090b] border border-zinc-800 p-4 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                        Experience Rating
                      </label>
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        {feedRating} / 5 Stars
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-zinc-600">1</span>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={feedRating}
                        onChange={(e) => setFeedRating(Number(e.target.value))}
                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                      <span className="text-xs font-mono text-zinc-600">5</span>
                    </div>

                    {/* RadioListTile Equivalent representation visually */}
                    <div className="grid grid-cols-5 gap-1.5 pt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedRating(star)}
                          className={`py-1.5 rounded-lg border text-center font-mono text-xs font-semibold transition cursor-pointer ${feedRating === star ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400' : 'bg-zinc-900/55 border-zinc-850 text-zinc-500 hover:text-zinc-300'}`}
                        >
                          {star}★
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                      Feedback Message
                    </label>
                    <textarea
                      value={feedMessage}
                      onChange={(e) => setFeedMessage(e.target.value)}
                      placeholder="Please enter your detailed observations here (minimum 20 characters)..."
                      rows={4}
                      className="w-full px-4 py-3 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-xs resize-none"
                    />
                    <div className="flex items-center justify-between text-[10px] text-zinc-600 font-mono">
                      <span>Requirement: &gt;= 20 characters</span>
                      <span>Length: {feedMessage.length} characters</span>
                    </div>
                    {feedErrors.message && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 font-mono">
                        <AlertCircle size={10} /> {feedErrors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Action */}
                  <button
                    type="submit"
                    className="w-full py-3.5 mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                  >
                    <MessageSquare size={14} />
                    <span>Send Feedback Summary</span>
                  </button>
                </form>
              </div>
            </div>
          )}

        </main>
      )}

      {/* 5. Feedback Success AlertDialog Modal */}
      <AnimatePresence>
        {feedbackSummary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#121214] border border-zinc-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl p-6 space-y-4"
            >
              <div className="flex items-center gap-2.5 text-emerald-400 border-b border-zinc-800 pb-3">
                <CheckCircle size={24} />
                <h3 className="text-lg font-serif tracking-wide text-zinc-100 font-normal">Feedback Submitted</h3>
              </div>

              <div className="space-y-3.5 py-1 text-xs">
                <p className="text-zinc-400 leading-relaxed font-light">
                  Thank you for your valuable feedback! Here is a summary of the simulated API POST payload:
                </p>

                <div className="space-y-2 font-mono bg-[#09090b] border border-zinc-850 p-4 rounded-xl text-[11px]">
                  <div>
                    <span className="text-zinc-600 font-bold">NAME:</span>{' '}
                    <span className="text-zinc-300">{feedbackSummary.name}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 font-bold">EMAIL:</span>{' '}
                    <span className="text-zinc-300">{feedbackSummary.email}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 font-bold">CATEGORY:</span>{' '}
                    <span className="text-zinc-300">{feedbackSummary.category}</span>
                  </div>
                  <div>
                    <span className="text-zinc-600 font-bold">RATING:</span>{' '}
                    <span className="text-emerald-450 font-bold">{feedbackSummary.rating} / 5 Stars</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-850/60 mt-1">
                    <span className="text-zinc-600 font-bold block mb-1">MESSAGE:</span>
                    <span className="text-zinc-400 font-sans font-light leading-relaxed whitespace-pre-wrap">
                      {feedbackSummary.message}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={closeFeedbackSummaryAndReset}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  Great, Thanks!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
