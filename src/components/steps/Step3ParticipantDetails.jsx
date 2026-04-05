import React, { useState } from 'react';
import { UserCheck } from 'lucide-react';

const Step3ParticipantDetails = ({ nextStep, prevStep, data, updateFormData }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const participants = data.participants || [];
    
    participants.forEach((p, i) => {
      if (!p.fullName.trim()) newErrors[`fullName_${i}`] = 'Full Name is required';
      if (!p.department) newErrors[`department_${i}`] = 'Please select a department';
      if (!p.semester) newErrors[`semester_${i}`] = 'Please select a year';
      
      if (i === 0) {
        if (!p.enrollmentNo.trim()) newErrors[`enrollmentNo_${i}`] = 'Enrollment number is required';
        if (!p.contactNo.trim() || !/^\d{10}$/.test(p.contactNo)) newErrors[`contactNo_${i}`] = 'Valid 10-digit contact number is required';
      }
      if (!p.emailId.trim() || !/^\S+@\S+\.\S+$/.test(p.emailId)) newErrors[`emailId_${i}`] = 'Valid email ID is required';
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...(data.participants || [])];
    updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
    updateFormData({ participants: updatedParticipants });
  };

  const participants = data.participants || [];

  return (
    <div className="step-container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <UserCheck size={64} className="glow-text-gold" style={{ margin: '0 auto' }} />
        <h2 className="glow-text-gold mt-4 mb-4">Step 3: Participant Details</h2>
      </div>

      <div className="form-group">
        <label className="form-label">Team Name (Optional)</label>
        <input 
          type="text" 
          className="form-input" 
          placeholder="Enter Team Name (if applicable)"
          value={data.teamName || ''}
          onChange={(e) => updateFormData({ teamName: e.target.value })}
        />
      </div>

      {participants.map((p, index) => (
        <div key={index} style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--accent-emerald)', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
            {participants.length > 1 ? `Participant ${index + 1} ${index === 0 ? '(Team Leader)' : ''}` : 'Participant Details'}
          </h3>

          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="First Last"
              value={p.fullName || ''}
              onChange={(e) => handleParticipantChange(index, 'fullName', e.target.value)}
            />
            {errors[`fullName_${index}`] && <p className="form-error">{errors[`fullName_${index}`]}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Department *</label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {['Computer', 'Civil', 'Mechanical', 'Electrical', 'Other'].map(dept => (
                <label key={dept} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name={`department_${index}`} 
                    value={dept}
                    checked={p.department === dept}
                    onChange={(e) => handleParticipantChange(index, 'department', e.target.value)}
                  />
                  <span style={{ color: 'var(--text-primary)' }}>{dept}</span>
                </label>
              ))}
            </div>
            {errors[`department_${index}`] && <p className="form-error">{errors[`department_${index}`]}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Year *</label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {['1st', '2nd', '3rd', '4th'].map(sem => (
                <label key={sem} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name={`semester_${index}`} 
                    value={sem}
                    checked={p.semester === sem}
                    onChange={(e) => handleParticipantChange(index, 'semester', e.target.value)}
                  />
                  <span style={{ color: 'var(--text-primary)' }}>{sem}</span>
                </label>
              ))}
            </div>
            {errors[`semester_${index}`] && <p className="form-error">{errors[`semester_${index}`]}</p>}
          </div>

          {index === 0 && (
            <div className="form-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label className="form-label">Enrollment No. *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. 210610107000"
                  value={p.enrollmentNo || ''}
                  onChange={(e) => handleParticipantChange(index, 'enrollmentNo', e.target.value)}
                />
                {errors[`enrollmentNo_${index}`] && <p className="form-error">{errors[`enrollmentNo_${index}`]}</p>}
              </div>
              <div>
                <label className="form-label">Contact No. *</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  placeholder="10-digit mobile number"
                  value={p.contactNo || ''}
                  onChange={(e) => handleParticipantChange(index, 'contactNo', e.target.value)}
                />
                {errors[`contactNo_${index}`] && <p className="form-error">{errors[`contactNo_${index}`]}</p>}
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="your.email@example.com"
              value={p.emailId || ''}
              onChange={(e) => handleParticipantChange(index, 'emailId', e.target.value)}
            />
            {errors[`emailId_${index}`] && <p className="form-error">{errors[`emailId_${index}`]}</p>}
          </div>
        </div>
      ))}

      <div className="form-navigation">
        <button type="button" className="btn" onClick={prevStep}>
          ← Back
        </button>
        <button type="button" className="btn btn-primary" onClick={handleNext}>
          Next Step →
        </button>
      </div>
    </div>
  );
};

export default Step3ParticipantDetails;
