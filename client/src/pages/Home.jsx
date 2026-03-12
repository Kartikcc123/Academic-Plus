import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaArrowRight, FaCheckCircle, FaPhoneAlt, FaPlayCircle } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import NewsTicker from '../components/NewsTicker';
import { openAdmissionModal } from '../redux/uiSlice';
import {
  capabilityCards,
  coachingPoints,
  heroStats,
  homeHighlights,
  programs,
  siteMeta,
} from '../data/siteContent';

export default function Home() {
  const dispatch = useDispatch();
  const featuredPrograms = programs.slice(0, 3);

  return (
    <div className="site-shell">
      <Navbar />

      <main>
        <section className="section">
          <div className="container hero-grid">
            <div
              className="hero-panel"
            >
              <span className="eyebrow">Modern coaching website</span>
              <h1 className="display-title" style={{ marginTop: 22 }}>
                Build a confident
                {' '}
                <span className="accent-text">healthcare career</span>
                {' '}
                with better coaching.
              </h1>
              <p className="lead" style={{ maxWidth: 620 }}>
                Academic Plus brings admissions guidance, structured coaching, and placement-facing preparation into one professional student journey.
              </p>

              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
                <button className="btn" type="button" onClick={() => dispatch(openAdmissionModal())}>
                  Book counseling
                  <FaArrowRight />
                </button>
                <Link className="btn-secondary" to="/courses">
                  Explore programs
                </Link>
              </div>

              <ul className="info-list" style={{ marginTop: 26 }}>
                {coachingPoints.map((point) => (
                  <li key={point} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <FaCheckCircle color="#1f8f61" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="hero-visual"
            >
              <div className="hero-image-card">
                <img
                  src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1100&q=80"
                  alt="Healthcare coaching students"
                />
              </div>

              <div className="floating-badge">
                <div className="card-kicker">Admissions support</div>
                <h3 style={{ margin: '8px 0 6px' }}>Parents and students get direct guidance</h3>
                <p className="section-copy" style={{ margin: 0 }}>
                  Call
                  {' '}
                  {siteMeta.phonePrimary}
                  {' '}
                  for counseling, course selection, and application support.
                </p>
              </div>

              <div className="floating-stat">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <FaPlayCircle color="#b7792f" />
                  <div>
                    <strong>Professional learning flow</strong>
                    <div className="section-copy" style={{ margin: 0 }}>Counseling, coaching, outcomes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <NewsTicker />

        <section className="section-tight">
          <div className="container stats-row">
            {heroStats.map((item) => (
              <div key={item.label} className="metric-card">
                <h2 className="section-title" style={{ marginBottom: 10, fontSize: '2.2rem', color: '#fff4e6' }}>
                  {item.value}
                </h2>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <span className="eyebrow">Why students choose us</span>
            <div style={{ maxWidth: 720, marginTop: 18, marginBottom: 28 }}>
              <h2 className="section-title">A sharper, more professional coaching experience.</h2>
              <p className="section-copy">
                The platform now presents the institute as a premium coaching brand rather than a patchwork brochure. The focus is clarity, trust, and student action.
              </p>
            </div>

            <div className="grid-3">
              {homeHighlights.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="feature-card"
                  >
                    <div className="icon-wrap">
                      <Icon />
                    </div>
                    <h3 style={{ marginBottom: 10 }}>{item.title}</h3>
                    <p className="section-copy" style={{ margin: 0 }}>{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="container split-grid">
            {capabilityCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="glass-panel">
                  <div className="card-kicker">{card.kicker}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 12 }}>
                    <div className="icon-wrap">
                      <Icon />
                    </div>
                    <h3 style={{ margin: 0 }}>{card.title}</h3>
                  </div>
                  <p className="section-copy" style={{ marginBottom: 0 }}>{card.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', alignItems: 'end', marginBottom: 28 }}>
              <div style={{ maxWidth: 700 }}>
                <span className="eyebrow">Featured programs</span>
                <h2 className="section-title" style={{ marginTop: 18 }}>Career pathways students can act on immediately.</h2>
              </div>
              <Link className="pill-link" to="/courses">
                View all programs
                <FaArrowRight />
              </Link>
            </div>

            <div className="grid-3">
              {featuredPrograms.map((program) => {
                const Icon = program.icon;
                return (
                  <article key={program.id} className="program-card">
                    <div className="icon-wrap">
                      <Icon />
                    </div>
                    <div className="card-kicker" style={{ marginTop: 18 }}>{program.category}</div>
                    <h3 style={{ marginTop: 12, marginBottom: 10 }}>{program.title}</h3>
                    <p className="section-copy">{program.description}</p>
                    <ul className="meta-list">
                      <li><strong>Duration:</strong> {program.duration}</li>
                      <li><strong>Eligibility:</strong> {program.eligibility}</li>
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ maxWidth: 700 }}>
                <span className="eyebrow">Call to action</span>
                <h2 className="section-title" style={{ marginTop: 18 }}>Need a direct conversation before choosing a course?</h2>
                <p className="section-copy">
                  Speak with the admissions and coaching team to compare programs, understand eligibility, and plan the next step with confidence.
                </p>
              </div>
              <div style={{ display: 'grid', gap: 12 }}>
                <button className="btn" type="button" onClick={() => dispatch(openAdmissionModal())}>
                  Request callback
                  <FaArrowRight />
                </button>
                <a className="pill-link" href={`tel:${siteMeta.phonePrimary.replace(/\s+/g, '')}`}>
                  <FaPhoneAlt />
                  Call now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
