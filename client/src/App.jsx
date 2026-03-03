import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StudentRoute, AdminRoute } from './components/ProtectedRoute';

// Import all the pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import About from './pages/About';
import SuccessStories from './pages/SuccessStories';
import Footer from './components/Footer';

// 🚨 1. IMPORT THE MODAL HERE 🚨
import AdmissionModal from './components/AdmissionModal';

function App() {
  return (
    <AuthProvider>
      <Router>
        
        {/* 🚨 2. RENDER THE MODAL HERE SO IT LISTENS TO EVERY PAGE 🚨 */}
        <AdmissionModal />
        
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          <div style={{ flex: 1 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/admin" element={<AdminLogin />} />

              {/* Protected Student Routes */}
              <Route element={<StudentRoute />}>
                <Route path="/dashboard" element={<StudentDashboard />} />
              </Route>
              
              {/* Protected Admin Routes */}
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