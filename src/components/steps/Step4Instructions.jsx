import React, { useState } from 'react';
import { ShieldAlert, CheckCircle } from 'lucide-react';

const Step4Instructions = ({ nextStep, prevStep, data, updateFormData, submitForm }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isGEC = data.collegeName === 'Government Engineering College, Palanpur';

  const handleAction = async () => {
    if (!isConfirmed) {
      setError('You must confirm that you have read the instructions.');
      return;
    }
    
    setError('');

    if (isGEC) {
      // GEC Submits here
      setIsSubmitting(true);
      await submitForm({ paymentUpiId: 'OFFLINE_GEC', transactionId: 'OFFLINE_GEC' });
      setIsSubmitting(false);
    } else {
      // Non-GEC proceeds to Payment (Step 5)
      nextStep();
    }
  };

  return (
    <div className="step-container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <ShieldAlert size={64} className="glow-text-gold" style={{ margin: '0 auto' }} />
        <h2 className="glow-text-gold mt-4 mb-2">Step 4: Instruction & Support</h2>
      </div>

      <div className="payment-card">
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)', textAlign: 'center', fontSize: '1.5rem' }}>Government Engineering College, Palanpur Support</h3>
        <ul className="instruction-list">
          {isGEC ? (
             <li style={{ marginBottom: '0.75rem' }}>You must have your ticket verified by the registration team after making the offline payment at the venue.</li>
          ) : (
             <li style={{ marginBottom: '0.75rem' }}>Online payment via UPI is required on the next step. Ensure you keep the Transaction ID handy.</li>
          )}
          <li style={{ marginBottom: '0.75rem' }}>The ticket is valid only if it has been verified by the registration team.</li>
          <li style={{ marginBottom: '0.75rem' }}><span className="glow-text-gold" style={{fontWeight: 'bold'}}>Venue:</span> GECPL College Library</li>
          <li>
            <span className="glow-text-gold" style={{fontWeight: 'bold'}}>For any queries, feel free to contact:</span>
            <ul className="contact-list">
              <li style={{ marginBottom: '0.4rem', whiteSpace: 'nowrap' }}><strong>Shubham Patel</strong> &nbsp;–&nbsp; 8320425345</li>
              <li style={{ marginBottom: '0.4rem', whiteSpace: 'nowrap' }}><strong>Himanshu Nai</strong> &nbsp;–&nbsp; 9875017538</li>
              <li style={{ marginBottom: '0.4rem', whiteSpace: 'nowrap' }}><strong>Pratham Parmar</strong> &nbsp;–&nbsp; 9427512951</li>
              <li style={{ marginBottom: '0.4rem', whiteSpace: 'nowrap' }}><strong>Kuldeep Parmar</strong> &nbsp;–&nbsp; 9724944920</li>
              <li style={{ marginBottom: '0.4rem', whiteSpace: 'nowrap' }}><strong>Mahim Joshi</strong> &nbsp;–&nbsp; 7041997504</li>
            </ul>
          </li>
        </ul>

        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '0.75rem', textAlign: 'left', maxWidth: '600px', margin: '2rem auto 0 auto' }}>
          <input 
            type="checkbox" 
            id="confirmInstructions" 
            checked={isConfirmed}
            onChange={(e) => {
              setIsConfirmed(e.target.checked);
              if (e.target.checked) setError('');
            }}
            style={{ width: '18px', height: '18px', minWidth: '18px', accentColor: 'var(--accent-emerald)', cursor: 'pointer', marginTop: '0.2rem' }}
          />
          <label htmlFor="confirmInstructions" style={{ color: 'var(--text-primary)', cursor: 'pointer', fontSize: '1.05rem', userSelect: 'none', lineHeight: '1.4' }}>
            I confirm that I have read the above instructions carefully.
          </label>
        </div>
      </div>

      {error && <p className="form-error" style={{ textAlign: 'center', marginBottom: '1.5rem', marginTop: '-0.5rem', fontSize: '1.05rem', fontWeight: 'bold' }}>{error}</p>}

      <div className="form-navigation">
        <button type="button" className="btn" onClick={prevStep}>
          ← Back
        </button>
        <button type="button" className="btn btn-primary" onClick={handleAction} disabled={isSubmitting} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}>
          {isSubmitting ? (
             <span>Processing...</span>
          ) : isGEC ? (
             <>
                <CheckCircle size={18} />
                Submit Registration
             </>
          ) : (
             <>Next Step →</>
          )}
        </button>
      </div>
    </div>
  );
};

export default Step4Instructions;
