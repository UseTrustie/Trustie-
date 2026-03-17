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

    const prices: Record<string, { amount: number; name: string; description: string; mode: 'subscription' | 'payment' }> = {
      starter: {
        amount: 4900,
        name: 'Starter - 100 Verifications/month',
        description: '100 verifications per month, AI-powered claim extraction, source quality weighting, email support',
        mode: 'subscription',
      },
      professional: {
        amount: 9900,
        name: 'Professional - 500 Verifications/month',
        description: '500 verifications per month, batch verification, detailed source audit logs, priority processing',
        mode: 'subscription',
      },
      business: {
        amount: 24900,
        name: 'Business - Unlimited Verifications',
        description: 'Unlimited verifications, team accounts (up to 10 users), API access, dedicated support',
        mode: 'subscription',
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
```

Paste into `src/app/api/checkout/route.ts` and commit.

Now update the upgrade modal in `src/app/app/page.tsx`. Find this section:
```
<h2 className="text-2xl font-bold mb-6">Upgrade Your Plan</h2>
            <div className="space-y-4">
              <div className="rounded-xl p-6 bg-gray-800">
                <div className="flex justify-between mb-3">
                  <div><h3 className="font-bold text-white">Starter Pack</h3><p className="text-sm text-gray-500">50 verifications</p></div>
                  <div><span className="text-2xl font-bold text-white">$49</span><span className="text-gray-500"> one-time</span></div>
                </div>
                <button onClick={() => handleCheckout('starter')} disabled={isCheckingOut} className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">{isCheckingOut ? 'Loading...' : 'Buy Starter'}</button>
              </div>
              <div className="rounded-xl p-6 border-2 border-blue-500 bg-blue-500/10">
                <div className="flex justify-between mb-3">
                  <div><h3 className="font-bold text-white">Pro Monthly</h3><p className="text-sm text-gray-400">Unlimited</p></div>
                  <div><span className="text-2xl font-bold text-white">$29</span><span className="text-gray-400">/mo</span></div>
                </div>
                <button onClick={() => handleCheckout('pro')} disabled={isCheckingOut} className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">{isCheckingOut ? 'Loading...' : 'Start Pro'}</button>
              </div>
            </div>
```

Replace with:
```
<h2 className="text-2xl font-bold mb-6">Upgrade Your Plan</h2>
            <div className="space-y-4">
              <div className="rounded-xl p-6 bg-gray-800">
                <div className="flex justify-between mb-3">
                  <div><h3 className="font-bold text-white">Starter</h3><p className="text-sm text-gray-500">100 verifications/month</p></div>
                  <div><span className="text-2xl font-bold text-white">$49</span><span className="text-gray-500">/mo</span></div>
                </div>
                <button onClick={() => handleCheckout('starter')} disabled={isCheckingOut} className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">{isCheckingOut ? 'Loading...' : 'Start Starter'}</button>
              </div>
              <div className="rounded-xl p-6 border-2 border-blue-500 bg-blue-500/10">
                <div className="flex justify-between mb-3">
                  <div><h3 className="font-bold text-white">Professional</h3><p className="text-sm text-gray-400">500 verifications/month</p></div>
                  <div><span className="text-2xl font-bold text-white">$99</span><span className="text-gray-400">/mo</span></div>
                </div>
                <button onClick={() => handleCheckout('professional')} disabled={isCheckingOut} className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">{isCheckingOut ? 'Loading...' : 'Start Professional'}</button>
              </div>
              <div className="rounded-xl p-6 bg-gray-800">
                <div className="flex justify-between mb-3">
                  <div><h3 className="font-bold text-white">Business</h3><p className="text-sm text-gray-500">Unlimited verifications</p></div>
                  <div><span className="text-2xl font-bold text-white">$249</span><span className="text-gray-500">/mo</span></div>
                </div>
                <button onClick={() => handleCheckout('business')} disabled={isCheckingOut} className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">{isCheckingOut ? 'Loading...' : 'Start Business'}</button>
              </div>
            </div>
