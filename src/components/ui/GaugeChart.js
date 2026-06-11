'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GaugeChart({ 
  value = 0, 
  max = 100, 
  size = 120, 
  strokeWidth = 8, 
  label = '', 
  color = 'var(--color-primary-500)',
  animated = true 
}) {
  const [currentValue, setCurrentValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Use a semi-circle gauge (180 degrees) for a classic dashboard look
  const dashArray = `${circumference / 2} ${circumference}`; 
  const dashOffset = (circumference / 2) * (1 - currentValue / max);

  useEffect(() => {
    if (animated) {
      const timeout = setTimeout(() => {
        setCurrentValue(value);
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      setCurrentValue(value);
    }
  }, [value, animated]);

  return (
    <div className="gauge-container" style={{ width: size }}>
      <div className="gauge-ring" style={{ width: size, height: size / 2, overflow: 'hidden' }}>
        <svg 
          viewBox={`0 0 ${size} ${size}`} 
          style={{ 
            width: size, 
            height: size, 
            transform: 'rotate(-180deg)' // Rotate to start from bottom left
          }}
        >
          {/* Background Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-neutral-100)"
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeLinecap="round"
          />
          {/* Value Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
          />
        </svg>
        <div 
          className="gauge-value" 
          style={{ 
            bottom: '10px', 
            top: 'auto',
            transform: 'translateX(-50%)',
            fontSize: size < 100 ? 'var(--text-lg)' : 'var(--text-2xl)'
          }}
        >
          {value}
        </div>
      </div>
      {label && <div className="gauge-label" style={{ marginTop: 'var(--space-2)' }}>{label}</div>}
    </div>
  );
}
