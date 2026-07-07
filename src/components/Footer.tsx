/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, MapPin, ShieldCheck, Mail, Globe, ExternalLink } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

export function Footer() {
  const { playClick } = useAudio();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 bg-[#e6dddd]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 border-b border-slate-900 pb-10">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/image/tax.png"
                alt="新北市政府稅捐稽徵處 Logo"
                className="h-10 w-auto object-contain rounded-lg bg-white p-1"
              />
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide font-display">新北市政府稅捐稽徵處</h4>
                <p className="text-[10px] text-slate-500 tracking-widest uppercase font-semibold">
                  Revenue Service Office, New Taipei City
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
              <p className="text-xs text-slate-400 leading-relaxed flex-1">
                致力於提供便捷、創新、溫馨的便民租稅服務。本宣導網頁透過寓教於樂之互動遊戲，推廣使用牌照稅法規、電動車免稅優惠、多元繳納管道及防範詐騙觀念，落實智慧與誠信宣導。
              </p>
              <img
                src="/image/photo10.png"
                alt="暗光鳥吉祥物"
                className="h-14 w-auto object-contain shrink-0 opacity-80"
              />
            </div>
          </div>

          {/* Quick links Col */}
          <div className="space-y-3 md:col-span-3">
            <h5 className="text-xs font-bold text-white tracking-widest uppercase font-display">
              官方常用連結
            </h5>
            <ul className="text-xs space-y-2">
              <li>
                <a
                  href="https://www.tax.ntpc.gov.tw"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="flex items-center gap-1 hover:text-brand-blue transition-colors font-medium"
                >
                  <span>稅捐處官方網站</span>
                  <ExternalLink className="h-3 w-3 text-brand-blue" />
                </a>
              </li>
              <li>
                <a
                  href="https://net.tax.nat.gov.tw"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="flex items-center gap-1 hover:text-brand-blue transition-colors font-medium"
                >
                  <span>地方稅網路申報系統</span>
                  <ExternalLink className="h-3 w-3 text-brand-blue" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.etax.nat.gov.tw"
                  target="_blank"
                  rel="noreferrer"
                  onClick={playClick}
                  className="flex items-center gap-1 hover:text-brand-blue transition-colors font-medium"
                >
                  <span>財政部稅務入口網</span>
                  <ExternalLink className="h-3 w-3 text-brand-blue" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-3.5 md:col-span-4">
            <h5 className="text-xs font-bold text-white tracking-widest uppercase font-display">
              聯絡諮詢資訊
            </h5>
            <ul className="text-xs space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-brand-blue" />
                <span>220223 新北市板橋區中山路一段143號</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-blue" />
                <span>總機：02-8952-8200 (24小時語音服務)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-green" />
                <span>免付費服務專線：0800-580-786</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand-orange" />
                <span>反詐騙專線：165 依法檢舉防詐騙</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal copyrights details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
          <p>© 2026 新北市政府稅捐稽徵處 版權所有 ‧ 智慧便民服務</p>
          <div className="flex gap-4">
            <span>最佳瀏覽解析度：1280x720 以上</span>
            <span>更新日期：2026-06-30</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
