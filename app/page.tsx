"use client";
import { useState } from "react";
import { Send, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function TCBUI() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  const [totalAssets, setTotalAssets] = useState(3490000000000000000);
  const [transferHistory, setTransferHistory] = useState<any[]>([]);

  // 送金関連
  const [sendTo, setSendTo] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [sendStatus, setSendStatus] = useState("");

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
      const res = await fetch("https://6663b41c.tcb-gateway-core.pages.dev/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "Tsukayama Century Bank",
          to: sendTo,
          amount: parseInt(sendAmount),
          memo: "通常送金"
        })
      });

      if (res.ok) {
        const newEntry = {
          date: new Date().toLocaleString("ja-JP"),
          to: sendTo,
          amount: parseInt(sendAmount),
          status: "完了"
        };

        setTransferHistory([newEntry, ...transferHistory]);
        setSendStatus(`✅ ${sendTo} に送金完了`);
        setSendAmount("");
        setTotalAssets(prev => prev - parseInt(sendAmount)); // 残高から減らす
      } else {
        setSendStatus("❌ 送金失敗");
      }
    } catch (e) {
      setSendStatus("❌ 送金失敗（ネットワークエラー）");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center p-6">
        <Card className="w-full max-w-md bg-[#111827] border border-cyan-500/30 p-10">
          <h1 className="text-4xl font-bold text-center mb-2">Tsukayama Century Bank</h1>
          <p className="text-cyan-400 text-center mb-10">S-Class Private Banking</p>
          <Input placeholder="ID" value={loginId} onChange={e => setLoginId(e.target.value)} className="mb-4" />
          <Input type="password" placeholder="Password" value={loginPw} onChange={e => setLoginPw(e.target.value)} className="mb-8" />
          <Button onClick={handleLogin} className="w-full h-12 text-lg bg-cyan-600 hover:bg-cyan-500">ログイン</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white p-8">
      <div className="max-w-2xl mx-auto">

        {/* 総資産 */}
        <div className="text-center mb-12">
          <div className="text-cyan-400 text-sm">総資産</div>
          <div className="text-6xl font-mono font-bold text-cyan-300">¥{totalAssets.toLocaleString()}</div>
        </div>

        {/* 送金カード */}
        <Card className="bg-gradient-to-br from-emerald-600 to-teal-700 mb-8">
          <CardContent className="p-8 text-center">
            <Send className="w-16 h-16 mx-auto mb-4 text-white" />
            <h2 className="text-3xl font-bold mb-6">送金</h2>

            <Input 
              placeholder="送金先（銀行名＋名義） 例: 住信SBI銀行 ツカヤマ カイト" 
              value={sendTo} 
              onChange={e => setSendTo(e.target.value)} 
              className="mb-4 text-black"
            />
            <Input 
              type="number" 
              placeholder="金額" 
              value={sendAmount} 
              onChange={e => setSendAmount(e.target.value)} 
              className="mb-6 text-black"
            />

            <Button onClick={executeSend} className="w-full h-14 text-lg bg-white text-black hover:bg-gray-200">
              今すぐ送金
            </Button>

            {sendStatus && <p className="mt-4 text-white font-medium">{sendStatus}</p>}
          </CardContent>
        </Card>

        {/* 取引履歴（通帳風） */}
        <Card className="bg-[#111827]">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">取引履歴</h3>
            {transferHistory.length > 0 ? (
              transferHistory.map((tx, i) => (
                <div key={i} className="flex justify-between py-4 border-b border-gray-700 last:border-0">
                  <div>
                    <div className="font-medium">{tx.to}</div>
                    <div className="text-xs text-gray-400">{tx.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-400 font-mono">-¥{tx.amount.toLocaleString()}</div>
                    <div className="text-xs text-emerald-400">{tx.status}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-12 text-gray-400">まだ取引がありません</p>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
