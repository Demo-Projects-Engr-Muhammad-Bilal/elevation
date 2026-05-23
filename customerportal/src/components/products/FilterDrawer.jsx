export const FilterDrawer = ({
          isFilterOpen,
          setIsFilterOpen,
          selectedCategory,
          setSelectedCategory,
          selectedSize,
          setSelectedSize,
          clearFilters,
          categories,
          sizes
}) => {
          return (
                    <>
                              <div
                                        className={`fixed inset-0 bg-primary/20 backdrop-blur-[2px] z-[60] transition-opacity duration-500 ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                        onClick={() => setIsFilterOpen(false)}
                              />
                              <div className={`fixed top-0 left-0 h-full w-full max-w-[400px] bg-surface z-[70] transition-transform duration-500 flex flex-col shadow-2xl ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                                        <header className="flex items-center justify-between px-8 py-10 border-b border-outline-variant/30">
                                                  <h2 className="font-headline-md text-headline-md text-primary">Filters</h2>
                                                  <button onClick={() => setIsFilterOpen(false)} className="p-2 transition-colors rounded-full hover:bg-surface-container-high">
                                                            <span className="material-symbols-outlined text-[24px]">close</span>
                                                  </button>
                                        </header>

                                        <div className="flex-1 px-8 py-8 space-y-10 overflow-y-auto hide-scrollbar">
                                                  <div>
                                                            <h3 className="mb-4 tracking-widest uppercase font-label-caps text-primary">Category</h3>
                                                            <div className="flex flex-col gap-3">
                                                                      {categories.map(cat => (
                                                                                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                                                                          <input
                                                                                                    type="radio"
                                                                                                    name="category"
                                                                                                    className="w-4 h-4 bg-transparent text-primary border-outline-variant focus:ring-primary focus:ring-offset-surface"
                                                                                                    checked={selectedCategory === cat}
                                                                                                    onChange={() => setSelectedCategory(cat)}
                                                                                          />
                                                                                          <span className={`font-body-md transition-colors ${selectedCategory === cat ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>
                                                                                                    {cat}
                                                                                          </span>
                                                                                </label>
                                                                      ))}
                                                            </div>
                                                  </div>

                                                  <div>
                                                            <h3 className="mb-4 tracking-widest uppercase font-label-caps text-primary">Size</h3>
                                                            <div className="flex flex-wrap gap-3">
                                                                      {sizes.map(size => (
                                                                                <button
                                                                                          key={size}
                                                                                          onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                                                                                          className={`w-12 h-12 flex items-center justify-center border font-label-caps transition-all ${selectedSize === size
                                                                                                              ? 'border-primary bg-primary text-on-primary'
                                                                                                              : 'border-secondary-fixed-dim hover:bg-primary hover:text-on-primary text-primary'
                                                                                                    }`}
                                                                                >
                                                                                          {size}
                                                                                </button>
                                                                      ))}
                                                            </div>
                                                  </div>
                                        </div>

                                        <footer className="flex gap-4 p-8 border-t bg-surface border-outline-variant/30">
                                                  <button onClick={clearFilters} className="flex-1 py-4 tracking-widest uppercase transition-all border border-outline font-label-caps text-label-caps text-primary hover:bg-surface-container">
                                                            Clear All
                                                  </button>
                                                  <button onClick={() => setIsFilterOpen(false)} className="flex-1 py-4 tracking-widest uppercase transition-all bg-primary text-on-primary font-label-caps text-label-caps hover:bg-secondary">
                                                            Apply
                                                  </button>
                                        </footer>
                              </div>
                    </>
          );
};