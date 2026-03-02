import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333' }}>
      {/* Navbar Area */}
      <header style={{ backgroundColor: '#1a365d', padding: '15px 30px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#facc15' }}>Academic Plus Institute</h1>
          <p style={{ margin: 0, fontSize: '12px', fontStyle: 'italic' }}>Under Tanishika Seva Sansthan</p>
        </div>
        <nav>
          <Link to="/login" style={{ color: 'white', marginRight: '15px', textDecoration: 'none', fontWeight: 'bold' }}>Student Login</Link>
          <Link to="/register" style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>Register</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: '#f0f4f8' }}>
        <h2 style={{ fontSize: '36px', color: '#1a365d', marginBottom: '10px' }}>Your Gateway to a Medical Career <br/><span style={{ color: '#dc2626' }}>Even Without NEET!</span></h2>
        <h3 style={{ fontSize: '28px', backgroundColor: '#facc15', display: 'inline-block', padding: '10px 20px', borderRadius: '10px' }}>ADMISSION OPEN 2025 - 2026</h3>
        <p style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '20px' }}>100% Job Placement & Internship Guaranty</p>
      </section>

      {/* Courses Grid */}
      <section style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#1a365d', marginBottom: '30px' }}>Courses Offered</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {/* Medical/Higher Courses */}
          <div style={{ border: '2px solid #1a365d', borderRadius: '8px', padding: '15px' }}>
            <h3 style={{ backgroundColor: '#1a365d', color: 'white', padding: '5px', textAlign: 'center', borderRadius: '4px' }}>Higher Courses</h3>
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center', fontWeight: 'bold' }}>
              <li>MBBS • BDS</li>
              <li>BAMS • BHMS</li>
              <li>BPT • BNYS</li>
            </ul>
          </div>

          {/* Nursing */}
          <div style={{ border: '2px solid #1a365d', borderRadius: '8px', padding: '15px' }}>
            <h3 style={{ backgroundColor: '#1a365d', color: 'white', padding: '5px', textAlign: 'center', borderRadius: '4px' }}>Nursing</h3>
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center', fontWeight: 'bold' }}>
              <li>ANM • GNM</li>
              <li>BSC Nursing</li>
              <li>MSC Nursing</li>
            </ul>
          </div>

          {/* Pharmacy */}
          <div style={{ border: '2px solid #1a365d', borderRadius: '8px', padding: '15px' }}>
            <h3 style={{ backgroundColor: '#1a365d', color: 'white', padding: '5px', textAlign: 'center', borderRadius: '4px' }}>Pharmacy</h3>
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center', fontWeight: 'bold' }}>
              <li>D. Pharmacy</li>
              <li>B. Pharmacy</li>
              <li>M. Pharmacy</li>
            </ul>
          </div>

          {/* Paramedical */}
          <div style={{ border: '2px solid #1a365d', borderRadius: '8px', padding: '15px' }}>
            <h3 style={{ backgroundColor: '#1a365d', color: 'white', padding: '5px', textAlign: 'center', borderRadius: '4px' }}>Paramedical</h3>
            <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>
              <li>Medical Laboratory (DMLT)</li>
              <li>Radiology Technician (DRT)</li>
              <li>Cardiac Care & Cath Lab</li>
              <li>Emergency & Trauma</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer & Contact */}
      <footer style={{ backgroundColor: '#1a365d', color: 'white', padding: '40px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          
          <div>
            <h3 style={{ color: '#facc15' }}>Contact Us</h3>
            <p><strong>Dr. Ajay Singh Amera (Director)</strong><br/>📞 9413669776</p>
            <p><strong>Dr. Chander Singh Gahlot</strong><br/>📞 9782975957</p>
            <p>✉️ jay001amera@gmail.com</p>
          </div>

          <div style={{ maxWidth: '300px' }}>
            <h3 style={{ color: '#facc15' }}>Visit Us</h3>
            <p>📍 5-R-40, RC Vyas,<br/>Near Mother Terassa School,<br/>Choti Puliya Road,<br/>Bhilwara (Rajasthan)</p>
          </div>

          <div>
            <h3 style={{ color: '#facc15' }}>Special Facilities</h3>
            <ul style={{ paddingLeft: '20px', fontSize: '14px' }}>
              <li>FMCGE Exam Selection Guaranty</li>
              <li>PhD Thesis & College Projects</li>
              <li>Medical Jobs Abroad</li>
              <li>Drug License & Registration Support</li>
            </ul>
          </div>

        </div>
        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '12px', borderTop: '1px solid #333', paddingTop: '10px' }}>
          &copy; {new Date().getFullYear()} Academic Plus Institute. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}