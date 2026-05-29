import { useEffect, useState } from 'react';
import { PackageSearch } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import EmptyState from '../ui/EmptyState';
import Pagination from '../ui/Pagination';

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  processing: 'bg-blue-100 text-blue-700 border-blue-200',
  shipped: 'bg-purple-100 text-purple-700 border-purple-200',
  delivered: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

export default function OrderList({ orders = [], onStatusUpdate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset page when filtered orders change
  useEffect(() => {
    setCurrentPage(1);
  }, [orders]);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirst, indexOfLast);

  return (
    <div className="bg-white p-4 sm:p-7 md:p-10 w-full">
      {currentOrders.length === 0 ? (
        <EmptyState
          icon={<PackageSearch className="h-12 w-12 mb-3" strokeWidth={1} />}
          message="No orders matched your criteria."
        />
      ) : (
        <>
          {/* ================= DESKTOP VIEW (100% UNTOUCHED TRADITIONAL TABLE) ================= */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 table-fixed min-w-[800px]">
              <thead className="text-[10px] uppercase tracking-[0.2em] text-gray-400 border-b border-gray-200 py-10">
                <tr>
                  <th className="pb-8 pr-6 font-medium w-[25%]">Customer</th>
                  <th className="pb-8 pr-6 font-medium w-[30%]">Items</th>
                  <th className="pb-8 pr-6 font-medium w-[10%]">Total</th>
                  <th className="pb-8 pr-6 font-medium w-[12%]">Payment</th>
                  <th className="pb-8 pr-6 font-medium w-[13%]">Created</th>
                  <th className="pb-8 pr-6 font-medium w-[10%]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#Fef9f2]/50 transition-colors">
                    {/* Customer */}
                    <td className="py-5 pr-6">
                      <div className="flex items-start gap-3">
                        <div className="h-11 w-11 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold uppercase flex-shrink-0">
                          {order.customer?.fullName?.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-black truncate">{order.customer?.fullName}</p>
                          <p className="text-xs text-gray-500 mt-1 truncate">{order.customer?.email}</p>
                          <p className="text-xs text-gray-400 mt-1 truncate">{order.customer?.city}</p>
                        </div>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-5 pr-6">
                      <div className="space-y-3">
                        {order.items?.map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-14 h-14 rounded-md object-cover border border-gray-200 flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-medium text-black text-sm truncate">{item.name}</p>
                              <p className="text-xs text-gray-500 mt-1 truncate">
                                Qty: {item.quantity} • Size: {item.size}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Total */}
                    <td className="py-5 pr-6 font-semibold text-black">${order.totalAmount}</td>

                    {/* Payment */}
                    <td className="py-5 pr-6">
                      <span className="px-3 py-1 rounded-md border border-gray-200 text-xs uppercase tracking-wide text-black bg-gray-50 inline-block truncate max-w-full">
                        {order.paymentMethod}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-5 pr-6 text-gray-500 whitespace-nowrap">
                      {formatDate(order.createdAt)}
                    </td>

                    {/* Status */}
                    <td className="py-5 pr-6">
                      <select
                        value={order.status}
                        onChange={(e) => onStatusUpdate(order.id, e.target.value)}
                        className={`w-full px-3 py-2 rounded-md border text-xs font-medium outline-none transition-all bg-white ${STATUS_STYLES[order.status]}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE VIEW (FIXED CLEAN RESPONSIVE CARD LAYOUT) ================= */}
          <div className="md:hidden space-y-4 mb-6">
            {currentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm space-y-4 hover:bg-[#Fef9f2]/30 transition-colors"
              >
                {/* Top Row: Customer Info + Status Dropdown */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-gray-50">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold uppercase flex-shrink-0">
                      {order.customer?.fullName?.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-black text-sm truncate">{order.customer?.fullName}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="w-28 flex-shrink-0">
                    <select
                      value={order.status}
                      onChange={(e) => onStatusUpdate(order.id, e.target.value)}
                      className={`w-full px-2 py-1.5 rounded-md border text-[11px] font-medium outline-none transition-all bg-white ${STATUS_STYLES[order.status]}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Middle Row: Product Ordered Items */}
                <div className="space-y-2.5">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 bg-gray-50/60 p-2 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-md object-cover border border-gray-200 flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-black text-xs truncate">{item.name}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Qty: {item.quantity} • Size: {item.size}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Row: Metadata info (Email/City) + Payment & Grand Total */}
                <div className="flex items-end justify-between pt-2 text-xs">
                  <div className="min-w-0 text-[11px] text-gray-400 space-y-0.5">
                    <p className="truncate max-w-[160px]">{order.customer?.email}</p>
                    <p className="truncate">{order.customer?.city}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="px-2 py-0.5 rounded border border-gray-200 text-[10px] uppercase tracking-wide text-black bg-gray-50">
                      {order.paymentMethod}
                    </span>
                    <span className="font-bold text-black text-base">
                      ${order.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={orders.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            itemLabel="orders"
          />
        </>
      )}
    </div>
  );
}