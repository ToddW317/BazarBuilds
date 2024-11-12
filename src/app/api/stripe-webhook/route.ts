import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { adminDb } from '@/lib/firebase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28.acacia'
});

export async function POST(req: Request) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  console.log('💰 Webhook received');

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log('✅ Event verified:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      console.log('🔑 Granting access to user:', userId);

      if (userId) {
        try {
          // Update user's access
          await adminDb.collection('users').doc(userId).set({
            hasBuildsRouletteAccess: true,
            buildsRouletteUnlockedAt: new Date().toISOString()
          }, { merge: true });
          console.log('✨ Access granted successfully');

          // Track donation
          await adminDb.collection('donations').doc(session.id).set({
            userId,
            amount: session.amount_total,
            timestamp: new Date().toISOString(),
            monthYear: new Date().toISOString().slice(0, 7)
          });
          console.log('💸 Donation tracked');
        } catch (error) {
          console.error('❌ Database error:', error);
          throw error;
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('❌ Webhook error:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
} 