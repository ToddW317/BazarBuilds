import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb } from '@/lib/firebase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia'
});

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  console.log('🎣 Webhook received with signature:', sig?.substring(0, 20));
  console.log('📦 Payload preview:', payload.substring(0, 100));

  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error('❌ Missing webhook secret!');
      throw new Error('Missing webhook secret');
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log('✅ Event type:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      console.log('👤 Processing for user:', userId);

      if (!userId) {
        console.error('❌ No userId in session!');
        throw new Error('No userId in session');
      }

      try {
        // First check if user document exists
        const userDoc = await adminDb.collection('users').doc(userId).get();
        console.log('📄 Current user data:', userDoc.exists ? userDoc.data() : 'No document');

        // Update user's access
        await adminDb.collection('users').doc(userId).set({
          hasBuildsRouletteAccess: true,
          buildsRouletteUnlockedAt: new Date().toISOString()
        }, { merge: true });
        console.log('✨ Access granted in database');

        // Track donation
        await adminDb.collection('donations').doc(session.id).set({
          userId,
          amount: session.amount_total,
          timestamp: new Date().toISOString(),
          monthYear: new Date().toISOString().slice(0, 7)
        });
        console.log('💰 Donation tracked in database');

        // Verify the update worked
        const updatedDoc = await adminDb.collection('users').doc(userId).get();
        console.log('✅ Updated user data:', updatedDoc.data());
      } catch (dbError) {
        console.error('❌ Database error:', dbError);
        throw dbError;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('❌ Webhook error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 400 }
    );
  }
} 