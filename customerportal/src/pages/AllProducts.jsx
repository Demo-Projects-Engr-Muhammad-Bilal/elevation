import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { ProductCard } from '../components/ui/ProductCard';
import { SkeletonCard } from '../components/ui/SkeletonCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilterDrawer } from '../components/products/FilterDrawer';

const AllProducts = () => {
          const [products, setProducts] = useState([]);
          const [loading, setLoading] = useState(true);
          const [isFilterOpen, setIsFilterOpen] = useState(false);
          const [selectedCategory, setSelectedCategory] = useState('');
          const [selectedSize, setSelectedSize] = useState('');
          const [currentPage, setCurrentPage] = useState(1);
          const itemsPerPage = 20;

          const location = useLocation();
          const navigate = useNavigate();
          const searchParams = new URLSearchParams(location.search);
          const searchQuery = searchParams.get('search')?.toLowerCase() || '';

          useEffect(() => setCurrentPage(1), [searchQuery, selectedCategory, selectedSize]);

          useEffect(() => {
                    const fetchProducts = async () => {
                              try {
                                        const querySnapshot = await getDocs(collection(db, "products"));
                                        setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                              } catch (error) {
                                        console.error("Error fetching products:", error);
                              } finally {
                                        setLoading(false);
                              }
                    };
                    fetchProducts();
          }, []);

          const filteredProducts = products.filter(product => {
                    const matchesSearch = product.name.toLowerCase().includes(searchQuery) || product.category.toLowerCase().includes(searchQuery);
                    const matchesCategory = selectedCategory ? product.category.toLowerCase() === selectedCategory.toLowerCase() : true;
                    const matchesSize = selectedSize ? product.sizes?.includes(selectedSize) : true;
                    return matchesSearch && matchesCategory && matchesSize;
          });

          const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
          const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

          const skeletonArray = new Array(itemsPerPage).fill(0);
          const categories = ['Tops', 'Dresses', 'Knitwear', 'Trousers'];
          const sizes = ['XS', 'S', 'M', 'L'];

          const clearFilters = () => {
                    setSelectedCategory('');
                    setSelectedSize('');
                    setIsFilterOpen(false);
                    if (searchQuery) navigate('/products');
          };

          return (
                    <main className="pt-24 pb-section-gap max-w-[1280px] mx-auto min-h-screen flex flex-col relative overflow-hidden">
                              <header className="mt-20 mb-16 text-center px-margin-mobile md:px-margin-desktop">
                                        <h2 className="font-display-lg text-[48px] md:text-[80px] leading-tight mb-6 italic text-primary">
                                                  {searchQuery ? `Search Results for "${searchQuery}"` : "The Collection"}
                                        </h2>
                                        {!searchQuery && (
                                                  <p className="max-w-2xl mx-auto text-lg font-body-md text-on-surface-variant">
                                                            Discover a curated selection of silhouettes designed for the modern wardrobe.
                                                  </p>
                                        )}
                              </header>

                              <section className="sticky top-20 z-30 bg-surface/95 backdrop-blur-sm py-4 border-y border-outline-variant/30 px-margin-mobile md:px-margin-desktop transition-all">
                                        <div className="flex items-center justify-between">
                                                  <button onClick={() => setIsFilterOpen(true)} className="flex items-center gap-2 transition-colors cursor-pointer group hover:text-primary text-on-surface-variant">
                                                            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">tune</span>
                                                            <span className="font-label-caps text-[11px] tracking-widest uppercase">
                                                                      Filters {(selectedCategory || selectedSize) && '(Active)'}
                                                            </span>
                                                  </button>
                                                  <span className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest">
                                                            {loading ? '...' : filteredProducts.length} ITEMS
                                                  </span>
                                        </div>
                              </section>

                              <FilterDrawer
                                        isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}
                                        selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                                        selectedSize={selectedSize} setSelectedSize={setSelectedSize}
                                        clearFilters={clearFilters} categories={categories} sizes={sizes}
                              />

                              <section className="px-margin-mobile md:px-margin-desktop mt-16 flex-grow min-h-[60vh] flex flex-col justify-between">
                                        {loading ? (
                                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-16">
                                                            {skeletonArray.map((_, index) => <SkeletonCard key={index} />)}
                                                  </div>
                                        ) : filteredProducts.length === 0 ? (
                                                  <div className="flex flex-col items-center justify-center w-full py-20 mt-10 text-center border border-outline-variant/30 bg-surface-container-lowest">
                                                            <span className="material-symbols-outlined text-[48px] text-outline-variant mb-4">
                                                                      {products.length === 0 ? 'inventory_2' : 'search_off'}
                                                            </span>
                                                            <p className="font-body-md text-on-surface-variant">
                                                                      {products.length === 0 ? "Our collection is currently being curated." : "No pieces match your current selection."}
                                                            </p>
                                                            {(searchQuery || selectedCategory || selectedSize) && products.length > 0 && (
                                                                      <button onClick={clearFilters} className="pb-1 mt-6 tracking-widest uppercase transition-colors border-b font-label-caps text-primary border-primary hover:text-secondary hover:border-secondary">
                                                                                Clear Filters
                                                                      </button>
                                                            )}
                                                  </div>
                                        ) : (
                                                  <>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-16">
                                                                      {currentProducts.map(product => <ProductCard key={product.id} product={product} />)}
                                                            </div>

                                                            {totalPages > 1 && (
                                                                      <div className="flex items-center justify-center pt-10 mt-20 gap-8 md:gap-12 border-t border-outline-variant/30">
                                                                                <button
                                                                                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                                                          disabled={currentPage === 1}
                                                                                          className={`font-label-caps text-label-caps flex items-center gap-2 transition-colors ${currentPage === 1 ? 'text-outline-variant cursor-not-allowed' : 'text-on-surface-variant hover:text-primary'}`}
                                                                                >
                                                                                          <span className="material-symbols-outlined">west</span> PREVIOUS
                                                                                </button>

                                                                                <div className="flex gap-4 md:gap-6 font-label-caps text-label-caps">
                                                                                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                                                                                    <span
                                                                                                              key={number}
                                                                                                              onClick={() => setCurrentPage(number)}
                                                                                                              className={`cursor-pointer transition-colors ${currentPage === number ? 'text-primary border-b border-primary pb-1' : 'text-on-surface-variant hover:text-primary'}`}
                                                                                                    >
                                                                                                              {String(number).padStart(2, '0')}
                                                                                                    </span>
                                                                                          ))}
                                                                                </div>

                                                                                <button
                                                                                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                                                          disabled={currentPage === totalPages}
                                                                                          className={`font-label-caps text-label-caps flex items-center gap-2 transition-colors ${currentPage === totalPages ? 'text-outline-variant cursor-not-allowed' : 'text-on-surface-variant hover:text-primary'}`}
                                                                                >
                                                                                          NEXT <span className="material-symbols-outlined">east</span>
                                                                                </button>
                                                                      </div>
                                                            )}
                                                  </>
                                        )}
                              </section>
                    </main>
          );
};

export default AllProducts;