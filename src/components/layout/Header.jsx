import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang, t } from '@/lib/LanguageContext';
import { nav } from '@/lib/translations';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { Menu } from 'lucide-react';

const links = [
  { key: 'services', path: '/services' },
  { key: 'lab', path: '/lab' },
  { key: 'vault', path: '/vault-platform' },
  { key: 'collections', path: '/collections' },
  { key: 'process', path: '/process' },
  { key: 'security', path: '/security' },
  { key: 'fieldNotes', path: '/field-notes' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
];

export default function Header() {
  const { lang, toggleLang } = useLang();
  const tr = t(nav, lang);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-border/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="text-vellum hover:text-gold transition-colors duration-500">
              <Logo />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {links.map(l => (
                <Link
                  key={l.key}
                  to={l.path}
                  className={`px-3 py-1.5 text-[11px] tracking-[0.12em] uppercase transition-colors duration-300 ${
                    location.pathname === l.path
                      ? 'text-gold'
                      : 'text-dust hover:text-vellum'
                  }`}
                >
                  {tr[l.key]}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleLang}
                className="text-[11px] tracking-[0.2em] font-mono text-dust hover:text-gold transition-colors duration-300 uppercase"
              >
                {lang === 'en' ? 'FR' : 'EN'}
              </button>

              <Link
                to="/assessment"
                className="hidden lg:block text-[10px] tracking-[0.15em] uppercase px-5 py-2.5 border border-gold/40 text-gold hover:bg-gold/10 transition-all duration-500"
              >
                {tr.ctaPrimary}
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="xl:hidden text-vellum hover:text-gold transition-colors"
                aria-label="Open menu"
              >
                <Menu size={20} strokeWidth={1} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={links}
        tr={tr}
        lang={lang}
        toggleLang={toggleLang}
      />
    </>
  );
}