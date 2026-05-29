import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ui/ProductCard';
import { SkeletonCard } from '../components/ui/SkeletonCard';
import { EmptyState } from '../components/ui/EmptyState';
import { FilterDrawer } from '../components/products/FilterDrawer';

const ITEMS_PER_PAGE = 20;
const CATEGORIES = ['Tops', 'Dresses', 'Knitwear', 'Trousers'];
const SIZES = ['XS', 'S', 'M', 'L'];
const skeletonArray = new Array(ITEMS_PER_PAGE).fill(0);

const AllProducts = () => {
  const { products, loading } = useProducts();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery =
    new URLSearchParams(location.search).get('search')?.toLowerCase() || '';

  // Reset to page 1 whenever filters or search change
  const resetPage = () => setCurrentPage(1);

  const handleCategoryChange = (val) => { setSelectedCategory(val); resetPage(); };
  const handleSizeChange = (val) => { setSelectedSize(val); resetPage(); };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedSize('');
    setIsFilterOpen(false);
    setCurrentPage(1);
    if (searchQuery) navigate('/products');
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery);
      const matchesCategory = selectedCategory
        ? p.category.toLowerCase() === selectedCategory.toLowerCase()
        : true;
      const matchesSize = selectedSize ? p.sizes?.includes(selectedSize) : true;
      return matchesSearch && matchesCategory && matchesSize;
    });
  }, [products, searchQuery, selectedCategory, selectedSize]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const hasActiveFilters = selectedCategory || selectedSize || searchQuery;

  return (
    <main className="pt-24 pb-section-gap max-w-[1280px] mx-auto min-h-screen flex flex-col relative overflow-hidden">
      <header className="mt-20 mb-16 text-center px-margin-mobile md:px-margin-desktop">
        <h2 className="font-display-lg text-[48px] md:text-[80px] leading-tight mb-6 italic text-primary">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'The Collection'}
        </h2>
        {!searchQuery && (
          <p className="max-w-2xl mx-auto text-lg font-body-md text-on-surface-variant">
            Discover a curated selection of silhouettes designed for the modern wardrobe.
          </p>
        )}
      </header>

      {/* Sticky filter bar */}
      <section className="sticky top-20 z-30 bg-surface/95 backdrop-blur-sm py-4 border-y border-outline-variant/30 px-margin-mobile md:px-margin-desktop transition-all">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 transition-colors cursor-pointer group hover:text-primary text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors">
              tune
            </span>
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
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
        selectedSize={selectedSize}
        setSelectedSize={handleSizeChange}
        clearFilters={clearFilters}
        categories={CATEGORIES}
        sizes={SIZES}
      />

      <section className="px-margin-mobile md:px-margin-desktop mt-16 flex-grow min-h-[60vh] flex flex-col justify-between">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-16">
            {skeletonArray.map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            icon={products.length === 0 ? 'inventory_2' : 'search_off'}
            message={
              products.length === 0
                ? 'Our collection is currently being curated.'
                : 'No pieces match your current selection.'
            }
            action={
              hasActiveFilters && products.length > 0 ? (
                <button
                  onClick={clearFilters}
                  className="pb-1 tracking-widest uppercase transition-colors border-b font-label-caps text-primary border-primary hover:text-secondary hover:border-secondary"
                >
                  Clear Filters
                </button>
              ) : null
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-16">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center pt-10 mt-20 gap-8 md:gap-12 border-t border-outline-variant/30">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className={`font-label-caps text-label-caps flex items-center gap-2 transition-colors ${
                    currentPage === 1
                      ? 'text-outline-variant cursor-not-allowed'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined">west</span> PREVIOUS
                </button>

                <div className="flex gap-4 md:gap-6 font-label-caps text-label-caps">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <span
                      key={n}
                      onClick={() => setCurrentPage(n)}
                      className={`cursor-pointer transition-colors ${
                        currentPage === n
                          ? 'text-primary border-b border-primary pb-1'
                          : 'text-on-surface-variant hover:text-primary'
                      }`}
                    >
                      {String(n).padStart(2, '0')}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`font-label-caps text-label-caps flex items-center gap-2 transition-colors ${
                    currentPage === totalPages
                      ? 'text-outline-variant cursor-not-allowed'
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
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
