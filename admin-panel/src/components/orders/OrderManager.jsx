import { useMemo, useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import PageLoader from '../ui/PageLoader';
import OrderList from './OrderList';
import OrderFilter from './OrderFilter';
import OrderHeader from './OrderHeader';

const FILTERS = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function OrderManager() {
  const { orders, loading, updateOrderStatus } = useOrders();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  if (loading) return <PageLoader />;

  const filteredOrders = (() => {
    let filtered = orders;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(
        (order) => order.status?.toLowerCase() === activeFilter
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((order) => {
        const name = order.customer?.fullName?.toLowerCase() || '';
        const email = order.customer?.email?.toLowerCase() || '';
        const status = order.status?.toLowerCase() || '';
        return name.includes(term) || email.includes(term) || status.includes(term);
      });
    }

    return filtered;
  })();

  const getCount = (status) => {
    if (status === 'all') return orders.length;
    return orders.filter((o) => o.status?.toLowerCase() === status).length;
  };

  return (
    <div className="bg-white">
      <div className="px-7 md:px-10 pt-7 md:pt-10">
        <OrderHeader
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div >
        <OrderFilter
          filters={FILTERS}
          activeFilter={activeFilter}
          onChange={(f) => setActiveFilter(f)}
          getCount={getCount}
        />
      </div>

      <OrderList orders={filteredOrders} onStatusUpdate={updateOrderStatus} />
    </div>
  );
}
