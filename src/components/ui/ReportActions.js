'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, Printer, Share2 } from 'lucide-react';

export default function ReportActions({ backUrl = "/", title = "Analysis Report", onDownload, onPrint, onShare }) {
  const router = useRouter();

  const defaultPrint = () => window.print();
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      flexWrap: 'wrap',
      gap: 'var(--space-4)',
      marginBottom: 'var(--space-8)',
      paddingBottom: 'var(--space-4)',
      borderBottom: '1px solid var(--color-neutral-200)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <button 
          onClick={() => router.push(backUrl)}
          className="btn btn-icon" 
          style={{ background: 'var(--color-neutral-100)', color: 'var(--color-neutral-700)' }}
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, margin: 0 }}>{title}</h2>
      </div>
      
      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <button 
          className="btn btn-outline-primary btn-sm"
          onClick={onShare || (() => alert('Share functionality would open here.'))}
        >
          <Share2 size={14} /> Share
        </button>
        <button 
          className="btn btn-outline-primary btn-sm"
          onClick={onPrint || defaultPrint}
        >
          <Printer size={14} /> Print
        </button>
        <button 
          className="btn btn-primary btn-sm"
          onClick={onDownload || (() => alert('Downloading PDF report...'))}
        >
          <Download size={14} /> Download PDF
        </button>
      </div>
    </div>
  );
}
