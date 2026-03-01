"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  AlertTriangle, 
  Zap, 
  TrendingDown, 
  Activity, 
  Database,
  BarChart3
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { MOCK_ALERTS, MOCK_CHART_DATA } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const [liveStats, setLiveStats] = useState({
    atcLoss: 17.4,
    generated: 148.3,
    distributed: 145.6,
    alerts: 7
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        atcLoss: parseFloat((prev.atcLoss + (Math.random() * 0.1 - 0.05)).toFixed(2)),
        generated: parseFloat((prev.generated + (Math.random() * 0.5 - 0.25)).toFixed(1)),
        distributed: parseFloat((prev.distributed + (Math.random() * 0.4 - 0.2)).toFixed(1)),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Sidebar />
      
      <main className="pl-0 md:pl-64 pt-16 min-h-screen">
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-headline font-black tracking-tighter text-white">MISSION CONTROL DASHBOARD</h1>
              <div className="flex items-center gap-2 text-muted-foreground text-sm font-code">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                LIVE_DATA_STREAM :: {new Date().toLocaleTimeString()} :: ALL_INDIA_GRID
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 transition-colors flex items-center gap-2 text-sm font-bold">
                <Database size={16} /> EXPORT DATA
              </button>
              <button className="px-4 py-2 bg-primary text-background font-bold rounded-md hover:bg-primary/90 transition-all flex items-center gap-2 text-sm">
                <BarChart3 size={16} /> GENERATE REPORT
              </button>
            </div>
          </div>

          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard 
              title="AT&C LOSS TODAY"
              value={`${liveStats.atcLoss}%`}
              trend="↓ 0.12%"
              trendUp={false}
              icon={<TrendingDown size={24} />}
              color="text-accent"
              progress={liveStats.atcLoss}
              target={2}
            />
            <KPICard 
              title="ENERGY BALANCE"
              value={`${(liveStats.generated - liveStats.distributed).toFixed(1)} GW`}
              subValue={`${liveStats.distributed} GW Distributed`}
              trend="2.7 GW Total Loss"
              trendUp={true}
              icon={<Zap size={24} />}
              color="text-primary"
            />
            <KPICard 
              title="ACTIVE ALERTS"
              value={String(liveStats.alerts)}
              subValue="2 Critical | 3 High"
              trend="Urgent Action"
              trendUp={true}
              icon={<AlertTriangle size={24} />}
              color="text-destructive"
              pulse={true}
            />
            <KPICard 
              title="REVENUE PROTECTED"
              value="₹14.2 Cr"
              subValue="Billed: ₹2,840 Cr"
              trend="↑ 4.2% Growth"
              trendUp={false}
              icon={<Activity size={24} />}
              color="text-accent"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* National Grid Map Mockup */}
            <div className="lg:col-span-8 glass rounded-2xl overflow-hidden min-h-[500px] flex flex-col">
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-headline font-bold text-lg">NATIONAL GRID PERFORMANCE</h3>
                <div className="flex gap-2">
                  {['Losses', 'Alerts', 'Transformers'].map(t => (
                    <button key={t} className="px-3 py-1 text-xs font-bold rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 relative bg-slate-950 flex items-center justify-center p-8">
                 {/* Visual Mock of India Map with Points */}
                 <div className="relative w-full h-full max-w-lg aspect-square opacity-60">
                   {/* This would be the Leaflet component in a real app */}
                   <div className="absolute inset-0 flex items-center justify-center text-primary/20 pointer-events-none">
                     <MapIcon size={400} />
                   </div>
                   {/* Pulsing Alert Points */}
                   <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-destructive rounded-full animate-ping" />
                   <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-accent rounded-full animate-ping" />
                   <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-primary rounded-full animate-ping" />
                 </div>
                 
                 <div className="absolute bottom-4 left-4 glass p-3 rounded-lg text-[10px] space-y-2">
                   <div className="flex items-center gap-2"><div className="w-3 h-3 bg-destructive rounded-full" /> CRITICAL_ALERT</div>
                   <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded-full" /> HIGH_LOSS_ZONE</div>
                   <div className="flex items-center gap-2"><div className="w-3 h-3 bg-accent rounded-full" /> OPTIMAL_GRID</div>
                 </div>
              </div>
            </div>

            {/* Live Alerts Feed */}
            <div className="lg:col-span-4 glass rounded-2xl flex flex-col">
              <div className="p-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-headline font-bold text-lg">LIVE ALERTS FEED</h3>
                <span className="text-xs font-bold text-primary animate-pulse">7 LIVE</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[500px]">
                {MOCK_ALERTS.map((alert) => (
                  <AlertItem key={alert.id} alert={alert} />
                ))}
              </div>
              <button className="p-4 text-center text-xs font-bold text-muted-foreground hover:text-white border-t border-white/10 transition-colors">
                VIEW ALL ALERTS
              </button>
            </div>
          </div>

          {/* Bottom Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <ChartBox title="24-HOUR AT&C LOSS TREND">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={MOCK_CHART_DATA.atcLossHistory}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[15, 20]} hide />
                  <Tooltip contentStyle={{ backgroundColor: '#0d1f3c', border: '1px solid #1a3a5c' }} />
                  <Area type="monotone" dataKey="value" stroke="#00d4ff" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </ChartBox>

            <ChartBox title="DISCOM PERFORMANCE RANKING">
               <div className="space-y-4">
                 {[
                   { name: 'GUVNL', value: 9.8, color: 'bg-accent' },
                   { name: 'BESCOM', value: 12.5, color: 'bg-primary' },
                   { name: 'MSEDCL', value: 14.1, color: 'bg-cyan-500' },
                   { name: 'JVVNL', value: 26.8, color: 'bg-amber-500' },
                   { name: 'UPPCL', value: 30.2, color: 'bg-destructive' },
                 ].map(item => (
                   <div key={item.name} className="space-y-1">
                     <div className="flex justify-between text-xs font-bold">
                       <span>{item.name}</span>
                       <span className={item.value > 15 ? 'text-destructive' : 'text-accent'}>{item.value}%</span>
                     </div>
                     <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${(item.value / 35) * 100}%` }}
                         className={`h-full ${item.color}`}
                       />
                     </div>
                   </div>
                 ))}
               </div>
            </ChartBox>

            <ChartBox title="ASSET HEALTH DISTRIBUTION">
               <div className="flex items-center justify-center py-4">
                  <div className="relative w-40 h-40">
                     <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none" />
                        <circle cx="50" cy="50" r="40" stroke="#00FF88" strokeWidth="12" fill="none" strokeDasharray="251" strokeDashoffset="30" className="transition-all duration-1000" />
                        <circle cx="50" cy="50" r="40" stroke="#FF4444" strokeWidth="12" fill="none" strokeDasharray="251" strokeDashoffset="220" />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-black text-white">87%</span>
                        <span className="text-[10px] text-muted-foreground uppercase font-bold">HEALTHY</span>
                     </div>
                  </div>
               </div>
               <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
                  <div className="flex flex-col"><span className="text-accent">87% NORMAL</span></div>
                  <div className="flex flex-col"><span className="text-amber-500">11% WARNING</span></div>
                  <div className="flex flex-col"><span className="text-destructive">2% CRITICAL</span></div>
               </div>
            </ChartBox>
          </div>

          {/* Terminal Feed */}
          <div className="glass rounded-xl p-4 font-code text-[11px] h-32 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="flex flex-col-reverse animate-pulse">
               <div className="text-accent">[14:32:09] ALERT-THEFT | Location: Lucknow-UP | Confidence: 94.1% | ACTION_REQUIRED</div>
               <div className="text-amber-500">[14:32:08] TRANSFORMER-GJ-9023 | HI: 78 | Temp: 67°C | Status: YELLOW</div>
               <div className="text-primary">[14:32:07] METER-MH-4821 | Reading: 142.3 kWh | Status: NORMAL</div>
               <div className="text-muted-foreground opacity-50">[14:32:05] SYSTEM_CHECK_COMPLETE :: ALL_SERVICES_STABLE</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function KPICard({ title, value, subValue, trend, trendUp, icon, color, progress, target, pulse }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass p-6 rounded-2xl relative overflow-hidden group hover:translate-y-[-4px] transition-all",
        pulse && "border-destructive/50 border-2 shadow-[0_0_20px_rgba(255,68,68,0.2)]"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{title}</h4>
          <div className={cn("text-3xl font-headline font-black text-white tracking-tighter", color)}>{value}</div>
        </div>
        <div className={cn("p-2 rounded-lg bg-white/5", color)}>{icon}</div>
      </div>
      
      {subValue && <div className="text-xs text-white/70 mb-2">{subValue}</div>}
      
      <div className="flex items-center gap-2">
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1",
          trendUp ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"
        )}>
          {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </span>
      </div>

      {progress !== undefined && (
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-[8px] font-bold text-muted-foreground">
             <span>PROGRESS TO {target}%</span>
             <span>{(progress).toFixed(2)}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-accent" style={{ width: `${(1 - (progress / 100)) * 100}%` }} />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function AlertItem({ alert }: any) {
  const severityColor = alert.severity === 'critical' ? 'border-l-destructive' : alert.severity === 'high' ? 'border-l-amber-500' : 'border-l-accent';
  
  return (
    <div className={cn(
      "p-3 bg-white/5 rounded-lg border-l-4 transition-all hover:bg-white/10 group cursor-pointer",
      severityColor
    )}>
      <div className="flex justify-between items-start mb-1">
        <h5 className="text-xs font-bold text-white group-hover:text-primary">{alert.title}</h5>
        <span className="text-[9px] text-muted-foreground font-code">{alert.id}</span>
      </div>
      <div className="text-[10px] text-muted-foreground flex items-center gap-2">
        <span>{alert.location.district}, {alert.location.state}</span>
        <span>•</span>
        <span>2 min ago</span>
      </div>
      <div className="mt-2 flex gap-2">
        <button className="px-2 py-1 bg-primary text-background text-[9px] font-bold rounded">DISPATCH CREW</button>
        <button className="px-2 py-1 bg-white/5 text-white text-[9px] font-bold rounded hover:bg-white/10">VIEW DETAILS</button>
      </div>
    </div>
  );
}

function ChartBox({ title, children }: any) {
  return (
    <div className="glass p-6 rounded-2xl">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">{title}</h3>
      {children}
    </div>
  );
}

function MapIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );
}
