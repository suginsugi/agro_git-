'use client';

import { useEffect, Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Search, Image as ImageIcon } from 'lucide-react';
import { 
  ResponsiveContainer, CartesianGrid, XAxis, YAxis, 
  Tooltip, BarChart, Bar 
} from 'recharts';

import ReportActions from '@/components/ui/ReportActions';
import { useAppStore } from '@/store/useAppStore';
import { yieldForecastData, cropFields as staticCropFields } from '@/data/cropData';
import { staggerContainerSlow, fadeInUp } from '@/lib/animations';
import { cropApi } from '@/services/api';

function YieldForecasting({ cropId }) {
  // Use Paddy as default for F001, otherwise fallback gracefully
  const cropData = yieldForecastData[cropId] || yieldForecastData.paddy;
  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
      {/* Forecast */}
      <div className="card-elevated">
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)' }}>Yield Prediction</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-8)', marginBottom: 'var(--space-8)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-2)' }}>Predicted Yield</div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 'var(--space-2)' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)', fontWeight: 700, color: 'var(--color-primary-600)' }}>
                {cropData.predicted}
              </span>
              <span style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-neutral-600)' }}>{cropData.unit}</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--color-primary-50)', color: 'var(--color-primary-700)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 600, marginTop: 'var(--space-3)' }}>
              <TrendingUp size={14} /> +5.4% vs 2025
            </div>
          </div>
          
          <div style={{ width: '1px', height: '80px', background: 'var(--color-neutral-200)' }}></div>
          
          <div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-1)' }}>Confidence Interval</div>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>{cropData.confidence.low} - {cropData.confidence.high} {cropData.unit}</div>
            
            <div style={{ marginTop: 'var(--space-4)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-1)' }}>Impact Factors</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                  <span style={{ color: 'var(--color-success)' }}>↑</span> Weather (+8%)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                  <span style={{ color: 'var(--color-success)' }}>↑</span> Soil Health (+4%)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Data */}
      <div className="card-elevated">
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)' }}>Historical Yield Comparison</h3>
        
        <div style={{ height: '240px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cropData.historical} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={[4, 'auto']} />
              <Tooltip cursor={{ fill: 'var(--color-neutral-50)' }} />
              <Bar 
                dataKey="yield" 
                name={`Yield (${cropData.unit})`} 
                fill="var(--color-primary-500)" 
                radius={[4, 4, 0, 0]} 
                barSize={32}
              >
                {
                  cropData.historical.map((entry, index) => (
                    <cell key={`cell-${index}`} fill={index === cropData.historical.length - 1 ? 'var(--color-warning)' : 'var(--color-primary-500)'} />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function CropResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blockId = searchParams.get('block');
  
  const cropUploads = useAppStore((state) => state.recentUploads.crop);
  const fileData = cropUploads[blockId];
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    async function fetchReport() {
      if (blockId) {
        setLoading(true);
        try {
          const data = await cropApi.getField(blockId);
          setReportData(data);
        } catch (error) {
          console.error("Failed to fetch crop field data:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchReport();
  }, [blockId]);

  useEffect(() => {
    if (!blockId || !fileData) {
      router.push('/crop-report');
    }
  }, [blockId, fileData, router]);

  if (!blockId || !fileData) return null;

  // Combine static fallback and backend data
  const baseFieldData = staticCropFields.find(f => f.id === blockId) || staticCropFields[0];
  const fieldData = reportData ? {
    ...baseFieldData,
    healthScore: reportData.health_score,
    ndvi: reportData.ndvi,
    growthStage: reportData.growth_stage,
    recommendation: reportData.recommendation,
    status: reportData.health_score >= 90 ? 'excellent' : (reportData.health_score >= 75 ? 'healthy' : 'stress')
  } : baseFieldData;
  
  const preview = fileData?.previewUrl || (reportData ? reportData.image_url : null);
  const fileName = reportData ? (reportData.image_url ? reportData.image_url.split('/').pop() : fileData?.name) : fileData?.name;

  if (loading) {
    return <div className="container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading field analysis...</div>;
  }

  return (
    <div className="container">
      <ReportActions 
        title={`Crop Analysis: ${fieldData.name} (${blockId})`} 
        backUrl="/crop-report" 
      />

      <motion.div initial="hidden" animate="visible" variants={staggerContainerSlow}>
        
        <motion.div variants={fadeInUp} className="card-elevated" style={{ marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)' }}>
            {/* Uploaded Image */}
            <div style={{ 
              background: 'var(--color-neutral-100)', 
              borderRadius: 'var(--radius-lg)', 
              position: 'relative',
              overflow: 'hidden',
              aspectRatio: '4/3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--color-neutral-200)',
              backgroundImage: preview ? `url(${preview})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Search size={12} /> Scanned
              </div>
              
              {!preview && (
                <div style={{ textAlign: 'center', color: 'var(--color-neutral-400)' }}>
                  <ImageIcon size={48} style={{ margin: '0 auto var(--space-2)' }} />
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{fileName}</div>
                </div>
              )}
              
              {/* Highlight Overlay */}
              <div style={{ 
                position: 'absolute', top: '30%', left: '40%', width: '20%', height: '20%',
                border: '2px solid var(--color-warning)', borderRadius: '50%',
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.2)'
              }} />
            </div>

            {/* Assessment */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                <div className={`badge badge-${fieldData.status === 'excellent' ? 'success' : fieldData.status === 'stress' ? 'warning' : 'primary'}`}>
                  {fieldData.status.toUpperCase()}
                </div>
                <div className="badge badge-neutral">Analysis Complete</div>
              </div>
              
              <h4 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-1)', color: 'var(--color-neutral-900)' }}>
                {fieldData.crop} Health Assessment
              </h4>
              <div style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
                Variety: {fieldData.variety} • Stage: {fieldData.growthStage}
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: '4px' }}>Plant Density</div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-lg)' }}>Optimal</div>
                </div>
                <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: '4px' }}>Nitrogen Stress</div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--color-warning)' }}>Mild Stress Detected</div>
                </div>
              </div>
              
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-warning)', color: 'var(--color-neutral-900)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', bgOpacity: 0.1 }}>
                <AlertTriangle size={20} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>AI Recommendation</div>
                  <div style={{ fontSize: 'var(--text-sm)', marginTop: '4px' }}>{fieldData.recommendation || 'Apply 15kg/ha Urea via foliar spray within 3 days to address nitrogen deficiency identified in the canopy.'}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <YieldForecasting cropId={fieldData.crop.toLowerCase()} />
        </motion.div>

      </motion.div>
    </div>
  );
}

export default function CropResultPage() {
  return (
    <div style={{ padding: 'var(--space-8) 0', background: 'var(--color-neutral-50)', minHeight: '100vh' }}>
      <Suspense fallback={<div className="container">Loading analysis...</div>}>
        <CropResultContent />
      </Suspense>
    </div>
  );
}
