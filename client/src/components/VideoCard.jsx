import ReactPlayer from 'react-player/youtube';

export default function VideoCard({ video }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
      
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
      
      {/* Video Details */}
      <div style={{ padding: '15px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '10px' }}>
          <span style={{ backgroundColor: '#facc15', color: '#1a365d', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
            {video.subject}
          </span>
        </div>
        <h3 style={{ margin: '0 0 10px 0', color: '#1a365d', fontSize: '18px' }}>{video.title}</h3>
        <p style={{ fontSize: '14px', color: '#666', flexGrow: 1, margin: '0' }}>{video.description}</p>
      </div>
    </div>
  );
}