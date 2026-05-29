// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

// Auth Pages
import Login from './pages/Login';
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';

// Managers
import ProductsManager from './components/products/ProductsManager';
import HeroManager from './components/hero/HeroManager';
import CategoryManager from './components/categories/CategoryManager';
import OrderManager from './components/orders/OrderManager';
import SubscriberManager from './components/subscribers/SubscriberManager';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          {/* Global Toaster */}
          <Toaster position="bottom-right" richColors />

          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/update-password" element={<UpdatePassword />} />

            {/* All Protected Admin Dashboard Routes */}
            <Route element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="/products" element={<ProductsManager />} />
              <Route path="/hero" element={<HeroManager />} />
              <Route path="/categories" element={<CategoryManager />} />
              <Route path="/orders" element={<OrderManager />} />
              <Route path="/subscribers" element={<SubscriberManager />} />
              <Route path="/dashboard" element={<Navigate to="/products" replace />} />
            </Route>

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
