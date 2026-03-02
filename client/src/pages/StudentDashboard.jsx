import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ReactPlayer from 'react-player'; // Lightweight import just for YouTube

export default function StudentDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState('videos'); // 'videos' or 'notes'
  const [selectedCourse, setSelectedCourse] = useState('All');

  // Fetch data when the dashboard loads
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };

        // Fetch both videos and notes from our locked backend routes
        const videoRes = await axios.get('/api/videos', config);
        const noteRes = await axios.get('/api/notes', config);

        setVideos(videoRes.data);
        setNotes(noteRes.data);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    if (user) {
      fetchContent();
    }
  }, [user]);

  // Extract all unique courses/subjects dynamically so the dropdown populates automatically
  const allCourses = ['All', ...new Set([...videos.map(v => v.subject), ...notes.map(n => n.subject)])];

  // Filter content based on the selected dropdown
  const filteredVideos = selectedCourse === 'All' ? videos : videos.filter(v => v.subject === selectedCourse);
  const filteredNotes = selectedCourse === 'All' ? notes : notes.filter(n => n.subject === selectedCourse);

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh', paddingBottom: '40px' }}>
      
      {/* Dashboard Header */}
      <header style={{ backgroundColor: '#1a365d', padding: '15px 30px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', color: '#facc15' }}>Academic Plus Portal</h1>
          <p style={{ margin: 0, fontSize: '14px' }}>Welcome back, {user?.name}</p>
        </div>
        <button 
          onClick={logout} 
          style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Logout
        </button>
      </header>

      {/* Controls: Tabs & Filters */}
      <div style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        
        {/* Toggle Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('videos')}
            style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeTab === 'videos' ? '#1a365d' : '#ccc', color: activeTab === 'videos' ? 'white' : '#333' }}
          >
            ▶ Recorded Lectures
          </button>
          <button 
            onClick={() => setActiveTab('notes')}
            style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeTab === 'notes' ? '#1a365d' : '#ccc', color: activeTab === 'notes' ? 'white' : '#333' }}
          >
            📄 Study Materials
          </button>
        </div>

        {/* Course Filter Dropdown */}
        <div>
          <label style={{ fontWeight: 'bold', marginRight: '10px', color: '#1a365d' }}>Filter by Course:</label>
          <select 
            value={selectedCourse} 
            onChange={(e) => setSelectedCourse(e.target.value)}
            style={{ padding: '8px', borderRadius: '5px', border: '1px solid #1a365d' }}
          >
            {allCourses.map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Video Grid */}
        {activeTab === 'videos' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredVideos.length === 0 ? <p>No lectures available for this course yet.</p> : null}
            
            {filteredVideos.map((video) => (
              <div key={video._id} style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                {/* Responsive Player Wrapper */}
                <div style={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
                  <ReactPlayer 
                    url={video.youtubeLink} 
                    width="100%" 
                    height="100%" 
                    style={{ position: 'absolute', top: 0, left: 0 }} 
                    controls={true}
                  />
                </div>
                <div style={{ padding: '15px' }}>
                  <span style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{video.subject}</span>
                  <h3 style={{ margin: '10px 0', color: '#1a365d' }}>{video.title}</h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notes Grid */}
        {activeTab === 'notes' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {filteredNotes.length === 0 ? <p>No notes available for this course yet.</p> : null}

            {filteredNotes.map((note) => (
              <div key={note._id} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', borderLeft: '5px solid #1a365d', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <span style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{note.subject}</span>
                <h3 style={{ margin: '10px 0', color: '#1a365d' }}>{note.title}</h3>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>{note.description}</p>
                <a 
                  href={note.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', backgroundColor: '#1a365d', color: 'white', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}
                >
                  View / Download PDF
                </a>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}