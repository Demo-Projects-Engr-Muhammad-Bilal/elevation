import SectionHeader from '../ui/SectionHeader';
import SearchInput from '../ui/SearchInput';

export default function OrderHeader({ searchTerm, onSearchChange }) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-gray-100">
      <SectionHeader title="Orders" subtitle="Manage customer orders" />
      <div className="relative w-full lg:w-72">
        <SearchInput
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search orders..."
          className="w-full lg:w-72 sm:w-full"
        />
      </div>
    </div>
  );
}
