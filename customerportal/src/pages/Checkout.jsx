import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useCart } from '../hooks/useCart';
import { useAppData } from '../context/AppDataContext';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { toast } from 'sonner';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { invalidateOrdersCache } = useAppData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', postcode: '', address: '', city: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    setLoading(true);
    try {
      const orderData = {
        customer: formData,
        items: cartItems.map((item) => ({
          productId: item.id || 'N/A',
          name: item.name || 'Unnamed Item',
          price: item.price || 0,
          quantity: item.quantity || 1,
          size: item.size || 'Default',
          image: item.image || (item.images && item.images[0]) || '',
        })),
        totalAmount: cartTotal,
        status: 'processing',
        paymentMethod: 'COD',
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      localStorage.setItem('elevation_guest_email', formData.email);

      // Bust orders cache so Orders page re-fetches with the new order
      invalidateOrdersCache(formData.email);

      clearCart();
      toast.success(`Order placed successfully! ID: ${docRef.id}`);
      navigate('/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 mt-20">
      <div className="flex flex-col md:flex-row gap-gutter">
        <div className="flex-1">
          <nav className="mb-10">
            <ul className="flex items-center gap-2 uppercase font-label-caps text-label-caps text-outline">
              <li>
                <span
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => navigate('/products')}
                >
                  Cart
                </span>
              </li>
              <li><span className="text-xs material-symbols-outlined">chevron_right</span></li>
              <li className="pb-1 border-b text-primary border-primary">Checkout</li>
            </ul>
          </nav>
          <h1 className="mb-8 font-headline-lg text-headline-lg">Shipping Information</h1>
          <CheckoutForm
            formData={formData}
            handleChange={handleChange}
            handleCheckout={handleCheckout}
            loading={loading}
          />
        </div>
        <OrderSummary
          cartItems={cartItems}
          cartTotal={cartTotal}
          loading={loading}
          handleCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default Checkout;
