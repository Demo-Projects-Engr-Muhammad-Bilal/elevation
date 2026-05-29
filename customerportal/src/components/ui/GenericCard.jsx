import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const GenericCard = ({
          id,
          images = [],
          linkTo,
          subtitle,
          title,
          bottomText,
          hoverActions // Optional
}) => {
          return (
                    <article className="flex flex-col items-center group">
                              <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden bg-surface-container-low border border-outline-variant/40 shadow-sm rounded-sm">
                                        {images.length > 0 ? (
                                                  <Swiper
                                                            modules={[Pagination, Navigation]}
                                                            pagination={{ clickable: true }}
                                                            navigation={{ nextEl: `.next-${id}`, prevEl: `.prev-${id}` }}
                                                            loop={images.length > 1}
                                                            className="w-full h-full product-swiper"
                                                  >
                                                            {images.map((img, idx) => (
                                                                      <SwiperSlide key={idx}>
                                                                                <Link to={linkTo} className="block w-full h-full cursor-pointer">
                                                                                          <img src={img} alt={title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                                                                                </Link>
                                                                      </SwiperSlide>
                                                            ))}
                                                            <div className={`prev-${id} absolute top-1/2 left-2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-surface/90 rounded-full text-primary opacity-0 group-hover:opacity-100 cursor-pointer shadow-sm`}><ChevronLeft size={16} /></div>
                                                            <div className={`next-${id} absolute top-1/2 right-2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-surface/90 rounded-full text-primary opacity-0 group-hover:opacity-100 cursor-pointer shadow-sm`}><ChevronRight size={16} /></div>
                                                  </Swiper>
                                        ) : (
                                                  <div className="flex items-center justify-center w-full h-full bg-surface-container">No Image</div>
                                        )}

                                        {/* Hover actions div is now conditionally rendered */}
                                        {hoverActions && (
                                                  <div className="absolute left-0 right-0 z-20 flex gap-2 px-6 transition-all duration-300 opacity-0 bottom-6 group-hover:opacity-100">
                                                            {hoverActions}
                                                  </div>
                                        )}
                              </div>

                              <div className="text-center">
                                        {subtitle && <p className="mb-1 uppercase font-label-caps text-[10px] text-on-surface-variant">{subtitle}</p>}
                                        <h3 className="mb-2 font-headline-md text-[16px] text-primary">{title}</h3>
                                        {bottomText && <p className="font-body-md text-[14px] text-on-surface-variant line-clamp-1">{bottomText}</p>}
                              </div>
                    </article>
          );
};