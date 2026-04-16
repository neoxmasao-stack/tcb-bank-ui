"use client";
import { useState } from "react";
import { Send, Package, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function SimpleTCB() {
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

  const executeSend = async () => {
    if (!sendTo || !sendAmount) return alert("送金先と金額を入力してください");
    setSendStatus("送信中...");
    try {
      await fetch("https://6663b41c.tcb-gateway-core.pages.dev/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: "TCB", to: sendTo, amount: parseInt(sendAmount) })
      });
      setSendStatus(`✅ ${sendTo} に送金完了`);
      setSendAmount("");
    } catch {
      setSendStatus("❌ 送金失敗");
    }
  };

  const executeMove = async () => {
    if (!moveFrom || !moveTo) return alert("移動元と移動先を入力してください");
    setMoveStatus("送信中...");
    try {
      await fetch("https://6663b41c.tcb-gateway-core.pages.dev/move-physical", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from_asset: moveFrom, to_asset: moveTo, quantity: "50000000" })
      });
      setMoveStatus(`✅ ${moveTo} に物理移動完了`);
      setMoveFrom("");
      setMoveTo("");
    } catch {
      setMoveStatus("❌ 移動失敗");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center">
        <Card className="w-full max-w-md bg-[#111827] p-10 border border-cyan-500/30">
          <h1 className="text-4xl font-bold text-center mb-2">Tsukayama Century Bank</h1>
          <p className="text-cyan-400 text-center mb-8">S-Class Private Banking</p>
          <Input placeholder="ID" value={loginId} onChange={e => setLoginId(e.target.value)} className="mb-4" />
          <Input type="password" placeholder="Password" value={loginPw} onChange={e => setLoginPw(e.target.value)} className="mb-6" />
          <Button onClick={handleLogin} className="w-full h-12 bg-cyan-600">ログイン</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-12">
          <div className="text-cyan-400">総資産</div>
          <div className="text-6xl font-mono font-bold text-cyan-300">¥{totalAssets.toLocaleString()}</div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Dialog>
            <DialogTrigger>
              <Card className="bg-gradient-to-br from-emerald-600 to-teal-700 h-56 flex flex-col items-center justify-center cursor-pointer hover:brightness-110">
                <Send className="w-16 h-16 mb-6" />
                <span className="text-2xl font-bold">送金</span>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>送金</DialogTitle></DialogHeader>
              <Input placeholder="送金先" value={sendTo} onChange={e => setSendTo(e.target.value)} className="mb-3" />
              <Input type="number" placeholder="金額" value={sendAmount} onChange={e => setSendAmount(e.target.value)} />
              <Button onClick={executeSend} className="w-full">送金する</Button>
              {sendStatus && <p className="text-center mt-4">{sendStatus}</p>}
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger>
              <Card className="bg-gradient-to-br from-amber-600 to-orange-700 h-56 flex flex-col items-center justify-center cursor-pointer hover:brightness-110">
                <Package className="w-16 h-16 mb-6" />
                <span className="text-2xl font-bold">物理移動</span>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>物理移動</DialogTitle></DialogHeader>
              <Input placeholder="移動元" value={moveFrom} onChange={e => setMoveFrom(e.target.value)} className="mb-3" />
              <Input placeholder="移動先" value={moveTo} onChange={e => setMoveTo(e.target.value)} />
              <Button onClick={executeMove} className="w-full">実行</Button>
              {moveStatus && <p className="text-center mt-4">{moveStatus}</p>}
            </DialogContent>
          </Dialog>

          <Card onClick={() => alert("バーチャルカード発行完了")} className="bg-gradient-to-br from-violet-600 to-purple-700 h-56 flex flex-col items-center justify-center cursor-pointer hover:brightness-110">
            <CreditCard className="w-16 h-16 mb-6" />
            <span className="text-2xl font-bold">バーチャルカード</span>
          </Card>
        </div>
      </div>
    </div>
  );
}
