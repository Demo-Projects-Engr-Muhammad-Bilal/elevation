import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { fetchProductById, fetchRelatedProducts } from '../services/dataService';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductGallery } from '../components/product-detail/ProductGallery';
import { ProductInfo } from '../components/product-detail/ProductInfo';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, setIsCartOpen } = useCart();
  const { products } = useProducts();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeAccordion, setActiveAccordion] = useState('Size & Fit');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const loadProduct = async () => {
      // 1. Try cache first — instant, no DB call
      const cached = products.find((p) => p.id === id);
      const productData = cached ?? (await fetchProductById(id));

      if (!productData) return;

      setProduct(productData);
      setSelectedSize(productData.sizes?.[0] || '');

      // 2. Related products: filter from cache, fall back to DB only if cache empty
      if (productData.category) {
        const fromCache = products
          .filter((p) => p.category === productData.category && p.id !== id)
          .slice(0, 4);

        if (fromCache.length > 0) {
          setRelatedProducts(fromCache);
        } else {
          const fromDB = await fetchRelatedProducts(productData.category, id);
          setRelatedProducts(fromDB);
        }
      }
    };

    loadProduct();
  }, [id, products]);

  const handleAddToCart = () => {
    if (!selectedSize && product?.sizes?.length > 0) {
      toast.error('Please select a size before adding to bag.');
      return;
    }
    addToCart(product, 1, selectedSize, product.colors?.[0] || 'Default');
    setIsCartOpen(true);
    toast.success('Added to bag!');
  };

  const images =
    product?.images?.length > 0
      ? product.images
      : product?.image
      ? [product.image]
      : [];

  if (!product) {
    return (
      <main className="pt-[12px] pb-section-gap min-h-screen">
        <div className="px-margin-mobile md:px-margin-desktop py-8">
          <div className="w-48 h-4 rounded-sm animate-pulse bg-surface-container-high" />
        </div>
        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-7 lg:col-span-8">
            <div className="w-full mb-4 shadow-sm rounded-lg animate-pulse bg-surface-container-high aspect-[4/5]" />
          </div>
          <div className="sticky h-fit md:col-span-5 lg:col-span-4 top-[120px]">
            <div className="w-3/4 h-10 mb-4 animate-pulse bg-surface-container-high" />
            <div className="w-24 h-6 mb-10 animate-pulse bg-surface-container-high" />
            <div className="w-full h-16 rounded-sm animate-pulse bg-surface-container-high" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-[50px] min-h-screen">
      <div className="px-margin-mobile md:px-[90px] py-8">
        <nav className="flex items-center gap-2 uppercase font-label-caps text-label-caps text-on-surface-variant">
          <Link to="/" className="transition-colors hover:text-primary">Home</Link>
          <span className="text-[10px]">/</span>
          <Link
            to={`/products?search=${product.category}`}
            className="transition-colors hover:text-primary"
          >
            {product.category}
          </Link>
          <span className="text-[10px]">/</span>
          <span className="text-primary">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <ProductGallery
          images={images}
          product={product}
          thumbsSwiper={thumbsSwiper}
          setThumbsSwiper={setThumbsSwiper}
        />
        <ProductInfo
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          handleAddToCart={handleAddToCart}
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
        />
      </div>

      {relatedProducts.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop mt-[80px] pt-8 border-t border-outline-variant/30">
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-2xl font-headline-lg text-primary">Similar Products</h2>
            <Link
              to={`/products?search=${product.category}`}
              className="flex items-center gap-1 transition-colors font-label-caps text-label-caps text-on-surface-variant hover:text-primary text-[10px] group"
            >
              VIEW ALL
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} showQuickAdd={true} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetail;
