import {
  BookOpen,
  Terminal,
  Rocket,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

const sections = [
  {
    icon: Rocket,
    badge: 'Getting Started',
    title: 'Quickstart guide',
    description: 'Set up your agency account, invite your team, and launch your first funnel in under 10 minutes.',
    links: ['Create your agency', 'Invite team members', 'Build your first funnel', 'Connect a custom domain'],
  },
  {
    icon: BookOpen,
    badge: 'Core Concepts',
    title: 'Platform overview',
    description: 'Understand the key building blocks of Nexus — agencies, sub-accounts, pipelines, and funnels.',
    links: ['Agencies & sub-accounts', 'Pipelines & contacts', 'Funnel pages & steps', 'Billing & subscriptions'],
  },
  {
    icon: Terminal,
    badge: 'API Reference',
    title: 'Integrate with Nexus',
    description: 'Automate workflows, pull analytics data, and extend Nexus capabilities with our REST API.',
    links: ['Authentication', 'Contacts API', 'Funnels API', 'Webhooks'],
  },
]

const popularArticles = [
  'How to white-label your client portal',
  'Connecting Stripe for subscription billing',
  'Setting up a custom subdomain',
  'Managing team permissions and roles',
  'Importing contacts via CSV',
  'Trigger-based pipeline automation',
]

export default function DocumentationPage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* grid bg */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_110%)] -z-10" />

      {/* Hero */}
      <section className="flex flex-col items-center text-center gap-6 pt-36 pb-20 px-4">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 bg-primary/10 px-4 py-1.5 rounded-full">
          Documentation
        </span>
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent leading-tight">
          Everything you need<br className="hidden md:block" /> to know
        </h1>
        <p className="max-w-xl text-muted-foreground text-lg">
          Explore guides, API references, and in-depth tutorials to get the most out of Nexus.
        </p>

        {/* Search bar (decorative) */}
        <div className="w-full max-w-xl mt-2 flex items-center gap-3 px-5 py-3.5 rounded-xl border border-white/15 bg-white/[0.04] text-muted-foreground text-sm">
          <BookOpen className="w-4 h-4 shrink-0" />
          <span>Search documentation…</span>
          <kbd className="ml-auto text-xs font-mono bg-white/10 border border-white/10 px-2 py-0.5 rounded">⌘ K</kbd>
        </div>
      </section>

      {/* Doc section cards */}
      <section className="max-w-5xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map(({ icon: Icon, badge, title, description, links }) => (
          <div
            key={title}
            className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 flex flex-col gap-5 hover:border-primary/40 hover:bg-white/[0.06] transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs font-semibold text-primary">{badge}</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
            <ul className="flex flex-col gap-2 mt-auto">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ChevronRight className="w-3 h-3 text-primary" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Popular articles */}
      <section className="max-w-4xl mx-auto px-4 pb-32">
        <h2 className="text-2xl font-bold mb-8 text-center">Popular articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popularArticles.map((article) => (
            <a
              key={article}
              href="#"
              className="flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300"
            >
              {article}
              <ExternalLink className="w-3.5 h-3.5 shrink-0 text-primary opacity-60" />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
