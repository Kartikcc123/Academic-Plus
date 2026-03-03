import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openAdmissionModal } from '../redux/uiSlice';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import NewsTicker from '../components/NewsTicker';
import { FaUserMd, FaAward, FaHospitalSymbol, FaArrowRight, FaGraduationCap, FaStethoscope, FaPills } from 'react-icons/fa';

export default function Home() {
  const dispatch = useDispatch();

  // Advanced Animation Configurations
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      <Navbar />

      {/* 1. PREMIUM SPLIT HERO SECTION */}
      <section style={{ background: 'linear-gradient(135deg, #1a365d 0%, #0f172a 100%)', color: 'white', padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
        
        {/* Abstract Background Shapes */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(250, 204, 21, 0.1) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', zIndex: 0 }}></div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '50px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          
          {/* Left Text Content */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ flex: '1 1 500px' }}>
            <motion.span variants={fadeInUp} style={{ backgroundColor: 'rgba(250, 204, 21, 0.15)', color: '#facc15', padding: '8px 16px', borderRadius: '30px', fontSize: '14px', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-block', marginBottom: '20px', border: '1px solid rgba(250, 204, 21, 0.3)' }}>
              Admissions Open 2025-2026
            </motion.span>
            
            <motion.h1 variants={fadeInUp} style={{ fontSize: '55px', margin: '0 0 20px 0', fontWeight: '900', letterSpacing: '-1.5px', lineHeight: '1.1' }}>
              Your Career In <span style={{ color: '#facc15' }}>Healthcare</span> Starts Here.
            </motion.h1>
            
            <motion.p variants={fadeInUp} style={{ fontSize: '20px', color: '#cbd5e1', lineHeight: '1.7', marginBottom: '40px', maxWidth: '550px' }}>
              Rajasthan's premier institute for Nursing, Paramedical, and Pharmacy. Zero NEET requirement. 100% Guaranteed Placements.
            </motion.p>
            
            <motion.div variants={fadeInUp} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(250, 204, 21, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch(openAdmissionModal())} 
                style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '16px 35px', border: 'none', borderRadius: '8px', fontWeight: '900', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                Book Your Seat <FaArrowRight />
              </motion.button>
              
              <Link to="/courses" style={{ textDecoration: 'none' }}>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{ backgroundColor: 'transparent', color: 'white', padding: '16px 35px', border: '2px solid rgba(255, 255, 255, 0.3)', borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  Explore Programs
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Floating Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 40, delay: 0.3 }}
            style={{ flex: '1 1 400px', position: 'relative' }}
          >
            {/* The Gold Offset Square */}
            <div style={{ position: 'absolute', top: '25px', right: '-25px', width: '100%', height: '100%', backgroundColor: '#facc15', borderRadius: '15px', zIndex: 0 }}></div>
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&w=800&q=80" 
              alt="Medical Students Learning" 
              style={{ position: 'relative', zIndex: 1, width: '100%', height: 'auto', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', display: 'block' }} 
            />
          </motion.div>

        </div>
      </section>

      {/* 2. LIVE NEWS TICKER (Injected seamlessly) */}
      <NewsTicker />

      {/* 3. WHY CHOOSE US (Watermark Cards) */}
      <section style={{ maxWidth: '1200px', margin: '100px auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: '#dc2626', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>The Academic Plus Advantage</span>
          <h2 style={{ color: '#1a365d', fontSize: '40px', margin: '10px 0', fontWeight: '900' }}>Why Choose Us?</h2>
        </div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}
        >
          {[
            { title: "Direct Admissions", icon: <FaGraduationCap />, desc: "No NEET required. We provide direct entry into premium medical, nursing, and paramedical courses based on your 12th-grade merit.", color: "#3b82f6" },
            { title: "100% Job Guarantee", icon: <FaAward />, desc: "Our massive hospital network ensures that every student who graduates receives a guaranteed placement letter in their field.", color: "#10b981" },
            { title: "Clinical Practice", icon: <FaHospitalSymbol />, desc: "Don't just read books. Gain hands-on, real-world clinical experience in our affiliated top-tier multispecialty hospitals.", color: "#dc2626" }
          ].map((card, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp} 
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', borderBottom: `5px solid ${card.color}`, position: 'relative', overflow: 'hidden', cursor: 'default' }}
            >
              {/* Background Watermark Icon */}
              <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '150px', color: '#f8fafc', zIndex: 0, transform: 'rotate(-10deg)' }}>
                {card.icon}
              </div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ width: '70px', height: '70px', backgroundColor: `${card.color}15`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                  <div style={{ fontSize: '30px', color: card.color }}>{card.icon}</div>
                </div>
                <h3 style={{ color: '#1a365d', fontSize: '24px', marginTop: 0, fontWeight: '900' }}>{card.title}</h3>
                <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '16px', margin: 0 }}>
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. PREMIUM PROGRAMS PREVIEW */}
      <section style={{ backgroundColor: '#f8fafc', padding: '100px 20px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <h2 style={{ color: '#1a365d', fontSize: '40px', margin: '0 0 10px 0', fontWeight: '900' }}>Explore Our Programs</h2>
              <p style={{ color: '#64748b', fontSize: '18px', margin: 0 }}>Specialized courses designed for global medical standards.</p>
            </div>
            <Link to="/courses" style={{ textDecoration: 'none' }}>
              <motion.button 
                whileHover={{ x: 5 }}
                style={{ backgroundColor: 'transparent', color: '#2563eb', border: 'none', fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: 0 }}
              >
                View All Courses <FaArrowRight />
              </motion.button>
            </Link>
          </div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}
          >
            {[
              { title: "BSc & GNM Nursing", icon: <FaUserMd />, duration: "3-4 Years", color: "#3b82f6" },
              { title: "Paramedical (DMLT/DRT)", icon: <FaStethoscope />, duration: "2 Years Diploma", color: "#10b981" },
              { title: "Pharmacy (B.Pharm)", icon: <FaPills />, duration: "4 Years Degree", color: "#8b5cf6" }
            ].map((course, i) => (
              <motion.div 
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                className="course-card"
                style={{ backgroundColor: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
              >
                <div style={{ width: '60px', height: '60px', backgroundColor: course.color, color: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '20px' }}>
                  {course.icon}
                </div>
                <span style={{ backgroundColor: '#f1f5f9', color: '#64748b', padding: '5px 10px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold' }}>{course.duration}</span>
                <h3 style={{ color: '#1a365d', fontSize: '22px', margin: '15px 0', fontWeight: '800' }}>{course.title}</h3>
                
                {/* Animated Arrow on Hover */}
                <div className="card-arrow" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: course.color, fontWeight: 'bold', marginTop: '20px', transition: '0.3s' }}>
                  Learn More <FaArrowRight />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section style={{ backgroundColor: '#1a365d', padding: '80px 20px', textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: '#facc15', fontSize: '36px', margin: '0 0 20px 0', fontWeight: '900' }}>Secure Your Future Today</h2>
          <p style={{ color: '#cbd5e1', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' }}>
            Seats for the 2025-2026 academic batch are filling fast. Don't let entrance exams hold you back from your dream medical career.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(250, 204, 21, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(openAdmissionModal())} 
            style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '18px 40px', border: 'none', borderRadius: '30px', fontWeight: '900', fontSize: '18px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            Apply Online Now <FaArrowRight />
          </motion.button>
        </motion.div>
      </section>

      {/* ADVANCED CSS FOR HOVER EFFECTS */}
      <style>{`
        /* Course Card Hover Animation */
        .course-card .card-arrow {
          transform: translateX(0);
        }
        .course-card:hover .card-arrow {
          transform: translateX(10px);
        }
        
        @media (max-width: 768px) {
          h1 { font-size: 40px !important; }
        }
      `}</style>

    </div>
  );
}
