import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { FaUserGraduate, FaUpload, FaClipboardList, FaChartLine, FaVideo, FaFilePdf, FaTrash } from 'react-icons/fa';

export default function AdminPanel() {
  const { admin } = useContext(AuthContext);
  
  // State for Navigation Tabs
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data States
  const [students, setStudents] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [videos, setVideos] = useState([]);
  const [notes, setNotes] = useState([]);
  
  // Upload Form States
  const [uploadType, setUploadType] = useState('note');
  const [formData, setFormData] = useState({ link: '' });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  // Fetch all data when the Admin logs in
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${admin.token}` } };
        
        const [studentRes, inquiryRes, videoRes, noteRes] = await Promise.all([
          axios.get('/api/admin/students', config),
          axios.get('/api/inquiries', config),
          axios.get('/api/videos', config),
          axios.get('/api/notes', config)
        ]);

        setStudents(studentRes.data);
        setInquiries(inquiryRes.data);
        setVideos(videoRes.data);
        setNotes(noteRes.data);
      } catch (error) {
        console.error('Admin Fetch Error:', error);
      }
    };

    if (admin) fetchAllData();
  }, [admin]);

  // Master Upload Handler (Controls the Student Page)
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setStatus('uploading');
    try {
      const config = { headers: { Authorization: `Bearer ${admin.token}` } };

      if (uploadType === 'video') {
        const videoPayload = {
          youtubeLink: formData.link
        };
        await axios.post('/api/videos', videoPayload, config);
        
      } else if (uploadType === 'note') {
        const noteData = new FormData();
        noteData.append('pdfFile', file);
        
        await axios.post('/api/notes/upload', noteData, {
          headers: { ...config.headers, 'Content-Type': 'multipart/form-data' }
        });
      }
      
      setStatus('success');
      setFormData({ link: '' });
      setFile(null);
      setTimeout(() => window.location.reload(), 2000);
      
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  // 🚀 NEW: Delete Student Handler
  const handleDeleteStudent = async (studentId) => {
    if (window.confirm("Are you sure you want to permanently delete this student?")) {
      try {
        const config = { headers: { Authorization: `Bearer ${admin.token}` } };
        await axios.delete(`/api/admin/students/${studentId}`, config);
        
        // Remove the student from the UI immediately without refreshing
        setStudents(students.filter(student => student._id !== studentId));
      } catch (error) {
        console.error("Error deleting student", error);
        alert("Failed to delete student. Check console for details.");
      }
    }
  };

  // 🚀 Handle CRM Status Updates
  const handleStatusUpdate = async (inquiryId, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${admin.token}` } };
      await axios.put(`/api/inquiries/${inquiryId}`, { status: newStatus }, config);
      
      // Instantly update the UI without refreshing the page
      setInquiries(inquiries.map(lead => 
        lead._id === inquiryId ? { ...lead, status: newStatus } : lead
      ));
    } catch (error) {
      console.error("Error updating status", error);
      alert("Failed to update lead status.");
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Navbar />

      {/* Admin Header */}
      <header style={{ backgroundColor: '#1a365d', color: 'white', padding: '40px 20px', borderBottom: '5px solid #facc15' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '32px', color: '#facc15' }}>Maths Point Master Control</h1>
            <p style={{ margin: '5px 0 0 0', color: '#cbd5e1' }}>Welcome back, Director. You are in control of the platform.</p>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px', display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        
        {/* Left Sidebar Navigation */}
        <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { id: 'overview', icon: <FaChartLine />, label: 'Platform Overview' },
            { id: 'students', icon: <FaUserGraduate />, label: 'Manage Students' },
            { id: 'upload', icon: <FaUpload />, label: 'Upload Study Material' },
            { id: 'inquiries', icon: <FaClipboardList />, label: 'Admission Leads' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 20px',
                border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'left', transition: '0.3s',
                backgroundColor: activeTab === tab.id ? '#1a365d' : 'white',
                color: activeTab === tab.id ? '#facc15' : '#475569',
                boxShadow: activeTab === tab.id ? '0 10px 20px rgba(26, 54, 93, 0.2)' : '0 4px 6px rgba(0,0,0,0.05)'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div style={{ flex: '3 1 700px', backgroundColor: 'white', borderRadius: '15px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ color: '#1a365d', marginTop: 0, borderBottom: '3px solid #facc15', paddingBottom: '10px' }}>Platform Statistics</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
                <div style={{ backgroundColor: '#fef3c7', padding: '25px', borderRadius: '10px', textAlign: 'center', color: '#d97706', border: '1px solid #fde68a' }}>
                  <FaUserGraduate style={{ fontSize: '40px', marginBottom: '10px' }}/>
                  <h3 style={{ margin: 0, fontSize: '32px' }}>{students.length}</h3>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Active Students</p>
                </div>
                <div style={{ backgroundColor: '#e0f2fe', padding: '25px', borderRadius: '10px', textAlign: 'center', color: '#0284c7', border: '1px solid #bae6fd' }}>
                  <FaFilePdf style={{ fontSize: '40px', marginBottom: '10px' }}/>
                  <h3 style={{ margin: 0, fontSize: '32px' }}>{notes.length}</h3>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Study Notes</p>
                </div>
                <div style={{ backgroundColor: '#fee2e2', padding: '25px', borderRadius: '10px', textAlign: 'center', color: '#dc2626', border: '1px solid #fecaca' }}>
                  <FaVideo style={{ fontSize: '40px', marginBottom: '10px' }}/>
                  <h3 style={{ margin: 0, fontSize: '32px' }}>{videos.length}</h3>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Video Lectures</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE STUDENTS */}
          {activeTab === 'students' && (
            <div>
              <h2 style={{ color: '#1a365d', marginTop: 0, borderBottom: '3px solid #facc15', paddingBottom: '10px' }}>Registered Students</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#1a365d', color: '#facc15', textAlign: 'left' }}>
                    <th style={{ padding: '15px' }}>Name</th>
                    <th style={{ padding: '15px' }}>Email</th>
                    <th style={{ padding: '15px' }}>Joined</th>
                    <th style={{ padding: '15px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '15px', fontWeight: 'bold', color: '#1e293b' }}>{student.name}</td>
                      <td style={{ padding: '15px', color: '#64748b' }}>{student.email}</td>
                      <td style={{ padding: '15px', color: '#64748b' }}>{new Date(student.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '15px' }}>
                        {/* 🚀 NEW: Wired Delete Button */}
                        <button 
                          onClick={() => handleDeleteStudent(student._id)}
                          style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#fca5a5'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#fee2e2'}
                        >
                          <FaTrash /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: UPLOAD MATERIAL */}
          {activeTab === 'upload' && (
            <div>
              <h2 style={{ color: '#1a365d', marginTop: 0, borderBottom: '3px solid #facc15', paddingBottom: '10px' }}>Push Content to Students</h2>
              
              <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
                <button onClick={() => setUploadType('note')} style={{ flex: 1, padding: '15px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: uploadType === 'note' ? '#1a365d' : '#f1f5f9', color: uploadType === 'note' ? 'white' : '#475569' }}>Upload PDF Note</button>
                <button onClick={() => setUploadType('video')} style={{ flex: 1, padding: '15px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: uploadType === 'video' ? '#1a365d' : '#f1f5f9', color: uploadType === 'video' ? 'white' : '#475569' }}>Publish Video Link</button>
              </div>

              {status === 'success' && <div style={{ backgroundColor: '#dcfce3', color: '#166534', padding: '15px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>Successfully published to student portal!</div>}

              <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {uploadType === 'video' ? (
                  <input type="url" placeholder="YouTube Video Link" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} required style={{ padding: '15px', borderRadius: '8px', border: '2px solid #e2e8f0' }} />
                ) : (
                  <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} required style={{ padding: '15px', borderRadius: '8px', border: '2px dashed #94a3b8', backgroundColor: '#f8fafc', cursor: 'pointer' }} />
                )}

                <button type="submit" disabled={status === 'uploading'} style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '18px', border: 'none', borderRadius: '8px', fontWeight: '900', fontSize: '18px', cursor: 'pointer', marginTop: '10px' }}>
                  {status === 'uploading' ? 'Publishing to Portal...' : `Publish ${uploadType === 'video' ? 'Video' : 'PDF'} Now`}
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: ADMISSION LEADS */}
          {activeTab === 'inquiries' && (
            <div>
              <h2 style={{ color: '#1a365d', marginTop: 0, borderBottom: '3px solid #facc15', paddingBottom: '10px' }}>Admission Inquiries</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                {inquiries.length === 0 ? (
                   <p style={{ color: '#64748b' }}>No admission inquiries yet.</p>
                ) : (
                  inquiries.map(lead => (
  <div key={lead._id} style={{ borderLeft: `5px solid ${lead.status === 'Admitted' ? '#10b981' : lead.status === 'Contacted' ? '#f59e0b' : '#3b82f6'}`, backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
    
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
        <h3 style={{ margin: 0, color: '#1e293b', fontSize: '20px' }}>{lead.name}</h3>
        <span style={{ backgroundColor: '#e2e8f0', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>
          {new Date(lead.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p style={{ margin: '0 0 5px 0', color: '#64748b' }}><strong>Phone:</strong> {lead.phone}</p>
      <p style={{ margin: 0, color: '#64748b' }}><strong>Course:</strong> {lead.course}</p>
    </div>

    {/* The Interactive CRM Status Dropdown */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <label style={{ fontWeight: 'bold', color: '#1a365d', fontSize: '14px' }}>Lead Status:</label>
      <select 
        value={lead.status || 'New'} 
        onChange={(e) => handleStatusUpdate(lead._id, e.target.value)}
        style={{ 
          padding: '10px 15px', 
          borderRadius: '8px', 
          border: '2px solid #e2e8f0', 
          fontWeight: 'bold', 
          cursor: 'pointer',
          backgroundColor: lead.status === 'Admitted' ? '#dcfce3' : lead.status === 'Contacted' ? '#fef3c7' : '#e0f2fe',
          color: lead.status === 'Admitted' ? '#166534' : lead.status === 'Contacted' ? '#d97706' : '#0284c7'
        }}
      >
        <option value="New">🔵 New Lead</option>
        <option value="Contacted">🟠 Contacted</option>
        <option value="Admitted">🟢 Admitted</option>
      </select>
    </div>

  </div>
))
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
