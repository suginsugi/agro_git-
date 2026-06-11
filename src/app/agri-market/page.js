'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Minus, MapPin, 
  BarChart3, Calendar, AlertCircle, ArrowRight, LineChart
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend
} from 'recharts';

import { marketPrices as staticMarketPrices, nearbyMarkets, commodityTrends } from '@/data/marketData';
import { staggerContainer, fadeInUp, staggerContainerSlow, cardHover } from '@/lib/animations';
import LocationDisplay from '@/components/ui/LocationDisplay';
import LiveDateTime from '@/components/ui/LiveDateTime';
import { marketApi } from '@/services/api';

function MarketOverview() {
  return (
    <div className="card-elevated" style={{ marginBottom: 'var(--space-6)', background: 'var(--gradient-hero)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>Market Intelligence Overview</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <LocationDisplay variant="dashboard" />
          </div>
        </div>
        <LiveDateTime />
      </div>
    </div>
  );
}

function CropPricesList() {
  const [prices, setPrices] = useState(staticMarketPrices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPrices() {
      try {
        const data = await marketApi.getPrices();
        if (data && data.length > 0) {
          // Map backend data to frontend format
          const mappedPrices = data.map(item => {
            const current = item.price;
            const prev = item.previous_price || current;
            let trend = 'flat';
            if (current > prev) trend = 'up';
            if (current < prev) trend = 'down';
            
            return {
              crop: item.commodity,
              currentPrice: current,
              previousPrice: prev,
              trend: trend
            };
          });
          setPrices(mappedPrices);
        }
      } catch (error) {
        console.error("Failed to load market prices:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPrices();
  }, []);

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp size={16} style={{ color: 'var(--color-success)' }} />;
    if (trend === 'down') return <TrendingDown size={16} style={{ color: 'var(--color-danger)' }} />;
    return <Minus size={16} style={{ color: 'var(--color-neutral-500)' }} />;
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return 'var(--color-success)';
    if (trend === 'down') return 'var(--color-danger)';
    return 'var(--color-neutral-600)';
  };

  if (loading) {
    return <div className="card-elevated" style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading live market data...</div>;
  }

  return (
    <div className="card-elevated" style={{ height: '100%' }}>
      <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <LineChart size={20} style={{ color: 'var(--color-primary-600)' }} /> Real-Time Crop Prices
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Commodity</th>
              <th>Current Price (₹/qtl)</th>
              <th>Change</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((item, i) => {
              const diff = item.currentPrice - item.previousPrice;
              const pct = ((Math.abs(diff) / item.previousPrice) * 100).toFixed(1);
              const isUp = diff > 0;
              const isDown = diff < 0;

              return (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{item.crop}</td>
                  <td style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'var(--text-lg)' }}>
                    ₹{item.currentPrice.toLocaleString()}
                  </td>
                  <td>
                    {diff !== 0 ? (
                      <span className={`badge ${isUp ? 'badge-success' : 'badge-danger'}`}>
                        {isUp ? '+' : '-'}{pct}% (₹{Math.abs(diff)})
                      </span>
                    ) : (
                      <span className="badge badge-neutral">0% (₹0)</span>
                    )}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: getTrendColor(item.trend), fontWeight: 600 }}>
                      {getTrendIcon(item.trend)}
                      {item.trend.charAt(0).toUpperCase() + item.trend.slice(1)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NearbyMarkets() {
  return (
    <div className="card-elevated" style={{ height: '100%' }}>
      <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <MapPin size={20} style={{ color: 'var(--color-sky-600)' }} /> Nearby Markets
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {nearbyMarkets.map((market, i) => (
          <motion.div key={i} whileHover={{ x: 4 }} style={{ 
            padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', 
            border: '1px solid var(--color-neutral-200)', background: 'var(--color-neutral-50)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-base)', marginBottom: '2px' }}>{market.name}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={12} /> {market.distance} away
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: '2px' }}>Top Commodity</div>
              <div style={{ fontWeight: 600, color: 'var(--color-primary-700)' }}>
                {market.topCrop}: ₹{market.topCropPrice}/qtl
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <button className="btn btn-outline-primary" style={{ width: '100%', marginTop: 'var(--space-4)' }}>View All Markets</button>
    </div>
  );
}

function CommodityTrendsChart() {
  return (
    <div className="card-elevated" style={{ gridColumn: 'span 2' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <BarChart3 size={20} style={{ color: 'var(--color-primary-600)' }} /> Commodity Trend Analysis
        </h3>
        <select className="btn btn-secondary btn-sm" style={{ background: 'var(--color-neutral-0)' }}>
          <option>Last 4 Weeks</option>
          <option>Last 3 Months</option>
          <option>Year to Date</option>
        </select>
      </div>

      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={commodityTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary-500)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary-500)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorWheat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-warning)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-warning)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTomato" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-danger)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-danger)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-neutral-200)" />
            <XAxis dataKey="week" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Area type="monotone" dataKey="rice" name="Rice" stroke="var(--color-primary-500)" strokeWidth={3} fillOpacity={1} fill="url(#colorRice)" isAnimationActive={true} animationDuration={1500} />
            <Area type="monotone" dataKey="wheat" name="Wheat" stroke="var(--color-warning)" strokeWidth={3} fillOpacity={1} fill="url(#colorWheat)" isAnimationActive={true} animationDuration={1500} />
            <Area type="monotone" dataKey="tomato" name="Tomato" stroke="var(--color-danger)" strokeWidth={3} fillOpacity={1} fill="url(#colorTomato)" isAnimationActive={true} animationDuration={1500} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MarketInsights() {
  return (
    <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <h3 style={{ fontSize: 'var(--text-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <AlertCircle size={20} style={{ color: 'var(--color-earth-600)' }} /> Market Insights & Recommendations
      </h3>

      <div style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-50)', border: '1px solid var(--color-primary-200)' }}>
        <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-primary-800)', marginBottom: 'var(--space-2)' }}>Recommended to Sell</h4>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary-700)' }}>
          <strong>Groundnut</strong> prices have hit a seasonal high (₹5,800/qtl). Demand is peaking due to festival season. Consider selling within the next 3-5 days.
        </p>
      </div>

      <div className="badge-warning" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-neutral-200)' }}>
        <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>Hold Recommendation</h4>
        <p style={{ fontSize: 'var(--text-sm)' }}>
          <strong>Tomato</strong> prices are currently suppressed (₹1,200/qtl). Supply glut expected to clear next week. Hold if cold storage is available.
        </p>
      </div>

      <div>
        <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>Demand Analysis</h4>
        <ul style={{ paddingLeft: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <li>High export demand for premium Rice varieties.</li>
          <li>Cotton arrivals increasing, expecting a slight price correction.</li>
          <li>Sugar mills running at capacity, sugarcane rates stable.</li>
        </ul>
      </div>
    </div>
  );
}

export default function AgriMarketPage() {
  return (
    <div>
      <div className="page-header" style={{ background: 'var(--gradient-hero)' }}>
        <div className="page-header-content">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-primary-600)',
              marginBottom: 'var(--space-3)'
            }}>
              <BarChart3 size={16} /> Commercial Intelligence
            </motion.div>
            <motion.h1 variants={fadeInUp} className="page-title">Agri Market</motion.h1>
            <motion.p variants={fadeInUp} className="page-description">
              Real-time commodity prices, trend forecasting, and local market analytics.
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div style={{ padding: 'var(--space-12) 0', background: 'var(--color-neutral-50)', minHeight: '100vh' }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainerSlow}>
            
            <motion.div variants={fadeInUp}>
              <MarketOverview />
            </motion.div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <motion.div variants={fadeInUp}>
                <CropPricesList />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <NearbyMarkets />
              </motion.div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
              <motion.div variants={fadeInUp}>
                <CommodityTrendsChart />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <MarketInsights />
              </motion.div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
