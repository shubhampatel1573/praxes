import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEventsList, getIconComponent } from '../utils/eventManager';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [coordinators] = useState(() => {
    const others = ['Poojan Patel', 'Ravin Purohit', 'Bakul Parmar'];
    for (let i = others.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [others[i], others[j]] = [others[j], others[i]];
    }
    return ['Sweni Patel', ...others, 'Sanjay Modi', 'Hitesh Rabari'];
  });

  useEffect(() => {
    setEvents(getEventsList());
  }, []);

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 className="text-center glow-text-gold mb-4" style={{ fontSize: '3rem' }}>Events Overview</h1>
      <p className="text-center text-muted" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
        Discover the wide range of technical and cultural events at PRAXES 2K26. 
        Compete, learn, and win amazing prizes!
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {events.map(event => (
          <Link 
            key={event.id} 
            to={`/events/${event.id}`} 
            className="card" 
            style={{ transition: 'transform 0.3s', cursor: 'pointer', textDecoration: 'none', color: 'inherit', display: 'block' }} 
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} 
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ color: 'var(--accent-emerald)', marginBottom: '1rem', background: 'rgba(11, 218, 81, 0.1)', padding: '1rem', borderRadius: '50%', display: 'inline-block' }}>
              {getIconComponent(event.iconName || 'Star', { size: 32 })}
            </div>
            <h3 className="glow-text-gold" style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{event.name}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', minHeight: '48px' }}>{event.desc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', color: 'var(--text-primary)', fontSize: '0.9rem' }}>
              <span><strong>Fee:</strong> ₹{event.fee}</span>
              <span><strong>Limit:</strong> {event.limit}</span>
            </div>
            <div style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--accent-gold)', fontSize: '0.9rem', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              View Details →
            </div>
          </Link>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2 className="glow-text-emerald" style={{ marginBottom: '1.5rem' }}>Ready to Compete?</h2>
        <Link to="/register" className="btn btn-primary btn-lg">Register Now</Link>
      </div>

      {/* Main Coordinators Section */}
      <div className="card" style={{ maxWidth: '800px', margin: '4rem auto 0', padding: '2.5rem 2rem', textAlign: 'center', background: 'rgba(11, 218, 81, 0.03)' }}>
        <h2 className="glow-text-emerald main-coordinators-title">Main Co-ordinators PRAXES 2K26</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          {coordinators.map((name, index) => (
            <div key={index} style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '0.8rem 1.5rem', 
              borderRadius: '50px', 
              border: '1px solid rgba(11, 218, 81, 0.2)',
              color: 'var(--text-primary)',
              fontWeight: '500',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease',
              cursor: 'default'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.background = 'rgba(11, 218, 81, 0.1)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(11, 218, 81, 0.2)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
