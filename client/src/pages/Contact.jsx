import { useState } from 'react';
import Navbar from '../components/Navbar';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaHeadset } from 'react-icons/fa';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', course: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: false });

  // Advanced Animation Configurations (Matching the About Page)
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });
    try {
      await axios.post('/api/inquiries', formData);
      setStatus({ loading: false, success: true, error: false });
      setFormData({ name: '', phone: '', course: '' });
      // Reset success message after 4 seconds
      setTimeout(() => setStatus({ loading: false, success: false, error: false }), 4000);
    } catch {
      setStatus({ loading: false, success: false, error: true });
    }
  };

  return (
    <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      <Navbar />

      {/* 1. PREMIUM HERO SECTION */}
      <section style={{ background: 'linear-gradient(135deg, #1a365d 0%, #0f172a 100%)', color: 'white', padding: '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <motion.span variants={fadeInUp} style={{ backgroundColor: 'rgba(250, 204, 21, 0.2)', color: '#facc15', padding: '8px 16px', borderRadius: '30px', fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
            We Are Here To Help
          </motion.span>
          <motion.h1 variants={fadeInUp} style={{ fontSize: '48px', margin: '20px 0', fontWeight: '900', letterSpacing: '-1px' }}>
            Get In <span style={{ color: '#facc15' }}>Touch</span>
          </motion.h1>
          <motion.p variants={fadeInUp} style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: '1.8' }}>
            Have questions about admissions, FMCGE prep, or guaranteed placements? Reach out to our expert counselors today.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. INTERACTIVE CONTACT CARDS (Watermark Style) */}
      <section style={{ maxWidth: '1200px', margin: '-50px auto 60px auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}
        >
          
          {[
            { title: "Campus Address", info: "5-R-40, RC Vyas, Near Mother Terassa School, Bhilwara (Raj.)", icon: <FaMapMarkerAlt />, color: "#dc2626" },
            { title: "Direct Lines", info: "Dr. Ajay: +91 9413669776\nDr. Chander: +91 9782975957", icon: <FaPhoneAlt />, color: "#10b981" },
            { title: "Email Desk", info: "jay001amera@gmail.com\nResponse within 24 hours", icon: <FaEnvelope />, color: "#3b82f6" }
          ].map((card, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp} 
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', borderBottom: `5px solid ${card.color}`, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Background Watermark Icon */}
              <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '140px', color: '#f8fafc', zIndex: 0, transform: 'rotate(-10deg)' }}>
                {card.icon}
              </div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: '60px', height: '60px', backgroundColor: `${card.color}15`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <div style={{ fontSize: '24px', color: card.color }}>{card.icon}</div>
                </div>
                <h3 style={{ color: '#1a365d', fontSize: '24px', marginTop: 0, fontWeight: '900' }}>{card.title}</h3>
                <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '16px', margin: 0, whiteSpace: 'pre-line' }}>
                  {card.info}
                </p>
              </div>
            </motion.div>
          ))}

        </motion.div>
      </section>

      {/* 3. FORM & MAP SECTION */}
      <section style={{ maxWidth: '1200px', margin: '100px auto', padding: '0 20px' }}>
        <div className="contact-bottom-section" style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
          
          {/* Left: Interactive Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 40 }}
            style={{ flex: '1 1 500px', backgroundColor: 'white', padding: '50px', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.08)', borderTop: '6px solid #1a365d' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
              <FaHeadset style={{ fontSize: '30px', color: '#facc15' }} />
              <h2 style={{ color: '#1a365d', fontSize: '32px', margin: 0, fontWeight: '900' }}>Request a Callback</h2>
            </div>
            <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '16px' }}>Fill out your details below and our admission cell will contact you immediately.</p>
            
            {status.success ? (
               <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ backgroundColor: '#dcfce3', color: '#166534', padding: '20px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', borderLeft: '5px solid #166534' }}>
                 🎉 Inquiry sent successfully! We will call you soon.
               </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {status.error && <div style={{ color: '#dc2626', fontSize: '14px', fontWeight: 'bold' }}>Error submitting form. Please try again.</div>}

                <div>
                  <label style={{ display: 'block', color: '#1a365d', fontWeight: 'bold', marginBottom: '8px' }}>Full Name</label>
                  <input type="text" placeholder="e.g. Rahul Sharma" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="modern-input" />
                </div>
                
                <div>
                  <label style={{ display: 'block', color: '#1a365d', fontWeight: 'bold', marginBottom: '8px' }}>Mobile Number</label>
                  <input type="tel" placeholder="+91" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required className="modern-input" />
                </div>

                <div>
                  <label style={{ display: 'block', color: '#1a365d', fontWeight: 'bold', marginBottom: '8px' }}>Course of Interest</label>
                  <select value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} required className="modern-input">
                    <option value="" disabled>Select a Course</option>
                    <option value="Nursing (BSC/MSC/GNM)">Nursing (BSC/MSC/GNM)</option>
                    <option value="Paramedical (DMLT/DRT)">Paramedical (DMLT/DRT)</option>
                    <option value="Higher Courses (MBBS/BDS/BAMS)">Higher Courses (MBBS/BDS/BAMS)</option>
                    <option value="Pharmacy (B.Pharm/D.Pharm)">Pharmacy (B.Pharm/D.Pharm)</option>
                    <option value="FMCGE Exam Prep">FMCGE Exam Prep</option>
                  </select>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(250, 204, 21, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={status.loading} 
                  style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '18px', border: 'none', borderRadius: '8px', fontWeight: '900', fontSize: '18px', cursor: status.loading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '10px' }}
                >
                  {status.loading ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Right: Embedded Map */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 40, delay: 0.2 }}
            style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ backgroundColor: '#1a365d', padding: '20px', borderRadius: '20px 20px 0 0', color: 'white' }}>
              <h3 style={{ margin: 0, fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><FaMapMarkerAlt style={{ color: '#facc15' }}/> Visit Our Campus</h3>
            </div>
            {/* Google Maps iFrame */}
            <div style={{ flex: 1, width: '100%', minHeight: '350px', backgroundColor: '#e2e8f0', borderRadius: '0 0 20px 20px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}>
              <iframe 
                title="Academic Plus Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.311317130635!2d74.63660000000001!3d25.352400000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968c24f5a8cb5b1%3A0x6b29d47262c5c3b1!2sR.%20C.%20Vyas%20Colony%2C%20Bhilwara%2C%20Rajasthan%20311001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Advanced CSS for Inputs & Mobile Support */}
      <style>{`
        /* Modern Input Styling */
        .modern-input {
          width: 100%;
          padding: 15px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          font-size: 16px;
          color: #1e293b;
          background-color: #f8fafc;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }
        .modern-input:focus {
          outline: none;
          border-color: #1a365d;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(26, 54, 93, 0.1);
        }
        .modern-input::placeholder {
          color: #94a3b8;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .contact-bottom-section { flex-direction: column; }
          .modern-input { padding: 12px 15px; }
        }
      `}</style>
    </div>
  );
}
