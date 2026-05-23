import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { OrderCard } from '../components/orders/OrderCard';

const Orders = () => {
          const [orders, setOrders] = useState([]);
          const [loading, setLoading] = useState(true);
          const [guestEmail, setGuestEmail] = useState('');
          const [trackInput, setTrackInput] = useState('');
          const [trackedOrder, setTrackedOrder] = useState(null);
          const [trackError, setTrackError] = useState('');

          useEffect(() => {
                    const fetchOrders = async () => {
                              try {
                                        const email = localStorage.getItem('elevation_guest_email');
                                        if (!email) {
                                                  setOrders([]);
                                                  setLoading(false);
                                                  return;
                                        }

                                        setGuestEmail(email);
                                        const q = query(collection(db, "orders"), where("customer.email", "==", email));
                                        const querySnapshot = await getDocs(q);
                                        const fetchedOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                                        fetchedOrders.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
                                        setOrders(fetchedOrders);
                              } catch (error) {
                                        console.error("Error fetching orders:", error);
                              } finally {
                                        setLoading(false);
                              }
                    };
                    fetchOrders();
          }, []);

          const handleTrackOrder = async (e) => {
                    e.preventDefault();
                    if (!trackInput.trim()) return;

                    setTrackError('');
                    setTrackedOrder(null);

                    try {
                              const docRef = doc(db, "orders", trackInput.trim());
                              const docSnap = await getDoc(docRef);

                              if (docSnap.exists()) {
                                        setTrackedOrder({ id: docSnap.id, ...docSnap.data() });
                              } else {
                                        setTrackError('Order not found. Please check your Order ID.');
                              }
                    } catch (error) {
                              console.error("Error tracking order:", error);
                              setTrackError('An error occurred while tracking. Please try again.');
                    }
          };

          return (
                    <main className="mt-[100px] md:mt-[140px] px-margin-mobile md:px-margin-desktop max-w-[1280px] mx-auto pb-section-gap min-h-screen">
                              <header className="mb-16">
                                        <nav className="flex gap-4 mb-8 opacity-60 text-on-surface-variant">
                                                  <span className="font-label-caps text-[10px]">ACCOUNT</span>
                                                  <span className="text-[10px]">/</span>
                                                  <span className="font-label-caps text-[10px] text-primary opacity-100">ORDER HISTORY</span>
                                        </nav>
                                        <h1 className="tracking-tight font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Orders & Tracking</h1>
                                        <p className="max-w-xl mt-2 font-body-md text-on-surface-variant">
                                                  Track a specific order by ID or review your recent acquisitions.
                                        </p>
                              </header>

                              <section className="p-8 mb-16 border bg-surface-container-low border-outline-variant/30">
                                        <h2 className="font-headline-md text-[24px] text-primary mb-4">Track Order</h2>
                                        <form onSubmit={handleTrackOrder} className="flex flex-col max-w-xl gap-4 sm:flex-row">
                                                  <input
                                                            type="text"
                                                            placeholder="Enter Order ID"
                                                            className="flex-1 px-0 py-3 bg-transparent border-b outline-none border-outline-variant font-body-md focus:border-primary focus:ring-0 transition-colors placeholder:text-on-surface-variant/40"
                                                            value={trackInput}
                                                            onChange={(e) => setTrackInput(e.target.value)}
                                                  />
                                                  <button type="submit" className="px-8 py-3 tracking-widest uppercase transition-colors bg-primary text-on-primary font-label-caps hover:bg-secondary">
                                                            Track
                                                  </button>
                                        </form>
                                        {trackError && <p className="mt-4 text-error font-body-md">{trackError}</p>}
                              </section>

                              {trackedOrder && (
                                        <div className="mb-16">
                                                  <h2 className="pb-2 mb-6 tracking-widest uppercase border-b font-label-caps text-primary border-outline-variant">Tracking Result</h2>
                                                  <OrderCard order={trackedOrder} />
                                        </div>
                              )}

                              <section>
                                        <h2 className="pb-2 mb-6 tracking-widest uppercase border-b font-label-caps text-primary border-outline-variant">
                                                  Your Recent Orders {guestEmail && `(${guestEmail})`}
                                        </h2>
                                        <div className="space-y-6">
                                                  {loading ? (
                                                            <p className="font-body-md text-on-surface-variant">Loading your history...</p>
                                                  ) : orders.length === 0 ? (
                                                            <div className="py-12 text-center border border-outline-variant bg-surface-container-lowest">
                                                                      <p className="font-body-md text-on-surface-variant">No past orders found for this device.</p>
                                                            </div>
                                                  ) : (
                                                            orders.map((order) => <OrderCard key={order.id} order={order} />)
                                                  )}
                                        </div>
                              </section>
                    </main>
          );
};

export default Orders;