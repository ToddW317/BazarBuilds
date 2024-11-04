import { getBuildById } from '@/lib/buildService'
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

  return <BuildDetailsContent build={build} buildId={id} />
} 