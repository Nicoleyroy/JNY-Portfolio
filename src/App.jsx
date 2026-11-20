import { useEffect, useState } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'
import { certificates, portfolio, projects } from './data'
import { experience } from './data/experience'
import Folder from './components/Folder'
import Lanyard from './components/Lanyard'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
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
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      duration: reducedMotion ? 0 : 1.1,
      smoothWheel: !reducedMotion,
      anchors: true,
    })
    let frameId
    let projectObserver

    const raf = (time) => {
      lenis.raf(time)
      frameId = window.requestAnimationFrame(raf)
    }

    if (!reducedMotion) {
      frameId = window.requestAnimationFrame(raf)
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.hero-copy > *', {
          y: 18,
          opacity: 0,
          duration: 0.65,
          stagger: 0.09,
          ease: 'power2.out',
        })
        gsap.from('.portrait-frame', {
          scale: 0.96,
          opacity: 0,
          duration: 0.8,
          delay: 0.15,
          ease: 'power2.out',
        })

        const cards = gsap.utils.toArray('.project-card')
        cards.forEach((card) => {
          gsap.set(card, { y: 28, opacity: 0 })
        })
        projectObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return
              gsap.to(entry.target, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power2.out',
              })
              projectObserver.unobserve(entry.target)
            })
          },
          { threshold: 0.12 },
        )
        cards.forEach((card) => projectObserver.observe(card))
      })
    }

    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('resize', closeMenu)

    return () => {
      window.removeEventListener('resize', closeMenu)
      if (frameId) window.cancelAnimationFrame(frameId)
      if (projectObserver) projectObserver.disconnect()
      lenis.destroy()
      gsap.matchMedia().revert()
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
          <span>J</span>NY
        </a>
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
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#certificates" onClick={closeMenu}>Certificates</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-orb hero-orb-one"></div>
          <div className="hero-orb hero-orb-two"></div>
          <div className="hero-copy">
            <p className="eyebrow"><span>✦</span> Portfolio 2026</p>
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
              finish="holographic"
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

        <section className="work-section section-shell" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected projects</p>
              <h2 id="work-title">Featured Work <span aria-hidden="true">♡</span></h2>
            </div>
          </div>

          <div className="folder-project-grid" aria-label="Interactive project folders">
            {projects.map((project, index) => (
              <div className="folder-project" key={project.id}>
                <Folder
                  mode="book"
                  variant="solid"
                  color={index % 2 === 0 ? '#ddb5c7' : '#bbb2d1'}
                  paperColor="#fffaf7"
                  label={project.name}
                  tabPosition="center"
                  layout="spread"
                  size={0.92}
                  openOn="click"
                  defaultOpen={false}
                  draggable
                  zoomOnClick
                  intro
                  theme="light"
                  onItemClick={() => undefined}
                >
                  <div className="folder-project-page folder-project-cover">
                    <span className="folder-project-index">0{index + 1}</span>
                    {project.screenshot ? (
                      <img src={project.screenshot} alt={project.screenshotAlt} />
                    ) : (
                      <div className="folder-project-placeholder" role="img" aria-label={`${project.name} screenshot placeholder`}>
                        <span>{project.name.slice(0, 1)}</span>
                      </div>
                    )}
                    <strong>{project.name}</strong>
                    <small>{project.category}</small>
                  </div>

                  <div className="folder-project-page folder-project-details">
                    <span className="folder-project-kicker">Overview</span>
                    <p>{project.description}</p>
                    <ul>
                      {project.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="folder-project-page folder-project-details">
                    <span className="folder-project-kicker">My contribution</span>
                    <p><strong>{project.role}</strong></p>
                    <p>{project.contribution}</p>
                    <div className="folder-project-tags">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </Folder>
              </div>
            ))}
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

        <section className="experience-section section-shell" id="experience" aria-labelledby="experience-title">
          <div className="experience-heading">
            <p className="eyebrow">Professional growth</p>
            <h2 id="experience-title">Experience</h2>
            <p className="experience-intro">A timeline of team and academic work.</p>
          </div>

          <div className="experience-timeline">
            {experience.map((item, index) => (
              <article className="experience-item" key={`${item.project}-${index}`}>
                <span className="timeline-dot" aria-hidden="true" />
                <div className="experience-card">
                  <div className="experience-meta">
                    <span>{item.context}</span>
                    {item.date && <time>{item.date}</time>}
                  </div>
                  <h3>{item.project}</h3>
                  <p className="experience-role">{item.role}</p>
                  <p className="experience-description">{item.description}</p>
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
            <p className="section-note">Credentials, courses, and achievements.</p>
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
                  {certificate.file ? (
                    <a href={certificate.file} target="_blank" rel="noreferrer">
                      View certificate ↗
                    </a>
                  ) : (
                    <span className="certificate-link-placeholder">Link coming soon</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
          <div className="contact-card">
            <div className="contact-intro">
              <p className="eyebrow">Let’s connect</p>
              <h2 id="contact-title">Have a project or<br />opportunity in mind?</h2>
              <p>I’d love to hear about it.</p>
              {portfolio.contact.email && (
                <a className="direct-email-link" href={`mailto:${portfolio.contact.email}`}>
                  Email me directly ↗
                </a>
              )}
              <div className="contact-links">
                {portfolio.contact.github
                  ? <a href={portfolio.contact.github} target="_blank" rel="noreferrer">GitHub ↗</a>
                  : <span>GitHub · coming soon</span>}
                {portfolio.contact.linkedin
                  ? <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
                  : <span>LinkedIn · coming soon</span>}
                {portfolio.contact.resume
                  ? <a href={portfolio.contact.resume} download>Résumé ↓</a>
                  : <span>Résumé · coming soon</span>}
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
