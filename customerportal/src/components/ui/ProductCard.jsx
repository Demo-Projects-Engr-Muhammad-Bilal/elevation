import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const ProductCard = ({ product, showQuickAdd = false }) => {
          const { addToCart, setIsCartOpen } = useCart();

          const handleQuickAdd = (e) => {
                    e.preventDefault();
                    addToCart(product, 1, product.sizes?.[0] || 'S', product.colors?.[0] || 'Default');
                    setIsCartOpen(true);
          };

          const images = product.images?.length > 0 ? product.images : product.image ? [product.image] : [];

          return (
                    <article className="flex flex-col items-center group">
                              <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden bg-surface-container-low border border-outline-variant/40 shadow-sm rounded-sm">
                                        {images.length > 0 ? (
                                                  <Swiper
                                                            modules={[Pagination, Navigation]}
                                                            pagination={{ clickable: true }}
                                                            navigation={{ nextEl: `.next-${product.id}`, prevEl: `.prev-${product.id}` }}
                                                            loop={images.length > 1}
                                                            className="w-full h-full product-swiper"
                                                  >
                                                            {images.map((img, idx) => (
                                                                      <SwiperSlide key={idx}>
                                                                                <Link to={`/product/${product.id}`} className="block w-full h-full cursor-pointer">
                                                                                          <img src={img} alt={product.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                                                                                </Link>
                                                                      </SwiperSlide>
                                                            ))}
                                                            <div className={`prev-${product.id} absolute top-1/2 left-2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-surface/90 rounded-full text-primary opacity-0 group-hover:opacity-100 cursor-pointer shadow-sm`}><ChevronLeft size={16} /></div>
                                                            <div className={`next-${product.id} absolute top-1/2 right-2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-surface/90 rounded-full text-primary opacity-0 group-hover:opacity-100 cursor-pointer shadow-sm`}><ChevronRight size={16} /></div>
                                                  </Swiper>
                                        ) : (
                                                  <div className="flex items-center justify-center w-full h-full bg-surface-container">No Image</div>
                                        )}

                                        <div className="absolute left-0 right-0 z-20 flex gap-2 px-6 transition-all duration-300 opacity-0 bottom-6 group-hover:opacity-100">
                                                  {showQuickAdd ? (
                                                            <>
                                                                      <Link to={`/product/${product.id}`} className="flex items-center justify-center flex-1 gap-2 py-3 tracking-widest text-[10px] text-black transition-colors bg-white font-label-caps hover:bg-surface-container">
                                                                                <Eye size={14} /> VIEW
                                                                      </Link>
                                                                      <button onClick={handleQuickAdd} className="flex items-center justify-center flex-1 gap-2 py-3 tracking-widest text-[10px] text-white transition-colors bg-primary font-label-caps hover:bg-secondary">
                                                                                <ShoppingBag size={14} /> ADD
                                                                      </button>
                                                            </>
                                                  ) : (
                                                            <Link to={`/product/${product.id}`} className="flex items-center justify-center w-full gap-2 py-3 tracking-widest text-[10px] text-white transition-colors bg-primary font-label-caps hover:bg-secondary">
                                                                      VIEW DETAILS
                                                            </Link>
                                                  )}
                                        </div>
                              </div>

                              <div className="text-center">
                                        <p className="mb-1 uppercase font-label-caps text-[10px] text-on-surface-variant">{product.category}</p>
                                        <h3 className="mb-2 font-headline-md text-[16px] text-primary">{product.name}</h3>
                                        <p className="font-body-md text-[14px] text-on-surface-variant">${product.price}</p>
                              </div>
                    </article>
          );
};