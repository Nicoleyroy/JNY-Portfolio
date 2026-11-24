import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { certificates, portfolio, projects } from './data'
import Lanyard from './components/Lanyard'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [isLoading, setIsLoading] = useState(true)
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [projectSlides, setProjectSlides] = useState({})
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [formStatus, setFormStatus] = useState({ type: '', text: '' })
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.classList.add('is-loading')
    const timer = window.setTimeout(() => {
      setIsLoading(false)
      document.body.classList.remove('is-loading')
    }, reducedMotion ? 250 : 1100)

    return () => {
      window.clearTimeout(timer)
      document.body.classList.remove('is-loading')
    }
  }, [])

  useEffect(() => {
    const sections = ['work', 'about', 'certificates', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-25% 0px -55%', threshold: [0.05, 0.2, 0.45] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      duration: reducedMotion ? 0 : 1.1,
      smoothWheel: !reducedMotion,
      anchors: true,
    })
    let frameId

    const raf = (time) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(raf)
    }

    if (!reducedMotion) {
      frameId = window.requestAnimationFrame(raf)
    }

    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('resize', closeMenu)

    return () => {
      window.removeEventListener('resize', closeMenu)
      if (frameId) window.cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const updateFormField = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setFormErrors((current) => ({ ...current, [name]: '' }))
    if (formStatus.type === 'error') setFormStatus({ type: '', text: '' })
  }

  const submitContactForm = async (event) => {
    event.preventDefault()
    if (isSending) return

    const errors = {}
    if (!formData.name.trim()) errors.name = 'Please enter your name.'
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }
    if (!formData.subject.trim()) errors.subject = 'Please enter a subject.'
    if (!formData.message.trim()) errors.message = 'Please enter a message.'

    if (Object.keys(errors).length) {
      setFormErrors(errors)
      setFormStatus({ type: 'error', text: 'Please correct the highlighted fields.' })
      return
    }

    if (!formspreeEndpoint) {
      setFormStatus({
        type: 'error',
        text: 'The contact form is not configured yet. Please try again later.',
      })
      return
    }

    setIsSending(true)
    setFormStatus({ type: 'sending', text: 'Sending…' })

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      })

      if (!response.ok) throw new Error('Formspree rejected the submission')

      setFormData({ name: '', email: '', subject: '', message: '' })
      setFormErrors({})
      setFormStatus({ type: 'success', text: 'Thanks! Your message has been sent.' })
    } catch {
      setFormStatus({
        type: 'error',
        text: 'Sorry, your message could not be sent. Please keep this page open and try again.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
      {isLoading && (
        <div className="loading-screen" role="status" aria-live="polite" aria-label="Loading portfolio">
          <div className="loading-mark" aria-hidden="true">J<span>NY</span></div>
          <p>Loading portfolio</p>
          <div className="loading-line" aria-hidden="true"><span /></div>
        </div>
      )}
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Joanna Nicole Yroy, back to top">
          <span>J</span>
          <strong>NY</strong>
        </a>
        <button
          className="theme-toggle"
          type="button"
          role="switch"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          aria-checked={theme === 'dark'}
          onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}
        >
          <span className="theme-toggle-icon" aria-hidden="true">
            {theme === 'light' ? '☾' : '☀'}
          </span>
          <span className="theme-toggle-text">{theme === 'light' ? 'Dark' : 'Light'}</span>
        </button>
        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span><span></span>
        </button>
        <nav id="main-navigation" className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
          <a className={activeSection === 'about' ? 'active' : ''} href="#about" onClick={closeMenu} aria-current={activeSection === 'about' ? 'page' : undefined}>About</a>
          <a className={activeSection === 'work' ? 'active' : ''} href="#work" onClick={closeMenu} aria-current={activeSection === 'work' ? 'page' : undefined}>Projects</a>
          <a className={activeSection === 'certificates' ? 'active' : ''} href="#certificates" onClick={closeMenu} aria-current={activeSection === 'certificates' ? 'page' : undefined}>Certificates</a>
          <a className={`nav-contact ${activeSection === 'contact' ? 'active' : ''}`} href="#contact" onClick={closeMenu} aria-current={activeSection === 'contact' ? 'page' : undefined}>Contact <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-orb hero-orb-one"></div>
          <div className="hero-orb hero-orb-two"></div>
          <div className="hero-copy">
            <p className="eyebrow"><span>✦</span> Portfolio</p>
            <h1 id="hero-title">{portfolio.name}</h1>
            <p className="headline">{portfolio.headline}</p>
            <p className="hero-intro">{portfolio.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore My Work <span aria-hidden="true">↓</span></a>
              <a className="button button-secondary" href="#contact">Get in Touch</a>
            </div>
          </div>

          <div className="portrait-wrap" aria-label="Joanna Nicole Yroy lanyard card">
            <Lanyard
              frontImage="/lanyard-card.svg"
              backImage="/lanyard-card-back.svg"
              strapColor="#b79ab2"
              cardColor="#f7edf1"
              finish="matte"
              backFinish="holographic"
              cornerRadius={0.55}
              size={0.68}
              anchor="center"
              strapLength={0.48}
              strapWidth={0.7}
              metal="gold"
              gravity={0.8}
              damping={0.48}
              elasticity={0.5}
              breeze={0.45}
              interactive
              intro
              className="hero-lanyard"
            />
          </div>
        </section>

        <section className="about-section section-shell" id="about" aria-labelledby="about-title">
          <div className="about-card">
            <div className="about-heading">
              <p className="eyebrow">A little about me</p>
              <h2 id="about-title">Curious by nature,<br />creative by practice.</h2>
            </div>
            <div className="about-copy">
              <p>
                I’m an IT student at Bukidnon State University who enjoys web development,
                thoughtful design, and learning through team projects. I like turning everyday
                problems into useful tools that are clear, approachable, and easy to use.
              </p>
              <p>
                I’m especially interested in building products that help people and growing
                through collaboration, feedback, and hands-on experience.
              </p>
            </div>
          </div>

          <div className="skills-panel">
            <p className="eyebrow">Skills & interests</p>
            <ul>
              {portfolio.skills.map((skill) => <li key={skill}><span>✦</span>{skill}</li>)}
            </ul>
          </div>
        </section>

        <section className="work-section section-shell" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <h2 id="work-title">Projects <span aria-hidden="true">♡</span></h2>
            </div>
          </div>

          <div className="project-grid" aria-label="Featured projects">
            {projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-visual">
                  {(() => {
                    const images = project.screenshots?.length
                      ? project.screenshots
                      : project.screenshot
                        ? [project.screenshot]
                        : []
                    const currentSlide = projectSlides[project.id] || 0

                    if (!images.length) {
                      return (
                        <div className="screenshot-placeholder" role="img" aria-label={`${project.name} project image placeholder`}>
                          <div className="placeholder-window">
                            <span className="placeholder-mark" aria-hidden="true">{project.name.slice(0, 1)}</span>
                            <span className="placeholder-label">Replace with {project.name} screenshot</span>
                          </div>
                        </div>
                      )
                    }

                    return (
                      <div className="project-image-carousel" aria-label={`${project.name} image carousel`}>
                        <img
                          src={images[currentSlide % images.length]}
                          alt={`${project.screenshotAlt} - image ${((currentSlide % images.length) + 1)} of ${images.length}`}
                        />
                        {images.length > 1 && (
                          <>
                            <button
                              type="button"
                              className="project-carousel-arrow project-carousel-prev"
                              aria-label={`Previous ${project.name} image`}
                              onClick={() => setProjectSlides((current) => ({
                                ...current,
                                [project.id]: current[project.id]
                                  ? (current[project.id] - 1 + images.length) % images.length
                                  : images.length - 1,
                              }))}
                            >
                              ‹
                            </button>
                            <button
                              type="button"
                              className="project-carousel-arrow project-carousel-next"
                              aria-label={`Next ${project.name} image`}
                              onClick={() => setProjectSlides((current) => ({
                                ...current,
                                [project.id]: ((current[project.id] || 0) + 1) % images.length,
                              }))}
                            >
                              ›
                            </button>
                            <div className="project-carousel-dots" aria-label={`Choose ${project.name} image`}>
                              {images.map((image, index) => (
                                <button
                                  key={image}
                                  type="button"
                                  className={(currentSlide % images.length) === index ? 'active' : ''}
                                  aria-label={`Show ${project.name} image ${index + 1}`}
                                  aria-current={(currentSlide % images.length) === index ? 'true' : undefined}
                                  onClick={() => setProjectSlides((current) => ({
                                    ...current,
                                    [project.id]: index,
                                  }))}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })()}
                </div>
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-footer">
                    <ul className="tag-list" aria-label={`${project.name} technologies`}>
                      {project.technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="certificates-section section-shell" id="certificates" aria-labelledby="certificates-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Learning & achievements</p>
              <h2 id="certificates-title">Certificates <span aria-hidden="true">✦</span></h2>
            </div>
        
          </div>

          <div className="certificate-grid">
            {certificates.map((certificate, index) => (
              <article className="certificate-card" key={`${certificate.title}-${index}`}>
                {certificate.image ? (
                  <img
                    className="certificate-image"
                    src={certificate.image}
                    alt={`${certificate.title} certificate`}
                  />
                ) : (
                  <div className="certificate-placeholder" role="img" aria-label="Certificate placeholder">
                    <div className="certificate-seal" aria-hidden="true">JNY</div>
                    <span>Certificate preview</span>
                  </div>
                )}
                <div className="certificate-content">
                  <p className="certificate-year">{certificate.year}</p>
                  <h3>{certificate.title}</h3>
                  <p className="certificate-issuer">{certificate.issuer}</p>
                
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
          <div className="contact-card">
            <div className="contact-intro">

              <h2 id="contact-title">LET'S WORK TOGETHER.</h2>
              <p>I'm always interested in exploring new opportunities, collaborating on meaningful projects, and learning about innovative technologies. I'm always excited to share ideas, build new things, and grow through new experiences.</p>
              {portfolio.contact.email && (
                <a className="direct-email-link" href={`mailto:${portfolio.contact.email}`}>
                  Email me directly ↗
                </a>
              )}
              <div className="contact-links">
                {portfolio.contact.github
                  ? <a className="social-link" href={portfolio.contact.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                      <svg viewBox="0 0 19 19" aria-hidden="true"><path d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" />
                    </svg>
               
                    </a>
                  : <span className="social-link social-placeholder" title="GitHub coming soon" aria-label="GitHub coming soon">
                      <svg viewBox="0 0 19 19" aria-hidden="true"><path d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" />
                    </svg>
                   
                    </span>}
                {portfolio.contact.resume
                  ? <a className="social-link" href={portfolio.contact.resume} download aria-label="Download résumé" title="Download résumé">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
              
                    </a>
                  : <span className="social-link social-placeholder" title="Résumé coming soon" aria-label="Résumé coming soon">
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12m0 0 5-5m-5 5-5-5M5 21h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
                     <span>Résumé coming soon</span>
                    </span>}
              </div>
            </div>

            <form className="contact-form" onSubmit={submitContactForm} noValidate>
              <div className="form-field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={updateFormField}
                  aria-invalid={Boolean(formErrors.name)}
                  aria-describedby={formErrors.name ? 'contact-name-error' : undefined}
                />
                {formErrors.name && <span className="field-error" id="contact-name-error">{formErrors.name}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={updateFormField}
                  aria-invalid={Boolean(formErrors.email)}
                  aria-describedby={formErrors.email ? 'contact-email-error' : undefined}
                />
                {formErrors.email && <span className="field-error" id="contact-email-error">{formErrors.email}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={updateFormField}
                  aria-invalid={Boolean(formErrors.subject)}
                  aria-describedby={formErrors.subject ? 'contact-subject-error' : undefined}
                />
                {formErrors.subject && <span className="field-error" id="contact-subject-error">{formErrors.subject}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={updateFormField}
                  aria-invalid={Boolean(formErrors.message)}
                  aria-describedby={formErrors.message ? 'contact-message-error' : undefined}
                />
                {formErrors.message && <span className="field-error" id="contact-message-error">{formErrors.message}</span>}
              </div>

              <button
                className="contact-submit"
                type="submit"
                disabled={isSending || !formspreeEndpoint}
              >
                {isSending ? 'Sending…' : 'Send Message'}
              </button>
              {!formspreeEndpoint && (
                <p className="form-config-note">Form submission is disabled until a Formspree endpoint is configured.</p>
              )}
              <p
                className={`form-status ${formStatus.type}`}
                role={formStatus.type === 'error' ? 'alert' : 'status'}
                aria-live="polite"
                aria-atomic="true"
              >
                {formStatus.text}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} {portfolio.name}</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  )
}

export default App
