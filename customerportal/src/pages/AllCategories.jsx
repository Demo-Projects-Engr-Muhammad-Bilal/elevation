import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { CategoryCard } from '../components/ui/CategoryCard';
import { EmptyState } from '../components/ui/EmptyState';

// Fallback images for categories
const FALLBACK_IMAGES = [
          "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=800&auto=format&fit=crop",
];

const Categories = () => {
          const [categories, setCategories] = useState([]);
          const [loading, setLoading] = useState(true);

          // Fetch Categories from Firebase
          useEffect(() => {
                    const fetchCategories = async () => {
                              try {
                                        const snap = await getDocs(collection(db, "categories"));
                                        const catsData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                                        setCategories(catsData);
                              } catch (error) {
                                        console.error("Error fetching categories:", error);
                              } finally {
                                        setLoading(false);
                              }
                    };
                    fetchCategories();
          }, []);

          const skeletonArray = new Array(8).fill(0);

          return (
                    <main className="pt-24 pb-section-gap mx-auto min-h-screen flex flex-col relative overflow-hidden">
                              <header className="mt-20 mb-16 text-center px-margin-mobile md:px-margin-desktop">
                                        <h2 className="font-display-lg text-[48px] md:text-[80px] leading-tight mb-6 italic text-primary">
                                                  All Collections
                                        </h2>
                                        <p className="max-w-2xl mx-auto text-lg font-body-md text-on-surface-variant">
                                                  Discover our curated selections of silhouettes designed for the modern wardrobe.
                                        </p>
                              </header>

                              {/* Sticky bar - Only showing count, filters removed */}
                              <section className="sticky top-20 z-30 bg-surface/95 backdrop-blur-sm py-4 border-y border-outline-variant/30 px-margin-mobile md:px-margin-desktop transition-all">
                                        <div className="flex items-center justify-end">
                                                  <span className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest">
                                                            {loading ? '...' : categories.length} COLLECTIONS
                                                  </span>
                                        </div>
                              </section>

                              <section className="px-margin-mobile md:px-margin-desktop mt-16 flex-grow min-h-[60vh] flex flex-col justify-between">
                                        {loading ? (
                                                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-16">
                                                            {skeletonArray.map((_, i) => (
                                                                      <div key={i} className="w-full aspect-[3/4] bg-gray-200 animate-pulse rounded-sm"></div>
                                                            ))}
                                                  </div>
                                        ) : categories.length === 0 ? (
                                                  <EmptyState
                                                            icon="category"
                                                            message="Our collections are currently being curated."
                                                  />
                                        ) : (
                                                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-16">
                                                            {categories.map((category, index) => (
                                                                      <CategoryCard
                                                                                key={category.id}
                                                                                category={category}
                                                                                image={FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]}
                                                                      />
                                                            ))}
                                                  </div>
                                        )}
                              </section>
                    </main>
          );
};

export default Categories;