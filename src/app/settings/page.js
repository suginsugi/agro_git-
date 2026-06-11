'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, Moon, Sun, Monitor, Bell, 
  Globe, Save, Type, Layout, FileText, Download,
  CloudSun, Bug, LineChart, Sliders
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { settingsApi } from '@/services/api';

export default function SettingsPage() {
  const { theme, setTheme } = useAppStore();
  const [settings, setSettings] = useState({
    theme: 'system',
    font_size: 'Medium (Default)',
    dashboard_density: 'Comfortable',
    notifications: { weather_alerts: true, disease_alerts: true, market_alerts: true },
    reports: { export_preference: 'Monthly Detailed Report', download_format: 'PDF' },
    localization: { language: 'English (US)', region: 'India', time_zone: '(UTC+05:30) IST' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await settingsApi.get();
        if (data) {
          setSettings(data);
          if (data.theme) setTheme(data.theme);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, [setTheme]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsApi.update(settings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert('Failed to save settings. Please try again later.');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key, value, nestedKey = null) => {
    setSettings(prev => {
      if (nestedKey) {
        return { ...prev, [key]: { ...prev[key], [nestedKey]: value } };
      }
      return { ...prev, [key]: value };
    });
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    updateSetting('theme', newTheme);
  };

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading settings...</div>;
  }

  return (
    <div>
      {/* Page Header */}
      <div className="page-header" style={{ background: 'var(--gradient-hero)' }}>
        <div className="page-header-content">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-primary-600)',
              marginBottom: 'var(--space-3)'
            }}>
              <Settings size={16} /> Preferences
            </motion.div>
            <motion.h1 variants={fadeInUp} className="page-title">Platform Settings</motion.h1>
            <motion.p variants={fadeInUp} className="page-description">
              Customize your AgroVision experience, manage notifications, and configure your farm parameters.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Page Content */}
      <div style={{ padding: 'var(--space-12) 0', background: 'var(--color-neutral-50)', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            
            {/* Appearance Settings */}
            <motion.div variants={fadeInUp} className="card-elevated" style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ borderBottom: '1px solid var(--color-neutral-200)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Sun size={20} style={{ color: 'var(--color-primary-600)' }}/> Appearance
                </h3>
              </div>
              
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>Theme Preference</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
                  <button onClick={() => handleThemeChange('light')} style={{
                    padding: 'var(--space-4)', background: theme === 'light' ? 'var(--color-primary-50)' : 'transparent',
                    border: `2px solid ${theme === 'light' ? 'var(--color-primary-500)' : 'var(--color-neutral-200)'}`,
                    borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                    <Sun size={24} style={{ color: theme === 'light' ? 'var(--color-primary-600)' : 'var(--color-neutral-500)' }} />
                    <span style={{ fontWeight: 600, color: theme === 'light' ? 'var(--color-primary-700)' : 'var(--color-neutral-700)', fontSize: 'var(--text-sm)' }}>Light Mode</span>
                  </button>
                  <button onClick={() => handleThemeChange('dark')} style={{
                    padding: 'var(--space-4)', background: theme === 'dark' ? 'var(--color-primary-50)' : 'transparent',
                    border: `2px solid ${theme === 'dark' ? 'var(--color-primary-500)' : 'var(--color-neutral-200)'}`,
                    borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                    <Moon size={24} style={{ color: theme === 'dark' ? 'var(--color-primary-600)' : 'var(--color-neutral-500)' }} />
                    <span style={{ fontWeight: 600, color: theme === 'dark' ? 'var(--color-primary-700)' : 'var(--color-neutral-700)', fontSize: 'var(--text-sm)' }}>Dark Mode</span>
                  </button>
                  <button onClick={() => handleThemeChange('system')} style={{
                    padding: 'var(--space-4)', background: theme === 'system' ? 'var(--color-primary-50)' : 'transparent',
                    border: `2px solid ${theme === 'system' ? 'var(--color-primary-500)' : 'var(--color-neutral-200)'}`,
                    borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                    <Monitor size={24} style={{ color: theme === 'system' ? 'var(--color-primary-600)' : 'var(--color-neutral-500)' }} />
                    <span style={{ fontWeight: 600, color: theme === 'system' ? 'var(--color-primary-700)' : 'var(--color-neutral-700)', fontSize: 'var(--text-sm)' }}>System Default</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                    <Type size={16} style={{ color: 'var(--color-neutral-500)' }}/> Font Size
                  </label>
                  <select value={settings.font_size} onChange={(e) => updateSetting('font_size', e.target.value)} className="btn btn-secondary" style={{ width: '100%', textAlign: 'left', background: 'var(--color-neutral-0)' }}>
                    <option>Small</option>
                    <option>Medium (Default)</option>
                    <option>Large</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                    <Layout size={16} style={{ color: 'var(--color-neutral-500)' }}/> Dashboard Density
                  </label>
                  <select value={settings.dashboard_density} onChange={(e) => updateSetting('dashboard_density', e.target.value)} className="btn btn-secondary" style={{ width: '100%', textAlign: 'left', background: 'var(--color-neutral-0)' }}>
                    <option>Comfortable</option>
                    <option>Compact</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Notification Settings */}
            <motion.div variants={fadeInUp} className="card-elevated" style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ borderBottom: '1px solid var(--color-neutral-200)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Bell size={20} style={{ color: 'var(--color-warning)' }}/> Notifications
                </h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <CloudSun size={20} style={{ color: 'var(--color-sky-500)', marginTop: '2px' }}/>
                    <div>
                      <div style={{ fontWeight: 600 }}>Weather Alerts</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>Receive immediate alerts for extreme weather conditions.</div>
                    </div>
                  </div>
                  <input type="checkbox" checked={settings.notifications.weather_alerts} onChange={(e) => updateSetting('notifications', e.target.checked, 'weather_alerts')} style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary-500)' }} />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <Bug size={20} style={{ color: 'var(--color-danger)', marginTop: '2px' }}/>
                    <div>
                      <div style={{ fontWeight: 600 }}>Disease Alerts</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>Get notified of nearby crop disease outbreaks.</div>
                    </div>
                  </div>
                  <input type="checkbox" checked={settings.notifications.disease_alerts} onChange={(e) => updateSetting('notifications', e.target.checked, 'disease_alerts')} style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary-500)' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <LineChart size={20} style={{ color: 'var(--color-primary-600)', marginTop: '2px' }}/>
                    <div>
                      <div style={{ fontWeight: 600 }}>Market Price Alerts</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>Alerts when your preferred crops reach target prices.</div>
                    </div>
                  </div>
                  <input type="checkbox" checked={settings.notifications.market_alerts} onChange={(e) => updateSetting('notifications', e.target.checked, 'market_alerts')} style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary-500)' }} />
                </div>
              </div>
            </motion.div>

            {/* Reports Settings */}
            <motion.div variants={fadeInUp} className="card-elevated" style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ borderBottom: '1px solid var(--color-neutral-200)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <FileText size={20} style={{ color: 'var(--color-earth-500)' }}/> Reports
                </h3>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                    <Sliders size={16} style={{ color: 'var(--color-neutral-500)' }}/> Export Preferences
                  </label>
                  <select value={settings.reports.export_preference} onChange={(e) => updateSetting('reports', e.target.value, 'export_preference')} className="btn btn-secondary" style={{ width: '100%', textAlign: 'left', background: 'var(--color-neutral-0)' }}>
                    <option>Weekly Summary</option>
                    <option>Monthly Detailed Report</option>
                    <option>End of Season Analysis</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                    <Download size={16} style={{ color: 'var(--color-neutral-500)' }}/> Download Format
                  </label>
                  <select value={settings.reports.download_format} onChange={(e) => updateSetting('reports', e.target.value, 'download_format')} className="btn btn-secondary" style={{ width: '100%', textAlign: 'left', background: 'var(--color-neutral-0)' }}>
                    <option>PDF</option>
                    <option>CSV / Excel</option>
                    <option>JSON</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Account Preferences (Localization) */}
            <motion.div variants={fadeInUp} className="card-elevated" style={{ marginBottom: 'var(--space-8)' }}>
              <div style={{ borderBottom: '1px solid var(--color-neutral-200)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Globe size={20} style={{ color: 'var(--color-sky-600)' }}/> Account Preferences
                </h3>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>Language</label>
                  <select value={settings.localization.language} onChange={(e) => updateSetting('localization', e.target.value, 'language')} className="btn btn-secondary" style={{ width: '100%', textAlign: 'left', background: 'var(--color-neutral-0)' }}>
                    <option>English (US)</option>
                    <option>Hindi</option>
                    <option>Kannada</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>Region</label>
                  <select value={settings.localization.region} onChange={(e) => updateSetting('localization', e.target.value, 'region')} className="btn btn-secondary" style={{ width: '100%', textAlign: 'left', background: 'var(--color-neutral-0)' }}>
                    <option>India</option>
                    <option>United States</option>
                    <option>Australia</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>Time Zone</label>
                  <select value={settings.localization.time_zone} onChange={(e) => updateSetting('localization', e.target.value, 'time_zone')} className="btn btn-secondary" style={{ width: '100%', textAlign: 'left', background: 'var(--color-neutral-0)' }}>
                    <option>(UTC+05:30) IST</option>
                    <option>(UTC+00:00) GMT</option>
                    <option>(UTC-05:00) EST</option>
                  </select>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary btn-lg" style={{ fontSize: 'var(--text-sm)' }} onClick={handleSave} disabled={saving}>
                <Save size={18} /> {saving ? 'Saving...' : 'Save Preferences'}
              </button>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
