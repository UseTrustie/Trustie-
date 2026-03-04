import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = await clerkClient.users.getUser(userId);
    const metadata = user.publicMetadata as any;

    const plan = metadata?.plan || 'free';
    const verificationsUsed = metadata?.verificationsUsed || 0;
    const limit = plan === 'pro' ? Infinity : (plan === 'starter' ? 50 : 5);

    return NextResponse.json({
      plan,
      verificationsUsed,
      verificationsLimit: limit === Infinity ? 'unlimited' : limit,
    });
  } catch (error: any) {
    console.error('Usage route error:', error);
    return NextResponse.json({ error: 'Failed to get usage' }, { status: 500 });
  }
}
