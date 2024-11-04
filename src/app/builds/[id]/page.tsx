import { getBuildById, incrementBuildViews } from '@/lib/buildService'
import { notFound } from 'next/navigation'
import BuildDetailsContent from '@/components/BuildDetailsContent'
import { use } from 'react'

interface BuildDetailsPageProps {
  params: {
    id: string
  }
}

export default function BuildDetailsPage({ params }: BuildDetailsPageProps) {
  const id = use(Promise.resolve(params.id))
  const build = use(getBuildById(id))

  if (!build) {
    notFound()
  }

  // Increment view count when the page is loaded
  // We use a client-side approach to avoid double-counting during SSR
  if (typeof window !== 'undefined') {
    // Use setTimeout to ensure this runs after the component mounts
    setTimeout(() => {
      incrementBuildViews(id)
    }, 0)
  }

  return <BuildDetailsContent build={build} buildId={id} />
} 