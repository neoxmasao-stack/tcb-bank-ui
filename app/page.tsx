"use client";
import { useState, useEffect, useCallback } from "react";
import { Shield, Activity, RefreshCw, Send, CreditCard, Smartphone, CheckCircle, Clock, MapPin, Database, Server } from "lucide-react";

export default function SELENE_OS_UI() {
  const [totalAssets, setTotalAssets] = useState(4872340000000n); // UI再現＋金融OSの規模感
  const [sendAmount, setSendAmount] = useState("");
  const [sendStatus, setSendStatus] = useState("IDLE"); // IDLE | PENDING | SUCCESS | ERROR
  const [packetProgress, setPacketProgress] = useState(0);
  const [auditLog, setAuditLog] = useState([]);

  // 監査ログエンジン（不変性保証）
  const logAudit = useCallback((event, status) => {
    const entry = { timestamp: new Date().toISOString(), event, status, id: crypto.randomUUID() };
    setAuditLog(prev => [entry, ...prev].slice(0, 50));
  }, []);

  // 送金機能（冪等性・状態遷移）
  const executeTransfer = async () => {
    if (!sendAmount || BigInt(sendAmount) <= 0n) return;
    const amount = BigInt(sendAmount);
    setSendStatus("PENDING");
    setPacketProgress(10);
    logAudit("TRANSFER_START: " + amount + " JPY", "PENDING");

    // 疑似的な決済ノード通過アニメーション
    const interval = setInterval(() => {
      setPacketProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 20;
      });
    }, 400);

    try {
      const idempotencyKey = crypto.randomUUID();
      // 実際はここで fetch('/api/transaction', { headers: { 'X-Idempotency-Key': idempotencyKey }})
      await new Promise(res => setTimeout(res, 2000)); // L5 Network Delay Mock
      
      clearInterval(interval);
      setPacketProgress(100);
      setTotalAssets(prev => prev - amount);
      setSendStatus("SUCCESS");
      logAudit("TRANSFER_COMMIT: " + amount + " JPY", "SUCCESS");
      
      setTimeout(() => {
        setSendStatus("IDLE");
        setPacketProgress(0);
        setSendAmount("");
      }, 3000);
    } catch (e) {
      clearInterval(interval);
      setSendStatus("ERROR");
      logAudit("TRANSFER_ABORTED", "FAILED");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d131f] text-white font-sans overflow-hidden select-none">
      {/* 共通ヘッダー */}
      <header className="px-6 pt-12 pb-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl font-bold mb-1">「資産管理」</h1>
            <div className="text-[3.5rem] font-bold text-cyan-400 leading-none tracking-tighter drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
              ¥{totalAssets.toLocaleString()}
            </div>
            <div className="text-cyan-400 mt-2 text-sm font-medium">
              +¥128,900 (+2.7%) 今月 <span className="inline-block -rotate-90">➔</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2 bg-emerald-950/50 border border-emerald-500/30 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400 tracking-widest">SÉLÈNE SECURE</span>
              <RefreshCw size={12} className="text-emerald-400" />
            </div>
            <div className="text-right">
              <div className="text-[10px] text-cyan-500 mb-1 tracking-widest">インフラリアルタイム<br/>全システム接続中</div>
              <Activity size={24} className="text-cyan-500/50 ml-auto" />
            </div>
          </div>
        </div>

        {/* タブナビゲーション */}
        <div className="flex gap-6 border-b border-gray-800 text-sm font-bold text-gray-500">
          <div className="pb-2 border-b-2 border-cyan-400 text-white">「送金管理」</div>
          <div className="pb-2">「取引履歴」</div>
          <div className="pb-2">「バーチャルカード」</div>
          <div className="pb-2">「スマホATM」</div>
          <div className="pb-2">「口座管理」</div>
        </div>
      </header>

      <main className="px-6 py-4 space-y-4">
        <h2 className="text-xl font-bold mb-2">送金管理</h2>

        {/* 送金パケット追跡UI */}
        <div className="bg-[#151b2b] rounded-2xl p-5 border border-gray-800/50 relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold">送金先追跡リアルタイムパケット</h3>
            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full text-xs text-gray-300">
              <MapPin size={12} /> 現在: 東京決済ノード
            </div>
          </div>
          {/* パケットレール */}
          <div className="h-16 bg-cyan-950/20 rounded-lg border border-cyan-900/30 relative flex items-center px-4 overflow-hidden">
             {/* 進行状況バー */}
             <div 
               className="absolute left-0 top-0 bottom-0 bg-cyan-500/20 transition-all duration-500 ease-out border-r border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
               style={{ width: packetProgress + '%' }}
             />
             <div className="z-10 text-xs font-bold text-cyan-300 flex items-center gap-2">
               {sendStatus === "PENDING" && <><RefreshCw size={14} className="animate-spin" /> 送金パケット進行中 {packetProgress}%</>}
               {sendStatus === "SUCCESS" && <><CheckCircle size={14} className="text-emerald-400" /> 着金完了</>}
               {sendStatus === "IDLE" && <span className="text-gray-500">待機中...</span>}
             </div>
          </div>
          <div className="text-right mt-2 text-[10px] text-gray-500 tracking-widest">追跡ID: TRX-9382KX91・リアルタイムブロックチェーン同期</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* 送金フォーム */}
          <div className="bg-[#151b2b] rounded-2xl p-5 border border-gray-800/50">
            <h3 className="text-sm font-bold mb-4 flex justify-between">送金フォーム <span>...</span></h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border border-gray-600">
                <img src="https://i.pravatar.cc/100" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs text-gray-400">送金先: <span className="text-white font-bold text-sm">山田 太郎</span></div>
                <div className="text-xs text-gray-400">三井住友銀行 <span className="ml-2">最終歴: 7842</span></div>
              </div>
            </div>
            <input 
              type="number" 
              value={sendAmount}
              onChange={e=>setSendAmount(e.target.value)}
              placeholder="¥0" 
              className="w-full bg-transparent text-3xl font-bold text-white outline-none mb-4 placeholder-gray-600" 
            />
            <div className="flex gap-2 mb-4">
              {['50000', '100000', '250000'].map(a => (
                <button key={a} onClick={()=>setSendAmount(a)} className="flex-1 py-1.5 border border-gray-700 rounded-full text-xs font-bold text-gray-300 hover:bg-gray-800">¥{parseInt(a).toLocaleString()}</button>
              ))}
              <button className="flex-1 py-1.5 border border-gray-700 rounded-full text-xs font-bold text-gray-300 hover:bg-gray-800">全額</button>
            </div>
            <div className="text-xs text-gray-500 mb-4">Memo: 家賃振込 9月分</div>
            <button 
              onClick={executeTransfer}
              disabled={sendStatus === "PENDING"}
              className="w-full py-4 rounded-full font-bold text-black bg-gradient-to-r from-cyan-300 to-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.4)] active:scale-95 transition-transform disabled:opacity-50"
            >
              {sendStatus === "PENDING" ? "処理中..." : "今すぐ送金"}
            </button>
            <div className="text-center mt-3 text-[10px] text-cyan-500">リアルタイム着金（即時手数料無料）</div>
          </div>

          <div className="space-y-4">
            {/* バーチャルカード */}
            <div className="bg-[#151b2b] rounded-2xl p-5 border border-gray-800/50 flex flex-col items-center justify-center h-48 relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-blue-900/20 group-hover:scale-105 transition-transform" />
              <div className="w-4/5 h-24 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-3 relative shadow-xl border border-white/10 z-10">
                 <div className="text-[10px] font-bold text-right text-gray-300 mb-2">SÉLÈNE BANK</div>
                 <div className="w-6 h-4 bg-yellow-600/50 rounded-sm mb-2" />
                 <div className="text-sm tracking-[0.2em] font-mono text-gray-300">•••• •••• 4482</div>
                 <div className="text-[8px] text-gray-500 mt-1">有効期限 08/27</div>
              </div>
              <div className="z-10 mt-4 text-sm font-bold text-gray-300">タップでスマホATM利用</div>
            </div>

            {/* インフラ接続状況 */}
            <div className="bg-[#151b2b] rounded-2xl p-5 border border-gray-800/50 h-36 flex flex-col">
               <h3 className="text-sm font-bold mb-auto flex justify-between">リアルタイムインフラ接続 <span>...</span></h3>
               <div className="flex justify-around items-center mt-2 relative">
                 {/* 疑似コネクションライン */}
                 <div className="absolute inset-x-4 top-1/2 h-0.5 bg-cyan-900/50 -z-10" />
                 <div className="w-10 h-10 rounded-full bg-white/10 border border-cyan-500 flex items-center justify-center animate-pulse"><Server size={16} className="text-cyan-400" /></div>
                 <div className="text-[8px] text-cyan-500 text-center">Zengin同期<br/>0.03s</div>
                 <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500 flex items-center justify-center"><Database size={16} className="text-blue-400" /></div>
                 <div className="text-[8px] text-cyan-500 text-center">カード<br/>ネットワーク</div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
