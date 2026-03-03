import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function AdminSettings() {
  const { admin } = useContext(AuthContext);
  const [name, setName] = useState(admin.name);
  const [newPassword, setNewPassword] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${admin.token}` } };
      await axios.put('/api/admin/profile', { name, password: newPassword }, config);
      alert("Director Profile Updated Successfully!");
    } catch {
      alert("Failed to update profile");
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#1a365d' }}>Director Settings</h2>
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label>Update Director Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '10px' }} />
        
        <label>Change Login Password</label>
        <input type="password" placeholder="Leave blank to keep current" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ padding: '10px' }} />
        
        <button type="submit" style={{ backgroundColor: '#1a365d', color: '#facc15', padding: '12px', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
