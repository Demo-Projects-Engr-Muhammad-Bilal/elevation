import { useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import { fetchOrderById } from '../services/dataService';
import { OrderCard } from '../components/orders/OrderCard';
import { EmptyState } from '../components/ui/EmptyState';

const guestEmail = localStorage.getItem('elevation_guest_email') || '';

const Orders = () => {
  const { orders, loading } = useOrders(guestEmail);

  const [trackInput, setTrackInput] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [trackError, setTrackError] = useState('');

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!trackInput.trim()) return;
    setTrackError('');
    setTrackedOrder(null);
    try {
      const order = await fetchOrderById(trackInput.trim());
      if (order) {
        setTrackedOrder(order);
      } else {
        setTrackError('Order not found. Please check your Order ID.');
      }
    } catch {
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
        <h1 className="tracking-tight font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
          Orders & Tracking
        </h1>
        <p className="max-w-xl mt-2 font-body-md text-on-surface-variant">
          Track a specific order by ID or review your recent acquisitions.
        </p>
      </header>

      {/* Track by ID */}
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
          <button
            type="submit"
            className="px-8 py-3 tracking-widest uppercase transition-colors bg-primary text-on-primary font-label-caps hover:bg-secondary"
          >
            Track
          </button>
        </form>
        {trackError && <p className="mt-4 text-error font-body-md">{trackError}</p>}
      </section>

      {/* Track result */}
      {trackedOrder && (
        <div className="mb-16">
          <h2 className="pb-2 mb-6 tracking-widest uppercase border-b font-label-caps text-primary border-outline-variant">
            Tracking Result
          </h2>
          <OrderCard order={trackedOrder} />
        </div>
      )}

      {/* Order history */}
      <section>
        <h2 className="pb-2 mb-6 tracking-widest uppercase border-b font-label-caps text-primary border-outline-variant">
          Your Recent Orders {guestEmail && `(${guestEmail})`}
        </h2>
        <div className="space-y-6">
          {loading ? (
            <p className="font-body-md text-on-surface-variant">Loading your history...</p>
          ) : orders.length === 0 ? (
            <EmptyState
              icon="receipt_long"
              message="No past orders found for this device."
            />
          ) : (
            orders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </div>
      </section>
    </main>
  );
};

export default Orders;
