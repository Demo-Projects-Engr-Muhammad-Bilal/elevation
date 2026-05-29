import { useEffect, useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { toast } from 'sonner';
import { db } from '../services/firebase';
import { fetchCollection } from '../services/firestoreHelpers';
import { useData } from './useData';

export const useOrders = () => {
  const { orders, setOrders } = useData();
  const [loading, setLoading] = useState(orders === null);

  useEffect(() => {
    if (orders !== null) return; // cache hit — skip fetch
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchCollection('orders');
        // Latest first
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [orders, setOrders]);

  const updateOrderStatus = async (id, status) => {
    await updateDoc(doc(db, 'orders', id), { status });
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
    toast.success('Order status updated.');
  };

  const refresh = () => setOrders(null);

  return {
    orders: orders ?? [],
    loading,
    updateOrderStatus,
    refresh,
  };
};
