import React, { useState, useEffect } from 'react';
import { CreditCard, Copy, CheckCircle, User, Hash } from 'lucide-react';

const UPI_ACCOUNTS = [
  { name: 'Harsh Nai', upi: 'nai.harsh174-1@okicici', qrImage: '/assets/qr-harsh.jpg' },
  { name: 'Shubham Patel', upi: 'shubhampate832@oksbi', qrImage: '/assets/qr-shubham.jpg' },
  { name: 'Kuldeep Pravinbhai Parmar', upi: 'kuldeepparmar92221@ptaxis', qrImage: '/assets/qr-kuldeep.jpg' },
  { name: 'Pratham Dipakkumar Parmar', upi: '9427512951@ptsbi', qrImage: '/assets/qr-pratham-d.jpg' }
];

const Step5Payment = ({ submitForm, prevStep, data, updateFormData }) => {
  const [activeAccount, setActiveAccount] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // We only arrive here if NOT GEC.
    const randomIndex = Math.floor(Math.random() * UPI_ACCOUNTS.length);
    setActiveAccount(UPI_ACCOUNTS[randomIndex]);
    updateFormData({ paymentUpiId: UPI_ACCOUNTS[randomIndex].upi });
  }, []);

  const handleCopy = () => {
    if (!activeAccount) return;
    navigator.clipboard.writeText(activeAccount.upi);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!data.transactionId || !data.transactionId.trim()) {
      setError('Please enter your Transaction / Reference ID.');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    await submitForm();
    setIsSubmitting(false);
  };

  if (!activeAccount) return null;

  return (
    <div className="step-container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <CreditCard size={64} className="glow-text-gold" style={{ margin: '0 auto' }} />
        <h2 className="glow-text-gold mt-4 mb-2">Step 5: Secure Payment</h2>
        <p className="text-muted">Total Amount to Pay: <span className="glow-text-emerald" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹{data.eventFee || 0}</span></p>
      </div>

      <div className="payment-card" style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(212, 175, 55, 0.3)', textAlign: 'center', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Scan & Pay</h3>
        
        {/* Account Name */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>
          <User size={24} />
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '1px' }}>
            {activeAccount.name}
          </span>
        </div>

        {/* QR Code Image */}
        <div style={{ background: '#fff', padding: '0.5rem', borderRadius: '8px', display: 'inline-block', marginBottom: '1.5rem' }}>
          <img 
            src={activeAccount.qrImage} 
            alt={`UPI QR Code for ${activeAccount.name}`} 
            style={{ display: 'block', maxWidth: '250px', width: '100%', height: 'auto', borderRadius: '4px' }} 
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`upi://pay?pa=${activeAccount.upi}&pn=${activeAccount.name}&am=${data.eventFee || 0}&cu=INR`)}&color=000000&bgcolor=ffffff`;
            }}
          />
        </div>

        <div className="upi-pill" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.75rem 1.5rem', borderRadius: '50px', width: 'fit-content', margin: '0 auto' }}>
          <span className="upi-text" style={{ fontFamily: 'monospace', fontSize: '1.1rem', color: 'var(--accent-gold)' }}>{activeAccount.upi}</span>
          <button onClick={handleCopy} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '0.25rem' }} title="Copy UPI ID">
            {copied ? <CheckCircle size={20} className="glow-text-emerald" /> : <Copy size={20} />}
          </button>
        </div>
        {copied && <p style={{ color: 'var(--accent-emerald)', fontSize: '0.85rem', marginTop: '0.5rem' }}>UPI ID Copied!</p>}
      </div>

      {/* Transaction ID Field */}
      <div className="form-group">
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Hash size={18} />
          Transaction / Reference ID *
        </label>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Enter your UPI Transaction or Reference ID"
          value={data.transactionId || ''}
          onChange={(e) => {
            updateFormData({ transactionId: e.target.value });
            if (e.target.value) setError('');
          }}
        />
      </div>

      {error && <p className="form-error" style={{ textAlign: 'center', marginBottom: '1.5rem', marginTop: '-0.5rem', fontSize: '1.05rem', fontWeight: 'bold' }}>{error}</p>}

      <div className="form-navigation">
        <button type="button" className="btn" onClick={prevStep}>
          ← Back
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}>
          {isSubmitting ? (
             <span>Processing...</span>
          ) : (
             <>
                <CheckCircle size={18} />
                Submit Registration
             </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step5Payment;
