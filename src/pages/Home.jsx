import React, { useState, useEffect } from 'react';
import HeroRoom from '@/components/home/HeroRoom';
import Room01Object from '@/components/home/Room01Object';
import Room02Risk from '@/components/home/Room02Risk';
import Room03Capture from '@/components/home/Room03Capture';
import Room04Record from '@/components/home/Room04Record';
import Room05Vault from '@/components/home/Room05Vault';
import Room06Legacy from '@/components/home/Room06Legacy';
import RoomProgress from '@/components/home/RoomProgress';
import AssessmentDrawer from '@/components/home/AssessmentDrawer';

export default function Home() {
  const [activeRoom, setActiveRoom] = useState(-1);

  useEffect(() => {
    const roomEls = [];
    for (let i = 0; i < 6; i++) {
      const el = document.getElementById(`room-${i}`);
      if (el) roomEls.push(el);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = roomEls.indexOf(entry.target);
            if (idx !== -1) setActiveRoom(idx);
          }
        });
      },
      { threshold: 0.4 }
    );

    roomEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <RoomProgress activeRoom={activeRoom} />
      <HeroRoom />
      <Room01Object />
      <Room02Risk />
      <Room03Capture />
      <Room04Record />
      <Room05Vault />
      <Room06Legacy />
      <AssessmentDrawer />
    </div>
  );
}