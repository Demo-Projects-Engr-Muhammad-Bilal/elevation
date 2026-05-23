import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export const ProductGallery = ({ images, product, thumbsSwiper, setThumbsSwiper }) => {
          return (
                    <div className="md:col-span-7 lg:col-span-8">
                              <div className="relative w-full aspect-[4/5] bg-surface-container-low mb-6 group overflow-hidden border border-outline-variant/40 rounded-lg shadow-sm">
                                        {images.length > 0 ? (
                                                  <Swiper
                                                            spaceBetween={0}
                                                            navigation={{ nextEl: '.detail-swiper-next', prevEl: '.detail-swiper-prev' }}
                                                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                                            modules={[FreeMode, Navigation, Thumbs]}
                                                            className="w-full h-full"
                                                  >
                                                            {images.map((img, idx) => (
                                                                      <SwiperSlide key={idx}>
                                                                                <img
                                                                                          src={img}
                                                                                          alt={`${product.name} - View ${idx + 1}`}
                                                                                          className="object-cover w-full h-full"
                                                                                          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x1000/eeeeee/959494?text=No+Image"; }}
                                                                                />
                                                                      </SwiperSlide>
                                                            ))}
                                                            <div className="absolute z-10 flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-full shadow-sm cursor-pointer detail-swiper-prev top-1/2 left-4 -translate-y-1/2 bg-surface/90 backdrop-blur-md text-primary opacity-0 group-hover:opacity-100 hover:scale-110">
                                                                      <ChevronLeft size={20} strokeWidth={1.5} />
                                                            </div>
                                                            <div className="absolute z-10 flex items-center justify-center w-10 h-10 transition-all duration-300 rounded-full shadow-sm cursor-pointer detail-swiper-next top-1/2 right-4 -translate-y-1/2 bg-surface/90 backdrop-blur-md text-primary opacity-0 group-hover:opacity-100 hover:scale-110">
                                                                      <ChevronRight size={20} strokeWidth={1.5} />
                                                            </div>
                                                  </Swiper>
                                        ) : (
                                                  <div className="flex flex-col items-center justify-center w-full h-full text-outline-variant bg-surface-container">
                                                            <span className="material-symbols-outlined text-[48px] mb-2">image_not_supported</span>
                                                            <span className="font-label-caps text-[10px] tracking-widest">NO IMAGE</span>
                                                  </div>
                                        )}
                              </div>

                              {images.length > 1 && (
                                        <div className="w-full h-24 md:h-32">
                                                  <Swiper
                                                            onSwiper={setThumbsSwiper}
                                                            spaceBetween={16}
                                                            slidesPerView={4}
                                                            freeMode={true}
                                                            watchSlidesProgress={true}
                                                            modules={[FreeMode, Navigation, Thumbs]}
                                                            className="h-full detail-thumb-slider"
                                                  >
                                                            {images.map((img, idx) => (
                                                                      <SwiperSlide key={idx} className="overflow-hidden transition-all duration-300 border rounded-md cursor-pointer border-outline-variant/40 shadow-sm opacity-60 hover:opacity-100">
                                                                                <img src={img} alt={`Thumb ${idx}`} className="object-cover w-full h-full" />
                                                                      </SwiperSlide>
                                                            ))}
                                                  </Swiper>
                                        </div>
                              )}
                    </div>
          );
};