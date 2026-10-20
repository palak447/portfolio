import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiArrowDownRight,
  FiArrowRight,
  FiArrowUpRight,
  FiAward,
  FiBarChart2,
  FiBriefcase,
  FiCheck,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMenu,
  FiMoon,
  FiSend,
  FiSun,
  FiX,
} from 'react-icons/fi';
import { activities, certifications, internships, milestones, profile, projects, skillGroups, softSkills, socialLinks } from './data.js';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const sectionIds = ['about', 'skills', 'work', 'internships', 'journey', 'recognition', 'contact'];
const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function useTypewriter(text) {
  const [value, setValue] = useState('');
  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setValue(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, 72);
    return () => window.clearInterval(timer);
  }, [text]);
  return value;
}

function SectionTitle({ eyebrow, title, note }) {
  return (
    <motion.div className="section-heading" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
      <span className="eyebrow">{eyebrow}</span>
      <div className="heading-row">
        <h2>{title}</h2>
        {note && <p>{note}</p>}
      </div>
    </motion.div>
  );
}

function Navbar({ theme, onThemeToggle }) {
  const [active, setActive] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-22% 0px -58% 0px', threshold: [0, 0.15, 0.4] },
    );
    sectionIds.forEach((id) => {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="nav-shell">
      <nav className="navbar wrap" aria-label="Main navigation">
        <Link to="/" className="brand" onClick={closeMenu} aria-label="Palak Srivastava home">
          <span className="brand-mark">P<span>.</span></span>
          <span>palak<span className="brand-muted">srivastava</span></span>
        </Link>
        <div className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          {sectionIds.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'nav-active' : ''} onClick={closeMenu}>
              {id === 'work' ? 'Projects' : id === 'internships' ? 'Internships' : id === 'journey' ? 'Journey' : id === 'recognition' ? 'Recognition' : id}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button className="icon-button theme-button" onClick={onThemeToggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </button>
          <a className="nav-contact" href="#contact">Let’s talk <FiArrowUpRight /></a>
          <button className="icon-button menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const typedRole = useTypewriter(profile.role);
  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <motion.div className="availability" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <span className="status-dot" /> OPEN TO LEARNING & OPPORTUNITIES
          </motion.div>
          <motion.p className="hero-kicker" initial="hidden" animate="visible" variants={reveal}>HELLO, I’M</motion.p>
          <motion.h1 id="hero-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}>
            Palak<br /><span>Srivastava</span><i className="hero-period">.</i>
          </motion.h1>
          <p className="hero-role"><span className="role-prefix">I’m an</span> {typedRole}<span className="type-caret" aria-hidden="true" /></p>
          <p className="hero-intro">{profile.summary}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={`${API_URL}/api/cv/pdf`} download>Download CV <FiDownload /></a>
            <a className="text-link" href="#work">Explore my work <FiArrowDownRight /></a>
          </div>
          <div className="hero-socials">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.url} target="_blank" rel="noreferrer" aria-label={`${social.label} profile`}>{social.label}<FiArrowUpRight /></a>
            ))}
          </div>
        </div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.32, duration: 0.8 }}>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="visual-glow" />
          <div className="data-chip chip-one"><FiBarChart2 /><span>curious by nature</span></div>
          <div className="data-chip chip-two"><span className="chip-dot" /> learning in progress</div>
          <div className="portrait-frame">
            <img src="/profile.png" alt="Palak Srivastava" />
            <div className="portrait-caption"><span>PS / 01</span><span>AI · DATA · INSIGHT</span></div>
          </div>
          <div className="hero-index"><span>01</span> / PORTFOLIO</div>
        </motion.div>
      </div>
      <div className="hero-foot"><span>BASED IN {profile.location.toUpperCase()}</span><span>SCROLL TO EXPLORE <span className="scroll-line" /></span></div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section wrap">
      <SectionTitle eyebrow="01 / A LITTLE ABOUT ME" title={<>Curiosity with<br /><span className="accent-text">a direction.</span></>} note="Building a foundation at the intersection of data, intelligence and thoughtful problem-solving." />
      <div className="about-grid">
        <motion.div className="about-note glass-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <span className="card-index">A NOTE TO YOU</span>
          <p>{profile.summary}</p>
          <a className="inline-link" href="#contact">Let’s connect <FiArrowUpRight /></a>
        </motion.div>
        <motion.div className="about-facts" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <div className="fact-row"><span className="fact-icon"><FiMapPin /></span><div><span className="fact-label">LOCATION</span><strong>{profile.location}</strong></div></div>
          <div className="fact-row"><span className="fact-icon"><FiBriefcase /></span><div><span className="fact-label">CURRENT STATUS</span><strong>B.Tech student</strong><span className="fact-sub">2024 — 2028</span></div></div>
          <div className="fact-row"><span className="fact-icon"><FiMail /></span><div><span className="fact-label">EMAIL</span><a href={`mailto:${profile.email}`}>{profile.email}</a></div></div>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section section-tinted">
      <div className="wrap">
        <SectionTitle eyebrow="02 / WHAT I WORK WITH" title={<>Skills, in <span className="accent-text">progress.</span></>} note="A growing toolkit, with honest markers of where I am today." />
        <div className="skills-grid">
          {skillGroups.map((group, groupIndex) => (
            <motion.article className="skill-card glass-card" key={group.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} transition={{ delay: groupIndex * 0.1 }}>
              <div className="skill-card-head"><span className="skill-number">0{groupIndex + 1}</span><h3>{group.title}</h3></div>
              <div className="skill-list">
                {group.skills.map((skill) => (
                  <div className="skill-item" key={skill.name} title={`${skill.note} · ${skill.level}%`}>
                    <div className="skill-label"><span>{skill.name}</span><span className="skill-level">{skill.level}% <span className="skill-tooltip">{skill.note}</span></span></div>
                    <div className="skill-track" role="progressbar" aria-label={`${skill.name} proficiency`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={skill.level}>
                      <motion.span initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
        <div className="soft-skills-row"><span>SOFT SKILLS</span>{softSkills.map((skill) => <span className="soft-skill" key={skill}>{skill}</span>)}</div>
        <p className="skills-footnote">Proficiency reflects my current learning journey, not a formal assessment.</p>
      </div>
    </section>
  );
}

function Projects() {
  const filters = ['All', ...new Set(projects.flatMap((project) => project.technologies))];
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? projects : projects.filter((project) => project.technologies.includes(filter));
  return (
    <section id="work" className="section wrap projects-section">
      <div className="projects-heading"><span aria-hidden="true">🚀</span><h2>Projects</h2></div>
      <div className="project-toolbar">
        <span>FILTER BY TECHNOLOGY</span>
        <div className="filter-list" role="group" aria-label="Filter projects by technology">
          {filters.map((item) => <button key={item} className={filter === item ? 'filter-active' : ''} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
      </div>
      <motion.div className="projects-grid" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article className="project-card glass-card" key={project.name} layout variants={reveal} initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}>
              <ProjectPreview type={project.preview} />
              <div className="project-card-body">
                <h3>{project.name}</h3>
                <span className="project-category">{project.category}</span>
                <p>{project.description}</p>
                <div className="tech-badges">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
                <div className="project-card-actions">
                  <a className="project-code" href={project.github} target="_blank" rel="noreferrer"><FiGithub /> Code</a>
                  <a className="project-demo" href={project.demo} target="_blank" rel="noreferrer" aria-label={`Live demo of ${project.name}`}><FiArrowUpRight /></a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function ProjectPreview({ type }) {
  return (
    <div className={`project-preview preview-${type}`} aria-hidden="true">
      <div className="preview-window">
        <div className="preview-topbar"><span /><span /><span /><i /></div>
        {type === 'jobs' && (
          <div className="preview-jobs-content">
            <div className="preview-sidebar"><b /><b /><b /><b /></div>
            <div className="preview-jobs-main">
              <div className="preview-heading-line" />
              <div className="preview-job-stats"><i /><i /><i /></div>
              <div className="preview-job-row"><b /><span /><i /></div>
              <div className="preview-job-row"><b /><span /><i /></div>
              <div className="preview-job-row"><b /><span /><i /></div>
            </div>
          </div>
        )}
        {type === 'loans' && (
          <div className="preview-loans-content">
            <div className="preview-heading-line" />
            <div className="preview-chart">
              {[48, 76, 57, 92, 65, 82, 52, 72].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
            </div>
            <div className="preview-heatmap">{Array.from({ length: 24 }, (_, index) => <i key={index} />)}</div>
          </div>
        )}
        {type === 'empowerment' && (
          <div className="preview-empowerment-content">
            <div className="preview-heading-line" />
            <div className="preview-line-chart">
              <span /><span /><span />
              <svg viewBox="0 0 400 110" preserveAspectRatio="none"><path d="M0 84 C45 76 54 47 100 61 S156 82 200 48 S260 55 300 28 S356 44 400 10" /></svg>
            </div>
            <div className="preview-chart-labels"><i /><i /><i /><i /><i /></div>
          </div>
        )}
        {type === 'fitness' && (
          <div className="preview-fitness-content">
            <div className="preview-heading-line" />
            <div className="preview-fitness-stats"><i /><i /><i /></div>
            <div className="preview-fitness-bottom">
              <div className="preview-ring"><i /></div>
              <div className="preview-fitness-bars"><i /><i /><i /><i /><i /></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Internships() {
  return (
    <section id="internships" className="section wrap internships-section">
      <div className="projects-heading"><span aria-hidden="true">🚀</span><h2>Internships</h2></div>
      <div className="internships-grid">
        {internships.map((internship) => (
          <motion.article key={internship.organization} className="internship-card glass-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <div className="internship-preview" aria-hidden="true">
              <div className="internship-preview-top"><span>{internship.organization.toUpperCase()}</span><span>INTERNSHIP / {internship.field.toUpperCase()}</span></div>
              <div className="internship-preview-main">
                <div className="internship-preview-copy"><span>BUILDING SKILLS IN {internship.field.toUpperCase()}</span><i /><i /><i /></div>
                <div className="internship-preview-chart"><i /><i /><i /><i /><i /><i /><i /></div>
              </div>
              <div className="internship-preview-bottom">
                {internship.skills.slice(0, 3).map((skill) => <span key={skill}>{skill.toUpperCase()}</span>)}
              </div>
            </div>
            <div className="internship-card-body">
              <h3>{internship.organization}</h3>
              <p><strong>Field:</strong> {internship.field}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p className="internship-description">{internship.description}</p>
              <div className="tech-badges" aria-label="Internship skills">
                {internship.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
              {internship.certificateUrl ? (
                <a className="project-code internship-certificate" href={internship.certificateUrl} target="_blank" rel="noreferrer">
                  <FiAward /> Certificate Link <FiArrowUpRight />
                </a>
              ) : (
                <span className="project-code internship-certificate internship-certificate-unavailable" aria-disabled="true" title="Add the certificate URL in the internship details to enable this link">
                  <FiAward /> Certificate link not provided
                </span>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="section section-tinted">
      <div className="wrap journey-grid">
        <div>
          <SectionTitle eyebrow="05 / THE JOURNEY" title={<>Learning is the <span className="accent-text">work.</span></>} note="The foundation I’m building, one curious question at a time." />
          <div className="timeline">
            {milestones.map((item) => (
              <motion.article className="timeline-item" key={item.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }}>
                <span className="timeline-node" /><span className="timeline-kind">{item.kind} <span>· {item.date}</span></span>
                <h3>{item.title}</h3><p>{item.detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
        <motion.aside className="journey-aside glass-card" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          <span className="aside-orb" /><span className="card-index">THE DIRECTION</span>
          <FiBarChart2 className="aside-icon" />
          <h3>Grounded in data.<br /><span className="accent-text">Open to discovery.</span></h3>
          <p>Exploring how AI and analysis can make complex information more useful and human.</p>
          <span className="aside-coordinate">AI / ML&nbsp;&nbsp; · &nbsp;&nbsp;DATA&nbsp;&nbsp; · &nbsp;&nbsp;PEOPLE</span>
        </motion.aside>
      </div>
    </section>
  );
}

function Recognition() {
  return (
    <section id="recognition" className="section wrap">
      <SectionTitle eyebrow="06 / RECOGNITION & COMMUNITY" title={<>Milestones along <span className="accent-text">the way.</span></>} note="Learning beyond the classroom and showing up for the community." />
      <div className="recognition-grid">
        <div className="cert-list">
          {certifications.map((cert, index) => (
            <motion.article className="cert-card glass-card" key={cert.name} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.07 }}>
              <span className="cert-icon"><FiAward /></span>
              <div><span className="cert-issuer">{cert.issuer}</span><h3>{cert.name}</h3></div>
              <a className="cert-link" href={cert.url} target="_blank" rel="noreferrer" aria-label={`Certificate link for ${cert.name}`}><FiArrowUpRight /></a>
              <span className="cert-index">0{index + 1}</span>
            </motion.article>
          ))}
        </div>
        <div className="activity-list">
          {activities.map((activity, index) => (
            <motion.article className="activity-card" key={activity.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
              <span className="activity-number">0{index + 1}</span><div><span className="eyebrow">ACTIVITIES</span><h3>{activity.title}</h3><p>{activity.detail}</p></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState({ busy: false, message: '', success: false });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    setState({ busy: true, message: '', success: false });
    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = response.headers.get('content-type')?.includes('application/json')
        ? await response.json()
        : null;
      if (!response.ok) throw new Error(result?.message || 'The portfolio API could not complete this request.');
      setForm({ name: '', email: '', message: '' });
      setState({ busy: false, message: 'Thanks for reaching out. Your message has been received.', success: true });
    } catch (error) {
      const message = error instanceof TypeError
        ? 'Could not reach the API. Start the server in the server folder and try again.'
        : error.message || 'Could not send your message. Please email me directly.';
      setState({ busy: false, message, success: false });
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="wrap">
        <SectionTitle eyebrow="07 / SAY HELLO" title={<>Good things start<br /><span className="accent-text">with a conversation.</span></>} note="Have a project, opportunity or just a question? My inbox is open." />
        <div className="contact-grid">
          <div className="contact-details">
            <a href={`mailto:${profile.email}`} className="email-link">{profile.email}<FiArrowUpRight /></a>
            <a href={`tel:${profile.phone}`} className="contact-phone">{profile.phone}</a>
            <span className="fact-label">FIND ME ELSEWHERE</span>
            <div className="contact-socials">
              {socialLinks.map((item) => <a href={item.url} key={item.label} target="_blank" rel="noreferrer">{item.label}<FiArrowUpRight /></a>)}
            </div>
          </div>
          <form className="contact-form glass-card" onSubmit={submit}>
            <div className="form-row">
              <label>Your name<input name="name" value={form.name} onChange={update} autoComplete="name" placeholder="Jane Doe" required minLength="2" maxLength="80" /></label>
              <label>Email address<input name="email" type="email" value={form.email} onChange={update} autoComplete="email" placeholder="jane@example.com" required maxLength="254" /></label>
            </div>
            <label>Your message<textarea name="message" value={form.message} onChange={update} placeholder="Tell me a little about it..." required minLength="10" maxLength="2000" rows="4" /></label>
            <div className="form-submit-row">
              <span className={`form-feedback ${state.success ? 'form-success' : ''}`} role="status">{state.message}</span>
              <button className="button button-primary" type="submit" disabled={state.busy}>{state.busy ? 'Sending…' : 'Send a message'} {state.success ? <FiCheck /> : <FiSend />}</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="footer wrap"><Link to="/" className="brand"><span className="brand-mark">P<span>.</span></span><span>palak<span className="brand-muted">srivastava</span></span></Link><span>DESIGNED WITH CURIOSITY <span className="footer-spark">✳</span></span><a href="#top">BACK TO TOP <FiArrowRight /></a></footer>;
}

function Portfolio() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);
  useEffect(() => {
    document.documentElement.id = 'top';
    return () => { document.documentElement.removeAttribute('id'); };
  }, []);

  return (
    <div className="app-shell">
      <div className="ambient ambient-a" /><div className="ambient ambient-b" />
      <Navbar theme={theme} onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <main><Hero /><About /><Skills /><Projects /><Internships /><Journey /><Recognition /><Contact /></main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return <main className="not-found wrap"><span className="eyebrow">404 / NOT FOUND</span><h1>Lost in the data.</h1><Link className="button button-primary" to="/">Back to portfolio <FiArrowRight /></Link></main>;
}

export default function App() {
  return <Routes><Route path="/" element={<Portfolio />} /><Route path="*" element={<NotFound />} /></Routes>;
}
