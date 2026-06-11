'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/soil-analysis', label: 'Soil Analysis' },
  { href: '/weather', label: 'Weather' },
  { href: '/crop-report', label: 'Crop Report' },
  { href: '/disease-detection', label: 'Disease Detection' },
  { href: '/irrigation', label: 'Irrigation' },
  { href: '/ai-assistant', label: 'AI Assistant' },
  { href: '/profile', label: 'Profile' },
  { href: '/settings', label: 'Settings' },
  { href: '/agri-market', label: 'Agri Market' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className="navbar"
      style={{
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <Sprout size={20} />
          </div>
          <span>AgroVision</span>
        </Link>

        <ul className={`navbar-links ${isOpen ? 'open' : ''}`} style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap', justifyContent: 'center' }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`navbar-link ${pathname === link.href ? 'active' : ''}`}
                style={{
                  fontSize: '13px',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all 0.2s',
                  background: pathname === link.href ? 'var(--color-primary-50)' : 'transparent',
                  color: pathname === link.href ? 'var(--color-primary-700)' : 'var(--color-neutral-600)',
                  fontWeight: pathname === link.href ? 600 : 500,
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <Link href="/dashboard" className="btn btn-primary btn-sm">
            Open Platform
          </Link>
          <button
            className="navbar-mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 'var(--navbar-height)',
              left: 0,
              right: 0,
              background: 'var(--color-neutral-0)',
              borderBottom: '1px solid var(--color-neutral-200)',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden',
              zIndex: 999,
            }}
          >
            <div style={{ padding: 'var(--space-4) var(--space-6)' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: 'block',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: pathname === link.href ? 'var(--color-primary-700)' : 'var(--color-neutral-600)',
                    background: pathname === link.href ? 'var(--color-primary-50)' : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
