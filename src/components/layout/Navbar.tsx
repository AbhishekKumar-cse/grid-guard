"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Zap, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [atcLoss, setAtcLoss] = useState(17.4);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAtcLoss(prev => {
        const delta = (Math.random() * 0.1 - 0.05);
        return parseFloat((prev + delta).toFixed(2));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Grid Map', href: '/map' },
    { name: 'Theft Detection', href: '/theft' },
    { name: 'Maintenance', href: '/maintenance' },
    { name: 'Blockchain', href: '/blockchain' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center px-4 md:px-6 justify-between border-b border-primary/20">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Zap className="text-primary w-8 h-8 fill-primary/20" />
          </motion.div>
          <span className="font-headline font-extrabold text-xl tracking-tighter text-white group-hover:text-primary transition-colors">
            GRIDGUARD <span className="text-primary">2030</span>
          </span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            className="text-sm font-medium text-text-secondary hover:text-primary transition-colors relative group py-1"
          >
            {link.name}
            <motion.div 
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
              whileHover={{ width: '100%' }}
            />
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">National AT&C Loss</span>
          <div className="flex items-center gap-2">
            <span className={cn(
              "font-code font-bold text-lg",
              atcLoss < 17.4 ? "text-accent" : "text-destructive"
            )}>
              {atcLoss}%
            </span>
            <div className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              atcLoss < 17.4 ? "bg-accent shadow-[0_0_8px_#00FF88]" : "bg-destructive shadow-[0_0_8px_#FF4444]"
            )} />
          </div>
        </div>

        <div className="relative cursor-pointer hover:bg-white/5 p-2 rounded-full transition-colors">
          <Bell className="w-5 h-5 text-text-secondary" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border border-background"></span>
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-white/10 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
        </div>

        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-primary/20 flex flex-col p-4 gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-lg font-medium p-2 hover:bg-white/5 rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
