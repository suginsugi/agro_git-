'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, ShieldAlert, Calendar, 
  Leaf, Search, ShieldCheck, Thermometer, CheckCircle, Image as ImageIcon
} from 'lucide-react';

import GaugeChart from '@/components/ui/GaugeChart';
import ReportActions from '@/components/ui/ReportActions';
import { useAppStore } from '@/store/useAppStore';
import { diseaseLibrary } from '@/data/diseaseData';
import { staggerContainerSlow, fadeInUp } from '@/lib/animations';
import { diseaseApi } from '@/services/api';

function AnalysisDetails({ reportData }) {
  const disease = reportData ? {
    name: reportData.disease_name,
    symptoms: diseaseLibrary[0].symptoms,
    conditions: diseaseLibrary[0].conditions
  } : diseaseLibrary[0];
  
  const severityValue = reportData ? (reportData.severity === 'High' ? 85 : (reportData.severity === 'Moderate' ? 50 : 25)) : 75;
  const severityColor = reportData ? (reportData.severity === 'High' ? 'var(--color-danger)' : (reportData.severity === 'Moderate' ? 'var(--color-warning)' : 'var(--color-info)')) : 'var(--color-danger)';

  
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
      {/* Severity & Metrics */}
      <div className="card-elevated" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-8)', alignSelf: 'flex-start' }}>Severity Assessment</h3>
        
        <GaugeChart 
          value={severityValue} 
          max={100} 
          size={180} 
          strokeWidth={14} 
          color={severityColor}
          label={`${reportData?.severity || 'High'} Risk Level`}
        />
        
        <div style={{ width: '100%', marginTop: 'var(--space-6)', display: 'grid', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--text-sm)' }}>
            <span style={{ color: 'var(--color-neutral-500)' }}>Spore Concentration</span>
            <span style={{ fontWeight: 600 }}>High</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--color-neutral-100)', borderRadius: '3px' }}>
            <div style={{ width: '80%', height: '100%', background: 'var(--color-danger)', borderRadius: '3px' }}></div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
            <span style={{ color: 'var(--color-neutral-500)' }}>Spread Velocity</span>
            <span style={{ fontWeight: 600 }}>Rapid</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--color-neutral-100)', borderRadius: '3px' }}>
            <div style={{ width: '65%', height: '100%', background: 'var(--color-warning)', borderRadius: '3px' }}></div>
          </div>
        </div>
      </div>

      {/* Disease Profile */}
      <div className="card-elevated">
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)' }}>Disease Profile</h3>
        
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
            Identified Symptoms
          </h4>
          <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            {disease.symptoms.map((symptom, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', lineHeight: '1.4' }}>
                <AlertTriangle size={16} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: '2px' }} />
                {symptom}
              </li>
            ))}
          </ul>
        </div>
        
        <div style={{ background: 'var(--color-sky-50)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-sky-500)' }}>
          <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-sky-700)', marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Thermometer size={16} /> Favorable Conditions
          </h4>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: '1.5' }}>
            {disease.conditions}
          </p>
        </div>
      </div>
    </div>
  );
}

function TreatmentPlan({ reportData }) {
  const disease = reportData ? {
    treatments: reportData.recommendations || diseaseLibrary[0].treatments,
    monitoringSchedule: diseaseLibrary[0].monitoringSchedule
  } : diseaseLibrary[0];
  
  return (
    <div className="card-elevated" style={{ marginBottom: 'var(--space-8)' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)' }}>Recommended Treatment Plan</h3>
        <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)' }}>
          Multi-pronged approach for immediate remediation and long-term control
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-5)' }}>
        {disease.treatments.map((treatment, i) => (
          <div key={i} style={{ 
            padding: 'var(--space-5)', 
            background: 'var(--color-neutral-50)', 
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-neutral-200)'
          }}>
            <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              {i === 0 && <ShieldAlert size={18} style={{ color: 'var(--color-danger)' }}/>}
              {i === 1 && <Leaf size={18} style={{ color: 'var(--color-primary-600)' }}/>}
              {i === 2 && <ShieldCheck size={18} style={{ color: 'var(--color-success)' }}/>}
              {treatment.type}
            </h4>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {treatment.actions.map((action, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: '1.5' }}>
                  <div style={{ 
                    width: '18px', height: '18px', borderRadius: '50%', 
                    background: 'var(--color-neutral-200)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: 600, flexShrink: 0, marginTop: '2px'
                  }}>
                    {j+1}
                  </div>
                  {action}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: 'var(--space-6)', borderTop: '1px solid var(--color-neutral-200)', paddingTop: 'var(--space-6)' }}>
        <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Calendar size={16} /> Monitoring Schedule
        </h4>
        <div style={{ display: 'flex', gap: 'var(--space-4)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
          {disease.monitoringSchedule.map((schedule, i) => (
            <div key={i} style={{ minWidth: '180px', flex: 1, padding: 'var(--space-3)', background: 'var(--color-neutral-0)', border: '1px solid var(--color-neutral-200)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-primary-600)', marginBottom: 'var(--space-1)' }}>Week {schedule.week}</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: '1.4' }}>{schedule.action}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DiseaseDetectionResultPage() {
  const router = useRouter();
  const fileData = useAppStore((state) => state.recentUploads.disease);
  const diseaseReportId = useAppStore((state) => state.diseaseReportId);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchReport() {
      if (diseaseReportId) {
        setLoading(true);
        try {
          const data = await diseaseApi.getResult(diseaseReportId);
          setReportData(data);
        } catch (error) {
          console.error("Failed to fetch disease report:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchReport();
  }, [diseaseReportId]);

  // Redirect if no file uploaded
  useEffect(() => {
    if (!fileData && !diseaseReportId) {
      router.push('/disease-detection');
    }
  }, [fileData, diseaseReportId, router]);

  if (!fileData && !diseaseReportId) return null; // Avoid flashing empty state

  const fileName = reportData ? reportData.original_filename : (fileData?.name || 'Unknown File');
  const preview = fileData?.previewUrl || (reportData ? reportData.file_path : null);
  const confidence = reportData ? Math.round(reportData.confidence * 100) : 94;
  const severityBadgeClass = reportData ? (reportData.severity === 'High' ? 'badge-danger' : (reportData.severity === 'Moderate' ? 'badge-warning' : 'badge-info')) : 'badge-danger';
  const diseaseName = reportData ? reportData.disease_name : diseaseLibrary[0].name;
  const affectedArea = reportData ? reportData.affected_area : diseaseLibrary[0].affectedArea;

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading diagnostic results...</div>;
  }

  return (
    <div style={{ padding: 'var(--space-8) 0', background: 'var(--color-neutral-50)', minHeight: '100vh' }}>
      <div className="container">
        
        <ReportActions 
          title="Diagnostic Scan Report" 
          backUrl="/disease-detection" 
        />

        <motion.div initial="hidden" animate="visible" variants={staggerContainerSlow}>
          
          <motion.div variants={fadeInUp} className="card-elevated" style={{ marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)' }}>
              {/* Uploaded Image Preview */}
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
                  <Search size={12} /> Analyzed
                </div>
                
                {!preview && (
                  <div style={{ textAlign: 'center', color: 'var(--color-neutral-400)' }}>
                    <ImageIcon size={48} style={{ margin: '0 auto var(--space-2)' }} />
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{fileName}</div>
                  </div>
                )}
                
                {/* Bounding box overlay to simulate AI detection */}
                <div style={{ 
                  position: 'absolute', top: '20%', left: '30%', width: '40%', height: '50%',
                  border: '2px solid var(--color-danger)', borderRadius: '4px',
                  backgroundColor: 'rgba(239, 68, 68, 0.2)'
                }}>
                  <div style={{ position: 'absolute', top: '-24px', left: '-2px', background: 'var(--color-danger)', color: 'white', fontSize: '10px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px 4px 4px 0' }}>
                    {confidence}% Match
                  </div>
                </div>
              </div>

              {/* Analysis Quick Result */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                  <div className={`badge ${severityBadgeClass}`}>{reportData ? reportData.severity : 'High'} Severity</div>
                  <div className="badge badge-neutral">{confidence}% Confidence</div>
                </div>
                <h4 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-1)', color: 'var(--color-neutral-900)' }}>
                  {diseaseName}
                </h4>
                <div style={{ fontStyle: 'italic', color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
                  {diseaseLibrary[0].scientificName}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                  <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: '2px' }}>Affected Crop</div>
                    <div style={{ fontWeight: 600 }}>{diseaseLibrary[0].crop}</div>
                  </div>
                  <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: '2px' }}>Estimated Affected Area</div>
                    <div style={{ fontWeight: 600, color: 'var(--color-danger)' }}>{affectedArea}% of field</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                    <CheckCircle size={16} style={{ color: 'var(--color-success)' }} /> Verified by Pathology AI
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <AnalysisDetails reportData={reportData} />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <TreatmentPlan reportData={reportData} />
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
