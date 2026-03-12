import { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  FaBookOpen,
  FaFilter,
  FaGraduationCap,
  FaLayerGroup,
  FaPlayCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import VideoCard from '../components/VideoCard';
import { API_BASE_URL } from '../lib/api';

export default function StudentDashboard() {
  const { user, logout } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState('videos');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const apiBaseUrl = API_BASE_URL;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError('');

        const config = {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        };

        const [videoRes, noteRes] = await Promise.all([
          axios.get('/api/videos', config),
          axios.get('/api/notes', config),
        ]);

        setVideos(videoRes.data);
        setNotes(noteRes.data);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load student content right now.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchContent();
    }
  }, [user]);

  const allCourses = useMemo(
    () => ['All', ...new Set([...videos.map((item) => item.subject), ...notes.map((item) => item.subject)])],
    [videos, notes],
  );

  const filteredVideos = selectedCourse === 'All'
    ? videos
    : videos.filter((item) => item.subject === selectedCourse);
  const filteredNotes = selectedCourse === 'All'
    ? notes
    : notes.filter((item) => item.subject === selectedCourse);

  const buildNoteUrl = (fileUrl) => {
    if (!fileUrl) return '#';
    const cleaned = fileUrl.trim().replace(/\\/g, '/');
    if (/^https?:\/\//i.test(cleaned)) return cleaned;
    const withSlash = cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
    return `${apiBaseUrl}${withSlash}`;
  };

  const stats = [
    { label: 'Recorded lectures', value: videos.length, icon: FaPlayCircle },
    { label: 'Study materials', value: notes.length, icon: FaBookOpen },
    { label: 'Subjects available', value: Math.max(allCourses.length - 1, 0), icon: FaLayerGroup },
  ];

  return (
    <div className="site-shell">
      <Navbar />

      <main className="section">
        <div className="container" style={{ display: 'grid', gap: 24 }}>
          <section className="dashboard-hero">
            <div className="dashboard-toolbar">
              <div>
                <span className="eyebrow">Student dashboard</span>
                <h1 className="section-title" style={{ marginTop: 18 }}>
                  Welcome back, {user?.name || 'Student'}
                </h1>
                <p className="section-copy" style={{ marginBottom: 0 }}>
                  Your learning area is now aligned with the upgraded site: cleaner navigation, better filtering, and a more professional study experience.
                </p>
              </div>
              <button className="btn-secondary" type="button" onClick={logout}>
                <FaSignOutAlt />
                Logout
              </button>
            </div>

            <div className="grid-3">
              {stats.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.label} className="dashboard-card">
                    <div className="icon-wrap">
                      <Icon />
                    </div>
                    <h3 style={{ marginTop: 16, marginBottom: 6 }}>{item.value}</h3>
                    <p className="section-copy" style={{ margin: 0 }}>{item.label}</p>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="dashboard-panel">
            <div className="dashboard-toolbar">
              <div className="filter-row">
                <button
                  type="button"
                  className={`filter-button${activeTab === 'videos' ? ' active' : ''}`}
                  onClick={() => setActiveTab('videos')}
                >
                  <FaPlayCircle />
                  Lectures
                </button>
                <button
                  type="button"
                  className={`filter-button${activeTab === 'notes' ? ' active' : ''}`}
                  onClick={() => setActiveTab('notes')}
                >
                  <FaBookOpen />
                  Materials
                </button>
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="field-label" style={{ margin: 0 }}>
                  <FaFilter style={{ marginRight: 8 }} />
                  Filter by subject
                </span>
                <select
                  className="field-control"
                  value={selectedCourse}
                  onChange={(event) => setSelectedCourse(event.target.value)}
                  style={{ minWidth: 220 }}
                >
                  {allCourses.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </label>
            </div>

            {loading ? <div className="empty-state">Loading learning content...</div> : null}
            {error ? <div className="status-message error">{error}</div> : null}

            {!loading && !error && activeTab === 'videos' ? (
              filteredVideos.length ? (
                <div className="content-grid">
                  {filteredVideos.map((video) => (
                    <article key={video._id} className="content-card">
                      <VideoCard video={video} />
                      <div className="content-body">
                        <div className="subject-chip">
                          <FaGraduationCap />
                          {video.subject || 'General'}
                        </div>
                        <h3 style={{ marginTop: 16, marginBottom: 8 }}>{video.title || 'Recorded lecture'}</h3>
                        <p className="section-copy" style={{ marginBottom: 0 }}>
                          {video.description || 'Recorded learning content published by the institute.'}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state">No recorded lectures are available for this subject yet.</div>
              )
            ) : null}

            {!loading && !error && activeTab === 'notes' ? (
              filteredNotes.length ? (
                <div className="content-grid">
                  {filteredNotes.map((note) => (
                    <NoteCard key={note._id} note={note} href={buildNoteUrl(note.fileUrl)} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">No study materials are available for this subject yet.</div>
              )
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
}
