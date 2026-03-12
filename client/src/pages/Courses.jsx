import { useDeferredValue, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { openAdmissionModal } from '../redux/uiSlice';
import { courseMetaIcons, programs } from '../data/siteContent';

const filters = ['All', 'Nursing', 'Paramedical', 'Pharmacy', 'Medical'];

export default function Courses() {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState('All');
  const deferredFilter = useDeferredValue(activeFilter);
  const DurationIcon = courseMetaIcons.duration;
  const EligibilityIcon = courseMetaIcons.eligibility;

  const filteredPrograms = deferredFilter === 'All'
    ? programs
    : programs.filter((item) => item.category === deferredFilter);

  return (
    <div className="site-shell">
      <Navbar />

      <main>
        <section className="section">
          <div className="container">
            <span className="eyebrow">Programs and pathways</span>
            <h1 className="display-title" style={{ marginTop: 18, fontSize: '4.6rem', maxWidth: 900 }}>
              Professional healthcare programs with clearer decision-making for students.
            </h1>
            <p className="lead" style={{ maxWidth: 760 }}>
              Each program card now reads like a professional offering instead of a generic list item. Students can compare pathways faster and move directly into inquiry.
            </p>
          </div>
        </section>

        <section className="section-tight">
          <div className="container">
            <div className="filter-row">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`filter-button${activeFilter === filter ? ' active' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container grid-3">
            {filteredPrograms.map((program) => {
              const Icon = program.icon;
              return (
                <article
                  key={program.id}
                  className="program-card"
                >
                  <div className="icon-wrap">
                    <Icon />
                  </div>
                  <div className="card-kicker" style={{ marginTop: 18 }}>{program.category}</div>
                  <h3 style={{ marginBottom: 10 }}>{program.title}</h3>
                  <p className="section-copy">{program.description}</p>
                  <ul className="meta-list" style={{ marginBottom: 22 }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <DurationIcon color="#b7792f" />
                      <span><strong>Duration:</strong> {program.duration}</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <EligibilityIcon color="#1f8f61" />
                      <span><strong>Eligibility:</strong> {program.eligibility}</span>
                    </li>
                  </ul>
                  <button className="btn" type="button" onClick={() => dispatch(openAdmissionModal())}>
                    Apply for this path
                    <FaArrowRight />
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
