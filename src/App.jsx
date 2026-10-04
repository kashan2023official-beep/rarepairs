import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import RequireAuth from './components/auth/RequireAuth';
import NotFound from './pages/NotFound';
import { Loader2 } from 'lucide-react';

const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProductForm = lazy(() => import('./pages/admin/ProductForm'));
const Orders = lazy(() => import('./pages/admin/Orders'));

const queryClient = new QueryClient();

const AdminLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <Loader2 className="w-8 h-8 text-navy dark:text-cream animate-spin" />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="product/:slug" element={<ProductDetail />} />
              
              <Route path="admin/login" element={<Suspense fallback={<AdminLoader />}><Login /></Suspense>} />
              <Route element={<RequireAuth />}>
                <Route path="admin/dashboard" element={<Suspense fallback={<AdminLoader />}><Dashboard /></Suspense>} />
                <Route path="admin/products/new" element={<Suspense fallback={<AdminLoader />}><ProductForm /></Suspense>} />
                <Route path="admin/products/:id/edit" element={<Suspense fallback={<AdminLoader />}><ProductForm /></Suspense>} />
                <Route path="admin/orders" element={<Suspense fallback={<AdminLoader />}><Orders /></Suspense>} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
