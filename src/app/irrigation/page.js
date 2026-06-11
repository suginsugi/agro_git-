'use client';

import { motion } from 'framer-motion';
import {
  Droplets, Activity, Clock, Gauge, TrendingDown,
  Zap, Calendar, CheckCircle, AlertTriangle, Timer,
  Waves, CloudRain, Sprout
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, BarChart, Bar, Legend, ComposedChart, Line
} from 'recharts';

import GaugeChart from '@/components/ui/GaugeChart';
import {
  irrigationZones, waterUsageHistory,
  irrigationSchedule, waterEfficiencyMetrics
} from '@/data/irrigationData';
import { staggerContainer, fadeInUp, staggerContainerSlow } from '@/lib/animations';

/* =========================================
   SMART IRRIGATION PAGE
   ========================================= */

function MoistureDashboard() {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'active': return { color: 'var(--color-success)', bg: 'var(--color-primary-50)', label: 'Active', icon: <Activity size={14} /> };
      case 'scheduled': return { color: 'var(--color-sky-600)', bg: 'var(--color-sky-50)', label: 'Scheduled', icon: <Clock size={14} /> };
      case 'idle': return { color: 'var(--color-neutral-500)', bg: 'var(--color-neutral-100)', label: 'Idle', icon: <Timer size={14} /> };
      case 'needs-attention': return { color: 'var(--color-danger)', bg: '#fef2f2', label: 'Needs Attention', icon: <AlertTriangle size={14} /> };
      default: return { color: 'var(--color-neutral-500)', bg: 'var(--color-neutral-100)', label: status, icon: null };
    }
  };

  return (
    <div className="card-elevated" style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Zone Moisture Status</h3>
          <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)' }}>
            Real-time soil moisture readings from field sensors across all zones
          </p>
        </div>
        <div className="badge badge-success"><Waves size={14} /> 4/5 Zones Optimal</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
        {irrigationZones.map((zone, i) => {
          const statusInfo = getStatusStyles(zone.status);
          const moisturePercent = (zone.soilMoisture / zone.targetMoisture) * 100;
          const moistureColor = moisturePercent >= 90 ? 'var(--color-success)' :
            moisturePercent >= 70 ? 'var(--color-sky-500)' :
            moisturePercent >= 50 ? 'var(--color-warning)' : 'var(--color-danger)';

          return (
            <div key={i} style={{
              border: '1px solid var(--color-neutral-200)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
              background: 'var(--color-neutral-0)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Top accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: moistureColor }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontWeight: 600, marginBottom: '2px' }}>{zone.id}</div>
                  <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{zone.name}</h4>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  fontSize: 'var(--text-xs)', fontWeight: 600,
                  color: statusInfo.color, background: statusInfo.bg,
                  padding: '2px 8px', borderRadius: 'var(--radius-full)'
                }}>
                  {statusInfo.icon} {statusInfo.label}
                </div>
              </div>

              {/* Moisture gauge */}
              <div style={{ textAlign: 'center', margin: 'var(--space-4) 0' }}>
                <div style={{
                  fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)',
                  fontWeight: 700, color: moistureColor
                }}>
                  {zone.soilMoisture}%
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                  Target: {zone.targetMoisture}%
                </div>
                <div className="progress-bar" style={{ marginTop: 'var(--space-2)' }}>
                  <div className="progress-bar-fill" style={{
                    width: `${Math.min(moisturePercent, 100)}%`,
                    background: moistureColor,
                  }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', fontSize: 'var(--text-xs)' }}>
                <div style={{ color: 'var(--color-neutral-500)' }}>
                  <div style={{ marginBottom: '2px' }}>Type</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-neutral-700)' }}>{zone.type}</div>
                </div>
                <div style={{ color: 'var(--color-neutral-500)' }}>
                  <div style={{ marginBottom: '2px' }}>Crop</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-neutral-700)' }}>{zone.crop}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WaterUsageChart() {
  return (
    <div className="card-elevated" style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Water Consumption Analytics</h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
          Daily water usage (liters) vs target allocation and natural rainfall contribution
        </p>
      </div>

      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={waterUsageHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-sky-500)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-sky-500)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend iconType="circle" />
            <Area type="monotone" dataKey="usage" name="Water Used (L)" stroke="var(--color-sky-500)" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
            <Line type="monotone" dataKey="target" name="Daily Target (L)" stroke="var(--color-neutral-400)" strokeWidth={2} strokeDasharray="6 4" dot={false} />
            <Bar dataKey="rainfall" name="Rainfall (mm)" fill="var(--color-sky-200)" radius={[4, 4, 0, 0]} barSize={16} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function IrrigationScheduleTable() {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <span className="badge badge-success"><CheckCircle size={12} /> Done</span>;
      case 'upcoming': return <span className="badge badge-info"><Clock size={12} /> Upcoming</span>;
      case 'active': return <span className="badge badge-warning"><Activity size={12} /> Active</span>;
      default: return <span className="badge badge-neutral">{status}</span>;
    }
  };

  return (
    <div className="card-elevated" style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Today&apos;s Schedule</h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>June 2, 2026 — Automated and manual irrigation events</p>
        </div>
        <button className="btn btn-outline-primary btn-sm">
          <Calendar size={14} /> View Full Calendar
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Zone</th>
              <th>Duration</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {irrigationSchedule.map((event, i) => (
              <tr key={i}>
                <td className="value-cell">{event.time}</td>
                <td style={{ fontWeight: 500 }}>{event.zone}</td>
                <td>{event.duration}</td>
                <td>
                  <span style={{
                    fontSize: 'var(--text-xs)', fontWeight: 500,
                    padding: '2px 8px', borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-sky-50)', color: 'var(--color-sky-700)'
                  }}>
                    {event.type}
                  </span>
                </td>
                <td>{getStatusBadge(event.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WaterEfficiency() {
  const metrics = waterEfficiencyMetrics;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)' }}>
      {/* Efficiency Score */}
      <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)', alignSelf: 'flex-start' }}>Water Efficiency Score</h3>

        <GaugeChart
          value={metrics.overallEfficiency}
          max={100}
          size={180}
          strokeWidth={14}
          color="var(--color-sky-500)"
        />

        <div style={{ width: '100%', marginTop: 'var(--space-6)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div style={{ background: 'var(--color-primary-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: '2px' }}>Water Saved</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--color-success)' }}>
              {(metrics.waterSaved / 1000).toFixed(1)}K L
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', fontWeight: 600 }}>
              ↓ {metrics.waterSavedPercent}% vs last week
            </div>
          </div>
          <div style={{ background: 'var(--color-sky-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: '2px' }}>Cost Savings</div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--color-sky-700)' }}>
              {metrics.costSavings}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-sky-600)', fontWeight: 600 }}>This week</div>
          </div>
        </div>
      </div>

      {/* Optimization Recommendations */}
      <div className="card-elevated">
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Optimization Recommendations</h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
            AI-generated suggestions to improve water usage efficiency
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {metrics.recommendations.map((rec, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)',
              padding: 'var(--space-4)', background: 'var(--color-neutral-50)',
              borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-sky-400)'
            }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: 'var(--radius-full)',
                background: 'var(--color-sky-100)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, color: 'var(--color-sky-600)',
                fontSize: 'var(--text-xs)', fontWeight: 700,
              }}>
                {i + 1}
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                {rec}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function IrrigationPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #f0fdf4 100%)' }}>
        <div className="page-header-content">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} style={{
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-sky-600)',
              marginBottom: 'var(--space-3)'
            }}>
              <Droplets size={16} /> Resource Management
            </motion.div>
            <motion.h1 variants={fadeInUp} className="page-title">Smart Irrigation Control</motion.h1>
            <motion.p variants={fadeInUp} className="page-description">
              Zone-level moisture monitoring with AI-optimized scheduling to maximize
              water efficiency and reduce waste by up to 40%.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Page Content */}
      <div style={{ padding: 'var(--space-12) 0', background: 'var(--color-neutral-50)', minHeight: '100vh' }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainerSlow}>
            <motion.div variants={fadeInUp}><MoistureDashboard /></motion.div>
            <motion.div variants={fadeInUp}><WaterUsageChart /></motion.div>
            <motion.div variants={fadeInUp}><IrrigationScheduleTable /></motion.div>
            <motion.div variants={fadeInUp}><WaterEfficiency /></motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
