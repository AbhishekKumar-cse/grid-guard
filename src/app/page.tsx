"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, ShieldCheck, ArrowRight, Play, Server, Globe, Cpu, Link as LinkIcon } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import * as THREE from 'three';

export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.05, transparent: true, opacity: 0.6 });
    const points = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(points);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.y += 0.001;
      points.rotation.x += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">CreaTech 2025 — National Innovation Competition</span>
          </div>
          
          <h1 className="font-headline font-black text-6xl md:text-8xl text-white leading-none mb-6 tracking-tighter">
            INDIA'S GRID IS <br />
            <span className="text-primary italic neon-text">BLEEDING</span>
          </h1>
          
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            AI + IoT + Blockchain + Digital Twin — <br />
            Cutting transmission losses from <span className="text-white font-bold underline decoration-destructive underline-offset-4">17.4%</span> to <span className="text-accent font-bold">below 2%</span> by 2030.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-primary text-background font-bold rounded-md hover:bg-primary/90 transition-all hover:scale-105 hover:neon-border flex items-center justify-center gap-2 text-lg">
              Explore Live Dashboard <ArrowRight size={20} />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 border border-primary/30 text-primary font-bold rounded-md hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-lg">
              <Play size={20} fill="currentColor" /> Watch Mission Video
            </button>
          </div>
        </motion.div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce opacity-30">
          <ArrowRight className="rotate-90 text-primary" size={32} />
        </div>
      </section>

      {/* Problem Ticker */}
      <div className="bg-destructive py-3 overflow-hidden border-y border-white/10 relative z-20">
        <div className="flex whitespace-nowrap animate-data-stream">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-8">
              <span className="text-white font-bold text-sm tracking-widest flex items-center gap-2">
                <Zap size={14} /> INDIA LOSES ₹87,800 CR ANNUALLY TO AT&C LOSSES
              </span>
              <span className="text-white font-bold text-sm tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} /> UTTAR PRADESH DISCOM: 30.2% LOSSES
              </span>
              <span className="text-white font-bold text-sm tracking-widest flex items-center gap-2">
                <Zap size={14} /> 320 BILLION UNITS WASTED EVERY YEAR
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics Section */}
      <section className="py-24 px-4 bg-card/30 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MetricCard 
              value="₹87,800 Cr" 
              label="Annual Financial Loss" 
              desc="The direct economic impact of grid inefficiencies."
              color="text-destructive"
            />
            <MetricCard 
              value="320 BU" 
              label="Energy Wasted Yearly" 
              desc="Equivalent to powering 10 nations for a month."
              color="text-primary"
            />
            <MetricCard 
              value="17.4%" 
              label="Current National Loss" 
              desc="Highest among top-tier global economies."
              color="text-amber-500"
            />
          </div>
        </div>
      </section>

      {/* Stack Layers */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h2 className="font-headline font-bold text-4xl text-white mb-4">The GridGuard Intelligence Stack</h2>
          <p className="text-muted-foreground text-lg">5 synergistic layers working in unison for grid sovereignty.</p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <LayerItem icon={<Server />} color="text-primary" title="PERCEPTION LAYER" desc="IoT Smart Meters • Transformer Sensors • Drone Inspection" sub="2.4 Billion data points daily" />
          <LayerItem icon={<Globe />} color="text-cyan-400" title="COMMUNICATION LAYER" desc="NB-IoT • LoRaWAN • 5G Mesh • Fiber Optic OPGW" sub="95%+ National Grid Coverage" />
          <LayerItem icon={<Cpu />} color="text-purple-400" title="INTELLIGENCE LAYER" desc="AI/ML Theft Detection • Digital Twins • Predictive Maintenance" sub="99.2% Detection Accuracy" />
          <LayerItem icon={<LinkIcon />} color="text-amber-400" title="BLOCKCHAIN LAYER" desc="Hyperledger Fabric • Smart Contracts • Immutable Billing" sub="2,000 Transactions Per Second" />
          <LayerItem icon={<Zap />} color="text-accent" title="ACTION LAYER" desc="SCADA 4.0 • Auto-Healing Grid • Consumer App" sub="<50ms Fault Isolation" />
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-24 bg-background relative border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-12">
            <ImpactMetric num="280 BU" label="Energy Saved Per Year" />
            <ImpactMetric num="₹78,990 Cr" label="Annual Recovery" />
            <ImpactMetric num="230 MT" label="CO2 Avoided" />
            <ImpactMetric num="8.5 Lakh" label="Jobs Created" />
            <ImpactMetric num="65/70" label="Viable DISCOMs" />
            <ImpactMetric num="99.2%" label="AI Accuracy" />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-20 border-t border-primary/10 glass">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="flex flex-col items-center md:items-start gap-4">
             <div className="flex items-center gap-2">
                <Zap className="text-primary" />
                <span className="font-headline font-extrabold text-2xl tracking-tighter text-white">GRIDGUARD <span className="text-primary">2030</span></span>
             </div>
             <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left">
               Built for India. Scalable for the world. Pioneering energy sovereignty through deep technology.
             </p>
           </div>
           
           <div className="flex gap-12">
             <div className="flex flex-col gap-3">
               <span className="text-white font-bold text-sm uppercase tracking-widest">Platform</span>
               <Link href="/dashboard" className="text-muted-foreground hover:text-primary text-sm">Dashboard</Link>
               <Link href="/map" className="text-muted-foreground hover:text-primary text-sm">Grid Map</Link>
               <Link href="/theft" className="text-muted-foreground hover:text-primary text-sm">Theft Engine</Link>
             </div>
             <div className="flex flex-col gap-3">
               <span className="text-white font-bold text-sm uppercase tracking-widest">Connect</span>
               <a href="#" className="text-muted-foreground hover:text-primary text-sm">LinkedIn</a>
               <a href="#" className="text-muted-foreground hover:text-primary text-sm">GitHub</a>
               <a href="#" className="text-muted-foreground hover:text-primary text-sm">Ministry Portal</a>
             </div>
           </div>
           
           <div className="px-6 py-4 rounded-xl border border-primary/20 bg-primary/5 flex items-center gap-4">
              <div className="text-right">
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest">Official Entry</div>
                <div className="text-lg font-headline font-bold text-white">CreaTech 2025</div>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
}

function MetricCard({ value, label, desc, color }: any) {
  return (
    <div className="glass p-8 rounded-2xl hover:translate-y-[-8px] transition-all group">
      <div className={`${color} font-headline font-black text-4xl mb-2`}>{value}</div>
      <div className="text-white font-bold text-lg mb-2">{label}</div>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function LayerItem({ icon, color, title, desc, sub }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02, x: 10 }}
      className="glass p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 group cursor-pointer border-l-4 border-l-transparent hover:border-l-current"
      style={{ color: 'inherit' }}
    >
      <div className={`${color} p-4 rounded-lg bg-white/5`}>{React.cloneElement(icon, { size: 32 })}</div>
      <div className="flex-1 text-center md:text-left">
        <h3 className={`${color} font-headline font-bold text-xl mb-1`}>{title}</h3>
        <p className="text-white text-sm font-medium">{desc}</p>
      </div>
      <div className="text-muted-foreground font-code text-xs uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full">{sub}</div>
    </motion.div>
  );
}

function ImpactMetric({ num, label }: any) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="font-headline font-black text-5xl text-primary mb-2 neon-text">{num}</div>
      <div className="text-white font-bold text-sm uppercase tracking-widest opacity-80">{label}</div>
    </div>
  );
}
