import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable pagination toolbar.
 * Extracted from the identical blocks in ProductList and OrderList.
 *
 * @param {number}   currentPage
 * @param {number}   totalPages
 * @param {number}   totalItems      - Total filtered item count (for "Showing X to Y of Z")
 * @param {number}   itemsPerPage
 * @param {function} onPageChange    - (page: number) => void
 * @param {string}   [itemLabel]     - e.g. "products" or "orders"
 */
export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  itemLabel = 'items',
}) {
  if (totalPages <= 1) return null;

  const indexOfFirst = (currentPage - 1) * itemsPerPage + 1;
  const indexOfLast = Math.min(currentPage * itemsPerPage, totalItems);

  // Show up to 6 page buttons, centred around the current page
  const maxVisible = 6;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }
  const visiblePages = [];
  for (let i = start; i <= end; i++) visiblePages.push(i);

  return (
    <div className="flex flex-col gap-y-5 md:gap-0 md:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-100 text-xs select-none">
      {/* Summary */}
      <div className="text-gray-400">
        Showing{' '}
        <span className="font-medium text-black">{indexOfFirst}</span> to{' '}
        <span className="font-medium text-black">{indexOfLast}</span> of{' '}
        <span className="font-medium text-black">{totalItems}</span> {itemLabel}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded border border-gray-200 hover:border-black disabled:opacity-30 disabled:hover:border-gray-200 transition-colors text-black"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1.5 rounded font-medium transition-all ${
              currentPage === page
                ? 'bg-black text-white'
                : 'border border-transparent text-gray-500 hover:border-gray-200 hover:text-black'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 rounded border border-gray-200 hover:border-black disabled:opacity-30 disabled:hover:border-gray-200 transition-colors text-black"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
