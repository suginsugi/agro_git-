'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LiveDateTime() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    // Set initial time
    setTime(new Date());

    // Update every second
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Prevent hydration mismatch by not rendering anything on server
  if (!time) {
    return (
      <div style={{ height: '48px', width: '300px', background: 'var(--color-neutral-100)', borderRadius: 'var(--radius-lg)' }} />
    );
  }

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };

  const dateStr = time.toLocaleDateString('en-IN', dateOptions);
  const timeStr = time.toLocaleTimeString('en-IN', timeOptions);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        background: 'var(--color-neutral-0)',
        border: '1px solid var(--color-neutral-200)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-2) var(--space-4)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <Calendar size={16} style={{ color: 'var(--color-primary-600)' }} />
        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-neutral-800)' }}>
          {dateStr}
        </span>
      </div>
      <div style={{ width: '1px', height: '16px', background: 'var(--color-neutral-300)' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <Clock size={16} style={{ color: 'var(--color-sky-600)' }} />
        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-neutral-900)' }}>
          {timeStr}
        </span>
      </div>
    </motion.div>
  );
}
