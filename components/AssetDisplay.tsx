'use client';
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
export default function AssetDisplay({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const sv = useSpring(mv, { damping: 20, stiffness: 100 });
  const display = useTransform(sv, (v) => Math.floor(v).toLocaleString());
  useEffect(() => { mv.set(value); }, [value]);
  // motion.span を使い、animated な値を反映させる
  return (
    <div className="text-6xl font-mono font-bold text-cyan-300 drop-shadow-[0_0_15px_#00F0FF]">
      ¥<motion.span>{display}</motion.span>
    </div>
  );
}
