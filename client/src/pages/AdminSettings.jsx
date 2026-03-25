import { useState, useContext, useMemo } from 'react';
import api from '../lib/api';
import { AuthContext } from '../context/AuthContext';

export default function AdminSettings() {
  const { admin } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  // Initialize name from admin using useMemo (only runs once when admin changes)
  const initialName = useMemo(() => admin?.name || '', [admin]);
  
  // Set initial name value
  useState(() => {
    if (admin?.name) {
      setName(admin.name);
    }
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    
    try {
      const config = { headers: { Authorization: `Bearer ${admin.token}` } };
      await api.put('/api/admin/profile', { name: name || initialName, password: newPassword }, config);
      setStatus({ type: 'success', message: 'Director Profile Updated Successfully!' });
      setNewPassword('');
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to update profile' 
      });
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#1a365d' }}>Director Settings</h2>
      {status.message ? (
        <div className={`status-message ${status.type === 'error' ? 'error' : 'success'}`}>
          {status.message}
        </div>
      ) : null}
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>Update Director Name</label>
        <input 
          type="text" 
          value={name || initialName} 
          onChange={(e) => setName(e.target.value)} 
          style={{ padding: '10px' }} 
        />
        
        <label>Change Login Password</label>
        <input 
          type="password" 
          placeholder="Leave blank to keep current" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
          style={{ padding: '10px' }} 
        />
        
        <button type="submit" style={{ backgroundColor: '#1a365d', color: '#facc15', padding: '12px', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
