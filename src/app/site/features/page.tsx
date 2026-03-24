import {
  LayoutDashboard,
  Zap,
  Users,
  BarChart3,
  Globe,
  ShieldCheck,
  ArrowRight,
  Puzzle,
  Repeat2,
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: LayoutDashboard,
    title: 'Unified Dashboard',
    description:
      'Manage every client, funnel, and pipeline from a single, intuitive workspace. No context-switching required.',
  },
  {
    icon: Zap,
    title: 'Drag-and-Drop Funnel Builder',
    description:
      'Build high-converting funnels in minutes with our visual editor. Publish directly to a custom subdomain.',
  },
  {
    icon: Users,
    title: 'Multi-Team Management',
    description:
      'Invite teammates, set granular permissions, and collaborate in real-time across all your sub-accounts.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description:
      'Track pipeline performance, revenue trends, and client KPIs with beautiful, actionable reports.',
  },
  {
    icon: Globe,
    title: 'Custom Subdomains',
    description:
      'Every funnel gets its own subdomain out of the box. White-label the experience for each of your clients.',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise-grade Security',
    description:
      "Role-based access control and secure authentication powered by Clerk ensure your data stays protected.",
  },
  {
    icon: Puzzle,
    title: 'Stripe Integration',
    description:
      'Accept payments, manage subscriptions, and handle rebilling natively — no third-party glue required.',
  },
  {
    icon: Repeat2,
    title: 'Automated Pipelines',
    description:
      'Automate repetitive tasks with smart pipeline triggers and move deals through your sales process effortlessly.',
  },
]

export default function FeaturesPage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* grid bg */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_110%)] -z-10" />

      {/* Hero */}
      <section className="flex flex-col items-center text-center gap-6 pt-36 pb-24 px-4">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 bg-primary/10 px-4 py-1.5 rounded-full">
          Everything you need
        </span>
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent leading-tight">
          Built for modern agencies
        </h1>
        <p className="max-w-xl text-muted-foreground text-lg">
          Nexus bundles every tool your agency relies on — from funnel building
          to billing — into one beautifully unified platform.
        </p>
        <div className="flex items-center gap-4 mt-2">
          <Link
            href="/agency"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/80 transition-colors"
          >
            Get started free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/site/pricing"
            className="text-muted-foreground hover:text-foreground transition-colors font-medium"
          >
            View pricing →
          </Link>
        </div>
      </section>

      {/* Feature grid */}
      <section className="max-w-6xl mx-auto px-4 pb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 flex flex-col gap-4 hover:border-primary/40 hover:bg-white/[0.06] transition-all duration-300"
          >
            <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
