/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Play, Sparkles, ShieldCheck, Zap, ArrowDown, HelpCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useAudio } from '../hooks/useAudio';

export function Hero() {
  const { playClick } = useAudio();

  const handleStartGame = () => {
    playClick();
    const gameSection = document.querySelector('#game-section');
    if (gameSection) {
      gameSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-blue/5 via-slate-50 to-white py-16 sm:py-24">
      {/* Dynamic Animated background particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-brand-orange/10 blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-2/3 h-56 w-56 rounded-full bg-brand-green/10 blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12"
        >
          {/* Left Text Column */}
          <div className="space-y-8 lg:col-span-7">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full bg-white pl-2 pr-3.5 py-1 text-xs font-bold text-brand-blue border border-slate-200 shadow-sm">
              <img src="/image/photo1.png" alt="暗光鳥" className="h-6 w-6 object-contain" />
              <span>新北市政府稅捐稽徵處 ‧ 互動學租稅</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h2
                variants={itemVariants}
                className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl leading-none"
              >
                解鎖牌照稅！
                <br />
                <span className="bg-gradient-to-r from-brand-blue via-[#1D4ED8] to-brand-orange bg-clip-text text-transparent font-display">
                  1分鐘超感官冒險
                </span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="max-w-2xl text-base text-slate-600 sm:text-lg leading-relaxed"
              >
                誰說學稅務只能讀硬梆梆的公告？
                <br />
                透過 3 大關卡挑戰，跟著電動車、小黃和普通機車一起解密！
                <span className="font-extrabold text-brand-blue"> 4月與10月開徵 </span>
                的祕密，輕鬆帶走「新北牌照稅達人」認證。
              </motion.p>
            </div>

            {/* CTA button and indicators */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <motion.button
                id="hero-play-btn"
                whileHover={{ scale: 1.05, shadow: '0 20px 25px -5px rgb(0 89 153 / 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartGame}
                className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-brand-blue to-indigo-700 px-8 py-4 font-extrabold text-white shadow-xl shadow-brand-blue/30 hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 cursor-pointer"
              >
                <Play className="h-5 w-5 fill-white" />
                <span className="text-base">立即啟動遊戲挑戰</span>
              </motion.button>

              <div className="flex items-center gap-4 px-2 text-slate-400 text-xs sm:border-l sm:border-slate-200">
                <div className="flex -space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white ring-2 ring-white">1</div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold text-white ring-2 ring-white">2</div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white ring-2 ring-white">3</div>
                </div>
                <span className="font-semibold text-slate-500">
                  簡單好懂 ‧ 3個極速小關卡
                </span>
              </div>
            </motion.div>

            {/* Bottom mini-grid with direct key info */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 border-t border-slate-200 pt-6">
              <div>
                <div className="text-xl font-extrabold text-brand-blue sm:text-2xl">0 門檻</div>
                <div className="text-xs text-slate-500 font-semibold">長輩小孩皆能秒懂</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-brand-green sm:text-2xl">100% 免費</div>
                <div className="text-xs text-slate-500 font-semibold">宣導牌照稅超有料</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-brand-orange sm:text-2xl">有認證</div>
                <div className="text-xs text-slate-500 font-semibold">完關即可下載勳章</div>
              </div>
            </motion.div>
          </div>

          {/* Right Floating Console Column */}
          <div className="relative lg:col-span-5">
            {/* The main Glassmorphic Floating Card */}
            <motion.div
              initial={{ transform: 'perspective(1000px) rotateY(-10deg) rotateX(10deg)', opacity: 0 }}
              animate={{ transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)', opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative rounded-[32px] border border-white bg-white/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
            >
              {/* Card Header decoration */}
              <div className="mb-6 flex items-center justify-between border-b border-slate-200/50 pb-4">
                <div className="flex items-center gap-2">
                  <img
                    src="/image/photo2.png"
                    alt="暗光鳥導遊"
                    className="h-8 w-8 object-contain animate-bounce"
                    style={{ animationDuration: '3s' }}
                  />
                  <span className="font-sans text-xs font-bold text-slate-800">
                    暗光鳥租稅導遊
                  </span>
                </div>
                <span className="font-mono text-xs text-brand-blue font-bold uppercase tracking-wider">
                  NTPC TAX GAME
                </span>
              </div>

              {/* Central graphics */}
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 tracking-wider font-semibold">GAME STATUS</span>
                    <span className="flex items-center gap-1.5 rounded-full bg-brand-green/20 px-2.5 py-0.5 text-[10px] font-bold text-brand-green">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-green animate-ping" />
                      準備就緒
                    </span>
                  </div>

                  <div className="my-4 text-center">
                    <div className="text-xs text-slate-400 font-medium">挑戰項目</div>
                    <div className="mt-1 font-sans text-xl font-extrabold tracking-wide text-brand-orange">
                      新北牌照稅智慧達人
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="rounded-lg bg-white/5 p-2">
                      <span className="text-slate-400 block mb-0.5">關卡時間</span>
                      <strong className="text-slate-200">60秒之內</strong>
                    </div>
                    <div className="rounded-lg bg-white/5 p-2">
                      <span className="text-slate-400 block mb-0.5">主題關卡</span>
                      <strong className="text-brand-green">3 大任務</strong>
                    </div>
                  </div>
                </div>

                {/* Info Card Row */}
                <div className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm flex gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">綠色低碳免稅！</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      新北市電動汽機車，符合規定者一律免徵使用牌照稅！環保、省稅一次擁有。
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-sm flex gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">官方宣導好安心</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      政府官方安全管道繳稅，超商、街口、台灣Pay一掃即付，安全、防詐最周全。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Extra overlapping decor badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 hidden rounded-2xl bg-brand-orange p-4 text-white shadow-xl shadow-brand-orange/20 md:block"
            >
              <Zap className="h-6 w-6 animate-pulse" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-brand-green p-3.5 text-white shadow-xl shadow-brand-green/20 md:block"
            >
              <span className="font-mono text-sm font-bold">免稅! ⚡</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll down indicator */}
        <div className="mt-12 flex justify-center">
          <motion.button
            onClick={handleStartGame}
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-blue-500 transition-colors"
          >
            <span>往下探索挑戰</span>
            <ArrowDown className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
