import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

const SECRET_PASSCODE = 'ACADEMIC2026';

export default function AdminLogin() {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUnlock = (event) => {
    event.preventDefault();
    if (passcode === SECRET_PASSCODE) {
      setIsUnlocked(true);
      setError('');
      return;
    }

    setError('Invalid director access code.');
    setPasscode('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginAdmin(email, password);
      navigate('/admin/panel');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Director login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Director access"
      title="Restricted admin portal for institute management."
      description="The styling is now consistent with the rest of the frontend while preserving the existing two-step access flow."
    >
      <div style={{ marginBottom: 24 }}>
        <div className="card-kicker">Admin area</div>
        <h2 style={{ marginBottom: 8 }}>{isUnlocked ? 'Director login' : 'Verify access code'}</h2>
        <p className="section-copy" style={{ margin: 0 }}>
          {isUnlocked
            ? 'Enter the director credentials to continue into the admin panel.'
            : 'Use the institute access code before signing in.'}
        </p>
      </div>

      {error ? <div className="status-message error">{error}</div> : null}

      {!isUnlocked ? (
        <form className="form-grid" onSubmit={handleUnlock}>
          <div>
            <label className="field-label" htmlFor="director-code">Access code</label>
            <input
              id="director-code"
              className="field-control"
              type="password"
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
              required
            />
          </div>
          <button className="btn-secondary" type="submit">
            Verify code
          </button>
        </form>
      ) : (
        <form className="form-grid" onSubmit={handleLogin}>
          <div>
            <label className="field-label" htmlFor="director-email">Director email</label>
            <input
              id="director-email"
              className="field-control"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <label className="field-label" htmlFor="director-password">Password</label>
            <input
              id="director-password"
              className="field-control"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Enter portal'}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
