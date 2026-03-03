// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { openAdmissionModal } from '../redux/uiSlice';
import Navbar from '../components/Navbar';
import { FaAward, FaBriefcase, FaStar, FaUserMd, FaQuoteLeft, FaArrowRight, FaHospitalSymbol } from 'react-icons/fa';

export default function SuccessStories() {
  const dispatch = useDispatch();

  // The Top Performers Database
  const resultsData = [
    {
      id: 1,
      name: "Priya Sharma",
      course: "BSc Nursing",
      achievement: "Placed at Apollo Hospitals",
      quote: "Academic Plus didn't just teach me the syllabus; they prepared me for the real medical world. The 100% placement guarantee is absolutely real.",
      icon: <FaBriefcase />,
      color: "#3b82f6" // Blue
    },
    {
      id: 2,
      name: "Rahul Verma",
      course: "FMCGE Preparation",
      achievement: "Cleared on 1st Attempt",
      quote: "Dr. Amera's guidance was the game-changer for my FMCGE prep. The study materials and strategic planning made all the difference.",
      icon: <FaAward />,
      color: "#8b5cf6" // Purple
    },
    {
      id: 3,
      name: "Anita Desai",
      course: "Paramedical (DMLT)",
      achievement: "Govt. Lab Technician Role",
      quote: "The practical knowledge and license support I received here were phenomenal. I am now proudly working in the government sector.",
      icon: <FaStar />,
      color: "#10b981" // Green
    },
    {
      id: 4,
      name: "Vikram Singh",
      course: "B. Pharmacy",
      achievement: "Top Ranker & Drug License",
      quote: "The expert faculty at Academic Plus helped me not only top my university exams but also seamlessly navigate the drug license process.",
      icon: <FaUserMd />,
      color: "#dc2626" // Red
    }
  ];

  // Advanced Animation Configurations
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      <Navbar />

      {/* 1. PREMIUM HERO SECTION */}
      <section style={{ background: 'linear-gradient(135deg, #1a365d 0%, #0f172a 100%)', color: 'white', padding: '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <motion.span variants={fadeInUp} style={{ backgroundColor: 'rgba(250, 204, 21, 0.2)', color: '#facc15', padding: '8px 16px', borderRadius: '30px', fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Proven Track Record
          </motion.span>
          <motion.h1 variants={fadeInUp} style={{ fontSize: '48px', margin: '20px 0', fontWeight: '900', letterSpacing: '-1px' }}>
            Our <span style={{ color: '#facc15' }}>Success Stories</span>
          </motion.h1>
          <motion.p variants={fadeInUp} style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: '1.8' }}>
            Real students. Real results. See how we are transforming aspirations into highly successful, globally recognized medical careers.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. STATS HIGHLIGHT BANNER */}
      <section style={{ backgroundColor: '#facc15', padding: '30px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px', textAlign: 'center', color: '#1a365d' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <FaHospitalSymbol style={{ fontSize: '35px' }} />
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '28px', margin: 0, fontWeight: '900' }}>200+</h3>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>Hospital Partners</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <FaAward style={{ fontSize: '35px' }} />
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ fontSize: '28px', margin: 0, fontWeight: '900' }}>#1</h3>
              <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px' }}>In FMCGE Success</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIAL GRID (With Watermarks and Hover Lift) */}
      <section style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 20px' }}>
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}
        >
          {resultsData.map((student) => (
            <motion.div 
              key={student.id} 
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ backgroundColor: 'white', borderRadius: '15px', padding: '40px', borderTop: `6px solid ${student.color}`, boxShadow: '0 15px 35px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden', cursor: 'default' }}
            >
              {/* Background Watermark Icon */}
              <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '140px', color: '#f8fafc', zIndex: 0, transform: 'rotate(-10deg)' }}>
                {student.icon}
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Floating Quote Icon */}
                <FaQuoteLeft style={{ fontSize: '40px', color: `${student.color}20`, position: 'absolute', top: '-10px', left: '-10px', zIndex: -1 }} />
                
                <p style={{ color: '#475569', fontStyle: 'italic', lineHeight: '1.7', fontSize: '16px', marginBottom: '25px', minHeight: '100px' }}>
                  "{student.quote}"
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                  {/* Student Initials Avatar */}
                  <div style={{ width: '50px', height: '50px', backgroundColor: student.color, color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold', boxShadow: `0 4px 10px ${student.color}40` }}>
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ color: '#1a365d', fontSize: '20px', margin: '0 0 5px 0', fontWeight: '900' }}>{student.name}</h3>
                    <p style={{ color: student.color, fontWeight: 'bold', margin: 0, fontSize: '14px' }}>{student.achievement}</p>
                    <span style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{student.course}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. CALL TO ACTION SECTION */}
      <section style={{ backgroundColor: '#1a365d', padding: '80px 20px', textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: 'white', fontSize: '36px', margin: '0 0 20px 0', fontWeight: '900' }}>Ready to write your own success story?</h2>
          <p style={{ color: '#cbd5e1', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' }}>
            Join the 2025-2026 batch. With our 100% placement guarantee, your career in the healthcare sector is completely secure.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(250, 204, 21, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(openAdmissionModal())} 
            style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '18px 40px', border: 'none', borderRadius: '30px', fontWeight: '900', fontSize: '18px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
          >
            Apply For Admission <FaArrowRight />
          </motion.button>
        </motion.div>
      </section>

    </div>
  );
}
