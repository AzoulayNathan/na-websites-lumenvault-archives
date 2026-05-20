import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';

const texts = {
  en: {
    title: 'Contact the archive team',
    name: 'Name', email: 'Email', phone: 'Phone', org: 'Organization',
    inquiry: 'Inquiry type', message: 'Message', prefLang: 'Preferred language',
    cta: 'Send confidential inquiry',
    inquiryTypes: ['Collection assessment', 'Digitization project', 'Vault platform', '3D scanning', 'Insurance documentation', 'Confidential inquiry', 'Other'],
    langOptions: ['English', 'French'],
    success: 'Thank you. We will respond to your inquiry with discretion.',
    panels: [
      { label: 'Request collection assessment', path: '/assessment' },
      { label: 'Explore digitization lab', path: '/lab' },
      { label: 'View vault platform', path: '/vault-platform' },
      { label: 'Read confidentiality statement', path: '/security' },
    ],
  },
  fr: {
    title: 'Contacter l\'équipe archives',
    name: 'Nom', email: 'Email', phone: 'Téléphone', org: 'Organisation',
    inquiry: 'Type de demande', message: 'Message', prefLang: 'Langue préférée',
    cta: 'Envoyer une demande confidentielle',
    inquiryTypes: ['Évaluation de collection', 'Projet de numérisation', 'Coffre numérique', 'Scan 3D', 'Documentation assurance', 'Demande confidentielle', 'Autre'],
    langOptions: ['Anglais', 'Français'],
    success: 'Merci. Nous répondrons à votre demande avec discrétion.',
    panels: [
      { label: 'Demander une évaluation de collection', path: '/assessment' },
      { label: 'Explorer le laboratoire', path: '/lab' },
      { label: 'Voir le coffre numérique', path: '/vault-platform' },
      { label: 'Lire l\'engagement de confidentialité', path: '/security' },
    ],
  },
};

export default function Contact() {
  const { lang } = useLang();
  const tx = texts[lang];
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum tracking-wide mb-16">{tx.title}</h1>

        <div className="grid lg:grid-cols-[1fr_320px] gap-16">
          {/* Form */}
          <div>
            {submitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-gold/20 p-10 text-center">
                <CheckCircle2 className="w-10 h-10 text-gold/50 mx-auto mb-5" />
                <p className="font-serif text-lg text-vellum/80">{tx.success}</p>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">{tx.name}</label>
                    <Input className="bg-secondary/30 border-border/20 text-vellum/80 text-sm h-11" />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">{tx.email}</label>
                    <Input type="email" className="bg-secondary/30 border-border/20 text-vellum/80 text-sm h-11" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">{tx.phone}</label>
                    <Input type="tel" className="bg-secondary/30 border-border/20 text-vellum/80 text-sm h-11" />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">{tx.org}</label>
                    <Input className="bg-secondary/30 border-border/20 text-vellum/80 text-sm h-11" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">{tx.inquiry}</label>
                    <Select>
                      <SelectTrigger className="bg-secondary/30 border-border/20 text-vellum/80 text-sm h-11">
                        <SelectValue placeholder="—" />
                      </SelectTrigger>
                      <SelectContent>
                        {tx.inquiryTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">{tx.prefLang}</label>
                    <Select>
                      <SelectTrigger className="bg-secondary/30 border-border/20 text-vellum/80 text-sm h-11">
                        <SelectValue placeholder="—" />
                      </SelectTrigger>
                      <SelectContent>
                        {tx.langOptions.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">{tx.message}</label>
                  <Textarea className="bg-secondary/30 border-border/20 text-vellum/80 text-sm min-h-[120px]" />
                </div>
                <button
                  type="submit"
                  className="group flex items-center gap-3 px-7 py-3 border border-gold/50 text-gold text-[11px] tracking-[0.15em] uppercase hover:bg-gold/10 transition-all duration-500"
                >
                  {tx.cta}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact info */}
            <div className="border border-border/15 p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={14} strokeWidth={1} className="text-gold/50 mt-0.5 shrink-0" />
                <div className="font-mono text-[10px] text-dust/50 leading-relaxed">
                  <p>Geneva · Paris · London</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={14} strokeWidth={1} className="text-gold/50 mt-0.5 shrink-0" />
                <div className="font-mono text-[10px] text-dust/50 space-y-1">
                  <p>+41 22 518 74 09</p>
                  <p>+33 1 72 44 68 21</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={14} strokeWidth={1} className="text-gold/50 mt-0.5 shrink-0" />
                <div className="font-mono text-[10px] text-dust/50 space-y-1">
                  <p>contact@lumenvault-archives.com</p>
                  <p>collections@lumenvault-archives.com</p>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="space-y-2">
              {tx.panels.map((panel, i) => (
                <Link
                  key={i}
                  to={panel.path}
                  className="group flex items-center gap-3 py-3 border-b border-border/10 text-[11px] text-dust/50 hover:text-gold transition-colors"
                >
                  <ArrowRight size={12} className="text-gold/30 group-hover:translate-x-1 transition-transform" />
                  {panel.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}