"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Mail, Phone, ExternalLink } from "lucide-react"
import { useMouseGlow } from "../hooks/use-mouse-glow"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const mousePosition = useMouseGlow()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "projects"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 relative">
      {/* Mouse glow effect */}
      <div 
        className="mouse-glow"
        style={{
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`,
        } as React.CSSProperties}
      />
      <div className="mx-auto max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0 content-layer">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left Column - Navigation */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
                <a href="/">Sai Vikyath R Komatireddy</a>
              </h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                Software Engineer & Data Scientist
              </h2>
              <p className="mt-4 max-w-xs leading-normal text-slate-400">
                Building scalable AI-powered solutions and modern web applications with a focus on performance and user
                experience.
              </p>

              {/* Navigation */}
              <nav className="nav hidden lg:block" aria-label="In-page jump links">
                <ul className="mt-16 w-max">
                  {[
                    { id: "about", label: "About" },
                    { id: "experience", label: "Experience" },
                    { id: "projects", label: "Projects" },
                  ].map((item) => (
                    <li key={item.id}>
                      <a
                        className={`group flex items-center py-3 ${activeSection === item.id ? "active" : ""}`}
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(item.id)
                        }}
                      >
                        <span
                          className={`nav-indicator mr-4 h-px transition-all ${
                            activeSection === item.id
                              ? "w-16 bg-slate-200"
                              : "w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200"
                          }`}
                        ></span>
                        <span
                          className={`nav-text text-xs font-bold uppercase tracking-widest transition-colors ${
                            activeSection === item.id ? "text-slate-200" : "text-slate-500 group-hover:text-slate-200"
                          }`}
                        >
                          {item.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social Links */}
            <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
              <li className="mr-5 text-xs">
                <a
                  className="block hover:text-slate-200"
                  href="https://github.com/vikyath5246"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="h-6 w-6" />
                </a>
              </li>
              <li className="mr-5 text-xs">
                <a
                  className="block hover:text-slate-200"
                  href="https://linkedin.com/in/vikyath664"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </li>
              <li className="mr-5 text-xs">
                <a className="block hover:text-slate-200" href="mailto:saivikyathkomatireddy@gmail.com">
                  <Mail className="h-6 w-6" />
                </a>
              </li>
              <li className="mr-5 text-xs">
                <a className="block hover:text-slate-200" href="tel:682-376-5751">
                  <Phone className="h-6 w-6" />
                </a>
              </li>
            </ul>
          </header>

          {/* Right Column - Content */}
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            {/* About Section */}
            <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">About</h2>
              </div>
              <div>
                <p className="mb-4">
                  I'm a passionate Software Engineer and Data Scientist currently pursuing my Master's in Data Science
                  at{" "}
                  <a
                    className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                    href="https://www.stonybrook.edu/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Stony Brook University
                  </a>
                  . With a strong foundation in Computer Science from{" "}
                  <a
                    className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                    href="https://www.iitg.ac.in/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    IIT Guwahati
                  </a>
                  , I specialize in building scalable AI-powered solutions and modern web applications.
                </p>
                <p className="mb-4">
                  My experience spans from developing enterprise-grade AI document assistants at{" "}
                  <a
                    className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300"
                    href="https://www.oracle.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Oracle
                  </a>{" "}
                  to building semantic search engines and working on cutting-edge ML research. I'm particularly
                  passionate about the intersection of AI, web development, and user experience.
                </p>
                <p>
                  When I'm not coding, you can find me exploring the outdoors through fishing, hiking, and running. I
                  believe in continuous learning and enjoy tackling complex problems that push the boundaries of
                  technology.
                </p>
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Experience</h2>
              </div>
              <div>
                <ol className="group/list">
                  {/* Research Assistant */}
                  <li className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        Aug 2024 — Present
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <div>
                            <a
                              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                              href="#"
                              aria-label="Research Assistant at AI Innovation Institute"
                            >
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>Research Assistant — AI Innovation Institute</span>
                            </a>
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          Engineered an AI-driven platform to generate and update 3D scene graphs using outputs from
                          Grounded SAM and LLMs. Integrated FastAPI for LLM inference and designed CI/CD pipelines,
                          improving semantic accuracy by 25% and reducing model response time by 40%.
                        </p>
                        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                          {["Python", "FastAPI", "LLMs", "Docker", "Kubernetes", "Jenkins"].map((tech) => (
                            <li key={tech} className="mr-1.5 mt-2">
                              <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                {tech}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>

                  {/* Software Engineer Intern - SalVenture Tech */}
                  <li className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        Dec 2024 — Jan 2025
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <div>
                            <a
                              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                              href="#"
                              aria-label="Software Engineer Intern at SalVenture Tech"
                            >
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>Software Engineer Intern — SalVenture Tech</span>
                            </a>
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          Led development of Thalmaar AI's official website with scalable, responsive design. Built
                          dynamic SEO-optimized pages and deployed a custom LLM-based chatbot, implementing
                          comprehensive CI/CD pipelines and testing frameworks.
                        </p>
                        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                          {["React", "Next.js", "TailwindCSS", "FastAPI", "MongoDB", "GitHub Actions", "Jest"].map(
                            (tech) => (
                              <li key={tech} className="mr-1.5 mt-2">
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                  {tech}
                                </div>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </li>

                  {/* Software Engineer - Oracle */}
                  <li className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        July 2022 — Aug 2023
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <div>
                            <a
                              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                              href="https://www.oracle.com/"
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Software Engineer at Oracle"
                            >
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>Software Engineer — Oracle</span>
                              <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                            </a>
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          Built enterprise-grade AI-powered document assistant achieving 95%+ query resolution rate.
                          Engineered fraud detection system with Spring Boot and Kafka, designed secure RBAC-enabled
                          REST APIs, and containerized microservices improving release frequency by 50%.
                        </p>
                        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                          {[
                            "GenAI",
                            "FastAPI",
                            "React",
                            "Oracle Vector DB",
                            "Spring Boot",
                            "Kafka",
                            "Docker",
                            "Jenkins",
                          ].map((tech) => (
                            <li key={tech} className="mr-1.5 mt-2">
                              <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                {tech}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Projects</h2>
              </div>
              <div>
                <ul className="group/list">
                  <li className="mb-12">
                    <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <div className="z-10 sm:order-2 sm:col-span-6">
                        <h3>
                          <a
                            className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                            href="#"
                            aria-label="Query Mind - Semantic Search Engine"
                          >
                            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                            <span>Query Mind</span>
                          </a>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          Built a semantic search engine with scalable web interfaces using React and Next.js. Designed
                          high-performance FastAPI backend with {"<"}1s latency, integrated custom NLP embeddings with
                          LLaMA LLM enhancing retrieval precision by 40%, and built fault-tolerant data ingestion
                          pipeline processing 2.6M+ research papers.
                        </p>
                        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                          {[
                            "RAG",
                            "LLM",
                            "Python",
                            "FastAPI",
                            "React",
                            "Next.js",
                            "MongoDB",
                            "Docker",
                            "Kubernetes",
                            "Jenkins",
                            "BigQuery",
                          ].map((tech) => (
                            <li key={tech} className="mr-1.5 mt-2">
                              <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                                {tech}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <img
                        alt="Query Mind project screenshot"
                        loading="lazy"
                        width="200"
                        height="48"
                        decoding="async"
                        className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
                        src="/placeholder.svg?height=120&width=200"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            {/* Footer */}
            <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
              <p>
                Built with{" "}
                <a
                  href="https://nextjs.org/"
                  className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  Next.js
                </a>{" "}
                and{" "}
                <a
                  href="https://tailwindcss.com/"
                  className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  Tailwind CSS
                </a>
                , deployed with{" "}
                <a
                  href="https://vercel.com/"
                  className="font-medium text-slate-400 hover:text-teal-300 focus-visible:text-teal-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  Vercel
                </a>
                .
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
