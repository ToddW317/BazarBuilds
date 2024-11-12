import { getItemEncounters, EncounterInfo } from '@/utils/encounterMapping'
import { Sparkles } from 'lucide-react'

export default function CardDetails({ /* ... existing props ... */ }) {
  // Add this near the top of the component
  const itemEncounters = getItemEncounters()[itemId] || [];

  return (
    <div>
      {/* ... existing content ... */}

      {/* Add this section where you want to display encounters */}
      {itemEncounters.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">Found in Encounters</h3>
          <div className="space-y-2">
            {itemEncounters.map((encounter: EncounterInfo, index: number) => (
              <div 
                key={`${encounter.name}-${index}`}
                className="flex items-center justify-between bg-gray-700/50 rounded-lg px-4 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-white">{encounter.name}</span>
                  <span className="flex items-center gap-1.5 text-yellow-400 text-sm">
                    <Sparkles className="w-4 h-4" />
                    Level {encounter.level}
                  </span>
                </div>
                {encounter.dropRate && (
                  <span className="text-yellow-400 text-sm font-medium">
                    {(encounter.dropRate * 100).toFixed(1)}% chance
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ... rest of existing content ... */}
    </div>
  )
} 