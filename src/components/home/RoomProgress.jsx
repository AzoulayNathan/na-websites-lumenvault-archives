import React from 'react';
import { useLang, t } from '@/lib/LanguageContext';
import { rooms } from '@/lib/translations';

export default function RoomProgress({ activeRoom = 0 }) {
  const { lang } = useLang();
  const roomList = t(rooms, lang);

  return (
    <div className="fixed right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-4">
      {roomList.map((room, i) => (
        <button
          key={i}
          onClick={() => {
            const el = document.getElementById(`room-${i}`);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`flex items-center gap-3 group transition-all duration-500 ${
            activeRoom === i ? 'opacity-100' : 'opacity-30 hover:opacity-60'
          }`}
        >
          <span className={`font-mono text-[9px] tracking-[0.2em] transition-colors duration-500 ${
            activeRoom === i ? 'text-gold' : 'text-dust'
          }`}>
            {room.label}
          </span>
          <span className={`font-mono text-[10px] tracking-wider transition-colors duration-500 ${
            activeRoom === i ? 'text-gold' : 'text-dust/50'
          }`}>
            {room.num}
          </span>
          <div className={`w-6 h-px transition-all duration-500 ${
            activeRoom === i ? 'bg-gold w-8' : 'bg-dust/30'
          }`} />
        </button>
      ))}
    </div>
  );
}