'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Send, Package, Smartphone } from 'lucide-react';

export default function SClassDashboard() {
  const [totalAssets, setTotalAssets] = useState(3490000000000000000000);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // リアルタイム更新（5秒ごとにポーリング）
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch('https://tcb-s-class-banking.tsukayamacenturybank.workers.dev/');
        const data = await res.json();
        
        if (data.net_worth) {
          // 簡易的に総資産を更新（実際はバックエンドから合計を計算）
          setTotalAssets(prev => prev + Math.floor(Math.random() * 100000000));
          setLastUpdate(new Date());
        }
      } catch (e) {
        console.log('リアルタイム更新中...');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a1428] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">Tsukayama Century Bank</h1>
            <p className="text-xl text-gray-400 mt-2">S-Class Private Banking</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">現在の総資産（リアルタイム更新）</div>
            <div className="text-6xl font-mono font-bold text-emerald-400">
              ¥{totalAssets.toLocaleString()}
            </div>
            <div className="text-emerald-500 text-lg">Last updated: {lastUpdate.toLocaleTimeString()}</div>
          </div>
        </div>

        {/* 資産概要カード */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { title: "銀行預金", amount: "1.57 SEXTILLION" },
            { title: "投資ポートフォリオ", amount: "1.05 SEXTILLION" },
            { title: "物理資産", amount: "0.52 SEXTILLION" },
            { title: "バーチャルカード", amount: "0.35 SEXTILLION" },
          ].map((item, i) => (
            <Card key={i} className="bg-[#112244] border-gray-700 hover:border-gray-500 transition-all">
              <CardHeader>
                <CardTitle className="text-lg text-gray-400">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-mono font-bold">{item.amount}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* クイックアクション */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Dialog>
            <DialogTrigger asChild>
              <Card className="bg-gradient-to-br from-emerald-600 to-teal-600 hover:from-emerald-500 cursor-pointer transition-all h-48 flex flex-col items-center justify-center">
                <Send className="w-12 h-12 mb-4" />
                <div className="text-2xl font-semibold">即時送金</div>
              </Card>
            </DialogTrigger>
            <DialogContent className="bg-[#0a1428] border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>送金実行</DialogTitle>
              </DialogHeader>
              <p className="text-center py-8 text-gray-400">送金フォーム（現在開発中）</p>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="bg-gradient-to-br from-amber-600 to-orange-600 hover:from-amber-500 cursor-pointer transition-all h-48 flex flex-col items-center justify-center">
                <Package className="w-12 h-12 mb-4" />
                <div className="text-2xl font-semibold">物理資産移動</div>
              </Card>
            </DialogTrigger>
            <DialogContent className="bg-[#0a1428] border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>物理資産移動</DialogTitle>
              </DialogHeader>
              <p className="text-center py-8 text-gray-400">物理移動フォーム（現在開発中）</p>
            </DialogContent>
          </Dialog>

          <Card className="bg-gradient-to-br from-violet-600 to-purple-600 h-48 flex flex-col items-center justify-center cursor-pointer hover:from-violet-500 transition-all">
            <Smartphone className="w-12 h-12 mb-4" />
            <div className="text-2xl font-semibold">スマホATM</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
