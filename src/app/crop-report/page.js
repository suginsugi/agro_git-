'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BarChart3, Sprout, Map, Activity, 
  Leaf, Download, Calendar
} from 'lucide-react';
import { 
  ResponsiveContainer, XAxis, YAxis, 
  CartesianGrid, Tooltip, LineChart, Line, Legend
} from 'recharts';

import FileUploadDropzone from '@/components/ui/FileUploadDropzone';
import { useAppStore } from '@/store/useAppStore';
import { 
  farmOverview, cropFields, growthTrendData, 
  seasonalReportData 
} from '@/data/cropData';
import { staggerContainer, fadeInUp, staggerContainerSlow } from '@/lib/animations';

function FarmOverview() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
      <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-2)' }}>
          <Map size={16} /> Total Area
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-neutral-900)' }}>
          {farmOverview.totalArea} <span style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-500)', fontWeight: 500 }}>{farmOverview.unit}</span>
        </div>
      </div>
      
      <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-2)' }}>
          <Sprout size={16} /> Active Crops
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-neutral-900)' }}>
          {farmOverview.activeCrops} <span style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-500)', fontWeight: 500 }}>Varieties</span>
        </div>
      </div>

      <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-2)' }}>
          <Calendar size={16} /> Current Season
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-neutral-900)' }}>
          {farmOverview.currentSeason}
        </div>
      </div>

      <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-2)' }}>
          <Activity size={16} /> Overall Health
        </div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--color-success)' }}>
          86<span style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-500)', fontWeight: 500 }}>/100</span>
        </div>
      </div>
    </div>
  );
}

import { cropApi } from '@/services/api';

function CropHealthMonitor() {
  const router = useRouter();
  const setCropUpload = useAppStore((state) => state.setCropUpload);

  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent': return 'var(--color-success)';
      case 'healthy': return 'var(--color-primary-500)';
      case 'stress': return 'var(--color-warning)';
      case 'critical': return 'var(--color-danger)';
      default: return 'var(--color-neutral-500)';
    }
  };

  const handleUpload = async (blockId, fileData) => {
    try {
      if (fileData.raw) {
        await cropApi.uploadImage(blockId, fileData.raw);
      }
      setCropUpload(blockId, fileData);
      router.push(`/crop-report/result?block=${blockId}`);
    } catch (error) {
      console.error("Error uploading crop image:", error);
      // Fallback
      setCropUpload(blockId, fileData);
      router.push(`/crop-report/result?block=${blockId}`);
    }
  };

  return (
    <div className="card-elevated" style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)' }}>Field-Level Health Monitoring</h3>
        <div className="badge badge-neutral"><Leaf size={14} /> Upload Images for AI Analysis</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-6)' }}>
        {cropFields.map((field) => (
          <div key={field.id} style={{ 
            border: '1px solid var(--color-neutral-200)', 
            borderRadius: 'var(--radius-lg)', 
            padding: 'var(--space-5)',
            background: 'var(--color-neutral-50)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
              <div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontWeight: 600, marginBottom: '2px' }}>{field.id}</div>
                <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>{field.name}</h4>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>{field.crop} ({field.variety})</div>
              </div>
              <div style={{ 
                background: getStatusColor(field.status), color: 'white', 
                fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase',
                padding: '4px 10px', borderRadius: 'var(--radius-sm)' 
              }}>
                {field.status}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: 'var(--space-4) 0', padding: 'var(--space-3) 0', borderTop: '1px solid var(--color-neutral-200)', borderBottom: '1px solid var(--color-neutral-200)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: getStatusColor(field.status), fontFamily: 'var(--font-heading)' }}>
                  {field.healthScore}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>Health Score</div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'var(--color-neutral-200)' }}></div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-primary-600)', fontFamily: 'var(--font-heading)' }}>
                  {field.ndvi.toFixed(2)}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>NDVI Index</div>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: 'var(--space-1)', color: 'var(--color-neutral-600)' }}>
                <span>Growth Stage: {field.growthStage}</span>
                <span>Day {field.daysAfterPlanting} / {field.totalDays}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ 
                  width: `${(field.daysAfterPlanting / field.totalDays) * 100}%`,
                  background: 'var(--color-primary-500)'
                }}></div>
              </div>
            </div>

            <div style={{ background: 'var(--color-neutral-0)', border: '1px dashed var(--color-neutral-300)', borderRadius: 'var(--radius-md)' }}>
              <FileUploadDropzone 
                onUploadSuccess={(fileData) => handleUpload(field.id, fileData)}
                accept="image/png, image/jpeg"
                title={`Upload Image for ${field.id}`}
                subtitle="High-res photos (JPG, PNG)"
                icon="image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GrowthTrends() {
  return (
    <div className="card-elevated" style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Vegetation Index (NDVI) Trends</h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>Tracking crop vigor over time across all fields</p>
      </div>
      
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={growthTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} domain={[0, 1]} />
            <Tooltip />
            <Legend iconType="circle" />
            <Line type="monotone" dataKey="paddy" name="Paddy (F001)" stroke="var(--color-primary-600)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="ragi" name="Ragi (F002)" stroke="var(--color-sky-500)" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="tomato" name="Tomato (F003)" stroke="var(--color-danger)" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="groundnut" name="Groundnut (F004)" stroke="var(--color-earth-500)" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SeasonalReportPreview() {
  return (
    <div className="card-elevated" style={{ background: 'var(--gradient-section-green)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
        <div>
          <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Generate Seasonal Report</h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>Comprehensive documentation for stakeholders and financing</p>
        </div>
        <button className="btn btn-primary">
          <Download size={16} /> Generate PDF
        </button>
      </div>

      <div style={{ background: 'var(--color-neutral-0)', border: '1px solid var(--color-neutral-200)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)' }}>
        <div style={{ borderBottom: '1px solid var(--color-neutral-100)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-4)', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', fontWeight: 700 }}>{seasonalReportData.season} Summary</div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>{seasonalReportData.period}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', marginBottom: '2px' }}>Projected Net Profit</div>
            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-success)' }}>{seasonalReportData.netProfit}</div>
          </div>
        </div>

        <table className="data-table" style={{ background: 'transparent' }}>
          <thead>
            <tr>
              <th>Crop</th>
              <th>Area (ha)</th>
              <th>Avg. Yield</th>
              <th>Est. Revenue</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {seasonalReportData.cropPerformance.map((crop, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{crop.crop}</td>
                <td>{crop.area}</td>
                <td>{crop.yield}</td>
                <td className="value-cell">{crop.revenue}</td>
                <td>
                  <span className={`badge ${
                    crop.status === 'Above Average' ? 'badge-success' : 
                    crop.status === 'Average' ? 'badge-info' : 
                    crop.status === 'Projected' ? 'badge-neutral' : 'badge-warning'
                  }`}>
                    {crop.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function CropReportPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-primary-600)',
              marginBottom: 'var(--space-3)'
            }}>
              <BarChart3 size={16} /> Crop Analytics
            </motion.div>
            <motion.h1 variants={fadeInUp} className="page-title">Crop Performance Reports</motion.h1>
            <motion.p variants={fadeInUp} className="page-description">
              Upload field-level imagery to monitor health, track growth trends, 
              and predict yields with high-confidence AI models.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Page Content */}
      <div style={{ padding: 'var(--space-12) 0', background: 'var(--color-neutral-50)', minHeight: '100vh' }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainerSlow}>
            
            <motion.div variants={fadeInUp}>
              <FarmOverview />
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <CropHealthMonitor />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <GrowthTrends />
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <SeasonalReportPreview />
            </motion.div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}
