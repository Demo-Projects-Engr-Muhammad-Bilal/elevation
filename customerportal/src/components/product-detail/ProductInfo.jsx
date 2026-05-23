export const ProductInfo = ({ product, selectedSize, setSelectedSize, handleAddToCart, activeAccordion, setActiveAccordion }) => {
          return (
                    <div className="md:col-span-5 lg:col-span-4 sticky top-[120px] h-fit mt-8 md:mt-0">
                              <div className="flex flex-col gap-6 p-0 bg-transparent border-none rounded-none shadow-none">
                                        <div>
                                                  <h1 className="font-headline-lg text-[32px] md:text-headline-lg leading-tight text-primary mb-2">{product.name}</h1>
                                                  <p className="font-body-lg text-body-lg text-secondary">${product.price}</p>
                                        </div>

                                        <p className="pt-6 italic leading-relaxed font-body-md text-on-surface-variant border-t border-outline-variant/30">
                                                  {product.description || "Crafted for the modern minimalist."}
                                        </p>

                                        <div className="pt-6 space-y-6">
                                                  {product.sizes && product.sizes.length > 0 && (
                                                            <div className="space-y-3">
                                                                      <div className="flex items-center justify-between">
                                                                                <span className="tracking-widest uppercase font-label-caps text-primary">Select Size</span>
                                                                                <span className="font-label-caps text-[10px] text-on-surface-variant underline cursor-pointer">Size Guide</span>
                                                                      </div>
                                                                      <div className="flex flex-wrap gap-3">
                                                                                {product.sizes.map(size => (
                                                                                          <button
                                                                                                    key={size}
                                                                                                    onClick={() => setSelectedSize(size)}
                                                                                                    className={`w-12 h-12 flex items-center justify-center border rounded-md font-label-caps transition-all ${selectedSize === size
                                                                                                              ? 'border-primary bg-primary text-on-primary shadow-sm'
                                                                                                              : 'border-outline-variant hover:border-primary text-primary'
                                                                                                              }`}
                                                                                          >
                                                                                                    {size}
                                                                                          </button>
                                                                                ))}
                                                                      </div>
                                                            </div>
                                                  )}

                                                  <button
                                                            onClick={handleAddToCart}
                                                            className="w-full py-4 uppercase transition-all duration-300 rounded-sm bg-primary text-on-primary font-label-caps tracking-widest hover:bg-secondary hover:shadow-lg"
                                                  >
                                                            Add to Bag
                                                  </button>
                                        </div>

                                        <div className="pt-8 space-y-4 border-t border-outline-variant/30">
                                                  {['Size & Fit', 'Materials & Care', 'Shipping & Returns'].map((tab) => (
                                                            <div key={tab} className="pb-4 border-b border-outline-variant/20">
                                                                      <div
                                                                                className="flex items-center justify-between cursor-pointer group"
                                                                                onClick={() => setActiveAccordion(activeAccordion === tab ? '' : tab)}
                                                                      >
                                                                                <span className="tracking-widest uppercase font-label-caps text-primary group-hover:text-secondary">{tab}</span>
                                                                                <span className={`material-symbols-outlined transition-transform duration-300 text-on-surface-variant ${activeAccordion === tab ? 'rotate-180' : ''}`}>
                                                                                          expand_more
                                                                                </span>
                                                                      </div>
                                                                      {activeAccordion === tab && (
                                                                                <div className="pt-4 animate-fade-in-up">
                                                                                          <p className="text-sm leading-relaxed font-body-md text-on-surface-variant">
                                                                                                    {tab === 'Size & Fit' && "Designed for a relaxed, oversized fit. If you prefer a more tailored look, we recommend sizing down."}
                                                                                                    {tab === 'Materials & Care' && "100% Premium material. Machine wash cold on a delicate cycle. Hang to dry out of direct sunlight."}
                                                                                                    {tab === 'Shipping & Returns' && "Complimentary worldwide shipping on orders over $500. Returns accepted within 14 days."}
                                                                                          </p>
                                                                                </div>
                                                                      )}
                                                            </div>
                                                  ))}
                                        </div>
                              </div>
                    </div>
          );
};