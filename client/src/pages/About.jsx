import Navbar from '../components/Navbar';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaGraduationCap, FaHospitalUser, FaAward, FaRegBuilding, FaBullseye, FaEye, FaShieldAlt, FaUserMd, FaGlobe } from 'react-icons/fa';

export default function About() {
  // Advanced Animation Configurations
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const timelineData = [
    {
      year: "2015",
      title: "The Foundation",
      description: "Academic Plus was established under Tanishika Seva Sansthan with a vision to provide quality medical education, starting with a modest batch of just 50 students.",
      icon: <FaRegBuilding />
    },
    {
      year: "2018",
      title: "Paramedical Expansion",
      description: "Recognized by state boards, the campus expanded to include state-of-the-art science laboratories and specialized courses like DMLT and DRT.",
      icon: <FaHospitalUser />
    },
    {
      year: "2021",
      title: "Nursing & Higher Education",
      description: "Achieved affiliation for advanced courses including BSc Nursing, Pharmacy, and comprehensive preparation for MBBS and BDS programs.",
      icon: <FaGraduationCap />
    },
    {
      year: "2025",
      title: "Global Excellence & FMCGE",
      description: "Celebrating a decade of excellence with a 100% placement track record and launching dedicated international medical licensing programs.",
      icon: <FaGlobe />
    }
  ];

  return (
    <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      <Navbar />

      {/* 1. MESSAGE FROM THE DIRECTOR */}
      <section style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 20px' }}>
        <div className="director-section" style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
          
          {/* Left Column: Image with Offset Shadow & Float */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ type: "spring", stiffness: 40 }}
            whileHover={{ scale: 1.02 }}
            style={{ flex: '1 1 400px', position: 'relative', paddingRight: '20px', paddingBottom: '20px', cursor: 'pointer' }}
          >
            <div style={{ position: 'absolute', top: '20px', left: '20px', right: 0, bottom: 0, backgroundColor: '#facc15', borderRadius: '8px', zIndex: 0, transition: '0.3s' }} className="gold-bg"></div>
            <img 
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80" 
              alt="Dr. Ajay Singh Amera" 
              style={{ position: 'relative', zIndex: 1, width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 15px 30px rgba(0,0,0,0.15)', display: 'block' }} 
            />
          </motion.div>

          {/* Right Column: The Quote and Message */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ type: "spring", stiffness: 40, delay: 0.2 }}
            style={{ flex: '1 1 500px' }}
          >
            <FaQuoteLeft style={{ color: '#facc15', fontSize: '45px', opacity: 0.3, marginBottom: '-10px' }} />
            <h2 style={{ color: '#1a365d', fontSize: '40px', marginTop: 0, marginBottom: '20px', fontWeight: '900', letterSpacing: '-1px' }}>Message from the Director</h2>
            
            <p style={{ fontSize: '20px', color: '#1a365d', fontStyle: 'italic', fontWeight: 'bold', lineHeight: '1.6', marginBottom: '20px', borderLeft: '4px solid #facc15', paddingLeft: '20px' }}>
              "We don't just teach the syllabus; we architect careers. Our mission is to nurture young minds into globally recognized healthcare leaders."
            </p>
            
            <p style={{ color: '#64748b', lineHeight: '1.8', marginBottom: '30px', fontSize: '16px' }}>
              We provide an environment where every student is encouraged to discover their unique potential. With our state-of-the-art facilities, dedicated faculty, and a curriculum aligned with global medical standards, we ensure that our students are perfectly prepared for the challenges of tomorrow—guaranteeing 100% placement and lifelong career support.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              <div>
                <h3 style={{ color: '#1a365d', margin: '0 0 5px 0', fontSize: '22px', fontWeight: '800' }}>Dr. Ajay Singh Amera</h3>
                <p style={{ color: '#facc15', fontWeight: 'bold', margin: '0 0 5px 0', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Founder & Director</p>
              </div>
              {/* Handwritten Signature Illusion */}
              <div style={{ fontFamily: "'Brush Script MT', cursive", fontSize: '32px', color: '#1a365d', opacity: 0.8, transform: 'rotate(-5deg)' }}>
                Ajay Amera
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. LIVE STATISTICS BANNER */}
      <section style={{ backgroundColor: '#1a365d', padding: '50px 20px', marginTop: '60px' }}>
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '30px', textAlign: 'center', color: 'white' }}
        >
          <motion.div variants={fadeInUp}>
            <FaUserMd style={{ fontSize: '40px', color: '#facc15', marginBottom: '10px', margin: '0 auto' }} />
            <h3 style={{ fontSize: '40px', margin: '10px 0 0 0', fontWeight: '900' }}>5,000+</h3>
            <p style={{ margin: 0, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px' }}>Alumni Placed</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <FaAward style={{ fontSize: '40px', color: '#facc15', marginBottom: '10px', margin: '0 auto' }} />
            <h3 style={{ fontSize: '40px', margin: '10px 0 0 0', fontWeight: '900' }}>10+</h3>
            <p style={{ margin: 0, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px' }}>Years of Excellence</p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <FaHospitalUser style={{ fontSize: '40px', color: '#facc15', marginBottom: '10px', margin: '0 auto' }} />
            <h3 style={{ fontSize: '40px', margin: '10px 0 0 0', fontWeight: '900' }}>100%</h3>
            <p style={{ margin: 0, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '14px' }}>Job Assistance</p>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. OUR LEGACY (The Vertical Timeline with Pulse Effect) */}
      <section style={{ backgroundColor: '#f8fafc', padding: '100px 20px', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{ color: '#facc15', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>History & Milestones</span>
          <h2 style={{ color: '#1a365d', fontSize: '40px', margin: '10px 0', fontWeight: '900' }}>Our Legacy</h2>
        </div>

        <div className="timeline-container" style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Center Vertical Line */}
          <div className="timeline-line" style={{ position: 'absolute', left: '50%', top: '0', bottom: '0', width: '4px', backgroundColor: '#e2e8f0', transform: 'translateX(-50%)', borderRadius: '2px' }}></div>

          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`timeline-item ${isEven ? 'left' : 'right'}`} style={{ display: 'flex', justifyContent: isEven ? 'flex-start' : 'flex-end', paddingBottom: '60px', position: 'relative', width: '100%' }}>
                
                {/* The Center Icon Circle with Pulse Animation */}
                <div className="timeline-icon" style={{ position: 'absolute', left: '50%', top: '20px', width: '45px', height: '45px', backgroundColor: '#1a365d', color: '#facc15', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translateX(-50%)', zIndex: 10, border: '5px solid #f8fafc', boxShadow: '0 0 0 4px rgba(250, 204, 21, 0.2)' }}>
                  {item.icon}
                  {/* CSS Pulse Ring */}
                  <div className="pulse-ring" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px solid #facc15', animation: 'pulse 2s infinite' }}></div>
                </div>

                {/* The Content Card with Hover Lift */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true, amount: 0.5 }} 
                  transition={{ type: "spring", stiffness: 50 }}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                  className="timeline-content"
                  style={{ width: '45%', backgroundColor: 'white', padding: '35px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.04)', borderBottom: '5px solid #facc15', textAlign: isEven ? 'right' : 'left', cursor: 'default' }}
                >
                  <span style={{ color: '#facc15', fontWeight: '900', fontSize: '20px', display: 'block', marginBottom: '10px' }}>{item.year}</span>
                  <h3 style={{ color: '#1a365d', margin: '0 0 15px 0', fontSize: '24px', fontWeight: '800' }}>{item.title}</h3>
                  <p style={{ color: '#64748b', margin: 0, lineHeight: '1.7', fontSize: '16px' }}>{item.description}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. MISSION, VISION & CORE VALUES (Interactive Grid) */}
      <section style={{ maxWidth: '1200px', margin: '100px auto', padding: '0 20px' }}>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}
        >
          
          {[
            { title: "Our Mission", icon: <FaBullseye />, desc: "To provide a dynamic educational environment that fosters intellectual, social, and emotional growth, empowering students to reach their highest potential in the medical sector." },
            { title: "Our Vision", icon: <FaEye />, desc: "To be a premier educational institution recognized globally for excellence, innovation, and the holistic development of future healthcare leaders." },
            { title: "Core Values", icon: <FaShieldAlt />, desc: "Integrity, Excellence, Respect, and Empathy. We build character alongside academics to shape well-rounded, highly ethical medical professionals." }
          ].map((card, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp} 
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ backgroundColor: 'white', padding: '50px 40px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderBottom: '5px solid #1a365d', textAlign: 'center', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
            >
              {/* Subtle background icon for depth */}
              <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '150px', color: '#f8fafc', zIndex: 0 }}>
                {card.icon}
              </div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px auto' }}>
                  <div style={{ fontSize: '35px', color: '#d97706' }}>{card.icon}</div>
                </div>
                <h3 style={{ color: '#1a365d', fontSize: '26px', marginTop: 0, fontWeight: '900' }}>{card.title}</h3>
                <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '16px', margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}

        </motion.div>
      </section>

      {/* Advanced CSS for Interactivity and Mobile Support */}
      <style>{`
        /* Pulse Animation for Timeline */
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        /* Image Hover Effect */
        .director-section > div:hover .gold-bg {
          transform: translate(10px, 10px);
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .director-section { flex-direction: column; text-align: center; }
          .director-section > div { padding: 0 !important; }
          .director-section h2 { font-size: 32px !important; }
          
          /* Timeline Mobile Layout */
          .timeline-line { left: 30px !important; transform: none !important; }
          .timeline-item { justify-content: flex-end !important; padding-bottom: 40px !important; }
          .timeline-icon { left: 30px !important; transform: translateX(-50%) !important; }
          .timeline-content { width: calc(100% - 80px) !important; text-align: left !important; }
        }
      `}</style>
    </div>
  );
}
