import ReactPlayer from 'react-player';

function normalizeYouTubeUrl(input) {
  if (!input) return '';

  const ytIdPattern = /^[a-zA-Z0-9_-]{11}$/;
  const getWatchUrl = (id) => `https://www.youtube.com/watch?v=${id}`;

  if (ytIdPattern.test(input)) return getWatchUrl(input);

  let value = input;
  if (!/^https?:\/\//i.test(value)) {
    value = `https://${value}`;
  }

  try {
    const parsed = new URL(value);
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      const id = parsed.pathname.split('/')[1];
      return ytIdPattern.test(id) ? getWatchUrl(id) : '';
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const v = parsed.searchParams.get('v');
      if (ytIdPattern.test(v || '')) return getWatchUrl(v);

      const parts = parsed.pathname.split('/').filter(Boolean);
      const index = ['embed', 'shorts', 'live'].includes(parts[0]) ? 1 : -1;
      const id = index > -1 ? parts[index] : '';
      return ytIdPattern.test(id) ? getWatchUrl(id) : '';
    }
  } catch {
    return '';
  }

  return '';
}

export default function VideoCard({ video }) {
  const finalUrl = normalizeYouTubeUrl((video?.youtubeLink || '').trim());

  if (!finalUrl || !ReactPlayer.canPlay(finalUrl)) {
    return <div className="empty-state">Video link unavailable.</div>;
  }

  return (
    <div className="player-shell">
      <ReactPlayer
        src={finalUrl}
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0 }}
        controls
        playing={false}
        playsInline
        config={{ youtube: { playerVars: { rel: 0, modestbranding: 1 } } }}
      />
    </div>
  );
}
