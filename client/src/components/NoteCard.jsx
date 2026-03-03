export default function NoteCard({ note }) {
  const baseUrl = import.meta.env.VITE_API_URL || "";
  const rawFileUrl = (note?.fileUrl || "").trim();
  const normalizedPath = rawFileUrl.replace(/\\/g, "/");
  const isExternalLink = /^https?:\/\//i.test(normalizedPath);
  const formattedPath = normalizedPath.startsWith("/")
    ? normalizedPath
    : `/${normalizedPath}`;
  const finalUrl = isExternalLink ? normalizedPath : `${baseUrl}${formattedPath}`;
  const hasValidLink = Boolean(rawFileUrl);

  return (
    <div>
      <a
        href={hasValidLink ? finalUrl : "#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (!hasValidLink) e.preventDefault();
        }}
        aria-disabled={!hasValidLink}
      >
        View Material
      </a>
    </div>
  );
}
