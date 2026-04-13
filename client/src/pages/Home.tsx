import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ArrowDown, BookOpen, Cpu, FlaskConical, Layers } from "lucide-react";
import ParticleCanvas from "../components/ParticleCanvas";
import TypeWriter from "../components/TypeWriter";
import AnimatedCounter from "../components/AnimatedCounter";
import SectionReveal from "../components/SectionReveal";
import data from "../../../portfolio-data.json";

// ─── Custom Cursor ────────────────────────────────────────────────
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["About", "Experience", "Research", "Projects", "Skills"];

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <span className="nav-logo">yousef.ammar</span>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`}>{l}</a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${data.profile.email}`}
              className="btn-outline"
              style={{ padding: "7px 18px", fontSize: "12px" }}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(99,102,241,0.12) 0%, transparent 70%)",
      }}
    >
      <ParticleCanvas />

      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--accent)",
              letterSpacing: "0.15em",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span className="dot-live" />
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(48px, 8vw, 88px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginBottom: "16px",
            }}
          >
            Yousef Ammar
          </h1>

          <div
            style={{
              fontSize: "clamp(18px, 3vw, 28px)",
              fontWeight: 600,
              color: "var(--text-muted)",
              marginBottom: "28px",
              minHeight: "2em",
            }}
          >
            <TypeWriter
              phrases={[
                "Arabic NLP Engineer",
                "XAI Researcher",
                "Production ML Systems",
                "AI Engineer @ Moasherat",
              ]}
              className="gradient-text"
            />
          </div>

          <p
            style={{
              fontSize: "16px",
              color: "var(--text-muted)",
              maxWidth: "520px",
              lineHeight: 1.8,
              marginBottom: "40px",
            }}
          >
            Building deterministic, privacy-preserving ML systems in Arabic NLP.
            3rd year Data Science @ UQU · GPA 3.92 · 2 concurrent AI roles · Active researcher.
          </p>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "56px" }}>
            <a href="#projects" className="btn-primary">
              View Projects <ArrowDown size={15} />
            </a>
            <a href={data.profile.github} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Github size={15} /> GitHub
            </a>
            <a href={data.profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Linkedin size={15} /> LinkedIn
            </a>
          </div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--text-subtle)",
              fontSize: "12px",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
            }}
          >
            <ArrowDown size={14} />
            <span>SCROLL</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────
const stats = [
  { value: 392, suffix: "/400", label: "GPA", prefix: "" },
  { value: 2, suffix: " roles", label: "Concurrent AI positions", prefix: "" },
  { value: 100, suffix: "k", label: "Dataset samples", prefix: "" },
  { value: 21, suffix: " y/o", label: "Age — production systems", prefix: "" },
];

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="divider" style={{ marginBottom: "96px" }} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "48px",
            alignItems: "center",
          }}
        >
          <SectionReveal direction="left">
            <div className="section-label">About</div>
            <h2 className="section-title">Who I Am</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.9, marginBottom: "20px" }}>
              {data.about}
            </p>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.9, marginBottom: "28px" }}>
              I believe in deterministic boundaries — LLMs should{" "}
              <em style={{ color: "var(--text)", fontStyle: "normal", fontWeight: 600 }}>explain</em>, not
              decide. Every system I build puts interpretability and privacy at the core.
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Arabic NLP", "XAI", "Federated Learning", "Production ML"].map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal direction="right" delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="glass-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{ padding: "28px 24px" }}
                >
                  <div
                    style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "6px" }}
                    className="gradient-text"
                  >
                    <AnimatedCounter to={s.value} suffix={s.suffix} prefix={s.prefix} />
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-subtle)", lineHeight: 1.4 }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────
function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <SectionReveal>
          <div className="section-label">Experience</div>
          <h2 className="section-title">Where I've Worked</h2>
          <p className="section-subtitle" style={{ marginBottom: "56px" }}>
            Two concurrent AI roles while finishing a research paper — in my 3rd year.
          </p>
        </SectionReveal>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: "12px",
              bottom: "12px",
              width: "1px",
              background: "linear-gradient(180deg, var(--accent), transparent)",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            {data.experience.map((exp, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div
                  style={{ paddingLeft: "36px", paddingBottom: "40px", position: "relative", cursor: "pointer" }}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "-4px",
                      top: "4px",
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      background: i === 0 ? "var(--accent)" : "var(--text-subtle)",
                      border: "2px solid var(--bg)",
                      boxShadow: i === 0 ? "0 0 10px var(--accent-glow)" : "none",
                    }}
                  />

                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                        <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--text)" }}>{exp.role}</h3>
                        {exp.period === "Current" && <span className="dot-live" />}
                      </div>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{ fontWeight: 600, color: "var(--accent-light)", fontSize: "14px" }}>{exp.company}</span>
                        <span style={{ color: "var(--text-subtle)", fontSize: "13px" }}>·</span>
                        <span style={{ color: "var(--text-subtle)", fontSize: "13px" }}>{exp.location}</span>
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: exp.period === "Current" ? "var(--accent)" : "var(--text-subtle)",
                        whiteSpace: "nowrap",
                        marginTop: "3px",
                        padding: "3px 8px",
                        background: exp.period === "Current" ? "var(--accent-dim)" : "transparent",
                        borderRadius: "4px",
                        border: exp.period === "Current" ? "1px solid var(--border)" : "none",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: expanded === i ? "auto" : 0, opacity: expanded === i ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <ul style={{ listStyle: "none", paddingTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                      {exp.highlights.map((h, j) => (
                        <li key={j} style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7, paddingLeft: "16px", position: "relative" }}>
                          <span style={{ position: "absolute", left: 0, top: "9px", width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent)" }} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {expanded !== i && (
                    <div style={{ fontSize: "11px", color: "var(--text-subtle)", marginTop: "6px", fontFamily: "var(--font-mono)" }}>
                      click to expand →
                    </div>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Research ─────────────────────────────────────────────────────
function Research() {
  return (
    <section id="research" className="section">
      <div className="container">
        <SectionReveal>
          <div className="section-label">Research</div>
          <h2 className="section-title">Active Research</h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div
            className="glass-card"
            style={{
              padding: "48px",
              background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, var(--surface) 60%)",
              border: "1px solid rgba(99,102,241,0.25)",
              marginTop: "32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-80px",
                right: "-80px",
                width: "280px",
                height: "280px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#f59e0b", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", padding: "3px 10px", borderRadius: "4px" }}>
                IN PROGRESS
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent-light)", background: "var(--accent-dim)", border: "1px solid var(--border)", padding: "3px 10px", borderRadius: "4px" }}>
                TARGET: IEEE Access
              </span>
            </div>

            <h3 style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, marginBottom: "24px", lineHeight: 1.3, maxWidth: "680px" }}>
              {data.research.title}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
              {data.research.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "var(--accent-dim)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                    <span style={{ fontSize: "10px", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>{i + 1}</span>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.7 }}>{h}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["MARBERT", "SHAP", "LIME", "FedAvg", "Arabic NLP", "XAI", "Federated Learning"].map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────
const statusConfig: Record<string, { dot: string; label: string }> = {
  Production: { dot: "dot-live",     label: "Production"          },
  Live:       { dot: "dot-live",     label: "Live"                },
  Active:     { dot: "dot-active",   label: "Active"              },
  Finalist:   { dot: "dot-finalist", label: "Hackathon Finalist"  },
  Research:   { dot: "dot-active",   label: "Research"            },
};

const projectLinks: Record<string, { github?: string; live?: string }> = {
  "Arabic Complaint Classification API": {
    github: "https://github.com/YOUSEF-ysfxjo/text-complaint-api",
  },
  "AI Family Matching System": {
    github: "https://github.com/YOUSEF-ysfxjo/family-system",
  },
  "Interpretable Cardiology Risk Model": {
    github: "https://github.com/YOUSEF-ysfxjo/ml-cs-stats-interpretability-",
  },
  "Bella — Personal AI Agent System": {
    github: "https://github.com/YOUSEF-ysfxjo",
  },
  "Arabic Embedding Model Evaluation": {
    github: "https://github.com/YOUSEF-ysfxjo",
  },
  "Arabic Legal Corpus Extraction": {
    github: "https://github.com/YOUSEF-ysfxjo",
  },
  "Umrah Pilgrim Permit Extractor": {
    github: "https://github.com/YOUSEF-ysfxjo",
  },
  "NLP Learning Guide + Coffee Flavor Map": {
    github: "https://github.com/YOUSEF-ysfxjo/ml-nlp-guide",
    live:   "https://ml-nlp-guide.netlify.app",
  },
};

function Projects() {
  return (
    <section id="projects" className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <SectionReveal>
          <div className="section-label">Projects</div>
          <h2 className="section-title">What I've Built</h2>
          <p className="section-subtitle" style={{ marginBottom: "48px" }}>
            Production systems, research tools, and applied ML — Arabic NLP and XAI at the core.
          </p>
        </SectionReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {data.projects.map((p, i) => {
            const sc = statusConfig[p.status] ?? { dot: "dot-active", label: p.status };
            const links = projectLinks[p.name] ?? {};
            return (
              <SectionReveal key={p.name} delay={i * 0.07}>
                <motion.div
                  className="glass-card"
                  whileHover={{ y: -4, boxShadow: "0 0 40px rgba(99,102,241,0.18)" }}
                  style={{ padding: "28px", height: "100%", display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className={sc.dot} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-subtle)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {sc.label}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {links.github && (
                        <a href={links.github} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-subtle)", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}>
                          <Github size={16} />
                        </a>
                      )}
                      {links.live && (
                        <a href={links.live} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-subtle)", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-light)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}>
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px", lineHeight: 1.3, color: "var(--text)" }}>
                      {p.name}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.7 }}>{p.description}</p>
                  </div>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────
function Skills() {
  const s = data.skills as Record<string, string[]>;

  const groups = [
    { icon: <Cpu size={16} />,         label: "ML & NLP",       keys: ["ml_nlp"] },
    { icon: <FlaskConical size={16} />, label: "XAI & Research", keys: ["xai", "federated_ml"] },
    { icon: <Layers size={16} />,       label: "Infrastructure", keys: ["infrastructure"] },
    { icon: <BookOpen size={16} />,     label: "Specialties",    keys: ["specialties"] },
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionReveal>
          <div className="section-label">Skills</div>
          <h2 className="section-title">Technical Stack</h2>
          <p className="section-subtitle" style={{ marginBottom: "48px" }}>
            Built from real projects and production systems — not a checklist.
          </p>
        </SectionReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
          {groups.map((g, i) => {
            const items = g.keys.flatMap((k) => s[k] ?? []);
            return (
              <SectionReveal key={g.label} delay={i * 0.07}>
                <div className="glass-card" style={{ padding: "28px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "var(--accent-dim)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                      {g.icon}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: "14px" }}>{g.label}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                    {items.map((item) => <span className="tag" key={item}>{item}</span>)}
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>

        <SectionReveal delay={0.3}>
          <div className="glass-card" style={{ padding: "20px 28px", marginTop: "20px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", marginRight: "8px" }}>
              Languages
            </span>
            {s.programming?.map((p) => <span className="tag" key={p}>{p}</span>)}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

// ─── Certifications ───────────────────────────────────────────────
function Certifications() {
  return (
    <section id="certifications" className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <SectionReveal>
          <div className="section-label">Credentials</div>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle" style={{ marginBottom: "48px" }}>
            Math, ML, CV, and cloud — across KAUST, DeepLearning.AI, AWS, and INE.
          </p>
        </SectionReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(380px, 100%), 1fr))", gap: "10px" }}>
          {data.certifications.map((cert, i) => {
            const color = cert.includes("KAUST") ? "#6366f1" : cert.includes("DeepLearning") ? "#22c55e" : cert.includes("AWS") ? "#f59e0b" : "var(--text-subtle)";
            return (
              <SectionReveal key={i} delay={i * 0.04}>
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "14px 18px", background: "rgba(20,20,36,0.6)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", transition: "border-color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hover)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, flexShrink: 0, marginTop: "7px" }} />
                  <span style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>{cert}</span>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "56px 0", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "15px", fontWeight: 600, color: "var(--accent)", marginBottom: "6px" }}>
              yousef.ammar
            </div>
            <div style={{ fontSize: "13px", color: "var(--text-subtle)" }}>
              Arabic NLP Engineer · Makkah, Saudi Arabia · 2026
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {[
              { href: data.profile.github,   icon: <Github size={15} />,   label: "GitHub"      },
              { href: data.profile.linkedin,  icon: <Linkedin size={15} />, label: "LinkedIn"    },
              { href: "https://huggingface.co/Ysfxjo", icon: null,          label: "HuggingFace" },
              { href: `mailto:${data.profile.email}`,  icon: <Mail size={15} />, label: "Email"  },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{ color: "var(--text-subtle)", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-subtle)")}
              >
                {l.icon}{l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Research />
        <Projects />
        <Skills />
        <Certifications />
      </main>
      <Footer />
    </>
  );
}
