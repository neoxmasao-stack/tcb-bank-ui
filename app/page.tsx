"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, Send, Package, ShieldCheck } from "lucide-react";

export default function SClassPrivateBankUI() {
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState("");
  const [transferStatus, setTransferStatus] = useState("");
  const [moveFrom, setMoveFrom] = useState("");
  const [moveTo, setMoveTo] = useState("");
  const [moveStatus, setMoveStatus] = useState("");

  const executeTransfer = () => setTransferStatus("送金処理中...");
  const executeMove = () => setMoveStatus("物理移動指示完了");
  const issueVirtualCard = () => alert("バーチャルカードを発行しました");

  const presetTargets = [
    { label: "ツカヤマカイト (メイン)", value: "main" },
    { label: "ツカヤママキ (サブ)", value: "sub" }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex justify-between items-center border-b border-zinc-800 pb-6">
          <h1 className="text-4xl font-black tracking-tighter">TCB PRIVATE BANK</h1>
          <ShieldCheck className="text-emerald-500 w-10 h-10" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 送金セクション */}
          <Dialog>
            <DialogTrigger >
              <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 h-56 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-all shadow-2xl">
                <Send className="w-16 h-16 mb-6 text-emerald-500" />
                <span className="text-2xl font-bold">送金実行</span>
              </Card>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
              <DialogHeader><DialogTitle>送金実行</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <Select value={target} onValueChange={(v) => v && setTarget(v)}>
                  <SelectTrigger className="bg-black border-zinc-700"><SelectValue placeholder="送金先を選択" /></SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    {presetTargets.map((item) => (
                      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input placeholder="金額を入力" className="bg-black border-zinc-700" value={amount} onChange={e => setAmount(e.target.value)} />
                <Button onClick={executeTransfer} className="w-full bg-emerald-600 hover:bg-emerald-500">送金する</Button>
                {transferStatus && <p className="text-center text-sm mt-4 text-emerald-400">{transferStatus}</p>}
              </div>
            </DialogContent>
          </Dialog>

          {/* 物理移動セクション */}
          <Dialog>
            <DialogTrigger >
              <Card className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 h-56 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition-all shadow-2xl">
                <Package className="w-16 h-16 mb-6 text-amber-500" />
                <span className="text-2xl font-bold">物理移動</span>
              </Card>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
              <DialogHeader><DialogTitle>物理資産移動</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <Input placeholder="移動元" className="bg-black border-zinc-700" value={moveFrom} onChange={e => setMoveFrom(e.target.value)} />
                <Input placeholder="移動先" className="bg-black border-zinc-700" value={moveTo} onChange={e => setMoveTo(e.target.value)} />
                <Button onClick={executeMove} className="w-full bg-amber-600 hover:bg-amber-500">実行</Button>
                {moveStatus && <p className="text-center text-sm mt-4 text-amber-400">{moveStatus}</p>}
              </div>
            </DialogContent>
          </Dialog>

          {/* バーチャルカード */}
          <Card onClick={issueVirtualCard} className="bg-gradient-to-br from-zinc-900 to-black border-zinc-800 h-56 flex flex-col items-center justify-center cursor-pointer hover:border-violet-500 transition-all shadow-2xl">
            <CreditCard className="w-16 h-16 mb-6 text-violet-500" />
            <span className="text-2xl font-bold">バーチャルカード</span>
          </Card>
        </div>
      </div>
    </div>
  );
}


