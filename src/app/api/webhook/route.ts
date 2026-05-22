import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Stripe signature verification needs the raw body + Node crypto, so force Node runtime.
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // ---- Security: verify this event genuinely came from Stripe ----
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err?.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      // ---- Payment succeeded -> actually upgrade the user ----
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const priceType = session.metadata?.priceType; // 'starter' | 'professional' | 'business'

        if (!userId || !priceType) {
          console.error('checkout.session.completed missing metadata', { userId, priceType });
          break;
        }

        const user = await clerkClient.users.getUser(userId);
        await clerkClient.users.updateUser(userId, {
          publicMetadata: {
            ...user.publicMetadata,
            plan: priceType,
            verificationsUsed: 0, // fresh allowance at start of the plan
            subscriptionStatus: 'active',
            stripeCustomerId: (session.customer as string) ?? null,
          },
        });
        console.log(`Upgraded user ${userId} to ${priceType}`);
        break;
      }

      // ---- Subscription canceled/ended -> downgrade to free ----
      // We match by the stripeCustomerId we saved above.
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;

        try {
          const res: any = await clerkClient.users.getUserList({ limit: 100 });
          // Clerk v4 returns an array; v5 returns { data }. Handle both.
          const list: any[] = Array.isArray(res) ? res : (res?.data ?? []);
          const affected = list.find(
            (u: any) => (u.publicMetadata as any)?.stripeCustomerId === customerId
          );
          if (affected) {
            await clerkClient.users.updateUser(affected.id, {
              publicMetadata: {
                ...affected.publicMetadata,
                plan: 'free',
                subscriptionStatus: 'canceled',
              },
            });
            console.log(`Downgraded user ${affected.id} to free`);
          }
        } catch (e: any) {
          console.error('Downgrade lookup failed:', e?.message);
        }
        break;
      }

      default:
        // Other event types are fine to ignore for now.
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error?.message);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
