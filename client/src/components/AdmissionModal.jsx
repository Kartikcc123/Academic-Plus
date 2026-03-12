import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { closeAdmissionModal } from '../redux/uiSlice';

const initialForm = { name: '', phone: '', course: '' };

export default function AdmissionModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isAdmissionModalOpen);
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ loading: false, error: '', success: false });

  const handleClose = () => {
    setFormData(initialForm);
    setStatus({ loading: false, error: '', success: false });
    dispatch(closeAdmissionModal());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: '', success: false });

    try {
      await axios.post('/api/inquiries', formData);
      setStatus({ loading: false, error: '', success: true });
      window.setTimeout(handleClose, 1600);
    } catch (error) {
      setStatus({
        loading: false,
        error: error.response?.data?.message || 'Unable to submit inquiry right now. Please try again.',
        success: false,
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={handleClose} aria-label="Close modal">
          <FaTimes />
        </button>

        <span className="eyebrow">Admissions desk</span>
        <h2 className="section-title" style={{ marginTop: 18, fontSize: '2.3rem' }}>
          Book a counseling call
        </h2>
        <p className="section-copy">
          Share your details and the team will guide you on the right healthcare program, admission route, and next steps.
        </p>

        {status.error ? <div className="status-message error">{status.error}</div> : null}
        {status.success ? (
          <div className="status-message success">
            Inquiry submitted successfully. The admissions team will contact you shortly.
          </div>
        ) : (
          <form className="form-grid" onSubmit={handleSubmit}>
            <div>
              <label className="field-label" htmlFor="admission-name">Full name</label>
              <input
                id="admission-name"
                className="field-control"
                type="text"
                value={formData.name}
                onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                placeholder="Student full name"
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="admission-phone">Phone number</label>
              <input
                id="admission-phone"
                className="field-control"
                type="tel"
                value={formData.phone}
                onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                placeholder="Mobile number"
                required
              />
            </div>

            <div>
              <label className="field-label" htmlFor="admission-course">Program interest</label>
              <select
                id="admission-course"
                className="field-control"
                value={formData.course}
                onChange={(event) => setFormData((current) => ({ ...current, course: event.target.value }))}
                required
              >
                <option value="" disabled>Select your preferred path</option>
                <option value="Nursing">Nursing</option>
                <option value="Paramedical">Paramedical</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Medical counseling">Medical counseling</option>
                <option value="FMGE / NEXT coaching">FMGE / NEXT coaching</option>
              </select>
            </div>

            <button className="btn" type="submit" disabled={status.loading}>
              {status.loading ? 'Submitting...' : 'Submit inquiry'}
              {!status.loading ? <FaArrowRight /> : null}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
