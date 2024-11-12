import { NextResponse } from 'next/server';
import { getMonthlyDonations } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const total = await getMonthlyDonations();
    return NextResponse.json({ total });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: 'Failed to fetch donations' }, { status: 500 });
  }
} 