import WIPBadge from '@/components/WIPBadge'
import { Suspense } from 'react'
import CardDetailsContent from '@/components/CardDetailsContent'
import { Metadata } from 'next'

// Define the params type
type Props = {
  params: Promise<{
    id: string
  }>
}

// Add generateMetadata function
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  return {
    title: `Card Details | ${resolvedParams.id}`,
    description: 'View detailed information about this card.'
  }
}

// Update the page component
export default async function CardDetailsPage({ params }: Props) {
  const resolvedParams = await params
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardDetailsContent params={resolvedParams} />
    </Suspense>
  )
} 