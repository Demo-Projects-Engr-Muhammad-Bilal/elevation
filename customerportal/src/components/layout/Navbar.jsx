import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { setIsCartOpen, cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // UPDATED: Sirf actual working routes
  const navLinks = [
    { name: "Collection", path: "/products" },
    { name: "Track Orders", path: "/orders" },
  ];

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-surface/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <nav className="flex items-center justify-between w-full mx-auto px-margin-mobile md:px-margin-desktop max-w-[1440px]">

        <div className="flex items-center gap-4 md:gap-8">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            /* 'flex' se hum isay display flex de rahe hain, md:hidden se desktop pe gayab */
            className="flex items-center justify-center transition-colors md:hidden hover:text-secondary"
          >
            {/* !flex add kiya taake material-symbols-outlined ka default behavior override ho jaye */}
            <span className="!flex material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>

          <Link to="/" className="text-xl font-extrabold tracking-widest uppercase text-primary">ELÉVATION</Link>

          <div className="hidden gap-6 md:flex">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="transition-colors font-label-caps text-label-caps text-on-surface-variant hover:text-secondary">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div ref={searchRef} className="relative flex items-center">
            <form onSubmit={handleSearchSubmit} className={`flex items-center overflow-hidden transition-all duration-500 ease-in-out ${isSearchOpen ? 'w-40 md:w-64 opacity-100 mr-2' : 'w-0 opacity-0'}`}>
              <input
                type="text"
                placeholder="Search collection..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-0 pb-1 text-sm bg-transparent border-0 border-b outline-none border-primary/30 font-body-md focus:border-primary focus:ring-0 transition-colors placeholder:text-on-surface-variant/50"
              />
            </form>
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="flex items-center justify-center transition-colors hover:text-secondary">
              <span className="material-symbols-outlined">{isSearchOpen ? 'close' : 'search'}</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center cursor-pointer group" onClick={() => setIsCartOpen(true)}>
            <span className="transition-colors material-symbols-outlined group-hover:text-secondary">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute flex items-center justify-center w-3 h-3 text-[8px] rounded-full -top-1 -right-1 bg-primary text-on-primary">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </nav>

      <div className={`absolute top-full left-0 w-full bg-surface/95 backdrop-blur-md overflow-hidden transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'max-h-64 border-b border-outline-variant/30 py-4' : 'max-h-0 py-0'}`}>
        <div className="flex flex-col space-y-4 px-margin-mobile">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-sm tracking-widest uppercase font-label-caps text-primary">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};