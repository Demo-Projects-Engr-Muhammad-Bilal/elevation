import { Button } from '../ui/Button';

export const OrderSummary = ({ cartItems, cartTotal, loading, handleCheckout }) => {
  return (
    <aside className="w-full md:w-[420px]">
      <div className="sticky p-8 border top-32 bg-surface-container-lowest border-secondary-container md:p-10">
        <h2 className="mb-8 font-headline-md text-headline-md">Order Summary</h2>
        <div className="space-y-8 mb-10 max-h-[400px] overflow-y-auto hide-scrollbar">
          {cartItems.map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-20 overflow-hidden h-24 bg-surface-container">
                {/* FIX: Handled missing images exactly like CartDrawer */}
                <img 
                  src={item.image || (item.images && item.images[0])} 
                  alt={item.name} 
                  className="object-cover w-full h-full" 
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = "https://placehold.co/400x400/eeeeee/959494?text=No+Image"; 
                  }}
                />
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <p className="mb-1 leading-tight font-headline-md text-body-lg">{item.name}</p>
                  <p className="font-label-caps text-[10px] text-outline uppercase">Qty: {item.quantity} | Size: {item.size}</p>
                </div>
                <p className="font-body-md">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 space-y-4 border-t border-outline-variant">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="uppercase font-label-caps">Subtotal</span>
            <span className="font-body-md">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="uppercase font-label-caps">Shipping</span>
            <span className="italic font-body-md">Complimentary</span>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-outline-variant text-primary">
            <span className="font-bold tracking-widest uppercase font-label-caps text-body-lg">Total</span>
            <span className="font-headline-md text-headline-md">${cartTotal.toFixed(2)}</span>
          </div>
        </div>

        <Button onClick={handleCheckout} className="hidden w-full mt-10 uppercase md:flex" disabled={loading}>
          {loading ? "Processing..." : "Complete Order (COD)"}
        </Button>

        <div className="mt-6 text-center">
          <p className="font-label-caps text-[10px] text-outline uppercase leading-relaxed">
            Secured Checkout · Duties included<br />No payment required until delivery
          </p>
        </div>
      </div>
    </aside>
  );
};