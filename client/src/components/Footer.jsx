import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaArrowRight, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { openAdmissionModal } from '../redux/uiSlice';
import { footerPrograms, siteMeta } from '../data/siteContent';

export default function Footer() {
  const dispatch = useDispatch();

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div>
          <span className="eyebrow">Career coaching brand</span>
          <h2 className="section-title" style={{ color: '#fff4e6', marginTop: 18, fontSize: '2.4rem' }}>
            Academic Plus
          </h2>
          <p className="section-copy" style={{ color: 'rgba(233, 225, 213, 0.76)', maxWidth: 360 }}>
            A modern coaching and admissions platform for healthcare-focused students who want clearer direction, stronger preparation, and professional outcomes.
          </p>
          <button className="btn" type="button" onClick={() => dispatch(openAdmissionModal())}>
            Start your application
            <FaArrowRight />
          </button>
        </div>

        <div>
          <h3 className="footer-heading">Navigation</h3>
          <div className="footer-list">
            <Link className="footer-link" to="/">Home</Link>
            <Link className="footer-link" to="/about">About</Link>
            <Link className="footer-link" to="/courses">Programs</Link>
            <Link className="footer-link" to="/success-stories">Results</Link>
            <Link className="footer-link" to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="footer-heading">Popular tracks</h3>
          <div className="footer-list">
            {footerPrograms.map((program) => (
              <Link key={program} className="footer-link" to="/courses">
                {program}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="footer-heading">Contact</h3>
          <div className="footer-list">
            <a className="footer-contact" href={`tel:${siteMeta.phonePrimary.replace(/\s+/g, '')}`}>
              <FaPhoneAlt style={{ marginRight: 10 }} />
              {siteMeta.phonePrimary}
            </a>
            <a className="footer-contact" href={`mailto:${siteMeta.email}`}>
              <FaEnvelope style={{ marginRight: 10 }} />
              {siteMeta.email}
            </a>
            <div className="footer-contact">
              <FaMapMarkerAlt style={{ marginRight: 10 }} />
              {siteMeta.address}
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} Academic Plus. All rights reserved.</span>
        <span>Professional healthcare coaching website system.</span>
      </div>
    </footer>
  );
}
