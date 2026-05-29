import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Fetch all documents from a Firestore collection and map them to
 * { id, ...data } objects. Returns an empty array on error.
 */
export const fetchCollection = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
