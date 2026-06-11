'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show loading screen once per session
    if (sessionStorage.getItem('agrovision-loaded')) {
      setIsLoading(false);
      return;
    }

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('agrovision-loaded', 'true');
        }, 800);
      } else {
        setProgress(currentProgress);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            filter: 'blur(10px)',
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
          }}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'var(--color-neutral-0)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{ position: 'relative', marginBottom: 'var(--space-6)' }}>
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  width: '80px', height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-sky-500))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)'
                }}
              >
                <Leaf size={40} />
              </motion.div>
            </div>
            
            <h1 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'var(--text-3xl)', 
              fontWeight: 700, 
              color: 'var(--color-neutral-900)',
              marginBottom: 'var(--space-8)'
            }}>
              AgroVision
            </h1>

            <div style={{ width: '200px' }}>
              <div style={{ height: '2px', background: 'var(--color-neutral-200)', borderRadius: '1px', overflow: 'hidden' }}>
                <motion.div
                  style={{ height: '100%', background: 'var(--color-primary-500)' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0.2 }}
                />
              </div>
              <div style={{ 
                marginTop: 'var(--space-2)', 
                fontSize: 'var(--text-xs)', 
                color: 'var(--color-neutral-500)', 
                textAlign: 'center',
                fontVariantNumeric: 'tabular-nums'
              }}>
                Initializing Environment... {Math.round(progress)}%
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
