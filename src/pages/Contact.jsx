import React from 'react';
import { MapPin, Phone, Mail, Code, Linkedin } from 'lucide-react';
import './Contact.css';

const developers = [
  { name: 'Shubham Patel', phone: '8320425345', linkedin: 'https://www.linkedin.com/in/shubhampatel1573' },
  { name: 'Himanshu Nai', phone: '9875017538', linkedin: 'https://www.linkedin.com/in/gj-cp-gecpl-2027-315-himanshu' },
  { name: 'Pratham Parmar', phone: '9427512951', linkedin: 'https://www.linkedin.com/in/gj-cp-gecpl-2027-027-pratham/' },
  { name: 'Kuldeep Parmar', phone: '9724944920', linkedin: 'https://www.linkedin.com/in/gj-cp-gecpl-2027-026-kuldeep' },
  { name: 'Mahimn Joshi', phone: '7041997504', linkedin: 'https://www.linkedin.com/in/gj-cp-gecpl-2027-016-mahimn' },
];

const Contact = () => {
  return (
    <div className="container contact-container">
      <h1 className="glow-text-emerald contact-title">Contact Us</h1>
      <p className="text-muted contact-subtitle">
        Have questions or need assistance? Reach out to our organizing committee.
      </p>

      {/* ===== PREMIUM PHONE / DEVELOPED BY SECTION ===== */}
      <div className="dev-showcase">
        <div className="dev-showcase-border"></div>
        <div className="dev-showcase-inner">
          <div className="dev-showcase-header">
            <div className="dev-showcase-icon">
              <Code size={28} />
            </div>
            <div>
              <h2 className="dev-showcase-title">Developed &amp; Managed by</h2>
              <p className="dev-showcase-sub">The Tech Team behind PRAXES 2K26</p>
            </div>
          </div>

          <div className="dev-grid">
            {developers.map((dev, i) => (
              <div className="dev-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="dev-card-avatar">
                  {dev.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="dev-card-info">
                  <h4 className="dev-card-name">{dev.name}</h4>
                  <a href={`tel:${dev.phone}`} className="dev-card-phone">
                    <Phone size={14} />
                    <span>{dev.phone}</span>
                  </a>
                </div>
                <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="dev-card-linkedin" title="LinkedIn">
                  <Linkedin size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== EMAIL & LOCATION ===== */}
      <div className="card contact-card">
        <div className="contact-item">
          <div className="contact-header">
            <div className="contact-icon icon-gold">
              <Mail size={24} />
            </div>
            <h3 className="contact-heading">Email</h3>
          </div>
          <div className="contact-content info-text">
            <p>praxes@gecpalanpur.ac.in</p>
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-header">
            <div className="contact-icon icon-gold">
              <MapPin size={24} />
            </div>
            <h3 className="contact-heading">Our Location</h3>
          </div>
          <div className="contact-content info-text">
            <p>
              Government Engineering College,<br />
              Palanpur-Ahmedabad Highway,<br />
              Palanpur, Gujarat 385011
            </p>
          </div>
        </div>
      </div>

      <div className="card map-card">
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', textAlign: 'center' }}>Find us on Google Maps</h3>
        <iframe 
          src="https://maps.google.com/maps?q=Government%20Engineering%20College,%20Palanpur,%20Gujarat%20385011&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          width="100%" 
          height="350" 
          style={{ border: 0, borderRadius: '8px' }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
        ></iframe>
      </div>

      <div className="social-section">
        <p style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Follow us on social media for regular updates!</p>
        <div className="social-buttons">
          <a href="https://www.instagram.com/gecpalanpur2009/" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textDecoration: 'none' }}>Instagram</a>
          <a href="https://www.youtube.com/@gecpalanpurofficial7451/featured" target="_blank" rel="noopener noreferrer" className="btn btn-emerald" style={{ textDecoration: 'none' }}>YouTube</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
