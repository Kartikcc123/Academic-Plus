import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { openAdmissionModal } from '../redux/uiSlice';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUserGraduate, FaSignOutAlt, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
  const { user, admin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle Glassmorphic Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  // Helper function to check if a link is active
  const isActive = (path) => window.location.pathname === path;

  return (
    <>
      {/* 1. THE TOP CONTACT BAR (Hidden on mobile) */}
      <div style={{ 
        background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)', 
        color: '#cbd5e1', padding: '10px 40px', 
        display: window.innerWidth < 900 ? 'none' : 'flex', 
        justifyContent: 'space-between', alignItems: 'center', 
        fontSize: '13px', position: 'relative', zIndex: 101,
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ display: 'flex', gap: '25px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} className="topbar-hover">
            <FaPhoneAlt style={{ color: '#facc15' }} /> +91 9413669776
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} className="topbar-hover">
            <FaEnvelope style={{ color: '#facc15' }} /> jay001amera@gmail.com
          </span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaMapMarkerAlt style={{ color: '#dc2626' }} /> RC Vyas Colony, Bhilwara
          </span>
          {!user && !admin && (
            <Link to="/login" style={{ color: '#facc15', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: 'rgba(250, 204, 21, 0.1)', padding: '4px 12px', borderRadius: '20px' }}>
              <FaUserGraduate /> Student Portal
            </Link>
          )}
        </div>
      </div>

      {/* 2. THE MAIN GLASSMORPHIC NAVIGATION BAR */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 50, damping: 15 }}
        style={{ 
          position: 'sticky', top: 0, zIndex: 100,
          backgroundColor: isScrolled ? 'rgba(26, 54, 93, 0.95)' : '#1a365d',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          padding: '15px 40px', color: 'white', 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.2)' : '0 4px 20px rgba(0,0,0,0.1)',
          transition: 'all 0.4s ease'
        }}
      >
        {/* Brand Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <h1 style={{ margin: 0, fontSize: '28px', color: '#facc15', fontWeight: '900', letterSpacing: '-0.5px' }}>ACADEMIC PLUS</h1>
            <p style={{ margin: 0, fontSize: '10px', color: '#cbd5e1', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 'bold' }}>Institute of Medical Sciences</p>
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }} className="desktop-nav">
          
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About Us</Link>
          
          {/* Animated Dropdown Menu */}
          <div 
            onMouseEnter={() => setIsDropdownOpen(true)} 
            onMouseLeave={() => setIsDropdownOpen(false)}
            style={{ position: 'relative', padding: '10px 0', cursor: 'pointer' }}
          >
            <span className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Programs <FaChevronDown style={{ fontSize: '12px', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: '0.3s' }} />
            </span>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{ 
                    position: 'absolute', top: '100%', left: '-20px', backgroundColor: 'white', 
                    borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', overflow: 'hidden', minWidth: '220px', borderTop: '4px solid #facc15' 
                  }}
                >
                  <Link to="/courses" style={{ display: 'block', padding: '15px 20px', color: '#1a365d', textDecoration: 'none', fontWeight: '900', borderBottom: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                    Explore All Courses ➔
                  </Link>
                  <div className="dropdown-item">Nursing (BSc / GNM)</div>
                  <div className="dropdown-item">Paramedical (DMLT / DRT)</div>
                  <div className="dropdown-item">Pharmacy (B.Pharm)</div>
                  <div className="dropdown-item">FMCGE Preparation</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/success-stories" className={`nav-link ${isActive('/success-stories') ? 'active' : ''}`}>Results</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>

          {/* User / Admin Controls */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '20px' }}>
              <Link to="/dashboard" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <FaUserGraduate /> Dashboard
              </Link>
              <button onClick={handleLogout} className="logout-btn" title="Logout"><FaSignOutAlt /></button>
            </div>
          ) : admin ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '20px' }}>
              <button onClick={handleLogout} className="logout-btn" title="Logout"><FaSignOutAlt /></button>
            </div>
          ) : null}

          {/* Call To Action Button with Spring Physics */}
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(250, 204, 21, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(openAdmissionModal())} 
            style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '12px 28px', border: 'none', borderRadius: '30px', fontWeight: '900', cursor: 'pointer', fontSize: '15px', letterSpacing: '0.5px' }}
          >
            Apply Now
          </motion.button>
        </div>

        {/* Mobile Hamburger Icon */}
        <div style={{ display: 'none', fontSize: '28px', cursor: 'pointer', color: '#facc15' }} className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </motion.nav>

      {/* 3. MOBILE SLIDE-OUT MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ 
              position: 'fixed', top: '75px', right: 0, bottom: 0, width: '280px', 
              backgroundColor: '#0f172a', zIndex: 99, padding: '30px 25px', 
              boxShadow: '-10px 0 30px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: '25px',
              borderLeft: '1px solid #1e293b'
            }}
          >
            <Link to="/" className="mobile-link">Home</Link>
            <Link to="/about" className="mobile-link">About Us</Link>
            <Link to="/courses" className="mobile-link">All Programs</Link>
            <Link to="/success-stories" className="mobile-link">Success Stories</Link>
            <Link to="/contact" className="mobile-link">Contact Us</Link>
            
            <div style={{ width: '100%', height: '1px', backgroundColor: '#334155', margin: '10px 0' }}></div>

            {user ? (
              <>
                <Link to="/dashboard" style={{ color: '#60a5fa', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaUserGraduate /> My Dashboard
                </Link>
                <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #475569', color: '#f87171', padding: '10px 12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Logout
                </button>
              </>
            ) : admin ? (
              <>
                <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #475569', color: '#f87171', padding: '10px 12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaUserGraduate /> Student Login
                </Link>
              </>
            )}

            <button 
              onClick={() => { setIsMobileMenuOpen(false); dispatch(openAdmissionModal()); }} 
              style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '15px', border: 'none', borderRadius: '8px', fontWeight: '900', cursor: 'pointer', fontSize: '18px', marginTop: 'auto', boxShadow: '0 10px 20px rgba(250, 204, 21, 0.2)' }}
            >
              Book Your Seat
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADVANCED NAVBAR CSS */}
      <style>{`
        /* Desktop Link Hover Effects */
        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 16px;
          position: relative;
          padding-bottom: 5px;
          transition: 0.3s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #facc15;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }
        .nav-link:hover, .nav-link.active {
          color: #facc15;
        }

        /* Topbar Hover */
        .topbar-hover:hover { color: white; }

        /* Dropdown Styling */
        .dropdown-item {
          padding: 12px 20px;
          color: #475569;
          font-size: 15px;
          border-bottom: 1px solid #f1f5f9;
          transition: 0.2s;
        }
        .dropdown-item:last-child { border-bottom: none; }
        .dropdown-item:hover {
          background-color: #fef3c7;
          color: #d97706;
          padding-left: 25px; /* Slight slide right on hover */
        }

        /* Mobile Menu Links */
        .mobile-link {
          color: white;
          text-decoration: none;
          font-size: 20px;
          font-weight: 500;
          transition: 0.2s;
        }
        .mobile-link:hover { color: #facc15; padding-left: 10px; }

        /* Logout Button */
        .logout-btn {
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid rgba(248, 113, 113, 0.3);
          color: #f87171;
          cursor: pointer;
          font-size: 18px;
          display: flex;
          padding: 8px;
          border-radius: 50%;
          transition: 0.3s;
        }
        .logout-btn:hover {
          background: #dc2626;
          color: white;
          transform: scale(1.1);
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}
