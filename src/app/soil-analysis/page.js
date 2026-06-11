'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';
import FileUploadDropzone from '@/components/ui/FileUploadDropzone';
import { useAppStore } from '@/store/useAppStore';
import { staggerContainer, fadeInUp } from '@/lib/animations';

import { soilApi } from '@/services/api';

export default function SoilAnalysisUploadPage() {
  const router = useRouter();
  const setSoilUpload = useAppStore((state) => state.setSoilUpload);
  const setSoilReportId = useAppStore((state) => state.setSoilReportId);

  const handleUploadSuccess = async (fileData) => {
    try {
      if (fileData.raw) {
        const response = await soilApi.upload(fileData.raw);
        setSoilReportId(response.id);
      }
      setSoilUpload(fileData);
      router.push('/soil-analysis/result');
    } catch (error) {
      console.error("Error uploading file:", error);
      // Fallback to local state if backend fails
      setSoilUpload(fileData);
      router.push('/soil-analysis/result');
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-earth-600)',
              marginBottom: 'var(--space-3)'
            }}>
              <FlaskConical size={16} /> Precision Agronomy
            </motion.div>
            <motion.h1 variants={fadeInUp} className="page-title">Soil Intelligence Center</motion.h1>
            <motion.p variants={fadeInUp} className="page-description">
              Upload laboratory reports (PDF, JPG, PNG) to generate AI-driven insights, 
              nutrient profiles, and tailored fertility plans.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Page Content */}
      <div style={{ padding: 'var(--space-12) 0', background: 'var(--color-neutral-50)', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="card-elevated">
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-1)' }}>Laboratory Analysis Upload</h3>
                <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-sm)' }}>
                  Securely upload your soil test report for instant OCR extraction and AI analysis.
                </p>
              </div>

              <FileUploadDropzone 
                onUploadSuccess={handleUploadSuccess}
                accept="application/pdf, image/jpeg, image/png"
                title="Upload Soil Report"
                subtitle="Drag and drop PDF, PNG, or JPG files here, or click to browse"
                icon="file"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
