import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  fetchHeroSlides,
  fetchCategories,
  fetchAllProducts,
  fetchOrdersByEmail,
} from '../services/dataService';

const AppDataContext = createContext(null);

export const AppDataProvider = ({ children }) => {
  // ── Global initial-load gate ──────────────────────────────────────────────
  const [globalLoading, setGlobalLoading] = useState(true);

  // ── Shared data slices ────────────────────────────────────────────────────
  const [heroSlides, setHeroSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // ── Orders cache (keyed by email) ─────────────────────────────────────────
  const [ordersCache, setOrdersCache] = useState({});   // { [email]: Order[] }
  const [ordersLoading, setOrdersLoading] = useState(false);

  // ── Boot: single parallel fetch for all shared data ───────────────────────
  useEffect(() => {
    const bootFetch = async () => {
      try {
        const [slides, cats, prods] = await Promise.all([
          fetchHeroSlides(),
          fetchCategories(),
          fetchAllProducts(),
        ]);
        setHeroSlides(slides);
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error('AppData boot fetch failed:', err);
      } finally {
        setGlobalLoading(false);
      }
    };
    bootFetch();
  }, []);

  // ── Orders: fetch once per email, cache result ────────────────────────────
  const loadOrdersForEmail = useCallback(async (email) => {
    if (!email) return;
    // Already cached — skip
    if (ordersCache[email]) return;

    setOrdersLoading(true);
    try {
      const orders = await fetchOrdersByEmail(email);
      setOrdersCache((prev) => ({ ...prev, [email]: orders }));
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setOrdersLoading(false);
    }
  }, [ordersCache]);

  // Called after a new order is placed so the cache re-fetches next visit
  const invalidateOrdersCache = useCallback((email) => {
    if (!email) return;
    setOrdersCache((prev) => {
      const next = { ...prev };
      delete next[email];
      return next;
    });
  }, []);

  // ── Manual refresh helpers (for explicit user-triggered refresh) ──────────
  const refreshProducts = useCallback(async () => {
    try {
      const prods = await fetchAllProducts();
      setProducts(prods);
    } catch (err) {
      console.error('Error refreshing products:', err);
    }
  }, []);

  const refreshCategories = useCallback(async () => {
    try {
      const cats = await fetchCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Error refreshing categories:', err);
    }
  }, []);

  const value = {
    // Loading gate
    globalLoading,
    // Data
    heroSlides,
    categories,
    products,
    // Orders
    ordersCache,
    ordersLoading,
    loadOrdersForEmail,
    invalidateOrdersCache,
    // Manual refresh
    refreshProducts,
    refreshCategories,
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
};

// Internal-use raw context export (hooks below are the public API)
export const useAppData = () => {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider');
  return ctx;
};
