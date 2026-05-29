import { useHeroSlides } from '../hooks/useHeroSlides';
import { useCategories } from '../hooks/useCategories';
import { useProducts } from '../hooks/useProducts';

import { HeroSlider } from '../components/home/HeroSlider';
import { QuietLuxury } from '../components/home/QuietLuxury';
import { CategorySection } from '../components/home/CategorySection';
import { FeaturedSection } from '../components/home/FeaturedSection';
import { Newsletter } from '../components/home/Newsletter';

const FEATURED_LIMIT = 8;

const Divider = () => (
  <hr className="border-t border-black my-12 md:my-24 mx-6 md:mx-21" />
);

const Home = () => {
  const { slides } = useHeroSlides();
  const { categories, loading: loadingCategories } = useCategories();
  const { products, loading: loadingProducts } = useProducts();

  // Slice featured products from cache — no extra fetch, no window.innerWidth hack
  const featuredProducts = products.slice(0, FEATURED_LIMIT);

  return (
    <main className="overflow-x-hidden">
      <HeroSlider slides={slides} />

      <Divider />
      <QuietLuxury />

      <Divider />
      <CategorySection categories={categories} loading={loadingCategories} />

      <Divider />
      <FeaturedSection products={featuredProducts} loading={loadingProducts} />

      <Divider />
      <Newsletter />
      <Divider />
    </main>
  );
};

export default Home;
