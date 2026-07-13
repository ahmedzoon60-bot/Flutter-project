import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Sparkles, ChevronRight, Apple, Check, Heart, ShieldCheck, Dumbbell, Clock } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (name: string, email: string) => void;
  defaultEmail?: string;
}

const CAROUSEL_SLIDES = [
  {
    title: 'Precision Programs',
    desc: 'Expert-curated nutritional plans designed for Ketosis, Hypertrophy, Longevity, or Metabolic Reset.',
    icon: Dumbbell,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
  },
  {
    title: 'Interactive Daily Tracker',
    desc: 'Log meals with single-tap precision. Customize ingredients, log water, and trace your macro budgets.',
    icon: Apple,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
  },
  {
    title: 'Autophagy & Fasting Timers',
    desc: 'Support metabolic flexibility with automated feeding windows, trace minerals, and herbal recipes.',
    icon: Clock,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
  }
];

export default function LoginScreen({ onLoginSuccess, defaultEmail = 'ahmed15112001@gmail.com' }: LoginScreenProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Ahmed');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all credentials.');
      return;
    }
    setError('');
    setIsLoading(true);

    // Simulate quick loading and login
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(name || 'Ahmed', email);
    }, 800);
  };

  const handleGuestLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('Ahmed', 'ahmed15112001@gmail.com');
    }, 500);
  };

  const SlideIcon = CAROUSEL_SLIDES[activeSlide].icon;

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col lg:flex-row font-sans text-zinc-100">
      
      {/* Left Column: Premium Interactive Branding & Onboarding On Desktop */}
      <div className="lg:w-1/2 bg-[#121214] border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between p-8 lg:p-16 relative overflow-hidden">
        {/* Decorative ambient glowing backdrops */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-emerald-600/5 blur-[100px] pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-2.5 z-10">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-900/20">
            <Sparkles size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-serif italic text-emerald-500 tracking-wide flex items-center gap-2.5 leading-none">
              Vitality <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-850 uppercase font-mono not-italic font-medium">v1.2</span>
            </h1>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mt-1">Nutritional Architecture</p>
          </div>
        </div>

        {/* Onboarding Carousel */}
        <div className="my-12 lg:my-0 z-10 max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className={`inline-flex p-3 rounded-2xl border ${CAROUSEL_SLIDES[activeSlide].color}`}>
                <SlideIcon size={24} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-serif text-zinc-100 tracking-wide leading-tight">
                {CAROUSEL_SLIDES[activeSlide].title}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                {CAROUSEL_SLIDES[activeSlide].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex gap-2 mt-8">
            {CAROUSEL_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === idx ? 'w-6 bg-emerald-500' : 'w-2 bg-zinc-800 hover:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom stats/creeds */}
        <div className="z-10 pt-4 border-t border-zinc-800/80 hidden lg:flex items-center gap-6 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-1.5">
            <Heart size={14} className="text-rose-500/50" />
            <span>Cardio Protective</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-500/50" />
            <span>Science-Backed</span>
          </div>
        </div>
      </div>

      {/* Right Column: Clean Interactive Auth Form */}
      <div className="flex-1 bg-[#09090b] flex items-center justify-center p-6 lg:p-16 relative">
        <div className="absolute top-10 right-10 pointer-events-none hidden lg:block">
          <span className="text-[10px] text-zinc-650 font-mono tracking-widest uppercase">AUTHENTICATION MODULE // SECURE</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md bg-[#121214] border border-zinc-800 rounded-[2.5rem] p-8 shadow-xl"
        >
          <div className="mb-6">
            <h3 className="text-2xl font-serif text-zinc-100 tracking-wide mb-1">
              {isRegistering ? 'Create Master Account' : 'Welcome Back'}
            </h3>
            <p className="text-zinc-500 text-xs mt-1 leading-relaxed font-light">
              {isRegistering 
                ? 'Establish your custom metabolic constraints and start planning.'
                : 'Sign in to review today’s macro budgets and complete meal preps.'
              }
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 font-mono">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-sm font-sans"
                  placeholder="Ahmed"
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 font-mono">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-zinc-500" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-sm font-sans"
                  placeholder="ahmed15112001@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1.5 font-mono">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-zinc-500" size={16} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#09090b] border border-zinc-800 rounded-xl focus:border-emerald-500 focus:outline-none text-zinc-100 text-sm font-sans"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-400 font-medium bg-rose-950/20 border border-rose-900/30 p-2.5 rounded-xl">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-emerald-900/20 text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isRegistering ? 'Sign Up & Get Started' : 'Sign In'}</span>
                  <ChevronRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Guest/Demo Shortcut */}
          <div className="relative my-6 text-center">
            <hr className="border-zinc-800/80" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#121214] px-3 text-[10px] text-zinc-600 font-mono tracking-wider">OR DEMO ACCESS</span>
          </div>

          <button
            onClick={handleGuestLogin}
            disabled={isLoading}
            className="w-full py-2.5 bg-[#09090b] hover:bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-xl font-medium transition text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Bypass with Guest Credentials</span>
          </button>

          {/* Toggle Register / Login */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-xs text-zinc-500 hover:text-emerald-500 transition font-mono tracking-tight"
            >
              {isRegistering 
                ? 'Already have an account? Sign In' 
                : "Don't have an account? Create Master Account"
              }
            </button>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
