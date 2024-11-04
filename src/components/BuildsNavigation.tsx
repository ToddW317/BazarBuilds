'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BuildsNavigation() {
  const pathname = usePathname()

  const tabs = [
    { name: 'All Builds', href: '/builds' },
    { name: 'My Builds', href: '/builds/my-builds' },
    { name: 'Liked Builds', href: '/builds/liked' },
  ]

  return (
    <div className="border-b mb-6">
      <nav className="flex space-x-8" aria-label="Builds navigation">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${isActive
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
} 