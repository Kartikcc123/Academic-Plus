import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import {
  FaBookOpen,
  FaFilter,
  FaGraduationCap,
  FaLayerGroup,
  FaPlayCircle,
  FaSignOutAlt,
  FaTrash,
} from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import VideoCard from '../components/VideoCard';
import { API_BASE_URL } from '../lib/api';

export default function StudentDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeTab, setActiveTab] = useState('videos');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Delete account state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

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
          api.get('/api/videos', config),
          api.get('/api/notes', config),
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
    // If it's already an external URL, return as-is
    if (/^https?:\/\//i.test(cleaned)) return cleaned;
    // Ensure it starts with /uploads/
    if (!cleaned.startsWith('/uploads/')) {
      return `/uploads/${cleaned}`;
    }
    return cleaned;
  };

  const stats = [
    { label: 'Recorded lectures', value: videos.length, icon: FaPlayCircle },
    { label: 'Study materials', value: notes.length, icon: FaBookOpen },
    { label: 'Subjects available', value: Math.max(allCourses.length - 1, 0), icon: FaLayerGroup },
  ];

  // Handle account deletion
  const handleDeleteAccount = async (event) => {
    event.preventDefault();
    setDeleteError('');
    setDeleting(true);

    if (!deletePassword) {
      setDeleteError('Password is required to delete account');
      setDeleting(false);
      return;
    }

    try {
      // Use api with correct request body for DELETE
      await api.delete('/api/auth/account', {
        data: { password: deletePassword },
        headers: { Authorization: `Bearer ${user?.token}` }
      });
      
      // Logout and redirect
      logout();
      navigate('/');
    } catch (error) {
      setDeleteError(error.response?.data?.message || 'Failed to delete account');
    } finally {
      setDeleting(false);
    }
  };

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
              <button 
                className="danger-button" 
                type="button" 
                onClick={() => setShowDeleteConfirm(true)}
              >
                <FaTrash />
                Delete My Account
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

          {/* Delete Account Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="modal-backdrop" onClick={() => setShowDeleteConfirm(false)}>
              <div className="modal-card" onClick={(event) => event.stopPropagation()}>
                <div style={{ textAlign: 'center' }}>
                  <FaTrash size={40} color="#dc2626" style={{ marginBottom: 16 }} />
                  <h2 style={{ marginBottom: 16 }}>Delete My Account</h2>
                  <p className="section-copy" style={{ marginBottom: 24 }}>
                    Are you sure you want to delete your account? This action cannot be undone.
                  </p>
                  
                  {deleteError ? (
                    <div className="status-message error" style={{ marginBottom: 16 }}>
                      {deleteError}
                    </div>
                  ) : null}

                  <form onSubmit={handleDeleteAccount}>
                    <div style={{ marginBottom: 16 }}>
                      <label className="field-label" htmlFor="delete-password">
                        Enter your password to confirm deletion
                      </label>
                      <input
                        id="delete-password"
                        className="field-control"
                        type="password"
                        value={deletePassword}
                        onChange={(event) => setDeletePassword(event.target.value)}
                        placeholder="Your password"
                        required
                      />
                    </div>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                      <button 
                        className="danger-button" 
                        type="submit" 
                        disabled={deleting}
                      >
                        {deleting ? 'Deleting...' : 'Delete My Account'}
                      </button>
                      <button 
                        className="btn-secondary" 
                        type="button" 
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          setDeletePassword('');
                          setDeleteError('');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
