import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { getEventsList } from '../../utils/eventManager';

const Step2BasicInfo = ({ nextStep, prevStep, data, updateFormData }) => {
  const [errors, setErrors] = useState({});
  const [eventsList, setEventsList] = useState([]);
  const [collegeSelection, setCollegeSelection] = useState(
    data.collegeName === 'Government Engineering College, Palanpur' ? 'GEC' : (data.collegeName ? 'OTHER' : '')
  );

  const handleRadioChange = (val) => {
    setCollegeSelection(val);
    if (val === 'GEC') {
      updateFormData({ collegeName: 'Government Engineering College, Palanpur' });
    } else {
      updateFormData({ collegeName: '' });
    }
  };

  useEffect(() => {
    setEventsList(getEventsList());
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!collegeSelection) newErrors.collegeName = "Please select your college";
    else if (collegeSelection === 'OTHER' && !data.collegeName.trim()) newErrors.collegeName = "College Name is required";
    if (!data.selectedEvent) newErrors.selectedEvent = "Please select an event";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  const handleEventChange = (e) => {
    const eventId = e.target.value;
    const selected = eventsList.find(ev => ev.id === eventId);
    
    let limit = 1;
    if (selected && selected.limit) {
      const parsed = parseInt(selected.limit, 10);
      if (!isNaN(parsed) && parsed > 0) limit = parsed;
    }

    updateFormData({
      selectedEvent: eventId,
      eventFee: selected ? selected.fee : 0,
      teamLimit: limit,
      participants: Array.from({ length: limit }, (_, i) => data.participants && data.participants[i] ? data.participants[i] : { fullName: '', department: '', semester: '', enrollmentNo: '', contactNo: '', emailId: '' })
    });
  };

  return (
    <div className="step-container">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Shield size={64} className="glow-text-emerald" style={{ margin: '0 auto' }} />
        <h2 className="glow-text-gold mt-4 mb-4">Step 2: Basic Information</h2>
      </div>

      <div className="form-group">
        <label className="form-label">College / Institute Name *</label>
        
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="collegeType" 
              value="GEC"
              checked={collegeSelection === 'GEC'}
              onChange={() => handleRadioChange('GEC')}
              style={{ accentColor: 'var(--accent-emerald)', width: '18px', height: '18px' }}
            />
            Government Engineering College, Palanpur
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="collegeType" 
              value="OTHER"
              checked={collegeSelection === 'OTHER'}
              onChange={() => handleRadioChange('OTHER')}
              style={{ accentColor: 'var(--accent-emerald)', width: '18px', height: '18px' }}
            />
            Other
          </label>
        </div>

        {collegeSelection === 'OTHER' && (
          <input 
            type="text" 
            className="form-input mt-2" 
            placeholder="Enter your College / Institute Name"
            value={data.collegeName}
            onChange={(e) => updateFormData({ collegeName: e.target.value })}
            autoFocus
          />
        )}
        {errors.collegeName && <p className="form-error">{errors.collegeName}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Select Event *</label>
        <select 
          className="form-select"
          value={data.selectedEvent}
          onChange={handleEventChange}
        >
          <option value="">-- Choose an Event --</option>
          {eventsList.map(ev => (
            <option key={ev.id} value={ev.id}>{ev.name} (₹{ev.fee})</option>
          ))}
        </select>
        {errors.selectedEvent && <p className="form-error">{errors.selectedEvent}</p>}
      </div>

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

export default Step2BasicInfo;
