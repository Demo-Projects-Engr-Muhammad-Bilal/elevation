import { useState, useEffect } from 'react';
import { Loader2, ArrowRight, Tag, FileText } from 'lucide-react';

export default function CategoryForm({ initialData = null, onSubmit, isLoading }) {
          const isUpdate = !!initialData;

          const [formData, setFormData] = useState({
                    name: '',
                    description: ''
          });

          useEffect(() => {
                    if (initialData) {
                              setFormData({
                                        name: initialData.name || '',
                                        description: initialData.description || ''
                              });
                    } else {
                              setFormData({
                                        name: '',
                                        description: ''
                              });
                    }
          }, [initialData]);

          const handleChange = (e) => {
                    setFormData({ ...formData, [e.target.name]: e.target.value });
          };

          const handleSubmit = (e) => {
                    e.preventDefault();

                    const formattedData = {
                              ...formData,
                              name: formData.name.trim(),
                              description: formData.description.trim()
                    };

                    onSubmit(formattedData);
          };

          return (
                    <div className="w-full mx-auto">
                              <div className="mb-8 text-center">
                                        <h2 className="font-display text-xl md:text-2xl font-extrabold text-black tracking-wider uppercase">
                                                  {isUpdate ? 'Update Category' : 'Create New Category'}
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-2">
                                                  {isUpdate ? 'Modify the category details below.' : 'Add a new category to your store.'}
                                        </p>
                              </div>

                              <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Category Name - Disabled only during update */}
                                        <div className="space-y-2 group">
                                                  <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-black transition-colors">
                                                            Category Name
                                                            <span className='text-[9px] px-4 lowercase'>
                                                                      {isUpdate ? `You can't update` : ``}
                                                            </span>
                                                  </label>
                                                  <div className="relative">
                                                            <Tag className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
                                                            <input
                                                                      type="text"
                                                                      name="name"
                                                                      required
                                                                      value={formData.name}
                                                                      onChange={handleChange}
                                                                      disabled={isUpdate} // <-- Edit main disable, Create main enable
                                                                      placeholder="e.g. Summer Collection"
                                                                      className="w-full border-b border-gray-300 bg-transparent py-2 pl-7 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            />
                                                  </div>
                                        </div>

                                        {/* Category Description - Enabled */}
                                        <div className="space-y-2 group">
                                                  <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-black transition-colors">
                                                            Description
                                                  </label>
                                                  <div className="relative flex items-start">
                                                            <FileText className="absolute left-0 top-2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
                                                            <textarea
                                                                      name="description"
                                                                      rows={3}
                                                                      value={formData.description}
                                                                      onChange={handleChange}
                                                                      placeholder="Describe this category..."
                                                                      className="w-full border-b border-gray-300 bg-transparent py-1 pl-7 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:ring-0 resize-none"
                                                            />
                                                  </div>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                                  type="submit"
                                                  disabled={isLoading}
                                                  className={`mt-4 group relative flex w-full items-center justify-center overflow-hidden rounded-md py-4 text-[11px] font-medium uppercase tracking-[0.3em] transition-all duration-300 ${isLoading ? "cursor-not-allowed bg-gray-400 text-white/50" : "bg-black text-white hover:bg-gray-800 hover:shadow-lg active:scale-[0.98]"}`}
                                        >
                                                  <span className="flex items-center gap-2">
                                                            {isLoading ? (
                                                                      <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                                                            ) : (
                                                                      <>{isUpdate ? 'Save Changes' : 'Publish Category'} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></>
                                                            )}
                                                  </span>
                                        </button>
                              </form>
                    </div>
          );
}