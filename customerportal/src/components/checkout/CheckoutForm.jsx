import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const CheckoutForm = ({ formData, handleChange, handleCheckout, loading }) => {
          return (
                    <form onSubmit={handleCheckout} className="space-y-8">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                                        <Input label="Full Name" name="fullName" placeholder="e.g. Elena Vostkova" required onChange={handleChange} value={formData.fullName} />
                                        <Input label="Email Address" name="email" type="email" placeholder="elena@example.com" required onChange={handleChange} value={formData.email} />
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                                        <Input label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 000-0000" required onChange={handleChange} value={formData.phone} />
                                        <Input label="Postcode" name="postcode" placeholder="10001" required onChange={handleChange} value={formData.postcode} />
                              </div>
                              <Input label="Street Address" name="address" placeholder="123 Serenity Avenue" required onChange={handleChange} value={formData.address} />
                              <Input label="City" name="city" placeholder="New York" required onChange={handleChange} value={formData.city} />

                              <div className="pt-8">
                                        <div className="flex items-center gap-4 p-6 border rounded-lg bg-tertiary-fixed border-outline-variant/30">
                                                  <span className="text-2xl material-symbols-outlined text-primary">payments</span>
                                                  <div>
                                                            <p className="mb-1 uppercase font-label-caps text-label-caps text-primary">Payment Method</p>
                                                            <p className="font-body-md text-on-surface">Cash on Delivery</p>
                                                  </div>
                                        </div>
                              </div>

                              <Button type="submit" className="w-full mt-4 uppercase md:hidden" disabled={loading}>
                                        {loading ? "Processing..." : "Complete Order (COD)"}
                              </Button>
                    </form>
          );
};