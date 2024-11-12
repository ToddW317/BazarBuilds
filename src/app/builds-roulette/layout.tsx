import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BB Roulette | BazaarBuilds.com',
  description: 'Generate random builds and challenge yourself in The Bazaar with our Builds Roulette feature.',
}

export default function BuildsRouletteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 