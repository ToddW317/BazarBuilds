import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const { orderId, userId } = await req.json();

    // Update user's access
    await adminDb.collection('users').doc(userId).set({
      hasBuildsRouletteAccess: true,
      buildsRouletteUnlockedAt: new Date().toISOString()
    }, { merge: true });

    // Track donation
    await adminDb.collection('donations').doc(orderId).set({
      userId,
      amount: 100, // $1.00 in cents
      timestamp: new Date().toISOString(),
      monthYear: new Date().toISOString().slice(0, 7),
      provider: 'paypal'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PayPal success handler error:', error);
    return NextResponse.json({ error: 'Failed to process PayPal payment' }, { status: 500 });
  }
} 