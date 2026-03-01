"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('demo@gridguard.in');
  const [password, setPassword] = useState('GridGuard2030');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
      
      {/* Left Panel: Visuals */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
           {/* Animated Grid Background */}
           <div className="w-full h-full" style={{ 
             backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 212, 255, 0.15) 1px, transparent 0)',
             backgroundSize: '40px 40px'
           }} />
        </div>
        
        <motion.div 
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="z-10 relative"
        >
          <Zap className="text-primary w-40 h-40 drop-shadow-[0_0_50px_rgba(0,212,255,0.4)]" />
        </motion.div>
        
        <div className="mt-12 text-center z-10 px-12">
          <h1 className="text-5xl font-headline font-black text-white tracking-tighter mb-4">GRIDGUARD 2030</h1>
          <p className="text-muted-foreground text-lg font-light tracking-wide max-w-md mx-auto">
            "Energy sovereignty is the foundation of a developed nation. We protect every unit, every rupee, every asset."
          </p>
          <div className="mt-12 flex items-center justify-center gap-6 opacity-40">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Built for India</span>
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Powered by AI</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex flex-col items-center justify-center p-8 bg-background relative">
        <div className="scan-line" />
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 lg:hidden flex justify-center">
             <Zap className="text-primary w-12 h-12" />
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-headline font-bold text-white mb-2">CONTROL ROOM ACCESS</h2>
            <p className="text-muted-foreground text-sm">Welcome back, officer. Please verify your credentials.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Employee Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all font-body"
                  placeholder="name@discom.in"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Secure Passkey</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-12 text-white focus:outline-none focus:border-primary transition-all font-body"
                  placeholder="••••••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
               <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="hidden" />
                  <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-primary transition-all">
                    <div className="w-2.5 h-2.5 bg-primary rounded-sm opacity-0 group-hover:opacity-50" />
                  </div>
                  <span className="text-xs text-muted-foreground">Remember this station</span>
               </label>
               <button type="button" className="text-xs text-primary font-bold hover:underline">Forgot Password?</button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary text-background font-black text-lg py-4 rounded-lg hover:bg-primary/90 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-background border-t-transparent rounded-full animate-spin" />
              ) : (
                <>ACCESS MISSION CONTROL <ShieldCheck size={20} /></>
              )}
            </button>
          </form>

          <div className="mt-12 p-4 rounded-xl border border-primary/20 bg-primary/5">
             <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">DEMO_MODE_ACTIVE</div>
             <p className="text-[11px] text-text-secondary">Using demo credentials: <strong>demo@gridguard.in</strong> / <strong>GridGuard2030</strong></p>
          </div>

          <div className="mt-12 text-center">
             <p className="text-xs text-muted-foreground">Authorized personnel only. All access is logged via Blockchain Audit Ledger.</p>
             <div className="mt-6 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">All Systems Operational</span>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
