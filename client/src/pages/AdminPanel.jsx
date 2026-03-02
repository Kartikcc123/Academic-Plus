import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function AdminPanel() {
  const { admin, logout } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({ name: '', password: '' });

// New Admin State
  const [newAdminData, setNewAdminData] = useState({ name: '', email: '', password: '' });
  
  // State for Video Upload
  const [videoData, setVideoData] = useState({ title: '', description: '', youtubeLink: '', subject: '' });
  
  // State for Note Upload
  const [noteData, setNoteData] = useState({ title: '', description: '', fileUrl: '', subject: '' });

  // Config with your admin token!
  const config = {
    headers: {
      Authorization: `Bearer ${admin?.token}`,
    },
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/videos', videoData, config);
      alert('Video uploaded successfully!');
      setVideoData({ title: '', description: '', youtubeLink: '', subject: '' }); // Clear form
    } catch (error) {
      alert(error.response?.data?.message || 'Error uploading video');
    }
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/notes', noteData, config);
      alert('Note uploaded successfully!');
      setNoteData({ title: '', description: '', fileUrl: '', subject: '' }); // Clear form
    } catch (error) {
      alert(error.response?.data?.message || 'Error uploading note');
    }
  };

  const handleProfileUpdate = async (e) => {
  e.preventDefault();
  try {
    await axios.put('/api/admin/profile', profileData, config);
    alert('Profile updated successfully! Next time you log in, use the new password.');
    setProfileData({ name: '', password: '' });
  } catch (error) {
    alert(error.response?.data?.message || 'Error updating profile');
  }
};

const handleCreateAdmin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/api/admin/create-admin', newAdminData, config);
    alert(res.data.message);
    setNewAdminData({ name: '', email: '', password: '' });
  } catch (error) {
    alert(error.response?.data?.message || 'Error creating admin');
  }
};

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Welcome to the NextGenz Admin Panel</h2>
        <button onClick={logout} style={{ background: 'red', color: 'white' }}>Logout</button>
      </div>

      <hr />

      {/* Upload Video Section */}
      <section style={{ marginTop: '20px' }}>
        <h3>Upload Recorded Lecture</h3>
        <form onSubmit={handleVideoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Video Title" value={videoData.title} onChange={(e) => setVideoData({...videoData, title: e.target.value})} required />
          <input type="text" placeholder="Subject (e.g., React JS)" value={videoData.subject} onChange={(e) => setVideoData({...videoData, subject: e.target.value})} required />
          <input type="text" placeholder="YouTube Embed Link" value={videoData.youtubeLink} onChange={(e) => setVideoData({...videoData, youtubeLink: e.target.value})} required />
          <textarea placeholder="Description" value={videoData.description} onChange={(e) => setVideoData({...videoData, description: e.target.value})} required />
          <button type="submit">Publish Video</button>
        </form>
      </section>

      <hr style={{ margin: '30px 0' }} />

      {/* Upload Notes Section */}
      <section>
        <h3>Upload PDF Notes</h3>
        <form onSubmit={handleNoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Note Title" value={noteData.title} onChange={(e) => setNoteData({...noteData, title: e.target.value})} required />
          <input type="text" placeholder="Subject" value={noteData.subject} onChange={(e) => setNoteData({...noteData, subject: e.target.value})} required />
          <input type="text" placeholder="Google Drive / Cloudinary File URL" value={noteData.fileUrl} onChange={(e) => setNoteData({...noteData, fileUrl: e.target.value})} required />
          <textarea placeholder="Description" value={noteData.description} onChange={(e) => setNoteData({...noteData, description: e.target.value})} required />
          <button type="submit">Publish Notes</button>
        </form>
      </section>

      <hr style={{ margin: '30px 0' }} />

      {/* ADMIN SETTINGS ZONE */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Update Own Profile */}
        <section style={{ flex: 1, backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#1a365d' }}>⚙️ Security Settings</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>Change your display name or update your password.</p>
          <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="text" placeholder="New Display Name" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} />
            <input type="password" placeholder="New Password" value={profileData.password} onChange={(e) => setProfileData({...profileData, password: e.target.value})} />
            <button type="submit" style={{ backgroundColor: '#1a365d', color: 'white' }}>Update Profile</button>
          </form>
        </section>

        {/* WhatsApp Style: Add New Admin */}
        <section style={{ flex: 1, backgroundColor: '#fffbeb', padding: '20px', borderRadius: '8px', border: '1px solid #fde68a' }}>
          <h3 style={{ color: '#d97706' }}>👑 Grant Admin Access</h3>
          <p style={{ fontSize: '14px', color: '#666' }}>Create a login for a trusted partner (e.g., Dr. Chander).</p>
          <form onSubmit={handleCreateAdmin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="text" placeholder="Partner's Name" value={newAdminData.name} onChange={(e) => setNewAdminData({...newAdminData, name: e.target.value})} required />
            <input type="email" placeholder="Partner's Email" value={newAdminData.email} onChange={(e) => setNewAdminData({...newAdminData, email: e.target.value})} required />
            <input type="password" placeholder="Assign Temporary Password" value={newAdminData.password} onChange={(e) => setNewAdminData({...newAdminData, password: e.target.value})} required />
            <button type="submit" style={{ backgroundColor: '#d97706', color: 'white' }}>Create Admin Account</button>
          </form>
        </section>
        </div>
    </div>
  );
}