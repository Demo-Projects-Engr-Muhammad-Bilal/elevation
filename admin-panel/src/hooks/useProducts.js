import { useEffect, useState } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';
import { db } from '../services/firebase';
import { fetchCollection } from '../services/firestoreHelpers';
import { useData } from './useData';

export const useProducts = () => {
  const { products, setProducts } = useData();
  const [loading, setLoading] = useState(products === null);

  useEffect(() => {
    if (products !== null) return; // cache hit — skip fetch
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchCollection('products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [products, setProducts]);

  const createProduct = async (formData) => {
    const docRef = await addDoc(collection(db, 'products'), formData);
    setProducts((prev) => [...prev, { id: docRef.id, ...formData }]);
    toast.success('Product created successfully!');
  };

  const updateProduct = async (id, formData) => {
    await updateDoc(doc(db, 'products', id), formData);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...formData } : p))
    );
    toast.success('Product updated successfully!');
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success('Product deleted successfully!');
  };

  const refresh = () => setProducts(null);

  return {
    products: products ?? [],
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
    refresh,
  };
};
