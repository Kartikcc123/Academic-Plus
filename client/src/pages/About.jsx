import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { capabilityCards, timeline, trustMetrics } from '../data/siteContent';

export default function About() {
  const animRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove('opacity-0', 'translate-y-6');
            e.target.classList.add('opacity-100', 'translate-y-0');
          }
        }),
      { threshold: 0.12 }
    );
    animRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !animRefs.current.includes(el)) animRefs.current.push(el);
  };

  return (
    <div className="bg-[#f9f7f4] min-h-screen text-[#2d2d2d]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pb-24">

        {/* ════════════════════════════
            PRINCIPAL MESSAGE
        ════════════════════════════ */}
        <section className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 md:gap-12 py-16 border-b border-[#e0d8cf]">

          {/* Image with gold border frame */}
          <div
            ref={addRef}
            className="relative opacity-0 translate-y-6 transition-all duration-700"
          >
            <div className="absolute -top-2 -left-2 right-2 bottom-2 border-2 border-[#c9a84c] rounded-sm z-0" />
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
              alt="Principal"
              className="relative z-10 w-full h-72 object-cover rounded-sm"
            />
          </div>

          {/* Text content */}
          <div
            ref={addRef}
            className="opacity-0 translate-y-6 transition-all duration-700 delay-150 pt-1"
          >
            <span className="font-serif text-[64px] leading-none text-[#c9a84c] block -ml-1 -mb-2">
              "
            </span>
            <h2 className="font-serif text-2xl font-semibold text-[#1a1a1a] mt-2 mb-5">
              Message from the Principal
            </h2>
            <p className="text-sm leading-7 text-[#444] italic mb-4">
              "At Academic Plus, we believe that education is not just about academic excellence,
              but also character building. Our mission is to nurture young minds to become global
              citizens who are compassionate, innovative, and resilient."
            </p>
            <p className="text-sm leading-7 text-[#555] mb-6">
              We provide an environment where every student is encouraged to discover their unique
              potential. With our state-of-the-art facilities, dedicated faculty, and global
              standards, we ensure that our students are well-prepared for the challenges of tomorrow.
            </p>
            <p className="font-serif font-bold text-[#1a1a1a] text-base mb-0.5">Dr. Sarah Jenkins</p>
            <p className="text-xs font-bold tracking-wide text-[#c9a84c]">Principal, Academic Plus</p>
            <p className="text-xs text-[#888] mt-0.5">Ph.D. in Education Leadership</p>
          </div>
        </section>

        {/* ════════════════════════════
            TRUST METRICS
        ════════════════════════════ */}
        <section className="py-14 border-b border-[#e0d8cf]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {trustMetrics.map((item, i) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.label}
                  ref={addRef}
                  className="opacity-0 translate-y-6 transition-all duration-700 bg-[#1a1a2e] rounded-xl p-8 text-center hover:-translate-y-1 hover:shadow-2xl cursor-default"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 text-[#fff4e6]">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-serif text-4xl font-bold text-[#fff4e6] mb-1">{item.value}</h3>
                  <p className="text-xs text-[#aaa8c0] m-0">{item.label}</p>
                </article>
              );
            })}
          </div>
        </section>

        {/* ════════════════════════════
            LEGACY / TIMELINE
        ════════════════════════════ */}
        <section className="py-16 border-b border-[#e0d8cf]">

          {/* Section header */}
          <div
            ref={addRef}
            className="opacity-0 translate-y-6 transition-all duration-700 text-center mb-12"
          >
            <span className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[#c9a84c] block mb-2">
              How the institute grew
            </span>
            <h2 className="font-serif text-3xl font-semibold text-[#1a1a1a] mb-2">Our Legacy</h2>
            <p className="text-sm text-[#777]">
              Over two decades of dedication to academic excellence and holistic development.
            </p>
          </div>

          {/* Alternating timeline */}
          <div className="relative">
            {/* vertical center line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#c9a84c] via-[#e8d9a0] to-[#c9a84c]" />

            {timeline.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={item.year}
                  ref={addRef}
                  className="opacity-0 translate-y-6 transition-all duration-700 mb-8"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  {/* Desktop alternating layout */}
                  <div className="hidden md:grid grid-cols-[1fr_48px_1fr] items-center">
                    {isLeft ? (
                      <>
                        {/* Left card */}
                        <div className="bg-white border border-[#ede5d8] rounded-md p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-right">
                          <p className="text-[0.65rem] font-bold tracking-widest uppercase text-[#c9a84c] mb-1">{item.year}</p>
                          <div className="flex justify-end mb-2 text-[#c9a84c]"><Icon size={18} /></div>
                          <h3 className="font-serif text-base font-semibold text-[#1a1a1a] mb-2">{item.title}</h3>
                          <p className="text-xs leading-relaxed text-[#666] m-0">{item.description}</p>
                        </div>
                        {/* Dot */}
                        <div className="flex justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#c9a84c] flex items-center justify-center z-10 ring-[6px] ring-[#f9f7f4]">
                            <span className="text-white text-xs font-bold">{i + 1}</span>
                          </div>
                        </div>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        {/* Dot */}
                        <div className="flex justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#c9a84c] flex items-center justify-center z-10 ring-[6px] ring-[#f9f7f4]">
                            <span className="text-white text-xs font-bold">{i + 1}</span>
                          </div>
                        </div>
                        {/* Right card */}
                        <div className="bg-white border border-[#ede5d8] rounded-md p-5 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                          <p className="text-[0.65rem] font-bold tracking-widest uppercase text-[#c9a84c] mb-1">{item.year}</p>
                          <div className="mb-2 text-[#c9a84c]"><Icon size={18} /></div>
                          <h3 className="font-serif text-base font-semibold text-[#1a1a1a] mb-2">{item.title}</h3>
                          <p className="text-xs leading-relaxed text-[#666] m-0">{item.description}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile stacked layout */}
                  <div className="flex gap-4 md:hidden">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center shrink-0 ring-4 ring-[#f9f7f4]">
                        <span className="text-white text-[0.6rem] font-bold">{i + 1}</span>
                      </div>
                      {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-[#e0d4b0] mt-1" />}
                    </div>
                    <div className="bg-white border border-[#ede5d8] rounded-md p-4 shadow-sm flex-1 mb-2">
                      <p className="text-[0.65rem] font-bold tracking-widest uppercase text-[#c9a84c] mb-1">{item.year}</p>
                      <div className="mb-2 text-[#c9a84c]"><Icon size={16} /></div>
                      <h3 className="font-serif text-sm font-semibold text-[#1a1a1a] mb-1">{item.title}</h3>
                      <p className="text-xs leading-relaxed text-[#666] m-0">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ════════════════════════════
            CORE CAPABILITIES
        ════════════════════════════ */}
        <section className="pt-14">
          <div
            ref={addRef}
            className="opacity-0 translate-y-6 transition-all duration-700 text-center mb-10"
          >
            <span className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[#c9a84c] block mb-2">
              Core capabilities
            </span>
            <h2 className="font-serif text-3xl font-semibold text-[#1a1a1a]">
              What students should expect from the system.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {capabilityCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  ref={addRef}
                  className="opacity-0 translate-y-6 transition-all duration-700 bg-white border border-[#ede5d8] rounded-lg p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 cursor-default"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-11 h-11 rounded-lg bg-[#fdf6e3] flex items-center justify-center mb-4 text-[#c9a84c]">
                    <Icon size={20} />
                  </div>
                  <p className="text-[0.65rem] font-bold tracking-widest uppercase text-[#c9a84c] mb-1">
                    {card.kicker}
                  </p>
                  <h3 className="font-serif text-base font-semibold text-[#1a1a1a] mb-2">{card.title}</h3>
                  <p className="text-xs leading-relaxed text-[#666] m-0">{card.description}</p>
                </article>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
