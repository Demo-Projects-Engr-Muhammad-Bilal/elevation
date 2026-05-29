import { Link } from 'react-router-dom';
import { ProductCard } from '../ui/ProductCard';
import { SkeletonCard } from '../ui/SkeletonCard';
import { SectionHeader } from '../ui/SectionHeader';
import { EmptyState } from '../ui/EmptyState';

const skeletonArray = new Array(8).fill(0);

export const FeaturedSection = ({ products, loading }) => {
  return (
    <section className="bg-surface min-h-[60vh] py-12 md:py-24">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <SectionHeader title="Products" linkTo="/products" linkLabel="VIEW ALL" />

        {loading ? (
          <div className="grid grid-cols-2 gap-gutter lg:grid-cols-4">
            {skeletonArray.map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <EmptyState
            icon="inventory_2"
            message="New arrivals are currently being curated."
            subMessage="Please check back later."
          />
        ) : (
          <div className="grid grid-cols-2 gap-gutter lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
