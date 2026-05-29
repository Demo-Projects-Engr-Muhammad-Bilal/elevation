// Filter.jsx
import React from 'react';
import {
          Layers,
          Clock,
          RefreshCw,
          Truck,
          CheckCircle2,
          XCircle
} from 'lucide-react';

const DEFAULT_FILTERS = [
          'all',
          'pending',
          'processing',
          'shipped',
          'delivered',
          'cancelled',
];

// Nature-based colors aur icons ki configuration map
const FILTER_CONFIG = {
          all: {
                    icon: Layers,
                    active: 'bg-gray-900 text-white ring-1 ring-gray-950/10',
                    inactive: 'bg-gray-100 text-gray-600 hover:bg-gray-200/80',
                    badgeActive: 'bg-white/20 text-white',
                    badgeInactive: 'bg-gray-200 text-gray-700',
          },
          pending: {
                    icon: Clock,
                    active: 'bg-amber-500 text-white ring-1 ring-amber-600/10',
                    inactive: 'bg-amber-50 text-amber-700 hover:bg-amber-100/80',
                    badgeActive: 'bg-white/20 text-white',
                    badgeInactive: 'bg-amber-200/70 text-amber-800',
          },
          processing: {
                    icon: RefreshCw,
                    active: 'bg-blue-600 text-white ring-1 ring-blue-700/10',
                    inactive: 'bg-blue-50 text-blue-700 hover:bg-blue-100/80',
                    badgeActive: 'bg-white/20 text-white',
                    badgeInactive: 'bg-blue-200/70 text-blue-800',
          },
          shipped: {
                    icon: Truck,
                    active: 'bg-purple-600 text-white ring-1 ring-purple-700/10',
                    inactive: 'bg-purple-50 text-purple-700 hover:bg-purple-100/80',
                    badgeActive: 'bg-white/20 text-white',
                    badgeInactive: 'bg-purple-200/70 text-purple-800',
          },
          delivered: {
                    icon: CheckCircle2,
                    active: 'bg-green-600 text-white ring-1 ring-green-700/10',
                    inactive: 'bg-green-50 text-green-700 hover:bg-green-100/80',
                    badgeActive: 'bg-white/20 text-white',
                    badgeInactive: 'bg-green-200/70 text-green-800',
          },
          cancelled: {
                    icon: XCircle,
                    active: 'bg-red-600 text-white ring-1 ring-red-700/10',
                    inactive: 'bg-red-50 text-red-700 hover:bg-red-100/80',
                    badgeActive: 'bg-white/20 text-white',
                    badgeInactive: 'bg-red-200/70 text-red-800',
          },
};

export default function Filter({
          filters = DEFAULT_FILTERS,
          activeFilter,
          onChange, // (filter) => void
          getCount = () => 0, // (status) => number
          className = '',
}) {
          return (
                    <div className={`py-6 px-3 md:py-6 md:px-3 mx-4 md:mx-7 border-b border-gray-100 overflow-x-auto scrollbar-none ${className}`}>
                              <div className="flex items-center gap-2 md:gap-3 min-w-max">
                                        {filters.map((filter) => {
                                                  const isActive = activeFilter === filter;
                                                  const config = FILTER_CONFIG[filter] || FILTER_CONFIG.all;
                                                  const IconComponent = config.icon;

                                                  return (
                                                            <button
                                                                      key={filter}
                                                                      onClick={() => onChange?.(filter)}
                                                                      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-[0.1em] md:tracking-[0.15em] transition-all whitespace-nowrap ${isActive ? config.active : config.inactive
                                                                                }`}
                                                            >
                                                                      {/* Icon: Sirf Desktop View me dikhega, mobile par hidden */}
                                                                      {IconComponent && (
                                                                                <IconComponent className="hidden md:inline-block h-3.5 w-3.5 flex-shrink-0" />
                                                                      )}

                                                                      <span>{filter}</span>

                                                                      {/* Dynamic Badge Count Color */}
                                                                      <span
                                                                                className={`ml-1 md:ml-1.5 text-[9px] md:text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${isActive ? config.badgeActive : config.badgeInactive
                                                                                          }`}
                                                                      >
                                                                                {getCount(filter)}
                                                                      </span>
                                                            </button>
                                                  );
                                        })}
                              </div>
                    </div>
          );
}