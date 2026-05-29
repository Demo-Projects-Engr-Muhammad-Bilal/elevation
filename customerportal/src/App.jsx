import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AppDataProvider, useAppData } from './context/AppDataContext';
import { Navbar } from './components/layout/Navbar';
import { CartDrawer } from './components/layout/CartDrawer';
import { Footer } from './components/layout/Footer';
import { GlobalLoader } from './components/ui/GlobalLoader';
import { Toaster } from 'sonner';
import './App.css';

// Pages
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Categories from './pages/AllCategories'; // <-- Categories Page Import Kiya Hai

// Inner shell — reads globalLoading from AppDataContext
const AppShell = () => {
  const { globalLoading } = useAppData();

  if (globalLoading) return <GlobalLoader />;

  return (
    <div className="flex flex-col min-h-screen font-body-md text-on-background bg-background">
      <Navbar />
      <CartDrawer />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} /> {/* <-- Route Add Kar Diya Hai */}
          <Route path="/products" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AppDataProvider>
      <CartProvider>
        <Router>
          <Toaster position="bottom-right" richColors />
          <AppShell />
        </Router>
      </CartProvider>
    </AppDataProvider>
  );
}

export default App;