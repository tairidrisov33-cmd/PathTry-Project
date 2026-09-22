import Link from 'next/link';
import { professions } from '@/data/professions';

const colors: Record<string, string> = { coral: '#f16d59', teal: '#2a9d8f', gold: '#e1a33f', lilac: '#9b82c8', blue: '#3867db' };

export default function Home() {
  return <main>
    <section className="hero"><div><div className="kicker">Career reality check · 10 minutes</div><h1>Try a profession before you choose it.</h1><p>Three small tasks. A little honest reflection. A clearer feeling for what the work is really like before you commit to a major.</p><Link className="btn btn-primary" href="#professions">Explore professions <span>↓</span></Link></div><div className="hero-art"><div className="hero-card"><small>Today’s experiment</small><strong>Could this be your Tuesday?</strong><span className="muted">3 tasks · 10 min</span></div><div className="orbit" /></div></section>
    <section className="section"><div className="section-head"><div><div className="kicker">No pressure, just perspective</div><h2>How it works</h2></div><span className="muted">Built for curious students</span></div><div className="steps"><div className="step"><span className="step-num">01</span><h3>Pick a path</h3><p>Choose a profession you are curious about, not one you have already decided on.</p></div><div className="step"><span className="step-num">02</span><h3>Try the real work</h3><p>Move through three tiny tasks based on the questions and choices professionals make every day.</p></div><div className="step"><span className="step-num">03</span><h3>Notice your reaction</h3><p>Get a thoughtful snapshot of your fit, your energy, and what to explore next.</p></div></div></section>
    <section className="section" id="professions"><div className="section-head"><div><div className="kicker">Choose your experiment</div><h2>Five paths to try</h2></div><span className="muted">Start anywhere</span></div><div className="professions">{professions.map((profession) => <Link className="profession-card" href={`/try/${profession.slug}`} key={profession.slug}><div><div className="profession-icon" style={{ background: colors[profession.color] }}>{profession.icon}</div><h3>{profession.title}</h3><p>{profession.description}</p></div><span className="arrow">↗</span></Link>)}</div></section>
  </main>;
}
