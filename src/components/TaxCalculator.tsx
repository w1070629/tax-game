/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calculator, Info, Car, Bike, Zap, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '../hooks/useAudio';
import { VEHICLE_TAX_TABLE } from '../constants/taxData';

export function TaxCalculator() {
  const { playClick } = useAudio();
  const [vehicleType, setVehicleType] = useState<'car' | 'motorcycle' | 'ev'>('car');
  const [ccRange, setCcRange] = useState<string>('1201cc - 1800cc');

  const handleTypeChange = (type: 'car' | 'motorcycle' | 'ev') => {
    playClick();
    setVehicleType(type);
    if (type === 'car') {
      setCcRange('1201cc - 1800cc');
    } else if (type === 'motorcycle') {
      setCcRange('150cc 以下');
    } else {
      setCcRange('不限排氣量 (符合規定)');
    }
  };

  const handleCcChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    playClick();
    setCcRange(e.target.value);
  };

  // Find tax rule based on states
  const getTaxRule = () => {
    const typeLabel =
      vehicleType === 'car'
        ? '轎車 (自用)'
        : vehicleType === 'motorcycle'
        ? '機車'
        : '電動車 (自用)';

    return (
      VEHICLE_TAX_TABLE.find(
        (r) => r.type === typeLabel && r.ccRange === ccRange
      ) || { type: '', ccRange: '', yearlyTax: 0 }
    );
  };

  const rule = getTaxRule();

  const carOptions = [
    '500cc 以下',
    '501cc - 600cc',
    '601cc - 1200cc',
    '1201cc - 1800cc',
    '1801cc - 2400cc',
    '2401cc - 3000cc',
    '3001cc - 4200cc'
  ];

  const motoOptions = [
    '150cc 以下',
    '151cc - 250cc',
    '251cc - 500cc',
    '501cc - 600cc',
    '601cc - 1800cc'
  ];

  return (
    <section id="calculator-section" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="rounded-full bg-brand-green/5 px-3.5 py-1 text-xs font-bold text-brand-green border border-brand-green/10">
          💰 1秒查稅額
        </span>
        <h3 className="text-3xl font-black tracking-tight text-slate-900 mt-3 font-display">
          使用牌照稅額試算器
        </h3>
        <p className="mt-2 text-sm text-slate-500 font-medium">
          點選您的車輛類型與排氣量，立刻獲得本年度應納稅金資訊！
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl">
        {/* Left Input panel (7 columns) */}
        <div className="space-y-6 lg:col-span-7">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              1. 選擇交通工具類型：
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleTypeChange('car')}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4.5 text-center transition-all cursor-pointer ${
                  vehicleType === 'car'
                    ? 'border-brand-blue bg-brand-blue/5 text-brand-blue shadow-sm ring-1 ring-brand-blue/20 font-bold'
                    : 'border-slate-100 bg-slate-50 hover:bg-slate-100/50 text-slate-500'
                }`}
              >
                <Car className="h-6 w-6" />
                <span className="text-xs font-bold">自用小客車</span>
              </button>

              <button
                onClick={() => handleTypeChange('motorcycle')}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4.5 text-center transition-all cursor-pointer ${
                  vehicleType === 'motorcycle'
                    ? 'border-brand-green bg-brand-green/5 text-brand-green shadow-sm ring-1 ring-brand-green/20 font-bold'
                    : 'border-slate-100 bg-slate-50 hover:bg-slate-100/50 text-slate-500'
                }`}
              >
                <Bike className="h-6 w-6" />
                <span className="text-xs font-bold">一般機車</span>
              </button>

              <button
                onClick={() => handleTypeChange('ev')}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4.5 text-center transition-all cursor-pointer ${
                  vehicleType === 'ev'
                    ? 'border-brand-orange bg-brand-orange/5 text-brand-orange shadow-sm ring-1 ring-brand-orange/20 font-bold'
                    : 'border-slate-100 bg-slate-50 hover:bg-slate-100/50 text-slate-500'
                }`}
              >
                <Zap className="h-6 w-6" />
                <span className="text-xs font-bold">電動汽機車</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {vehicleType !== 'ev' && (
              <motion.div
                key="cc-selection"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 overflow-hidden"
              >
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  2. 選擇引擎排氣量 (cc數)：
                </label>
                <select
                  value={ccRange}
                  onChange={handleCcChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-semibold text-slate-700 shadow-inner focus:border-blue-500 focus:outline-none transition-all cursor-pointer"
                >
                  {vehicleType === 'car'
                    ? carOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))
                    : motoOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                </select>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-500 space-y-1">
            <span className="font-bold text-brand-blue block">💡 課稅知識小叮嚀：</span>
            <p>1. 牌照稅是以「汽缸排氣量」之大小來區分課徵級距。</p>
            <p>2. 排氣量在 150cc（含）以下的機車，新北市一律免徵使用牌照稅。</p>
            <p>3. 符合減免規定之電動車，目前可享有牌照稅免徵優惠，省荷包又響應環保！</p>
          </div>
        </div>

        {/* Right Output details display panel (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-lg shadow-slate-900/20 relative overflow-hidden">
          {/* Abstract background graphics */}
          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-brand-blue/20 blur-2xl pointer-events-none" />

          {/* Mascot watermark in the bottom-right corner */}
          <div className="absolute -bottom-4 -right-4 opacity-15 h-32 w-32 pointer-events-none select-none">
            <img src="/image/photo6.png" alt="暗光鳥浮水印" className="h-full w-full object-contain" />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold text-slate-200 w-max">
                <Calculator className="h-3.5 w-3.5" />
                計算結果
              </span>
              <img
                src="/image/photo6.png"
                alt="暗光鳥試算"
                className="h-10 w-auto object-contain shrink-0 animate-pulse"
              />
            </div>

            <div>
              <span className="text-xs text-slate-400 block font-medium">車輛類型 ＆ 規格級距</span>
              <strong className="text-base text-white tracking-wide mt-1 block">
                {vehicleType === 'car' ? '🚗 自用小客車' : vehicleType === 'motorcycle' ? '🛵 一般重機/普通機車' : '⚡ 綠能電動汽機車'} ({ccRange})
              </strong>
            </div>

            <div className="border-t border-white/10 pt-4">
              <span className="text-xs text-slate-400 block font-medium">本年度應納牌照稅金</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xs font-semibold text-brand-orange">NT$</span>
                <span className="text-3xl font-black text-brand-orange font-mono tracking-tight">
                  {rule.yearlyTax === 0 ? '0' : rule.yearlyTax.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 font-medium ml-1">元 / 每年</span>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-4 space-y-2.5">
            {rule.yearlyTax === 0 ? (
              <div className="flex items-start gap-2 text-xs text-brand-green bg-brand-green/10 rounded-xl p-3 border border-brand-green/20">
                <CheckCircle className="h-4.5 w-4.5 shrink-0 text-brand-green" />
                <p className="leading-relaxed">
                  <strong>符合新北市免稅資格！</strong> 您完全不需要繳納使用牌照稅唷。響應減碳與小排量，真棒！
                </p>
              </div>
            ) : (
              <div className="flex items-start gap-2 text-xs text-brand-orange bg-brand-orange/10 rounded-xl p-3 border border-brand-orange/20">
                <Info className="h-4.5 w-4.5 shrink-0 text-brand-orange" />
                <p className="leading-relaxed">
                  此為每年 4 月份應繳納稅額。建議您利用<strong>掃描稅單 QR-Code 行動支付</strong>或<strong>超商繳款</strong>，1 分鐘就能輕鬆完成喔！
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
