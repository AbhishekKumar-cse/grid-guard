
"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { motion } from 'framer-motion';
import { 
  Database, 
  ShieldCheck, 
  Hash, 
  Clock, 
  Activity, 
  Link as LinkIcon,
  Search,
  ExternalLink,
  ChevronRight,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BlockchainPage() {
  const [txs, setTxs] = useState<any[]>([]);
  const [blockHeight, setBlockHeight] = useState(4829103);
  
  useEffect(() => {
    // Mock Transaction Generator
    const generateTx = () => ({
      hash: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      from: "DISCOM_MH_PNE_" + Math.floor(1000 + Math.random() * 9000),
      to: "CUST_RES_" + Math.floor(1000 + Math.random() * 9000),
      units: (Math.random() * 500).toFixed(2) + " kWh",
      status: "verified",
      timestamp: new Date().toLocaleTimeString(),
      block: blockHeight - Math.floor(Math.random() * 10)
    });

    setTxs(Array.from({ length: 10 }).map(generateTx));

    const interval = setInterval(() => {
      setTxs(prev => [generateTx(), ...prev.slice(0, 9)]);
      setBlockHeight(h => h + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [blockHeight]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main className="pl-0 md:pl-64 pt-16">
        <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400">
                <Database size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-headline font-black tracking-tighter text-white uppercase">Blockchain Billing Ledger</h1>
                <p className="text-muted-foreground text-sm">Hyperledger Fabric 4.0 :: Immutable Grid Transactions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
               <BlockchainStat label="Network Status" value="Healthy" icon={<Activity size={16} className="text-accent" />} />
               <BlockchainStat label="TPS (Live)" value="2,482" icon={<Zap size={16} className="text-primary" />} />
               <BlockchainStat label="Block Height" value={blockHeight.toLocaleString()} icon={<Hash size={16} className="text-white/50" />} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Verification Stats */}
            <div className="lg:col-span-1 glass p-6 rounded-2xl flex flex-col gap-6">
               <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Audit Summary</h3>
               
               <div className="space-y-6">
                 <div className="flex flex-col gap-1">
                   <div className="text-2xl font-headline font-black text-white">100%</div>
                   <div className="text-[10px] text-accent font-bold uppercase tracking-wider">Transactions Verified</div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-1">
                     <div className="h-full bg-accent" style={{ width: '100%' }} />
                   </div>
                 </div>

                 <div className="flex flex-col gap-1">
                   <div className="text-2xl font-headline font-black text-white">0.0ms</div>
                   <div className="text-[10px] text-primary font-bold uppercase tracking-wider">Settlement Latency</div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-1">
                     <div className="h-full bg-primary" style={{ width: '10%' }} />
                   </div>
                 </div>

                 <div className="pt-6 border-t border-white/10">
                   <h4 className="text-[10px] font-bold text-muted-foreground uppercase mb-4">Consensus Nodes</h4>
                   <div className="space-y-3">
                     <NodeStatus label="Mumbai Hub" status="Online" />
                     <NodeStatus label="Delhi Core" status="Online" />
                     <NodeStatus label="Chennai Edge" status="Online" />
                     <NodeStatus label="Kolkata Node" status="Syncing" />
                   </div>
                 </div>
               </div>
            </div>

            {/* Live Ledger */}
            <div className="lg:col-span-3 glass rounded-2xl overflow-hidden flex flex-col">
              <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                   <h3 className="font-headline font-bold text-lg">IMMUTABLE_TRANSACTION_LOG</h3>
                 </div>
                 <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search TX Hash or Entity ID..." 
                      className="bg-white/5 border border-white/10 rounded-md py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-primary/50 w-full sm:w-64"
                    />
                 </div>
              </div>

              <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4">TX Hash</th>
                      <th className="px-6 py-4">Source / Dest</th>
                      <th className="px-6 py-4">Energy Value</th>
                      <th className="px-6 py-4">Block</th>
                      <th className="px-6 py-4">Verification</th>
                      <th className="px-6 py-4 text-right">Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {txs.map((tx, i) => (
                      <motion.tr 
                        key={tx.hash} 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className="hover:bg-white/5 transition-colors text-xs font-medium"
                      >
                        <td className="px-6 py-4 font-code text-primary opacity-80">{tx.hash.slice(0, 10)}...</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-white">{tx.from}</span>
                            <span className="text-[10px] text-muted-foreground">→ {tx.to}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-white">{tx.units}</td>
                        <td className="px-6 py-4 font-code text-muted-foreground">{tx.block}</td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-2 text-[10px] font-bold text-accent uppercase">
                            <CheckCircle2 size={12} /> VERIFIED
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 hover:bg-white/10 rounded-md text-muted-foreground hover:text-white transition-all">
                             <ExternalLink size={14} />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="p-4 text-center text-xs font-bold text-muted-foreground hover:text-white border-t border-white/10 transition-colors bg-white/5">
                LOAD PREVIOUS BLOCKS
              </button>
            </div>
          </div>

          {/* Audit Verification View */}
          <div className="glass p-8 rounded-2xl border-cyan-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShieldCheck size={180} />
            </div>
            
            <div className="max-w-3xl space-y-6 relative z-10">
               <h3 className="text-2xl font-headline font-black text-white">Trustless Audit Infrastructure</h3>
               <p className="text-muted-foreground leading-relaxed">
                 Every kilowatt-hour generated and consumed across the national grid is recorded in GridGuard's Blockchain Ledger. This creates a permanent, tamper-proof record that eliminates billing disputes, prevents meter bypassing from being hidden in regional logs, and enables transparent real-time revenue settlement between DISCOMs and generators.
               </p>
               <div className="flex flex-wrap gap-4">
                  <FeatureBadge icon={<ShieldCheck size={14} />} text="Zero-Knowledge Proofs" />
                  <FeatureBadge icon={<Clock size={14} />} text="Sub-Second Finality" />
                  <FeatureBadge icon={<LinkIcon size={14} />} text="Interoperable SCADA-Chain" />
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function BlockchainStat({ label, value, icon }: any) {
  return (
    <div className="hidden sm:flex flex-col items-end">
      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-lg font-headline font-black text-white">{value}</span>
        {icon}
      </div>
    </div>
  );
}

function NodeStatus({ label, status }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-bold uppercase text-white/70">{status}</span>
        <div className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === 'Online' ? 'bg-accent shadow-[0_0_8px_#00FF88]' : 'bg-amber-500 animate-pulse'
        )} />
      </div>
    </div>
  );
}

function FeatureBadge({ icon, text }: any) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
      <span className="text-cyan-400">{icon}</span>
      {text}
    </div>
  );
}
