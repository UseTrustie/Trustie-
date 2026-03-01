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

    const prices: Record<string, { amount: number; name: string }> = {
      starter: { amount: 4900, name: 'Starter Pack - 50 Verifications' },
      pro: { amount: 2900, name: 'Pro Monthly - Unlimited Verifications' },
    };

    const selectedPrice = prices[priceType] || prices.starter;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: selectedPrice.name,
              description: priceType === 'pro' 
                ? 'Unlimited verifications per month' 
                : '50 verifications, never expires',
            },
            unit_amount: selectedPrice.amount,
            ...(priceType === 'pro' && { recurring: { interval: 'month' } }),
          },
          quantity: 1,
        },
      ],
      mode: priceType === 'pro' ? 'subscription' : 'payment',
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
