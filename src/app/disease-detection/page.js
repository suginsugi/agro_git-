'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bug } from 'lucide-react';
import FileUploadDropzone from '@/components/ui/FileUploadDropzone';
import { useAppStore } from '@/store/useAppStore';
import { recentDetections } from '@/data/diseaseData';
import { staggerContainer, fadeInUp, blurReveal, staggerContainerSlow } from '@/lib/animations';

function RecentDetections() {
  const getSeverityBadge = (severity) => {
    switch(severity) {
      case 'high': return <span className="badge badge-danger">High</span>;
      case 'moderate': return <span className="badge badge-warning">Moderate</span>;
      case 'low': return <span className="badge badge-info">Low</span>;
      default: return <span className="badge badge-neutral">{severity}</span>;
    }
  };

  return (
    <div className="card-elevated">
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)' }}>Recent Farm Detections</h3>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Field / Crop</th>
              <th>Detected Disease</th>
              <th>Severity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentDetections.map((detection, i) => (
              <tr key={i}>
                <td style={{ color: 'var(--color-neutral-600)' }}>{detection.date}</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{detection.field}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{detection.crop}</div>
                </td>
                <td style={{ fontWeight: 500 }}>{detection.disease}</td>
                <td>{getSeverityBadge(detection.severity)}</td>
                <td>
                  <button className="btn btn-outline-primary btn-sm" style={{ padding: '4px 12px' }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { diseaseApi } from '@/services/api';

export default function DiseaseDetectionUploadPage() {
  const router = useRouter();
  const setDiseaseUpload = useAppStore((state) => state.setDiseaseUpload);
  const setDiseaseReportId = useAppStore((state) => state.setDiseaseReportId);

  const handleUploadSuccess = async (fileData) => {
    try {
      if (fileData.raw) {
        const response = await diseaseApi.analyze(fileData.raw);
        setDiseaseReportId(response.id);
      }
      setDiseaseUpload(fileData);
      router.push('/disease-detection/result');
    } catch (error) {
      console.error("Error analyzing disease:", error);
      // Fallback
      setDiseaseUpload(fileData);
      router.push('/disease-detection/result');
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #fef2f2 0%, #fffbeb 50%, #f0fdf4 100%)' }}>
        <div className="page-header-content">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-danger)',
              marginBottom: 'var(--space-3)'
            }}>
              <Bug size={16} /> Pathology Diagnostics
            </motion.div>
            <motion.h1 variants={fadeInUp} className="page-title">Disease Detection AI</motion.h1>
            <motion.p variants={fadeInUp} className="page-description">
              Upload images of affected crops for instant, highly accurate identification 
              of diseases, pests, and nutrient deficiencies.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Page Content */}
      <div style={{ padding: 'var(--space-12) 0', background: 'var(--color-neutral-50)', minHeight: '100vh' }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={staggerContainerSlow}>
            
            <motion.div variants={blurReveal} style={{ maxWidth: '800px', margin: '0 auto var(--space-8)' }}>
              <div className="card-elevated">
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-1)' }}>Diagnostic Scan</h3>
                  <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)' }}>
                    Upload close-up images of affected leaves or crops for AI analysis
                  </p>
                </div>
                
                <FileUploadDropzone 
                  onUploadSuccess={handleUploadSuccess}
                  accept="image/png, image/jpeg, application/pdf"
                  title="Upload Affected Area"
                  subtitle="Drag and drop high-resolution JPG or PNG images"
                  icon="image"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <RecentDetections />
            </motion.div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}
