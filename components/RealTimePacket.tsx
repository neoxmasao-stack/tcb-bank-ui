'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function RealTimePacket({ amount = 250000, to = '山田 太郎', progress = 87 }) {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress(prev => prev >= progress ? progress : prev + Math.random() * 12);
    }, 85);
    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="bg-zinc-950 border border-cyan-400/40 rounded-3xl p-6 shadow-2xl">
      <div className="flex justify-between mb-4 text-xs">
        <span className="text-cyan-400">送金パケット進行中</span>
        <span className="text-emerald-400">着金予定 14秒後</span>
      </div>
      <div className="relative h-8 bg-zinc-900 rounded-2xl overflow-hidden border border-cyan-500/20">
        <motion.div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" animate={{ width: ${currentProgress}% }} />
        <motion.div className="absolute text-3xl top-1/2 -translate-y-1/2" animate={{ left: ${currentProgress}% }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}>💸</motion.div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
        <div>
          <p className="text-zinc-400 text-xs">送金額</p>
          <p className="text-4xl font-bold">¥{amount.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-zinc-400 text-xs">送金先</p>
          <p className="text-emerald-300">{to}</p>
        </div>
      </div>
      <div className="text-center text-[10px] text-zinc-500 mt-4 font-mono">TRX-9382KX91 • リアルタイムブロックチェーン同期</div>
    </div>
  );
}
