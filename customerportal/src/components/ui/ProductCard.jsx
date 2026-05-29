import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { GenericCard } from './GenericCard'; // Import generic card

export const ProductCard = ({ product, showQuickAdd = false }) => {
          const { addToCart, setIsCartOpen } = useCart();

          const handleQuickAdd = (e) => {
                    e.preventDefault();
                    addToCart(product, 1, product.sizes?.[0] || 'S', product.colors?.[0] || 'Default');
                    setIsCartOpen(true);
          };

          const images = product.images?.length > 0 ? product.images : product.image ? [product.image] : [];

          // Hover Actions specifically for Product
          const hoverActions = showQuickAdd ? (
                    <>
                              <Link to={`/product/${product.id}`} className="flex items-center justify-center flex-1 gap-2 py-3 tracking-widest text-[10px] text-black transition-colors bg-white font-label-caps hover:bg-surface-container">
                                        <Eye size={14} /> VIEW
                              </Link>
                              <button onClick={handleQuickAdd} className="flex items-center justify-center flex-1 gap-2 py-3 tracking-widest text-[10px] text-white transition-colors bg-primary font-label-caps hover:bg-secondary">
                                        <ShoppingBag size={14} /> ADD
                              </button>
                    </>
          ) : (
                    <Link to={`/product/${product.id}`} className="flex items-center justify-center w-full gap-2 py-3 tracking-widest text-[10px] text-white transition-colors bg-primary font-label-caps hover:bg-secondary">
                              VIEW DETAILS
                    </Link>
          );

          return (
                    <GenericCard
                              id={`prod-${product.id}`} // Unique ID for swiper arrows
                              images={images}
                              linkTo={`/product/${product.id}`}
                              subtitle={product.category}
                              title={product.name}
                              bottomText={`$${product.price}`}
                              hoverActions={hoverActions}
                    />
          );
};