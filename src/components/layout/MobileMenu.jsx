import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';

export default function MobileMenu({ open, onClose, links, tr, lang, toggleLang }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-lg flex flex-col"
        >
          <div className="flex items-center justify-between px-6 h-16">
            <Link to="/" onClick={onClose} className="text-vellum">
              <Logo />
            </Link>
            <button onClick={onClose} className="text-dust hover:text-vellum transition-colors" aria-label="Close menu">
              <X size={20} strokeWidth={1} />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-10 gap-1">
            {links.map((l, i) => (
              <motion.div
                key={l.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <Link
                  to={l.path}
                  onClick={onClose}
                  className="block py-3 text-xl font-serif text-vellum/80 hover:text-gold transition-colors duration-300 tracking-wide"
                >
                  {tr[l.key]}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="px-10 pb-10 space-y-4">
            <Link
              to="/assessment"
              onClick={onClose}
              className="block text-center text-[11px] tracking-[0.15em] uppercase px-6 py-3.5 border border-gold/40 text-gold hover:bg-gold/10 transition-all duration-500"
            >
              {tr.ctaPrimary}
            </Link>
            <button
              onClick={() => { toggleLang(); }}
              className="block w-full text-center text-[11px] tracking-[0.2em] font-mono text-dust hover:text-gold transition-colors"
            >
              {lang === 'en' ? 'Français' : 'English'}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}