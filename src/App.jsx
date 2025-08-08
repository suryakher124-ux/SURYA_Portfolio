import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GalleryHorizontalEnd, Play, ExternalLink, Mail, FileDown, ChevronRight, Images, Clapperboard, Filter } from 'lucide-react'

const PROJECTS = [
  {
    id: 'dan-v1',
    title: 'Dan V1 – Low CAPEX Alkaline Electrolyzer',
    summary: 'Prototype designed and built from first principles with 175 cm² nickel electrodes, PES separator, EPDM gaskets, and polypropylene frames.',
    role: ['Mechanical Design', 'Electrochemistry', 'Manufacturing'],
    year: '2025',
    tech: ['SolidWorks', 'CNC', 'Lathe', '3D Print', 'EPDM', 'PP', 'Nickel'],
   hero: '/assets/projects/dan-v1/front-panel-cart.jpg',
media: [
  { type: 'image', src: '/assets/projects/dan-v1/gasket-epdm-top.jpg', alt: 'Laser-cut EPDM gaskets, top view', caption: 'EPDM gaskets, post-cut. Note feedthrough holes and locator tab.' },
  { type: 'image', src: '/assets/projects/dan-v1/front-panel-cart.jpg', alt: 'Electrolyzer front panel on test cart', caption: 'Front panel plumbing: labeled O2 / KOH ports for quick hookups.' },
  { type: 'image', src: '/assets/projects/dan-v1/stack-side-psu.jpg', alt: 'Stack and bench PSU during outdoor test', caption: 'Outdoor shakedown at ~10 A; checking leaks and voltage stability.' },
  { type: 'image', src: '/assets/projects/dan-v1/manifold-close.jpg', alt: 'Close-up of manifolds and fittings', caption: 'Manifold close-up: push-to-connects and isolation valves.' },
],

    outcomes: [
      'Sized electrodes for 50% system efficiency at target current density',
      'Reduced BOM through commodity materials and simple assembly',
      'Investigated voltage losses and membrane hydration effects',
    ],
    links: [{ label: 'One‑pager (PDF)', href: '#' }],
  },
  {
    id: 'flow-control',
    title: 'Closed‑loop Biogas Flow Controller',
    summary: 'Arduino based control with MEMS sensor and MOSFET driver. Achieves stable flow under varying backpressure.',
    role: ['Mechatronics', 'Controls', 'Fabrication'],
    year: '2025',
    tech: ['Arduino', 'PID', 'MOSFET', '3D Print'],
    hero: '/assets/projects/flow/cover.jpg',
    media: [
      { type: 'image', src: '/assets/projects/flow/cover.jpg', alt: 'Controller hero' },
      { type: 'video', src: '/assets/projects/flow/loop.mp4', caption: 'PID step response' },
    ],
    outcomes: ['Stable control across 0.5–5 LPM', 'Compact printable housing for field use'],
    links: [{ label: 'Github', href: '#' }],
  },
]

const TAGS = ['All', 'Mechanical Design', 'Electrochemistry', 'Manufacturing', 'Mechatronics', 'Controls']

export default function App() {
  const [activeTag, setActiveTag] = useState('All')
  const [viewer, setViewer] = useState({ open: false, project: null, index: 0 })

  const filtered = PROJECTS.filter(p => activeTag === 'All' || p.role.includes(activeTag))

  return (
    <div className='min-h-screen bg-white text-neutral-900'>
      {/* NAVBAR */}
      <header className='sticky top-0 z-40 backdrop-blur bg-white/70 border-b'>
        <div className='max-w-6xl mx-auto flex items-center justify-between px-4 py-3'>
          <a href='#home' className='font-semibold tracking-tight text-xl'>Surya Kher</a>
          <nav className='hidden md:flex gap-6 text-sm'>
            <a href='#projects' className='hover:opacity-75'>Projects</a>
            <a href='#about' className='hover:opacity-75'>About</a>
            <a href='#resume' className='hover:opacity-75'>Resume</a>
            <a href='#contact' className='hover:opacity-75'>Contact</a>
          </nav>
          <button className='btn btn-outline md:hidden'><Filter className='h-4 w-4 mr-2'/>Menu</button>
        </div>
      </header>

      {/* HERO */}
      <section id='home' className='relative overflow-hidden'>
        <div className='max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center'>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='text-4xl md:text-5xl font-semibold tracking-tight'
            >
              Mechanical Design Engineer
            </motion.h1>
            <p className='mt-4 text-neutral-700 leading-relaxed'>
              Hardware, electrochemical systems, and practical manufacturing. I design for cost, reliability, and speed of learning.
            </p>
            <div className='mt-6 flex items-center gap-3'>
              <a className='btn btn-primary' href='#projects'><GalleryHorizontalEnd className='h-4 w-4'/>View Projects</a>
              <a className='btn btn-outline' href='#resume'><FileDown className='h-4 w-4'/>Download Resume</a>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <div className='aspect-[4/3] rounded-2xl bg-neutral-100'/>
            <div className='aspect-square rounded-2xl bg-neutral-100'/>
            <div className='aspect-square rounded-2xl bg-neutral-100'/>
            <div className='aspect-[4/3] rounded-2xl bg-neutral-100'/>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className='border-t bg-neutral-50'>
        <div className='max-w-6xl mx-auto px-4 py-6 flex items-center justify-between gap-4'>
          <div className='text-sm text-neutral-700'>Filter by role</div>
          <div className='flex flex-wrap gap-2'>
            {TAGS.map(t => (
              <button key={t} onClick={() => setActiveTag(t)} className={'badge ' + (activeTag === t ? 'bg-black text-white' : 'bg-white')}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section id='projects' className='max-w-6xl mx-auto px-4 py-14'>
        <div className='flex items-end justify-between mb-6'>
          <h2 className='text-2xl md:text-3xl font-semibold tracking-tight'>Projects</h2>
          <a href='#' className='text-sm inline-flex items-center gap-1 hover:opacity-75'>
            Full archive <ChevronRight className='h-4 w-4'/>
          </a>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filtered.map((p) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className='card overflow-hidden'>
                <div className='relative'>
                  <img src={p.hero} alt={p.title} className='w-full aspect-[4/3] object-cover'/>
                  <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'/>
                  <div className='absolute bottom-3 left-3 flex gap-2'>
                    {p.role.map((r) => (
                      <span key={r} className='badge bg-white/90 text-black border'>{r}</span>
                    ))}
                  </div>
                </div>
                <div className='p-5'>
                  <h3 className='font-semibold text-lg leading-snug'>{p.title}</h3>
                  <p className='mt-1 text-sm text-neutral-700 line-clamp-3'>{p.summary}</p>
                  <div className='mt-4 flex flex-wrap gap-2'>
                    {p.tech.map((t) => (
                      <span key={t} className='badge bg-white'>{t}</span>
                    ))}
                  </div>
                  <div className='mt-4 flex gap-2 flex-wrap'>
                    <button className='btn btn-primary' onClick={() => setViewer({ open: true, project: p, index: 0 })}>
                      <Images className='h-4 w-4'/> Gallery
                    </button>
                    <button className='btn btn-outline' onClick={() => setViewer({ open: true, project: p, index: p.media.findIndex((m)=>m.type==='video') || 0 })}>
                      <Clapperboard className='h-4 w-4'/> Video
                    </button>
                    {p.links?.map((l) => (
                      <a key={l.label} className='btn btn-ghost' href={l.href}><ExternalLink className='h-4 w-4'/>{l.label}</a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CASE STUDY OUTLINE */}
      <section className='bg-neutral-50 border-t'>
        <div className='max-w-6xl mx-auto px-4 py-16'>
          <h2 className='text-2xl md:text-3xl font-semibold tracking-tight'>Case Study Template</h2>
          <p className='mt-3 text-neutral-700 max-w-3xl'>
            Each project can use this outline. Replace the placeholders with your content. Keep images and short clips near the claim they support.
          </p>
          <div className='mt-6 grid md:grid-cols-3 gap-6'>
            {[
              {title: '1. Problem', body: 'What was the constraint, target metric, or customer requirement?'},
              {title: '2. Approach', body: 'Sketches, trade studies, quick CAD, experiments. Show iterations.'},
              {title: '3. Design', body: 'Final geometry, materials, DFM, tolerances, FEA checks.'},
              {title: '4. Build', body: 'Fixtures, jigs, tools, assembly, QA steps.'},
              {title: '5. Test', body: 'Method, data, what failed first, changes made.'},
              {title: '6. Outcome', body: 'What improved, cost/time impact, next steps.'},
            ].map((b, i) => (
              <div key={i} className='card p-5'>
                <h3 className='font-semibold'>{b.title}</h3>
                <p className='text-sm text-neutral-700 mt-1'>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id='about' className='max-w-6xl mx-auto px-4 py-16'>
        <div className='grid md:grid-cols-3 gap-8'>
          <div>
            <h2 className='text-2xl md:text-3xl font-semibold tracking-tight'>About</h2>
            <p className='mt-3 text-neutral-700'>
              MSE Mechanical Engineering at the University of Michigan. Hands on builder with interest in circular carbon systems and low cost hardware.
            </p>
            <div className='mt-4 flex gap-2 flex-wrap'>
              <span className='badge bg-white'>Rapid learning</span>
              <span className='badge bg-white'>First principles</span>
              <span className='badge bg-white'>DFM</span>
            </div>
          </div>
          <div className='md:col-span-2 grid grid-cols-2 gap-3'>
            <div className='aspect-[4/3] rounded-2xl bg-neutral-100'/>
            <div className='aspect-square rounded-2xl bg-neutral-100'/>
            <div className='aspect-square rounded-2xl bg-neutral-100'/>
            <div className='aspect-[4/3] rounded-2xl bg-neutral-100'/>
          </div>
        </div>
      </section>

      {/* RESUME */}
      <section id='resume' className='bg-neutral-50 border-t'>
        <div className='max-w-6xl mx-auto px-4 py-16'>
          <h2 className='text-2xl md:text-3xl font-semibold tracking-tight'>Resume</h2>
          <p className='mt-3 text-neutral-700'>Link a PDF or embed a snapshot. Keep the site and the PDF in sync.</p>
          <div className='mt-6 flex flex-wrap gap-3'>
            <a className='btn btn-primary' href='/assets/Surya_Kher_Resume.pdf' download><FileDown className='h-4 w-4'/>Download PDF</a>
            <a className='btn btn-outline' href='#contact'><Mail className='h-4 w-4'/>Contact</a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id='contact' className='max-w-6xl mx-auto px-4 py-16'>
        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <h2 className='text-2xl md:text-3xl font-semibold tracking-tight'>Contact</h2>
            <p className='mt-3 text-neutral-700'>Ready to talk about an internship or full time role. Email works best.</p>
            <div className='mt-4'>
              <a href='mailto:ksurya@umich.edu' className='btn btn-outline'><Mail className='h-4 w-4'/> ksurya@umich.edu</a>
            </div>
          </div>
          <div className='card p-5'>
            <form className='grid gap-3' onSubmit={(e)=> e.preventDefault()}>
              <input className='border rounded-md px-3 py-2' placeholder='Your name' />
              <input type='email' className='border rounded-md px-3 py-2' placeholder='Your email' />
              <textarea className='border rounded-md px-3 py-2' placeholder='Short note' rows='4'></textarea>
              <button type='submit' className='btn btn-primary'>Send</button>
            </form>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {viewer.open && (
        <div className='fixed inset-0 bg-black/70 z-[60] grid place-items-center p-4' onClick={()=> setViewer({ open: false, project: null, index: 0 })}>
          <div className='max-w-4xl w-full bg-white rounded-2xl p-4' onClick={(e)=> e.stopPropagation()}>
            <h3 className='font-semibold mb-3'>{viewer.project?.title}</h3>
            <MediaViewer project={viewer.project} index={viewer.index} onIndex={(i)=> setViewer({ ...viewer, index: i })}/>
            <div className='text-right mt-2'>
              <button className='btn btn-outline' onClick={()=> setViewer({ open: false, project: null, index: 0 })}>Close</button>
            </div>
          </div>
        </div>
      )}

      <footer className='border-t'>
        <div className='max-w-6xl mx-auto px-4 py-8 text-sm text-neutral-600 flex items-center justify-between'>
          <div>© {new Date().getFullYear()} Surya Kher</div>
          <div className='flex gap-4'>
            <a href='#home'>Top</a>
            <a href='#projects'>Projects</a>
            <a href='#contact'>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function MediaViewer({ project, index, onIndex }) {
  if (!project) return null
  const items = project.media
  const item = items[index] || items[0]
  const next = () => onIndex((index + 1) % items.length)
  const prev = () => onIndex((index - 1 + items.length) % items.length)

  return (
    <div>
      <div className='relative'>
        {item.type === 'image' ? (
          <img src={item.src} alt={item.alt || project.title} className='w-full rounded-xl object-contain' />
        ) : (
          <div className='aspect-video w-full rounded-xl bg-black grid place-items-center'>
            <button className='btn btn-outline text-white border-white' onClick={()=>{}}>
              <Play className='h-4 w-4'/> Play demo (placeholder)
            </button>
          </div>
        )}
        {item.caption && (<p className='mt-2 text-sm text-neutral-700'>{item.caption}</p>)}
      </div>
      <div className='mt-4 flex items-center justify-between gap-2'>
        <button className='btn btn-outline' onClick={prev}>Prev</button>
        <div className='flex gap-2 overflow-x-auto'>
          {items.map((m, i) => (
            <button key={i} onClick={()=> onIndex(i)} className={'h-16 w-24 rounded-md overflow-hidden border ' + (i===index ? 'ring-2 ring-black' : '')}>
              {m.type === 'image' ? (
                <img src={m.src} alt='thumb' className='h-full w-full object-cover'/>
              ) : (
                <div className='h-full w-full grid place-items-center bg-neutral-100 text-xs'><Play className='h-4 w-4'/></div>
              )}
            </button>
          ))}
        </div>
        <button className='btn btn-outline' onClick={next}>Next</button>
      </div>
    </div>
  )
}
