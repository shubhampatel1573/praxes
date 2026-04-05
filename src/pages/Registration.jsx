import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Registration.css';
import Step1EventFees from '../components/steps/Step1EventFees';
import Step2BasicInfo from '../components/steps/Step2BasicInfo';
import Step3ParticipantDetails from '../components/steps/Step3ParticipantDetails';
import Step4Instructions from '../components/steps/Step4Instructions';
import Step5Payment from '../components/steps/Step5Payment';
import TicketScreen from '../components/TicketScreen';
import { GOOGLE_SHEET_WEBHOOK_URL } from '../config';

const Registration = () => {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    collegeName: '',
    selectedEvent: '',
    eventFee: 0,
    teamLimit: 1,
    teamName: '',
    participants: [{ fullName: '', department: '', semester: '', enrollmentNo: '', contactNo: '', emailId: '' }],
    paymentUpiId: '',
    transactionId: '',
    ticketId: ''
  });

  const isGEC = formData.collegeName === 'Government Engineering College, Palanpur';
  const totalSteps = isGEC ? 4 : 5;

  const generateTicketId = () => {
    return 'PRAXES-' + Math.floor(1000 + Math.random() * 9000);
  };

  const updateFormData = (fields) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  const submitForm = async (additionalData = {}) => {
    const ticketId = generateTicketId();
    
    // Flatten participants for webhook and Ticket screen
    const flatData = {
      fullName: formData.participants.map(p => p.fullName).join(' | '),
      department: formData.participants.map(p => p.department).join(' | '),
      semester: formData.participants.map(p => p.semester).join(' | '),
      enrollmentNo: formData.participants.map(p => p.enrollmentNo).join(' | '),
      contactNo: formData.participants.map(p => p.contactNo).join(' | '),
      emailId: formData.participants.map(p => p.emailId).join(' | ')
    };
    
    const finalData = { ...formData, ...additionalData };
    updateFormData({ ticketId, ...flatData, ...additionalData });
    const payload = { ...finalData, ...flatData, ticketId };
    
    if (GOOGLE_SHEET_WEBHOOK_URL && GOOGLE_SHEET_WEBHOOK_URL.startsWith('http')) {
      try {
        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.error("Error submitting to webhook", err);
      }
    } else {
      console.warn("GOOGLE_SHEET_WEBHOOK_URL not configured. Simulating submission.");
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setIsSuccess(true);
  };

  if (isSuccess) {
    return <TicketScreen data={formData} />;
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1EventFees nextStep={nextStep} updateFormData={updateFormData} />;
      case 2:
        return <Step2BasicInfo nextStep={nextStep} prevStep={prevStep} data={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step3ParticipantDetails nextStep={nextStep} prevStep={prevStep} data={formData} updateFormData={updateFormData} />;
      case 4:
        return <Step4Instructions nextStep={nextStep} prevStep={prevStep} data={formData} updateFormData={updateFormData} submitForm={submitForm} />;
      case 5:
        return <Step5Payment submitForm={submitForm} prevStep={prevStep} data={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;
  const stepArray = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className="registration-container container">
      <h1 className="text-center glow-text-gold mb-4 mt-4">Event Registration</h1>
      
      {/* Progress Indicator */}
      <div className="progress-wrapper">
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="progress-steps">
          {stepArray.map(s => (
            <div key={s} className={`progress-step ${step > s ? 'active' : ''} ${step === s ? 'current' : ''}`}>
              {s}
            </div>
          ))}
        </div>
      </div>

      <div className="form-card card" style={{ overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Registration;
