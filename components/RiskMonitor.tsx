'use client';
import { useEffect, useState } from 'react';
export function RiskMonitor() {
  const [score, setScore] = useState(12);
  useEffect(() => {
    const timer = setInterval(() => setScore(Math.floor(Math.random() * 20) + 5), 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className='p-4 border border-red-500 rounded-xl bg-black/50'>
      <h2 className='text-red-400 text-sm mb-2 font-mono'>RT-RISK-SCORE</h2>
      <div className='h-4 w-full bg-zinc-800 rounded overflow-hidden'>
        <div className='h-full bg-red-600 transition-all duration-500' style={{ width: \\%\ }} />
      </div>
      <p className='text-[10px] mt-1 text-red-500 font-mono'>STATUS: STABLE_LIQUIDITY</p>
    </div>
  );
}
