'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import {
  Sprout, CloudSun, FlaskConical, Bug, Droplets, Brain,
  TrendingUp, Users, Globe, BarChart3, ArrowRight, Play,
  Thermometer, Wind, Leaf, AlertTriangle, ChevronRight,
  ShieldCheck, Zap, Target, MapPin, Activity, Layers, TrendingDown
} from 'lucide-react';
import { fadeInUp, blurReveal, slideInLeft, staggerContainer, staggerContainerSlow, cardHover, buttonTap } from '@/lib/animations';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { marketPrices } from '@/data/marketData';
import { ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';
import LiveDateTime from '@/components/ui/LiveDateTime';
import LocationDisplay from '@/components/ui/LocationDisplay';
import ParticleBackground from '@/components/ui/ParticleBackground';

/* =========================================
   HOME PAGE — Cinematic Storytelling
   ========================================= */

// ---- Hero Section ----
function HeroSection() {
  const containerRef = useRef(null);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Smarter Farming.', 'Sustainable Yields.', 'Data-Driven Decisions.'];
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.2 })
      .from('.hero-title-line', { opacity: 0, y: 40, duration: 0.7, stagger: 0.15 }, '-=0.3')
      .from('.hero-description', { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
      .from('.hero-actions', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
      .from('.hero-stats', { opacity: 0, y: 30, duration: 0.6 }, '-=0.2');
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--gradient-hero)',
        overflow: 'hidden',
      }}
    >
      <ParticleBackground />

      {/* Cinematic Lighting Elements */}
      <div style={{
        position: 'absolute', top: '10%', right: '5%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(40px)', mixBlendMode: 'screen'
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '10%', width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(40px)', mixBlendMode: 'screen'
      }} />

      <motion.div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 'var(--space-24)', paddingBottom: 'var(--space-16)', opacity }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'var(--space-12)', alignItems: 'center' }}>
          {/* Left Content */}
          <div>
            <motion.div variants={fadeInUp} style={{ marginBottom: 'var(--space-6)', display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <LiveDateTime />
              <LocationDisplay />
            </motion.div>
            
            <motion.div variants={blurReveal} className="hero-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              background: 'var(--color-neutral-0)', backdropFilter: 'blur(12px)',
              border: '1px solid var(--color-primary-200)', borderRadius: 'var(--radius-full)',
              padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)',
              fontWeight: 600, color: 'var(--color-primary-700)', marginBottom: 'var(--space-6)',
              boxShadow: '0 4px 14px rgba(34, 197, 94, 0.15)'
            }}>
              <Sprout size={16} />
              AI-Powered Agricultural Intelligence
            </motion.div>

            <div className="hero-title-line" style={{ height: 'clamp(5rem, 10vw, 9rem)', marginBottom: 'var(--space-6)', position: 'relative' }}>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 700,
                lineHeight: 1.1, color: 'var(--color-neutral-900)',
                letterSpacing: '-0.02em', textShadow: '0 0 40px rgba(255,255,255,0.1)'
              }}>
                AgroVision Delivers
              </h1>
              <div style={{ position: 'relative', height: '1.2em' }}>
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={currentWord}
                    initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'absolute',
                      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 700,
                      lineHeight: 1.1,
                      background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-sky-500))',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      letterSpacing: '-0.02em',
                      textShadow: '0 0 30px rgba(34,197,94,0.3)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {words[currentWord]}
                  </motion.h1>
                </AnimatePresence>
              </div>
            </div>

            <motion.p variants={fadeInUp} className="hero-description" style={{
              fontSize: 'var(--text-xl)', color: 'var(--color-neutral-600)',
              maxWidth: '600px', lineHeight: 'var(--leading-relaxed)',
              marginBottom: 'var(--space-8)',
            }}>
              AgroVision combines soil science, climate intelligence, crop monitoring, and
              AI-powered analytics to help farmers, agronomists, and agricultural enterprises
              make precise, profitable, and sustainable decisions.
            </motion.p>

            <motion.div variants={fadeInUp} className="hero-actions" style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <motion.div whileHover="hover" whileTap="tap" variants={buttonTap}>
                <Link href="/dashboard" className="btn btn-primary btn-lg" style={{ fontSize: 'var(--text-base)' }}>
                  Open Dashboard <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover="hover" whileTap="tap" variants={buttonTap}>
                <Link href="/soil-analysis" className="btn btn-secondary btn-lg" style={{ fontSize: 'var(--text-base)', background: 'var(--color-neutral-0)', backdropFilter: 'blur(10px)' }}>
                  <Play size={18} /> Explore Platform
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Content - Parallax Dashboard Preview */}
          <div style={{ position: 'relative', height: '600px', display: 'flex', justifyContent: 'center' }} className="hide-on-mobile">
            <motion.div style={{ y: y1, position: 'absolute', right: '10%', top: '20%', zIndex: 3 }}>
              <div className="card-glass" style={{ width: '280px', padding: 'var(--space-4)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--color-neutral-900)' }}>Crop Health</div>
                  <div className="badge badge-success">Optimal</div>
                </div>
                <div style={{ height: '100px', background: 'var(--color-primary-50)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Activity size={32} style={{ color: 'var(--color-primary-500)' }} />
                </div>
              </div>
            </motion.div>

            <motion.div style={{ y: y2, position: 'absolute', left: '0%', top: '40%', zIndex: 2 }}>
              <div className="card-glass" style={{ width: '240px', padding: 'var(--space-4)', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <CloudSun size={20} style={{ color: 'var(--color-sky-500)' }} />
                  <div style={{ fontWeight: 600, color: 'var(--color-neutral-900)' }}>Weather Alert</div>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>Rain expected in 2 hours. Optimal time for fertilizer application.</div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="hero-stats" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-6)',
          marginTop: 'var(--space-16)',
        }}>
          {[
            { value: '2.4M+', label: 'Hectares Monitored', icon: Globe },
            { value: '18.5%', label: 'Avg. Yield Improvement', icon: TrendingUp },
            { value: '12,000+', label: 'Active Farms', icon: Users },
            { value: '340+', label: 'Crop Varieties Supported', icon: Sprout },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'var(--color-neutral-0)',
              border: '1px solid var(--color-neutral-200)', borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)', textAlign: 'center', boxShadow: 'var(--shadow-sm)'
            }}>
              <stat.icon size={20} style={{ color: 'var(--color-primary-500)', marginBottom: 'var(--space-2)', display: 'inline-block' }} />
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-neutral-900)' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ---- Industry Challenges Section ----
function ChallengesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const challenges = [
    {
      icon: Layers, title: 'Soil Degradation',
      stat: '33%', statLabel: 'of global soils degraded',
      description: 'Intensive farming, chemical overuse, and poor soil management deplete organic matter, reduce fertility, and threaten long-term productivity.',
      color: 'var(--color-earth-500)',
      bg: 'var(--color-earth-50)',
    },
    {
      icon: Droplets, title: 'Water Scarcity',
      stat: '70%', statLabel: 'of freshwater used in agriculture',
      description: 'Agriculture consumes the majority of freshwater globally. Inefficient irrigation wastes 40-60% of water, while aquifer levels continue to decline.',
      color: 'var(--color-sky-600)',
      bg: 'var(--color-sky-50)',
    },
    {
      icon: Thermometer, title: 'Climate Variability',
      stat: '2.5°C', statLabel: 'warming impact on yields',
      description: 'Unpredictable rainfall, extreme heat events, and shifting seasons make traditional farming calendars unreliable, increasing crop failure risks.',
      color: 'var(--color-warning)',
      bg: '#fffbeb',
    },
    {
      icon: Bug, title: 'Crop Diseases',
      stat: '20-40%', statLabel: 'annual crop losses globally',
      description: 'Emerging pathogens, pesticide resistance, and inadequate diagnostics lead to devastating crop losses, especially for smallholder farmers.',
      color: 'var(--color-danger)',
      bg: '#fef2f2',
    },
    {
      icon: BarChart3, title: 'Yield Uncertainty',
      stat: '50%', statLabel: 'yield gap in developing regions',
      description: 'Without data-driven insights, farmers struggle to optimize inputs, timing, and practices, resulting in yields far below potential.',
      color: 'var(--color-primary-600)',
      bg: 'var(--color-primary-50)',
    },
  ];

  return (
    <section ref={ref} style={{ padding: 'var(--space-24) 0', background: 'var(--color-neutral-0)' }}>
      <div className="container">
        <motion.div
          className="section-header section-header-center"
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainer}
        >
          <motion.span variants={fadeInUp} className="section-label">
            <AlertTriangle size={14} /> The Challenge
          </motion.span>
          <motion.h2 variants={fadeInUp} className="section-title" style={{ textAlign: 'center' }}>
            Agriculture Faces Unprecedented Challenges
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle" style={{ textAlign: 'center' }}>
            Global food systems are under pressure from climate change, resource depletion,
            and growing demand. Precision agriculture powered by AI offers a path forward.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainerSlow}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-5)', marginTop: 'var(--space-12)' }}
        >
          {challenges.map((item, i) => (
            <motion.div key={i} variants={blurReveal} whileHover="hover" initial="rest" className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <motion.div variants={cardHover} style={{ height: '100%' }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: item.color, borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                }} />
                <div style={{
                  width: '44px', height: '44px', borderRadius: 'var(--radius-md)',
                  background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: item.color, marginBottom: 'var(--space-4)',
                }}>
                  <item.icon size={22} />
                </div>
                <h4 style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--text-lg)' }}>{item.title}</h4>
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)',
                  marginBottom: 'var(--space-3)',
                }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: item.color }}>
                    {item.stat}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                    {item.statLabel}
                  </span>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>
                  {item.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---- Platform Features Section ----
function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: FlaskConical, title: 'Soil Intelligence',
      description: 'Upload laboratory reports and get instant AI-powered soil health analysis, nutrient mapping, fertility scoring, and crop-specific recommendations.',
      href: '/soil-analysis',
      color: 'var(--color-earth-500)', bg: 'var(--color-earth-50)',
      highlights: ['pH & Nutrient Analysis', 'Fertility Scoring', 'Crop Suitability'],
    },
    {
      icon: CloudSun, title: 'Weather Intelligence',
      description: 'Real-time weather monitoring with agriculture-specific forecasts, irrigation advisories, disease risk alerts, and harvest timing optimization.',
      href: '/weather',
      color: 'var(--color-sky-600)', bg: 'var(--color-sky-50)',
      highlights: ['7-Day Forecast', 'Rainfall Prediction', 'Farm Advisories'],
    },
    {
      icon: BarChart3, title: 'Crop Analytics',
      description: 'Monitor crop health using vegetation indices, track growth trends, predict yields with AI models, and generate comprehensive seasonal reports.',
      href: '/crop-report',
      color: 'var(--color-primary-600)', bg: 'var(--color-primary-50)',
      highlights: ['NDVI Monitoring', 'Yield Forecasting', 'Growth Tracking'],
    },
    {
      icon: Bug, title: 'Disease Detection',
      description: 'AI-powered image analysis identifies crop diseases with high accuracy, provides severity assessment, and recommends targeted treatment plans.',
      href: '/disease-detection',
      color: 'var(--color-danger)', bg: '#fef2f2',
      highlights: ['Image Diagnosis', 'Treatment Plans', 'Prevention Guide'],
    },
    {
      icon: Droplets, title: 'Smart Irrigation',
      description: 'Zone-level soil moisture monitoring with automated scheduling, water usage analytics, and efficiency optimization to reduce waste by up to 40%.',
      href: '/irrigation',
      color: 'var(--color-sky-500)', bg: 'var(--color-sky-50)',
      highlights: ['Moisture Sensors', 'Auto-Scheduling', 'Water Savings'],
    },
    {
      icon: Brain, title: 'AI Decision Support',
      description: 'Ask agricultural questions and get contextual, data-driven recommendations powered by our knowledge base spanning soil science, agronomy, and climate.',
      href: '/assistant',
      color: 'var(--color-primary-700)', bg: 'var(--color-primary-50)',
      highlights: ['Natural Language', 'Contextual Advice', 'Knowledge Base'],
    },
  ];

  return (
    <section ref={ref} style={{
      padding: 'var(--space-24) 0',
      background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 50%, #ffffff 100%)',
    }}>
      <div className="container">
        <motion.div
          className="section-header section-header-center"
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainer}
        >
          <motion.span variants={fadeInUp} className="section-label">
            <Zap size={14} /> Platform Capabilities
          </motion.span>
          <motion.h2 variants={fadeInUp} className="section-title" style={{ textAlign: 'center' }}>
            Complete Agricultural Intelligence Suite
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle" style={{ textAlign: 'center' }}>
            Six integrated modules working together to provide end-to-end farm
            intelligence — from soil to harvest.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainerSlow}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'var(--space-6)', marginTop: 'var(--space-12)',
          }}
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Link href={feature.href} style={{ display: 'block' }}>
                <div className="card-elevated" style={{ height: '100%', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: 'var(--radius-lg)',
                      background: feature.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: feature.color, flexShrink: 0,
                    }}>
                      <feature.icon size={24} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>{feature.title}</h4>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'auto' }}>
                    {feature.highlights.map((h, j) => (
                      <span key={j} style={{
                        fontSize: 'var(--text-xs)', fontWeight: 500, padding: '2px 10px',
                        borderRadius: 'var(--radius-full)', background: feature.bg, color: feature.color,
                      }}>
                        {h}
                      </span>
                    ))}
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                    marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)',
                    fontWeight: 600, color: feature.color,
                  }}>
                    Explore Module <ChevronRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---- Nearby Market Section ----
function NearbyMarketSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const location = useAppStore(state => state.location);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const enrichedPrices = marketPrices.map(item => {
    const diff = item.currentPrice - item.previousPrice;
    const isUp = diff > 0;
    const trendData = [
      { val: item.previousPrice * 0.95 },
      { val: item.previousPrice },
      { val: item.currentPrice * 0.98 },
      { val: item.currentPrice }
    ];
    return {
      ...item,
      market: (!location || !location.city) ? 'Mysuru APMC' : `${location.city} APMC`,
      minPrice: Math.floor(item.currentPrice * 0.9),
      maxPrice: Math.ceil(item.currentPrice * 1.1),
      isUp,
      trendData
    };
  }).filter(item => {
    if (filter !== 'All' && !item.crop.toLowerCase().includes(filter.toLowerCase())) return false;
    if (search && !item.crop.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <section ref={ref} id="market-prices" style={{ padding: 'var(--space-24) 0', background: 'var(--color-neutral-50)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainer}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 'var(--space-6)' }}
        >
          <div>
            <motion.span variants={fadeInUp} className="section-label">
              <MapPin size={14} /> Local Markets
            </motion.span>
            <motion.h2 variants={fadeInUp} className="section-title" style={{ marginBottom: 0 }}>
              Nearby Crop Market Prices
            </motion.h2>
          </div>
          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search crops..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-neutral-300)',
                  background: 'var(--color-neutral-0)',
                  fontSize: 'var(--text-sm)',
                  outline: 'none',
                  width: '200px'
                }}
              />
            </div>
            <select 
              value={filter} 
              onChange={e => setFilter(e.target.value)}
              style={{
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-neutral-300)',
                background: 'var(--color-neutral-0)',
                fontSize: 'var(--text-sm)',
                outline: 'none',
              }}
            >
              <option value="All">All Categories</option>
              <option value="Rice">Cereals</option>
              <option value="Tomato">Vegetables</option>
            </select>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainerSlow}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--space-6)', marginTop: 'var(--space-8)',
          }}
        >
          <AnimatePresence mode="popLayout">
            {enrichedPrices.slice(0, 6).map((item, i) => (
              <motion.div 
                key={item.crop} 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, boxShadow: 'var(--shadow-lg)' }}
                className="card-elevated"
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <div style={{ fontWeight: 700, fontSize: 'var(--text-lg)' }}>{item.crop}</div>
                  <div className={`badge ${item.isUp ? 'badge-success' : 'badge-danger'}`}>
                    {item.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(item.currentPrice - item.previousPrice)}
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', fontWeight: 700 }}>
                    ₹{item.currentPrice}
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>/ qtl</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-xs)' }}>
                  <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ color: 'var(--color-neutral-500)' }}>Min Price</div>
                    <div style={{ fontWeight: 600 }}>₹{item.minPrice}</div>
                  </div>
                  <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ color: 'var(--color-neutral-500)' }}>Max Price</div>
                    <div style={{ fontWeight: 600 }}>₹{item.maxPrice}</div>
                  </div>
                </div>

                <div style={{ height: '40px', marginBottom: 'var(--space-4)' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={item.trendData}>
                      <defs>
                        <linearGradient id={`gradient-${item.crop}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={item.isUp ? 'var(--color-success)' : 'var(--color-danger)'} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={item.isUp ? 'var(--color-success)' : 'var(--color-danger)'} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide />
                      <Area 
                        type="monotone" 
                        dataKey="val" 
                        stroke={item.isUp ? 'var(--color-success)' : 'var(--color-danger)'} 
                        fill={`url(#gradient-${item.crop})`} 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--color-neutral-500)', borderTop: '1px solid var(--color-neutral-100)', paddingTop: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} /> {item.market}
                  </div>
                  <div>Just updated</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ---- Impact Metrics Section ----
function MetricsSection() {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const metrics = [
    { value: '₹2.4 Cr', label: 'Farmer Revenue Enabled', sublabel: 'Across 12,000+ farms in 2025-26', icon: TrendingUp, color: 'var(--color-primary-600)' },
    { value: '34%', label: 'Water Usage Reduction', sublabel: 'Through smart irrigation optimization', icon: Droplets, color: 'var(--color-sky-600)' },
    { value: '92%', label: 'Disease Detection Accuracy', sublabel: 'Across 150+ crop disease variants', icon: ShieldCheck, color: 'var(--color-primary-700)' },
    { value: '4.2x', label: 'ROI for Enterprise Clients', sublabel: 'Average return within first season', icon: Target, color: 'var(--color-earth-500)' },
    { value: '8', label: 'Indian States Covered', sublabel: 'Karnataka, AP, TN, MH, MP, UP, RJ, GJ', icon: MapPin, color: 'var(--color-primary-500)' },
    { value: '99.7%', label: 'Platform Uptime', sublabel: 'Enterprise-grade reliability SLA', icon: Activity, color: 'var(--color-sky-500)' },
  ];

  return (
    <section ref={ref} style={{ padding: 'var(--space-24) 0', background: 'var(--color-neutral-900)' }}>
      <div className="container" ref={containerRef}>
        <motion.div
          className="section-header section-header-center"
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainer}
        >
          <motion.span variants={fadeInUp} className="section-label" style={{
            background: 'rgba(34,197,94,0.15)', color: 'var(--color-primary-400)',
          }}>
            <Activity size={14} /> Impact & Scale
          </motion.span>
          <motion.h2 variants={fadeInUp} className="section-title" style={{ color: 'white', textAlign: 'center' }}>
            Real Impact, Measurable Results
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle" style={{ color: 'var(--color-neutral-400)', textAlign: 'center' }}>
            AgroVision delivers tangible improvements across every dimension of farm operations.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainerSlow}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-5)', marginTop: 'var(--space-12)',
          }}
        >
          {metrics.map((metric, i) => (
            <motion.div key={i} variants={fadeInUp} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)',
            }}>
              <metric.icon size={24} style={{ color: metric.color, marginBottom: 'var(--space-3)' }} />
              <div style={{
                fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)',
                fontWeight: 700, color: 'white', marginBottom: 'var(--space-1)',
              }}>
                {metric.value}
              </div>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-neutral-200)', marginBottom: 'var(--space-1)' }}>
                {metric.label}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                {metric.sublabel}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---- Platform Overview Section ----
function PlatformOverview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      step: '01', title: 'Connect Your Farm',
      description: 'Register your farm, define field boundaries, and input crop information. AgroVision integrates with soil testing labs, weather stations, and IoT sensors.',
    },
    {
      step: '02', title: 'Analyze & Monitor',
      description: 'Upload soil reports for AI analysis. Monitor weather patterns, track crop health with vegetation indices, and detect diseases early through image scanning.',
    },
    {
      step: '03', title: 'Get Recommendations',
      description: 'Receive personalized fertilizer plans, irrigation schedules, pest management strategies, and optimal harvest timing — all driven by your farm data and AI models.',
    },
    {
      step: '04', title: 'Optimize & Grow',
      description: 'Track performance against benchmarks, generate seasonal reports, forecast yields, and continuously improve operations with data-driven insights.',
    },
  ];

  return (
    <section ref={ref} style={{ padding: 'var(--space-24) 0', background: 'var(--color-neutral-0)' }}>
      <div className="container">
        <motion.div
          className="section-header section-header-center"
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainer}
        >
          <motion.span variants={fadeInUp} className="section-label">
            <Layers size={14} /> How It Works
          </motion.span>
          <motion.h2 variants={fadeInUp} className="section-title" style={{ textAlign: 'center' }}>
            From Field to Insight in Four Steps
          </motion.h2>
          <motion.p variants={fadeInUp} className="section-subtitle" style={{ textAlign: 'center' }}>
            AgroVision simplifies precision agriculture into a seamless workflow.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainerSlow}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-6)', marginTop: 'var(--space-12)',
          }}
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeInUp} style={{
              position: 'relative', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)',
              background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)',
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)',
                fontWeight: 700, color: 'var(--color-primary-100)',
                position: 'absolute', top: 'var(--space-4)', right: 'var(--space-5)',
                lineHeight: 1,
              }}>
                {step.step}
              </div>
              <div style={{
                width: '40px', height: '40px', borderRadius: 'var(--radius-full)',
                background: 'var(--gradient-primary)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: 'white', fontFamily: 'var(--font-heading)',
                fontWeight: 700, fontSize: 'var(--text-sm)',
                marginBottom: 'var(--space-4)',
              }}>
                {step.step}
              </div>
              <h4 style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--text-lg)' }}>{step.title}</h4>
              <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ---- CTA Section ----
function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} style={{
      padding: 'var(--space-24) 0',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 30%, #e0f2fe 70%, #f0f9ff 100%)',
    }}>
      <div className="container">
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={staggerContainer}
          style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}
        >
          <motion.h2 variants={fadeInUp} style={{
            fontSize: 'var(--text-4xl)', fontWeight: 700, marginBottom: 'var(--space-4)',
            color: 'var(--color-neutral-900)',
          }}>
            Ready to Transform Your Farm Operations?
          </motion.h2>
          <motion.p variants={fadeInUp} style={{
            fontSize: 'var(--text-lg)', color: 'var(--color-neutral-500)',
            marginBottom: 'var(--space-8)', lineHeight: 'var(--leading-relaxed)',
          }}>
            Join thousands of farmers and agricultural enterprises using AgroVision
            to increase yields, reduce costs, and farm sustainably.
          </motion.p>
          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/dashboard" className="btn btn-primary btn-lg">
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link href="/assistant" className="btn btn-secondary btn-lg">
              Talk to AI Assistant
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ---- Main Page ----
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ChallengesSection />
      <FeaturesSection />
      <NearbyMarketSection />
      <MetricsSection />
      <PlatformOverview />
      <CTASection />
    </>
  );
}
