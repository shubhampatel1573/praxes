import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Instagram, Youtube, Menu, X } from 'lucide-react';
import BackgroundParticles from './BackgroundParticles';
import logoUrl from '../assets/logo.png';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <BackgroundParticles />
      <motion.header 
        className="header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container header-content">
          <Link to="/" className="brand" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={logoUrl} alt="PRAXES Logo" className="brand-logo" style={{ height: '44px', width: 'auto' }} />
            <span className="brand-text">PRAXES <span className="highlight glow-text-emerald">2K26</span></span>
          </Link>
          
          <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className={`nav-link ${location.pathname === '/events' ? 'active' : ''}`}>Events</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
            <a href="https://drive.google.com/drive/folders/1gwOjYI2K-qFZOSc-NeQXvQlYMWlNZZE1" target="_blank" rel="noopener noreferrer" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Rules & Regulation</a>
            
            <Link to="/register" className="btn btn-emerald register-header-btn" onClick={() => setIsMobileMenuOpen(false)}>
              Register Now
            </Link>

            <a href="https://cultural.gecpalanpur.com" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-cultural" onClick={() => setIsMobileMenuOpen(false)}>
              <img src="/Cultural.png" alt="" className="cultural-couple-icon" />
              Cultural Night
            </a>

            <div className="social-nav-icons">
              <a href="https://www.instagram.com/gecpalanpur2009/" target="_blank" rel="noopener noreferrer" className="social-icon instagram-icon">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@gecpalanpurofficial7451/featured" target="_blank" rel="noopener noreferrer" className="social-icon youtube-icon">
                <Youtube size={20} />
              </a>
            </div>
          </nav>

          <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>
      
      <AnimatePresence mode="wait">
        <motion.main 
          className="main-content"
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-social">
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Follow us on</span>
            <a href="https://www.instagram.com/gecpalanpur2009/" target="_blank" rel="noopener noreferrer" className="social-icon instagram-icon">
              <Instagram size={18} />
            </a>
            <a href="https://www.youtube.com/@gecpalanpurofficial7451/featured" target="_blank" rel="noopener noreferrer" className="social-icon youtube-icon">
              <Youtube size={18} />
            </a>
            <span style={{ color: 'var(--text-muted)', margin: '0 0.25rem' }}>|</span>
            <Link to="/contact" className="footer-link">Contact Us</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Government Engineering College, Palanpur.</p>
          <div className="footer-credits" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Developed by
            </span>
            <span style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.15rem 0.4rem', fontSize: '0.85rem' }}>
              <a href="https://www.linkedin.com/in/shubhampatel1573" target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-emerald)', textDecoration: 'none', fontWeight: 500}}>@Shubham Patel</a>
              <span style={{color: 'var(--text-muted)'}}>·</span>
              <a href="https://www.linkedin.com/in/gj-cp-gecpl-2027-315-himanshu" target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-emerald)', textDecoration: 'none', fontWeight: 500}}>@Himanshu Nai</a>
              <span style={{color: 'var(--text-muted)'}}>·</span>
              <a href="https://www.linkedin.com/in/gj-cp-gecpl-2027-027-pratham/" target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-emerald)', textDecoration: 'none', fontWeight: 500}}>@Pratham Parmar</a>
              <span style={{color: 'var(--text-muted)'}}>·</span>
              <a href="https://www.linkedin.com/in/gj-cp-gecpl-2027-026-kuldeep" target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-emerald)', textDecoration: 'none', fontWeight: 500}}>@Kuldeep Parmar</a>
              <span style={{color: 'var(--text-muted)'}}>·</span>
              <a href="https://www.linkedin.com/in/gj-cp-gecpl-2027-016-mahimn" target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-emerald)', textDecoration: 'none', fontWeight: 500}}>@Mahimn Joshi</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
