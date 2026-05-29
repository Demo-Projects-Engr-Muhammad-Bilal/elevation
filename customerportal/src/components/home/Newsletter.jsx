import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

export const Newsletter = () => {
          const [email, setEmail] = useState('');
          const [status, setStatus] = useState('');

          const handleSubscribe = async (e) => {
                    e.preventDefault();
                    if (!email) return;

                    try {
                              await addDoc(collection(db, "subscribers"), {
                                        email,
                                        subscribedAt: new Date(),
                              });
                              setStatus('Thank you for joining.');
                              setEmail('');
                    } catch (error) {
                              setStatus('Error, please try again.');
                    }
          };

          return (
                    <section className="px-6 pt-3 pb-12 md:py-24 text-center">
                              <div className="max-w-xl mx-auto">
                                        {/* Font size ko 40px say change kar k responsive text-2xl md:text-3xl kar diya aur tracking-wider add kiya */}
                                        <h2 className="font-display-lg text-2xl md:text-3xl text-[#181919] italic tracking-wider mb-6">
                                                  Join the Circle
                                        </h2>
                                        {/* Paragraph ko text-sm md:text-base de diya taake hierarchy theek lagay */}
                                        <p className="font-body-md text-[#181919]/70 text-sm md:text-base mb-10 leading-relaxed">
                                                  Receive exclusive early access to our seasonal collections and invitations to private styling events.
                                        </p>
                                        <form onSubmit={handleSubscribe} className="flex flex-col gap-4 sm:flex-row">
                                                  <input
                                                            type="email"
                                                            placeholder="YOUR EMAIL ADDRESS"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            // text-[12px] ki jagah Tailwind ka default text-xs use kiya hai
                                                            className="flex-1 bg-transparent border border-[#181919] p-4 font-label-caps text-xs tracking-[0.1em] placeholder:text-[#181919]/40 focus:outline-none"
                                                            required
                                                  />
                                                  <button type="submit" className="bg-[#181919] text-white px-10 py-4 font-label-caps text-xs tracking-[0.2em] uppercase hover:bg-black transition-all">
                                                            SUBSCRIBE
                                                  </button>
                                        </form>
                                        {/* Status message ko bhi responsive kar diya */}
                                        {status && <p className="mt-4 font-label-caps text-[10px] md:text-xs text-[#181919]">{status}</p>}
                              </div>
                    </section>
          );
};