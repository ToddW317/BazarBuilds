import { db, storage } from './firebase';
import { trackEvent } from './analytics';
import { 
  collection, 
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
  serverTimestamp,
  doc,
  getDoc,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  setDoc
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { Build, BuildType, BuildFormData } from '@/types/types';
import { createNotification } from './notificationService';

export async function createBuild(
  buildData: BuildFormData,
  files: {
    screenshots: File[];
    videoClip: File | null;
  },
  userId: string,
  creatorName: string
): Promise<string> {
  try {
    if (!userId) {
      throw new Error('User must be authenticated to create a build');
    }

    // Upload screenshots
    const screenshotUrls = await Promise.all(
      files.screenshots.map((file, index) => 
        uploadFile(file, `builds/${userId}/${Date.now()}-screenshot-${index}`)
      )
    );

    // Upload video if exists
    let videoUrl = null;
    if (files.videoClip) {
      videoUrl = await uploadFile(
        files.videoClip,
        `builds/${userId}/${Date.now()}-video`
      );
    }

    // Create build document with explicit userId
    const buildRef = await addDoc(collection(db, 'builds'), {
      ...buildData,
      screenshots: screenshotUrls,
      videoClip: videoUrl,
      userId, // Ensure userId is included
      creatorName, // Add creator name to the document
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      likes: 0,
      likedBy: [], // Initialize empty likedBy array
      rating: {
        average: 0,
        count: 0,
        total: 0
      }
    });

    trackEvent('build_created', {
      build_id: buildRef.id,
      hero_id: buildData.heroId,
      build_type: buildData.buildType,
      user_id: userId, // Track user ID for analytics
    });

    return buildRef.id;
  } catch (error) {
    console.error('Error creating build:', error);
    throw error;
  }
}

export async function getBuilds(): Promise<Build[]> {
  try {
    const buildsQuery = query(
      collection(db, 'builds'),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(buildsQuery);
    
    if (snapshot.empty) {
      console.log('No builds found in database');
      return [];
    }

    const builds = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? (data.createdAt as Timestamp).toDate() : new Date(),
        updatedAt: data.updatedAt ? (data.updatedAt as Timestamp).toDate() : new Date(),
      } as Build;
    });

    console.log(`Found ${builds.length} builds`);
    return builds;
  } catch (error) {
    console.error('Error fetching builds:', error);
    return [];
  }
}

export async function getBuildById(id: string): Promise<Build | null> {
  try {
    const buildRef = doc(db, 'builds', id);
    const buildSnap = await getDoc(buildRef);

    if (!buildSnap.exists()) {
      return null;
    }

    const data = buildSnap.data();
    return {
      id: buildSnap.id,
      ...data,
      createdAt: (data.createdAt as Timestamp).toDate(),
      updatedAt: (data.updatedAt as Timestamp).toDate(),
    } as Build;
  } catch (error) {
    console.error('Error fetching build:', error);
    return null;
  }
}

// Helper function for file uploads
async function uploadFile(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

// Add a function to get builds by user ID
export async function getBuildsByUserId(userId: string): Promise<Build[]> {
  try {
    const buildsQuery = query(
      collection(db, 'builds'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(buildsQuery);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
      updatedAt: (doc.data().updatedAt as Timestamp).toDate(),
    } as Build));
  } catch (error) {
    console.error('Error fetching user builds:', error);
    return [];
  }
}

export async function getAllTags(): Promise<string[]> {
  const buildsQuery = query(collection(db, 'builds'));
  const snapshot = await getDocs(buildsQuery);
  
  const tagsSet = new Set<string>();
  snapshot.docs.forEach(doc => {
    const build = doc.data();
    build.tags?.forEach((tag: string) => tagsSet.add(tag));
  });
  
  return Array.from(tagsSet);
}

export async function getPopularTags(limit: number = 10): Promise<{ tag: string; count: number }[]> {
  const builds = await getBuilds();
  const tagCounts: Record<string, number> = {};
  
  builds.forEach(build => {
    build.tags?.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export async function toggleBuildLike(buildId: string, userId: string): Promise<boolean> {
  const buildRef = doc(db, 'builds', buildId)
  const buildSnap = await getDoc(buildRef)
  
  if (!buildSnap.exists()) {
    throw new Error('Build not found')
  }

  const buildData = buildSnap.data()
  const likedBy = buildData.likedBy || []

  if (likedBy.includes(userId)) {
    // Unlike
    await updateDoc(buildRef, {
      likes: increment(-1),
      likedBy: arrayRemove(userId)
    })
    return false
  } else {
    // Like
    await updateDoc(buildRef, {
      likes: increment(1),
      likedBy: arrayUnion(userId)
    })

    // Create notification for the build owner
    if (buildData.userId !== userId) { // Don't notify if user likes their own build
      const userSnap = await getDoc(doc(db, 'users', userId))
      const actorName = userSnap.exists() ? 
        userSnap.data().displayName || 'Anonymous User' : 
        'Anonymous User'

      await createNotification(
        buildData.userId, // recipient
        'build_like',
        {
          buildId,
          actorName,
          buildTitle: buildData.title
        }
      )
    }

    return true
  }
}

export async function updateBuildRating(buildId: string, userId: string, score: number) {
  const buildRef = doc(db, 'builds', buildId)
  const ratingRef = doc(db, 'ratings', `${buildId}_${userId}`)

  try {
    const buildSnap = await getDoc(buildRef)
    if (!buildSnap.exists()) {
      throw new Error('Build not found')
    }

    const buildData = buildSnap.data()
    const currentRating = buildData.rating || { total: 0, count: 0, average: 0 }

    // Add or update the rating
    await setDoc(ratingRef, {
      buildId,
      userId,
      score,
      createdAt: serverTimestamp()
    })

    // Update the build's rating
    const ratingsQuery = query(
      collection(db, 'ratings'),
      where('buildId', '==', buildId)
    )
    const ratingsSnap = await getDocs(ratingsQuery)
    
    let total = 0
    let count = 0
    ratingsSnap.forEach(doc => {
      total += doc.data().score
      count++
    })

    const average = count > 0 ? total / count : 0

    await updateDoc(buildRef, {
      rating: {
        total,
        count,
        average
      }
    })

    return {
      average,
      count
    }
  } catch (error) {
    console.error('Error updating rating:', error)
    throw error
  }
}