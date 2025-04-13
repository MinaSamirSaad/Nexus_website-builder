import { loadStripe } from '@stripe/stripe-js';
import Stripe from "stripe"

let stripePromise: Promise<Stripe | null>
export const getStripe = (connectedAccountId?: string) => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
      { stripeAccount: connectedAccountId }
    ) as Promise<Stripe | null>
  }
  return stripePromise
}
