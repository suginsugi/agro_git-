'use client';

import { useState, useRef } from 'react';
import { Upload, File, CheckCircle, X, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FileUploadDropzone({ 
  onUploadSuccess, 
  accept = "image/png, image/jpeg, application/pdf", 
  title = "Upload File",
  subtitle = "Drag and drop or click to browse",
  icon = "file" // 'file' or 'image'
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle, uploading, processing, complete, error
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (selectedFile) => {
    if (!selectedFile) return;
    
    // Create local object URL for preview
    const previewUrl = URL.createObjectURL(selectedFile);
    const fileData = {
      name: selectedFile.name,
      size: (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: selectedFile.type,
      previewUrl,
      raw: selectedFile
    };

    setFile(fileData);
    setStatus('uploading');
    setProgress(0);

    // Simulate upload and processing
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setStatus('processing');
        
        setTimeout(() => {
          setStatus('complete');
          setTimeout(() => {
            if (onUploadSuccess) onUploadSuccess(fileData);
          }, 800); // Wait a moment so user sees completion
        }, 1500); // Simulate processing time
      } else {
        setProgress(currentProgress);
      }
    }, 300);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    processFile(droppedFile);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    processFile(selectedFile);
  };

  const IconComponent = icon === 'image' ? ImageIcon : Upload;

  return (
    <div style={{ width: '100%' }}>
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`upload-zone ${isDragging ? 'active' : ''}`}
            style={{ padding: 'var(--space-12) var(--space-8)' }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept={accept}
              onChange={handleFileSelect}
            />
            <div className="upload-zone-icon" style={{ 
              background: icon === 'image' ? 'var(--color-danger)' : 'var(--color-primary-500)', 
              color: 'white', 
              opacity: 0.9 
            }}>
              <IconComponent size={24} />
            </div>
            <h4 className="upload-zone-title">{title}</h4>
            <p className="upload-zone-subtitle">{subtitle}</p>
            <div style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)' }}>
              Supports: {accept.split(',').join(', ')}
            </div>
          </motion.div>
        )}

        {status !== 'idle' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-elevated"
            style={{ padding: 'var(--space-8)', textAlign: 'center' }}
          >
            <div style={{ marginBottom: 'var(--space-6)', display: 'flex', justifyContent: 'center' }}>
              {status === 'complete' ? (
                <div style={{ color: 'var(--color-success)' }}>
                  <CheckCircle size={48} />
                </div>
              ) : (
                <div style={{ color: 'var(--color-primary-500)' }}>
                  <File size={48} />
                </div>
              )}
            </div>
            
            <h4 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
              {status === 'uploading' ? 'Uploading File...' : status === 'processing' ? 'AI Diagnostic Scan...' : 'Analysis Complete!'}
            </h4>
            
            {status === 'processing' && (
              <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto var(--space-4)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--color-neutral-100)' }}>
                {file?.previewUrl && <img src={file.previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />}
                <motion.div
                  animate={{ y: [0, 100, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
                    background: 'var(--color-primary-500)',
                    boxShadow: '0 0 12px var(--color-primary-500)'
                  }}
                />
              </div>
            )}

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-6)' }}>
              {file?.name} ({file?.size})
            </p>

            <div style={{ maxWidth: '300px', margin: '0 auto' }}>
              <div className="progress-bar" style={{ height: '8px', marginBottom: 'var(--space-2)' }}>
                <motion.div 
                  className="progress-bar-fill" 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  style={{ 
                    background: status === 'complete' ? 'var(--color-success)' : 'var(--color-primary-500)' 
                  }}
                />
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', display: 'flex', justifyContent: 'space-between' }}>
                <span>{Math.round(progress)}%</span>
                <span>{status === 'processing' ? 'Processing...' : status === 'complete' ? 'Done' : 'Uploading'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
