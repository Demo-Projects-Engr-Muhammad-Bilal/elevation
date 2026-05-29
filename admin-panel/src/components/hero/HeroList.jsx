import { Plus, Image as ImageIcon } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader';
import TableActions from '../ui/TableActions';
import EmptyState from '../ui/EmptyState';

export default function HeroList({ slides = [], onDelete, onCreateClick, onEditClick }) {
  const isLimitReached = slides.length >= 6;

  return (
    <div className="bg-white p-7 md:p-10 w-full m-0">
      {/* Header & Controls - Fixed Responsive Layout for SectionHeader */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pb-6 border-b border-gray-100">
        <SectionHeader
          title="Hero Slides"
          subtitle="Manage your homepage banners"
          badge={slides.length > 0 ? `${slides.length}/6` : undefined}
        />

        <button
          onClick={onCreateClick}
          disabled={isLimitReached}
          className={`w-full md:w-auto justify-center flex items-center gap-2 px-5 py-2.5 rounded-md text-[11px] font-medium uppercase tracking-[0.2em] transition-all ${isLimitReached
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200 line-through'
              : 'bg-black text-white hover:bg-gray-800'
            }`}
          title={isLimitReached ? 'Maximum 6 slides allowed at one time.' : 'Add new hero banner'}
        >
          <Plus className="h-4 w-4" /> Add Slide
        </button>
      </div>

      {/* Content State Handling */}
      {slides.length === 0 ? (
        <EmptyState
          icon={<ImageIcon className="h-12 w-12 mb-3" strokeWidth={1} />}
          message="No hero slides found."
        />
      ) : (
        <>
          {/* ================= DESKTOP VIEW (100% UNTOUCHED ORIGINAL TABLE & DATA FETCHING) ================= */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="text-[10px] uppercase tracking-[0.2em] text-gray-400 border-b border-gray-200">
                <tr>
                  <th className="pb-4 font-medium">Banner</th>
                  <th className="pb-4 font-medium">Title</th>
                  <th className="pb-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {slides.map((slide) => (
                  <tr key={slide.id} className="hover:bg-[#Fef9f2]/50 transition-colors group">
                    <td className="py-4">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="h-16 w-24 object-cover rounded-md border border-gray-200"
                      />
                    </td>
                    <td className="py-4">
                      <div className="font-medium text-black">{slide.title}</div>
                      <div className="text-xs mt-1 bg-gray-100 inline-block px-2 py-1 rounded text-gray-500">
                        Btn: {slide.buttonText}
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <TableActions
                        onEdit={() => onEditClick(slide.id)}
                        onDelete={() => onDelete(slide.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE VIEW (FIXED RESPONSIVE CARD LAYOUT WITH CORRECT DATA KEYS) ================= */}
          <div className="md:hidden space-y-4">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="p-4 rounded-xl border border-gray-100 bg-white shadow-sm flex items-center gap-4 hover:bg-[#Fef9f2]/50 transition-colors"
              >
                {/* Banner Image Area */}
                <div className="flex-shrink-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-14 w-15 md:h-16 md:w-24 object-cover rounded-md border border-gray-200"
                  />
                </div>

                {/* Details & Actions Content */}
                <div className="flex-1 flex flex-col justify-between min-h-[64px]">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <h4 className="font-medium text-black text-sm leading-snug truncate">
                        {slide.title || 'Untitled'}
                      </h4>
                      <div className="text-[11px] mt-1.5 bg-gray-100 inline-block px-2 py-0.5 rounded text-gray-500 font-medium">
                        Btn:<br/> {slide.buttonText}
                      </div>
                    </div>

                    {/* Actions Menu */}
                    <div className="flex-shrink-0">
                      <TableActions
                        onEdit={() => onEditClick(slide.id)}
                        onDelete={() => onDelete(slide.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}