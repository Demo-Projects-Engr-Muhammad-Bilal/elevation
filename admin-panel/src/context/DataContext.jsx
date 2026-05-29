import { createContext, useState } from 'react';

/**
 * DataContext — centralized in-memory cache for all Firestore collections.
 *
 * null  → not yet loaded (triggers a fetch in the domain hook)
 * []    → loaded, legitimately empty
 * [...] → loaded with data
 *
 * Mutations update this state optimistically so pages never re-fetch
 * when revisited. A refresh() helper in each domain hook resets to null
 * to force a fresh fetch when explicitly needed.
 */
export const DataContext = createContext();

export function DataProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [hero, setHero] = useState(null);
  const [categories, setCategories] = useState(null);
  const [orders, setOrders] = useState(null);
  const [subscribers, setSubscribers] = useState(null);

  return (
    <DataContext.Provider
      value={{
        products, setProducts,
        hero, setHero,
        categories, setCategories,
        orders, setOrders,
        subscribers, setSubscribers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
