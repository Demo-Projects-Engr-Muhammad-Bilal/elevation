import { useState } from 'react';

export const OrderCard = ({ order }) => {
          const [isExpanded, setIsExpanded] = useState(false);

          return (
                    <article className="flex flex-col transition-all duration-300 border bg-surface-container-lowest border-outline-variant hover:border-outline hover:shadow-lg">
                              <div className="flex flex-col justify-between gap-8 p-6 md:p-8 md:flex-row md:items-center">
                                        <div className="flex-1 space-y-4">
                                                  <div className="flex flex-wrap items-center gap-2 gap-x-4">
                                                            <h3 className="tracking-widest uppercase font-label-caps text-primary">
                                                                      Order #{order.id}
                                                            </h3>
                                                            <div className="px-3 py-1 border border-outline-variant rounded-full bg-surface-container-low text-on-surface-variant">
                                                                      <span className="font-label-caps text-[10px] uppercase">{order.status || 'Processing'}</span>
                                                            </div>
                                                  </div>

                                                  <div className="flex gap-2">
                                                            {order.items?.slice(0, 3).map((item, idx) => (
                                                                      <div key={idx} className="w-16 h-20 overflow-hidden border border-white shadow-sm bg-surface-container">
                                                                                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                                                      </div>
                                                            ))}
                                                            {order.items?.length > 3 && (
                                                                      <div className="flex items-center justify-center w-16 h-20 border border-white shadow-sm bg-surface-container-low">
                                                                                <span className="font-label-caps text-[10px] text-on-surface-variant">+{order.items.length - 3}</span>
                                                                      </div>
                                                            )}
                                                  </div>
                                        </div>

                                        <div className="flex flex-col gap-4 pt-6 border-t md:items-end md:border-t-0 md:border-l border-outline-variant md:pt-0 md:pl-12">
                                                  <div className="text-left md:text-right">
                                                            <p className="font-label-caps text-[10px] text-on-surface-variant uppercase mb-1">Total Amount</p>
                                                            <p className="font-headline-md text-primary">${order.totalAmount?.toFixed(2)}</p>
                                                  </div>
                                                  <button
                                                            onClick={() => setIsExpanded(!isExpanded)}
                                                            className="px-6 py-2 border border-outline font-label-caps text-[10px] uppercase tracking-widest text-primary hover:bg-surface-container transition-all"
                                                  >
                                                            {isExpanded ? 'Hide Details' : 'Item Details'}
                                                  </button>
                                        </div>
                              </div>

                              {isExpanded && (
                                        <div className="p-6 border-t border-outline-variant/30 md:p-8 bg-surface/50">
                                                  <h4 className="tracking-widest uppercase font-label-caps text-primary mb-6">Items in this Order</h4>
                                                  <div className="space-y-6">
                                                            {order.items?.map((item, idx) => (
                                                                      <div key={idx} className="flex items-start gap-6 pb-6 border-b border-outline-variant/20 last:border-0 last:pb-0">
                                                                                <div className="flex-shrink-0 w-20 h-24 bg-surface-container">
                                                                                          <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                                                                </div>
                                                                                <div className="flex flex-col justify-between flex-1">
                                                                                          <p className="font-headline-md text-[20px] text-primary">{item.name}</p>
                                                                                          <div className="mt-2 space-y-1 font-label-caps text-[11px] text-on-surface-variant uppercase">
                                                                                                    <p>Price: ${item.price?.toFixed(2)}</p>
                                                                                                    <p>Quantity: {item.quantity}</p>
                                                                                                    <p>Size: {item.size}</p>
                                                                                          </div>
                                                                                </div>
                                                                                <div className="hidden text-right sm:block">
                                                                                          <p className="font-body-md text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                                                                                </div>
                                                                      </div>
                                                            ))}
                                                  </div>
                                        </div>
                              )}
                    </article>
          );
};