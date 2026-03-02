export default function NoteCard({ note }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', borderLeft: '5px solid #1a365d', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ marginBottom: '10px' }}>
        <span style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
          {note.subject}
        </span>
      </div>
      
      <h3 style={{ margin: '0 0 10px 0', color: '#1a365d', fontSize: '18px' }}>{note.title}</h3>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px', flexGrow: 1 }}>{note.description}</p>
      
      <a 
        href={note.fileUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{ display: 'inline-block', backgroundColor: '#1a365d', color: 'white', padding: '10px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px', textAlign: 'center' }}
      >
        View / Download PDF
      </a>
    </div>
  );
}