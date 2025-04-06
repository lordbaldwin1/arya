import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '~/lib/stripe'
import { wipeCartForSession } from '~/lib/actions'

export async function POST(req: Request) {
  let event

  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      (await headers()).get('stripe-signature') ?? '',
      process.env.STRIPE_SECRET_KEY ?? ''
    )
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    // On error, log and return the error message.
    if (err) console.log(err)
    console.log(`Error message: ${errorMessage}`)
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    )
  }

  const permittedEvents = ['payment_intent.succeeded']

  if (permittedEvents.includes(event.type)) {
    let data

    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          data = event.data.object
          console.log(`Payment status: ${data.status}`)
          await wipeCartForSession()
          break
        default:
          throw new Error(`Unhandled event: ${event.type}`)
      }
    } catch (error) {
      console.log(error)
      return NextResponse.json(
        { message: 'Webhook handler failed' },
        { status: 500 }
      )
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: 'Received' }, { status: 200 })
}