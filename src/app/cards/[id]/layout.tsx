import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Card Details | BazaarBuilds`,
    description: 'Detailed information about this card including stats, builds, and patch history.'
  }
}

export default function CardDetailsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 