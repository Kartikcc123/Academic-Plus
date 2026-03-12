import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginUser(email, password);
      navigate('/dashboard');
    } catch (requestError) {
      if (!requestError.response) {
        setError('Unable to reach the server. Check the deployed API URL.');
      } else {
        setError(requestError.response?.data?.message || 'Invalid email or password.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Student access"
      title="Log in to the Academic Plus student portal."
      description="Access your learning resources, notes, and student dashboard through a cleaner, more credible portal experience."
    >
      <div style={{ marginBottom: 24 }}>
        <div className="card-kicker">Welcome back</div>
        <h2 style={{ marginBottom: 8 }}>Student login</h2>
        <p className="section-copy" style={{ margin: 0 }}>
          Enter your email and password to continue.
        </p>
      </div>

      {error ? <div className="status-message error">{error}</div> : null}

      <form className="form-grid" onSubmit={handleLogin}>
        <div>
          <label className="field-label" htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            className="field-control"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="field-label" htmlFor="login-password">Password</label>
          <input
            id="login-password"
            className="field-control"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Access portal'}
        </button>
      </form>

      <p className="section-copy" style={{ marginTop: 20, marginBottom: 0 }}>
        Need an account?
        {' '}
        <Link to="/register" style={{ color: '#8f581f', fontWeight: 700, textDecoration: 'none' }}>
          Register here
        </Link>
      </p>
    </AuthLayout>
  );
}
