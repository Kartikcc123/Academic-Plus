import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import AdmissionModal from './components/AdmissionModal';
import PwaInstallPrompt from './components/PwaInstallPrompt';
import ScrollToTop from './components/ScrollToTop';
import { AdminRoute, StudentRoute } from './components/ProtectedRoute';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import SuccessStories from './pages/SuccessStories';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <PwaInstallPrompt />
        <AdmissionModal />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminLogin />} />

              <Route element={<StudentRoute />}>
                <Route path="/dashboard" element={<StudentDashboard />} />
              </Route>

              <Route element={<AdminRoute />}>
                <Route path="/admin/panel" element={<AdminPanel />} />
              </Route>
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
