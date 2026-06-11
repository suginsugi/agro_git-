'use client';

import { motion } from 'framer-motion';
import { 
  Leaf, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Droplet, 
  CloudSun, 
  Microscope,
  Bot,
  CheckCircle2,
  Calendar,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import '@/app/globals.css';

// EDITABLE CONTENT SECTION - modify this object to change page content without altering layout
const aboutContent = {
  header: {
    title: "About AgroVision",
    subtitle: "Empowering agriculture through intelligence and data-driven insights."
  },
  companyOverview: {
    title: "Company Overview",
    description: "AgroVision is an AI-powered smart agriculture platform that helps farmers make better decisions using soil intelligence, weather analytics, crop monitoring, disease detection, irrigation management, and market intelligence."
  },
  vision: {
    title: "Our Vision",
    description: "To empower farmers through intelligent technology and data-driven agriculture."
  },
  mission: {
    title: "Our Mission",
    description: "Provide accessible agricultural intelligence tools that improve productivity, sustainability, and profitability."
  },
  features: {
    title: "Core Features",
    items: [
      { name: "Soil Analysis", icon: "Microscope", desc: "Advanced soil health monitoring and nutrient analysis." },
      { name: "Weather Intelligence", icon: "CloudSun", desc: "Hyper-local weather forecasting and alerts." },
      { name: "Crop Monitoring", icon: "Leaf", desc: "Real-time crop health and growth tracking." },
      { name: "Disease Detection", icon: "ShieldCheck", desc: "AI-powered early disease identification." },
      { name: "Smart Irrigation", icon: "Droplet", desc: "Optimized water management systems." },
      { name: "Agri Market Intelligence", icon: "TrendingUp", desc: "Real-time market prices and trends." },
      { name: "AI Assistant", icon: "Bot", desc: "24/7 intelligent agricultural support." }
    ]
  },
  timeline: {
    title: "Platform Timeline",
    events: [
      { phase: "Research", description: "Analyzing agricultural challenges and technology gaps." },
      { phase: "Development", description: "Building AI models and core platform infrastructure." },
      { phase: "Deployment", description: "Launching pilot programs with local farmers." },
      { phase: "Future Expansion", description: "Scaling to new regions and adding advanced capabilities." }
    ]
  },
  whyAgroVision: {
    title: "Why AgroVision",
    sections: [
      { title: "Agricultural challenges", content: "Addressing unpredictable weather, soil degradation, and market volatility." },
      { title: "Technology solutions", content: "Leveraging AI, IoT, and data analytics for precision farming." },
      { title: "Benefits for farmers", content: "Increased yield, reduced costs, and risk mitigation." },
      { title: "Benefits for agricultural businesses", content: "Data-driven insights for supply chain and market planning." }
    ]
  }
};

// Map string icon names to actual Lucide components
const IconMap = {
  Microscope, CloudSun, Leaf, ShieldCheck, Droplet, TrendingUp, Bot
};

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="page-container" style={{ paddingTop: 'calc(var(--navbar-height) + 2rem)' }}>
      {/* Header Section */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary-800)', marginBottom: '1rem' }}>
          {aboutContent.header.title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-neutral-600)', maxWidth: '600px', margin: '0 auto' }}>
          {aboutContent.header.subtitle}
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}
      >
        {/* Company Overview */}
        <motion.div variants={itemVariants} className="card p-8" style={{ background: 'var(--color-primary-50)' }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary-800)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe className="text-primary-600" /> {aboutContent.companyOverview.title}
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: 'var(--color-neutral-700)' }}>
            {aboutContent.companyOverview.description}
          </p>
        </motion.div>

        {/* Vision & Mission */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <motion.div variants={itemVariants} className="card p-6" style={{ borderTop: '4px solid var(--color-primary-500)' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary-700)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={24} /> {aboutContent.vision.title}
            </h3>
            <p style={{ color: 'var(--color-neutral-600)', lineHeight: 1.6 }}>{aboutContent.vision.description}</p>
          </motion.div>
          <motion.div variants={itemVariants} className="card p-6" style={{ borderTop: '4px solid var(--color-primary-500)' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary-700)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Leaf size={24} /> {aboutContent.mission.title}
            </h3>
            <p style={{ color: 'var(--color-neutral-600)', lineHeight: 1.6 }}>{aboutContent.mission.description}</p>
          </motion.div>
        </div>

        {/* Core Features */}
        <motion.div variants={itemVariants}>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', color: 'var(--color-neutral-800)', marginBottom: '2rem' }}>
            {aboutContent.features.title}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {aboutContent.features.items.map((feature, idx) => {
              const Icon = IconMap[feature.icon] || Leaf;
              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="card p-6"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
                >
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Icon size={30} style={{ color: 'var(--color-primary-600)' }} />
                  </div>
                  <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-neutral-800)' }}>{feature.name}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-600)' }}>{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={itemVariants} className="card p-8" style={{ background: 'linear-gradient(to right bottom, var(--color-neutral-0), var(--color-primary-50))' }}>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', color: 'var(--color-neutral-800)', marginBottom: '2.5rem' }}>
            {aboutContent.timeline.title}
          </h2>
          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            {/* Timeline vertical line */}
            <div style={{ position: 'absolute', left: '11px', top: '10px', bottom: '10px', width: '2px', background: 'var(--color-primary-200)' }}></div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {aboutContent.timeline.events.map((event, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-2.3rem', top: '4px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--color-primary-500)', border: '4px solid white', zIndex: 2 }}></div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontWeight: 700, color: 'var(--color-primary-700)', fontSize: '1.2rem', marginBottom: '0.25rem' }}>
                        {event.phase}
                      </h4>
                      <p style={{ color: 'var(--color-neutral-600)' }}>{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Why AgroVision */}
        <motion.div variants={itemVariants} style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', color: 'var(--color-neutral-800)', marginBottom: '2rem' }}>
            {aboutContent.whyAgroVision.title}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {aboutContent.whyAgroVision.sections.map((section, idx) => (
              <div key={idx} className="card p-5" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <CheckCircle2 style={{ color: 'var(--color-secondary-500)', flexShrink: 0, marginTop: '2px' }} size={20} />
                <div>
                  <h4 style={{ fontWeight: 600, color: 'var(--color-neutral-800)', marginBottom: '0.25rem' }}>{section.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-neutral-600)' }}>{section.content}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
