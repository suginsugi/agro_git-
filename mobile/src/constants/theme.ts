import '@/global.css';
import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    textSecondary: '#B0B4BA',
    background: '#0A111F',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    surface: '#111C24',
    card: '#1E293B',
    cardAlt: '#1A2333',
    primary: '#10B981',
    primaryDark: '#047857',
    primaryLight: '#34D399',
    primaryAlpha: 'rgba(16, 185, 129, 0.15)',
    secondary: '#3B82F6',
    accent: '#F59E0B',
    danger: '#EF4444',
    dangerAlpha: 'rgba(239, 68, 68, 0.15)',
    border: '#334155',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
