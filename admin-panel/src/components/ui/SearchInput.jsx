import { Search } from 'lucide-react';

/**
 * Minimalist search input with leading icon.
 * Replaces the repeated search input blocks in ProductList,
 * SubscribersList, and OrderHeader.
 *
 * @param {string}   value        - Controlled input value
 * @param {function} onChange     - onChange handler
 * @param {string}   [placeholder]
 * @param {string}   [className]  - Extra wrapper classes
 */
export default function SearchInput({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative flex-1 sm:w-72 ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-md text-xs placeholder:text-gray-400 text-black focus:outline-none focus:border-black focus:bg-white transition-all"
      />
    </div>
  );
}
