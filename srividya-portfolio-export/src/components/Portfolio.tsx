import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Code2,
  Database,
  Server,
  Wrench,
  GraduationCap,
  Award,
  Briefcase,
  Sparkles,
  ExternalLink,
  Download,
  Menu,
  X,
  Check,
  Calendar,
} from "lucide-react";


const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = {
  github: "https://github.com/srividyakambhampati",
  linkedin: "https://linkedin.com/in/kambhampati-srividya-b5bb39320",
  email: "srividyakambhampati92@gmail.com",
  phone: "+91 63054 95168",
  location: "India",
};

export default function Portfolio() {
  const [active, setActive] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">

      <Nav active={active} scrolled={scrolled} />

      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

/* ------------------------------- NAV ------------------------------- */
function Nav({ active, scrolled }: { active: string; scrolled: boolean }) {
  const [open, setOpen] = useState(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong" : "glass"
          }`}
        >
          <a
            href="#top"
            onClick={(e) => handleNav(e, "top")}
            className="flex items-center gap-2 group/logo"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-gradient text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 group-hover/logo:scale-105">
              SK
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-wide sm:block">
              <span className="gradient-text">Srividya</span>
              <span className="text-muted-foreground transition-colors group-hover/logo:text-foreground"> Kambhampati</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => handleNav(e, n.id)}
                className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
                  active === n.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-black/[0.03]"
                }`}
              >
                {active === n.id && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-primary/10" />
                )}
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${SOCIALS.email}`}
              className="group hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary-gradient px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-[var(--shadow-glow)]"
            >
              Hire me
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center rounded-full glass md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="mt-2 rounded-2xl glass-strong p-2 md:hidden animate-fade-up">
            <nav className="flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={(e) => handleNav(e, n.id)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    active === n.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-black/[0.03] hover:text-foreground"
                  }`}
                >
                  {n.label}
                </a>
              ))}
              <a
                href={`mailto:${SOCIALS.email}`}
                className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary-gradient px-4 py-3 text-sm font-medium text-primary-foreground"
              >
                Hire me
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}


/* ------------------------------ HERO ------------------------------- */
function Hero() {
  return (
    <section id="top" className="relative flex min-h-[85vh] flex-col justify-center pt-28 pb-14">
      <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new opportunities
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="gradient-text">Srividya Kambhampati</span>
            <br />
            <span className="text-foreground">MERN Stack Developer</span>
          </h1>
          <p className="mt-5 font-display text-base text-muted-foreground sm:text-lg md:text-xl">
            Crafting digital experiences that feel <span className="italic">effortless</span> — built with the MERN stack.
          </p>


          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            I design and build fast, accessible, production-grade web applications using{" "}
            <span className="text-foreground">MongoDB, Express, React</span> and{" "}
            <span className="text-foreground">Node.js</span>. Passionate about clean code,
            thoughtful UX, and scalable architecture.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 rounded-full bg-primary-gradient px-5.5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[var(--shadow-glow)]"
            >
              View my work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="/srividya-resume.pdf"
              download="Srividya-Kambhampati-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full glass px-5.5 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-black/5"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
            <div className="ml-1 flex items-center gap-2">
              <SocialIcon href={SOCIALS.github} label="GitHub">
                <Github className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={SOCIALS.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={`mailto:${SOCIALS.email}`} label="Email">
                <Mail className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-4">
            <Stat value="1" label="Year of experience" />
            <Stat value="5" label="Projects shipped" />
            <Stat value="12+" label="Technologies" />
          </div>
        </div>

        {/* Avatar / floating card */}
        <div className="relative mx-auto mt-8 lg:mt-0">
          <div className="relative h-72 w-72 sm:h-96 sm:w-96 md:h-[28rem] md:w-[28rem] lg:h-[30rem] lg:w-[30rem] animate-float">
            <div className="absolute inset-0 rounded-full bg-[var(--gradient-primary)] blur-2xl opacity-40" />
            <div className="relative grid h-full w-full place-items-center rounded-[2rem] glass-strong p-2">
              <div className="h-full w-full overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-primary/30 via-accent/20 to-transparent">
        <img src="/vidya.png" alt="Vidya" className="h-full w-full object-cover rounded-[1.7rem]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingChip({
  children,
  className = "",
  delay = "0s",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: string;
}) {
  return (
    <div
      className={`absolute inline-flex items-center gap-1.5 rounded-full glass-strong px-3 py-1.5 text-xs font-medium animate-float ${className}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-bold gradient-text">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full glass transition-all hover:bg-black/5 hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}

/* ----------------------------- SECTIONS ---------------------------- */
function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <Sparkles className="h-3 w-3 text-primary" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
        {title.split(" ").map((w, i) =>
          i === title.split(" ").length - 1 ? (
            <span key={i} className="gradient-text">
              {" "}
              {w}
            </span>
          ) : (
            <span key={i}>{i === 0 ? "" : " "}{w}</span>
          ),
        )}
      </h2>
      {description && <p className="mt-4 text-muted-foreground">{description}</p>}
    </div>
  );
}

function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 py-14">
      {children}
    </section>
  );
}

function About() {
  return (
    <Section id="about">
      <SectionTitle eyebrow="About" title="A bit about me" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-3xl p-6 sm:p-8 lg:col-span-2 border-l-4 border-l-primary relative overflow-hidden group hover:shadow-xl hover:border-primary/20 transition-all duration-300">
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary-gradient opacity-0 blur-3xl transition-opacity group-hover:opacity-10 pointer-events-none" />
          <p className="text-lg leading-relaxed text-muted-foreground">
            I'm a <span className="text-foreground font-semibold">MERN Stack Developer</span> who loves
            turning complex problems into intuitive digital products. My focus is on writing
            maintainable code, building delightful interfaces, and shipping reliable backend
            APIs that scale.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Outside of code, I enjoy exploring new design trends, contributing to open source,
            and constantly leveling up my skills. I thrive in collaborative, fast-moving teams
            where craft and impact are valued equally.
          </p>

          <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 border-t border-black/5 pt-6">
            <div className="rounded-2xl bg-black/[0.02] p-4 transition-all hover:bg-black/[0.04]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Specialization</div>
              <div className="mt-1 text-sm font-bold text-foreground">MERN Stack</div>
            </div>
            <div className="rounded-2xl bg-black/[0.02] p-4 transition-all hover:bg-black/[0.04]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Core Focus</div>
              <div className="mt-1 text-sm font-bold text-foreground">Clean APIs & UX</div>
            </div>
            <div className="rounded-2xl bg-black/[0.02] p-4 transition-all hover:bg-black/[0.04] col-span-2 sm:col-span-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Availability</div>
              <div className="mt-1 text-sm font-bold text-foreground">Full-time / Remote</div>
            </div>
          </div>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-8 border-l-4 border-l-accent relative overflow-hidden group hover:shadow-xl hover:border-accent/20 transition-all duration-300">
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary-gradient opacity-0 blur-3xl transition-opacity group-hover:opacity-10 pointer-events-none" />
          <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">What I do best</h3>
          <ul className="mt-6 space-y-4">
            {[
              "Full-stack web apps end to end",
              "REST APIs with Node & Express",
              "React UIs with thoughtful UX",
              "MongoDB schema & query design",
              "Performance & accessibility",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

const SKILL_GROUPS = [
  {
    icon: Code2,
    title: "Frontend",
    items: ["React.js", "JavaScript", "HTML", "CSS", "Bootstrap", "TypeScript"],
  },
  {
    icon: Server,
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "CRUD Operations", "API Integration"],
  },
  {
    icon: Database,
    title: "Database",
    items: ["MongoDB", "SQL"],
  },
  {
    icon: Wrench,
    title: "Tools & Platforms",
    items: ["Git", "GitHub", "VS Code", "Postman", "AWS (EC2)", "Azure", "Python"],
  },
];

function Skills() {
  return (
    <Section id="skills">
      <SectionTitle
        eyebrow="Skills"
        title="My technical toolkit"
        description="A blend of frontend craft, solid backend engineering, and the tools that keep teams shipping."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SKILL_GROUPS.map((g) => (
          <div
            key={g.title}
            className="group relative overflow-hidden rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-gradient opacity-0 blur-2xl transition-opacity group-hover:opacity-20 pointer-events-none" />
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary-gradient group-hover:text-primary-foreground">
                <g.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground">{g.title}</h3>
            </div>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {g.items.map((i) => (
                <li
                  key={i}
                  className="rounded-full border border-black/5 bg-black/[0.02] px-3 py-1 text-xs font-medium text-muted-foreground transition-all hover:border-primary/20 hover:bg-white hover:text-primary hover:shadow-sm"
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

const EXPERIENCE = [
  {
    role: "MERN Stack Developer",
    company: "Sunrisemitra Global Technologies Pvt. Ltd.",
    period: "Present",
    points: [
      "Shipped production features across the MERN stack, owning components end-to-end from UI to API.",
      "Built and integrated RESTful APIs and optimized MongoDB queries for faster response times.",
      "Collaborated with the team on code reviews, debugging, and improving overall app performance.",
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "CRUD Operations", "Git"],
  },
  {
    role: "MERN Stack Developer — Intern",
    company: "Sunrisemitra Global Technologies Pvt. Ltd.",
    period: "6 months · Internship",
    points: [
      "Developed responsive interfaces with React.js, HTML, CSS, and Bootstrap.",
      "Implemented CRUD operations and connected the frontend to Node.js + Express APIs.",
      "Learned deployment workflows on AWS EC2 and Azure under senior guidance.",
    ],
    tags: ["React.js", "Bootstrap", "HTML", "CSS", "REST APIs", "AWS EC2", "Azure"],
  },
];

function Experience() {
  return (
    <Section id="experience">
      <SectionTitle eyebrow="Experience" title="Where I've worked" />
      <div className="relative">
        <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary via-accent/50 to-transparent sm:left-[15px]" />
        <ol className="space-y-8">
          {EXPERIENCE.map((x) => (
            <li key={x.role} className="relative pl-10 sm:pl-16">
              <span className="absolute left-0 top-5 flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-primary text-primary shadow-sm sm:left-1 sm:h-7 sm:w-7">
                <Briefcase className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </span>
              <div className="glass rounded-3xl p-6 md:p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-300 border-l-4 border-l-primary relative overflow-hidden group">
                <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary-gradient opacity-0 blur-3xl transition-opacity group-hover:opacity-10 pointer-events-none" />
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl font-bold tracking-tight text-foreground">{x.role}</h3>
                    <p className="mt-1 text-sm font-medium text-primary flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {x.company}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {x.period}
                  </div>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {x.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {x.tags && (
                  <div className="mt-6 flex flex-wrap gap-1.5 border-t border-black/5 pt-4">
                    {x.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-black/5 bg-black/[0.03] px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

const PROJECTS = [
  {
    title: "Mock first",
    description:
      "Mock first is a platform for conducting online mock interviews. It helps candidates practice and prepare for real interviews through structured sessions.",
    tags: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/srividyakambhampati",
    demo: "https://mockfirst.com",
  },
  {
    title: "ITR Filing Application",
    description:
      "Full-stack web application for online tax filing and document management. Implemented secure file uploads, an email notification system for successful submissions, and an admin dashboard to manage and track user data with MongoDB.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/srividyakambhampati",
    demo: "#",
  },
  {
    title: "Job Portal Website",
    description:
      "Full-stack job portal with authentication and role-based access. Features resume upload, job application tracking, user profile management, and advanced search & filtering using dynamic queries. Deployed on AWS EC2 with Git version control.",
    tags: ["MERN", "JWT Auth", "AWS EC2", "Git"],
    github: "https://github.com/srividyakambhampati",
    demo: "#",
  },
];

function Projects() {
  return (
    <Section id="projects">
      <SectionTitle
        eyebrow="Projects"
        title="Selected work"
        description="A few things I've built recently. Each one taught me something new about product, performance, or polish."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <article
            key={p.title}
            className="group relative overflow-hidden rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">{p.title}</h3>
                <div className="flex shrink-0 gap-1.5">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub repo"
                    className="grid h-8.5 w-8.5 place-items-center rounded-full bg-black/5 text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Live demo"
                    className="grid h-8.5 w-8.5 place-items-center rounded-full bg-black/5 text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              {p.demo && p.demo !== "#" && (
                <div className="mt-3 flex">
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline hover:text-primary/80 transition-all"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {p.demo.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                </div>
              )}
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5 border-t border-black/5 pt-4">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-primary/10 bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

const CERTS = [
  { title: "Data Science Hackathon (ML-AI)", org: "MIST & Brainovision", year: "" },
  { title: "Python Programming Course", org: "Simplilearn", year: "" },
  { title: "Introduction to Front-End Development", org: "Simplilearn", year: "" },
  { title: "Cybersecurity Virtual Internship", org: "Cisco Networking Academy", year: "" },
];

function Certifications() {
  return (
    <Section id="certifications">
      <SectionTitle eyebrow="Certifications" title="Continuous learning" />
      <div className="grid gap-4 sm:grid-cols-2">
        {CERTS.map((c) => (
          <div
            key={c.title}
            className="flex items-start gap-4 rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg group"
          >
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary-gradient group-hover:text-primary-foreground">
              <Award className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">{c.title}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {c.org}{c.year ? ` · ${c.year}` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const EDUCATION = [
  {
    degree: "B.Tech — Computer Science & Engineering (AIML)",
    school: "Mother Teresa Institute of Science and Technology",
    period: "2021 — 2025",
    detail: "CGPA: 7.6 / 10. Specialization in Artificial Intelligence & Machine Learning.",
  },
];

function Education() {
  return (
    <Section id="education">
      <SectionTitle eyebrow="Education" title="Academic background" />
      <div className="grid gap-5 md:grid-cols-2">
        {EDUCATION.map((e) => (
          <div key={e.degree} className="glass rounded-3xl p-6 md:p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-xl group border-l-4 border-l-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary-gradient opacity-0 blur-3xl transition-opacity group-hover:opacity-10 pointer-events-none" />
            <div className="flex items-start gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary-gradient group-hover:text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-bold text-foreground transition-colors group-hover:text-primary">{e.degree}</h3>
                <p className="mt-1 text-sm font-semibold text-primary">{e.school}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{e.period}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact">
      <div className="relative overflow-hidden rounded-[2rem] glass-strong p-6 sm:p-10 md:p-14 border border-black/5 shadow-xl">
        <div className="absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-primary-gradient opacity-20 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="h-3 w-3 text-primary" />
              Contact
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              Let's build something <span className="gradient-text">remarkable</span>.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
              I'm open to full-time roles, freelance projects, and meaningful collaborations.
              Drop a message — I usually reply within 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${SOCIALS.email}`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-primary-gradient px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-[var(--shadow-glow)]"
              >
                <Mail className="h-4 w-4" />
                Send an email
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full glass px-6 py-3.5 text-sm font-medium transition-all hover:bg-black/5"
              >
                <Linkedin className="h-4 w-4" />
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ContactCard icon={Mail} label="Email" value={SOCIALS.email} href={`mailto:${SOCIALS.email}`} />
            <ContactCard icon={Phone} label="Phone" value={SOCIALS.phone} href={`tel:${SOCIALS.phone}`} />
            <ContactCard icon={Github} label="GitHub" value="@srividyakambhampati" href={SOCIALS.github} />
            <ContactCard icon={MapPin} label="Location" value={SOCIALS.location} />
          </div>
        </div>
      </div>
    </Section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <>
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary-gradient group-hover:text-primary-foreground">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{value}</div>
      </div>
    </>
  );
  const cls =
    "flex items-center gap-3 rounded-2xl glass p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md group";
  return href ? (
    <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {Inner}
    </a>
  ) : (
    <div className={cls}>{Inner}</div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-xs text-muted-foreground sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} Srividya Kambhampati. Crafted with care.</p>
        <div className="flex items-center gap-3">
          <a href={SOCIALS.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
            GitHub
          </a>
          <span>·</span>
          <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">
            LinkedIn
          </a>
          <span>·</span>
          <a href={`mailto:${SOCIALS.email}`} className="hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
