'use client'

export default function BuildsDisabledBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 text-blue-300 px-4 py-3 rounded-lg mb-6 border border-blue-500/30">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm md:text-base font-medium">
          <span className="text-yellow-300 font-bold">Builds are temporarily disabled</span>{' '}
          until a subtle monetization strategy is implemented to offset server costs.{' '}
          <span className="text-green-300">You all are EXTREMELY impressive!</span>
          <br />
          <span className="text-gray-400">
            Consider{' '}
            <a 
              href="https://www.buymeacoffee.com/twopercent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 underline"
            >
              buying me a coffee
            </a>
            {' '}to get Builds back up and running!
          </span>
        </p>
      </div>
    </div>
  )
} 