/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Zap,
  Car,
  Bike,
  IdCard,
  ArrowRight,
  RotateCcw,
  Trophy,
  Timer as TimerIcon,
  Check,
  X,
  Star,
  Store,
  Smartphone,
  CreditCard,
  Cpu,
  Globe,
  Mail,
  ShieldAlert,
  UserX,
  Sparkles,
  Info,
  Calendar,
  AlertTriangle,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '../hooks/useAudio';
import {
  VEHICLE_CARDS,
  TAX_CATEGORIES,
  TRIVIA_QUESTIONS,
  PAYMENT_CHANNELS
} from '../constants/taxData';
import { VehicleCard, TaxCategory, PaymentChannel } from '../types';

// Map string representation to actual Lucide Icon Component
const iconMap: Record<string, React.ComponentType<any>> = {
  Zap,
  Car,
  Bike,
  IdCard,
  Store,
  Smartphone,
  CreditCard,
  Cpu,
  Globe,
  Mail,
  ShieldAlert,
  UserX
};

export function GameZone() {
  const { playClick, playCorrect, playCatchCorrect, playWrong, playFanfare } = useAudio();

  // Game Core States
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'completed'>('welcome');
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [playerName, setPlayerName] = useState('');
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Stage 1 States (Classification Matching)
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCard | null>(null);
  const [matchedVehicles, setMatchedVehicles] = useState<Record<string, string>>({}); // vehicleId -> categoryId
  const [stage1Error, setStage1Error] = useState<string | null>(null);

  // Stage 2 States (Trivia Quiz)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  // Stage 3 States (Catching Safe Channels)
  const [stage3Timer, setStage3Timer] = useState(12); // 12 seconds rapid tapping
  const [activeChannels, setActiveChannels] = useState<(PaymentChannel & { x: number; y: number; id_inst: string; scale: number })[]>([]);
  const [clickedChannels, setClickedChannels] = useState<string[]>([]); // id_inst
  const [stage3Score, setStage3Score] = useState(0);
  const stage3IntervalRef = useRef<NodeJS.Timeout | null>(null);
  const stage3TimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Game Timer
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Stage 3 Game Loop
  const spawnChannel = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * PAYMENT_CHANNELS.length);
    const template = PAYMENT_CHANNELS[randomIndex];
    const id_inst = `${template.id}_${Date.now()}_${Math.random()}`;

    // Random placement coordinates within active zone
    const x = Math.floor(Math.random() * 70) + 15; // 15% to 85%
    const y = Math.floor(Math.random() * 60) + 15; // 15% to 75%
    const scale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2 scale variation

    setActiveChannels((prev) => [...prev, { ...template, x, y, id_inst, scale }]);

    // Auto remove channel after 3 seconds if not clicked
    setTimeout(() => {
      setActiveChannels((prev) => prev.filter((item) => item.id_inst !== id_inst));
    }, 2800);
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && stage === 3) {
      // Start Stage 3 countdown
      setStage3Timer(12);
      setActiveChannels([]);
      setClickedChannels([]);
      setStage3Score(0);

      stage3IntervalRef.current = setInterval(() => {
        spawnChannel();
      }, 900);

      stage3TimerRef.current = setInterval(() => {
        setStage3Timer((prev) => {
          if (prev <= 1) {
            // Stage 3 ends
            clearInterval(stage3IntervalRef.current!);
            clearInterval(stage3TimerRef.current!);
            // Proceed to completed
            setTimeout(() => {
              handleEndGame();
            }, 800);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (stage3IntervalRef.current) clearInterval(stage3IntervalRef.current);
      if (stage3TimerRef.current) clearInterval(stage3TimerRef.current);
    };
  }, [stage, gameState, spawnChannel]);

  // Reset Game
  const handleReset = () => {
    playClick();
    setGameState('welcome');
    setStage(1);
    setScore(0);
    setTimeElapsed(0);
    setSelectedVehicle(null);
    setMatchedVehicles({});
    setStage1Error(null);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setQuizAnswered(false);
    setCorrectAnswersCount(0);
    setStage3Timer(12);
    setActiveChannels([]);
    setClickedChannels([]);
    setStage3Score(0);
  };

  const handleStartGame = () => {
    if (!playerName.trim()) {
      playWrong();
      alert('請先輸入您的暱稱，以便為您製作專屬的「達人榮譽勳章」喔！');
      return;
    }
    playClick();
    setGameState('playing');
    setStage(1);
    setScore(0);
    setTimeElapsed(0);
    setMatchedVehicles({});
    setSelectedVehicle(null);
  };

  // Stage 1 Click Matching Logic
  const handleSelectVehicle = (vehicle: VehicleCard) => {
    if (matchedVehicles[vehicle.id]) return; // Already matched
    playClick();
    setSelectedVehicle(vehicle);
    setStage1Error(null);
  };

  const handleSelectCategory = (category: TaxCategory) => {
    if (!selectedVehicle) {
      playWrong();
      setStage1Error('💡 請先點選左方的車輛，再配對到適合的牌照稅開徵區！');
      return;
    }

    if (selectedVehicle.correctCategoryId === category.id) {
      // Correct Match
      playCorrect();
      setMatchedVehicles((prev) => ({ ...prev, [selectedVehicle.id]: category.id }));
      setScore((prev) => prev + 10);
      setSelectedVehicle(null);
      setStage1Error(null);

      // Check if Stage 1 complete (all 4 vehicles matched)
      const newMatchesCount = Object.keys(matchedVehicles).length + 1;
      if (newMatchesCount === VEHICLE_CARDS.length) {
        setTimeout(() => {
          setStage(2);
        }, 1000);
      }
    } else {
      // Wrong Match
      playWrong();
      setStage1Error(`❌ 配對錯誤！「${selectedVehicle.name}」分類到「${category.title}」是不正確的喔。再試一次！`);
      setSelectedVehicle(null);
    }
  };

  // Stage 2 Trivia Quiz Logic
  const handleSelectOption = (optionIndex: number) => {
    if (quizAnswered) return;
    setSelectedOption(optionIndex);
    setQuizAnswered(true);

    const isCorrect = optionIndex === TRIVIA_QUESTIONS[currentQuestionIndex].correctIndex;
    if (isCorrect) {
      playCorrect();
      setScore((prev) => prev + 15);
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      playWrong();
    }
  };

  const handleNextQuestion = () => {
    playClick();
    setSelectedOption(null);
    setQuizAnswered(false);

    if (currentQuestionIndex < TRIVIA_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Go to Stage 3
      setStage(3);
    }
  };

  // Stage 3 Catch Payment Channel Logic
  const handleCatchChannel = (item: PaymentChannel & { id_inst: string }) => {
    if (clickedChannels.includes(item.id_inst)) return;
    setClickedChannels((prev) => [...prev, item.id_inst]);

    if (item.isCorrect) {
      playCatchCorrect();
      setStage3Score((prev) => prev + 3);
      setScore((prev) => Math.min(prev + 3, 100)); // Cap total score at 100
    } else {
      playWrong();
      setStage3Score((prev) => prev - 3);
      setScore((prev) => Math.max(prev - 3, 0));
    }

    // Instantly remove after click animation
    setTimeout(() => {
      setActiveChannels((prev) => prev.filter((c) => c.id_inst !== item.id_inst));
    }, 150);
  };

  // Final End of Game
  const handleEndGame = () => {
    playFanfare();
    setGameState('completed');
  };

  // Helper star calculation
  const getStars = () => {
    if (score >= 90) return 5;
    if (score >= 75) return 4;
    if (score >= 60) return 3;
    return 2;
  };

  return (
    <section id="game-section" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Title Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl font-display">
          🎯 新北牌照稅冒險挑戰賽
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-medium">
          全台首創！親切好玩、三大關卡，解開牌照稅的奧秘！
        </p>
      </div>

      <div className="relative rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden min-h-[500px]">
        {/* State Banner / Topbar */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-extrabold text-brand-blue">
              {gameState === 'welcome' && '🎮 未登入'}
              {gameState === 'playing' && `關卡 ${stage}/3`}
              {gameState === 'completed' && '🏆 挑戰完成'}
            </span>
            {gameState === 'playing' && (
              <span className="hidden font-medium text-slate-600 text-xs sm:inline">
                {stage === 1 && '第一關：車輛大配對（請為交通工具分類）'}
                {stage === 2 && '第二關：租稅智慧大作戰（回答稅務小問題）'}
                {stage === 3 && '第三關：繳稅渠道神射手（點擊正確繳稅管道）'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Trophy className="h-4.5 w-4.5 text-orange-500" />
              <span className="text-xs font-semibold">當前積分：</span>
              <span className="font-mono text-sm font-bold text-slate-800">{score}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <TimerIcon className="h-4.5 w-4.5 text-indigo-500" />
              <span className="text-xs font-semibold">累計時間：</span>
              <span className="font-mono text-sm font-bold text-slate-800">{timeElapsed} 秒</span>
            </div>
          </div>
        </div>

        {/* Content Screens */}
        <div className="p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {/* SCREEN 1: WELCOME */}
            {gameState === 'welcome' && (
              <motion.div
                key="welcome-screen"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mx-auto max-w-md text-center py-6 space-y-6"
              >
                <div className="mx-auto flex flex-col items-center">
                  <img
                    src="/image/photo4.png"
                    alt="暗光鳥遊戲特工"
                    className="h-28 w-auto object-contain animate-bounce"
                    style={{ animationDuration: '3.5s' }}
                  />
                </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-800">登錄特工暱稱</h3>
              <p className="text-xs text-slate-400">
                請輸入大名，挑戰結束後將自動為您刻印專屬的「新北牌照稅達人」勳章！
              </p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                maxLength={10}
                placeholder="例如：新北小開 / 節能綠能推手..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-center text-sm font-semibold text-slate-800 placeholder-slate-400 shadow-inner focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue transition-all"
              />

              <motion.button
                id="game-start-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStartGame}
                className="w-full rounded-2xl bg-brand-blue py-4 font-bold text-white shadow-lg hover:bg-brand-blue/90 transition-all cursor-pointer animate-pulse"
              >
                開始租稅冒險旅程
              </motion.button>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-left border border-slate-150 space-y-1.5">
              <span className="text-[11px] font-bold text-brand-blue block">🎮 遊戲規則指南：</span>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    1. <strong>第一關 (車輛大配對)：</strong> 點選左側車輛，再點選右側符合的稅收政策區，即可成功。
                  </p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    2. <strong>第二關 (智慧大作戰)：</strong> 3 題實用牌照稅觀念是非題，答對獲得豐厚分數！
                  </p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    3. <strong>第三關 (繳稅神射手)：</strong> 在12秒內快速點擊畫面上飛舞的安全繳款方式（如街口、超商），不可誤點虛假詐騙連結！
                  </p>
                </div>
              </motion.div>
            )}

            {/* SCREEN 2: PLAYING - STAGE 1 (Classification Matching) */}
            {gameState === 'playing' && stage === 1 && (
              <motion.div
                key="stage1-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 py-4"
              >
                <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 text-center">
                  <span className="text-xs font-bold text-amber-800">
                    💡 第一關挑戰：車輛大配對（點選交通工具，再點選右側對應的課稅/免稅種類）
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                  {/* Left Column: Vehicle Cards */}
                  <div className="space-y-3.5 md:col-span-5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      🚗 待分類車輛：
                    </span>
                    {VEHICLE_CARDS.map((vehicle) => {
                      const isMatched = matchedVehicles[vehicle.id] !== undefined;
                      const isSelected = selectedVehicle?.id === vehicle.id;
                      const IconComp = iconMap[vehicle.imageIcon];

                      return (
                        <motion.button
                          key={vehicle.id}
                          whileHover={isMatched ? {} : { scale: 1.02 }}
                          whileTap={isMatched ? {} : { scale: 0.98 }}
                          onClick={() => handleSelectVehicle(vehicle)}
                          disabled={isMatched}
                          className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all ${
                            isMatched
                              ? 'border-slate-100 bg-slate-50/50 text-slate-300 cursor-not-allowed opacity-50'
                              : isSelected
                              ? 'border-brand-blue bg-brand-blue/10 text-brand-blue shadow-md ring-2 ring-brand-blue/20'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50/50 hover:shadow-sm'
                          }`}
                        >
                          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                            isMatched ? 'bg-slate-100 text-slate-300' : isSelected ? 'bg-brand-blue text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {IconComp && <IconComp className="h-5.5 w-5.5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-extrabold truncate">{vehicle.name}</h4>
                            <p className="text-[10px] text-slate-400 mt-0.5 truncate">{vehicle.description}</p>
                          </div>
                          {isMatched && (
                            <span className="rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-600">
                              配對成功
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Middle decoration indicator arrow */}
                  <div className="hidden items-center justify-center md:flex md:col-span-1">
                    <ArrowRight className="h-6 w-6 text-slate-300 animate-pulse" />
                  </div>

                  {/* Right Column: Tax Categories */}
                  <div className="space-y-4 md:col-span-6">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      🏛️ 課稅種類政策區：
                    </span>
                    {TAX_CATEGORIES.map((category) => {
                      // Find vehicles currently matched to this category
                      const itemsInThisCategory = VEHICLE_CARDS.filter(
                        (v) => matchedVehicles[v.id] === category.id
                      );

                      return (
                        <motion.div
                          key={category.id}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => handleSelectCategory(category)}
                          className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4.5 hover:bg-slate-50/80 hover:border-slate-300 transition-all cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-slate-800">{category.title}</h4>
                            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              category.id === 'exempt' ? 'bg-brand-green/10 text-brand-green' : category.id === 'april' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-brand-orange/10 text-brand-orange'
                            }`}>
                              {category.badge}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">{category.description}</p>

                          {/* Render vehicles placed inside this category */}
                          {itemsInThisCategory.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {itemsInThisCategory.map((v) => {
                                const IconComp = iconMap[v.imageIcon];
                                return (
                                  <span key={v.id} className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600 shadow-sm">
                                    {IconComp && <IconComp className="h-3 w-3 text-slate-400" />}
                                    {v.name}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Error Overlay / Tip message */}
                {stage1Error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-rose-50 border border-rose-100 p-3.5 text-center text-xs font-semibold text-rose-700"
                  >
                    {stage1Error}
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* SCREEN 3: PLAYING - STAGE 2 (Trivia Quiz) */}
            {gameState === 'playing' && stage === 2 && (
              <motion.div
                key="stage2-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-2xl mx-auto py-4 space-y-6"
              >
                <div className="rounded-2xl bg-brand-blue/5 border border-brand-blue/10 p-4 text-center">
                  <span className="text-xs font-bold text-brand-blue">
                    💡 第二關挑戰：牌照稅智慧大考驗（問題 {currentQuestionIndex + 1} / 3）
                  </span>
                </div>

                {/* Question Display Card */}
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md md:p-8 space-y-6">
                  <h4 className="text-base font-extrabold text-slate-800 leading-relaxed">
                    Q: {TRIVIA_QUESTIONS[currentQuestionIndex].question}
                  </h4>

                  {/* Options List */}
                  <div className="space-y-3.5">
                    {TRIVIA_QUESTIONS[currentQuestionIndex].options.map((option, index) => {
                      const isSelected = selectedOption === index;
                      const isCorrect = index === TRIVIA_QUESTIONS[currentQuestionIndex].correctIndex;
                      const showCorrectStyles = quizAnswered && isCorrect;
                      const showWrongStyles = quizAnswered && isSelected && !isCorrect;

                      return (
                        <motion.button
                          key={index}
                          disabled={quizAnswered}
                          whileHover={quizAnswered ? {} : { scale: 1.01 }}
                          whileTap={quizAnswered ? {} : { scale: 0.99 }}
                          onClick={() => handleSelectOption(index)}
                          className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition-all ${
                            showCorrectStyles
                              ? 'border-brand-green bg-brand-green/5 text-brand-green shadow-sm font-bold'
                              : showWrongStyles
                              ? 'border-rose-500 bg-rose-50/80 text-rose-800'
                              : isSelected
                              ? 'border-brand-blue bg-brand-blue/5 text-brand-blue'
                              : quizAnswered
                              ? 'border-slate-100 bg-slate-50/50 text-slate-400 cursor-not-allowed opacity-60'
                              : 'border-slate-200 bg-slate-50 hover:bg-slate-100/50 text-slate-700'
                          }`}
                        >
                          <span className="text-xs sm:text-sm font-medium">{option}</span>
                          {quizAnswered && isCorrect && (
                            <span className="rounded-full bg-emerald-500 p-1 text-white shrink-0">
                              <Check className="h-4.5 w-4.5 stroke-[3]" />
                            </span>
                          )}
                          {quizAnswered && isSelected && !isCorrect && (
                            <span className="rounded-full bg-rose-500 p-1 text-white shrink-0">
                              <X className="h-4.5 w-4.5 stroke-[3]" />
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Post-Answer Explanation Overlay */}
                  <AnimatePresence>
                    {quizAnswered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border-t border-slate-200 pt-5 space-y-4"
                      >
                        <div className="rounded-2xl bg-brand-blue/5 p-4.5 text-xs leading-relaxed text-slate-600 space-y-1">
                          <strong className="text-brand-blue font-bold flex items-center gap-1.5 mb-1.5 text-xs">
                            <Info className="h-4 w-4" /> 知識補充說明：
                          </strong>
                          <p>{TRIVIA_QUESTIONS[currentQuestionIndex].explanation}</p>
                        </div>

                        <div className="rounded-2xl bg-amber-50 border border-amber-100/60 p-4 text-xs font-semibold text-amber-800 flex gap-2">
                          <span className="shrink-0">🚀</span>
                          <p>{TRIVIA_QUESTIONS[currentQuestionIndex].tip}</p>
                        </div>

                        <div className="flex justify-end">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleNextQuestion}
                            className="flex items-center gap-1.5 rounded-xl bg-brand-blue px-5.5 py-2.5 text-xs font-bold text-white shadow hover:bg-brand-blue/90 transition-all cursor-pointer"
                          >
                            <span>
                              {currentQuestionIndex < TRIVIA_QUESTIONS.length - 1 ? '進入下一題' : '進入最後一關！'}
                            </span>
                            <ArrowRight className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* SCREEN 4: PLAYING - STAGE 3 (Catching Channels) */}
            {gameState === 'playing' && stage === 3 && (
              <motion.div
                key="stage3-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 py-4"
              >
                <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4 text-center">
                  <span className="text-xs font-bold text-emerald-800">
                    💡 最終挑戰：繳稅管道神射手（安全管道拿點數 +3，紅色詐騙請不要點擊否則 -3！）
                  </span>
                </div>

                {/* Dashboard stats */}
                <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-center">
                  <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-bold">第三關剩餘時間</span>
                    <strong className="text-base text-rose-600 font-mono font-black">{stage3Timer} 秒</strong>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-bold">本關取得積分</span>
                    <strong className="text-base text-emerald-600 font-mono font-black">{stage3Score} 分</strong>
                  </div>
                </div>

                {/* Interactive Falling Area */}
                <div className="relative w-full h-[360px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-inner">
                  {/* Grid Lines for cyber effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                  {activeChannels.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center pointer-events-none">
                      <p className="text-xs text-slate-500 animate-pulse">
                        🎯 氣泡隨機飄出，請快速點擊安全的超商、行動支付等綠色按鈕！
                      </p>
                    </div>
                  )}

                  <AnimatePresence>
                    {activeChannels.map((item) => {
                      const IconComp = iconMap[item.icon];
                      const isCorrect = item.isCorrect;
                      const isClicked = clickedChannels.includes(item.id_inst);

                      if (isClicked) return null;

                      return (
                        <motion.button
                          key={item.id_inst}
                          initial={{ opacity: 0, scale: 0.3 }}
                          animate={{ opacity: 1, scale: item.scale }}
                          exit={{ opacity: 0, scale: 0.2 }}
                          onClick={() => handleCatchChannel(item)}
                          style={{
                            position: 'absolute',
                            left: `${item.x}%`,
                            top: `${item.y}%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                          className={`z-20 flex flex-col items-center gap-1 rounded-2xl border px-3 py-2.5 shadow-lg select-none cursor-pointer transition-transform ${
                            isCorrect
                              ? 'border-emerald-500/80 bg-emerald-950/80 text-emerald-300 shadow-emerald-950/30'
                              : 'border-rose-500/80 bg-rose-950/80 text-rose-300 shadow-rose-950/30'
                          }`}
                        >
                          <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                            isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                          }`}>
                            {IconComp && <IconComp className="h-4 w-4" />}
                          </div>
                          <span className="text-[10px] font-black tracking-wide truncate max-w-[100px]">
                            {item.name}
                          </span>
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* SCREEN 5: COMPLETED RESULTS */}
            {gameState === 'completed' && (
              <motion.div
                key="completed-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-xl mx-auto py-6 text-center space-y-8"
              >
                {/* Score Certificate Header */}
                <div className="relative rounded-3xl border-2 border-dashed border-brand-blue/20 bg-gradient-to-b from-brand-blue/5 to-white p-6 sm:p-8 space-y-6">
                  {/* Floating stamp */}
                  <div className="absolute -top-4 -right-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange font-mono text-[9px] font-bold text-white shadow-lg shadow-brand-orange/20 rotate-12 uppercase tracking-wide border-2 border-white">
                    NTPC TAX OK
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-center">
                      <img
                        src="/image/photo5.png"
                        alt="暗光鳥慶祝"
                        className="h-28 w-auto object-contain animate-bounce"
                        style={{ animationDuration: '4s' }}
                      />
                    </div>
                    <div className="flex justify-center gap-1 text-amber-400">
                      {Array.from({ length: getStars() }).map((_, i) => (
                        <Star key={i} className="h-6.5 w-6.5 fill-amber-400 stroke-amber-400 animate-bounce" style={{ animationDelay: `${i * 100}ms` }} />
                      ))}
                    </div>
                    <span className="text-xs font-bold tracking-widest text-brand-blue uppercase">
                      新北牌照稅特工挑戰證書
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-800">
                      恭喜特工【 {playerName} 】圓滿完關！
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">總積分</span>
                      <strong className="text-xl text-brand-blue font-extrabold font-mono">{score} 分</strong>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">完關時間</span>
                      <strong className="text-xl text-brand-blue font-extrabold font-mono">{timeElapsed} 秒</strong>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                      <span className="text-[10px] text-slate-400 block font-medium">知識正確率</span>
                      <strong className="text-xl text-brand-green font-extrabold font-mono">{Math.round((correctAnswersCount / TRIVIA_QUESTIONS.length) * 100)} %</strong>
                    </div>
                  </div>

                  <div className="text-left bg-white border border-slate-200 rounded-2xl p-4.5 space-y-2.5">
                    <span className="text-xs font-bold text-brand-blue block border-b border-brand-blue/10 pb-1">
                      🎓 今日解鎖牌照稅核心知識：
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1.5">
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span><strong>每年開徵：</strong> 一般自用汽機車 4 月繳納，營業用車 4 月與 10 月分兩期！</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span><strong>環保綠能：</strong> 電動汽機車在符合相關規定下享有牌照稅免徵優惠。</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span><strong>排量優待：</strong> 排氣量 150cc（含）以下之機車一律免徵使用牌照稅。</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span><strong>多元繳納：</strong> 超商、行動支付、線上信用卡、地方稅網路申報系統，快速方便。</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span><strong>逾期滯納：</strong> 逾期每 3 日加徵 1% 滯納金（最高 10%），請準時繳納。</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Sharing and actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-8 py-3.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 cursor-pointer"
                  >
                    <RotateCcw className="h-4.5 w-4.5 text-slate-500" />
                    <span>重新挑戰，刷新紀錄</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      playClick();
                      // Auto scroll to bento grid section
                      const target = document.querySelector('#bento-section');
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-brand-blue px-8 py-3.5 text-sm font-bold text-white shadow hover:bg-brand-blue/90 cursor-pointer"
                  >
                    <span>看更多宣導知識詳情</span>
                    <ArrowRight className="h-4.5 w-4.5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// Extra helper component name to avoid ts compile issues
function Gamepad2Icon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="15" x2="15.01" y1="13" y2="13" />
      <line x1="18" x2="18.01" y1="11" y2="11" />
      <rect width="20" height="12" x="2" y="6" rx="3" />
    </svg>
  );
}
