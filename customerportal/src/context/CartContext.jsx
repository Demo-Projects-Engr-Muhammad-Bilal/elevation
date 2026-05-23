import { createContext, useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
          const [cartItems, setCartItems] = useState([]);
          const [isCartOpen, setIsCartOpen] = useState(false);

          // Initialize from cookies
          useEffect(() => {
                    const savedCart = Cookies.get('elevation_cart');
                    if (savedCart) {
                              try {
                                        setCartItems(JSON.parse(savedCart));
                              } catch (e) {
                                        console.error("Failed to parse cart cookie", e);
                              }
                    }
          }, []);

          // Update cookies whenever cart changes
          useEffect(() => {
                    Cookies.set('elevation_cart', JSON.stringify(cartItems), { expires: 7 });
          }, [cartItems]);

          const addToCart = (product, quantity = 1, size, color) => {
                    setCartItems(prev => {
                              const existing = prev.find(item => item.id === product.id && item.size === size);
                              if (existing) {
                                        return prev.map(item =>
                                                  item.id === product.id && item.size === size
                                                            ? { ...item, quantity: item.quantity + quantity }
                                                            : item
                                        );
                              }
                              return [...prev, { ...product, quantity, size, color }];
                    });
                    setIsCartOpen(true);
          };

          const removeFromCart = (productId, size) => {
                    setCartItems(prev => prev.filter(item => !(item.id === productId && item.size === size)));
          };

          const updateQuantity = (productId, size, delta) => {
                    setCartItems(prev => prev.map(item => {
                              if (item.id === productId && item.size === size) {
                                        const newQuantity = Math.max(1, item.quantity + delta);
                                        return { ...item, quantity: newQuantity };
                              }
                              return item;
                    }));
          };

          // YEH FUNCTION ADD KIYA HAI
          const clearCart = () => {
                    setCartItems([]);
          };

          const cartTotal = useMemo(() => {
                    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
          }, [cartItems]);

          const cartCount = useMemo(() => {
                    return cartItems.reduce((count, item) => count + item.quantity, 0);
          }, [cartItems]);

          return (
                    // value object main clearCart lazmi add karein
                    <CartContext.Provider value={{
                              cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
                              isCartOpen, setIsCartOpen, cartTotal, cartCount
                    }}>
                              {children}
                    </CartContext.Provider>
          );
};