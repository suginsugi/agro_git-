'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] // Custom easing for cinematic feel
      }}
      className="page-transition-wrapper"
    >
      {children}
    </motion.div>
  );
}
