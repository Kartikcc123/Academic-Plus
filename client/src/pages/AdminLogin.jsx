import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function AdminLogin() {
  // Step 1 State (The Secret Door)
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // Step 2 State (The Actual Login)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { loginAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  // The secret word only you and Dr. Ajay know
  const SECRET_PASSCODE = 'ACADEMIC2026'; 

  // Handle unlocking the hidden door
  const handleUnlock = (e) => {
    e.preventDefault();
    if (passcode === SECRET_PASSCODE) {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Access Denied: Invalid Passcode');
      setPasscode('');
    }
  };

  // Handle the actual database login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginAdmin(email, password);
      navigate('/admin/panel'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        
        <h2 style={{ color: '#1a365d', marginBottom: '20px' }}>
          {isUnlocked ? 'Director Portal' : 'Restricted Zone'}
        </h2>

        {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '5px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}

        {/* STEP 1: THE HIDDEN DOOR */}
        {!isUnlocked ? (
          <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p style={{ fontSize: '14px', color: '#666', margin: '0 0 10px 0' }}>Enter the institute security code to continue.</p>
            <input 
              type="password" 
              placeholder="Security Passcode" 
              value={passcode} 
              onChange={(e) => setPasscode(e.target.value)} 
              required 
              style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', textAlign: 'center', letterSpacing: '3px' }}
            />
            <button 
              type="submit" 
              style={{ backgroundColor: '#1a365d', color: '#facc15', padding: '12px', border: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
            >
              Verify Code
            </button>
          </form>
        ) : (
          
          /* STEP 2: THE ACTUAL LOGIN (Only shows if unlocked) */
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="email" 
              placeholder="Director Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
            <button 
              type="submit" 
              style={{ backgroundColor: '#dc2626', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
            >
              Secure Login
            </button>
          </form>
        )}
        
      </div>
    </div>
  );
}