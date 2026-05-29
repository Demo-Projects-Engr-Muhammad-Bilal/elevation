import { Plus, FolderOpen, Edit3 } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import ActionButton from '../ui/ActionButton';
import EmptyState from '../ui/EmptyState';

export default function CategoryList({ categories = [], onAdd, onEdit }) {
  return (
    <div className="bg-white p-7 md:p-10 w-full m-0">
      {/* Header & Controls - Fixed Responsive Layout for SectionHeader */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pb-6 border-b border-gray-100">
        <SectionHeader
          title="Categories"
          subtitle="Manage your product categories"
          badge={categories.length > 0 ? categories.length : undefined}
        />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <ActionButton onClick={onAdd} icon={<Plus className="h-4 w-4" />}>
            Add Category
          </ActionButton>
        </div>
      </div>

      {/* Empty State */}
      {categories.length === 0 ? (
        <EmptyState
          icon={<FolderOpen className="h-12 w-12 mb-3" strokeWidth={1} />}
          message="No categories found."
        />
      ) : (
        <>
          {/* ================= DESKTOP VIEW (100% UNTOUCHED TRADITIONAL TABLE) ================= */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-[10px] uppercase tracking-[0.2em] text-gray-400 border-b border-gray-200">
                <tr>
                  <th className="pb-4 font-medium w-1/4">Name</th>
                  <th className="pb-4 font-medium w-full">Description</th>
                  <th className="pb-4 font-medium text-right pr-4 w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-[#Fef9f2]/50 transition-colors group">
                    <td className="py-4 align-middle pr-4">
                      <div className="font-medium text-black capitalize">{category.name}</div>
                    </td>
                    <td className="py-4 align-middle pr-4">
                      <div className="text-sm text-gray-500 leading-relaxed break-words">
                        {category.description || 'No description added'}
                      </div>
                    </td>
                    <td className="py-4 text-right pr-4 align-middle whitespace-nowrap">
                      <button
                        onClick={() => onEdit(category)}
                        className="px-2 text-gray-400 hover:text-black transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE VIEW (FIXED CLEAN RESPONSIVE CARD LAYOUT) ================= */}
          <div className="md:hidden space-y-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm flex flex-col gap-3 hover:bg-[#Fef9f2]/50 transition-colors"
              >
                {/* Top Row: Category Name & Edit Button */}
                <div className="flex justify-between items-start gap-4">
                  <div className="font-semibold text-black capitalize text-sm">
                    {category.name}
                  </div>

                  <button
                    onClick={() => onEdit(category)}
                    className="px-2 text-gray-400 hover:text-black transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>

                </div>

                {/* Bottom Row: Description */}
                <div className="text-xs text-gray-500 leading-relaxed break-words">
                  {category.description || (
                    <span className="text-gray-400 italic">No description added</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}