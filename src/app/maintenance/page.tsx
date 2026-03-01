"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Thermometer, 
  Wind, 
  Gauge, 
  AlertCircle, 
  Calendar,
  CheckCircle,
  Plus,
  BarChart2,
  Clock
} from 'lucide-react';
import { MOCK_TRANSFORMERS } from '@/lib/mock-data';
import { aiPredictiveMaintenanceInsights } from '@/ai/flows/ai-predictive-maintenance-insights';
import { cn } from '@/lib/utils';

export default function MaintenancePage() {
  const [selectedTr, setSelectedTr] = useState<any>(null);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main className="pl-0 md:pl-64 pt-16">
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/20 rounded-xl text-amber-500">
                <Wrench size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-headline font-black tracking-tighter text-white">PREDICTIVE MAINTENANCE SUITE</h1>
                <p className="text-muted-foreground text-sm">Managing health for 2.8 Crore grid assets nationally.</p>
              </div>
            </div>
            
            <button className="px-6 py-3 bg-primary text-background font-bold rounded-lg hover:brightness-110 transition-all flex items-center gap-2">
              <Plus size={20} /> CREATE WORK ORDER
            </button>
          </div>

          {/* Health Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <MaintenanceStat label="Healthy" value="87%" sub="2.43 Cr Units" color="text-accent" />
            <MaintenanceStat label="Warning" value="11%" sub="31L Units" color="text-amber-500" />
            <MaintenanceStat label="Critical" value="2%" sub="5.6L Units" color="text-destructive" />
            <div className="glass p-6 rounded-2xl bg-accent/10 border-accent/20">
               <div className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1">Total Savings 2024</div>
               <div className="text-3xl font-headline font-black text-white">₹16,100 Cr</div>
               <div className="text-[10px] text-accent/80 font-medium">Predictive vs Reactive Model</div>
            </div>
          </div>

          {/* Transformer Table */}
          <div className="glass rounded-2xl">
             <div className="p-6 border-b border-white/10">
               <h3 className="font-headline font-bold text-xl">TRANSFORMER HEALTH REGISTRY</h3>
             </div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead className="bg-white/5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                   <tr>
                     <th className="px-6 py-4">ID</th>
                     <th className="px-6 py-4">Location</th>
                     <th className="px-6 py-4">Health Index</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4">Est. Failure</th>
                     <th className="px-6 py-4 text-right">Action</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5 text-sm">
                   {MOCK_TRANSFORMERS.map(tr => (
                     <tr key={tr.id} className="hover:bg-white/5 transition-colors cursor-pointer" onClick={() => setSelectedTr(tr)}>
                       <td className="px-6 py-4 font-code text-primary">{tr.id}</td>
                       <td className="px-6 py-4 text-white font-medium">{tr.location.district}, {tr.location.state}</td>
                       <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                           <div className="flex-1 h-2 w-24 bg-white/5 rounded-full overflow-hidden">
                              <div className={cn(
                                "h-full",
                                tr.healthIndex > 80 ? "bg-accent" : tr.healthIndex > 60 ? "bg-amber-500" : "bg-destructive"
                              )} style={{ width: `${tr.healthIndex}%` }} />
                           </div>
                           <span className="text-xs font-bold">{tr.healthIndex}%</span>
                         </div>
                       </td>
                       <td className="px-6 py-4">
                         <span className={cn(
                           "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                           tr.status === 'healthy' ? "bg-accent/10 text-accent" : tr.status === 'warning' ? "bg-amber-500/10 text-amber-500" : "bg-destructive/10 text-destructive"
                         )}>
                           {tr.status}
                         </span>
                       </td>
                       <td className="px-6 py-4 font-code text-xs">
                          {tr.predictedFailureDate ? new Date(tr.predictedFailureDate).toLocaleDateString() : 'N/A'}
                       </td>
                       <td className="px-6 py-4 text-right">
                         <button className="text-primary hover:underline text-xs font-bold">ANALYZE SENSORS</button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>

          {/* Sensor Detail Mockup */}
          {selectedTr && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-2xl border-primary/20">
               <div className="flex justify-between items-start mb-8">
                 <div>
                   <h2 className="text-2xl font-headline font-bold text-white">LIVE_SENSOR_DIAGNOSTICS :: {selectedTr.id}</h2>
                   <div className="text-xs font-code text-muted-foreground flex items-center gap-2 mt-1">
                     <Clock size={12} /> LAST UPDATED: {new Date().toLocaleTimeString()} :: ALL_SENSORS_STABLE
                   </div>
                 </div>
                 <button onClick={() => setSelectedTr(null)} className="p-2 hover:bg-white/5 rounded-full">✕</button>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                 <SensorGauge label="Winding Temp" value={selectedTr.sensors.windingTemp} unit="°C" max={100} warning={85} />
                 <SensorGauge label="Oil Temp" value={selectedTr.sensors.oilTemp} unit="°C" max={100} warning={80} />
                 <SensorGauge label="Ambient Temp" value={selectedTr.sensors.ambientTemp} unit="°C" max={50} warning={45} />
                 <SensorGauge label="Vibration" value={selectedTr.sensors.vibration} unit="mm/s" max={5} warning={2.5} />
                 <SensorGauge label="Oil Level" value={selectedTr.sensors.oilLevel} unit="%" max={100} warning={70} reverse />
               </div>

               <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                     <h4 className="font-headline font-bold text-white flex items-center gap-2">
                       <BarChart2 size={20} className="text-primary" /> 30-DAY HEALTH TREND
                     </h4>
                     <div className="h-48 bg-white/5 rounded-xl border border-white/5 relative flex items-end p-4 gap-1">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div key={i} className="flex-1 bg-primary/20 hover:bg-primary transition-all rounded-t" style={{ height: `${60 + Math.random() * 40}%` }} />
                        ))}
                     </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="font-headline font-bold text-white flex items-center gap-2">
                       <CheckCircle size={20} className="text-primary" /> AI INSIGHTS
                    </h4>
                    <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
                       <p className="text-sm text-text-secondary font-code leading-relaxed">
                          "Predictive model detects abnormal vibration harmonics. High likelihood of mechanical bearing failure within 14 days. Thermal readings are stable. Recommend scheduling bearing inspection during next off-peak window."
                       </p>
                       <div className="flex flex-col gap-2">
                          <button className="w-full py-2 bg-primary/10 text-primary border border-primary/30 rounded font-bold text-xs">VIEW FULL DIAGNOSTIC</button>
                          <button className="w-full py-2 bg-destructive/10 text-destructive border border-destructive/30 rounded font-bold text-xs">EMERGENCY SHUTDOWN</button>
                       </div>
                    </div>
                  </div>
               </div>
            </motion.div>
          )}

          {/* Schedule Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="glass p-6 rounded-2xl">
               <h3 className="font-headline font-bold text-lg mb-6 flex items-center gap-2">
                 <Calendar className="text-primary" /> UPCOMING MAINTENANCE
               </h3>
               <div className="space-y-4">
                 <ScheduleItem date="12 OCT" tr="TR-MH-4421" type="Oil Filtration" priority="Critical" />
                 <ScheduleItem date="15 OCT" tr="TR-KA-1122" type="Bushings Replace" priority="Medium" />
                 <ScheduleItem date="18 OCT" tr="TR-GJ-9023" type="Cooling Fan Repair" priority="High" />
               </div>
             </div>
             
             <div className="glass p-6 rounded-2xl bg-slate-950">
               <h3 className="font-headline font-bold text-lg mb-6 text-primary uppercase">Prediction Advantage</h3>
               <div className="space-y-4">
                  <BenefitRow label="Accuracy @ 30 Days" val="98.4%" />
                  <BenefitRow label="Accuracy @ 90 Days" val="92.3%" />
                  <BenefitRow label="False Positive Rate" val="0.8%" />
                  <div className="pt-4 mt-4 border-t border-white/10 text-[10px] text-muted-foreground italic">
                    GridGuard predictive engine out-performs industry standard SAP PM models by 44%.
                  </div>
               </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MaintenanceStat({ label, value, sub, color }: any) {
  return (
    <div className="glass p-6 rounded-2xl">
      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">{label} Assets</div>
      <div className={cn("text-4xl font-headline font-black mb-1", color)}>{value}</div>
      <div className="text-xs text-white/60 font-medium">{sub}</div>
    </div>
  );
}

function SensorGauge({ label, value, unit, max, warning, reverse }: any) {
  const isWarning = reverse ? value < warning : value > warning;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
         <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="10" fill="none" />
           <circle 
             cx="50" cy="50" r="40" 
             stroke={isWarning ? "#FF4444" : "#00D4FF"} 
             strokeWidth="10" 
             fill="none" 
             strokeDasharray="251" 
             strokeDashoffset={251 - (251 * (value / max))}
             className="transition-all duration-1000"
           />
         </svg>
         <div className="absolute inset-0 flex flex-col items-center justify-center">
           <span className={cn("text-lg font-bold", isWarning ? "text-destructive" : "text-white")}>{value}{unit}</span>
         </div>
      </div>
      <span className="text-[10px] font-bold text-muted-foreground uppercase">{label}</span>
    </div>
  );
}

function ScheduleItem({ date, tr, type, priority }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="text-center bg-white/10 px-3 py-1 rounded text-primary font-bold">
           <div className="text-[8px] uppercase">Oct</div>
           <div className="text-lg leading-none">{date.split(' ')[0]}</div>
        </div>
        <div>
           <div className="text-xs font-bold text-white">{tr}</div>
           <div className="text-[10px] text-muted-foreground">{type}</div>
        </div>
      </div>
      <span className={cn(
        "text-[9px] font-bold px-2 py-0.5 rounded uppercase",
        priority === 'Critical' ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"
      )}>{priority}</span>
    </div>
  );
}

function BenefitRow({ label, val }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-accent font-bold font-code">{val}</span>
    </div>
  );
}
