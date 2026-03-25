import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import AuthLayout from '../components/AuthLayout';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/api/auth/register', formData);
      navigate('/login');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="New students"
      title="Create a student account for learning access."
      description="Registration has been kept simple, but the interface now matches the upgraded coaching brand across the website."
    >
      <div style={{ marginBottom: 24 }}>
        <div className="card-kicker">Register</div>
        <h2 style={{ marginBottom: 8 }}>Student account setup</h2>
        <p className="section-copy" style={{ margin: 0 }}>
          Create your account to request access. Admin approval is required before the student portal can be used.
        </p>
      </div>

      {error ? <div className="status-message error">{error}</div> : null}

      <form className="form-grid" onSubmit={handleRegister}>
        <div>
          <label className="field-label" htmlFor="register-name">Full name</label>
          <input
            id="register-name"
            className="field-control"
            type="text"
            value={formData.name}
            onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
            required
          />
        </div>
        <div>
          <label className="field-label" htmlFor="register-email">Email address</label>
          <input
            id="register-email"
            className="field-control"
            type="email"
            value={formData.email}
            onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
            required
          />
        </div>
        <div>
          <label className="field-label" htmlFor="register-password">Password</label>
          <input
            id="register-password"
            className="field-control"
            type="password"
            value={formData.password}
            onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
            minLength="6"
            required
          />
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="section-copy" style={{ marginTop: 20, marginBottom: 0 }}>
        After registration, your account stays pending until an admin grants portal access.
      </p>

      <p className="section-copy" style={{ marginTop: 12, marginBottom: 0 }}>
        Already registered?
        {' '}
        <Link to="/login" style={{ color: '#8f581f', fontWeight: 700, textDecoration: 'none' }}>
          Log in here
        </Link>
      </p>
    </AuthLayout>
  );
}
