import React from 'react';
import { Link } from 'react-router-dom';
import { useLang, t } from '@/lib/LanguageContext';
import { footer as footerTr } from '@/lib/translations';
import Logo from './Logo';

export default function Footer() {
  const { lang } = useLang();
  const ft = t(footerTr, lang);

  const columns = [ft.services, ft.collections, ft.resources, ft.company];

  return (
    <footer className="bg-archive-black border-t border-border/30">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
        {/* Trust statement */}
        <div className="border border-border/20 px-6 py-4 mb-16 max-w-2xl">
          <p className="font-mono text-[10px] tracking-[0.1em] text-dust leading-relaxed">
            {ft.trust}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Logo column */}
          <div className="col-span-2 lg:col-span-1">
            <Logo className="text-vellum/60 mb-6" />
            <div className="space-y-1.5 font-mono text-[10px] text-dust/60 tracking-wider">
              <p>contact@lumenvault-archives.com</p>
              <p>+41 22 518 74 09</p>
              <p className="pt-2 text-dust/40">{ft.locations}</p>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="font-mono text-[9px] tracking-[0.25em] uppercase text-gold/60 mb-5">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <span className="text-[11px] text-dust/50 hover:text-vellum/70 transition-colors duration-300 cursor-pointer">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal */}
        <div className="border-t border-border/20 pt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="font-mono text-[9px] tracking-[0.15em] text-dust/30">
            © {new Date().getFullYear()} LumenVault Archives
          </span>
          {ft.legal.map((item, i) => (
            <span key={i} className="font-mono text-[9px] tracking-[0.1em] text-dust/30 hover:text-dust/50 transition-colors cursor-pointer">
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}