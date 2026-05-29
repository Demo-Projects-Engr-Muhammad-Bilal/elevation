import { useState } from 'react';
import { toast } from 'sonner';

export default function DeleteToast({ id, toastId, onConfirm, itemName = 'item' }) {
          const [loading, setLoading] = useState(false);

          const handleConfirm = async () => {
                    setLoading(true);
                    try {
                              await onConfirm(id);
                    } catch (error) {
                              toast.error(`Failed to delete ${itemName}.`, { id: toastId });
                    } finally {
                              setLoading(false);
                    }
          };

          return (
                    <div className="flex flex-col gap-4 w-full p-1 relative">
                              {/* --- CROSS (X) BUTTON --- */}
                              <button
                                        onClick={() => toast.dismiss(toastId)}
                                        disabled={loading}
                                        className="absolute top-0 right-0 p-1 text-zinc-400 hover:text-zinc-600 rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                        title="Close"
                              >
                                        <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2.5"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                        >
                                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                              </button>

                              {/* Content */}
                              <div className="pr-6">
                                        <h4 className="text-sm font-semibold text-zinc-900">
                                                  Are you sure you want to delete this {itemName}?
                                        </h4>
                                        <p className="text-xs text-zinc-500 mt-1">
                                                  This action is permanent and cannot be undone.
                                        </p>
                              </div>

                              {/* Button */}
                              <button
                                        onClick={handleConfirm}
                                        disabled={loading}
                                        className="w-full bg-black text-white text-xs font-medium py-2.5 px-4 rounded-md hover:bg-zinc-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                              >
                                        {loading ? 'Deleting...' : 'Confirm Delete'}
                              </button>
                    </div>
          );
}