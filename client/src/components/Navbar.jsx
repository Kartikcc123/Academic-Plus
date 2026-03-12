import { useContext, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaBars, FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaSignOutAlt, FaTimes, FaUserGraduate } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { openAdmissionModal } from '../redux/uiSlice';
import { siteMeta } from '../data/siteContent';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Programs', path: '/courses' },
  { label: 'Results', path: '/success-stories' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { user, admin, logout } = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="container header-top-inner">
          <div className="header-meta">
            <span className="top-meta-item">
              <FaMapMarkerAlt />
              {siteMeta.mapLabel}
            </span>
            <a className="top-meta-item" href={`mailto:${siteMeta.email}`}>
              <FaEnvelope />
              {siteMeta.email}
            </a>
            <span className="top-meta-item top-meta-highlight">
              <FaClock />
              Admissions open for 2026 intake
            </span>
          </div>
          <div className="top-cta-group">
            <span className="top-mini-label">Counseling helpline</span>
            <a className="top-call-link" href={`tel:${siteMeta.phonePrimary.replace(/\s+/g, '')}`}>
              <FaPhoneAlt />
              {siteMeta.phonePrimary}
            </a>
          </div>
        </div>
      </div>

      <div className="container header-main">
        <Link to="/" className="brand">
          <span className="brand-mark">Premium coaching</span>
          <span className="brand-title">Academic Plus</span>
          <span className="brand-subtitle">Healthcare career institute</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          {user ? (
            <Link to="/dashboard" className="pill-link">
              <FaUserGraduate />
              Dashboard
            </Link>
          ) : null}

          {admin ? (
            <Link to="/admin/panel" className="pill-link">
              Director panel
            </Link>
          ) : (
            <Link to="/login" className="pill-link">
              <FaUserGraduate />
              Student portal
            </Link>
          )}

          {(user || admin) ? (
            <button className="pill-link" onClick={handleLogout} type="button" aria-label="Logout">
              <FaSignOutAlt />
              Logout
            </button>
          ) : null}

          {!user && !admin && (
            <button className="btn" type="button" onClick={() => dispatch(openAdmissionModal())}>
              Apply now
            </button>
          )}

          <button
            className="mobile-toggle"
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="mobile-panel">
            <div className="container mobile-panel-inner">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className="mobile-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}

              {!admin && !user ? (
                <Link to="/login" className="mobile-link" onClick={() => setMobileOpen(false)}>
                  Student portal
                </Link>
              ) : null}

              {user ? (
                <Link to="/dashboard" className="mobile-link" onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
              ) : null}

              {admin ? (
                <Link to="/admin/panel" className="mobile-link" onClick={() => setMobileOpen(false)}>
                  Director panel
                </Link>
              ) : null}

              <button
                type="button"
                className="btn"
                onClick={() => {
                  setMobileOpen(false);
                  dispatch(openAdmissionModal());
                }}
              >
                Book counseling
              </button>

              {(user || admin) ? (
                <button type="button" className="btn-secondary" onClick={handleLogout}>
                  Logout
                </button>
              ) : null}
            </div>
        </div>
      ) : null}
    </header>
  );
}
