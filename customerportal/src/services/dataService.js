import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  limit,
} from 'firebase/firestore';
import { db } from './firebase';

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
export const fetchHeroSlides = async () => {
  const snap = await getDocs(collection(db, 'hero'));
  return snap.docs.map((d) => d.data());
};

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const fetchCategories = async () => {
  const snap = await getDocs(collection(db, 'categories'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------
export const fetchAllProducts = async () => {
  const snap = await getDocs(collection(db, 'products'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const fetchProductById = async (id) => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
};

export const fetchRelatedProducts = async (category, excludeId, fetchLimit = 10) => {
  const q = query(
    collection(db, 'products'),
    where('category', '==', category),
    limit(fetchLimit)
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((p) => p.id !== excludeId)
    .slice(0, 4);
};

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------
export const fetchOrdersByEmail = async (email) => {
  const q = query(collection(db, 'orders'), where('customer.email', '==', email));
  const snap = await getDocs(q);
  const orders = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  orders.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
  return orders;
};

export const fetchOrderById = async (orderId) => {
  const docRef = doc(db, 'orders', orderId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
};
