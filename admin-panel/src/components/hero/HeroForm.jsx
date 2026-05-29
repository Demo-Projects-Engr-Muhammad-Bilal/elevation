import { useState, useEffect } from 'react';
import { Loader2, ArrowRight, Type, AlignLeft, MousePointerClick, Image as ImageIcon } from 'lucide-react';

export default function HeroForm({ initialData = null, onSubmit, isLoading }) {
          const isUpdate = !!initialData;

          const [formData, setFormData] = useState({
                    title: '',
                    description: '',
                    buttonText: '',
                    image: ''
          });

          useEffect(() => {
                    if (initialData) {
                              setFormData({
                                        title: initialData.title || '',
                                        description: initialData.description || '',
                                        buttonText: initialData.buttonText || '',
                                        image: initialData.image || ''
                              });
                    } else {
                              // Form fields reset structure on modal dynamic fresh toggle
                              setFormData({ title: '', description: '', buttonText: '', image: '' });
                    }
          }, [initialData]);

          const handleChange = (e) => {
                    setFormData({ ...formData, [e.target.name]: e.target.value });
          };

          const handleSubmit = (e) => {
                    e.preventDefault();
                    onSubmit(formData);
          };

          return (
                    <div className="w-full  mx-auto">
                              <div className="mb-8 text-center">
                                        <h2 className="font-display text-xl md:text-2xl font-extrabold text-black tracking-wider uppercase">
                                                  {isUpdate ? 'Update Hero Slide' : 'Create Hero Slide'}
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-2">
                                                  {isUpdate ? 'Edit your homepage banner details.' : 'Add a new stunning banner to your homepage.'}
                                        </p>
                              </div>

                              <form onSubmit={handleSubmit} className="space-y-8">
                                        {/* Title */}
                                        <div className="space-y-2 group">
                                                  <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-black transition-colors">
                                                            Slide Title
                                                  </label>
                                                  <div className="relative">
                                                            <Type className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
                                                            <input
                                                                      type="text"
                                                                      name="title"
                                                                      required
                                                                      value={formData.title}
                                                                      onChange={handleChange}
                                                                      placeholder="e.g. Summer Essentials"
                                                                      className="w-full border-b border-gray-300 bg-transparent py-2 pl-7 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:ring-0"
                                                            />
                                                  </div>
                                        </div>

                                        {/* Description */}
                                        <div className="space-y-2 group items-start">
                                                  <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-black transition-colors">
                                                            Description
                                                  </label>
                                                  <div className="relative">
                                                            <AlignLeft className="absolute left-0 top-3 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
                                                            <textarea
                                                                      name="description"
                                                                      required
                                                                      rows="3"
                                                                      value={formData.description}
                                                                      onChange={handleChange}
                                                                      placeholder="Lightweight fabrics designed for..."
                                                                      className="w-full border-b border-gray-300 bg-transparent py-2 pl-7 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:ring-0 resize-none"
                                                            />
                                                  </div>
                                        </div>

                                        {/* Button Text */}
                                        <div className="space-y-2 group">
                                                  <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-black transition-colors">
                                                            Button Text
                                                  </label>
                                                  <div className="relative">
                                                            <MousePointerClick className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
                                                            <input
                                                                      type="text"
                                                                      name="buttonText"
                                                                      required
                                                                      value={formData.buttonText}
                                                                      onChange={handleChange}
                                                                      placeholder="e.g. EXPLORE SUMMER"
                                                                      className="w-full border-b border-gray-300 bg-transparent py-2 pl-7 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:ring-0"
                                                            />
                                                  </div>
                                        </div>

                                        {/* Image */}
                                        <div className="space-y-2 group">
                                                  <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-black transition-colors">
                                                            Banner Image URL
                                                  </label>
                                                  <div className="relative">
                                                            <ImageIcon className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
                                                            <input
                                                                      type="url"
                                                                      name="image"
                                                                      required
                                                                      value={formData.image}
                                                                      onChange={handleChange}
                                                                      placeholder="https://your-image-url.jpg"
                                                                      className="w-full border-b border-gray-300 bg-transparent py-2 pl-7 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:ring-0"
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
                                                                      <>{isUpdate ? 'Update Slide' : 'Publish Slide'} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></>
                                                            )}
                                                  </span>
                                        </button>
                              </form>
                    </div>
          );
}