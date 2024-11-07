import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Card Details | BazaarBuilds',
  description: 'View detailed information about this card.'
}

export default function CardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 