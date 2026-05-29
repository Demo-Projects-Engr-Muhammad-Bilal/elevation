import { useAppData } from '../context/AppDataContext';

/**
 * Returns the globally cached categories list and a loading flag.
 */
export const useCategories = () => {
  const { categories, globalLoading, refreshCategories } = useAppData();
  return { categories, loading: globalLoading, refreshCategories };
};
