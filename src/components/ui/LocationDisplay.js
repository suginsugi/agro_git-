'use client';

import { useAppStore } from '@/store/useAppStore';
import { MapPin, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LocationDisplay({ variant = 'default' }) {
  const location = useAppStore((state) => state.location);

  if (!location) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
        <Loader2 size={14} className="animate-spin" /> Detecting location...
      </div>
    );
  }

  if (variant === 'dashboard') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <MapPin size={14} /> {location.city}, {location.state}, {location.country}
      </span>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
        background: 'var(--color-neutral-0)',
        border: '1px solid var(--color-primary-200)', borderRadius: 'var(--radius-full)',
        padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)',
        fontWeight: 600, color: 'var(--color-primary-700)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <MapPin size={16} />
      {location.city}, {location.state}
    </motion.div>
  );
}
