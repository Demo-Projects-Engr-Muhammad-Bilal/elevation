import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const HeroSlider = ({ slides }) => {
          const navigate = useNavigate();

          return (
                    <section className="relative w-full h-screen overflow-hidden">
                              <Swiper
                                        modules={[Autoplay, EffectFade, Navigation, Pagination]}
                                        effect="fade"
                                        fadeEffect={{ crossFade: true }}
                                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                                        navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
                                        pagination={{ el: ".hero-pagination", clickable: true }}
                                        loop={true}
                                        className="w-full h-full"
                                        speed={800}
                              >
                                        {slides.map((slide, idx) => (
                                                  <SwiperSlide key={idx}>
                                                            <div className="relative w-full h-screen">
                                                                      <img src={slide.image} className="absolute inset-0 object-cover w-full h-full" alt={slide.title} />
                                                                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)]/80 via-transparent to-transparent"></div>
                                                                      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
                                                                                <h1 className="font-display-lg text-[48px] md:text-[80px] text-[var(--text-color)] leading-tight italic tracking-[-0.03em] mb-6">
                                                                                          {slide.title}
                                                                                </h1>
                                                                                <p className="max-w-xl mb-8 text-lg leading-relaxed md:text-xl font-body-md text-[var(--text-muted)]">
                                                                                          {slide.description}
                                                                                </p>
                                                                                <button
                                                                                          onClick={() => navigate("/products")}
                                                                                          className="border border-[var(--text-color)] text-[var(--text-color)] px-10 py-4 font-label-caps uppercase tracking-[0.2em] hover:bg-[var(--text-color)] hover:text-[var(--btn-hover-text)] transition-all duration-300"
                                                                                >
                                                                                          {slide.buttonText}
                                                                                </button>
                                                                      </div>
                                                            </div>
                                                  </SwiperSlide>
                                        ))}
                                        <div className="absolute z-50 flex items-center justify-center w-14 h-14 transition-all duration-300 rounded-full shadow-lg cursor-pointer hero-prev top-1/2 left-8 bg-[var(--nav-bg)] text-[var(--nav-text)] hover:bg-[var(--nav-hover-bg)]">
                                                  <ChevronLeft size={24} strokeWidth={1.5} />
                                        </div>
                                        <div className="absolute z-50 flex items-center justify-center w-14 h-14 transition-all duration-300 rounded-full shadow-lg cursor-pointer hero-next top-1/2 right-8 bg-[var(--nav-bg)] text-[var(--nav-text)] hover:bg-[var(--nav-hover-bg)]">
                                                  <ChevronRight size={24} strokeWidth={1.5} />
                                        </div>
                                        <div className="absolute left-0 right-0 z-50 flex justify-center gap-2 hero-pagination bottom-8"></div>
                              </Swiper>
                    </section>
          );
};