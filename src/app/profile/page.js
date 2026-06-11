'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, MapPin, Phone, Mail, 
  Map, Sprout, Droplets, Activity, FileText, Bug, LineChart, Target, AlertTriangle
} from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { profileApi } from '@/services/api';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await profileApi.get();
        setProfileData(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading profile...</div>;
  }

  const initials = profileData?.name ? profileData.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'RS';

  return (
    <div>
      {/* Page Header */}
      <div className="page-header" style={{ background: 'var(--gradient-hero)' }}>
        <div className="page-header-content">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-earth-600)',
              marginBottom: 'var(--space-3)'
            }}>
              <User size={16} /> Account Overview
            </motion.div>
            <motion.h1 variants={fadeInUp} className="page-title">Farmer Profile</motion.h1>
          </motion.div>
        </div>
      </div>

      {/* Page Content */}
      <div style={{ padding: 'var(--space-12) 0', background: 'var(--color-neutral-50)', minHeight: '100vh' }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)' }}>
            
            {/* Left Column: Personal Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <motion.div variants={fadeInUp} className="card-elevated" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                <div style={{ 
                  width: '120px', height: '120px', borderRadius: '50%', 
                  background: 'var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto var(--space-4)', border: '4px solid var(--color-neutral-0)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  fontSize: '48px', fontWeight: 700, color: 'var(--color-primary-600)'
                }}>
                  {initials}
                </div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, marginBottom: 'var(--space-1)' }}>{profileData?.name || 'Raj Singh'}</h3>
                <div style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>Farmer ID: {profileData?.farmer_id || 'AGR-88219-X'}</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', textAlign: 'left', borderTop: '1px solid var(--color-neutral-200)', paddingTop: 'var(--space-6)' }}>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-neutral-500)', fontWeight: 700, letterSpacing: '0.05em' }}>Farmer Information</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                    <User size={16} style={{ color: 'var(--color-neutral-400)' }}/> 
                    <span style={{ fontWeight: 500 }}>{profileData?.name || 'Rajeshwara Singh'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                    <Phone size={16} style={{ color: 'var(--color-neutral-400)' }}/> 
                    <span style={{ fontWeight: 500 }}>{profileData?.phone || '+91 98765 43210'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                    <Mail size={16} style={{ color: 'var(--color-neutral-400)' }}/> 
                    <span style={{ fontWeight: 500 }}>{profileData?.email || 'raj.singh@agrovision.test'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                    <MapPin size={16} style={{ color: 'var(--color-neutral-400)', marginTop: '2px' }}/> 
                    <span style={{ fontWeight: 500 }}>{profileData?.location || 'Plot 42, Green Valley Estate\nMysuru, Karnataka, India'}</span>
                  </div>
                </div>
                
                <button className="btn btn-outline-primary" style={{ width: '100%', marginTop: 'var(--space-6)' }}>Edit Profile</button>
              </motion.div>
            </div>

            {/* Right Column: Farm Details & Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              
              <motion.div variants={fadeInUp} className="card-elevated">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                  <h3 style={{ fontSize: 'var(--text-lg)' }}>Farm Information</h3>
                  <button className="btn btn-secondary btn-sm">Update Details</button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <div style={{ padding: 'var(--space-2)', background: 'var(--color-earth-50)', borderRadius: 'var(--radius-md)', color: 'var(--color-earth-600)' }}>
                      <Map size={24} />
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontWeight: 600 }}>Total Land Area</div>
                      <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>{profileData?.farm_details?.total_area || '500'} Hectares</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <div style={{ padding: 'var(--space-2)', background: 'var(--color-primary-50)', borderRadius: 'var(--radius-md)', color: 'var(--color-primary-600)' }}>
                      <Sprout size={24} />
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontWeight: 600 }}>Crop Types</div>
                      <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>{profileData?.farm_details?.crop_types?.join(', ') || 'Paddy, Ragi, Tomato'}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <div style={{ padding: 'var(--space-2)', background: 'var(--color-sky-50)', borderRadius: 'var(--radius-md)', color: 'var(--color-sky-600)' }}>
                      <Droplets size={24} />
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontWeight: 600 }}>Irrigation Type</div>
                      <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>{profileData?.farm_details?.irrigation_type || 'Smart Drip (Zoned)'}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <div style={{ padding: 'var(--space-2)', background: 'var(--color-warning)', bgOpacity: 0.1, borderRadius: 'var(--radius-md)', color: 'var(--color-earth-600)' }}>
                      <Activity size={24} />
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontWeight: 600 }}>Soil Type</div>
                      <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>{profileData?.farm_details?.soil_type || 'Clay Loam'}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="card-elevated">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                  <h3 style={{ fontSize: 'var(--text-lg)' }}>Market Preferences</h3>
                  <button className="btn btn-secondary btn-sm">Manage Alerts</button>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
                  <div style={{ padding: 'var(--space-4)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                      <Target size={16} style={{ color: 'var(--color-primary-600)' }}/>
                      <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>Preferred Crops</span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      <span className="badge badge-success">Tomato</span>
                      <span className="badge badge-success">Onion</span>
                      <span className="badge badge-success">Paddy</span>
                    </div>
                  </div>

                  <div style={{ padding: 'var(--space-4)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                      <MapPin size={16} style={{ color: 'var(--color-sky-600)' }}/>
                      <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>Preferred Markets</span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      <span className="badge badge-info">Mysuru APMC</span>
                      <span className="badge badge-info">Mandya APMC</span>
                    </div>
                  </div>

                  <div style={{ padding: 'var(--space-4)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                      <AlertTriangle size={16} style={{ color: 'var(--color-warning)' }}/>
                      <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>Alert Settings</span>
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>
                      Notify when price drops by &gt; 5% or reaches target of ₹3000/qtl.
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="card-elevated">
                <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)' }}>Platform Usage Statistics</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
                  <div style={{ padding: 'var(--space-5)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)', textAlign: 'center' }}>
                    <FileText size={24} style={{ margin: '0 auto var(--space-2)', color: 'var(--color-primary-500)' }} />
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-neutral-900)' }}>12</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', fontWeight: 500 }}>Soil Analyses</div>
                  </div>
                  
                  <div style={{ padding: 'var(--space-5)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)', textAlign: 'center' }}>
                    <Bug size={24} style={{ margin: '0 auto var(--space-2)', color: 'var(--color-danger)' }} />
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-neutral-900)' }}>34</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', fontWeight: 500 }}>Disease Scans</div>
                  </div>

                  <div style={{ padding: 'var(--space-5)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)', textAlign: 'center' }}>
                    <Sprout size={24} style={{ margin: '0 auto var(--space-2)', color: 'var(--color-success)' }} />
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-neutral-900)' }}>8</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', fontWeight: 500 }}>Crop Reports</div>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
