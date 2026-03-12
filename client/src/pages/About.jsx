import Navbar from '../components/Navbar';
import { capabilityCards, timeline, trustMetrics } from '../data/siteContent';

export default function About() {
  return (
    <div className="site-shell">
      <Navbar />

      <main>
        <section className="section">
          <div className="container split-grid" style={{ alignItems: 'center' }}>
            <div>
              <span className="eyebrow">About the institute</span>
              <h1 className="display-title" style={{ marginTop: 18, fontSize: '4.4rem' }}>
                A coaching-led institute with a more professional public presence.
              </h1>
              <p className="lead">
                The frontend now frames Academic Plus as a serious education brand: cleaner visual hierarchy, stronger messaging, and more credible conversion paths for students and parents.
              </p>
              <p className="section-copy">
                The core identity remains healthcare education and admissions support, but the presentation has been upgraded into a modern, polished coaching website system with consistent structure and better mobile behavior.
              </p>
            </div>

            <div
              className="hero-image-card"
              style={{ minHeight: 500 }}
            >
              <img
                className="cover-image"
                src="https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=1100&q=80"
                alt="Healthcare mentoring session"
              />
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="container grid-3">
            {trustMetrics.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="metric-card">
                  <div className="icon-wrap" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff4e6' }}>
                    <Icon />
                  </div>
                  <h2 className="section-title" style={{ fontSize: '2.2rem', marginTop: 16, color: '#fff4e6' }}>
                    {item.value}
                  </h2>
                  <p style={{ margin: 0 }}>{item.label}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <span className="eyebrow">How the institute grew</span>
            <h2 className="section-title" style={{ marginTop: 18, marginBottom: 24 }}>From local institute to structured coaching brand.</h2>
            <div className="timeline">
              {timeline.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.year}
                    className="timeline-card"
                  >
                    <div>
                      <div className="timeline-year">{item.year}</div>
                      <div className="icon-wrap" style={{ marginTop: 12 }}>
                        <Icon />
                      </div>
                    </div>
                    <div>
                      <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                      <p className="section-copy" style={{ marginBottom: 0 }}>{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <span className="eyebrow">Core capabilities</span>
            <h2 className="section-title" style={{ marginTop: 18, marginBottom: 24 }}>What students should expect from the system.</h2>
            <div className="grid-3">
              {capabilityCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.title} className="feature-card">
                    <div className="icon-wrap">
                      <Icon />
                    </div>
                    <div className="card-kicker" style={{ marginTop: 18 }}>{card.kicker}</div>
                    <h3>{card.title}</h3>
                    <p className="section-copy" style={{ marginBottom: 0 }}>{card.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
