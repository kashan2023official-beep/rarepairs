import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import { useSEO } from '../hooks/useSEO';

export default function Home() {
  const [searchParams] = useSearchParams();
  
  const filters = {
    sizes: searchParams.getAll('size'),
    condition: searchParams.get('condition') || 'All',
    status: searchParams.get('status') || 'Available',
    sort: searchParams.get('sort') || 'Newest',
  };

  const { data: products, isLoading } = useProducts(filters);
  
  useSEO({ 
    title: 'RarePairs', 
    description: 'Curated thrifted sneakers. Authenticated. Cleaned. Ready for their next miles.' 
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left py-12 md:py-20 gap-8">
        <div className="max-w-xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-navy dark:text-cream leading-tight">
            Rare pairs, <br className="sm:hidden" /> second chances.
          </h1>
          <p className="mt-4 text-lg text-navy/70 dark:text-cream/70">
            Curated thrifted sneakers. Authenticated. Cleaned. Ready for their next miles.
          </p>
        </div>
        <div className="hidden md:block">
           <div className="w-64 h-64 border-4 border-navy/10 dark:border-cream/10 rounded-full flex items-center justify-center text-navy/20 dark:text-cream/20">
             <span className="font-logo text-3xl">Illustration</span>
           </div>
        </div>
      </div>
      
      <ProductFilters />
      
      <div className="mt-6 md:mt-8">
        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </div>
  );
}
