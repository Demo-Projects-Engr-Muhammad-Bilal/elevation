import { useCart } from '../../hooks/useCart';
import { Button } from '../ui/Button';
import { DrawerShell } from '../ui/DrawerShell';
import { useNavigate } from 'react-router-dom';
import { Trash } from 'lucide-react';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, cartTotal, removeFromCart, updateQuantity } =
    useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <DrawerShell isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} side="right">
      <header className="flex items-center justify-between px-4 md:px-8 py-8 md:py-10">
        <h2 className="font-headline-md text-headline-md text-primary">Your Cart</h2>
        <Button variant="icon" onClick={() => setIsCartOpen(false)}>
          <span className="material-symbols-outlined text-[24px]">close</span>
        </Button>
      </header>

      <div className="flex-1 px-4 md:px-8 overflow-y-auto hide-scrollbar">
        {cartItems.length === 0 ? (
          <p className="mt-10 text-center text-on-surface-variant font-body-md">
            Your cart is empty.
          </p>
        ) : (
          <div className="space-y-6 md:space-y-8">
            {cartItems.map((item) => (
              <article
                key={`${item.id}-${item.size}`}
                className="flex items-start gap-4 md:gap-6 pb-6 md:pb-8 border-b border-outline-variant/30"
              >
                <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-surface-container">
                  <img
                    src={item.image || (item.images && item.images[0])}
                    alt={item.name}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://placehold.co/400x400/eeeeee/959494?text=No+Image';
                    }}
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 h-24 md:h-32 min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium font-body-md truncate">{item.name}</h3>
                      <span className="font-body-md whitespace-nowrap">${item.price}</span>
                    </div>
                    <p className="mt-1 font-label-caps text-on-surface-variant text-[10px] md:text-xs truncate">
                      SIZE: {item.size} {item.color && `/ ${item.color.toUpperCase()}`}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border rounded-sm border-outline-variant">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        className="px-3 py-1 hover:bg-surface-container"
                      >
                        <span className="material-symbols-outlined text-[14px]">remove</span>
                      </button>
                      <span className="px-2 font-label-caps">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        className="px-3 py-1 hover:bg-surface-container"
                      >
                        <span className="material-symbols-outlined text-[14px]">add</span>
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="p-2 text-on-surface-variant hover:text-red-600 transition-colors"
                      title="Remove Item"
                    >
                      <Trash size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <footer className="p-4 md:p-8 border-t bg-surface border-outline-variant/30">
        <div className="mb-6 md:mb-8 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-body-md text-on-surface-variant">Subtotal</span>
            <span className="font-body-md text-primary">${cartTotal.toFixed(2)}</span>
          </div>
        </div>
        <Button
          variant="primary"
          className="w-full uppercase"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </Button>
      </footer>
    </DrawerShell>
  );
};
