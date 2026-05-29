import { useState, useEffect } from 'react';
import {
  Loader2, ArrowRight, Package, Tag, DollarSign,
  Palette, Ruler, Image as ImageIcon, AlignLeft, Plus, Trash2
} from 'lucide-react';
import { useCategories } from '../../hooks/useCategories';

export default function ProductForm({ initialData = null, onSubmit, isLoading }) {
  const isUpdate = !!initialData;

  // Consume the shared cached categories — no independent Firestore fetch
  const { categories: categoryDocs } = useCategories();
  const categoryNames = categoryDocs.map((cat) => cat.name || cat.id);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    colors: '',
    sizes: '',
  });

  const [images, setImages] = useState(['']);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        price: initialData.price || '',
        category: initialData.category || '',
        description: initialData.description || '',
        colors: initialData.colors?.join(', ') || '',
        sizes: initialData.sizes?.join(', ') || '',
      });
      setImages(
        initialData.images && initialData.images.length > 0
          ? initialData.images
          : ['']
      );
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const updated = [...images];
    updated[index] = value;
    setImages(updated);
  };

  const addImageField = () => setImages([...images, '']);

  const removeImageField = (index) => {
    if (images.length === 1) {
      setImages(['']);
    } else {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  // 🛠️ Form se toast hata kar sirf parent onSubmit call kiya hai
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      price: Number(formData.price),
      colors: formData.colors.split(',').map((c) => c.trim()).filter(Boolean),
      sizes: formData.sizes.split(',').map((s) => s.trim()).filter(Boolean),
      images: images.map((i) => i.trim()).filter(Boolean),
    };

    onSubmit(formattedData);
  };

  return (
    <div className="w-full mx-auto">
      <div className="mb-8 text-center">
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-black tracking-wider uppercase">
          {isUpdate ? 'Update Product' : 'Create New Product'}
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          {isUpdate ? 'Modify the product details below.' : 'Add a new product to your collection.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2 group">
            <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-black transition-colors">
              Product Name
            </label>
            <div className="relative">
              <Package className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
              <input
                type="text" name="name" required value={formData.name} onChange={handleChange}
                placeholder="e.g. Linen Blend Top"
                className="w-full border-b border-gray-300 bg-transparent py-2 pl-7 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:ring-0"
              />
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2 group">
            <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-black transition-colors">
              Price ($)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
              <input
                type="number" name="price" required value={formData.price} onChange={handleChange}
                placeholder="e.g. 150"
                className="w-full border-b border-gray-300 bg-transparent py-2 pl-7 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:ring-0"
              />
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2 group">
          <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-black transition-colors">
            Category
          </label>
          <div className="relative">
            <Tag className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors pointer-events-none z-10" />
            <select
              name="category" required value={formData.category} onChange={handleChange}
              style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              className="w-full bg-transparent border-0 border-b border-gray-300 rounded-none py-2 pl-7 pr-8 text-[15px] text-black outline-none appearance-none transition-all duration-200 focus:border-black focus:ring-0 cursor-pointer"
            >
              <option value="" disabled className="bg-[#Fef9f2]">Select a Category</option>
              {categoryNames.map((cat, index) => (
                <option key={index} value={cat} className="text-black bg-[#Fef9f2] rounded-2xl">
                  {cat}
                </option>
              ))}
            </select>

            {/* Custom Arrow */}
            <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors duration-200" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-black transition-all duration-300 group-focus-within:w-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Colors */}
          <div className="space-y-2 group">
            <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-black transition-colors">
              Colors (Comma separated)
            </label>
            <div className="relative">
              <Palette className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
              <input
                type="text" name="colors" value={formData.colors} onChange={handleChange}
                placeholder="Black, White, Sand"
                className="w-full border-b border-gray-300 bg-transparent py-2 pl-7 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:ring-0"
              />
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2 group">
            <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-black transition-colors">
              Sizes (Comma separated)
            </label>
            <div className="relative">
              <Ruler className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
              <input
                type="text" name="sizes" value={formData.sizes} onChange={handleChange}
                placeholder="XS, S, M, L"
                className="w-full border-b border-gray-300 bg-transparent py-2 pl-7 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:ring-0"
              />
            </div>
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
              name="description" required rows="3" value={formData.description} onChange={handleChange}
              placeholder="Product description goes here..."
              className="w-full border-b border-gray-300 bg-transparent py-2 pl-7 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:ring-0 resize-none"
            />
          </div>
        </div>

        {/* Dynamic Image URLs */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <label className="flex flex-col space-y-3 text-[11px] font-medium uppercase tracking-[0.2em] text-gray-500">
              <span>Image URLs</span>
              <span className="text-[9px]">Please ensure url should be correct</span>
            </label>
            <button
              type="button" onClick={addImageField}
              className="flex items-center gap-1 text-[8px] md:text-[11px] uppercase tracking-tight font-semibold text-gray-500 hover:text-black transition-colors"
            >
              <Plus className="size-4 md:size-3" /> <span className='underline underline-offset-3'>Add Image URL</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
            {images.map((url, index) => (
              <div key={index} className="flex items-center gap-3 group/item">
                <div className="relative flex-1">
                  <ImageIcon className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input
                    type="url" required value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder={`https://example.com/image${index + 1}.jpg`}
                    className="w-full border-b border-gray-300 bg-transparent py-2 pl-7 outline-none transition-all placeholder:text-gray-300 focus:border-black focus:ring-0"
                  />
                </div>
                <button
                  type="button" onClick={() => removeImageField(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove URL"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Image Previews */}
        {images.filter((url) => url && url.trim() !== '').length > 0 && (
          <div className="space-y-2 mt-4 animate-fadeIn">
            <label className="block text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
              Live Image Previews
            </label>
            <div className="flex flex-wrap justify-center items-center gap-3 p-3 border border-dashed border-gray-200 rounded bg-gray-50/50 gap-x-5">
              {images.map((url, index) => {
                if (!url || url.trim() === '') return null;
                return (
                  <div key={index} className="relative w-16 h-16 rounded border border-gray-200 overflow-hidden group shadow-sm bg-white">
                    <img
                      src={url.trim()} alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => { e.target.src = 'https://placehold.co/150x150?text=Invalid+URL'; }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="text-white text-[10px] font-bold">#{index + 1}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit" disabled={isLoading}
          className={`mt-4 group relative flex w-full items-center justify-center overflow-hidden rounded-md py-4 text-[11px] font-medium uppercase tracking-[0.3em] transition-all duration-300 ${isLoading
            ? 'cursor-not-allowed bg-gray-400 text-white/50'
            : 'bg-black text-white hover:bg-gray-800 hover:shadow-lg active:scale-[0.98]'
            }`}
        >
          <span className="flex items-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {isUpdate ? 'Saving Changes...' : 'Publishing Product...'}
              </>
            ) : (
              <>
                {isUpdate ? 'Save Changes' : 'Publish Product'}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </span>
        </button>
      </form>
    </div>
  );
}