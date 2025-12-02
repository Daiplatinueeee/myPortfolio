import type React from "react"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import "./index.css"

import myPic from "./assets/6.jpg"
import pj1 from "./assets/2.png"
import pj2 from "./assets/3.png"
import pj3 from "./assets/4.png"
import pj4 from "./assets/5.jpg"

gsap.registerPlugin(ScrollTrigger)

// ============================================================================
// DATA
// ============================================================================

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
]

const projects = [
  {
    id: 1,
    title: "Online Home Services Platform",
    category: "Full Stack",
    description: "A web platform that allows users to book home services in three easy steps. Features include GIS-based service location, AI integration, coupons, reCaptcha security, and other advanced functionalities to simplify service booking.",
    image: pj3,
    tags: ["React JS", "MongoDB", "Express.js", "Node.js", "TailwindCSS"],
  },
  {
    id: 2,
    title: "Baranggay Online Registration Form",
    category: "Web Development",
    description: "A web platform that allows residents to register online with their barangay securely and efficiently. Features include user-friendly forms, data validation, and a backend system to manage submissions.",
    image: pj4,
    tags: ["HTML", "CSS", "Javascript", "PHP"],
  },
  {
    id: 3,
    title: "Hospital Management System",
    category: "Software Development",
    description: "A software application for managing hospital operations, including patient checkup appointments, doctor schedules, and health records. Users can also view hospital news and updates with interactive hover features.",
    image: pj1,
    tags: ["Java", "MySQL"],
  },
  {
    id: 4,
    title: "Attendance Management System",
    category: "Web Development",
    description: "A web application for managing college IT department attendance using RFID cards. Features include classroom-based attendance tracking, scheduling, announcements, and ongoing school events.",
    image: pj2,
    tags: ["React JS", "MySQL", "TailwindCSS"],
  },
]

const skills = [
  { name: "React / Next.js", level: 90 },
  { name: "C", level: 92 },
  { name: "C++", level: 92 },
  { name: "Java", level: 90 },
  { name: "Visual Basic", level: 90 },
  { name: "PHP", level: 88 },
]

const technologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "C / C++",
  "TailwindCSS",
  "HTML & CSS",
  "PHP",
  "Vercel",
  "Git & GitHub",
  "MySQL",
  "Express",
  "Three JS",
  "GSAP",
  "Laravel",
  "Firebase",
  "Figma",
  "Railway",
]

const socialLinks = [
  { name: "GitHub", Icon: () => <GithubIcon />, href: "https://github.com/Daiplatinueeee" },
  { name: "LinkedIn", Icon: () => <LinkedinIcon />, href: "https://www.linkedin.com/feed/" },
  { name: "Twitter", Icon: () => <TwitterIcon />, href: "https://x.com/" },
  { name: "Email", Icon: () => <MailIcon />, href: "mailto:hello@example.com" },
]

// ============================================================================
// UTILITY
// ============================================================================

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

// ============================================================================
// NAVIGATION COMPONENT
// ============================================================================

function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-background/80 backdrop-blur-md py-4" : "py-6",
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-foreground font-serif text-xl font-medium tracking-tight">
          myPortfolio
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ============================================================================
// HERO COMPONENT
// ============================================================================

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const rotatingWordRef = useRef<HTMLSpanElement>(null)

  const rotatingWords = ["life", "reality", "motion", "vision", "clarity"]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, 2500)

    return () => clearInterval(wordInterval)
  }, [])

  useEffect(() => {
    if (rotatingWordRef.current) {
      gsap.fromTo(
        rotatingWordRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
      )
    }
  }, [currentWordIndex])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.3 },
      )

      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 },
      )

      gsap.fromTo(
        scrollIndicatorRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 1 },
      )

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self : any) => {
          const progress = self.progress
          gsap.set(titleRef.current, {
            y: -150 * progress,
            opacity: 1 - 0.7 * progress,
          })
          gsap.set(subtitleRef.current, {
            y: -100 * progress,
            opacity: 1 - progress,
          })
        },
        onLeaveBack: () => {
          // Reset to visible state when scrolling back to top
          gsap.to(titleRef.current, { y: 0, opacity: 1, duration: 0.3 })
          gsap.to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.3 })
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-y-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-secondary/20 via-background to-background" />

      <div className="relative z-10 text-center px-6">
        <p className="text-muted-foreground text-sm md:text-base uppercase tracking-[0.3em] mt-[-60px] mb-4">Hello, I'm</p>
        <h1
          ref={titleRef}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-foreground leading-tight text-balance"
        >
          <span className="text-primary">Vince Edward C. Mañacap</span>
          <br />
          <span className="italic text-muted-foreground text-3xl md:text-5xl lg:text-6xl">
            bringing ideas to
            <span ref={rotatingWordRef} className="text-primary inline-block ml-3">
              {rotatingWords[currentWordIndex]}
            </span>
          </span>
        </h1>
        <p ref={subtitleRef} className="mt-6 text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
          A creative developer passionate about building polished software and web experiences with attention to detail.
        </p>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-30 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-muted-foreground text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDownIcon className="w-4 h-4 text-muted-foreground animate-bounce" />
      </div>
    </section>
  )
}

// ============================================================================
// ABOUT COMPONENT
// ============================================================================

function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -80,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-32 px-6 flex items-center">
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center ml-20">
        <div ref={contentRef}>
          <span className="text-primary text-sm uppercase tracking-widest">About Me</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 text-foreground leading-tight">
            Creating polished <br />
            <span className="italic text-primary">digital solutions</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
            I’m a Web & Application Developer passionate about creating accessible, pixel-perfect user interfaces that combine thoughtful design with solid development.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
            My passion lies where design meets development, creating experiences that are both visually stunning and highly functional.
          </p>
          <div className="mt-8 flex gap-8">
            <div>
              <span className="text-3xl font-serif text-foreground">Intern</span>
              <p className="text-muted-foreground text-sm mt-1">Learning Experience</p>
            </div>
            <div>
              <span className="text-3xl font-serif text-foreground">15+</span>
              <p className="text-muted-foreground text-sm mt-1">Projects Completed</p>
            </div>
            <div>
              <span className="text-3xl font-serif text-foreground">17+</span>
              <p className="text-muted-foreground text-sm mt-1">Programming Languages Used</p>
            </div>
          </div>
        </div>
        <div ref={imageRef} className="relative">
          <div className="aspect-4/5 rounded-lg overflow-hidden">
            <img
              src={myPic}
              alt="Developer portrait"
              className="w-[500px] h-[600px] object-cover mt-50"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-lg -z-10" />
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// PROJECTS COMPONENT
// ============================================================================

function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      )

      projectRefs.current.forEach((project, index) => {
        if (project) {
          gsap.fromTo(
            project,
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: project,
                start: "top 85%",
              },
              delay: index * 0.1,
            },
          )

          const image = project.querySelector(".project-image")
          if (image) {
            gsap.to(image, {
              scrollTrigger: {
                trigger: project,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
              y: -50,
            })
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-32 px-6 bg-card">
      <div className="container mx-auto">
        <div ref={headerRef} className="text-center mb-20">
          <span className="text-primary text-sm uppercase tracking-widest">Selected Work</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 text-foreground">
            Featured <span className="italic text-primary">Projects</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Visit my GitHub for a full overview of all my projects:{" "}
            <a
              href="https://github.com/Daiplatinueeee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              github.com/Daiplatinueeee
            </a>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                projectRefs.current[index] = el
              }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg aspect-4/3">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-foreground">
                    <span className="text-sm uppercase tracking-widest">View Project</span>
                    <ArrowUpRightIcon className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <span className="text-muted-foreground text-sm">{project.category}</span>
                <h3 className="font-serif text-2xl font-medium mt-1 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// SKILLS COMPONENT
// ============================================================================

function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const skillBarsRef = useRef<(HTMLDivElement | null)[]>([])
  const techRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      )

      skillBarsRef.current.forEach((bar, index) => {
        if (bar) {
          const fill = bar.querySelector(".skill-fill")
          if (fill) {
            gsap.fromTo(
              fill,
              { width: "0%" },
              {
                width: `${skills[index].level}%`,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: bar,
                  start: "top 85%",
                },
              },
            )
          }
        }
      })

      if (techRef.current) {
        const items = techRef.current.querySelectorAll(".tech-item")
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: techRef.current,
              start: "top 85%",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-32 px-6">
      <div className="container mx-auto">
        <div ref={headerRef} className="text-center mb-20">
          <span className="text-primary text-sm uppercase tracking-widest">Expertise</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 text-foreground">
            Skills & <span className="italic text-primary">Technologies</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-xl font-medium text-foreground mb-8">Core Competencies</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  ref={(el) => {
                    skillBarsRef.current[index] = el
                  }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-foreground">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-secondary rounded-full overflow-hidden">
                    <div className="skill-fill h-full bg-primary rounded-full" style={{ width: 0 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-medium text-foreground mb-8">Technologies I Work With</h3>
            <div ref={techRef} className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="tech-item px-4 py-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// CONTACT COMPONENT
// ============================================================================

function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )

      gsap.fromTo(
        infoRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formState)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6 bg-card">
      <div className="container mx-auto">
        <div ref={headerRef} className="text-center mb-20">
          <span className="text-primary text-sm uppercase tracking-widest">Get In Touch</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 text-foreground">
            Open for <span className="italic text-primary">Opportunities</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            If you’re looking for a web & application developer, I’d be happy to chat about how I can help with your projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="text-sm text-muted-foreground mb-2 block">
                Name
              </label>
              <input
                id="name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label htmlFor="message" className="text-sm text-muted-foreground mb-2 block">
                Message
              </label>
              <textarea
                id="message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Tell me about your project..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Send Message
              <ArrowUpRightIcon className="w-4 h-4" />
            </button>
          </form>

          <div ref={infoRef} className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-medium text-foreground mb-4">Contact Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                I’m currently looking for full-time opportunities. Feel free to email me if you’d like to discuss potential roles or collaborations.
              </p>
              <div className="mt-8 space-y-4">
                <div>
                  <span className="text-muted-foreground text-sm">Email</span>
                  <p className="text-foreground">vinceedward480@gmail.com</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Location</span>
                  <p className="text-foreground">Minglanilla, Cebu</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <span className="text-muted-foreground text-sm">Follow Me</span>
              <div className="flex gap-4 mt-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                    aria-label={link.name}
                  >
                    {link.Icon()}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 text-center">
          <p className="text-muted-foreground text-sm">© 2025. Crafted with passion.</p>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// MAIN APP
// ============================================================================

function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time : any) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time : any) => {
        lenis.raf(time * 1000)
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}

export default App

// ============================================================================
// ICON COMPONENTS
// ============================================================================

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  )
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}