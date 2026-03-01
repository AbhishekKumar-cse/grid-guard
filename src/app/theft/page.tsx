"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  HardDrive, 
  Network,
  ChevronRight,
  TrendingUp,
  Fingerprint,
  Activity
} from 'lucide-react';
import { MOCK_ALERTS } from '@/lib/mock-data';
import { aiTheftEvidenceReport } from '@/ai/flows/ai-theft-evidence-report';
import { cn } from '@/lib/utils';

export default function TheftDetectionPage() {
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const theftCases = MOCK_ALERTS.filter(a => a.type === 'theft');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main className="pl-0 md:pl-64 pt-16">
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                <ShieldAlert size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-headline font-black tracking-tighter text-white">AI THEFT DETECTION ENGINE</h1>
                <p className="text-muted-foreground text-sm flex items-center gap-2">
                  <span className="text-accent">● LIVE</span> 47 ACTIVE PATTERN MONITORS OPERATIONAL
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-8 bg-white/5 border border-white/10 p-4 rounded-xl">
               <div className="text-center">
                 <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Revenue Protected</div>
                 <div className="text-xl font-headline font-bold text-accent">₹14.2 Cr</div>
               </div>
               <div className="w-px h-8 bg-white/10" />
               <div className="text-center">
                 <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Model Accuracy</div>
                 <div className="text-xl font-headline font-bold text-primary">99.2%</div>
               </div>
            </div>
          </div>

          {/* Classification Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PatternCategory 
              title="HARDWARE TAMPERING" 
              icon={<HardDrive size={20} />}
              patterns={['Meter Cover Removal', 'Magnetic Interference', 'CT Bypass', 'PT Tampering']}
              detectedCount={12}
              color="text-destructive"
            />
            <PatternCategory 
              title="PATTERN ANOMALIES" 
              icon={<ActivityIcon size={20} />}
              patterns={['Seasonal Deviation', 'Hour-of-day Mismatch', 'Sudden Load Change', 'Power Factor Anomaly']}
              detectedCount={8}
              color="text-amber-500"
            />
             <PatternCategory 
              title="NETWORK ANOMALIES" 
              icon={<Network size={20} />}
              patterns={['Illegal Sub-metering', 'Edge Energy Discrepancy', 'Transformer Mismatch', 'Peer Group Outlier']}
              detectedCount={3}
              color="text-primary"
            />
          </div>

          {/* Active Cases Table */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between gap-4">
               <h3 className="font-headline font-bold text-xl">THEFT DETECTION QUEUE</h3>
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                 <input 
                   type="text" 
                   placeholder="Search by Meter ID or Location..." 
                   className="bg-white/5 border border-white/10 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 w-full md:w-80"
                 />
               </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Case ID</th>
                    <th className="px-6 py-4">Meter ID</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Confidence</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {theftCases.map((item) => (
                    <tr 
                      key={item.id} 
                      className="hover:bg-white/5 transition-colors group cursor-pointer"
                      onClick={() => setSelectedCase(item)}
                    >
                      <td className="px-6 py-4 font-code text-primary">{item.id}</td>
                      <td className="px-6 py-4 font-bold text-white">{item.meterId}</td>
                      <td className="px-6 py-4 text-muted-foreground">{item.location.district}, {item.location.state}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                           <div className="flex-1 h-1.5 w-20 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-destructive" style={{ width: `${item.confidence}%` }} />
                           </div>
                           <span className="text-[10px] font-bold text-destructive">{item.confidence}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold uppercase tracking-wider">
                           Detected
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <button className="p-2 hover:bg-white/10 rounded transition-colors text-primary">
                           <ChevronRight size={18} />
                         </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Evidence Modal Mockup */}
          {selectedCase && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-8 rounded-2xl border-purple-500/30 border-2"
            >
               <div className="flex justify-between items-start mb-8">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                      <Fingerprint size={32} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-headline font-bold text-white">AI EVIDENCE REPORT: {selectedCase.id}</h2>
                      <p className="text-muted-foreground font-code text-sm">Blockchain Verified Proof :: {selectedCase.meterId}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedCase(null)} className="p-2 hover:bg-white/5 rounded-full">✕</button>
               </div>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                       <h4 className="text-[10px] font-bold text-muted-foreground uppercase mb-2">Detection Pattern</h4>
                       <p className="text-white font-medium">Combination of "CT Bypass" (Hardware) and "Seasonal Consumption Deviation" (Pattern).</p>
                    </div>
                    
                    <div className="space-y-2">
                       <h4 className="text-[10px] font-bold text-muted-foreground uppercase">Sensor Anomalies</h4>
                       <div className="space-y-2">
                          <AnomalyRow label="Phase A Current" actual="0 A" expected="12-15 A" />
                          <AnomalyRow label="Neutral Displacement" actual="42V" expected="<2V" />
                          <AnomalyRow label="Energy Balance" actual="-42%" expected="±2%" />
                       </div>
                    </div>
                  </div>
                  
                  <div className="glass bg-slate-950 p-6 rounded-xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-3 opacity-10"><Cpu size={120} /></div>
                     <h4 className="font-headline font-bold text-primary text-lg mb-4">ENSEMBLE_ANALYSIS_SUMMARY</h4>
                     <p className="text-sm text-text-secondary leading-relaxed mb-6 font-code">
                       "AI analysis confirms high-probability CT Bypass at node MH-PNE-4821. Primary evidence: Phase A current dropped to zero while load remained high on secondary phases. Secondary evidence: Meter magnetic sensor triggered at 04:12 IST. Cross-verified with local transformer 'TR-MH-4421' showing energy discrepancy of 1.2kW. Recommend immediate field dispatch."
                     </p>
                     <div className="flex gap-4">
                        <button className="flex-1 py-3 bg-destructive text-white font-bold rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                          <ShieldAlert size={18} /> DISPATCH CREW
                        </button>
                        <button className="flex-1 py-3 border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-all">
                          FILE LEGAL FIR
                        </button>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}

          {/* Detection Process Visual */}
          <div className="py-12 border-t border-white/10">
             <h3 className="text-center font-headline font-bold text-2xl mb-12 uppercase tracking-widest text-muted-foreground">AI Detection Lifecycle</h3>
             <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-5xl mx-auto">
                <ProcessStep icon={<Zap />} label="Reading" />
                <ProcessLine />
                <ProcessStep icon={<ActivityIcon />} label="Edge AI" />
                <ProcessLine />
                <ProcessStep icon={<Network />} label="Cross-Check" />
                <ProcessLine />
                <ProcessStep icon={<Cpu />} label="Ensemble" />
                <ProcessLine />
                <ProcessStep icon={<ShieldCheckIcon />} label="Dispatch" />
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function PatternCategory({ title, icon, patterns, detectedCount, color }: any) {
  return (
    <div className="glass p-6 rounded-2xl group hover:border-primary/40 transition-all">
      <div className="flex justify-between items-center mb-6">
        <div className={cn("p-3 rounded-xl bg-white/5", color)}>{icon}</div>
        <div className="text-right">
          <div className="text-[10px] text-muted-foreground font-bold uppercase">Detected Today</div>
          <div className={cn("text-2xl font-black", color)}>{detectedCount}</div>
        </div>
      </div>
      <h3 className="font-headline font-bold text-white mb-4 uppercase tracking-tighter">{title}</h3>
      <div className="space-y-2">
        {patterns.map((p: string) => (
          <div key={p} className="flex items-center gap-2 text-sm text-text-secondary">
             <CheckCircle2 size={14} className="text-accent opacity-50" /> {p}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnomalyRow({ label, actual, expected }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
      <span className="text-sm font-medium text-white">{label}</span>
      <div className="text-right">
        <div className="text-destructive font-bold text-xs">{actual}</div>
        <div className="text-[9px] text-muted-foreground font-bold uppercase">Target: {expected}</div>
      </div>
    </div>
  );
}

function ProcessStep({ icon, label }: any) {
  return (
    <div className="flex flex-col items-center gap-3">
       <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group hover:bg-primary hover:text-background transition-all cursor-pointer">
         {React.cloneElement(icon as React.ReactElement, { size: 28 })}
       </div>
       <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
    </div>
  );
}

function ProcessLine() {
  return <div className="hidden md:block h-px w-20 bg-white/10 border-t border-dashed border-white/30" />;
}

function ActivityIcon({ size }: { size: number }) {
  return <Activity size={size} />;
}

function ShieldCheckIcon({ size }: { size: number }) {
  return <CheckCircle2 size={size} />;
}
