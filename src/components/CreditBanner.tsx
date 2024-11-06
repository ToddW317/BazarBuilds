'use client'

import React from 'react'

export default function CreditBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 text-blue-300 px-4 py-3 border-b border-blue-500/30">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm md:text-base font-medium">
          A massive <span className="text-blue-200 font-bold">THANK YOU</span> to{' '}
          <span className="text-purple-300 font-bold">Book</span>{' '}
          for their incredible service with their item parser. This page would not be possible without them!
        </p>
      </div>
    </div>
  )
} 