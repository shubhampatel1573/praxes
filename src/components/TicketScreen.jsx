import React, { useEffect } from 'react';
import { Download, CheckCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import html2pdf from 'html2pdf.js';

const TicketScreen = ({ data }) => {
  useEffect(() => {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    const element = document.getElementById('ticket-content');

    // Clone the ticket and wrap in a full-page centering container
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'width: 7.5in; min-height: 10in; display: flex; align-items: center; justify-content: center; background: #ffffff; box-sizing: border-box; padding: 0.5in;';
    const clone = element.cloneNode(true);
    clone.style.maxWidth = '100%';
    wrapper.appendChild(clone);

    const opt = {
      margin: 0.25,
      filename: `${data.ticketId}-Ticket.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(wrapper).save();
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <CheckCircle size={80} className="glow-text-emerald" style={{ margin: '0 auto 1rem' }} />
      <h2 className="glow-text-gold mb-2">Registration Successful!</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>A confirmation email will be sent within 48 hours.</p>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div
          id="ticket-content"
          style={{
            background: '#ffffff',
            border: '2px solid #333',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            color: '#222',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'left'
          }}
        >
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', fontSize: '150px', opacity: '0.05', transform: 'rotate(-15deg)', color: '#000', pointerEvents: 'none' }}>
            ★
          </div>

          <div style={{ borderBottom: '1px dashed #ccc', paddingBottom: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
            <h1 style={{ color: '#06a33b', fontSize: '1.8rem', marginBottom: '0.25rem', fontWeight: 'bold' }}>PRAXES 2K26</h1>
            <p style={{ color: '#b89218', fontWeight: 'bold', letterSpacing: '2px' }}>PARTICIPATION TICKET</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            <div>
              <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.1rem' }}>Ticket ID</p>
              <p style={{ fontWeight: 'bold', color: '#b89218' }}>{data.ticketId}</p>
            </div>
            <div>
              <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.1rem' }}>Date</p>
              <p style={{ fontWeight: 'bold' }}>{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#222', marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Event Details</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: '#555' }}>Event:</span>
              <span style={{ fontWeight: 'bold', color: '#06a33b' }}>{(data.selectedEvent || '').toUpperCase()}</span>
            </div>
            {data.teamName && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: '#555' }}>Team:</span>
                <span style={{ fontWeight: 'bold' }}>{data.teamName}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#555' }}>Fee Paid:</span>
              <span style={{ fontWeight: 'bold', color: '#b89218' }}>₹{data.eventFee}</span>
            </div>
          </div>

          <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
            <h3 style={{ color: '#222', marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>
              Participant Info {data.teamLimit > 1 ? '(Team Leader)' : ''}
            </h3>
            <p style={{ marginBottom: '0.5rem' }}><strong>Name:</strong> {data.participants && data.participants[0] ? data.participants[0].fullName : data.fullName}</p>
            <p style={{ marginBottom: '0.5rem' }}><strong>College:</strong> {data.collegeName}</p>
            <p style={{ marginBottom: '0.5rem' }}><strong>Dept & Year:</strong> {data.participants && data.participants[0] ? data.participants[0].department : data.department} ({data.participants && data.participants[0] ? data.participants[0].semester : data.semester} Year)</p>
            <p style={{ marginBottom: '0.5rem' }}><strong>Contact:</strong> {data.participants && data.participants[0] ? data.participants[0].contactNo : data.contactNo}</p>
            {data.collegeName !== 'Government Engineering College, Palanpur' && data.transactionId && (
              <p style={{ color: '#06a33b', marginTop: '0.5rem' }}><strong>Transaction ID:</strong> {data.transactionId}</p>
            )}
          </div>

          <div style={{ marginTop: '1.5rem', background: '#fff9e6', borderLeft: '4px solid #b89218', padding: '1rem', borderRadius: '4px', fontSize: '0.85rem', color: '#222', textAlign: 'left' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#b89218' }}>Important Instructions:</p>
            <ol style={{ paddingLeft: '1.2rem', margin: 0 }}>
              <li style={{ marginBottom: '0.25rem' }}>This ticket is not valid until it is <span style={{ fontWeight: 'bold', color: '#06a33b' }}>stamped by the registration committee</span>.</li>
              <li>Please verify your ticket at the registration desk.</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="ticket-actions" style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={handleDownload} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={18} />
          Download Ticket (PDF)
        </button>
        <Link to="/" className="btn btn-emerald" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Home size={18} />
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default TicketScreen;
