import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { openAdmissionModal } from '../redux/uiSlice';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaAngleRight } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

export default function Footer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useContext(AuthContext);

  const handleDirectorAccess = () => {
    if (admin) {
      navigate('/admin/panel');
      return;
    }

    const code = window.prompt('Enter Director Access Code');
    if (code === 'ACADEMIC2026') {
      navigate('/admin');
      return;
    }

    if (code !== null) {
      window.alert('Invalid access code');
    }
  };

  return (
    <footer style={{ backgroundColor: '#0f172a', color: '#cbd5e1', paddingTop: '80px', fontFamily: 'sans-serif', borderTop: '5px solid #facc15' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '50px', borderBottom: '1px solid #334155', paddingBottom: '60px' }}>
        
        {/* Column 1: Brand & About */}
        <div>
          <h2 style={{ color: '#facc15', fontSize: '28px', margin: '0 0 5px 0', fontWeight: '900', letterSpacing: '-0.5px' }}>ACADEMIC PLUS</h2>
          <p style={{ color: '#94a3b8', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 20px 0', fontWeight: 'bold' }}>Under Tanishika Seva Sansthan</p>
          <p style={{ lineHeight: '1.7', fontSize: '15px', marginBottom: '25px' }}>
            Rajasthan's premier institute for Nursing, Paramedical, and Pharmacy. We build healthcare leaders with a 100% placement guarantee.
          </p>
          
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '15px' }}>
            {[<FaFacebookF />, <FaInstagram />, <FaTwitter />, <FaYoutube />].map((icon, i) => (
              <motion.a 
                key={i} href="#" 
                whileHover={{ y: -5, backgroundColor: '#facc15', color: '#0f172a' }}
                style={{ width: '40px', height: '40px', backgroundColor: '#1e293b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', fontSize: '18px', transition: 'background-color 0.3s' }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '25px', position: 'relative', paddingBottom: '10px' }}>
            Quick Links
            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '3px', backgroundColor: '#facc15' }}></span>
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about' },
              { name: 'Success Stories', path: '/success-stories' },
              { name: 'Contact Us', path: '/contact' },
              { name: 'Student Login', path: '/login' }
            ].map((link, i) => (
              <li key={i}>
                <Link to={link.path} className="footer-link" style={{ textDecoration: 'none', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', transition: '0.3s' }}>
                  <FaAngleRight style={{ color: '#facc15', fontSize: '12px' }} /> {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Top Programs */}
        <div>
          <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '25px', position: 'relative', paddingBottom: '10px' }}>
            Top Programs
            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '3px', backgroundColor: '#facc15' }}></span>
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              'BSc Nursing & GNM',
              'Paramedical (DMLT / DRT)',
              'Pharmacy (B.Pharm)',
              'MBBS / BDS Preparation',
              'FMCGE Licensing Exam'
            ].map((course, i) => (
              <li key={i}>
                <Link to="/courses" className="footer-link" style={{ textDecoration: 'none', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', transition: '0.3s' }}>
                  <FaAngleRight style={{ color: '#facc15', fontSize: '12px' }} /> {course}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Info & CTA */}
        <div>
          <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '25px', position: 'relative', paddingBottom: '10px' }}>
            Get in Touch
            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '40px', height: '3px', backgroundColor: '#facc15' }}></span>
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
              <FaMapMarkerAlt style={{ color: '#facc15', fontSize: '20px', marginTop: '4px' }} />
              <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6' }}>5-R-40, RC Vyas Colony,<br/>Near Mother Terassa School,<br/>Bhilwara (Raj.)</p>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <FaPhoneAlt style={{ color: '#facc15', fontSize: '18px' }} />
              <p style={{ margin: 0, fontSize: '15px' }}>+91 9413669776<br/>+91 9782975957</p>
            </div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <FaEnvelope style={{ color: '#facc15', fontSize: '18px' }} />
              <p style={{ margin: 0, fontSize: '15px' }}>jay001amera@gmail.com</p>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(openAdmissionModal())} 
            style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '12px 20px', border: 'none', borderRadius: '5px', fontWeight: '900', fontSize: '15px', cursor: 'pointer', width: '100%', marginTop: '25px', textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            Apply Online Now
          </motion.button>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div style={{ backgroundColor: '#020617', padding: '25px 20px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Academic Plus Institute. All Rights Reserved.</p>
          <button
            onClick={handleDirectorAccess}
            style={{ background: 'transparent', border: '1px solid #334155', color: '#94a3b8', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', letterSpacing: '0.5px' }}
          >
            Director Access
          </button>
          <p style={{ margin: 0 }}>
            Designed & Developed by <a href="#" style={{ color: '#facc15', textDecoration: 'none', fontWeight: 'bold' }}>NextGenzSolutions</a>
          </p>
        </div>
      </div>

      {/* Footer Custom CSS */}
      <style>{`
        .footer-link:hover {
          color: white !important;
          transform: translateX(8px);
        }
        @media (max-width: 768px) {
          .footer-link { padding: 5px 0; }
        }
      `}</style>
    </footer>
  );
}
