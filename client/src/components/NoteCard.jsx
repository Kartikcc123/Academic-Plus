import { FaArrowRight, FaFilePdf } from 'react-icons/fa';

export default function NoteCard({ note, href }) {
  return (
    <article className="content-card">
      <div className="content-body">
        <div className="subject-chip">
          <FaFilePdf />
          {note.subject || 'General'}
        </div>
        <h3 style={{ marginTop: 16, marginBottom: 8 }}>{note.title}</h3>
        <p className="section-copy">{note.description || 'Study material uploaded for student access.'}</p>
        <a className="btn-secondary" href={href} target="_blank" rel="noopener noreferrer">
          View material
          <FaArrowRight />
        </a>
      </div>
    </article>
  );
}
