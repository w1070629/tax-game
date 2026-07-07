/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, Zap, CreditCard, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { TAX_BENTO_INFO } from '../constants/taxData';
import { useAudio } from '../hooks/useAudio';

export function TaxBento() {
  const { playClick } = useAudio();

  const iconMapping: Record<string, any> = {
    'bento-1': Calendar,
    'bento-2': Zap,
    'bento-3': CreditCard,
    'bento-4': AlertTriangle,
  };

  return (
    <section id="bento-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-slate-50/50 rounded-3xl my-8">
      <div className="mb-12 text-center">
        <span className="rounded-full bg-brand-blue/5 px-3.5 py-1 text-xs font-bold text-brand-blue border border-brand-blue/10">
          🔍 知識大補帖
        </span>
        <h3 className="text-3xl font-black tracking-tight text-slate-900 mt-3 sm:text-4xl font-display">
          新北牌照稅核心學堂
        </h3>
        <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto font-medium">
          整合新北市政府稅捐稽徵處最新官方規範，用最精簡好懂的圖卡方式，讓您一目了然！
        </p>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {TAX_BENTO_INFO.map((item) => {
          const IconComponent = iconMapping[item.id];

          return (
            <motion.div
              key={item.id}
              whileHover={{ y: -6, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.05)' }}
              className={`relative flex flex-col justify-between rounded-3xl border bg-gradient-to-br p-6 transition-all duration-300 ${item.bg}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm ${item.accent}`}>
                    {IconComponent && <IconComponent className="h-5.5 w-5.5" />}
                  </div>
                  <span className={`rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-bold shadow-sm ${item.accent}`}>
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 block tracking-wider uppercase">
                    {item.subtitle}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-800 tracking-tight leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action decoration */}
              <div className="mt-6 flex justify-end">
                <a
                  href={item.url || 'https://www.tax.ntpc.gov.tw/np-1007-1.html'}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/70 hover:bg-white text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
                  title="閱讀更多官方指引"
                >
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Embedded Tip Banner */}
      <div className="mt-8 rounded-2xl border border-brand-blue/10 bg-white p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 shadow-sm">
        <img
          src="/image/photo3.png"
          alt="暗光鳥提醒"
          className="h-16 w-16 object-contain shrink-0 animate-bounce"
          style={{ animationDuration: '3.5s' }}
        />
        <div className="flex-1 text-center sm:text-left space-y-1.5">
          <h4 className="text-sm font-extrabold text-slate-800 flex items-center justify-center sm:justify-start gap-1.5">
            <span className="rounded bg-brand-orange/10 px-1.5 py-0.5 text-[10px] font-bold text-brand-orange">暗光鳥提醒</span>
            自用車主記得每年「4月1日至4月30日」按時繳納！
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed font-normal">
            若未按時繳納，每逾期3日將會加收 <strong className="text-brand-orange font-bold">1% 的滯納金</strong>（最高加收至 10%）。如果到了 5 月 31 日仍未繳納，將會依法移送行政執行機關強制執行喔！
          </p>
        </div>
      </div>
    </section>
  );
}
