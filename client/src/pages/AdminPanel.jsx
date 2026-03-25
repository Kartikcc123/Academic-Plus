import { useContext, useEffect, useMemo, useState } from 'react';
import api from '../lib/api';
import {
  FaBookOpen,
  FaChartLine,
  FaCheckCircle,
  FaClipboardList,
  FaFilePdf,
  FaKey,
  FaLayerGroup,
  FaPlayCircle,
  FaSearch,
  FaShieldAlt,
  FaTimesCircle,
  FaTrash,
  FaUpload,
  FaUserGraduate,
  FaUserSecret,
} from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const initialForm = {
  title: '',
  subject: '',
  description: '',
  link: '',
};

const tabItems = [
  { id: 'overview', label: 'Overview', icon: FaChartLine },
  { id: 'students', label: 'Students', icon: FaUserGraduate },
  { id: 'content', label: 'Content library', icon: FaLayerGroup },
  { id: 'upload', label: 'Publish content', icon: FaUpload },
  { id: 'inquiries', label: 'Admission leads', icon: FaClipboardList },
  { id: 'password', label: 'Change Password', icon: FaKey },
  { id: 'admins', label: 'Manage Admins', icon: FaShieldAlt },
];

export default function AdminPanel() {
  const { admin } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [students, setStudents] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [videos, setVideos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [uploadType, setUploadType] = useState('video');
  const [noteSourceType, setNoteSourceType] = useState('file');
  const [formData, setFormData] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Password change state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Admin access management state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const authConfig = useMemo(
    () => ({ headers: { Authorization: `Bearer ${admin?.token}` } }),
    [admin],
  );

  useEffect(() => {
    const fetchAllData = async () => {
      if (!admin?.token) return;

      try {
        setLoading(true);
        const [studentRes, inquiryRes, videoRes, noteRes] = await Promise.all([
          api.get('/api/admin/students', authConfig),
          api.get('/api/inquiries', authConfig),
          api.get('/api/videos', authConfig),
          api.get('/api/notes', authConfig),
        ]);

        setStudents(studentRes.data);
        setInquiries(inquiryRes.data);
        setVideos(videoRes.data);
        setNotes(noteRes.data);
      } catch (error) {
        setStatus({
          type: 'error',
          message: error.response?.data?.message || 'Unable to load admin data.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [admin, authConfig]);

  const resetUploadForm = () => {
    setFormData(initialForm);
    setFile(null);
  };

  const handleUploadSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    try {
      if (uploadType === 'video') {
        const payload = {
          title: formData.title,
          subject: formData.subject,
          description: formData.description,
          youtubeLink: formData.link,
        };
        const response = await api.post('/api/videos', payload, authConfig);
        setVideos((current) => [response.data.video, ...current]);
      } else if (noteSourceType === 'link') {
        const payload = {
          title: formData.title,
          subject: formData.subject,
          description: formData.description,
          fileUrl: formData.link,
        };
        const response = await api.post('/api/notes', payload, authConfig);
        setNotes((current) => [response.data.note, ...current]);
      } else {
        const noteData = new FormData();
        if (formData.title) noteData.append('title', formData.title);
        if (formData.subject) noteData.append('subject', formData.subject);
        if (formData.description) noteData.append('description', formData.description);
        if (file) noteData.append('pdfFile', file);

        const response = await api.post('/api/notes/upload', noteData, {
          headers: { ...authConfig.headers, 'Content-Type': 'multipart/form-data' },
        });
        setNotes((current) => [response.data.note, ...current]);
      }

      setStatus({ type: 'success', message: 'Content published successfully.' });
      resetUploadForm();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Publishing failed. Please review the form and try again.',
      });
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm('Delete this student permanently?')) return;

    try {
      await api.delete(`/api/admin/students/${studentId}`, authConfig);
      setStudents((current) => current.filter((student) => student._id !== studentId));
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Unable to delete student.',
      });
    }
  };

  const handlePortalAccessToggle = async (studentId, portalAccess) => {
    if (!studentId) {
      setStatus({ type: 'error', message: 'Invalid student ID' });
      return;
    }
    
    try {
      console.log('Granting portal access:', { studentId, portalAccess });
      const response = await api.patch(
        `/api/admin/students/${studentId}/portal-access`,
        { portalAccess },
        authConfig,
      );

      console.log('Response:', response.data);

      setStudents((current) => current.map((student) => (
        student._id === studentId ? response.data.student : student
      )));

      setStatus({
        type: 'success',
        message: `Portal access ${portalAccess ? 'granted' : 'revoked'} successfully.`,
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Unable to update portal access.',
      });
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Delete this note from the portal?')) return;

    try {
      await api.delete(`/api/notes/${noteId}`, authConfig);
      setNotes((current) => current.filter((note) => note._id !== noteId));
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Unable to delete note.',
      });
    }
  };

  const handleStatusUpdate = async (inquiryId, newStatus) => {
    try {
      await api.put(`/api/inquiries/${inquiryId}`, { status: newStatus }, authConfig);
      setInquiries((current) => current.map((lead) => (
        lead._id === inquiryId ? { ...lead, status: newStatus } : lead
      )));
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Unable to update lead status.',
      });
    }
  };

  // Password change handler
  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', message: 'New passwords do not match' });
      return;
    }

    if (newPassword.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    try {
      await api.put('/api/admin/change-password', {
        currentPassword,
        newPassword,
        confirmPassword
      }, authConfig);

      setStatus({ type: 'success', message: 'Password changed successfully' });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to change password' });
    }
  };

  // Search users handler
  const handleSearchUsers = async () => {
    if (!searchQuery.trim()) return;

    setSearching(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await api.get(`/api/admin/search-users?query=${encodeURIComponent(searchQuery)}`, authConfig);
      setSearchResults(response.data);
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Search failed' });
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  // Grant admin access handler
  const handleGrantAdmin = async (userId) => {
    try {
      await api.put('/api/admin/grant-admin', { userId }, authConfig);
      setStatus({ type: 'success', message: 'Admin access granted successfully' });
      setSearchResults([]);
      setSearchQuery('');
      // Refresh admins list
      const response = await api.get('/api/admin/admins', authConfig);
      setAdmins(response.data);
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to grant admin access' });
    }
    setConfirmAction(null);
  };

  // Revoke admin access handler
  const handleRevokeAdmin = async (adminId) => {
    try {
      await api.put('/api/admin/revoke-admin', { adminId }, authConfig);
      setStatus({ type: 'success', message: 'Admin access revoked successfully' });
      // Refresh admins list
      const response = await api.get('/api/admin/admins', authConfig);
      setAdmins(response.data);
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to revoke admin access' });
    }
    setConfirmAction(null);
  };

  // Load admins on mount
  useEffect(() => {
    const fetchAdmins = async () => {
      if (!admin?.token) return;
      try {
        const response = await api.get('/api/admin/admins', authConfig);
        setAdmins(response.data);
      } catch (error) {
        console.error('Failed to fetch admins:', error);
      }
    };
    fetchAdmins();
  }, [admin, authConfig]);

  const metrics = [
    { label: 'Students', value: students.length, icon: FaUserGraduate },
    { label: 'Leads', value: inquiries.length, icon: FaClipboardList },
    { label: 'Videos', value: videos.length, icon: FaPlayCircle },
    { label: 'Notes', value: notes.length, icon: FaFilePdf },
  ];

  const leadStatusClass = (statusValue) => {
    if (statusValue === 'Admitted') return 'status-chip';
    if (statusValue === 'Contacted') return 'status-chip warn';
    return 'status-chip info';
  };

  return (
    <div className="site-shell">
      <Navbar />

      <main className="section">
        <div className="container" style={{ display: 'grid', gap: 24 }}>
          <section className="dashboard-hero">
            <div className="dashboard-toolbar">
              <div>
                <span className="eyebrow">Admin control center</span>
                <h1 className="section-title" style={{ marginTop: 18 }}>
                  Academic Plus director panel
                </h1>
                <p className="section-copy" style={{ marginBottom: 0 }}>
                  The admin side now matches the upgraded site, with cleaner navigation, better publishing workflows, and in-place updates instead of hard reloads.
                </p>
              </div>
            </div>

            <div className="grid-4">
              {metrics.map((item) => {
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

          {status.message ? (
            <div className={`status-message ${status.type === 'error' ? 'error' : 'success'}`}>
              {status.message}
            </div>
          ) : null}

          <section className="dashboard-grid">
            <aside className="dashboard-sidebar">
              {tabItems.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`dashboard-tab${activeTab === tab.id ? ' active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <Icon />
                    {tab.label}
                  </button>
                );
              })}
            </aside>

            <div className="dashboard-panel">
              {loading ? <div className="empty-state">Loading admin data...</div> : null}

              {!loading && activeTab === 'overview' ? (
                <div style={{ display: 'grid', gap: 20 }}>
                  <div className="grid-3">
                    <article className="dashboard-card">
                      <div className="card-kicker">Student activity</div>
                      <h3>Registered learners</h3>
                      <p className="section-copy" style={{ marginBottom: 0 }}>
                        {students.length} students currently have portal access.
                      </p>
                    </article>
                    <article className="dashboard-card">
                      <div className="card-kicker">Admissions funnel</div>
                      <h3>Lead tracking</h3>
                      <p className="section-copy" style={{ marginBottom: 0 }}>
                        {inquiries.filter((lead) => lead.status === 'New' || !lead.status).length} new leads require review.
                      </p>
                    </article>
                    <article className="dashboard-card">
                      <div className="card-kicker">Content library</div>
                      <h3>Published resources</h3>
                      <p className="section-copy" style={{ marginBottom: 0 }}>
                        {videos.length + notes.length} total learning assets are available to students.
                      </p>
                    </article>
                  </div>
                </div>
              ) : null}

              {!loading && activeTab === 'students' ? (
                <div className="table-card">
                  <div className="dashboard-toolbar">
                    <div>
                      <div className="card-kicker">Student management</div>
                      <h2 style={{ margin: '8px 0 0' }}>Registered students</h2>
                    </div>
                  </div>
                  <div className="table-wrap">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Portal access</th>
                          <th>Joined</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                              <span className={student.portalAccess ? 'status-chip' : 'status-chip warn'}>
                                {student.portalAccess ? 'Approved' : 'Pending'}
                              </span>
                            </td>
                            <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                            <td>
                              <div className="inline-actions">
                                <button
                                  type="button"
                                  className="secondary-button"
                                  onClick={() => handlePortalAccessToggle(student._id, !student.portalAccess)}
                                >
                                  {student.portalAccess ? <FaTimesCircle /> : <FaCheckCircle />}
                                  {' '}
                                  {student.portalAccess ? 'Revoke access' : 'Grant access'}
                                </button>
                                <button
                                  type="button"
                                  className="danger-button"
                                  onClick={() => handleDeleteStudent(student._id)}
                                >
                                  <FaTrash />
                                  {' '}
                                  Remove
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}

              {!loading && activeTab === 'content' ? (
                <div style={{ display: 'grid', gap: 24 }}>
                  <div>
                    <div className="card-kicker">Video library</div>
                    <h2 style={{ margin: '8px 0 18px' }}>Published lectures</h2>
                    <div className="content-grid">
                      {videos.map((video) => (
                        <article key={video._id} className="content-card">
                          <div className="content-body">
                            <div className="subject-chip">{video.subject || 'General'}</div>
                            <h3 style={{ marginTop: 16 }}>{video.title || 'Video lecture'}</h3>
                            <p className="section-copy" style={{ marginBottom: 0 }}>
                              {video.description || 'Published learning video.'}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="card-kicker">Notes library</div>
                    <h2 style={{ margin: '8px 0 18px' }}>Published materials</h2>
                    <div className="content-grid">
                      {notes.map((note) => (
                        <article key={note._id} className="content-card">
                          <div className="content-body">
                            <div className="subject-chip">{note.subject || 'General'}</div>
                            <h3 style={{ marginTop: 16 }}>{note.title || 'Study material'}</h3>
                            <p className="section-copy">{note.description || 'Published note for student access.'}</p>
                            <button type="button" className="danger-button" onClick={() => handleDeleteNote(note._id)}>
                              <FaTrash />
                              {' '}
                              Delete note
                            </button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {!loading && activeTab === 'upload' ? (
                <div className="table-card">
                  <div className="card-kicker">Publishing workflow</div>
                  <h2 style={{ margin: '8px 0 18px' }}>Push content to the student portal</h2>

                  <div className="filter-row" style={{ marginBottom: 18 }}>
                    <button
                      type="button"
                      className={`filter-button${uploadType === 'video' ? ' active' : ''}`}
                      onClick={() => setUploadType('video')}
                    >
                      <FaPlayCircle />
                      Video
                    </button>
                    <button
                      type="button"
                      className={`filter-button${uploadType === 'note' ? ' active' : ''}`}
                      onClick={() => setUploadType('note')}
                    >
                      <FaBookOpen />
                      Note
                    </button>
                  </div>

                  {uploadType === 'note' ? (
                    <div className="filter-row" style={{ marginBottom: 18 }}>
                      <button
                        type="button"
                        className={`filter-button${noteSourceType === 'file' ? ' active' : ''}`}
                        onClick={() => setNoteSourceType('file')}
                      >
                        Upload PDF
                      </button>
                      <button
                        type="button"
                        className={`filter-button${noteSourceType === 'link' ? ' active' : ''}`}
                        onClick={() => setNoteSourceType('link')}
                      >
                        External link
                      </button>
                    </div>
                  ) : null}

                  <form className="form-grid" onSubmit={handleUploadSubmit}>
                    <div>
                      <label className="field-label" htmlFor="content-title">Title</label>
                      <input
                        id="content-title"
                        className="field-control"
                        value={formData.title ?? ''}
                        onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))}
                        placeholder={uploadType === 'video' ? 'Lecture title' : 'Material title'}
                      />
                    </div>
                    <div>
                      <label className="field-label" htmlFor="content-subject">Subject</label>
                      <input
                        id="content-subject"
                        className="field-control"
                        value={formData.subject ?? ''}
                        onChange={(event) => setFormData((current) => ({ ...current, subject: event.target.value }))}
                        placeholder="Subject or course name"
                      />
                    </div>
                    <div>
                      <label className="field-label" htmlFor="content-description">Description</label>
                      <textarea
                        id="content-description"
                        className="field-control"
                        value={formData.description ?? ''}
                        onChange={(event) => setFormData((current) => ({ ...current, description: event.target.value }))}
                        rows="4"
                        placeholder="Short summary for students"
                      />
                    </div>

                    {uploadType === 'video' || noteSourceType === 'link' ? (
                      <div>
                        <label className="field-label" htmlFor="content-link">
                          {uploadType === 'video' ? 'YouTube link' : 'File URL'}
                        </label>
                        <input
                          id="content-link"
                          className="field-control"
                          type="url"
                          value={formData.link ?? ''}
                          onChange={(event) => setFormData((current) => ({ ...current, link: event.target.value }))}
                          required
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="field-label" htmlFor="content-file">PDF file</label>
                        <input
                          id="content-file"
                          className="field-control"
                          type="file"
                          accept="application/pdf"
                          onChange={(event) => setFile(event.target.files?.[0] || null)}
                          required
                        />
                      </div>
                    )}

                    <button className="btn" type="submit">
                      Publish now
                    </button>
                  </form>
                </div>
              ) : null}

              {!loading && activeTab === 'inquiries' ? (
                <div style={{ display: 'grid', gap: 16 }}>
                  {inquiries.length ? inquiries.map((lead) => (
                    <article key={lead._id} className="dashboard-card">
                      <div className="dashboard-toolbar">
                        <div>
                          <h3 style={{ margin: 0 }}>{lead.name}</h3>
                          <p className="section-copy" style={{ margin: '8px 0 0' }}>
                            {lead.phone}
                            {' | '}
                            {lead.course}
                          </p>
                        </div>
                        <span className={leadStatusClass(lead.status || 'New')}>
                          {lead.status || 'New'}
                        </span>
                      </div>
                      <div className="inline-actions">
                        <select
                          className="field-control"
                          value={lead.status || 'New'}
                          onChange={(event) => handleStatusUpdate(lead._id, event.target.value)}
                          style={{ maxWidth: 220 }}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Admitted">Admitted</option>
                        </select>
                      </div>
                    </article>
                  )) : <div className="empty-state">No admission inquiries yet.</div>}
                </div>
              ) : null}

              {/* Password Change Tab */}
              {!loading && activeTab === 'password' ? (
                <div className="table-card">
                  <div className="card-kicker">Security</div>
                  <h2 style={{ margin: '8px 0 18px' }}>Change Your Password</h2>
                  
                  <form className="form-grid" onSubmit={handlePasswordChange}>
                    <div>
                      <label className="field-label" htmlFor="current-password">Current Password</label>
                      <input
                        id="current-password"
                        className="field-control"
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="field-label" htmlFor="new-password">New Password</label>
                      <input
                        id="new-password"
                        className="field-control"
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="field-label" htmlFor="confirm-password">Confirm New Password</label>
                      <input
                        id="confirm-password"
                        className="field-control"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(event) => setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                        required
                      />
                    </div>
                    <button className="btn" type="submit">Update Password</button>
                  </form>
                </div>
              ) : null}

              {/* Admin Management Tab */}
              {!loading && activeTab === 'admins' ? (
                <div style={{ display: 'grid', gap: 24 }}>
                  {/* Search Users Section */}
                  <div className="table-card">
                    <div className="card-kicker">Grant Admin Access</div>
                    <h2 style={{ margin: '8px 0 18px' }}>Search Users to Promote</h2>
                    
                    <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
                      <input
                        className="field-control"
                        type="text"
                        placeholder="Search by email or name..."
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        onKeyPress={(event) => event.key === 'Enter' && handleSearchUsers()}
                      />
                      <button className="btn" type="button" onClick={handleSearchUsers} disabled={searching}>
                        <FaSearch />
                        {searching ? 'Searching...' : 'Search'}
                      </button>
                    </div>

                    {searchResults.length > 0 && (
                      <div className="table-wrap">
                        <table className="data-table">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {searchResults.map((user) => (
                              <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                  {confirmAction?.type === 'grant' && confirmAction?.id === user._id ? (
                                    <div style={{ display: 'flex', gap: 8 }}>
                                      <button
                                        className="btn"
                                        type="button"
                                        onClick={() => handleGrantAdmin(user._id)}
                                      >
                                        Confirm
                                      </button>
                                      <button
                                        className="btn-secondary"
                                        type="button"
                                        onClick={() => setConfirmAction(null)}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      className="secondary-button"
                                      type="button"
                                      onClick={() => setConfirmAction({ type: 'grant', id: user._id })}
                                    >
                                      <FaUserSecret />
                                      Make Admin
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Current Admins Section */}
                  <div className="table-card">
                    <div className="card-kicker">Current Administrators</div>
                    <h2 style={{ margin: '8px 0 18px' }}>Manage Existing Admins</h2>
                    
                    <div className="table-wrap">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Joined</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {admins.map((adminUser) => (
                            <tr key={adminUser._id}>
                              <td>{adminUser.name}</td>
                              <td>{adminUser.email}</td>
                              <td>{new Date(adminUser.createdAt).toLocaleDateString()}</td>
                              <td>
                                {confirmAction?.type === 'revoke' && confirmAction?.id === adminUser._id ? (
                                  <div style={{ display: 'flex', gap: 8 }}>
                                    <button
                                      className="danger-button"
                                      type="button"
                                      onClick={() => handleRevokeAdmin(adminUser._id)}
                                    >
                                      Confirm Revoke
                                    </button>
                                    <button
                                      className="btn-secondary"
                                      type="button"
                                      onClick={() => setConfirmAction(null)}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : adminUser._id !== admin?._id ? (
                                  <button
                                    className="danger-button"
                                    type="button"
                                    onClick={() => setConfirmAction({ type: 'revoke', id: adminUser._id })}
                                  >
                                    <FaTrash />
                                    Revoke Access
                                  </button>
                                ) : (
                                  <span className="section-copy">Current Session</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
