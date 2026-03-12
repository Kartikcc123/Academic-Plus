import { useDispatch } from 'react-redux';
import { FaArrowRight, FaQuoteLeft } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { openAdmissionModal } from '../redux/uiSlice';
import { testimonials, trustMetrics } from '../data/siteContent';

export default function SuccessStories() {
  const dispatch = useDispatch();

  return (
    <div className="site-shell">
      <Navbar />

      <main>
        <section className="section">
          <div className="container">
            <span className="eyebrow">Success outcomes</span>
            <h1 className="display-title" style={{ marginTop: 18, fontSize: '4.6rem', maxWidth: 900 }}>
              Results that make the coaching promise credible.
            </h1>
            <p className="lead" style={{ maxWidth: 760 }}>
              This page now reads as social proof for a modern professional institute, with cleaner student stories and stronger trust signals.
            </p>
          </div>
        </section>

        <section className="section-tight">
          <div className="container grid-3">
            {trustMetrics.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="glass-panel">
                  <div className="icon-wrap">
                    <Icon />
                  </div>
                  <h2 className="section-title" style={{ marginTop: 16, fontSize: '2.2rem' }}>{item.value}</h2>
                  <p className="section-copy" style={{ marginBottom: 0 }}>{item.label}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="container grid-3">
            {testimonials.map((story) => (
              <article key={story.name} className="story-card">
                <FaQuoteLeft color="#d8b16a" size={22} />
                <p className="section-copy" style={{ fontSize: '1.04rem', minHeight: 108 }}>
                  {story.quote}
                </p>
                <div className="card-kicker">{story.course}</div>
                <h3 style={{ marginTop: 12, marginBottom: 6 }}>{story.name}</h3>
                <p style={{ margin: 0, fontWeight: 700 }}>{story.result}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="glass-panel" style={{ textAlign: 'center' }}>
              <span className="eyebrow">Next step</span>
              <h2 className="section-title" style={{ marginTop: 18 }}>Ready to build your own result?</h2>
              <p className="section-copy" style={{ maxWidth: 720, marginInline: 'auto' }}>
                Speak with the team and choose the route that fits your academic background, target role, and timeline.
              </p>
              <button className="btn" type="button" onClick={() => dispatch(openAdmissionModal())}>
                Start your inquiry
                <FaArrowRight />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
