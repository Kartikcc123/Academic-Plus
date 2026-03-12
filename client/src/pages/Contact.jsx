import { useState } from 'react';
import axios from 'axios';
import { FaArrowRight, FaHeadset } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { contactCards, siteMeta } from '../data/siteContent';

const initialForm = { name: '', phone: '', course: '' };

export default function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      await axios.post('/api/inquiries', formData);
      setStatus({ loading: false, success: true, error: '' });
      setFormData(initialForm);
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Unable to submit your request. Please try again.',
      });
    }
  };

  return (
    <div className="site-shell">
      <Navbar />

      <main>
        <section className="section">
          <div className="container">
            <span className="eyebrow">Contact the team</span>
            <h1 className="display-title" style={{ marginTop: 18, fontSize: '4.4rem', maxWidth: 900 }}>
              Better contact flows for students, parents, and admissions.
            </h1>
            <p className="lead" style={{ maxWidth: 760 }}>
              The contact page now uses clearer cards, a cleaner callback form, and a more professional visual structure.
            </p>
          </div>
        </section>

        <section className="section-tight">
          <div className="container grid-3">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="info-card">
                  <div className="icon-wrap">
                    <Icon />
                  </div>
                  <h3 style={{ marginTop: 18 }}>{card.title}</h3>
                  <p className="section-copy" style={{ marginBottom: 0 }}>{card.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section">
          <div className="container contact-grid">
            <div className="form-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className="icon-wrap">
                  <FaHeadset />
                </div>
                <div>
                  <div className="card-kicker">Callback request</div>
                  <h2 style={{ margin: '8px 0 0' }}>Speak with the admissions desk</h2>
                </div>
              </div>

              <p className="section-copy">
                Leave your details and the team will help you compare programs, eligibility, and admission routes.
              </p>

              {status.error ? <div className="status-message error">{status.error}</div> : null}
              {status.success ? (
                <div className="status-message success">
                  Inquiry sent successfully. The team will contact you soon.
                </div>
              ) : (
                <form className="form-grid" onSubmit={handleSubmit}>
                  <div>
                    <label className="field-label" htmlFor="contact-name">Full name</label>
                    <input
                      id="contact-name"
                      className="field-control"
                      value={formData.name}
                      onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                      placeholder="Student full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="contact-phone">Phone number</label>
                    <input
                      id="contact-phone"
                      className="field-control"
                      value={formData.phone}
                      onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                      placeholder="Mobile number"
                      required
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="contact-course">Preferred program</label>
                    <select
                      id="contact-course"
                      className="field-control"
                      value={formData.course}
                      onChange={(event) => setFormData((current) => ({ ...current, course: event.target.value }))}
                      required
                    >
                      <option value="" disabled>Select a program</option>
                      <option value="Nursing">Nursing</option>
                      <option value="Paramedical">Paramedical</option>
                      <option value="Pharmacy">Pharmacy</option>
                      <option value="Medical counseling">Medical counseling</option>
                      <option value="FMGE / NEXT coaching">FMGE / NEXT coaching</option>
                    </select>
                  </div>
                  <button className="btn" type="submit" disabled={status.loading}>
                    {status.loading ? 'Sending...' : 'Request callback'}
                    {!status.loading ? <FaArrowRight /> : null}
                  </button>
                </form>
              )}
            </div>

            <div className="glass-panel">
              <div className="card-kicker">Campus presence</div>
              <h2 style={{ marginTop: 8 }}>Visit the institute</h2>
              <p className="section-copy">{siteMeta.address}</p>
              <div style={{ borderRadius: 24, overflow: 'hidden', minHeight: 420, background: '#e7e0d3' }}>
                <iframe
                  title="Academic Plus campus map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d450.65685125325444!2d74.63430672153342!3d25.36277524398285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968c3d923b6f479%3A0xfc4d53bbc53b079e!2sAcademic%20Plus!5e0!3m2!1sen!2sin!4v1773323262131!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
