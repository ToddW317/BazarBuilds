import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log('🎣 PayPal webhook received:', payload);

    // Verify the webhook is from PayPal
    // In production, you should verify the webhook signature
    if (payload.event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      const custom_id = payload.resource.custom_id; // This is our userId
      const orderId = payload.resource.id;
      const amount = payload.resource.amount.value * 100; // Convert to cents

      console.log('👤 Processing PayPal payment for user:', custom_id);

      if (!custom_id) {
        console.error('❌ No userId in PayPal webhook!');
        throw new Error('No userId in webhook');
      }

      try {
        // Update user's access
        await adminDb.collection('users').doc(custom_id).set({
          hasBuildsRouletteAccess: true,
          buildsRouletteUnlockedAt: new Date().toISOString()
        }, { merge: true });
        console.log('✨ Access granted in database');

        // Track donation
        await adminDb.collection('donations').doc(orderId).set({
          userId: custom_id,
          amount: amount,
          timestamp: new Date().toISOString(),
          monthYear: new Date().toISOString().slice(0, 7),
          provider: 'paypal'
        });
        console.log('💰 PayPal donation tracked');

      } catch (dbError) {
        console.error('❌ Database error:', dbError);
        throw dbError;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('❌ PayPal webhook error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 400 }
    );
  }
} 