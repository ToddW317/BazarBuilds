import { buildsMetadata } from '../metadata'
import { BuildsPageWrapper } from '@/components/ClientWrapper'

export const metadata = buildsMetadata

export default function Page() {
  return <BuildsPageWrapper />
} 