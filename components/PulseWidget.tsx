'use client';
import { motion } from 'framer-motion';
export const PulseWidget = () => (
  <div className="flex items-center space-x-4 p-4 bg-zinc-900/50 rounded-2xl border border-cyan-500/30">
    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]" />
    <span className="text-cyan-400 font-mono text-sm tracking-widest">TSUKAYAMA-PULSE: ACTIVE</span>
  </div>
);
