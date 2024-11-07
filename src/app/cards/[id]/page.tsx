'use client'

import WIPBadge from '@/components/WIPBadge'

export default function CardDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-900">
      <WIPBadge />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Card Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Card Name</h1>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-300 ring-1 ring-blue-500/50">
                  Medium
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-300 ring-1 ring-yellow-500/50">
                  Gold
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              ID: {params.id}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Card Art */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-white mb-4">Card Art</h2>
              <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gray-900/50 flex items-center justify-center text-gray-400">
                  Card Art Placeholder
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-white mb-4">Alternative Arts</h2>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-video bg-gray-700 rounded-lg" />
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Card Details */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-white mb-4">Card Details</h2>
              
              {/* Tags */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded bg-gray-700 text-gray-300 text-sm">
                    Weapon
                  </span>
                  <span className="px-2 py-1 rounded bg-gray-700 text-gray-300 text-sm">
                    Tool
                  </span>
                </div>
              </div>

              {/* Attributes */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Attributes</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-700/50 rounded p-2 text-sm text-gray-300">
                    Damage: 50
                  </div>
                  <div className="bg-gray-700/50 rounded p-2 text-sm text-gray-300">
                    Cooldown: 5s
                  </div>
                </div>
              </div>

              {/* Effects */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-2">Effects</h3>
                <div className="space-y-2">
                  <div className="bg-gray-700/50 rounded p-2 text-sm text-gray-300">
                    🎯 Deal 50 damage
                  </div>
                </div>
              </div>
            </div>

            {/* Heroes Section */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-white mb-4">Heroes</h2>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg bg-orange-900/20 text-orange-300 ring-1 ring-orange-500/50">
                  Jules
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Builds */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-white mb-4">Usage Statistics</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Current Patch</h3>
                  <div className="text-2xl font-bold text-white">65% Usage Rate</div>
                  <div className="text-sm text-gray-400">in winning builds</div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Win Rate</h3>
                  <div className="text-2xl font-bold text-green-400">58.5%</div>
                  <div className="text-sm text-gray-400">when included in build</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-white mb-4">Popular Builds</h2>
              <div className="space-y-2">
                <div className="bg-gray-700/50 rounded p-3">
                  <div className="font-medium text-white">Build Name</div>
                  <div className="text-sm text-gray-400">by Player123</div>
                </div>
                {/* More builds... */}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-white mb-4">Patch History</h2>
              <div className="space-y-3">
                <div className="border-l-2 border-blue-500 pl-3">
                  <div className="text-sm text-blue-400">Patch 1.2.3</div>
                  <div className="text-white">Damage increased from 45 to 50</div>
                </div>
                <div className="border-l-2 border-red-500 pl-3">
                  <div className="text-sm text-red-400">Patch 1.2.0</div>
                  <div className="text-white">Cooldown increased by 1s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 