import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs';

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await clerkClient.users.getUser(userId);
    const metadata = user.publicMetadata as any;

    return NextResponse.json({
      plan: metadata?.plan || 'free',
      verificationsUsed: metadata?.verificationsUsed || 0,
      verificationsLimit: metadata?.plan === 'pro' ? 'unlimited' : (metadata?.plan === 'starter' ? 50 : 5),
      paidAt: metadata?.paidAt || null,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await clerkClient.users.getUser(userId);
    const metadata = user.publicMetadata as any;
    
    const plan = metadata?.plan || 'free';
    const verificationsUsed = (metadata?.verificationsUsed || 0) + 1;
    const limit = plan === 'pro' ? Infinity : (plan === 'starter' ? 50 : 5);

    if (verificationsUsed > limit) {
      return NextResponse.json({ 
        error: 'Limit reached', 
        limitReached: true,
        plan,
        verificationsUsed: verificationsUsed - 1,
        limit,
      }, { status: 403 });
    }

    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        ...metadata,
        verificationsUsed,
      }
    });

    return NextResponse.json({
      success: true,
      verificationsUsed,
      limit,
      remaining: limit === Infinity ? 'unlimited' : limit - verificationsUsed,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
