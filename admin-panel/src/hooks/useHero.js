import { useEffect, useState } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';
import { db } from '../services/firebase';
import { fetchCollection } from '../services/firestoreHelpers';
import { useData } from './useData';

export const useHero = () => {
  const { hero, setHero } = useData();
  const [loading, setLoading] = useState(hero === null);

  useEffect(() => {
    if (hero !== null) return; // cache hit — skip fetch
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchCollection('hero');
        setHero(data);
      } catch (error) {
        console.error('Error fetching hero slides:', error);
        toast.error('Failed to load hero slides.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [hero, setHero]);

  const createSlide = async (formData) => {
    const docRef = await addDoc(collection(db, 'hero'), formData);
    setHero((prev) => [...prev, { id: docRef.id, ...formData }]);
    toast.success('Slide created successfully!');
  };

  const updateSlide = async (id, formData) => {
    await updateDoc(doc(db, 'hero', id), formData);
    setHero((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...formData } : s))
    );
    toast.success('Slide updated successfully!');
  };

  const deleteSlide = async (id) => {
    await deleteDoc(doc(db, 'hero', id));
    setHero((prev) => prev.filter((s) => s.id !== id));
    toast.success('Slide deleted successfully!');
  };

  const refresh = () => setHero(null);

  return {
    slides: hero ?? [],
    loading,
    createSlide,
    updateSlide,
    deleteSlide,
    refresh,
  };
};
