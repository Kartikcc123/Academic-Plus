import ReactPlayer from "react-player";

export default function VideoCard({ video }) {
  const rawUrl = (video?.youtubeLink || "").trim();

  const normalizeYouTubeUrl = (input) => {
    if (!input) return "";

    const ytIdPattern = /^[a-zA-Z0-9_-]{11}$/;
    const getEmbedUrl = (id) => `https://www.youtube.com/embed/${id}`;

    if (ytIdPattern.test(input)) return getEmbedUrl(input);

    let value = input;
    if (!/^https?:\/\//i.test(value)) {
      value = `https://${value}`;
    }

    try {
      const parsed = new URL(value);
      const host = parsed.hostname.replace(/^www\./, "");

      if (host === "youtu.be") {
        const id = parsed.pathname.split("/")[1];
        return ytIdPattern.test(id) ? getEmbedUrl(id) : "";
      }

      if (host === "youtube.com" || host === "m.youtube.com") {
        const v = parsed.searchParams.get("v");
        if (ytIdPattern.test(v || "")) return getEmbedUrl(v);

        const parts = parsed.pathname.split("/").filter(Boolean);
        const index = ["embed", "shorts", "live"].includes(parts[0]) ? 1 : -1;
        const id = index > -1 ? parts[index] : "";
        if (ytIdPattern.test(id)) return getEmbedUrl(id);
      }
    } catch {
      return "";
    }

    return "";
  };

  const finalUrl = normalizeYouTubeUrl(rawUrl);

  if (!finalUrl || !ReactPlayer.canPlay(finalUrl)) {
    return <p>Video link unavailable.</p>;
  }

  return (
    <div style={{ position: "relative", paddingTop: "56.25%" }}>
      <ReactPlayer
        src={finalUrl}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
        controls
        playing={false}
        playsInline
        config={{ youtube: { playerVars: { rel: 0, modestbranding: 1 } } }}
      />
    </div>
  );
}
