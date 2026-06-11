'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export default function AppInitializer() {
  const { setTheme, setLocation } = useAppStore();

  useEffect(() => {
    // 1. Initialize Theme
    const storedTheme = localStorage.getItem('agrovision-theme') || 'system';
    setTheme(storedTheme);

    // Watch for system theme changes if set to system
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const currentTheme = useAppStore.getState().theme;
      if (currentTheme === 'system') {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    // 2. Initialize Geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Using reverse geocoding API to get City, State, Country
            // For production, this should ideally be an environment variable
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            if (res.ok) {
              const data = await res.json();
              setLocation({
                city: data.city || data.locality,
                state: data.principalSubdivision,
                country: data.countryName,
                latitude,
                longitude,
              });
            }
          } catch (error) {
            console.error('Error fetching location details:', error);
            // Fallback
            setLocation({ city: 'Bengaluru', state: 'Karnataka', country: 'India', latitude, longitude });
          }
        },
        (error) => {
          console.log('Geolocation permission denied or error. Using fallback.', error);
          setLocation({ city: 'Bengaluru', state: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946 });
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
      );
    } else {
      // Fallback if geolocation isn't supported
      setLocation({ city: 'Bengaluru', state: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946 });
    }

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []); // Only run once on mount

  return null;
}
