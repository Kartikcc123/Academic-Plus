import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeAdmissionModal } from '../redux/uiSlice';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

export default function AdmissionModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isAdmissionModalOpen);

  // Form State
  const [formData, setFormData] = useState({ name: '', phone: '', course: '' });
  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: false });

    try {
      // Send data to the new API route we just built!
      await axios.post('/api/inquiries', formData);
      
      setStatus({ loading: false, error: '', success: true });
      
      // Clear form and close modal after 2 seconds
      setTimeout(() => {
        setFormData({ name: '', phone: '', course: '' });
        setStatus({ loading: false, error: '', success: false });
        dispatch(closeAdmissionModal());
      }, 2000);

    } catch (err) {
      setStatus({ 
        loading: false, 
        error: err.response?.data?.message || 'Failed to submit. Please try again.', 
        success: false 
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}
        >
          <motion.div 
            initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
            style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', width: '90%', maxWidth: '500px', position: 'relative' }}
          >
            <button onClick={() => dispatch(closeAdmissionModal())} style={{ position: 'absolute', top: '15px', right: '20px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#dc2626' }}>✖</button>
            
            <h2 style={{ color: '#1a365d', marginTop: 0 }}>Book Your Seat</h2>
            <p style={{ color: '#666' }}>Admission Open 2025-2026. Fill out this form and our counseling team will contact you shortly.</p>
            
            {status.success ? (
              <div style={{ backgroundColor: '#dcfce3', color: '#166534', padding: '15px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                🎉 Inquiry Submitted Successfully! We will call you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                {status.error && <div style={{ color: '#dc2626', fontSize: '14px' }}>{status.error}</div>}

                <input 
                  type="text" 
                  placeholder="Student Full Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '5px' }} 
                />
                
                <input 
                  type="tel" 
                  placeholder="Mobile Number (10 digits)" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '5px' }} 
                />
                
                <select 
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  required
                  style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '5px' }}
                >
                  <option value="" disabled>Select Course Interest</option>
                  <option value="Nursing (BSC/MSC/GNM)">Nursing (BSC/MSC/GNM)</option>
                  <option value="Paramedical (DMLT/DRT)">Paramedical (DMLT/DRT)</option>
                  <option value="Higher Courses (MBBS/BDS/BAMS)">Higher Courses (MBBS/BDS/BAMS)</option>
                  <option value="Pharmacy (B.Pharm/D.Pharm)">Pharmacy (B.Pharm/D.Pharm)</option>
                  <option value="Other / Need Counseling">Other / Need Counseling</option>
                </select>
                
                <button 
                  type="submit" 
                  disabled={status.loading}
                  style={{ backgroundColor: '#1a365d', color: '#facc15', padding: '15px', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: status.loading ? 'not-allowed' : 'pointer', fontSize: '16px' }}
                >
                  {status.loading ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
