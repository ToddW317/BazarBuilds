'use client';

import { useState, useEffect } from 'react';
import { Build } from '@/types/types';
import { getBuilds } from '@/lib/buildService';
import BuildsGrid from '@/components/BuildsGrid';
import Link from 'next/link';
import GoogleAd from '@/components/GoogleAd';

export default function BuildsPage() {
  const [builds, setBuilds] = useState<Build[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBuilds() {
      try {
        setIsLoading(true);
        const fetchedBuilds = await getBuilds();
        console.log('Fetched builds:', fetchedBuilds);
        setBuilds(fetchedBuilds);
      } catch (error) {
        console.error('Error loading builds:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadBuilds();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top ad */}
        <GoogleAd slot="YOUR_AD_SLOT_1" />

        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Community Builds</h1>
            <p className="text-gray-400">Discover and share the best builds for The Bazaar</p>
          </div>
          
          <Link 
            href="/builds/new"
            className="mt-4 md:mt-0 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit Build
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading builds...</p>
          </div>
        ) : builds.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No builds found</p>
          </div>
        ) : (
          <div>
            {/* Ad before content */}
            <GoogleAd slot="YOUR_AD_SLOT_2" />
            
            <BuildsGrid initialBuilds={builds} />
            
            {/* Ad after content */}
            <GoogleAd slot="YOUR_AD_SLOT_3" />
          </div>
        )}
      </div>
    </div>
  );
} 