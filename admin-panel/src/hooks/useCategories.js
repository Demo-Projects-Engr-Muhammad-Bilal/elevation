import { useEffect, useState } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';
import { db } from '../services/firebase';
import { fetchCollection } from '../services/firestoreHelpers';
import { useData } from './useData';

export const useCategories = () => {
  const { categories, setCategories } = useData();
  const [loading, setLoading] = useState(categories === null);

  useEffect(() => {
    if (categories !== null) return; // cache hit — skip fetch
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchCollection('categories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [categories, setCategories]);

  const createCategory = async (formData) => {
    const docRef = await addDoc(collection(db, 'categories'), formData);
    setCategories((prev) => [...prev, { id: docRef.id, ...formData }]);
    toast.success('Category created successfully!');
  };

  const updateCategory = async (id, formData) => {
    await updateDoc(doc(db, 'categories', id), formData);
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...formData } : c))
    );
    toast.success('Category updated successfully!');
  };

  const deleteCategory = async (id) => {
    await deleteDoc(doc(db, 'categories', id));
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success('Category deleted successfully!');
  };

  const refresh = () => setCategories(null);

  return {
    categories: categories ?? [],
    loading,
    createCategory,
    updateCategory,
    deleteCategory,
    refresh,
  };
};
