import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useCart } from '../hooks/useCart';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductGallery } from '../components/product-detail/ProductGallery';
import { ProductInfo } from '../components/product-detail/ProductInfo';
import { toast } from 'sonner'; // <-- Import Sonner


const ProductDetail = () => {
          const { id } = useParams();
          const { addToCart, setIsCartOpen } = useCart();
          const [product, setProduct] = useState(null);
          const [relatedProducts, setRelatedProducts] = useState([]);
          const [selectedSize, setSelectedSize] = useState('');
          const [activeAccordion, setActiveAccordion] = useState('Size & Fit');
          const [thumbsSwiper, setThumbsSwiper] = useState(null);

          useEffect(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    const fetchProductData = async () => {
                              try {
                                        const docRef = doc(db, "products", id);
                                        const docSnap = await getDoc(docRef);
                                        if (docSnap.exists()) {
                                                  const productData = { id: docSnap.id, ...docSnap.data() };
                                                  setProduct(productData);
                                                  setSelectedSize(productData.sizes?.[0] || '');

                                                  if (productData.category) {
                                                            const q = query(collection(db, "products"), where("category", "==", productData.category), limit(10));
                                                            const relatedSnap = await getDocs(q);
                                                            const related = relatedSnap.docs
                                                                      .map(d => ({ id: d.id, ...d.data() }))
                                                                      .filter(p => p.id !== id).slice(0, 4);
                                                            setRelatedProducts(related);
                                                  }
                                        }
                              } catch (error) {
                                        console.error("Error fetching product details:", error);
                              }
                    };
                    fetchProductData();
          }, [id]);

          const handleAddToCart = () => {
    if (!selectedSize && product?.sizes?.length > 0) {
      toast.error("Please select a size before adding to bag."); // Sonner Toast
      return;
    }
    addToCart(product, 1, selectedSize, product.colors?.[0] || 'Default');
    setIsCartOpen(true);
    toast.success("Added to bag!"); // Success Toast
  };

          const images = product?.images?.length > 0 ? product.images : product?.image ? [product.image] : [];

          if (!product) {
                    return (
                              <main className="pt-[120px] pb-section-gap min-h-screen">
                                        <div className="px-margin-mobile md:px-margin-desktop py-8">
                                                  <div className="w-48 h-4 rounded-sm animate-pulse bg-surface-container-high"></div>
                                        </div>
                                        <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter">
                                                  <div className="md:col-span-7 lg:col-span-8">
                                                            <div className="w-full mb-4 shadow-sm rounded-lg animate-pulse bg-surface-container-high aspect-[4/5]"></div>
                                                  </div>
                                                  <div className="sticky h-fit md:col-span-5 lg:col-span-4 top-[120px]">
                                                            <div className="w-3/4 h-10 mb-4 animate-pulse bg-surface-container-high"></div>
                                                            <div className="w-24 h-6 mb-10 animate-pulse bg-surface-container-high"></div>
                                                            <div className="w-full h-16 rounded-sm animate-pulse bg-surface-container-high"></div>
                                                  </div>
                                        </div>
                              </main>
                    );
          }

          return (
                    <main className="pt-[120px] pb-section-gap min-h-screen">
                              <div className="px-margin-mobile md:px-[90px] py-8">
                                        <nav className="flex items-center gap-2 uppercase font-label-caps text-label-caps text-on-surface-variant">
                                                  <Link to="/" className="transition-colors hover:text-primary">Home</Link>
                                                  <span className="text-[10px]">/</span>
                                                  <Link to={`/products?search=${product.category}`} className="transition-colors hover:text-primary">{product.category}</Link>
                                                  <span className="text-[10px]">/</span>
                                                  <span className="text-primary">{product.name}</span>
                                        </nav>
                              </div>

                              <div className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter">
                                        <ProductGallery images={images} product={product} thumbsSwiper={thumbsSwiper} setThumbsSwiper={setThumbsSwiper} />
                                        <ProductInfo
                                                  product={product} selectedSize={selectedSize} setSelectedSize={setSelectedSize}
                                                  handleAddToCart={handleAddToCart} activeAccordion={activeAccordion} setActiveAccordion={setActiveAccordion}
                                        />
                              </div>

                              {relatedProducts.length > 0 && (
                                        <section className="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop mt-section-gap pt-16 border-t border-outline-variant/30">
                                                  <div className="flex items-end justify-between mb-12">
                                                            <h2 className="font-headline-md text-[32px] text-primary italic">Complete the Look</h2>
                                                            <Link to={`/products?search=${product.category}`} className="pb-1 transition-colors border-b border-transparent font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:border-primary">
                                                                      VIEW MORE
                                                            </Link>
                                                  </div>
                                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
                                                            {relatedProducts.map(relProduct => <ProductCard key={relProduct.id} product={relProduct} showQuickAdd={true} />)}
                                                  </div>
                                        </section>
                              )}
                    </main>
          );
};

export default ProductDetail;