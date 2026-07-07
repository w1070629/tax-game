/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VehicleCard, TaxCategory, TriviaQuestion, PaymentChannel, VehicleTaxRule } from '../types';

export const VEHICLE_CARDS: VehicleCard[] = [
  {
    id: 'ev-car',
    name: '特斯拉電動小轎車',
    type: 'ev',
    description: '新北市為響應綠生活，節能減碳符合規定之電動車享免徵牌照稅優惠！',
    imageIcon: 'Zap',
    correctCategoryId: 'exempt'
  },
  {
    id: 'private-sedan',
    name: '一般家庭自用小轎車',
    type: 'private',
    description: '最常見的自用汽機車，固定於每年 4 月開徵，是大家最熟悉的稅務！',
    imageIcon: 'Car',
    correctCategoryId: 'april'
  },
  {
    id: 'scooter-light',
    name: '125cc 輕型普通重型機車',
    type: 'scooter_light',
    description: '排氣量 150cc（含）以下之機車，新北市一律「免徵」使用牌照稅喔！',
    imageIcon: 'Bike',
    correctCategoryId: 'exempt'
  },
  {
    id: 'taxi-commercial',
    name: '營業用小黃計程車',
    type: 'commercial',
    description: '營業用車輛因商業營運，分為上、下半年兩期，分別在 4 月與 10 月繳納！',
    imageIcon: 'IdCard',
    correctCategoryId: 'split'
  }
];

export const TAX_CATEGORIES: TaxCategory[] = [
  {
    id: 'exempt',
    title: '綠能/小排量免稅區',
    description: '完全不用繳牌照稅的環保或輕量交通工具',
    badge: '免徵牌照稅'
  },
  {
    id: 'april',
    title: '一般自用車開徵區',
    description: '每年固定 4 月 1 日至 4 月 30 日開徵',
    badge: '每年 4 月繳納'
  },
  {
    id: 'split',
    title: '營業用車開徵區',
    description: '每年 4 月及 10 月分兩期課徵',
    badge: '分兩期繳納'
  }
];

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    question: '聽說車子買來不開、一直停在公共巷弄或路邊停車格，就「不用」繳使用牌照稅？',
    options: ['完全正確，沒上路就不用繳', '觀念錯誤！停放公共道路仍須課稅，且逾期未稅行駛或停放還會受罰'],
    correctIndex: 1,
    explanation: '使用牌照稅法規定，未完稅車輛「行駛」或「停放」在公共道路（包含路邊停車格、巷弄等），均視為使用公共道路，經查獲除補稅外，還會處以應納稅額 0.9 倍以下的罰鍰！',
    tip: '💡 只要車子停在公共道路或巷子，就算沒開動，也必須依法繳納牌照稅！'
  },
  {
    id: 2,
    question: '如果平時工作太忙、忘記在期限內繳納牌照稅，會怎麼樣呢？',
    options: ['沒有關係，有空再去繳即可', '會被加徵滯納金！每逾 3 日加徵 1% 滯納金（最高 10%），逾期 30 日還會被移送強制執行'],
    correctIndex: 1,
    explanation: '牌照稅逾期繳納，每超過 3 日會被加徵 1% 的滯納金。例如遲到 30 天就會被加收 10% 的滯納金，超過 30 天還沒繳更會被移送法務部行政執行署強制執行！',
    tip: '💡 請務必在 4 月 30 日前完成繳納，避免荷包因滯納金而失血！'
  },
  {
    id: 3,
    question: '現在繳納使用牌照稅非常便利，以下哪一種是「合法」且安全的線上繳稅管道？',
    options: ['直接把現金塞進信封郵寄給稅捐處', '使用手機掃描稅單上的 QR-Code，透過行動支付、線上信用卡或地方稅網路申報系統繳納'],
    correctIndex: 1,
    explanation: '請多加利用多元繳稅方式：行動支付APP（如街口、LINE Pay、台灣Pay）、便利商店（限額3萬以下）、ATM、信用卡、活期帳戶轉帳，或至「地方稅網路申報系統」線上完成申報。絕對不要點擊不明簡訊連結或郵寄現金！',
    tip: '💡 掃描繳款書 QR-Code，免出門就能輕鬆 1 分鐘快速繳稅！'
  }
];

export const PAYMENT_CHANNELS: PaymentChannel[] = [
  {
    id: 'convenience_store',
    name: '超商繳納 (四大超商)',
    isCorrect: true,
    icon: 'Store',
    description: '稅額 3 萬元以下，拿著稅單到 7-11、全家、萊爾富、OK 即可直接繳納！'
  },
  {
    id: 'mobile_pay',
    name: '行動支付 / 掃碼繳稅',
    isCorrect: true,
    icon: 'Smartphone',
    description: '使用台灣Pay、街口支付、悠遊付、LINE Pay 掃描稅單 QR-Code 即可付款！'
  },
  {
    id: 'credit_card',
    name: '信用卡線上刷卡',
    isCorrect: true,
    icon: 'CreditCard',
    description: '撥打語音電話或透過網路輸入信用卡資訊，方便又快速。'
  },
  {
    id: 'atm',
    name: '自動櫃員機 (ATM)',
    isCorrect: true,
    icon: 'Cpu',
    description: '到任何有「跨行：提款＋轉帳＋繳稅」標誌的 ATM，輸入稅單資訊進行轉帳繳納。'
  },
  {
    id: 'online_system',
    name: '地方稅網路申報系統',
    isCorrect: true,
    icon: 'Globe',
    description: '使用自然人憑證、健保卡或免書證直接上網登入進行一站式查詢與申報。'
  },
  {
    id: 'fake_mail',
    name: '郵寄現金袋 (不可行)',
    isCorrect: false,
    icon: 'MailWarning',
    description: '危險且不合法的管道！稅捐處不接受任何郵寄現金的繳納方式，請防範詐騙。'
  },
  {
    id: 'fake_link',
    name: '點擊不明簡訊付款連結 (不可行)',
    isCorrect: false,
    icon: 'ShieldAlert',
    description: '詐騙警告！稅捐處絕對不會發送帶有線上繳費、刷卡付款連結的簡訊。請勿上當！'
  },
  {
    id: 'fake_line',
    name: '私下轉帳給宣稱是承辦人的私人帳戶 (不可行)',
    isCorrect: false,
    icon: 'UserX',
    description: '詐騙套路！公務人員辦理業務，絕對不會要求民眾轉帳至私人銀行帳戶。'
  }
];

// Helper database for the vehicle tax calculator
export const VEHICLE_TAX_TABLE: VehicleTaxRule[] = [
  { type: '轎車 (自用)', ccRange: '500cc 以下', yearlyTax: 1620 },
  { type: '轎車 (自用)', ccRange: '501cc - 600cc', yearlyTax: 2160 },
  { type: '轎車 (自用)', ccRange: '601cc - 1200cc', yearlyTax: 4320 },
  { type: '轎車 (自用)', ccRange: '1201cc - 1800cc', yearlyTax: 7120 },
  { type: '轎車 (自用)', ccRange: '1801cc - 2400cc', yearlyTax: 11230 },
  { type: '轎車 (自用)', ccRange: '2401cc - 3000cc', yearlyTax: 15210 },
  { type: '轎車 (自用)', ccRange: '3001cc - 4200cc', yearlyTax: 28220 },
  { type: '機車', ccRange: '150cc 以下', yearlyTax: 0, notes: '新北市免徵牌照稅！' },
  { type: '機車', ccRange: '151cc - 250cc', yearlyTax: 800 },
  { type: '機車', ccRange: '251cc - 500cc', yearlyTax: 1620 },
  { type: '機車', ccRange: '501cc - 600cc', yearlyTax: 2160 },
  { type: '機車', ccRange: '601cc - 1800cc', yearlyTax: 7120 },
  { type: '電動車 (自用)', ccRange: '不限排氣量 (符合規定)', yearlyTax: 0, notes: '節能減碳新北最支持，免徵使用牌照稅！' }
];

export const TAX_BENTO_INFO = [
  {
    id: 'bento-1',
    title: '📅 關鍵時間點',
    subtitle: '何時該繳牌照稅？',
    description: '一般自用車與機車每年「4月1日至4月30日」開徵；營業用車分兩期，上期為4月、下期為「10月1日至10月30日」。',
    bg: 'from-blue-500/10 to-indigo-500/10 border-blue-200/50',
    accent: 'text-blue-600',
    badge: '4月 & 10月',
    url: 'https://www.tax.ntpc.gov.tw/np-1007-1.html'
  },
  {
    id: 'bento-2',
    title: '⚡ 綠能環保大優惠',
    subtitle: '電動車完全免牌照稅！',
    description: '為推廣低碳生活，新北市政府提供電動汽機車「符合相關規定享免徵使用牌照稅」之超值優惠，買電動車省錢又愛地球！',
    bg: 'from-emerald-500/10 to-teal-500/10 border-emerald-200/50',
    accent: 'text-emerald-600',
    badge: '免稅優惠',
    url: 'https://www.tax.ntpc.gov.tw/np-1007-1.html'
  },
  {
    id: 'bento-3',
    title: '💳 多元智慧繳納',
    subtitle: '1分鐘在家輕鬆付款',
    description: '支援各大行動支付（LINE Pay、街口、台灣Pay）、四大超商（3萬以下）、ATM轉帳、信用卡及「地方稅網路申報系統」線上繳納！',
    bg: 'from-amber-500/10 to-orange-500/10 border-amber-200/50',
    accent: 'text-orange-600',
    badge: '多元支付',
    url: 'https://www.tax.ntpc.gov.tw/lp-28-1.html'
  },
  {
    id: 'bento-4',
    title: '⚠️ 逾期罰則與防詐',
    subtitle: '遲到要罰、防範詐騙',
    description: '每逾3日加徵1%滯納金（最高10%）。切記稅捐處「絕對不會」寄送帶有繳費連結的簡訊，遇到可疑簡訊請撥打165反詐騙專線！',
    bg: 'from-rose-500/10 to-pink-500/10 border-rose-200/50',
    accent: 'text-rose-600',
    badge: '防範詐騙',
    url: 'https://www.etax.nat.gov.tw/etwmain/etw160w'
  }
];
