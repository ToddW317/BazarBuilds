'use client'

import { useEffect, useState, useRef } from 'react'

interface GoogleAdProps {
  slot: string
  style?: React.CSSProperties
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical'
  responsive?: boolean
  mobileSlot?: string
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

const GoogleAd = ({ 
  slot, 
  mobileSlot, 
  style, 
  format = 'auto', 
  responsive = true 
}: GoogleAdProps) => {
  const [isMobile, setIsMobile] = useState(false)
  const advertRef = useRef<HTMLModElement>(null)
  const [isAdLoaded, setIsAdLoaded] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isAdLoaded && advertRef.current) {
      try {
        const adsbygoogle = window.adsbygoogle || []
        adsbygoogle.push({})
        setIsAdLoaded(true)
      } catch (err) {
        console.error('AdSense error:', err)
      }
    }
  }, [isAdLoaded])

  return (
    <div className="google-ad-container my-4">
      <ins
        ref={advertRef}
        className="adsbygoogle"
        style={style || { 
          display: 'block',
          width: isMobile ? '320px' : '100%',
          height: isMobile ? '100px' : '250px',
          margin: '0 auto',
        }}
        data-ad-client="ca-pub-5095604091036937"
        data-ad-slot={isMobile && mobileSlot ? mobileSlot : slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  )
}

export default GoogleAd 