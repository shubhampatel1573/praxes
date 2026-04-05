import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Users, IndianRupee, Phone, User } from 'lucide-react';
import { getEventById, getIconComponent } from '../utils/eventManager';
import './EventDetail.css';

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const found = getEventById(eventId);
    setEvent(found);
  }, [eventId]);

  if (!event) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2 className="glow-text-gold">Event Not Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>The event you're looking for doesn't exist.</p>
        <Link to="/events" className="btn btn-primary">← Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="event-detail-page">
      <div className="container" style={{ padding: '2rem 1rem 4rem' }}>
        {/* Back link */}
        <Link to="/events" className="event-back-link">
          <ArrowLeft size={18} /> Back to Events
        </Link>

        {/* Header */}
        <motion.div 
          className="event-detail-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="event-detail-icon">
            {getIconComponent(event.iconName || 'Star', { size: 48 })}
          </div>
          <h1 className="event-detail-title glow-text-gold">{event.name}</h1>
          <p className="event-detail-tagline">{event.desc}</p>
        </motion.div>

        {/* Info Cards Row */}
        <motion.div 
          className="event-info-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {event.venue && (
            <div className="event-info-card">
              <MapPin size={20} className="event-info-icon" />
              <span className="event-info-label">Venue</span>
              <span className="event-info-value">{event.venue}</span>
            </div>
          )}

          {event.time && (
            <div className="event-info-card">
              <Clock size={20} className="event-info-icon" />
              <span className="event-info-label">Time</span>
              <span className="event-info-value">{event.time}</span>
            </div>
          )}
          <div className="event-info-card">
            <Users size={20} className="event-info-icon" />
            <span className="event-info-label">Team Size</span>
            <span className="event-info-value">{event.limit}</span>
          </div>
          <div className="event-info-card">
            <IndianRupee size={20} className="event-info-icon" />
            <span className="event-info-label">Entry Fee</span>
            <span className="event-info-value">₹{event.fee}</span>
          </div>

        </motion.div>

        {/* Description */}
        <motion.section 
          className="event-detail-section card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="event-section-title glow-text-emerald">About the Event</h2>
          <p className="event-detail-description">{event.fullDescription || event.desc}</p>
        </motion.section>



        {/* Event Coordinators */}
        {event.coordinators && event.coordinators.length > 0 && (
          <motion.section 
            className="event-detail-section card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <h2 className="event-section-title glow-text-emerald">Event Coordinators</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {event.coordinators.map((coord, index) => (
                coord.name && (
                  <div key={index} className="event-coordinator">
                    <div className="event-coordinator-info">
                      <User size={18} className="event-info-icon" />
                      <span>{coord.name}</span>
                    </div>
                    {coord.phone && (
                      <a href={`tel:${coord.phone}`} className="event-coordinator-info event-coordinator-phone">
                        <Phone size={16} className="event-info-icon" />
                        <span>{coord.phone}</span>
                      </a>
                    )}
                  </div>
                )
              ))}
            </div>
          </motion.section>
        )}

        {/* Register CTA */}
        <motion.div 
          className="event-detail-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="glow-text-gold" style={{ marginBottom: '0.5rem', fontSize: '1.8rem' }}>Ready to Participate?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Secure your spot in {event.name} now!</p>
          <Link to="/register" className="btn btn-primary btn-lg">Register Now</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetail;
