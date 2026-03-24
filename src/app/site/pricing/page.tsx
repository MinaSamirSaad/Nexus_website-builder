import PricingCard from '@/components/pricing-card'
import { pricingCards } from '@/lib/constants'
import { Check, Zap } from 'lucide-react'

const faqs = [
  {
    q: 'Can I switch plans later?',
    a: "Absolutely. You can upgrade or downgrade your plan at any time from your agency settings. Billing is prorated automatically.",
  },
  {
    q: 'Is there a free trial?',
    a: "Yes — the Starter plan is completely free, forever. No credit card required to get started.",
  },
  {
    q: "What happens if I exceed my sub-account limit?",
    a: "We'll notify you before any disruption. Upgrading takes seconds and your data is always safe.",
  },
  {
    q: 'Do you offer annual billing?',
    a: "Annual plans are coming soon. Join the waitlist from your account dashboard to lock in an early-bird discount.",
  },
]

const included = [
  'Unlimited funnels per sub-account',
  'Custom subdomain publishing',
  'Drag-and-drop page builder',
  'Stripe billing integration',
  'Role-based team access',
  'Priority email support',
]

export default function PricingPage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* grid bg */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_110%)] -z-10" />

      {/* Hero */}
      <section className="flex flex-col items-center text-center gap-6 pt-36 pb-16 px-4">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary border border-primary/30 bg-primary/10 px-4 py-1.5 rounded-full">
          Simple pricing
        </span>
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent leading-tight">
          Choose what fits<br className="hidden md:block" /> your agency
        </h1>
        <p className="max-w-xl text-muted-foreground text-lg">
          No hidden fees, no lock-in. Start free and scale when you{"'"}re ready.
          All plans include core platform features.
        </p>
      </section>

      {/* Pricing cards */}
      <section className="flex justify-center gap-6 flex-wrap px-4 pb-20">
        {pricingCards.map((card) => (
          <PricingCard key={card.title} card={card} />
        ))}
      </section>

      {/* Included in all plans */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Included in every plan</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {included.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pb-32">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently asked questions</h2>
        <div className="flex flex-col gap-4">
          {faqs.map(({ q, a }) => (
            <div
              key={q}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5 hover:border-primary/30 hover:bg-white/[0.05] transition-all duration-300"
            >
              <h3 className="font-semibold text-foreground mb-2">{q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
