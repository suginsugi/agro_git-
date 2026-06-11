'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Send, Sprout, CloudSun, Bug, Droplets,
  FlaskConical, BarChart3, Lightbulb, BookOpen, ChevronRight,
  Sparkles, Leaf, Brain, HelpCircle, ArrowRight, Mic
} from 'lucide-react';
import { staggerContainer, fadeInUp, staggerContainerSlow } from '@/lib/animations';
import { chatApi } from '@/services/api';

/* =========================================
   AI AGRICULTURAL ASSISTANT PAGE
   ========================================= */

const knowledgeCategories = [
  {
    icon: FlaskConical, title: 'Soil Science', color: 'var(--color-earth-500)', bg: 'var(--color-earth-50)',
    topics: ['Soil Testing Methods', 'Nutrient Management', 'pH Correction', 'Organic Carbon Building', 'Soil Microbiome'],
  },
  {
    icon: CloudSun, title: 'Weather & Climate', color: 'var(--color-sky-600)', bg: 'var(--color-sky-50)',
    topics: ['Monsoon Forecasting', 'Frost Protection', 'Heat Stress Management', 'Rainfall Planning', 'Climate Adaptation'],
  },
  {
    icon: Sprout, title: 'Crop Management', color: 'var(--color-primary-600)', bg: 'var(--color-primary-50)',
    topics: ['Variety Selection', 'Growth Stage Nutrition', 'Intercropping Patterns', 'Seed Treatment', 'Harvest Timing'],
  },
  {
    icon: Bug, title: 'Pest & Disease', color: 'var(--color-danger)', bg: '#fef2f2',
    topics: ['IPM Strategies', 'Biological Control', 'Disease Identification', 'Resistance Management', 'Organic Pesticides'],
  },
  {
    icon: Droplets, title: 'Irrigation', color: 'var(--color-sky-500)', bg: 'var(--color-sky-50)',
    topics: ['Drip System Design', 'Deficit Irrigation', 'Water Quality', 'Scheduling Models', 'Fertigation'],
  },
  {
    icon: BarChart3, title: 'Farm Economics', color: 'var(--color-primary-700)', bg: 'var(--color-primary-50)',
    topics: ['Cost Optimization', 'Market Timing', 'Subsidy Programs', 'Crop Insurance', 'Input Planning'],
  },
];

const suggestedQuestions = [
  { q: 'What is the ideal NPK ratio for paddy during the tillering stage?', category: 'Soil' },
  { q: 'How do I prevent Late Blight in tomatoes during monsoon season?', category: 'Disease' },
  { q: 'When should I start irrigating groundnut after sowing in red soil?', category: 'Irrigation' },
  { q: 'What are the best intercropping combinations for ragi in Karnataka?', category: 'Crop' },
  { q: 'How to improve organic carbon content in laterite soils economically?', category: 'Soil' },
  { q: 'What weather conditions increase the risk of Blast disease in finger millet?', category: 'Weather' },
];

const sampleConversation = [
  {
    role: 'user',
    content: 'My tomato plants in Block C are showing brown water-soaked lesions on the leaves. Humidity has been above 80% for the past 3 days. What should I do?',
  },
  {
    role: 'assistant',
    content: `Based on your description — brown water-soaked lesions combined with sustained high humidity (>80%) — this is highly indicative of **Late Blight** (*Phytophthora infestans*), which is consistent with the detection our system flagged for Block C.

**Immediate Actions (Next 24 Hours):**
1. **Spray Mancozeb 75% WP** at 2.5 g/L or **Copper Oxychloride** at 3 g/L — apply in the evening to avoid leaf burn
2. **Remove and destroy** severely infected leaves and fruits (do not compost)
3. **Improve air circulation** by pruning lower branches touching the soil

**Follow-up (Next 7 Days):**
- Apply **Metalaxyl + Mancozeb** (Ridomil Gold) at 2 g/L if initial spray doesn't arrest spread
- Avoid overhead irrigation — switch to drip only for the next 2 weeks
- Reduce nitrogen application by 25% to harden plant tissue

**Prevention for Next Season:**
- Use resistant varieties like **Arka Rakshak** or **Arka Abhed**
- Ensure 60 cm row spacing for better ventilation
- Apply preventive Bordeaux mixture before monsoon onset

⚡ *I've cross-referenced this with your Block C soil data — your current pH of 6.4 is within the susceptible range for Phytophthora. Consider raising pH to 6.8-7.0 with agricultural lime.*`,
  },
];

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        const history = await chatApi.getHistory();
        if (history && history.length > 0) {
          setMessages(history);
        } else {
          // Add a welcome message if empty
          setMessages([
            { role: 'assistant', content: 'Hello! I am your AgroVision AI Assistant. How can I help you today with your farming operations?' }
          ]);
        }
      } catch (error) {
        console.error("Failed to load chat history:", error);
      }
    }
    loadHistory();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text) => {
    const msg = text || inputValue;
    if (!msg.trim()) return;

    // Add user message optimistically
    const userMsg = { role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await chatApi.send(msg);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error connecting to my knowledge base. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionClick = (question) => {
    handleSend(question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-6)', height: 'calc(100vh - var(--navbar-height) - 160px)', minHeight: '600px' }}>
      {/* Main Chat Area */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        background: 'var(--color-neutral-0)', borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--color-neutral-200)', overflow: 'hidden',
      }}>
        {/* Chat Header */}
        <div style={{
          padding: 'var(--space-4) var(--space-6)',
          borderBottom: '1px solid var(--color-neutral-200)',
          display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
          background: 'var(--color-neutral-50)',
        }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: 'var(--radius-lg)',
            background: 'var(--gradient-primary)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: 'white',
          }}>
            <Brain size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-base)' }}>AgroVision AI</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary-600)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-success)' }} />
              Agricultural Intelligence Assistant
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: 'var(--space-6)',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-5)',
        }}>
          {/* Welcome message */}
          <div style={{
            textAlign: 'center', padding: 'var(--space-6)',
            maxWidth: '500px', margin: '0 auto',
          }}>
            <Sparkles size={32} style={{ color: 'var(--color-primary-400)', margin: '0 auto var(--space-3)' }} />
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
              Agricultural Intelligence Assistant
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
              Ask me anything about soil science, crop management, weather planning,
              pest control, irrigation, or farm economics. I have access to your farm
              data for contextual recommendations.
            </p>
          </div>

          {messages.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: msg.role === 'user' ? '70%' : '85%',
            }}>
              {msg.role === 'assistant' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: 'var(--radius-sm)',
                    background: 'var(--gradient-primary)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: 'white',
                  }}>
                    <Sprout size={14} />
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-neutral-500)' }}>AgroVision AI</span>
                </div>
              )}
              <div style={{
                padding: 'var(--space-4) var(--space-5)',
                borderRadius: msg.role === 'user'
                  ? 'var(--radius-xl) var(--radius-xl) var(--radius-sm) var(--radius-xl)'
                  : 'var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-sm)',
                background: msg.role === 'user' ? 'var(--gradient-primary)' : 'var(--color-neutral-100)',
                color: msg.role === 'user' ? 'white' : 'var(--color-neutral-800)',
                fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)',
                whiteSpace: 'pre-line',
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: 'var(--radius-sm)',
                    background: 'var(--gradient-primary)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: 'white',
                  }}>
                    <Sprout size={14} />
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-neutral-500)' }}>AgroVision AI</span>
                </div>
                <div style={{ padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-sm)', background: 'var(--color-neutral-100)', color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)' }}>
                  Thinking...
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: 'var(--space-4) var(--space-6)',
          borderTop: '1px solid var(--color-neutral-200)',
          display: 'flex', gap: 'var(--space-3)', alignItems: 'center',
        }}>
          <input
            type="text"
            className="chat-input"
            placeholder="Ask about soil, crops, weather, pests, irrigation..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ flex: 1, padding: 'var(--space-3) var(--space-4)' }}
            disabled={loading}
          />
          <button className="btn btn-icon" style={{ background: 'var(--color-neutral-100)', color: 'var(--color-neutral-600)' }} disabled={loading}>
            <Mic size={18} />
          </button>
          <button className="btn btn-primary btn-icon" style={{ borderRadius: 'var(--radius-lg)' }} onClick={() => handleSend()} disabled={loading}>
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', overflowY: 'auto' }}>
        {/* Suggested Questions */}
        <div className="card-elevated" style={{ padding: 'var(--space-4)' }}>
          <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Lightbulb size={16} style={{ color: 'var(--color-warning)' }} /> Suggested Questions
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {suggestedQuestions.map((sq, i) => (
              <button
                key={i}
                onClick={() => handleQuestionClick(sq.q)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)',
                  padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-md)',
                  background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)',
                  fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)',
                  textAlign: 'left', cursor: 'pointer', transition: 'all var(--transition-fast)',
                  lineHeight: 1.4,
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = 'var(--color-primary-50)'; e.currentTarget.style.borderColor = 'var(--color-primary-300)'; }}
                onMouseOut={(e) => { e.currentTarget.style.background = 'var(--color-neutral-50)'; e.currentTarget.style.borderColor = 'var(--color-neutral-200)'; }}
              >
                <HelpCircle size={14} style={{ flexShrink: 0, color: 'var(--color-primary-500)', marginTop: '1px' }} />
                {sq.q}
              </button>
            ))}
          </div>
        </div>

        {/* Knowledge Categories */}
        <div className="card-elevated" style={{ padding: 'var(--space-4)' }}>
          <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-neutral-700)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <BookOpen size={16} style={{ color: 'var(--color-primary-600)' }} /> Knowledge Base
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {knowledgeCategories.map((cat, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                cursor: 'pointer', transition: 'background var(--transition-fast)',
              }}
                onMouseOver={(e) => e.currentTarget.style.background = 'var(--color-neutral-50)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: 'var(--radius-md)',
                  background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: cat.color, flexShrink: 0,
                }}>
                  <cat.icon size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-neutral-800)' }}>{cat.title}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                    {cat.topics.length} topics
                  </div>
                </div>
                <ChevronRight size={14} style={{ color: 'var(--color-neutral-400)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header" style={{ paddingBottom: 'var(--space-6)' }}>
        <div className="page-header-content">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-primary-700)',
              marginBottom: 'var(--space-3)'
            }}>
              <Brain size={16} /> AI Decision Support
            </motion.div>
            <motion.h1 variants={fadeInUp} className="page-title">Agricultural AI Assistant</motion.h1>
            <motion.p variants={fadeInUp} className="page-description">
              Get expert-level agricultural guidance powered by agronomic models, 
              your farm data, and decades of research.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Chat Interface */}
      <div style={{ padding: 'var(--space-6) 0 var(--space-12)', background: 'var(--color-neutral-50)' }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <ChatInterface />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
