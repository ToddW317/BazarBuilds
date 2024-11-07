'use client'

import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const { user, signIn, signOut } = useAuth()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path ? 'text-white' : 'text-gray-300 hover:text-white'
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center font-bold text-xl">
                <span className="text-white">Bazaar</span>
                <span className="text-blue-500">Builds</span>
                <span className="text-gray-400 text-sm translate-y-1 ml-1">.com</span>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/builds" className={`inline-flex items-center px-1 pt-1 ${isActive('/builds')}`}>
                Builds
              </Link>
              <Link href="/cards" className={`inline-flex items-center px-1 pt-1 ${isActive('/cards')}`}>
                Cards
              </Link>
              <Link href="/encounters" className={`inline-flex items-center px-1 pt-1 ${isActive('/encounters')}`}>
                Encounters
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop right section */}
          <div className="hidden sm:flex sm:items-center sm:gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  href="/profile"
                  className={`inline-flex items-center px-1 pt-1 ${isActive('/profile')}`}
                >
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
          <Link
            href="/builds"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/builds').includes('text-white') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Builds
          </Link>
          <Link
            href="/cards"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/cards').includes('text-white') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Cards
          </Link>
          <Link
            href="/encounters"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/encounters').includes('text-white') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Encounters
          </Link>
          {user ? (
            <>
              <Link
                href="/profile"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive('/profile').includes('text-white') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  signOut()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-gray-700 hover:text-red-300"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                signIn()
                setIsMobileMenuOpen(false)
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-400 hover:bg-gray-700 hover:text-blue-300"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  )
} 