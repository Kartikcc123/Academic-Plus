import { useState } from 'react';
import Navbar from '../components/Navbar';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { openAdmissionModal } from '../redux/uiSlice';
import { FaHeartbeat, FaMicroscope, FaPills, FaUserMd, FaGlobe, FaClock, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

export default function Courses() {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState('All');

  // The Academic Plus Course Database
  const coursesData = [
    {
      id: 1,
      title: "B.Sc. Nursing",
      category: "Nursing",
      duration: "4 Years",
      eligibility: "12th Science (PCB)",
      description: "A comprehensive degree program preparing students for critical care, hospital management, and advanced clinical nursing globally.",
      icon: <FaHeartbeat />,
      color: "#3b82f6" // Blue
    },
    {
      id: 2,
      title: "General Nursing and Midwifery (GNM)",
      category: "Nursing",
      duration: "3 Years",
      eligibility: "12th Any Stream",
      description: "A diploma program focusing on general healthcare, midwifery, and ward management to quickly start your clinical career.",
      icon: <FaHeartbeat />,
      color: "#3b82f6"
    },
    {
      id: 3,
      title: "Diploma in Medical Lab Technology (DMLT)",
      category: "Paramedical",
      duration: "2 Years",
      eligibility: "12th Science",
      description: "Master the technology behind diagnostic testing, pathology, and laboratory management—a highly demanded hospital role.",
      icon: <FaMicroscope />,
      color: "#10b981" // Green
    },
    {
      id: 4,
      title: "Diploma in Radiation Technology (DRT)",
      category: "Paramedical",
      duration: "2 Years",
      eligibility: "12th Science",
      description: "Become an expert in X-Ray, MRI, and CT scan operations. Direct placements in top-tier radiology departments.",
      icon: <FaMicroscope />,
      color: "#10b981"
    },
    {
      id: 5,
      title: "Bachelor of Pharmacy (B.Pharm)",
      category: "Pharmacy",
      duration: "4 Years",
      eligibility: "12th Science (PCB/PCM)",
      description: "Dive into pharmaceutical sciences, drug manufacturing, and clinical pharmacy. Get full support for securing your Drug License.",
      icon: <FaPills />,
      color: "#8b5cf6" // Purple
    },
    {
      id: 6,
      title: "MBBS / BDS Direct Admission Support",
      category: "Medical",
      duration: "5.5 Years",
      eligibility: "12th PCB + NEET",
      description: "Expert counseling and direct admission guidance for top medical colleges in India and abroad. We handle the paperwork, you focus on studying.",
      icon: <FaUserMd />,
      color: "#dc2626" // Red
    },
    {
      id: 7,
      title: "FMCGE / NEXT Exam Preparation",
      category: "Medical",
      duration: "1 Year Crash Course",
      eligibility: "Foreign Medical Graduates",
      description: "Specialized, high-yield coaching by Dr. Ajay Amera to help foreign medical graduates clear their Indian licensing exams on the first attempt.",
      icon: <FaGlobe />,
      color: "#f59e0b" // Orange
    }
  ];

  // Filtering Logic
  const categories = ['All', 'Nursing', 'Paramedical', 'Pharmacy', 'Medical'];
  const filteredCourses = activeFilter === 'All' 
    ? coursesData 
    : coursesData.filter(course => course.category === activeFilter);

  // Animation Configurations
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
  };

  return (
    <div style={{ backgroundColor: '#fcfcfc', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      <Navbar />

      {/* 1. HERO SECTION */}
      <section style={{ background: 'linear-gradient(135deg, #1a365d 0%, #0f172a 100%)', color: 'white', padding: '100px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} style={{ position: 'relative', zIndex: 2, maxWidth: '800px', margin: '0 auto' }}>
          <motion.h1 variants={fadeInUp} style={{ fontSize: '48px', margin: '0 0 20px 0', fontWeight: '900', letterSpacing: '-1px' }}>
            Our Academic <span style={{ color: '#facc15' }}>Programs</span>
          </motion.h1>
          <motion.p variants={fadeInUp} style={{ fontSize: '18px', color: '#cbd5e1', lineHeight: '1.8' }}>
            From diplomas to advanced degrees, discover the perfect pathway to launch your highly-paid career in the healthcare sector.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. DYNAMIC FILTER TABS */}
      <section style={{ maxWidth: '1200px', margin: '40px auto 20px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              style={{
                padding: '10px 25px',
                borderRadius: '30px',
                fontWeight: 'bold',
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: activeFilter === category ? 'none' : '2px solid #e2e8f0',
                backgroundColor: activeFilter === category ? '#1a365d' : 'transparent',
                color: activeFilter === category ? '#facc15' : '#64748b',
                boxShadow: activeFilter === category ? '0 10px 20px rgba(26, 54, 93, 0.2)' : 'none'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* 3. COURSE GRID (With AnimatePresence for smooth filtering) */}
      <section style={{ maxWidth: '1200px', margin: '40px auto 100px auto', padding: '0 20px' }}>
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px' }}>
          <AnimatePresence>
            {filteredCourses.map((course) => (
              <motion.div 
                key={course.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                style={{ backgroundColor: 'white', borderRadius: '15px', padding: '40px 30px', boxShadow: '0 10px 25px rgba(0,0,0,0.03)', borderTop: `6px solid ${course.color}`, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                {/* Watermark Icon */}
                <div style={{ position: 'absolute', right: '-20px', top: '20px', fontSize: '120px', color: '#f8fafc', zIndex: 0, transform: 'rotate(15deg)' }}>
                  {course.icon}
                </div>

                <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ width: '60px', height: '60px', backgroundColor: `${course.color}15`, color: course.color, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                      {course.icon}
                    </div>
                    <span style={{ backgroundColor: '#f1f5f9', color: '#475569', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {course.category}
                    </span>
                  </div>

                  <h3 style={{ color: '#1a365d', fontSize: '24px', margin: '0 0 15px 0', fontWeight: '900' }}>{course.title}</h3>
                  <p style={{ color: '#64748b', lineHeight: '1.7', fontSize: '15px', marginBottom: '25px' }}>{course.description}</p>
                </div>

                {/* Course Metadata */}
                <div style={{ position: 'relative', zIndex: 1, backgroundColor: '#f8fafc', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#1a365d', fontSize: '14px', fontWeight: 'bold' }}>
                    <FaClock style={{ color: course.color }} /> Duration: {course.duration}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1a365d', fontSize: '14px', fontWeight: 'bold' }}>
                    <FaCheckCircle style={{ color: course.color }} /> Eligibility: {course.eligibility}
                  </div>
                </div>

                {/* Redux Modal Trigger Button */}
                <button 
                  onClick={() => dispatch(openAdmissionModal())} 
                  style={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent', color: course.color, padding: '12px', border: `2px solid ${course.color}`, borderRadius: '8px', fontWeight: '900', fontSize: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = course.color; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = course.color; }}
                >
                  Apply For Program <FaArrowRight />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 4. BOTTOM CTA SECTION */}
      <section style={{ backgroundColor: '#1a365d', padding: '60px 20px', textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ color: 'white', fontSize: '32px', margin: '0 0 15px 0', fontWeight: '900' }}>Confused about which path to choose?</h2>
          <p style={{ color: '#cbd5e1', fontSize: '18px', marginBottom: '30px' }}>
            Our expert counselors, led by Dr. Ajay Amera, are here to guide you toward the perfect medical career.
          </p>
          <button 
            onClick={() => dispatch(openAdmissionModal())} 
            style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '15px 35px', border: 'none', borderRadius: '30px', fontWeight: '900', fontSize: '16px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(250, 204, 21, 0.2)' }}
          >
            Request Free Counseling
          </button>
        </motion.div>
      </section>
    </div>
  );
}
