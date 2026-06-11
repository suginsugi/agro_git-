// Cinematic Easing
const cinematicEase = [0.22, 1, 0.36, 1];

export const fadeInUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: cinematicEase }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: cinematicEase }
  }
};

export const blurReveal = {
  hidden: { opacity: 0, filter: 'blur(12px)', scale: 0.95 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 1, ease: cinematicEase }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -60, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: cinematicEase }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 60, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: cinematicEase }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: cinematicEase }
  }
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export const cardHover = {
  rest: { y: 0, scale: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.04)' },
  hover: {
    y: -6,
    scale: 1.01,
    boxShadow: '0 12px 32px rgba(0,0,0,0.08), 0 24px 64px rgba(0,0,0,0.06)',
    transition: { duration: 0.4, ease: cinematicEase }
  }
};

export const buttonTap = {
  tap: { scale: 0.96, transition: { duration: 0.1 } }
};

export const pageTransition = {
  initial: { opacity: 0, filter: 'blur(8px)', y: 20 },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.6, ease: cinematicEase }
  },
  exit: {
    opacity: 0,
    filter: 'blur(8px)',
    y: -20,
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] }
  }
};
