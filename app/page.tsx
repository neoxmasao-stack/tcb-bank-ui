"use client";
import { useState, useEffect, useCallback } from "react";
import { Send, Shield, Activity, Lock } from "lucide-react";

export default function FINOS_NOC_CORE() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [totalAssets, setTotalAssets] = useState(3490000001305090000n);
  const [available, setAvailable] = useState(1305090000n);
  const [auditLog, setAuditLog] = useState([]);
  const [sendStatus, setSendStatus] = useState("");
  const [sendAmount, setSendAmount] = useState("");

  const logAudit = useCallback((event, status) => {
    const entry = {
      timestamp: new Date().toISOString(),
      event,
      status,
      id: crypto.randomUUID()
    };
    setAuditLog(prev => [entry, ...prev].slice(0, 50));
  }, []);

  const handleLogin = () => {
    if (loginId === "Tsukayama century bank" && loginPw === "tcb@owner") {
      setIsLoggedIn(true);
      logAudit("ADMIN_AUTH_SUCCESS", "SUCCESS");
    } else {
      alert("UNAUTHORIZED");
    }
  };

  const executeTransfer = async () => {
    if (!sendAmount) return;
    const amount = BigInt(sendAmount);
    setSendStatus("SYNCING...");
    try {
      setTotalAssets(prev => prev - amount);
      setAvailable(prev => prev - amount);
      setSendStatus("✅ COMPLETE");
      logAudit("TRANSFER_COMMIT: " + amount + " JPY", "SUCCESS");
      setSendAmount("");
    } catch (e) {
      setSendStatus("ERROR");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono">
        <div className="border border-cyan-900 p-8 bg-zinc-950">
          <div className="text-cyan-500 mb-4 text-xs">FIN-OS v15.1 AUTH</div>
          <input type="text" placeholder="ID" onChange={e=>setLoginId(e.target.value)} className="w-full bg-black border border-cyan-900 p-3 mb-4 text-cyan-500 outline-none" />
          <input type="password" placeholder="PW" onChange={e=>setLoginPw(e.target.value)} className="w-full bg-black border border-cyan-900 p-3 mb-8 text-cyan-500 outline-none" />
          <button onClick={handleLogin} className="w-full bg-cyan-900 text-white py-3 hover:bg-cyan-700">LOGIN</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-cyan-500 font-mono p-6">
      <header className="border-b border-cyan-900 pb-4 mb-8 flex justify-between items-center">
        <div className="text-xl font-bold">TCB-OS NOC // SOVEREIGN_CORE</div>
        <div className="text-[10px] text-emerald-500">SYSTEM-ACTIVE</div>
      </header>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8 space-y-6">
          <div className="border border-cyan-900 p-8 bg-zinc-950">
            <div className="text-[10px] text-cyan-700 uppercase">Total Consolidated Assets</div>
            <div className="text-5xl font-bold text-white mt-2">¥{totalAssets.toLocaleString()}</div>
          </div>
          <div className="border border-cyan-900 p-8 bg-zinc-950">
            <input type="number" value={sendAmount} onChange={e=>setSendAmount(e.target.value)} className="w-full bg-black border border-cyan-900 p-4 text-2xl text-white mb-4 outline-none" placeholder="0" />
            <button onClick={executeTransfer} className="w-full bg-cyan-600 text-black font-bold py-4 hover:bg-cyan-400">EXECUTE TRANSFER</button>
            {sendStatus && <div className="mt-2 text-xs text-emerald-500">{sendStatus}</div>}
          </div>
        </div>
        <div className="col-span-4 border border-cyan-900 p-4 h-[500px] overflow-y-auto text-[10px] bg-zinc-950">
          <div className="mb-4 border-b border-cyan-900 pb-2">AUDIT_LOG_STREAM</div>
          {auditLog.map(log => (
            <div key={log.id} className="mb-2 border-l border-cyan-800 pl-2">
              <div className="text-cyan-900">{log.timestamp}</div>
              <div className={log.status === "SUCCESS" ? "text-emerald-500" : "text-red-500"}>[{log.status}] {log.event}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
