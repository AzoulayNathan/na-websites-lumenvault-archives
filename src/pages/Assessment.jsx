import React, { useState } from 'react';
import { useLang } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const texts = {
  en: {
    title: 'Request a collection assessment',
    intro: 'Tell us about the collection, the documentation need and the level of confidentiality required. We will respond with the most appropriate next step.',
    fields: {
      name: 'Name', org: 'Organization / private office', role: 'Role', email: 'Email', phone: 'Phone',
      country: 'Country / city', collType: 'Collection type', objType: 'Object types', count: 'Approximate objects',
      need: 'Primary need', location: 'Location', confidentiality: 'Confidentiality level', timeline: 'Timeline', message: 'Message',
    },
    collTypes: ['Museum collection', 'Gallery inventory', 'Private collection', 'Estate collection', 'Auction preparation', 'Foundation archive', 'Other'],
    objTypes: ['Paintings', 'Sculptures', 'Manuscripts', 'Photographs', 'Design objects', 'Jewelry / collectibles', 'Mixed collection'],
    counts: ['1–10', '10–50', '50–250', '250+', 'Unknown'],
    needs: ['High-resolution imaging', '3D scanning', 'Inventory structuring', 'Insurance documentation', 'Secure digital vault', 'Estate planning support', 'Exhibition records', 'Emergency documentation'],
    locations: ['Studio delivery possible', 'On-site required', 'Multiple locations', 'Not sure'],
    confLevels: ['Standard professional', 'Discreet handling', 'Private collection / restricted', 'Highly sensitive'],
    timelines: ['Exploratory', 'Under 1 month', '1–3 months', '3–6 months', 'Urgent'],
    cta: 'Submit assessment request',
    success: 'Thank you. The LumenVault team will review your request and respond with a discreet next step.',
    confidNote: 'Information submitted through this form is treated as confidential project intake material.',
  },
  fr: {
    title: 'Demander une évaluation de collection',
    intro: 'Présentez-nous la collection, le besoin documentaire et le niveau de confidentialité requis. Nous vous indiquerons la suite la plus adaptée.',
    fields: {
      name: 'Nom', org: 'Organisation / bureau privé', role: 'Fonction', email: 'Email', phone: 'Téléphone',
      country: 'Pays / ville', collType: 'Type de collection', objType: 'Types d\'objets', count: 'Nombre approximatif',
      need: 'Besoin principal', location: 'Localisation', confidentiality: 'Niveau de confidentialité', timeline: 'Calendrier', message: 'Message',
    },
    collTypes: ['Collection muséale', 'Inventaire de galerie', 'Collection privée', 'Collection successorale', 'Préparation de vente', 'Archive de fondation', 'Autre'],
    objTypes: ['Peintures', 'Sculptures', 'Manuscrits', 'Photographies', 'Objets de design', 'Bijoux / objets de collection', 'Collection mixte'],
    counts: ['1–10', '10–50', '50–250', '250+', 'Inconnu'],
    needs: ['Imagerie haute résolution', 'Scan 3D', 'Structuration d\'inventaire', 'Documentation assurance', 'Coffre numérique sécurisé', 'Accompagnement patrimonial', 'Dossiers d\'exposition', 'Documentation d\'urgence'],
    locations: ['Livraison en studio possible', 'Intervention sur site nécessaire', 'Plusieurs localisations', 'Pas certain'],
    confLevels: ['Professionnel standard', 'Manipulation discrète', 'Collection privée / restreint', 'Hautement sensible'],
    timelines: ['Exploratoire', 'Moins d\'1 mois', '1 à 3 mois', '3 à 6 mois', 'Urgent'],
    cta: 'Envoyer la demande d\'évaluation',
    success: 'Merci. L\'équipe LumenVault analysera votre demande et reviendra vers vous avec une prochaine étape adaptée et discrète.',
    confidNote: 'Les informations transmises via ce formulaire sont traitées comme éléments confidentiels de prise de contact projet.',
  },
};

function FormSelect({ label, options }) {
  return (
    <div>
      <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">{label}</label>
      <Select>
        <SelectTrigger className="bg-secondary/30 border-border/20 text-vellum/80 text-sm h-11">
          <SelectValue placeholder="—" />
        </SelectTrigger>
        <SelectContent>
          {options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

function FormInput({ label, type = 'text' }) {
  return (
    <div>
      <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">{label}</label>
      <Input type={type} className="bg-secondary/30 border-border/20 text-vellum/80 text-sm h-11" />
    </div>
  );
}

export default function Assessment() {
  const { lang } = useLang();
  const tx = texts[lang];
  const f = tx.fields;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-vellum tracking-wide leading-tight mb-6">{tx.title}</h1>
        <p className="text-sm text-dust/60 mb-12 font-light leading-relaxed max-w-xl">{tx.intro}</p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-gold/20 p-10 text-center"
          >
            <CheckCircle2 className="w-10 h-10 text-gold/50 mx-auto mb-5" />
            <p className="font-serif text-lg text-vellum/80 leading-relaxed">{tx.success}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <FormInput label={f.name} />
              <FormInput label={f.org} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <FormInput label={f.role} />
              <FormInput label={f.email} type="email" />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <FormInput label={f.phone} type="tel" />
              <FormInput label={f.country} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <FormSelect label={f.collType} options={tx.collTypes} />
              <FormSelect label={f.objType} options={tx.objTypes} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <FormSelect label={f.count} options={tx.counts} />
              <FormSelect label={f.need} options={tx.needs} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <FormSelect label={f.location} options={tx.locations} />
              <FormSelect label={f.confidentiality} options={tx.confLevels} />
            </div>
            <FormSelect label={f.timeline} options={tx.timelines} />
            <div>
              <label className="block font-mono text-[9px] tracking-[0.15em] text-dust/50 uppercase mb-2">{f.message}</label>
              <Textarea className="bg-secondary/30 border-border/20 text-vellum/80 text-sm min-h-[100px]" />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
              <p className="font-mono text-[9px] text-dust/30 max-w-xs leading-relaxed">{tx.confidNote}</p>
              <button
                type="submit"
                className="group flex items-center gap-3 px-7 py-3 border border-gold/50 text-gold text-[11px] tracking-[0.15em] uppercase hover:bg-gold/10 transition-all duration-500 shrink-0"
              >
                {tx.cta}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}