import { redirect } from 'next/navigation'
import CheckoutForm from './checkout-form'

interface CheckoutPageProps {
  searchParams: { plan?: string }
}

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const plan = searchParams.plan || 'starter'

  if (!['starter', 'pro'].includes(plan)) {
    redirect('/')
  }

  return <CheckoutForm plan={plan as 'starter' | 'pro'} />
}
