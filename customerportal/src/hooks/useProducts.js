import { useAppData } from '../context/AppDataContext';

/**
 * Returns the globally cached products list and a loading flag.
 * After app boot, loading is always false and products are populated.
 */
export const useProducts = () => {
  const { products, globalLoading, refreshProducts } = useAppData();
  return { products, loading: globalLoading, refreshProducts };
};
