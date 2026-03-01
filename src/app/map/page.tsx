
"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { motion } from 'framer-motion';
import { 
  Map as MapIcon, 
  Layers, 
  Search, 
  Filter, 
  Info, 
  AlertCircle, 
  Zap, 
  Radio,
  Maximize2,
  MapPin
} from 'lucide-react';
import { MOCK_DISCOMS, MOCK_ALERTS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function GridMapPage() {
  const [activeLayer, setActiveLayer] = useState<'losses' | 'alerts' | 'assets'>('losses');
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-hidden flex flex-col">
      <Navbar />
      <Sidebar />
      
      <main className="pl-0 md:pl-64 pt-16 flex-1 flex flex-col">
        <div className="flex-1 relative flex flex-col md:flex-row">
          
          {/* Left Panel: Controls */}
          <div className="w-full md:w-80 glass border-r border-white/10 p-6 z-20 flex flex-col gap-6">
            <div>
              <h1 className="text-xl font-headline font-black text-white tracking-tighter mb-1 uppercase">Tactical Grid Map</h1>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Geospatial Intelligence Layer</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <input 
                  type="text" 
                  placeholder="Search Substation or DISCOM..." 
                  className="w-full bg-white/5 border border-white/10 rounded-md py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active Intelligence Layer</label>
                <div className="grid grid-cols-1 gap-2">
                  <LayerButton 
                    active={activeLayer === 'losses'} 
                    onClick={() => setActiveLayer('losses')}
                    icon={<Zap size={14} />} 
                    label="AT&C Loss Heatmap" 
                  />
                  <LayerButton 
                    active={activeLayer === 'alerts'} 
                    onClick={() => setActiveLayer('alerts')}
                    icon={<AlertCircle size={14} />} 
                    label="Live Fault Alerts" 
                  />
                  <LayerButton 
                    active={activeLayer === 'assets'} 
                    onClick={() => setActiveLayer('assets')}
                    icon={<Layers size={14} />} 
                    label="Critical Assets (Transformers)" 
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Radio size={14} className="text-primary animate-pulse" />
                  <span className="text-[10px] font-bold text-primary uppercase">Live Feed</span>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-hide">
                  {MOCK_ALERTS.map(alert => (
                    <div key={alert.id} className="text-[9px] font-code border-b border-white/5 pb-1 last:border-0">
                      <span className="text-muted-foreground">[{alert.detectedAt.slice(11, 16)}]</span>{" "}
                      <span className={alert.severity === 'critical' ? 'text-destructive' : 'text-accent'}>{alert.title}</span>{" "}
                      <span className="opacity-50">@ {alert.location.district}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground mb-4">
                <span>LEGEND</span>
                <Info size={12} />
              </div>
              <div className="space-y-2">
                <LegendItem color="bg-destructive" label="CRITICAL (>25% Loss)" />
                <LegendItem color="bg-amber-500" label="WARNING (15-25% Loss)" />
                <LegendItem color="bg-accent" label="OPTIMAL (<5% Loss)" />
              </div>
            </div>
          </div>

          {/* Center: Map Canvas */}
          <div className="flex-1 relative bg-slate-950 overflow-hidden">
            <div className="absolute inset-0 opacity-20" style={{ 
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0, 212, 255, 0.1) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
            
            <div className="absolute top-6 right-6 z-10 flex gap-2">
              <button className="p-2 glass rounded-lg text-white hover:bg-white/10 transition-all"><Maximize2 size={18} /></button>
              <button className="p-2 glass rounded-lg text-white hover:bg-white/10 transition-all"><Filter size={18} /></button>
            </div>

            {/* Stylized Map Mockup */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-12">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: isLoaded ? 0.3 : 0, scale: 1 }}
                 transition={{ duration: 1 }}
                 className="relative w-full h-full max-w-2xl text-primary"
               >
                 <svg viewBox="0 0 800 900" className="w-full h-full fill-none stroke-current" strokeWidth="1">
                    <path d="M400,100 L450,120 L480,180 L520,200 L550,250 L600,280 L620,350 L600,450 L550,550 L500,650 L450,750 L400,850 L350,750 L300,650 L250,550 L200,450 L180,350 L200,280 L250,250 L300,200 L350,120 Z" />
                    <path d="M400,200 L420,220 L440,280 L460,300 L480,350 L460,450 L440,550 L400,600 L360,550 L340,450 L320,350 L340,300 L360,280 L380,220 Z" opacity="0.5" />
                 </svg>
               </motion.div>
               
               {/* Pulsing Markers for Alerts/States */}
               {isLoaded && MOCK_DISCOMS.slice(0, 6).map((discom, i) => (
                 <MapMarker 
                   key={discom.id} 
                   x={`${25 + (i * 12)}%`} 
                   y={`${30 + (Math.sin(i) * 20 + 20)}%`} 
                   severity={discom.atcLoss > 25 ? 'critical' : discom.atcLoss > 15 ? 'high' : 'normal'}
                   label={discom.id}
                   onClick={() => setSelectedState(discom.id)}
                 />
               ))}
            </div>

            {/* Floating Info Card */}
            {selectedState && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 right-8 w-72 glass p-6 rounded-2xl border-primary/20 z-30 shadow-2xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-headline font-black text-white">{selectedState} DISCOM</h3>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Zone Status: ACTIVE</span>
                  </div>
                  <button onClick={() => setSelectedState(null)} className="text-muted-foreground hover:text-white">✕</button>
                </div>
                
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                     <span className="text-xs text-muted-foreground">AT&C Loss</span>
                     <span className="text-sm font-bold text-destructive">26.8%</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-xs text-muted-foreground">Smart Metering</span>
                     <span className="text-sm font-bold text-accent">52%</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-xs text-muted-foreground">Revenue Impact</span>
                     <span className="text-sm font-bold text-white">₹8,200 Cr</span>
                   </div>
                   <button className="w-full py-2 bg-primary text-background font-bold rounded-lg text-xs mt-2 uppercase tracking-widest">Generate Detailed Report</button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function LayerButton({ active, onClick, icon, label }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-lg text-xs font-bold transition-all text-left border",
        active ? "bg-primary/10 border-primary text-primary" : "bg-white/5 border-transparent text-muted-foreground hover:bg-white/10"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function LegendItem({ color, label }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className={cn("w-3 h-3 rounded-full", color)} />
      <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  );
}

function MapMarker({ x, y, severity, label, onClick }: any) {
  const colorClass = severity === 'critical' ? 'bg-destructive' : severity === 'high' ? 'bg-amber-500' : 'bg-accent';
  const shadowClass = severity === 'critical' ? 'shadow-[0_0_15px_rgba(255,68,68,0.5)]' : severity === 'high' ? 'shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'shadow-[0_0_15px_rgba(0,255,136,0.5)]';

  return (
    <div 
      className="absolute group cursor-pointer" 
      style={{ left: x, top: y }}
      onClick={onClick}
    >
      <div className={cn("w-4 h-4 rounded-full border-2 border-white/20 animate-ping absolute inset-0 opacity-50", colorClass)} />
      <div className={cn("w-4 h-4 rounded-full relative z-10", colorClass, shadowClass)} />
      <div className="absolute left-1/2 -translate-x-1/2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
         <span className="px-2 py-1 bg-black/80 border border-white/10 rounded text-[10px] text-white font-bold font-code uppercase">{label}</span>
      </div>
    </div>
  );
}
