import { useEffect } from 'react';
import { useAppData } from '../context/AppDataContext';

/**
 * Fetches orders for a given email, caches in AppDataContext.
 * Subsequent calls with the same email skip the DB entirely.
 */
export const useOrders = (email) => {
  const { ordersCache, ordersLoading, loadOrdersForEmail, invalidateOrdersCache } =
    useAppData();

  useEffect(() => {
    if (email) loadOrdersForEmail(email);
  }, [email, loadOrdersForEmail]);

  const orders = (email && ordersCache[email]) || [];

  return { orders, loading: ordersLoading, invalidateOrdersCache };
};
