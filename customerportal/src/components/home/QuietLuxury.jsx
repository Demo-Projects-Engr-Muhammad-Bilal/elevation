import { Link } from 'react-router-dom';

export const QuietLuxury = () => {
          return (
                    <section className="py-12 md:py-24 bg-[#F5F0EA] px-margin-mobile md:px-margin-desktop">
                              <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                                        <div className="flex flex-col justify-center space-y-6 lg:col-span-4">
                                                  <h2 className="font-display-lg text-2xl md:text-3xl text-[#181919] italic tracking-wider">
                                                            Quiet Luxury
                                                  </h2>
                                                  <p className="font-body-md text-[#181919]/70 text-sm leading-relaxed">
                                                            Our philosophy is rooted in the "Quiet Luxury" movement—an aesthetic that prioritizes quality, restraint, and timeless elegance. Every garment is a deliberate statement of sophistication.
                                                  </p>
                                                  <Link to="/about" className="font-label-caps text-[12px] uppercase tracking-[0.2em] border-b border-[#181919] pb-1 w-fit hover:text-primary transition-all">
                                                            LEARN ABOUT OUR STORY
                                                  </Link>
                                        </div>
                                        <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-8">
                                                  {/* Yahan height h-[300px] md:h-[400px] kar di gayi hai */}
                                                  <div className="h-[250px] md:h-[400px] overflow-hidden shadow-xl rounded-sm">
                                                            <img
                                                                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-fB-x5nUUvUfWljR8tH9nC5q74FDIAvL8WItSBQ2d1IsD41Hfb8QdAAEWxyP7KwJUKy738mjbfhogMKmSyWXa5tNV-ot_Hh3R24RGu_eCcEkcNfQPHh6P9uqzjtf6PK2IdkgACghFYYEYFMgT8Ca2z9AFNHDnM9-QJCAh6oItFTFRuO1OSlXbimPaxE4vsdTlTJgZGaYsVd5YZpsqsYKVKYWoYyjiyScfsb0IhMczTwNpaI_oDI2snNT2qnwQzRLDwZphnSJ6zM5e"
                                                                      alt="Luxury Fabric"
                                                                      className="object-cover w-full h-full"
                                                            />
                                                  </div>
                                                  {/* Yahan bhi height h-[300px] md:h-[400px] kar di gayi hai */}
                                                  <div className="h-[250px] md:h-[400px] overflow-hidden shadow-xl mt-5 rounded-sm">
                                                            <img
                                                                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1VU7XjDWBzGWqnmOe19cukBDwY7BE0Aj8JMEZW1WckP9mB7sdiaKvcvIUx_02_lA8_2gURZs74n0PSFGl6PG5Ndwm2cmAfP9fZwN2GW4rnMoP0KefdIp7Osm6sZZ-8_NupmMDwycimYFP6OEzTzBiUwKGfGdDHApTU1CixwngK17jB8hunEgmyteHI7omnulD3rEs6dxWjAhuMDsRtFSlaXA67z3W5qkWAMcCsW_DUPc6XEmxmDatBRPOyz8xRbZrmHUdq4DrNttS"
                                                                      alt="Quiet Luxury Fashion"
                                                                      className="object-cover w-full h-full"
                                                            />
                                                  </div>
                                        </div>
                              </div>
                    </section>
          );
};