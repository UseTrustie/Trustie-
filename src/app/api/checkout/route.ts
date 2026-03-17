import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { priceType } = await request.json();

    const prices: Record<string, { amount: number; name: string; description: string }> = {
      starter: {
        amount: 4900,
        name: 'Starter - 100 Verifications/month',
        description: '100 verifications per month, AI-powered claim extraction, source quality weighting, email support',
      },
      professional: {
        amount: 9900,
        name: 'Professional - 500 Verifications/month',
        description: '500 verifications per month, batch verification, detailed source audit logs, priority processing',
      },
      business: {
        amount: 24900,
        name: 'Business - Unlimited Verifications',
        description: 'Unlimited verifications, team accounts (up to 10 users), API access, dedicated support',
      },
    };

    const selectedPrice = prices[priceType];

    if (!selectedPrice) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPrice.name,
              description: selectedPrice.description,
            },
            unit_amount: selectedPrice.amount,
            recurring: { interval: 'month' },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL}/app?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/app?canceled=true`,
      metadata: {
        userId,
        priceType,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
