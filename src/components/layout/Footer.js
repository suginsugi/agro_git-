import Link from 'next/link';
import { Sprout } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="navbar-logo" style={{ color: 'var(--color-neutral-100)' }}>
              <div className="navbar-logo-icon">
                <Sprout size={20} />
              </div>
              <span>AgroVision</span>
            </div>
            <p className="footer-brand-description">
              Advanced Agricultural Intelligence Platform combining precision agriculture,
              soil science, climate intelligence, and AI-powered decision support for
              sustainable farming operations.
            </p>
          </div>

          <div>
            <h4 className="footer-column-title">Platform</h4>
            <ul className="footer-links">
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li><Link href="/soil-analysis">Soil Analysis</Link></li>
              <li><Link href="/weather">Weather Intelligence</Link></li>
              <li><Link href="/crop-report">Crop Reports</Link></li>
              <li><Link href="/disease-detection">Disease Detection</Link></li>
              <li><Link href="/irrigation">Smart Irrigation</Link></li>
              <li><Link href="/agri-market">Agri Market</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-column-title">Resources</h4>
            <ul className="footer-links">
              <li><Link href="/ai-assistant">AI Assistant</Link></li>
              <li><Link href="/profile">My Profile</Link></li>
              <li><Link href="/settings">Settings</Link></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Knowledge Base</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-column-title">Company</h4>
            <ul className="footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Partners</a></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 AgroVision Technologies. All rights reserved.</p>
          <p style={{ color: 'var(--color-neutral-500)' }}>
            Built for sustainable agriculture
          </p>
        </div>
      </div>
    </footer>
  );
}
