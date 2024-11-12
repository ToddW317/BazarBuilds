'use client'

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CardDisplay from '@/components/CardDisplay';
import encounterData from '@/data/out.json';
import { Item } from '@/types/encounters';
import itemToImageMapping from '@/data/itemToImageMapping';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { useSearchParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

interface Build {
  hero: string | null;
  items: Item[];
  totalPoints: number;
}

// Get all items with proper image mapping
const allItems = Object.entries(encounterData.items as unknown as Record<string, Item>)
  .map(([id, item]) => ({
    ...item,
    id,
    images: [],
    InternalName: item.ArtKey 
      ? ((encounterData.items as any)[item.ArtKey]?.InternalName || item.InternalName)
      : item.InternalName
  }))
  .filter(item => !item.InternalName.includes('[DEBUG]'));

// Group items by hero
const itemsByHero = allItems.reduce((acc, item) => {
  item.Heroes.forEach(hero => {
    if (!acc[hero]) acc[hero] = [];
    acc[hero].push(item);
  });
  return acc;
}, {} as Record<string, Item[]>);

// Update the HEROES array with the correct image paths
const HEROES = [
  { name: 'Vanessa', image: '/heroes/vanessa.png' },
  { name: 'Dooley', image: '/heroes/dooley.png' },
  { name: 'Pygmalien', image: '/heroes/pygmalien.png' }
];

// Add this compact card preview component
const CompactCardPreview = ({ item }: { item: Item }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800/50 rounded-lg p-4">
    <img 
      src={item.id && itemToImageMapping[item.id] ? itemToImageMapping[item.id] : '/placeholder.png'}
      alt={item.InternalName}
      className="w-32 h-32 object-contain rounded-md"
    />
    <p className="mt-2 text-sm font-medium text-white truncate w-full text-center">
      {item.InternalName}
    </p>
  </div>
);

// Update the SpinningReel component to handle smooth stopping and selection
const SpinningReel = ({ 
  items, 
  isSpinning, 
  targetItem,
  onComplete 
}: { 
  items: Item[], 
  isSpinning: boolean,
  targetItem: Item,
  onComplete: () => void 
}) => {
  const [speed, setSpeed] = useState(50);
  const spinTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isSpinning) {
      setSpeed(50);
      
      // Set timeout to stop spinning
      spinTimeoutRef.current = setTimeout(() => {
        onComplete();
      }, 2000);

      return () => {
        if (spinTimeoutRef.current) {
          clearTimeout(spinTimeoutRef.current);
        }
      };
    }
  }, [isSpinning, onComplete]);

  // Add safety check for items
  const safeItems = items?.filter(item => item && item.id) || [];
  
  console.log('Items in SpinningReel:', safeItems); // Debug log
  console.log('Target item:', targetItem); // Debug log

  // Create a sequence of items that will end with our target item
  const reelItems = useMemo(() => {
    if (!safeItems.length) return [];
    
    const sequence = [...safeItems].sort(() => Math.random() - 0.5);
    // Insert the target item about 80% through the sequence
    const targetPosition = Math.floor(sequence.length * 0.8);
    sequence.splice(targetPosition, 0, targetItem);
    return [...sequence, ...sequence, ...sequence];
  }, [safeItems, targetItem]);

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-red-500" />
      </div>
      
      <div className="absolute top-[20px] left-0 right-0 h-[200px] bg-gray-900/95 overflow-hidden">
        {reelItems.length > 0 ? (
          <motion.div 
            className="flex gap-4"
            animate={{ 
              x: isSpinning ? [-1000, -3000] : -2000,
            }}
            transition={{ 
              duration: isSpinning ? speed / 100 : 0.5,
              ease: isSpinning ? "linear" : [0.32, 0.72, 0, 1],
              repeat: isSpinning ? Infinity : 0
            }}
          >
            {reelItems.map((item, index) => (
              <div 
                key={`${item?.id || index}-${index}`} 
                className="flex-shrink-0 w-[180px]"
              >
                {item && item.id && <CardDisplay item={item} itemId={item.id} />}
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="text-white">Loading items...</div>
        )}
      </div>

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[180px] h-[300px] border-2 border-dashed border-white/20 rounded-lg" />
    </div>
  );
};

// Update the curtain reveal to remove the preview image
const RevealCurtain = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900/80"
    initial={{ scaleY: 1, originY: 0 }}
    animate={{ scaleY: 0, originY: 0 }}
    transition={{
      duration: 1.2,
      ease: [0.645, 0.045, 0.355, 1],
    }}
  >
    <motion.div 
      className="absolute inset-0 bg-blue-500/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration: 0.8,
        times: [0, 0.5, 1]
      }}
    />
  </motion.div>
);

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function BuildsRoulette() {
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const searchParams = useSearchParams();
  const [monthlyDonations, setMonthlyDonations] = useState(11); // Start with $11

  // Define these once at the top
  const monthlyGoal = 300;
  const currentAmount = monthlyDonations;

  // Check user's access when component loads or after payment
  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        console.log('No user logged in');
        return;
      }

      console.log('Checking access for user:', user.uid);
      const userRef = doc(db, 'users', user.uid);
      
      try {
        const userDoc = await getDoc(userRef);
        console.log('User doc exists:', userDoc.exists());
        console.log('User doc data:', userDoc.data());
        
        if (userDoc.exists() && userDoc.data().hasBuildsRouletteAccess) {
          console.log('User has access, setting hasAccess to true');
          setHasAccess(true);
        } else if (searchParams.get('success')) {
          console.log('Payment success, checking again in 2 seconds');
          setTimeout(async () => {
            const refreshedDoc = await getDoc(userRef);
            console.log('Refreshed doc data:', refreshedDoc.data());
            if (refreshedDoc.exists() && refreshedDoc.data().hasBuildsRouletteAccess) {
              setHasAccess(true);
              toast.success('Access unlocked! Enjoy Builds Roulette!');
            } else {
              console.log('Still no access after payment');
              toast.error('Something went wrong. Please contact support.');
            }
          }, 2000);
        }
      } catch (error) {
        console.error('Error checking access:', error);
      }
    };

    checkAccess();
  }, [user, searchParams]);

  // Show appropriate messages based on URL params
  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment successful! Setting up your access...');
    } else if (searchParams.get('canceled')) {
      toast.error("Payment canceled. Try again when you're ready!");
    }
  }, [searchParams]);

  const [build, setBuild] = useState<Build>({
    hero: null,
    items: [],
    totalPoints: 0
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayedHero, setDisplayedHero] = useState<typeof HEROES[0] | null>(null);
  const [showButton, setShowButton] = useState(true);

  const getPointsForSize = (size: string) => {
    switch (size) {
      case 'Small': return 1;
      case 'Medium': return 2;
      case 'Large': return 3;
      default: return 0;
    }
  };

  const handleGenerateBuild = async () => {
    // Select hero
    setIsSpinning(true);
    setShowButton(false);
    
    const selectedHero = HEROES[Math.floor(Math.random() * HEROES.length)];
    const heroItems = itemsByHero[selectedHero.name] || [];
    
    // Animate hero selection
    const spinDuration = 3000;
    const intervalTime = 100;
    const startTime = Date.now();
    
    const spinInterval = setInterval(() => {
      const randomHero = HEROES[Math.floor(Math.random() * HEROES.length)];
      setDisplayedHero(randomHero);
      
      if (Date.now() - startTime >= spinDuration) {
        clearInterval(spinInterval);
        setDisplayedHero(selectedHero);
        setBuild(prev => ({ ...prev, hero: selectedHero.name }));
        setIsSpinning(false);
        
        // Start adding items
        addItems(heroItems);
      }
    }, intervalTime);
  };

  const addItems = async (heroItems: Item[]) => {
    let remainingPoints = 10;
    const selectedItems: Item[] = [];

    while (remainingPoints > 0) {
      const possibleItems = heroItems.filter(item => 
        getPointsForSize(item.Size) <= remainingPoints &&
        !selectedItems.includes(item)
      );

      if (possibleItems.length === 0) break;

      const selectedItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];
      const itemPoints = getPointsForSize(selectedItem.Size);
      
      selectedItems.push(selectedItem);
      remainingPoints -= itemPoints;

      // Update build and wait for animation
      setBuild(prev => ({
        ...prev,
        items: [...prev.items, selectedItem],
        totalPoints: prev.totalPoints + itemPoints
      }));

      // Wait for curtain animation
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  const handleDonateClick = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe || !user) throw new Error('Stripe or user not initialized');

      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
        }),
      });

      const { sessionId } = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        toast.error('Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  // Add this effect to fetch donations
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch('/api/get-donations');
        const data = await response.json();
        if (data.total !== undefined) {
          setMonthlyDonations(11 + data.total); // Add to existing $11
        }
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
    
    // Optionally set up polling to keep it updated
    const interval = setInterval(fetchDonations, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] p-8 bg-gradient-to-b from-gray-900/80 to-gray-800/80 flex flex-col items-center">
      {/* Monthly Progress Bar */}
      <div className="w-full max-w-[1920px] mb-8">
        <div className="bg-gray-900/95 rounded-xl p-6 shadow-xl">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Monthly Server Costs</span>
              <motion.span 
                className="text-white font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                ${currentAmount}/${monthlyGoal}
              </motion.span>
            </div>
            
            {/* Gratitude Message */}
            <motion.p 
              className="text-sm text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-blue-400">Thank you</span> to all our supporters! Your contributions help keep{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text font-semibold">
                BazaarBuilds
              </span>{' '}
              running and growing.
            </motion.p>
            
            {/* Usage Message */}
            <motion.p 
              className="text-xs text-gray-400 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              100% of donations go towards server costs and continuous deployment of new features.
            </motion.p>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentAmount / monthlyGoal) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.1)_30%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.1)_70%,rgba(255,255,255,0.3)_100%)]" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Access Gate */}
      {!user ? (
        <div className="w-full max-w-[1920px] bg-gray-900/95 rounded-2xl p-8 shadow-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Sign in to Access Builds Roulette</h2>
          <p className="text-gray-400 mb-6">Create builds and support the community!</p>
          <Link 
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      ) : !hasAccess ? (
        <div className="w-full max-w-[1920px] bg-gray-900/95 rounded-2xl p-8 shadow-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Unlock Builds Roulette</h2>
          <p className="text-gray-400 mb-6">
            Support the community with a one-time $1 donation to unlock Builds Roulette forever!
            <br />
            Your contribution helps keep our servers running and tools free for everyone.
          </p>
          <button
            onClick={handleDonateClick}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 text-xl rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            Donate $1 to Unlock
          </button>
        </div>
      ) : (
        // Your existing BuildsRoulette content goes here
        <div className="w-full max-w-[1920px] bg-gray-900/95 rounded-2xl p-8 shadow-xl flex flex-col items-center relative">
          {/* Re-roll button */}
          {!showButton && (
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg shadow-lg hover:scale-105 active:scale-95 transition-transform"
              onClick={() => {
                setShowButton(true);
                setBuild({ hero: null, items: [], totalPoints: 0 });
                setDisplayedHero(null);
              }}
            >
              Re-Roll Build
            </motion.button>
          )}

          {/* Main content */}
          {showButton ? (
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 text-xl rounded-full shadow-lg min-w-[200px]"
              onClick={handleGenerateBuild}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Generate Build
            </motion.button>
          ) : (
            <>
              {/* Hero display */}
              <motion.div className="h-[300px] my-8 flex justify-center items-center">
                {displayedHero && (
                  <motion.div
                    key={displayedHero.name}
                    className="bg-white/10 rounded-2xl p-6 w-[220px] h-[300px] flex flex-col items-center justify-center gap-4 shadow-lg border-2 border-white/10"
                  >
                    <img 
                      src={displayedHero.image} 
                      alt={displayedHero.name}
                      className="w-[180px] h-[180px] object-contain rounded-lg bg-black/20"
                    />
                    <h3 className="text-xl font-bold text-white">{displayedHero.name}</h3>
                  </motion.div>
                )}
              </motion.div>

              {/* Build display */}
              {build.hero && !isSpinning && (
                <div className="mt-8 p-4 bg-white/5 rounded-lg text-white w-full">
                  <h2 className="text-2xl font-bold mb-4">Selected Build</h2>
                  <p className="mb-4">Hero: {build.hero} ({build.totalPoints}/10 points)</p>
                  <div className="grid grid-cols-7 gap-4">
                    {build.items.map((item, index) => (
                      <motion.div key={index} className="relative">
                        <CardDisplay item={item} itemId={item.id!} />
                        <motion.div
                          className="absolute inset-0 bg-gray-900"
                          initial={{ height: "100%" }}
                          animate={{ height: 0 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                      </motion.div>
                    ))}
                    {/* Empty slots */}
                    {Array.from({ length: 7 - build.items.length }).map((_, i) => (
                      <div key={`empty-${i}`} className="w-full aspect-[2/3] bg-white/5 rounded-lg" />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
} 