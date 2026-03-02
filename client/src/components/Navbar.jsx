import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const { user, admin, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // State for our hidden trigger
    const [clickCount, setClickCount] = useState(0);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // The Stealth Admin Trigger
    const handleSecretClick = (e) => {
        e.preventDefault(); // Prevent normal link navigation
        const newCount = clickCount + 1;
        setClickCount(newCount);

        if (newCount >= 5) {
            setClickCount(0); // Reset count
            navigate('/admin'); // Boom. Teleport to the hidden vault.
        }
    };

    // Reset the click count if they don't click fast enough (2.5 second window)
    useEffect(() => {
        let timeout;
        if (clickCount > 0 && clickCount < 5) {
            timeout = setTimeout(() => setClickCount(0), 2500);
        }
        return () => clearTimeout(timeout);
    }, [clickCount]);

    return (
        <header style={{ backgroundColor: '#1a365d', padding: '15px 30px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>

            {/* Brand Section with the Hidden Trigger! */}
            {/* Brand Section with the Hidden Trigger! */}
            <div>
                <Link
                    to="/"
                    onClick={handleSecretClick}
                    style={{
                        textDecoration: 'none',
                        // This part prevents the text selection problem:
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        msUserSelect: 'none',
                        MozUserSelect: 'none',
                        cursor: 'pointer' // Makes it clear it's clickable
                    }}
                >
                    <h1 style={{ margin: 0, fontSize: '24px', color: '#facc15' }}>
                        Academic Plus
                    </h1>
                </Link>
                <p style={{ margin: 0, fontSize: '12px', fontStyle: 'italic', color: '#e2e8f0' }}>
                    Under Tanishika Seva Sansthan
                </p>
            </div>

            {/* Navigation Links (Unchanged) */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {user ? (
                    <>
                        <span style={{ fontWeight: 'bold' }}>Hi, {user.name}</span>
                        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
                        <button onClick={handleLogout} style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
                    </>
                ) : admin ? (
                    <>
                        <span style={{ fontWeight: 'bold', color: '#facc15' }}>Admin Portal</span>
                        <Link to="/admin/panel" style={{ color: 'white', textDecoration: 'none' }}>Panel</Link>
                        <button onClick={handleLogout} style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Student Login</Link>
                        <Link to="/register" style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}