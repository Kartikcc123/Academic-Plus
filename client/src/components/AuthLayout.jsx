import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { authHighlights } from '../data/siteContent';

export default function AuthLayout({ eyebrow, title, description, children }) {
  return (
    <div className="auth-shell">
      <div className="container auth-grid">
        <aside className="auth-aside">
          <Link to="/" className="pill-link" style={{ width: 'fit-content', marginBottom: 22 }}>
            <FaArrowLeft />
            Back to website
          </Link>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="section-title" style={{ marginTop: 20, color: '#fff4e6' }}>
            {title}
          </h1>
          <p className="lead" style={{ color: 'rgba(243, 237, 226, 0.8)', maxWidth: 500 }}>
            {description}
          </p>
          <ul>
            {authHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>

        <div className="auth-card">
          {children}
        </div>
      </div>
    </div>
  );
}
