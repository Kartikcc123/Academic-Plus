export default function NewsTicker() {
  const updates = [
    'Admissions open for the 2026 healthcare intake',
    'Career counseling available for nursing, paramedical, pharmacy, and FMGE pathways',
    'Interview and placement preparation built into the support model',
    'Parents can request direct callback support from the admissions desk',
  ];

  return (
    <section className="ticker" aria-label="Latest updates">
      <div className="ticker-track">
        {[...updates, ...updates].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}
