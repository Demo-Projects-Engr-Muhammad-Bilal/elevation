import { Edit3, Trash2 } from 'lucide-react';

/**
 * Inline edit + delete icon buttons for table rows.
 * Replaces the repeated action button pairs in ProductList and HeroList.
 *
 * @param {function} onEdit
 * @param {function} onDelete
 */
export default function TableActions({ onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-3">
      <button
        onClick={onEdit}
        className="p-2 text-gray-400 hover:text-black transition-colors"
      >
        <Edit3 className="h-4 w-4" />
      </button>
      <button
        onClick={onDelete}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
