import { CategoryCard } from '../ui/CategoryCard';
import { SectionHeader } from '../ui/SectionHeader';
import { EmptyState } from '../ui/EmptyState';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=800&auto=format&fit=crop',
];

const skeletonArray = new Array(4).fill(0);

export const CategorySection = ({ categories, loading }) => {
  return (
    <section className="bg-surface min-h-[60vh] py-12 md:py-24">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <SectionHeader title="Categories" linkTo="/categories" linkLabel="EXPLORE ALL" />

        {loading ? (
          <div className="grid grid-cols-2 gap-gutter lg:grid-cols-4">
            {skeletonArray.map((_, i) => (
              <div key={i} className="w-full aspect-[3/4] bg-gray-200 animate-pulse rounded-sm" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <EmptyState icon="category" message="Categories are currently being updated." />
        ) : (
          <div className="grid grid-cols-2 gap-gutter lg:grid-cols-4">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                image={FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
