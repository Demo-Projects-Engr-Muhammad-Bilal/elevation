import { useCart } from '../../hooks/useCart';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-primary/20 backdrop-blur-[2px] z-[60] transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsCartOpen(false)}
      />

      <aside className={`fixed top-0 right-0 h-full w-full max-w-[480px] bg-surface z-[70] transition-transform duration-500 flex flex-col shadow-2xl ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <header className="flex items-center justify-between px-8 py-10">
          <h2 className="font-headline-md text-headline-md text-primary">Your Cart</h2>
          <Button variant="icon" onClick={() => setIsCartOpen(false)}>
            <span className="material-symbols-outlined text-[24px]">close</span>
          </Button>
        </header>

        <div className="flex-1 px-8 overflow-y-auto hide-scrollbar">
          {cartItems.length === 0 ? (
            <p className="mt-10 text-center text-on-surface-variant font-body-md">Your cart is empty.</p>
          ) : (
            <div className="space-y-8">
              {cartItems.map((item) => (
                <article key={`${item.id}-${item.size}`} className="flex items-start gap-6 pb-8 border-b border-outline-variant/30">
                  <div className="flex-shrink-0 w-32 h-32 bg-surface-container">
                    {/* UPDATED IMAGE TAG */}
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
                  <div className="flex flex-col justify-between flex-1 h-32">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium font-body-md">{item.name}</h3>
                        <span className="font-body-md">${item.price}</span>
                      </div>
                      <p className="mt-1 font-label-caps text-on-surface-variant">
                        SIZE: {item.size} {item.color && `/ ${item.color.toUpperCase()}`}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-sm border-outline-variant">
                        <button onClick={() => updateQuantity(item.id, item.size, -1)} className="px-3 py-1 hover:bg-surface-container">
                          <span className="material-symbols-outlined text-[14px]">remove</span>
                        </button>
                        <span className="px-2 font-label-caps">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, 1)} className="px-3 py-1 hover:bg-surface-container">
                          <span className="material-symbols-outlined text-[14px]">add</span>
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.size)} className="underline font-label-caps text-on-surface-variant hover:text-primary">
                        REMOVE
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <footer className="p-8 border-t bg-surface border-outline-variant/30">
          <div className="mb-8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-body-md text-on-surface-variant">Subtotal</span>
              <span className="font-body-md text-primary">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <Button variant="primary" className="w-full uppercase" onClick={handleCheckout} disabled={cartItems.length === 0}>
            Proceed to Checkout
          </Button>
        </footer>
      </aside>
    </>
  );
};