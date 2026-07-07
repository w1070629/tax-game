/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, Gamepad2, BookOpen, Calculator, Award, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudio } from '../hooks/useAudio';

export function Header() {
  const { playClick } = useAudio();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: '互動挑戰賽', href: '#game-section', icon: Gamepad2, color: 'text-orange-500' },
    { name: '租稅知識庫', href: '#bento-section', icon: BookOpen, color: 'text-blue-500' },
    { name: '稅額試算器', href: '#calculator-section', icon: Calculator, color: 'text-emerald-500' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClick();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <img
            src="/image/tax.png"
            alt="新北市政府稅捐稽徵處 Logo"
            className="h-10 w-auto object-contain rounded-lg"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-brand-blue">
                官方宣導
              </span>
              <span className="text-[10px] tracking-wider text-slate-500 font-bold uppercase">
                新北市政府稅捐稽徵處
              </span>
            </div>
            <h1 className="text-base font-black tracking-tight text-slate-800 sm:text-lg">
              使用牌照稅宣導樂園
            </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="group flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand-blue transition-all duration-200"
            >
              <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${item.color}`} />
              <span>{item.name}</span>
            </a>
          ))}
          <a
            href="https://www.tax.ntpc.gov.tw"
            target="_blank"
            rel="noreferrer"
            onClick={playClick}
            className="ml-2 flex items-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-slate-900 transition-all"
          >
            <span>稅捐處官網</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => {
              playClick();
              setIsOpen(!isOpen);
            }}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-100 bg-white/95 md:hidden"
          >
            <div className="space-y-1 px-4 py-3 pb-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                >
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                  <span>{item.name}</span>
                </a>
              ))}
              <hr className="my-2 border-slate-100" />
              <a
                href="https://www.tax.ntpc.gov.tw"
                target="_blank"
                rel="noreferrer"
                onClick={playClick}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-center text-sm font-semibold text-white hover:bg-slate-700"
              >
                <span>新北市稅捐處官網</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
