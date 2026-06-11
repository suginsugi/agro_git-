'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudSun, Sun, CloudRain, CloudLightning, Cloud, CloudSnow, CloudFog,
  Wind, Droplets, Thermometer, MapPin, Navigation, 
  AlertTriangle, Leaf, Calendar, Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, LineChart, Line, BarChart, Bar
} from 'recharts';

import { monthlyRainfallData } from '@/data/weatherData';
import { staggerContainer, fadeInUp, staggerContainerSlow } from '@/lib/animations';

/* =========================================
   WEATHER INTELLIGENCE PAGE components
   ========================================= */

const getWeatherIcon = (code) => {
  if (code === 0) return <Sun size={24} style={{ color: 'var(--color-warning)' }} />;
  if (code >= 1 && code <= 3) return <CloudSun size={24} style={{ color: 'var(--color-neutral-500)' }} />;
  if (code >= 45 && code <= 48) return <CloudFog size={24} style={{ color: 'var(--color-neutral-400)' }} />;
  if (code >= 51 && code <= 67) return <CloudRain size={24} style={{ color: 'var(--color-sky-500)' }} />;
  if (code >= 71 && code <= 77) return <CloudSnow size={24} style={{ color: 'var(--color-sky-200)' }} />;
  if (code >= 80 && code <= 82) return <CloudRain size={24} style={{ color: 'var(--color-sky-600)' }} />;
  if (code >= 95 && code <= 99) return <CloudLightning size={24} style={{ color: 'var(--color-sky-700)' }} />;
  return <Sun size={24} />;
};

const getWeatherDesc = (code) => {
  if (code === 0) return 'Clear Sky';
  if (code === 1) return 'Mainly Clear';
  if (code === 2) return 'Partly Cloudy';
  if (code === 3) return 'Overcast';
  if (code >= 45 && code <= 48) return 'Fog';
  if (code >= 51 && code <= 55) return 'Drizzle';
  if (code >= 61 && code <= 65) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Showers';
  if (code >= 95 && code <= 99) return 'Thunderstorm';
  return 'Unknown';
};

function CurrentConditions({ weather, location }) {
  if (!weather) return <div className="card-elevated" style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;

  return (
    <div className="card-elevated" style={{ 
      background: 'var(--gradient-sky)', 
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(30px)'
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-8)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', fontWeight: 600, opacity: 0.9 }}>
              <MapPin size={16} /> {location}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', opacity: 0.8, marginTop: 'var(--space-1)' }}>
              Last updated: {new Date(weather.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
            {getWeatherDesc(weather.weathercode)}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
          <div style={{ opacity: 0.9, transform: 'scale(2.5)', marginLeft: '20px' }}>
            {getWeatherIcon(weather.weathercode)}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-7xl)', fontWeight: 700, lineHeight: 1 }}>
              {Math.round(weather.temperature)}°
            </div>
            <div style={{ fontSize: 'var(--text-lg)', opacity: 0.9 }}>
              Wind: {weather.windspeed} km/h
            </div>
          </div>
        </div>

        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)',
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)',
          padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', opacity: 0.8, marginBottom: 'var(--space-1)' }}>
              <Wind size={14} /> Wind Dir
            </div>
            <div style={{ fontWeight: 600 }}>{weather.winddirection}°</div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', opacity: 0.8, marginBottom: 'var(--space-1)' }}>
              <Thermometer size={14} /> Temp
            </div>
            <div style={{ fontWeight: 600 }}>{Math.round(weather.temperature)}°C</div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', opacity: 0.8, marginBottom: 'var(--space-1)' }}>
              <Cloud size={14} /> Condition
            </div>
            <div style={{ fontWeight: 600, fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{getWeatherDesc(weather.weathercode)}</div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', opacity: 0.8, marginBottom: 'var(--space-1)' }}>
              <MapPin size={14} /> Elev
            </div>
            <div style={{ fontWeight: 600 }}>Data Live</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HourlyForecast({ hourlyData }) {
  if (!hourlyData || hourlyData.length === 0) return <div className="card-elevated" style={{ height: '350px' }}>Loading forecast...</div>;

  return (
    <div className="card-elevated" style={{ height: '100%' }}>
      <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <Activity size={18} /> Hourly Forecast
      </h3>
      
      <div style={{ display: 'flex', gap: 'var(--space-4)', overflowX: 'auto', paddingBottom: 'var(--space-4)', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {hourlyData.slice(0, 12).map((hour, i) => {
          const time = new Date(hour.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          return (
            <div key={i} style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '70px',
              padding: 'var(--space-4) var(--space-2)', borderRadius: 'var(--radius-lg)',
              background: i === 0 ? 'var(--color-sky-50)' : 'transparent',
              border: i === 0 ? '1px solid var(--color-sky-200)' : '1px solid transparent'
            }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: i === 0 ? 600 : 500, color: i === 0 ? 'var(--color-sky-700)' : 'var(--color-neutral-600)', marginBottom: 'var(--space-3)' }}>
                {i === 0 ? 'Now' : time}
              </div>
              {getWeatherIcon(hour.weathercode)}
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-lg)', fontWeight: 600, marginTop: 'var(--space-3)' }}>
                {Math.round(hour.temperature_2m)}°
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeatherCharts({ hourlyData, dailyData }) {
  if (!hourlyData || !dailyData) return null;

  const tempTrend = dailyData.time.slice(0, 7).map((time, i) => ({
    date: new Date(time).toLocaleDateString([], {weekday: 'short'}),
    high: dailyData.temperature_2m_max[i],
    low: dailyData.temperature_2m_min[i],
  }));

  const rainForecast = dailyData.time.slice(0, 7).map((time, i) => ({
    day: new Date(time).toLocaleDateString([], {weekday: 'short'}),
    precipitation: dailyData.precipitation_sum[i],
  }));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
      {/* Rainfall Prediction */}
      <div className="card-elevated">
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Precipitation Forecast</h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-6)' }}>Expected rainfall over the next 7 days</p>
        
        <div style={{ height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={rainForecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-sky-500)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--color-sky-500)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="precipitation" name="Precipitation (mm)" stroke="var(--color-sky-500)" strokeWidth={3} fillOpacity={1} fill="url(#colorRain)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Temperature Trend */}
      <div className="card-elevated">
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Temperature Trend</h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-6)' }}>Highs and lows over the past week</p>
        
        <div style={{ height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={tempTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
              <Tooltip />
              <Line type="monotone" dataKey="high" name="High (°C)" stroke="var(--color-warning)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="low" name="Low (°C)" stroke="var(--color-sky-500)" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function AgricultureInsights({ weather, dailyData }) {
  if (!weather || !dailyData) return null;

  const insights = [];

  // Generate dynamic insights based on real weather data
  if (weather.temperature > 32) {
    insights.push({
      type: 'irrigation',
      title: 'High Heat Stress Risk',
      message: 'Temperatures exceeding 32°C. Increase irrigation frequency for sensitive crops to prevent wilting.',
      severity: 'warning',
      timeframe: 'Immediate'
    });
  }

  const nextRain = dailyData.precipitation_sum.find(p => p > 5);
  if (nextRain) {
    insights.push({
      type: 'harvest',
      title: 'Rain Anticipated',
      message: 'Significant precipitation expected in the coming days. Accelerate harvesting for mature blocks.',
      severity: 'info',
      timeframe: 'Next 3-5 days'
    });
  } else {
    insights.push({
      type: 'harvest',
      title: 'Favorable Spraying Window',
      message: 'Clear skies and low wind speeds predicted. Optimal conditions for foliar applications.',
      severity: 'success',
      timeframe: 'Next 48 Hours'
    });
  }

  const getSeverityStyles = (severity) => {
    switch(severity) {
      case 'warning': return { border: 'var(--color-danger)', bg: '#fef2f2', icon: 'var(--color-danger)' };
      case 'info': return { border: 'var(--color-sky-500)', bg: 'var(--color-sky-50)', icon: 'var(--color-sky-600)' };
      case 'success': return { border: 'var(--color-success)', bg: 'var(--color-primary-50)', icon: 'var(--color-primary-600)' };
      default: return { border: 'var(--color-neutral-300)', bg: 'var(--color-neutral-50)', icon: 'var(--color-neutral-500)' };
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'irrigation': return <Droplets size={20} />;
      case 'disease': return <AlertTriangle size={20} />;
      case 'harvest': return <Leaf size={20} />;
      case 'frost': return <Thermometer size={20} />;
      default: return <Info size={20} />;
    }
  };

  return (
    <div className="card-elevated" style={{ marginBottom: 'var(--space-6)' }}>
      <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)' }}>Dynamic Agronomic Advisories</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
        {insights.map((insight, i) => {
          const styles = getSeverityStyles(insight.severity);
          return (
            <div key={i} style={{ 
              borderLeft: `4px solid ${styles.border}`, 
              background: styles.bg,
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <span style={{ color: styles.icon }}>{getIcon(insight.type)}</span>
                <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-neutral-900)' }}>{insight.title}</h4>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-3)' }}>
                {insight.message}
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-neutral-600)', background: 'var(--color-neutral-0)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                <Calendar size={12} /> {insight.timeframe}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MonthlyTrends() {
  return (
    <div className="card-elevated">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Historical Rainfall Comparison</h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>Monthly precipitation (mm) year-over-year</p>
        </div>
      </div>
      
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyRainfallData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="year2025" name="2025" fill="var(--color-sky-200)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="year2026" name="2026" fill="var(--color-sky-600)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function WeatherIntelligencePage() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState('Fetching Location...');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Try to get user's location, fallback to New Delhi if failed/denied
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => fetchWeather(position.coords.latitude, position.coords.longitude, "Your Location"),
        () => fetchWeather(28.6139, 77.2090, "New Delhi (Default)")
      );
    } else {
      fetchWeather(28.6139, 77.2090, "New Delhi (Default)");
    }

    async function fetchWeather(lat, lon, locName) {
      setLocationName(locName);
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,precipitation_probability,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        // Process hourly data into array of objects
        const currentHourIndex = data.hourly.time.findIndex(t => new Date(t) > new Date());
        const hourlyList = [];
        for (let i = currentHourIndex - 1; i < currentHourIndex + 23; i++) {
          if (data.hourly.time[i]) {
            hourlyList.push({
              time: data.hourly.time[i],
              temperature_2m: data.hourly.temperature_2m[i],
              precipitation_probability: data.hourly.precipitation_probability[i],
              weathercode: data.hourly.weathercode[i]
            });
          }
        }
        
        setWeatherData({
          current: data.current_weather,
          hourly: hourlyList,
          daily: data.daily
        });
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError("Failed to load real-time weather data.");
      }
    }
  }, []);

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-sky-600)',
              marginBottom: 'var(--space-3)'
            }}>
              <CloudSun size={16} /> Climate Intelligence
            </motion.div>
            <motion.h1 variants={fadeInUp} className="page-title">Real-Time Weather Intelligence</motion.h1>
            <motion.p variants={fadeInUp} className="page-description">
              Hyper-local weather forecasting integrated with agronomic models to help you 
              time your operations perfectly and mitigate climate risks. Powered by Open-Meteo.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Page Content */}
      <div style={{ padding: 'var(--space-12) 0', background: 'var(--color-neutral-50)', minHeight: '100vh' }}>
        <div className="container">
          {error && <div style={{ color: 'var(--color-danger)', marginBottom: 'var(--space-4)' }}>{error}</div>}
          
          <motion.div initial="hidden" animate="visible" variants={staggerContainerSlow}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
              <motion.div variants={fadeInUp}>
                <CurrentConditions weather={weatherData?.current} location={locationName} />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <HourlyForecast hourlyData={weatherData?.hourly} />
              </motion.div>
            </div>
            
            <motion.div variants={fadeInUp}>
              <AgricultureInsights weather={weatherData?.current} dailyData={weatherData?.daily} />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <WeatherCharts hourlyData={weatherData?.hourly} dailyData={weatherData?.daily} />
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <MonthlyTrends />
            </motion.div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}
