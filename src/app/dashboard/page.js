'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Sprout, Droplets, Thermometer, Wind, AlertTriangle, 
  ChevronRight, Activity, Calendar, MapPin, Search, Plus, BarChart3,
  LayoutDashboard, CloudSun, Bug, TrendingUp, TrendingDown,
  Leaf, FileUp, ScanSearch, MessageSquare, Bell, Settings,
  Sun, ArrowUpRight, ArrowDownRight, Minus
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, BarChart, Bar
} from 'recharts';

import LocationDisplay from '@/components/ui/LocationDisplay';
import GaugeChart from '@/components/ui/GaugeChart';
import {
  dashboardSummary, farmPerformanceData, activeAlerts,
  quickActions, cropStatusSummary
} from '@/data/dashboardData';
import { currentWeather } from '@/data/weatherData';
import { soilHealthScore } from '@/data/soilData';
import { irrigationZones, waterEfficiencyMetrics } from '@/data/irrigationData';
import { staggerContainer, fadeInUp, blurReveal, staggerContainerSlow, cardHover, buttonTap } from '@/lib/animations';
import { dashboardApi } from '@/services/api';

/* =========================================
   ENTERPRISE DASHBOARD
   ========================================= */

function DashboardHeader() {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: 'var(--space-4)',
    }}>
      <div>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, marginBottom: 'var(--space-1)' }}>
          Farm Command Center
        </h1>
        <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <LocationDisplay variant="dashboard" />
          <span style={{ margin: '0 var(--space-2)', color: 'var(--color-neutral-300)' }}>|</span>
          <Calendar size={14} /> {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <button className="btn btn-secondary btn-sm"><Bell size={16} /> 3 Alerts</button>
        <button className="btn btn-secondary btn-sm"><Settings size={16} /></button>
      </div>
    </div>
  );
}

function QuickActionsBar() {
  const getIcon = (iconName) => {
    const icons = { FileUp, CloudSun, ScanSearch, BarChart3, Droplets, MessageSquare };
    const Icon = icons[iconName] || Sprout;
    return <Icon size={18} />;
  };

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)',
      gap: 'var(--space-3)', marginBottom: 'var(--space-6)',
    }}>
      {quickActions.map((action, i) => (
        <Link key={i} href={action.href} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 'var(--space-2)', padding: 'var(--space-4)',
          background: 'var(--color-neutral-0)', border: '1px solid var(--color-neutral-200)',
          borderRadius: 'var(--radius-lg)', cursor: 'pointer',
          transition: 'all var(--transition-fast)', textAlign: 'center',
        }}
          onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary-300)'; e.currentTarget.style.background = 'var(--color-primary-50)'; }}
          onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--color-neutral-200)'; e.currentTarget.style.background = 'var(--color-neutral-0)'; }}
        >
          <div style={{ color: 'var(--color-primary-600)' }}>{getIcon(action.icon)}</div>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-neutral-700)' }}>{action.label}</span>
        </Link>
      ))}
    </div>
  );
}

function OverviewMetrics({ summary }) {
  const metrics = [
    {
      label: 'Total Farm Area', value: `${summary.totalArea || dashboardSummary.totalArea} ha`,
      icon: MapPin, color: 'var(--color-primary-600)', bg: 'var(--color-primary-50)',
      sub: `${dashboardSummary.activeCrops} active crops`,
    },
    {
      label: 'Soil Health Index', value: `${summary.soilHealthAvg || dashboardSummary.soilHealthAvg}/100`,
      icon: Leaf, color: 'var(--color-earth-500)', bg: 'var(--color-earth-50)',
      sub: 'Moderate — action needed', trend: 'warning',
    },
    {
      label: 'Active Alerts', value: summary.diseaseAlerts !== undefined ? summary.diseaseAlerts : dashboardSummary.diseaseAlerts,
      icon: AlertTriangle, color: 'var(--color-danger)', bg: '#fef2f2',
      sub: 'Disease + Weather warnings', trend: 'danger',
    },
    {
      label: 'Yield Forecast', value: summary.yieldForecast || dashboardSummary.yieldForecast,
      icon: TrendingUp, color: 'var(--color-success)', bg: 'var(--color-primary-50)',
      sub: 'Above regional average', trend: 'up',
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
      {metrics.map((m, i) => (
        <motion.div key={i} variants={blurReveal} whileHover="hover" initial="rest" className="card-elevated" style={{ padding: 'var(--space-5)', position: 'relative', overflow: 'hidden' }}>
          <motion.div variants={cardHover}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: 'var(--radius-md)',
                background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: m.color,
              }}>
                <m.icon size={20} />
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-neutral-900)', marginBottom: '2px' }}>
              {m.value}
            </div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-neutral-600)', marginBottom: 'var(--space-1)' }}>
              {m.label}
            </div>
            <div style={{
              fontSize: 'var(--text-xs)',
              color: m.trend === 'up' ? 'var(--color-success)' : m.trend === 'danger' ? 'var(--color-danger)' : m.trend === 'warning' ? 'var(--color-warning)' : 'var(--color-neutral-500)',
              fontWeight: 500,
            }}>
              {m.sub}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

function CropStatusWidget() {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <ArrowUpRight size={14} style={{ color: 'var(--color-success)' }} />;
      case 'down': return <ArrowDownRight size={14} style={{ color: 'var(--color-danger)' }} />;
      default: return <Minus size={14} style={{ color: 'var(--color-neutral-400)' }} />;
    }
  };

  const getHealthColor = (health) => {
    if (health >= 90) return 'var(--color-success)';
    if (health >= 75) return 'var(--color-primary-500)';
    if (health >= 60) return 'var(--color-warning)';
    return 'var(--color-danger)';
  };

  return (
    <div className="dashboard-widget" style={{ gridColumn: 'span 2' }}>
      <div className="dashboard-widget-header">
        <div className="dashboard-widget-title">
          <Sprout size={16} style={{ color: 'var(--color-primary-600)' }} /> Crop Health Summary
        </div>
        <Link href="/crop-report" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          Details <ChevronRight size={14} />
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {cropStatusSummary.map((crop, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
            padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
            background: 'var(--color-neutral-50)',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{crop.crop}</span>
                {getTrendIcon(crop.trend)}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                {crop.stage} • {crop.area} ha
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)',
                fontWeight: 700, color: getHealthColor(crop.health),
              }}>
                {crop.health}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>Health</div>
            </div>
            <div style={{
              width: '50px', height: '6px', borderRadius: '3px',
              background: 'var(--color-neutral-200)',
            }}>
              <div style={{
                width: `${crop.health}%`, height: '100%', borderRadius: '3px',
                background: getHealthColor(crop.health),
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeatherWidget({ weather }) {
  return (
    <div className="dashboard-widget">
      <div className="dashboard-widget-header">
        <div className="dashboard-widget-title">
          <CloudSun size={16} style={{ color: 'var(--color-sky-500)' }} /> Weather Now
        </div>
        <Link href="/weather" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-sky-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          More <ChevronRight size={14} />
        </Link>
      </div>

      <div style={{ textAlign: 'center', padding: 'var(--space-2) 0' }}>
        <Sun size={40} style={{ color: 'var(--color-warning)', margin: '0 auto var(--space-2)' }} />
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)', fontWeight: 700 }}>
          {weather?.temperature || currentWeather.temperature}°C
        </div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-4)' }}>
          {weather?.condition || currentWeather.condition}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-2)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)' }}>
        <div style={{ textAlign: 'center' }}>
          <Droplets size={14} style={{ color: 'var(--color-sky-500)', margin: '0 auto' }} />
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginTop: '4px' }}>{currentWeather.humidity}%</div>
          <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)' }}>Humidity</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Wind size={14} style={{ color: 'var(--color-neutral-500)', margin: '0 auto' }} />
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginTop: '4px' }}>{currentWeather.windSpeed}</div>
          <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)' }}>km/h</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Thermometer size={14} style={{ color: 'var(--color-danger)', margin: '0 auto' }} />
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginTop: '4px' }}>{currentWeather.uvIndex}</div>
          <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)' }}>UV Index</div>
        </div>
      </div>
    </div>
  );
}

function SoilHealthWidget() {
  return (
    <div className="dashboard-widget">
      <div className="dashboard-widget-header">
        <div className="dashboard-widget-title">
          <Leaf size={16} style={{ color: 'var(--color-earth-500)' }} /> Soil Health
        </div>
        <Link href="/soil-analysis" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-earth-500)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          Analysis <ChevronRight size={14} />
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-2) 0 var(--space-4)' }}>
        <GaugeChart
          value={soilHealthScore.overall}
          max={100}
          size={140}
          strokeWidth={12}
          color="var(--color-warning)"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
        <div style={{ padding: 'var(--space-2)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-warning)' }}>{soilHealthScore.nutrientBalance}</div>
          <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)' }}>Nutrients</div>
        </div>
        <div style={{ padding: 'var(--space-2)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-primary-600)' }}>{soilHealthScore.biologicalActivity}</div>
          <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)' }}>Biology</div>
        </div>
      </div>
    </div>
  );
}

function AlertsWidget() {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'var(--color-danger)';
      case 'warning': return 'var(--color-warning)';
      case 'medium': return 'var(--color-sky-600)';
      default: return 'var(--color-primary-600)';
    }
  };

  return (
    <div className="dashboard-widget" style={{ gridColumn: 'span 2' }}>
      <div className="dashboard-widget-header">
        <div className="dashboard-widget-title">
          <AlertTriangle size={16} style={{ color: 'var(--color-danger)' }} /> Active Alerts
        </div>
        <span className="badge badge-danger">{activeAlerts.length} Active</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {activeAlerts.map((alert, i) => (
          <div key={i} style={{
            display: 'flex', gap: 'var(--space-3)',
            padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
            borderLeft: `3px solid ${getSeverityColor(alert.severity)}`,
            background: 'var(--color-neutral-50)',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-neutral-900)', marginBottom: '2px' }}>
                {alert.title}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                {alert.time} • {alert.action}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RevenueChart() {
  return (
    <div className="dashboard-widget" style={{ gridColumn: 'span 2' }}>
      <div className="dashboard-widget-header">
        <div className="dashboard-widget-title">
          <BarChart3 size={16} style={{ color: 'var(--color-primary-600)' }} /> Farm Revenue vs Expenses
        </div>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Last 6 months (₹)</span>
      </div>

      <div style={{ height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={farmPerformanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Bar dataKey="revenue" name="Revenue" fill="var(--color-primary-500)" radius={[4, 4, 0, 0]} barSize={14} isAnimationActive={true} animationDuration={1500} animationEasing="ease-out" />
            <Bar dataKey="expenses" name="Expenses" fill="var(--color-neutral-300)" radius={[4, 4, 0, 0]} barSize={14} isAnimationActive={true} animationDuration={1500} animationEasing="ease-out" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function IrrigationWidget({ irrigationStatus }) {
  return (
    <div className="dashboard-widget" style={{ gridColumn: 'span 2' }}>
      <div className="dashboard-widget-header">
        <div className="dashboard-widget-title">
          <Droplets size={16} style={{ color: 'var(--color-sky-500)' }} /> Irrigation Status
        </div>
        <Link href="/irrigation" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-sky-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          Control <ChevronRight size={14} />
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-sky-600)' }}>
            {waterEfficiencyMetrics.overallEfficiency}%
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Efficiency</div>
        </div>
        <div style={{ height: '40px', width: '1px', background: 'var(--color-neutral-200)' }} />
        <div>
          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-success)' }}>
            ↓ {waterEfficiencyMetrics.waterSavedPercent}% water saved
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
            {irrigationStatus || dashboardSummary.irrigationStatus}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        {irrigationZones.slice(0, 4).map((zone, i) => {
          const pct = (zone.soilMoisture / zone.targetMoisture) * 100;
          const color = pct >= 90 ? 'var(--color-success)' : pct >= 70 ? 'var(--color-sky-500)' : 'var(--color-warning)';
          return (
            <div key={i} style={{
              flex: 1, padding: 'var(--space-2)', background: 'var(--color-neutral-50)',
              borderRadius: 'var(--radius-sm)', textAlign: 'center',
            }}>
              <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)', marginBottom: '2px' }}>{zone.id}</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color }}>{zone.soilMoisture}%</div>
              <div className="progress-bar" style={{ height: '4px', marginTop: '4px' }}>
                <div className="progress-bar-fill" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AgriMarketWidget() {
  return (
    <div className="dashboard-widget" style={{ gridColumn: 'span 2' }}>
      <div className="dashboard-widget-header">
        <div className="dashboard-widget-title">
          <BarChart3 size={16} style={{ color: 'var(--color-primary-600)' }} /> Market Insights
        </div>
        <Link href="/agri-market" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-primary-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          Explore <ChevronRight size={14} />
        </Link>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
        <div style={{ padding: 'var(--space-3)', background: 'var(--color-primary-50)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-primary-700)', fontWeight: 700 }}>Highest Mover</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Groundnut</span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', fontWeight: 600 }}>↑ +3.5%</span>
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>₹5,800/qtl</div>
        </div>
        
        <div style={{ padding: 'var(--space-3)', background: 'var(--color-sky-50)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--color-sky-700)', fontWeight: 700 }}>Best Nearby Market</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>Mysuru APMC</span>
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>Tomato at ₹1,250/qtl</div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await dashboardApi.get();
        setData(response);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading dashboard...</div>;
  }

  const summary = data?.summary || dashboardSummary;
  const weather = data?.weather || null;

  return (
    <div>
      {/* Dashboard Header */}
      <div style={{
        padding: 'var(--space-8) 0 var(--space-4)',
        background: 'linear-gradient(180deg, #f0fdf4 0%, var(--color-neutral-50) 100%)',
      }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <DashboardHeader />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <QuickActionsBar />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div style={{ padding: '0 0 var(--space-12)', background: 'var(--color-neutral-50)' }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainerSlow}>

            <motion.div variants={fadeInUp}>
              <OverviewMetrics summary={summary} />
            </motion.div>

            {/* Widget Grid */}
            <motion.div variants={fadeInUp}>
              <div className="dashboard-grid">
                <CropStatusWidget />
                <WeatherWidget weather={weather} />
                <AgriMarketWidget />
                <SoilHealthWidget />
                <AlertsWidget />
                <RevenueChart />
                <IrrigationWidget irrigationStatus={summary.irrigationStatus} />
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
