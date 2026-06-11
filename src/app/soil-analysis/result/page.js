'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FileText, Info, Thermometer, Droplets, Leaf, 
  ShieldCheck, Sprout, Layers, TrendingUp, CheckCircle
} from 'lucide-react';
import { 
  ResponsiveContainer, Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Tooltip
} from 'recharts';

import GaugeChart from '@/components/ui/GaugeChart';
import ReportActions from '@/components/ui/ReportActions';
import { useAppStore } from '@/store/useAppStore';
import { 
  soilSampleData as staticSoilSampleData, soilParameters as staticSoilParameters, soilHealthScore as staticSoilHealthScore, 
  nutrientRadarData as staticNutrientRadarData, cropRecommendations as staticCropRecommendations, fertilityPlan as staticFertilityPlan 
} from '@/data/soilData';
import { staggerContainerSlow, fadeInUp } from '@/lib/animations';
import { soilApi } from '@/services/api';

function SoilHealthDashboard({ soilHealthScore, nutrientRadarData }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
      {/* Overall Score */}
      <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-8)', alignSelf: 'flex-start' }}>Overall Soil Health</h3>
        
        <GaugeChart 
          value={soilHealthScore.overall} 
          max={100} 
          size={180} 
          strokeWidth={14} 
          color={soilHealthScore.overall > 70 ? 'var(--color-success)' : soilHealthScore.overall > 50 ? 'var(--color-warning)' : 'var(--color-danger)'}
        />
        
        <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
          <div style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--color-warning)', marginBottom: 'var(--space-2)' }}>Moderate Health</div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
            Soil shows signs of nutrient depletion, particularly in organic carbon and available nitrogen. Remediation required for optimal yields.
          </p>
        </div>
      </div>

      {/* Nutrient Radar */}
      <div className="card-elevated">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <h3 style={{ fontSize: 'var(--text-lg)' }}>Nutrient Balance Profile</h3>
          <div className="badge badge-neutral"><Info size={14} /> 100 = Optimal</div>
        </div>
        
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={nutrientRadarData}>
              <PolarGrid stroke="var(--color-neutral-200)" />
              <PolarAngleAxis 
                dataKey="nutrient" 
                tick={{ fill: 'var(--color-neutral-600)', fontSize: 12, fontWeight: 500 }} 
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={false} 
                axisLine={false} 
              />
              <Tooltip />
              <Radar 
                name="Current Level" 
                dataKey="value" 
                stroke="var(--color-primary-500)" 
                fill="var(--color-primary-500)" 
                fillOpacity={0.3} 
              />
              <Radar 
                name="Optimal Range" 
                dataKey="fullMark" 
                stroke="var(--color-neutral-300)" 
                fill="none" 
                strokeDasharray="4 4" 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function SoilDataTable({ soilParameters }) {
  const getStatusBadge = (status) => {
    switch(status) {
      case 'optimal': return <span className="badge badge-success">Optimal</span>;
      case 'low': return <span className="badge badge-warning">Low</span>;
      case 'high': return <span className="badge badge-danger">High</span>;
      default: return <span className="badge badge-neutral">{status}</span>;
    }
  };

  return (
    <div className="card-elevated" style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)' }}>Detailed Parameter Analysis</h3>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Category</th>
              <th>Value</th>
              <th>Unit</th>
              <th>Optimal Range</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {soilParameters.map((param, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{param.parameter}</td>
                <td>{param.category}</td>
                <td className="value-cell">{param.value}</td>
                <td style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-xs)' }}>{param.unit}</td>
                <td style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-xs)' }}>{param.optimal}</td>
                <td>{getStatusBadge(param.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CropRecommendation({ cropRecommendations }) {
  return (
    <div className="card-elevated" style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Crop Suitability</h3>
        <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)' }}>
          AI-generated crop recommendations based on current soil profile and historical climate data
        </p>
      </div>

      <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
        {cropRecommendations.map((crop, i) => (
          <div key={i} style={{ 
            padding: 'var(--space-5)', 
            border: '1px solid var(--color-neutral-200)', 
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-6)'
          }}>
            <div style={{ flexShrink: 0, textAlign: 'center' }}>
              <div style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'var(--text-3xl)', 
                fontWeight: 700, 
                color: crop.suitability > 80 ? 'var(--color-success)' : 'var(--color-warning)'
              }}>
                {crop.suitability}%
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontWeight: 600, textTransform: 'uppercase' }}>Match</div>
            </div>

            <div style={{ flexGrow: 1 }}>
              <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>{crop.crop}</h4>
              <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--color-neutral-600)' }}>
                  <TrendingUp size={14} style={{ color: 'var(--color-primary-500)' }}/> 
                  <span style={{ fontWeight: 500 }}>Expected Yield:</span> {crop.expectedYield}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--color-neutral-600)' }}>
                  <Droplets size={14} style={{ color: 'var(--color-sky-500)' }}/> 
                  <span style={{ fontWeight: 500 }}>Water Req:</span> {crop.waterReq}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--color-neutral-600)' }}>
                  <Thermometer size={14} style={{ color: 'var(--color-warning)' }}/> 
                  <span style={{ fontWeight: 500 }}>Season:</span> {crop.season}
                </div>
              </div>
              <div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                <span style={{ fontWeight: 500, color: 'var(--color-neutral-700)' }}>Why:</span> {crop.nutrients}
              </div>
            </div>
            
            <button className="btn btn-outline-primary" style={{ whiteSpace: 'nowrap' }}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FertilityPlan({ fertilityPlan }) {
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'Leaf': return <Leaf size={20} />;
      case 'Droplets': return <Droplets size={20} />;
      case 'Trees': return <Sprout size={20} />;
      case 'Layers': return <Layers size={20} />;
      default: return <ShieldCheck size={20} />;
    }
  };

  return (
    <div className="card-elevated">
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Remediation & Fertility Plan</h3>
        <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)' }}>
          Recommended actions to improve soil health score and optimize for next season
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-5)' }}>
        {fertilityPlan.map((plan, i) => (
          <div key={i} style={{ 
            padding: 'var(--space-5)', 
            background: 'var(--color-neutral-50)', 
            borderRadius: 'var(--radius-lg)',
            borderLeft: `4px solid ${plan.priority === 'high' ? 'var(--color-danger)' : 'var(--color-warning)'}`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <div style={{ 
                width: '36px', height: '36px', borderRadius: 'var(--radius-md)', 
                background: 'var(--color-neutral-0)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: plan.priority === 'high' ? 'var(--color-danger)' : 'var(--color-warning)'
              }}>
                {getIcon(plan.icon)}
              </div>
              <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>{plan.category}</h4>
            </div>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {plan.recommendations.map((rec, j) => (
                <li key={j} style={{ display: 'flex', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  <div style={{ color: 'var(--color-primary-500)', marginTop: '2px' }}>•</div>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SoilResultPage() {
  const router = useRouter();
  const fileData = useAppStore((state) => state.recentUploads.soil);
  const soilReportId = useAppStore((state) => state.soilReportId);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch report data if ID exists
  useEffect(() => {
    async function fetchReport() {
      if (soilReportId) {
        setLoading(true);
        try {
          const data = await soilApi.getReport(soilReportId);
          setReportData(data);
        } catch (error) {
          console.error("Failed to fetch soil report:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchReport();
  }, [soilReportId]);

  // Redirect if no file uploaded
  useEffect(() => {
    if (!fileData && !soilReportId) {
      router.push('/soil-analysis');
    }
  }, [fileData, soilReportId, router]);

  if (!fileData && !soilReportId) return null; // Avoid flashing empty state

  // Map backend data or use static fallback
  const soilHealthScore = reportData ? { overall: reportData.soil_health } : staticSoilHealthScore;
  const soilParameters = reportData ? [
    { parameter: 'pH Level', category: 'Chemical', value: reportData.ph, unit: 'pH', optimal: '6.0 - 7.5', status: reportData.ph >= 6 && reportData.ph <= 7.5 ? 'optimal' : (reportData.ph < 6 ? 'low' : 'high') },
    { parameter: 'Nitrogen (N)', category: 'Macronutrient', value: reportData.nitrogen, unit: 'kg/ha', optimal: '100 - 150', status: reportData.nitrogen >= 100 && reportData.nitrogen <= 150 ? 'optimal' : (reportData.nitrogen < 100 ? 'low' : 'high') },
    { parameter: 'Phosphorus (P)', category: 'Macronutrient', value: reportData.phosphorus, unit: 'kg/ha', optimal: '40 - 60', status: reportData.phosphorus >= 40 && reportData.phosphorus <= 60 ? 'optimal' : (reportData.phosphorus < 40 ? 'low' : 'high') },
    { parameter: 'Potassium (K)', category: 'Macronutrient', value: reportData.potassium, unit: 'kg/ha', optimal: '150 - 250', status: reportData.potassium >= 150 && reportData.potassium <= 250 ? 'optimal' : (reportData.potassium < 150 ? 'low' : 'high') },
    { parameter: 'Soil Moisture', category: 'Physical', value: reportData.moisture, unit: '%', optimal: '25 - 40', status: reportData.moisture >= 25 && reportData.moisture <= 40 ? 'optimal' : (reportData.moisture < 25 ? 'low' : 'high') }
  ] : staticSoilParameters;
  const nutrientRadarData = reportData ? [
    { nutrient: 'Nitrogen', value: Math.min(100, (reportData.nitrogen / 125) * 100), fullMark: 100 },
    { nutrient: 'Phosphorus', value: Math.min(100, (reportData.phosphorus / 50) * 100), fullMark: 100 },
    { nutrient: 'Potassium', value: Math.min(100, (reportData.potassium / 200) * 100), fullMark: 100 },
    { nutrient: 'pH Balance', value: reportData.ph >= 6 && reportData.ph <= 7.5 ? 100 : 60, fullMark: 100 },
    { nutrient: 'Moisture', value: Math.min(100, (reportData.moisture / 30) * 100), fullMark: 100 }
  ] : staticNutrientRadarData;
  const cropRecommendations = reportData ? [
    { crop: reportData.recommended_crop, suitability: 92, expectedYield: 'High', waterReq: 'Moderate', season: 'Kharif', nutrients: `Optimal fit for current pH (${reportData.ph}) and fertility level (${reportData.fertility})` }
  ] : staticCropRecommendations;
  const fertilityPlan = reportData ? [
    { category: 'Immediate Actions', priority: 'high', icon: 'AlertTriangle', recommendations: reportData.recommendations }
  ] : staticFertilityPlan;
  const soilSampleData = reportData ? {
    sampleId: `SR-${reportData.id}`, collectionDate: new Date(reportData.created_at).toLocaleDateString(), location: 'Block 1', soilType: 'Unknown'
  } : staticSoilSampleData;

  const fileName = reportData ? reportData.original_filename : (fileData?.name || 'Unknown File');

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading analysis results...</div>;
  }

  return (
    <div style={{ padding: 'var(--space-8) 0', background: 'var(--color-neutral-50)', minHeight: '100vh' }}>
      <div className="container">
        
        <ReportActions 
          title="Soil Analysis Report" 
          backUrl="/soil-analysis" 
        />

        <motion.div initial="hidden" animate="visible" variants={staggerContainerSlow}>
          
          {/* File Metadata Overview */}
          <motion.div variants={fadeInUp} className="card-elevated" style={{ marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--color-primary-50)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary-600)' }}>
                  <FileText size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>Extracted Report: {fileName}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>Processed successfully by OCR engine</p>
                </div>
              </div>
              <div className="badge badge-success">
                <CheckCircle size={14} /> Verified Data
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-1)' }}>Sample ID</div>
                <div style={{ fontWeight: 600, color: 'var(--color-neutral-900)' }}>{soilSampleData.sampleId}</div>
              </div>
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-1)' }}>Collection Date</div>
                <div style={{ fontWeight: 600, color: 'var(--color-neutral-900)' }}>{soilSampleData.collectionDate}</div>
              </div>
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-1)' }}>Location</div>
                <div style={{ fontWeight: 600, color: 'var(--color-neutral-900)' }}>{soilSampleData.location}</div>
              </div>
              <div style={{ padding: 'var(--space-4)', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-1)' }}>Soil Type</div>
                <div style={{ fontWeight: 600, color: 'var(--color-neutral-900)' }}>{soilSampleData.soilType}</div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <SoilHealthDashboard soilHealthScore={soilHealthScore} nutrientRadarData={nutrientRadarData} />
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <SoilDataTable soilParameters={soilParameters} />
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
            <motion.div variants={fadeInUp}>
              <CropRecommendation cropRecommendations={cropRecommendations} />
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <FertilityPlan fertilityPlan={fertilityPlan} />
            </motion.div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
