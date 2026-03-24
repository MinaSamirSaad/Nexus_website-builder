import { Target, Lightbulb, Heart, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const values = [
  {
    icon: Target,
    title: 'Simplicity first',
    description:
      'We obsess over removing complexity. Every feature exists to make your agency work faster, not slower.',
  },
  {
    icon: Lightbulb,
    title: 'Built for builders',
    description:
      'Nexus was born out of real agency pain points. Every decision is made by people who have lived the same challenges.',
  },
  {
    icon: Heart,
    title: 'Customer-obsessed',
    description:
      'Our 24/7 support team and community forum means you always have someone in your corner.',
  },
]

const stats = [
  { value: '10k+', label: 'Agencies powered' },
  { value: '$2M+', label: 'Revenue processed' },
  { value: '150+', label: 'Countries' },
  { value: '99.9%', label: 'Uptime SLA' },
]

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* grid bg */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_110%)] -z-10" />

      {/* Hero */}
      <section className="flex flex-col items-center text-center gap-6 pt-36 pb-24 px-4">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 bg-primary/10 px-4 py-1.5 rounded-full">
          Our story
        </span>
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent leading-tight">
          We{"'"}re on a mission to<br className="hidden md:block" /> simplify agency work
        </h1>
        <p className="max-w-2xl text-muted-foreground text-lg">
          Nexus started as a frustration — too many tools, too many tabs. Today it{"'"}s the
          all-in-one platform trusted by thousands of agencies to run their entire business.
        </p>
        <Link
          href="/agency"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/80 transition-colors"
        >
          Join us today <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-4 pb-24 grid grid-cols-2 md:grid-cols-4 gap-px border border-white/10 rounded-2xl overflow-hidden">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center gap-1 py-10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
          >
            <span className="text-4xl font-bold text-foreground">{value}</span>
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 pb-32">
        <h2 className="text-3xl font-bold text-center mb-12">What we stand for</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-8 flex flex-col gap-4 hover:border-primary/40 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
