import { useAppData } from '../context/AppDataContext';

/**
 * Returns the globally cached hero slides.
 */
export const useHeroSlides = () => {
  const { heroSlides, globalLoading } = useAppData();
  return { slides: heroSlides, loading: globalLoading };
};
