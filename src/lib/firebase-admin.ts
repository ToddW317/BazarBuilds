import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const adminDb = getFirestore();

// Add this function to get monthly donations total
export async function getMonthlyDonations() {
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
  const donationsRef = adminDb.collection('donations');
  const snapshot = await donationsRef
    .where('monthYear', '==', currentMonth)
    .get();

  let total = 0;
  snapshot.forEach(doc => {
    total += (doc.data().amount || 0) / 100; // Convert from cents to dollars
  });

  return total;
} 