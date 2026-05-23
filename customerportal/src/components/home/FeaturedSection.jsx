import { Link } from 'react-router-dom';
import { ProductCard } from '../ui/ProductCard';
import { SkeletonCard } from '../ui/SkeletonCard';

export const FeaturedSection = ({ products, loading }) => {
          const skeletonArray = new Array(8).fill(0);

          return (
                    <section className="py-section-gap bg-surface min-h-[60vh]">
                              <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
                                        <div className="flex items-end justify-between mb-16">
                                                  <h2 className="text-xl font-headline-lg text-primary">Products</h2>
                                                  <Link to="/products" className="transition-colors font-label-caps text-label-caps text-on-surface-variant hover:text-primary">
                                                            VIEW ALL
                                                  </Link>
                                        </div>

                                        {loading ? (
                                                  <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
                                                            {skeletonArray.map((_, index) => <SkeletonCard key={index} />)}
                                                  </div>
                                        ) : products.length === 0 ? (
                                                  <div className="w-full py-16 text-center border border-outline-variant/30 bg-surface-container-lowest">
                                                            <span className="material-symbols-outlined text-[48px] text-outline-variant mb-4">inventory_2</span>
                                                            <p className="font-body-md text-on-surface-variant">New arrivals are currently being curated.</p>
                                                            <p className="font-label-caps text-[11px] text-outline mt-2 uppercase tracking-widest">Please check back later.</p>
                                                  </div>
                                        ) : (
                                                  <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
                                                            {products.map(product => <ProductCard key={product.id} product={product} />)}
                                                  </div>
                                        )}
                              </div>
                    </section>
          );
};