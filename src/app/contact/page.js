'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, Send, Trash2,
  Headphones, Microscope, Bug, TrendingUp, HelpCircle,
  ChevronDown, ChevronUp, MessageSquare, Shield
} from 'lucide-react';

// ============================================================
// EDITABLE CONTENT SECTION
// Modify this object to change page content without altering layout
// ============================================================
const contactContent = {
  header: {
    title: "Get in Touch",
    subtitle: "We're here to help you grow. Reach out to our support team for any assistance with the AgroVision platform."
  },
  contactInfo: {
    primaryPhone: "9360820223",
    alternativePhone: "7418255891",
    email: "support@agrovision.ai",
    location: "Tamil Nadu, India",
    businessHours: "Mon – Sat, 8:00 AM – 8:00 PM IST"
  },
  contactCards: [
    {
      icon: "Phone",
      title: "Call Support",
      description: "Speak directly with our agricultural experts",
      detail: "9360820223",
      detailAlt: "Alt: 7418255891",
      color: "var(--color-primary-500)"
    },
    {
      icon: "Mail",
      title: "Email Support",
      description: "Get detailed responses within 24 hours",
      detail: "support@agrovision.ai",
      detailAlt: null,
      color: "var(--color-sky-500)"
    },
    {
      icon: "MapPin",
      title: "Location",
      description: "Visit our research & development center",
      detail: "Tamil Nadu, India",
      detailAlt: null,
      color: "var(--color-earth-500)"
    },
    {
      icon: "Clock",
      title: "Business Hours",
      description: "Available for calls and live chat",
      detail: "Mon – Sat, 8 AM – 8 PM IST",
      detailAlt: "Sunday: Email only",
      color: "var(--color-warning)"
    }
  ],
  supportCategories: [
    { icon: "Headphones", title: "Technical Support", desc: "Platform issues, login, data sync" },
    { icon: "Microscope", title: "Soil Analysis Support", desc: "Reports, sampling methods, results" },
    { icon: "Bug", title: "Disease Detection Support", desc: "Image upload, diagnosis accuracy" },
    { icon: "TrendingUp", title: "Market Information Support", desc: "Price data, trends, export insights" },
    { icon: "HelpCircle", title: "General Enquiries", desc: "Subscriptions, billing, feedback" }
  ],
  faq: [
    {
      question: "How do I upload soil reports?",
      answer: "Navigate to the Soil Analysis page, click 'Upload Report', and select your soil test PDF or image. Our AI will automatically extract key nutrient values and generate recommendations."
    },
    {
      question: "How does crop analysis work?",
      answer: "AgroVision uses satellite imagery and your field sensor data to monitor crop health in real-time. Visit the Crop Report page to view NDVI maps, growth stage analysis, and yield predictions."
    },
    {
      question: "How can I view market prices?",
      answer: "Go to the Agri Market page to see real-time mandi prices, price trends, and demand forecasts for your region. You can set price alerts for specific commodities."
    },
    {
      question: "How do I update my profile?",
      answer: "Click on your profile icon in the navigation bar or go to Settings > Profile. You can update your farm details, location, crop preferences, and notification settings."
    },
    {
      question: "Is my farm data secure?",
      answer: "Absolutely. AgroVision uses enterprise-grade encryption for all data in transit and at rest. We follow strict data privacy policies and never share your data with third parties without explicit consent."
    },
    {
      question: "Can I use AgroVision on mobile?",
      answer: "Yes! AgroVision is fully responsive and works on all modern smartphones and tablets. We also offer dedicated Android and iOS apps for offline access to critical features."
    }
  ]
};

// Map icon names to components
const IconMap = { Phone, Mail, MapPin, Clock, Headphones, Microscope, Bug, TrendingUp, HelpCircle };

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        border: '1px solid var(--color-neutral-200)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'all var(--transition-base)',
        background: open ? 'var(--color-primary-50)' : 'var(--color-neutral-0)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-4) var(--space-5)',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          color: open ? 'var(--color-primary-700)' : 'var(--color-neutral-800)',
          textAlign: 'left',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <MessageSquare size={16} style={{ color: 'var(--color-primary-500)', flexShrink: 0 }} />
          {item.question}
        </span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            padding: '0 var(--space-5) var(--space-4) calc(var(--space-5) + 28px)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-neutral-600)',
            lineHeight: 'var(--leading-relaxed)',
          }}
        >
          {item.answer}
        </motion.div>
      )}
    </div>
  );
}

import { contactApi } from '@/services/api';

function ContactForm() {
  const [form, setForm] = useState({
    fullName: '', email: '', mobile: '', subject: '', message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactApi.submit({
        name: form.fullName,
        email: form.email,
        mobile: form.mobile,
        subject: form.subject,
        message: form.message
      });
      alert('Message sent successfully! Our team will get back to you within 24 hours.');
      setForm({ fullName: '', email: '', mobile: '', subject: '', message: '' });
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setForm({ fullName: '', email: '', mobile: '', subject: '', message: '' });
  };

  const inputStyle = {
    width: '100%',
    padding: 'var(--space-3) var(--space-4)',
    border: '1px solid var(--color-neutral-300)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--text-sm)',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
    background: 'var(--color-neutral-0)',
    color: 'var(--color-neutral-800)',
  };

  const labelStyle = {
    display: 'block',
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: 'var(--color-neutral-700)',
    marginBottom: 'var(--space-2)',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div>
          <label style={labelStyle} htmlFor="contact-fullName">Full Name</label>
          <input
            id="contact-fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            required
            value={form.fullName}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary-500)'; e.target.style.boxShadow = '0 0 0 3px var(--color-primary-50)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--color-neutral-300)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="contact-email">Email Address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary-500)'; e.target.style.boxShadow = '0 0 0 3px var(--color-primary-50)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--color-neutral-300)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div>
          <label style={labelStyle} htmlFor="contact-mobile">Mobile Number</label>
          <input
            id="contact-mobile"
            name="mobile"
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            required
            value={form.mobile}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary-500)'; e.target.style.boxShadow = '0 0 0 3px var(--color-primary-50)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--color-neutral-300)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="contact-subject">Subject</label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="How can we help?"
            required
            value={form.subject}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary-500)'; e.target.style.boxShadow = '0 0 0 3px var(--color-primary-50)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--color-neutral-300)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows="5"
          placeholder="Describe your issue or question in detail..."
          required
          value={form.message}
          onChange={handleChange}
          style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
          onFocus={(e) => { e.target.style.borderColor = 'var(--color-primary-500)'; e.target.style.boxShadow = '0 0 0 3px var(--color-primary-50)'; }}
          onBlur={(e) => { e.target.style.borderColor = 'var(--color-neutral-300)'; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={handleClear}
          className="btn btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
        >
          <Trash2 size={16} /> Clear Form
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
          disabled={loading}
        >
          <Send size={16} /> {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}

export default function ContactPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Header */}
      <div className="page-header" style={{ paddingBottom: 'var(--space-10)', paddingTop: 'var(--space-12)' }}>
        <div className="page-header-content" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="section-label" style={{ margin: '0 auto var(--space-4)' }}>
              <Phone size={14} /> Contact Us
            </div>
            <h1 className="page-title" style={{ textAlign: 'center' }}>
              {contactContent.header.title}
            </h1>
            <p className="page-description" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '600px' }}>
              {contactContent.header.subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--space-10)', paddingBottom: 'var(--space-16)' }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}
        >

          {/* Interactive Contact Cards — Glassmorphism */}
          <motion.div variants={itemVariants}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-5)',
            }}>
              {contactContent.contactCards.map((card, idx) => {
                const Icon = IconMap[card.icon] || Phone;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.6)',
                      borderRadius: 'var(--radius-xl)',
                      padding: 'var(--space-6)',
                      boxShadow: 'var(--shadow-card)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Accent bar */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                      background: card.color,
                    }} />
                    <div style={{
                      width: '48px', height: '48px', borderRadius: 'var(--radius-lg)',
                      background: `${card.color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 'var(--space-4)',
                    }}>
                      <Icon size={24} style={{ color: card.color }} />
                    </div>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-neutral-900)', marginBottom: 'var(--space-2)' }}>
                      {card.title}
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-3)' }}>
                      {card.description}
                    </p>
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-neutral-800)' }}>
                      {card.detail}
                    </p>
                    {card.detailAlt && (
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginTop: 'var(--space-1)' }}>
                        {card.detailAlt}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Details + Form — Two Column */}
          <motion.div variants={itemVariants} style={{
            display: 'grid',
            gridTemplateColumns: '380px 1fr',
            gap: 'var(--space-8)',
            alignItems: 'start',
          }}>
            {/* Left: Contact details */}
            <div className="card" style={{ padding: 'var(--space-8)', background: 'var(--gradient-section-green)' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-neutral-900)', marginBottom: 'var(--space-6)' }}>
                Contact Details
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={18} style={{ color: 'var(--color-primary-600)' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-neutral-800)' }}>Phone Support</h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>{contactContent.contactInfo.primaryPhone}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={18} style={{ color: 'var(--color-primary-600)' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-neutral-800)' }}>Alternative Support</h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>{contactContent.contactInfo.alternativePhone}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--color-sky-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={18} style={{ color: 'var(--color-sky-600)' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-neutral-800)' }}>Email Support</h4>
                    <a href={`mailto:${contactContent.contactInfo.email}`} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary-600)' }}>
                      {contactContent.contactInfo.email}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--color-earth-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={18} style={{ color: 'var(--color-earth-500)' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-neutral-800)' }}>Location</h4>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>{contactContent.contactInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="card" style={{ padding: 'var(--space-8)' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-neutral-900)', marginBottom: 'var(--space-2)' }}>
                Send us a Message
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-6)' }}>
                Fill out the form below and our team will respond within 24 hours.
              </p>
              <ContactForm />
            </div>
          </motion.div>

          {/* Support Categories */}
          <motion.div variants={itemVariants}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <div className="section-label" style={{ margin: '0 auto var(--space-3)' }}>
                <Shield size={14} /> Support Categories
              </div>
              <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-neutral-900)' }}>
                How Can We Help You?
              </h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-4)',
            }}>
              {contactContent.supportCategories.map((cat, idx) => {
                const Icon = IconMap[cat.icon] || HelpCircle;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="card-elevated"
                    style={{ padding: 'var(--space-5)', textAlign: 'center' }}
                  >
                    <div style={{
                      width: '52px', height: '52px', borderRadius: 'var(--radius-lg)',
                      background: 'var(--color-primary-50)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto var(--space-3)',
                    }}>
                      <Icon size={24} style={{ color: 'var(--color-primary-600)' }} />
                    </div>
                    <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-neutral-800)', marginBottom: 'var(--space-1)' }}>
                      {cat.title}
                    </h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{cat.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div variants={itemVariants}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
              <div className="section-label" style={{ margin: '0 auto var(--space-3)' }}>
                <HelpCircle size={14} /> FAQ
              </div>
              <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-neutral-900)' }}>
                Frequently Asked Questions
              </h2>
            </div>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {contactContent.faq.map((item, idx) => (
                <FAQItem key={idx} item={item} />
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
