import { useState } from 'react';
import { Mail, Download } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import SectionHeader from '../ui/SectionHeader';
import SearchInput from '../ui/SearchInput';
import ActionButton from '../ui/ActionButton';
import EmptyState from '../ui/EmptyState';
import Pagination from '../ui/Pagination';

export default function SubscribersList({ subscribers = [], onDownloadCSV }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const filteredSubscribers = subscribers.filter((s) =>
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentSubscribers = filteredSubscribers.slice(indexOfFirst, indexOfLast);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white p-7 md:p-10 w-full m-0">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-8 gap-4 pb-6 border-b border-gray-100">
        <SectionHeader
          title="Subscribers"
          subtitle="Manage newsletter subscribers"
        />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search subscribers..."
          />
          <ActionButton onClick={onDownloadCSV} icon={<Download className="h-4 w-4" />}>
            Download CSV
          </ActionButton>
        </div>
      </div>

      {/* Main Content Area */}
      {currentSubscribers.length === 0 ? (
        <EmptyState
          icon={<Mail className="h-12 w-12 mb-3" strokeWidth={1} />}
          message="No subscribers found."
        />
      ) : (
        <>
          {/* ================= DESKTOP VIEW (100% UNTOUCHED TRADITIONAL TABLE) ================= */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-[10px] uppercase tracking-[0.2em] text-gray-400 border-b border-gray-200">
                <tr>
                  <th className="pb-4 font-medium">Email</th>
                  <th className="pb-4 font-medium">Subscribed At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-[#Fef9f2]/50 transition-colors">
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold uppercase flex-shrink-0">
                          {subscriber.email?.charAt(0)}
                        </div>
                        <p className="font-medium text-black">{subscriber.email}</p>
                      </div>
                    </td>
                    <td className="py-5 text-gray-500 whitespace-nowrap">
                      {formatDate(subscriber.subscribedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE VIEW (CLEAN RESPONSIVE CARD LIST LAYOUT) ================= */}
          <div className="md:hidden space-y-3 mb-6">
            {currentSubscribers.map((subscriber) => (
              <div
                key={subscriber.id}
                className="p-3.5 rounded-xl border border-gray-100 bg-white shadow-sm flex items-center justify-between gap-3 hover:bg-[#Fef9f2]/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Dynamic Initial Avatar */}
                  <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold uppercase flex-shrink-0">
                    {subscriber.email?.charAt(0)}
                  </div>

                  {/* Subscriber Meta Info */}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-black text-sm truncate">{subscriber.email}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Subscribed: {formatDate(subscriber.subscribedAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredSubscribers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            itemLabel="subscribers"
          />
        </>
      )}
    </div>
  );
}