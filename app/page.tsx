"use client";
import { useState } from "react";
import { Send, CreditCard, Smartphone } from "lucide-react";

export default function FinalSeleneUI() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  const [totalAssets] = useState(4872340000);
  const [sendAmount, setSendAmount] = useState("");
  const [sendStatus, setSendStatus] = useState("");

  const quickAmounts = [50000, 100000, 250000];

  const handleLogin = () => {
    if (loginId === "Tsukayama century bank" && loginPw === "tcb@owner") {
      setIsLoggedIn(true);
    } else {
      alert("IDまたはパスワードが違います");
    }
  };

  const executeSend = () => {
    if (!sendAmount) return alert("金額を入力してください");
    setSendStatus("送信中...");
    setTimeout(() => {
      setSendStatus(`✅ ¥${parseInt(sendAmount).toLocaleString()} 送金完了`);
      setSendAmount("");
    }, 600);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center p-6">
        <div className="bg-[#111827] border border-cyan-400/30 p-10 rounded-3xl w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-white mb-2">Tsukayama Century Bank</h1>
          <p className="text-cyan-400 text-center mb-10">S-Class Private Banking</p>
          <input 
            placeholder="ID" 
            value={loginId} 
            onChange={e => setLoginId(e.target.value)} 
            className="w-full p-4 bg-black border border-cyan-400/30 rounded-2xl mb-4 text-white placeholder-zinc-500"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={loginPw} 
            onChange={e => setLoginPw(e.target.value)} 
            className="w-full p-4 bg-black border border-cyan-400/30 rounded-2xl mb-8 text-white placeholder-zinc-500"
          />
          <button 
            onClick={handleLogin} 
            className="w-full h-12 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-2xl"
          >
            ログイン
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      {/* Header */}
      <div className="px-6 py-5 flex justify-between items-center border-b border-cyan-400/20">
        <div className="text-2xl font-bold">資産管理</div>
        <div className="bg-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-sm font-medium flex items-center gap-2">
          ● SÉLÈNE SECURE
        </div>
      </div>

      {/* 総資産 */}
      <div className="px-8 pt-12 pb-8 text-center">
        <div className="text-cyan-400 text-sm tracking-widest">総資産</div>
        <div className="text-[3.8rem] font-mono font-bold text-cyan-300 leading-none">¥{totalAssets.toLocaleString()}</div>
        <div className="text-emerald-400 mt-4 flex items-center justify-center gap-2 text-lg">
          +¥128,900 (+2.7%) <span className="text-xs">今月 ↑</span>
        </div>
      </div>

      {/* 送金フォーム */}
      <div className="px-8 pb-8">
        <div className="bg-[#111827] rounded-3xl p-8">
          <div className="text-xl font-bold mb-6">送金</div>
          
          <input 
            type="number"
            placeholder="金額を入力"
            value={sendAmount}
            onChange={e => setSendAmount(e.target.value)}
            className="w-full bg-black border border-cyan-400/30 rounded-2xl p-6 text-5xl font-mono text-white mb-8 focus:outline-none focus:border-cyan-400"
          />

          <div className="grid grid-cols-4 gap-3 mb-8">
            {quickAmounts.map(amt => (
              <button
                key={amt}
                onClick={() => setSendAmount(amt.toString())}
                className="bg-zinc-800 hover:bg-zinc-700 py-4 rounded-2xl text-sm font-medium border border-zinc-700"
              >
                ¥{amt.toLocaleString()}
              </button>
            ))}
          </div>

          <button
            onClick={executeSend}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-6 rounded-3xl text-xl transition-all active:scale-95"
          >
            今すぐ送金
          </button>

          {sendStatus && <p className="text-center mt-6 text-emerald-400 font-medium">{sendStatus}</p>}
        </div>
      </div>

      {/* 下部アクション */}
      <div className="px-8 grid grid-cols-2 gap-6 pb-12">
        <div onClick={() => alert("✅ バーチャルカードを発行しました")} className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-8 text-center cursor-pointer hover:brightness-110 active:scale-95 transition-all">
          <CreditCard className="w-12 h-12 mx-auto mb-4" />
          <div className="font-bold text-lg">バーチャルカード</div>
        </div>
        <div className="bg-[#111827] rounded-3xl p-8 text-center">
          <Smartphone className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
          <div className="font-bold text-lg">スマホATM</div>
          <div className="text-xs text-gray-400">カメラで即時引き出し</div>
        </div>
      </div>
    </div>
  );
}
