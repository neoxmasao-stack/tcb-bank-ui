import React from 'react';
import { TCBPulse } from '../components/PulseWidget';

export default function GlobalLedger() {
  return (
    <div className="min-h-screen bg-black text-cyan-500 font-mono p-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full border border-cyan-900 p-12 rounded-3xl bg-zinc-950 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
        <TCBPulse />
        <div className="mt-12 space-y-6">
          <h1 className="text-6xl font-bold tracking-tighter text-white">GLOBAL SETTLEMENT OS</h1>
          <p className="text-xl text-cyan-700 uppercase tracking-widest">Autonomous Liquidity Distribution Active</p>
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent my-8" />
          <div className="grid grid-cols-2 gap-8 text-sm opacity-80">
            <div>[NODE-STATUS]: 33 NATIONS CONNECTED</div>
            <div className="text-right">[LATENCY]: 0.01ms (QUANTUM-DIRECT)</div>
            <div>[AUTH-LEVEL]: YUBIKEY-L2-MAXIMUM</div>
            <div className="text-right">[VERSION]: v14.3.2-STABLE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
