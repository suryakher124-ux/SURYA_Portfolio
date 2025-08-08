import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  GalleryHorizontalEnd,
  Play,
  ExternalLink,
  Mail,
  FileDown,
  ChevronRight,
  Images,
  Clapperboard,
  Filter,
  X,
  ChevronLeft
} from 'lucide-react'

/**
 * PROJECT DATA
 * Replace the image/video paths with your real files under public/assets/...
 */
const PROJECTS = [
  {
    id: 'dan-v1',
    title: 'Dan V1 – Low CAPEX Alkaline Electrolyzer',
    summary:
      'Prototype designed and built from first principles with 175 cm² nickel electrodes, PES separator, EPDM gaskets, and polypropylene frames.',
    role: ['Mechanical Design', 'Electrochemistry', 'Manufacturing'],
    year: '2025',
    tech: ['SolidWorks', 'CNC', 'Lathe', '3D Print', 'EPDM', 'PP', 'Nickel'],
    // Pick a strong thumbnail here:
    hero: '/assets/projects/dan-v1/stack-side-psu.jpg',
    media: [
   { type: 'image', src: '/assets/projects/dan-v1/gasket-epdm-top.jpg', alt: 'Laser-cut EPDM gaskets, top view', caption: 'EPDM gaskets, post-cut. Note feedthrough holes and Electrode Window.' },
   { type: 'image', src: '/assets/projects/dan-v1/front-panel-cart.jpg', alt: 'Electrolyzer front panel on test cart', caption: 'Front panel plumbing: labeled O2 / KOH ports for quick hookups.' },
   { type: 'image', src: '/assets/projects/dan-v1/stack-side-psu.jpg', alt: 'Stack and bench PSU during outdoor test', caption: 'Outdoor shakedown at ~10 A; checking leaks and voltage stability.' },
   { type: 'image', src: '/assets/projects/dan-v1/manifold-close.jpg', alt: 'Close-up of manifolds and fittings', caption: 'Manifold close-up: push-to-connects and isolation valves.' },
 ],
    outcomes: [
      'Sized electrodes for 50% system efficiency at target current density',
      'Reduced BOM through commodity materials and simple assembly',
      'Investigated voltage losses and membrane hydration effects'
    ],
    links: [{ label: 'One-pager (PDF)', href: '#' }]
  },
 // ---------- Shoulder Exoskeleton ----------
  {
    id: 'shoulder-exo',
    title: 'Shoulder Exoskeleton – Rapid Prototype for Overhead Support',
    summary:
      'Body-worn assist device to reduce shoulder load during overhead tasks. Focus on lightweight frame, fast support-force modulation, and manufacturable joints.',
    role: ['Mechanical Design', 'Biomechanics', 'Manufacturing'],
    year: '2025',
    tech: ['Aluminum Extrusion', '3D Print', 'CNC', 'Cable-Driven', 'Elastic Elements'],
    hero: '/assets/projects/exo/hero.jpg',
    media: [
      { type: 'image', src: '/assets/projects/exo/hero.jpg', alt: 'Exoskeleton assembled on mannequin', caption: 'Mk1 assembly: shoulder linkage, chest plate, and arm cuff.' },
      { type: 'image', src: '/assets/projects/exo/linkage-exploded.jpg', alt: 'Exploded view of shoulder linkage', caption: 'Exploded linkage with bushings and shoulder pivot.' },
      { type: 'image', src: '/assets/projects/exo/harness-detail.jpg', alt: 'Harness detail and quick-adjust straps', caption: 'Quick-adjust harness for fit across users.' },
      { type: 'image', src: '/assets/projects/exo/cuff-interface.jpg', alt: 'Arm cuff interface', caption: 'Arm cuff with soft interface and anti-slip lining.' },
      { type: 'video', src: '/assets/projects/exo/range-of-motion.mp4', caption: 'Range-of-motion check and don/doff demo.' }
    ],
    outcomes: [
      'Frame mass under 3.5 kg (target), packable to 17” x 12” x 6”',
      'Support range tuned for 60°–160° shoulder angles',
      'Rapid iteration of joints and soft-good interfaces for comfort'
    ],
    links: [{ label: 'Design Brief (PDF)', href: '#' }]
  },

  /* ---------- Closed-loop Biogas Flow Controller (commented out) ----------
  {
    id: 'flow-control',
    title: 'Closed-loop Biogas Flow Controller',
    summary:
      'Arduino based control with MEMS sensor and MOSFET driver. Achieves stable flow under varying backpressure.',
    role: ['Mechatronics', 'Controls', 'Fabrication'],
    year: '2025',
    tech: ['Arduino', 'PID', 'MOSFET', '3D Print'],
    hero: '/assets/projects/flow/cover.jpg',
    media: [
      { type: 'image', src: '/assets/projects/flow/cover.jpg', alt: 'Controller hero' },
      { type: 'video', src: '/assets/projects/flow/loop.mp4', caption: 'PID step response' }
    ],
    outcomes: ['Stable control across 0.5–5 LPM', 'Compact printable housing for field use'],
    links: [{ label: 'Github', href: '#' }]
  },
  ----------------------------------------------------------------------- */
]

const TAGS = ['All', 'Mechanical Design', 'Electrochemistry', 'Manufacturing', 'Mechatronics', 'Controls', 'Biomechanics']

export default function App() {
  const [activeTag, setActiveTag] = useState('All')
  const [viewer, setViewer] = useState({ open: false, project: null, index: 0 })

  const filtered = PROJECTS.filter((p) => activeTag === 'All' || p.role.includes(activeTag))

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <a href="#home" className="font-semibold tracking-tight text-xl">Surya Kher</a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#projects" className="hover:opacity-75">Projects</a>
            <a href="#about" className="hover:opacity-75">About</a>
            <a href="#resume" className="hover:opacity-75">Resume</a>
            <a href="#contact" className="hover:opacity-75">Contact</a>
          </nav>
          <button className="btn btn-outline md:hidden"><Filter className="h-4 w-4 mr-2" />Menu</button>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-semibold tracking-tight"
            >
              Mechanical Design Engineer
            </motion.h1>
            <p className="mt-4 text-neutral-700 leading-relaxed">
              Hardware, electrochemical systems, and practical manufacturing. I design for cost, reliability, and speed of learning.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a className="btn btn-primary" href="#projects"><GalleryHorizontalEnd className="h-4 w-4" />View Projects</a>
              <a className="btn btn-outline" href="#resume"><FileDown className="h-4 w-4" />Download Resume</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[4/3] rounded-2xl bg-neutral-100" />
            <div className="aspect-square rounded-2xl bg-neutral-100" />
            <div className="aspect-square rounded-2xl bg-neutral-100" />
            <div className="aspect-[4/3] rounded-2xl bg-neutral-100" />
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="border-t bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between gap-4">
          <div className="text-sm text-neutral-700">Filter by role</div>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={'badge ' + (activeTag === t ? 'bg-black text-white' : 'bg-white')}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section id="projects" className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Projects</h2>
          <a href="#" className="text-sm inline-flex items-center gap-1 hover:opacity-75">
            Full archive <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="card overflow-hidden">
                <div className="relative">
                  <img src={p.hero} alt={p.title} className="w-full aspect-[4/3] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {p.role.map((r) => (
                      <span key={r} className="badge bg-white/90 text-black border">{r}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-lg leading-snug">{p.title}</h3>
                  <p className="mt-1 text-sm text-neutral-700 line-clamp-3">{p.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="badge bg-white">{t}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2 flex-wrap">
                    <button className="btn btn-primary" onClick={() => setViewer({ open: true, project: p, index: 0 })}>
                      <Images className="h-4 w-4" /> Gallery
                    </button>
                    <button
                      className="btn btn-outline"
                      onClick={() =>
                        setViewer({ open: true, project: p, index: Math.max(0, p.media.findIndex((m) => m.type === 'video')) })
                      }
                    >
                      <Clapperboard className="h-4 w-4" /> Video
                    </button>
                    {p.links?.map((l) => (
                      <a key={l.label} className="btn btn-ghost" href={l.href}><ExternalLink className="h-4 w-4" />{l.label}</a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CASE STUDY OUTLINE */}
      <section className="bg-neutral-50 border-t">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Case Study Template</h2>
          <p className="mt-3 text-neutral-700 max-w-3xl">
            Each project can use this outline. Replace the placeholders with your content. Keep images and short clips near the claim they support.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              { title: '1. Problem', body: 'What was the constraint, target metric, or customer requirement?' },
              { title: '2. Approach', body: 'Sketches, trade studies, quick CAD, experiments. Show iterations.' },
              { title: '3. Design', body: 'Final geometry, materials, DFM, tolerances, FEA checks.' },
              { title: '4. Build', body: 'Fixtures, jigs, tools, assembly, QA steps.' },
              { title: '5. Test', body: 'Method, data, what failed first, changes made.' },
              { title: '6. Outcome', body: 'What improved, cost/time impact, next steps.' }
            ].map((b, i) => (
              <div key={i} className="card p-5">
                <h3 className="font-semibold">{b.title}</h3>
                <p className="text-sm text-neutral-700 mt-1">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">About</h2>
            <p className="mt-3 text-neutral-700">
              MSE Mechanical Engineering at the University of Michigan. Hands on builder with interest in circular carbon systems and low cost hardware.
            </p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="badge bg-white">Rapid learning</span>
              <span className="badge bg-white">First principles</span>
              <span className="badge bg-white">DFM</span>
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            <div className="aspect-[4/3] rounded-2xl bg-neutral-100" />
            <div className="aspect-square rounded-2xl bg-neutral-100" />
            <div className="aspect-square rounded-2xl bg-neutral-100" />
            <div className="aspect-[4/3] rounded-2xl bg-neutral-100" />
          </div>
        </div>
      </section>

      {/* RESUME */}
      <section id="resume" className="bg-neutral-50 border-t">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Resume</h2>
          <p className="mt-3 text-neutral-700">Link a PDF or embed a snapshot. Keep the site and the PDF in sync.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="btn btn-primary" href="/assets/Surya_Kher_Resume.pdf" download><FileDown className="h-4 w-4" />Download PDF</a>
            <a className="btn btn-outline" href="#contact"><Mail className="h-4 w-4" />Contact</a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact</h2>
            <p className="mt-3 text-neutral-700">Ready to talk about an internship or full time role. Email works best.</p>
            <div className="mt-4">
              <a href="mailto:ksurya@umich.edu" className="btn btn-outline"><Mail className="h-4 w-4" /> ksurya@umich.edu</a>
            </div>
          </div>
          <div className="card p-5">
            <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
              <input className="border rounded-md px-3 py-2" placeholder="Your name" />
              <input type="email" className="border rounded-md px-3 py-2" placeholder="Your email" />
              <textarea className="border rounded-md px-3 py-2" placeholder="Short note" rows="4"></textarea>
              <button type="submit" className="btn btn-primary">Send</button>
            </form>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {viewer.open && (
        <Lightbox
          project={viewer.project}
          index={viewer.index}
          onIndex={(i) => setViewer({ ...viewer, index: i })}
          onClose={() => setViewer({ open: false, project: null, index: 0 })}
        />
      )}

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-neutral-600 flex items-center justify-between">
          <div>© {new Date().getFullYear()} Surya Kher</div>
          <div className="flex gap-4">
            <a href="#home">Top</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

/**
 * Fullscreen Lightbox with fixed controls + keyboard nav + scroll lock
 */
function Lightbox({ project, index, onIndex, onClose }) {
  if (!project) return null
  const items = project.media || []
  const item = items[index] || items[0]

  // Lock scroll + keyboard controls
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndex((index + 1) % items.length)
      if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [index, items.length, onIndex, onClose])

  const next = () => onIndex((index + 1) % items.length)
  const prev = () => onIndex((index - 1 + items.length) % items.length)

  return (
    <div className="fixed inset-0 z-[100] bg-black/80" onClick={onClose} role="dialog" aria-modal="true">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-end px-4">
        <button type="button" className="text-white p-2" onClick={onClose} aria-label="Close">
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Stage */}
      <div
        className="h-full w-full flex items-center justify-center px-6"
        onClick={(e) => e.stopPropagation()} // don’t close when clicking media
      >
        {/* Prev/Next */}
        <button type="button" className="absolute left-2 md:left-4 text-white/90 p-3" onClick={prev} aria-label="Previous">
          <ChevronLeft className="h-7 w-7" />
        </button>
        <button type="button" className="absolute right-2 md:right-4 text-white/90 p-3" onClick={next} aria-label="Next">
          <ChevronRight className="h-7 w-7" />
        </button>

        {/* Media */}
        <div className="max-w-[92vw] max-h-[80vh]">
          {item?.type === 'image' ? (
            <img
              src={item.src}
              alt={item.alt || project.title}
              className="max-h-[80vh] max-w-[92vw] object-contain rounded-lg"
            />
          ) : (
            <video className="max-h-[80vh] max-w-[92vw] rounded-lg" controls src={item.src}>
              Sorry, your browser can’t play this video.
            </video>
          )}
          {item?.caption && <p className="text-white/90 text-sm mt-2 text-center">{item.caption}</p>}
        </div>
      </div>

      {/* Thumbs rail */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-3 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto max-w-5xl flex gap-2 px-3">
          {items.map((m, i) => (
            <button
              type="button"
              key={i}
              onClick={() => onIndex(i)}
              className={`h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border ${
                i === index ? 'ring-2 ring-white' : 'opacity-80 hover:opacity-100'
              }`}
              aria-label={`Go to media ${i + 1}`}
            >
              {m.type === 'image' ? (
                <img src={m.src} alt="thumb" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full grid place-items-center bg-neutral-900 text-white text-xs">
                  <Play className="h-4 w-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
