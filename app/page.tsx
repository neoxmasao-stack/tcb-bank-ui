"use client";
import { useState } from "react";
import { Send, Package, CreditCard } from "lucide-react";

export default function TCBUI() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  const [totalAssets] = useState(3490000000000000000);

  const [sendTo, setSendTo] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [sendStatus, setSendStatus] = useState("");

  const [moveFrom, setMoveFrom] = useState("");
  const [moveTo, setMoveTo] = useState("");
  const [moveStatus, setMoveStatus] = useState("");

  const handleLogin = () => {
    if (loginId === "Tsukayama century bank" && loginPw === "tcb@owner") {
      setIsLoggedIn(true);
    } else {
      alert("IDまたはパスワードが違います");
    }
  };

  const executeSend = () => {
    if (!sendTo || !sendAmount) return alert("送金先と金額を入力してください");
    setSendStatus(`✅ ${sendTo} に送金完了`);
    setSendAmount("");
  };

  const executeMove = () => {
    if (!moveFrom || !moveTo) return alert("移動元と移動先を入力してください");
    setMoveStatus(`✅ ${moveTo} に物理移動完了`);
    setMoveFrom("");
    setMoveTo("");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="bg-zinc-900 border border-zinc-700 p-10 rounded-3xl w-full max-w-md">
          <h1 className="text-4xl font-bold text-white text-center mb-3">Tsukayama Century Bank</h1>
          <p className="text-emerald-400 text-center mb-10">S-Class Private Banking</p>
          <input 
            placeholder="ID" 
            value={loginId} 
            onChange={e => setLoginId(e.target.value)} 
            className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl mb-4 text-white placeholder-zinc-500"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={loginPw} 
            onChange={e => setLoginPw(e.target.value)} 
            className="w-full p-4 bg-zinc-800 border border-zinc-700 rounded-xl mb-8 text-white placeholder-zinc-500"
          />
          <button 
            onClick={handleLogin} 
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-2xl"
          >
            ログイン
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-16">
          <div className="text-emerald-400 text-sm tracking-widest">総資産</div>
          <div className="text-7xl font-mono font-bold text-emerald-400">¥{totalAssets.toLocaleString()}</div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <button 
            onClick={executeSend}
            className="bg-gradient-to-br from-emerald-600 to-teal-700 h-56 flex flex-col items-center justify-center rounded-3xl hover:brightness-110 transition-all"
          >
            <Send className="w-16 h-16 mb-6" />
            <span className="text-2xl font-bold">送金</span>
          </button>

          <button 
            onClick={executeMove}
            className="bg-gradient-to-br from-amber-600 to-orange-700 h-56 flex flex-col items-center justify-center rounded-3xl hover:brightness-110 transition-all"
          >
            <Package className="w-16 h-16 mb-6" />
            <span className="text-2xl font-bold">物理移動</span>
          </button>

          <button 
            onClick={() => alert("✅ バーチャルカードを発行しました")}
            className="bg-gradient-to-br from-violet-600 to-purple-700 h-56 flex flex-col items-center justify-center rounded-3xl hover:brightness-110 transition-all"
          >
            <CreditCard className="w-16 h-16 mb-6" />
            <span className="text-2xl font-bold">バーチャルカード</span>
          </button>
        </div>
      </div>
    </div>
  );
}
