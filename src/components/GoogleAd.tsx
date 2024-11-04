'use client'

import { useEffect, useRef } from 'react'

interface GoogleAdProps {
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

const GoogleAd = ({ className = '' }: GoogleAdProps) => {
  const advertRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <div ref={advertRef} className={`adsbygoogle ${className}`} />
  )
}

export default GoogleAd 