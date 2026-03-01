"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  ShieldAlert, 
  Wrench, 
  Database, 
  FileBarChart, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Monitor
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Grid Map', icon: MapIcon, href: '/map' },
    { name: 'Theft Detection', icon: ShieldAlert, href: '/theft', badge: '23' },
    { name: 'Predictive Maint.', icon: Wrench, href: '/maintenance', badge: 'Critical' },
    { name: 'Blockchain Billing', icon: Database, href: '/blockchain' },
    { name: 'Reports', icon: FileBarChart, href: '/reports' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <motion.aside 
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-primary/10 transition-all duration-300 ease-in-out hidden md:flex flex-col",
        isCollapsed ? "w-20" : "w-64"
      )}
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
    >
      <div className="p-4 flex items-center justify-between border-b border-primary/5">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#00FF88]" />
            <span className="text-xs font-bold text-accent uppercase tracking-widest">System Online</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-white/5 rounded transition-colors ml-auto"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative",
                  isActive ? "bg-primary/10 text-primary border-r-2 border-primary" : "text-muted-foreground hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={20} className={cn(isActive && "text-primary")} />
                {!isCollapsed && (
                  <span className="text-sm font-medium flex-1 truncate">{item.name}</span>
                )}
                {!isCollapsed && item.badge && (
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
                    item.badge === 'Critical' ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"
                  )}>
                    {item.badge}
                  </span>
                )}
                {isCollapsed && (
                   <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap border border-primary/20">
                     {item.name}
                   </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-primary/5">
        {!isCollapsed && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
               <div className="w-6 h-4 bg-orange-500 relative flex items-center justify-center text-[8px] font-bold text-white overflow-hidden">
                 <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">🇮🇳</div>
               </div>
               <span className="text-[10px] text-muted-foreground font-bold tracking-wider">NIC CLOUD SOVEREIGNTY</span>
            </div>
            <div className="text-[9px] text-muted-foreground opacity-50 uppercase tracking-tighter">
              v2.0.30-STABLE | GRIDGUARD INTEL
            </div>
          </div>
        )}
        {isCollapsed && <Monitor size={20} className="mx-auto text-muted-foreground opacity-50" />}
      </div>
    </motion.aside>
  );
}
