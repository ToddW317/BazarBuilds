import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs,
  getDoc,
  orderBy, 
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  increment,
  onSnapshot
} from 'firebase/firestore';
import { Comment } from '@/types/types';

export async function addComment(
  buildId: string, 
  userId: string, 
  userName: string, 
  content: string,
  parentId?: string | null
) {
  try {
    const buildMentions = content.match(/#build-([a-zA-Z0-9]+)/g) || [];
    const buildIds = buildMentions.map(mention => mention.replace('#build-', ''));

    const commentData = {
      buildId,
      userId,
      userName,
      content,
      parentId: parentId || null,
      createdAt: serverTimestamp(),
      likes: 0,
      likedBy: [],
      mentions: {
        buildIds,
        userIds: []
      }
    };

    await addDoc(collection(db, 'comments'), commentData);
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}

export function subscribeToComments(
  buildId: string,
  onUpdate: (comments: Comment[]) => void
) {
  const commentsQuery = query(
    collection(db, 'comments'),
    where('buildId', '==', buildId),
    orderBy('createdAt', 'desc')
  );

  const indexDescription = {
    collectionGroup: 'comments',
    queryScope: 'COLLECTION',
    fields: [
      { fieldPath: 'buildId', order: 'ASCENDING' },
      { fieldPath: 'createdAt', order: 'DESCENDING' }
    ]
  };

  return onSnapshot(commentsQuery, (snapshot) => {
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Comment[];
    onUpdate(comments);
  }, (error) => {
    if (error.code === 'failed-precondition') {
      console.error('Please create the following index:', indexDescription);
      console.error('Visit:', error.message.split('here: ')[1]);
    }
    console.error('Error in comment subscription:', error);
  });
}

export async function toggleCommentLike(commentId: string, userId: string) {
  const commentRef = doc(db, 'comments', commentId);
  const commentSnap = await getDoc(commentRef);
  
  if (!commentSnap.exists()) {
    throw new Error('Comment not found');
  }

  const commentData = commentSnap.data();

  if (commentData.likedBy.includes(userId)) {
    await updateDoc(commentRef, {
      likes: increment(-1),
      likedBy: arrayRemove(userId)
    });
    return false;
  } else {
    await updateDoc(commentRef, {
      likes: increment(1),
      likedBy: arrayUnion(userId)
    });
    return true;
  }
} 