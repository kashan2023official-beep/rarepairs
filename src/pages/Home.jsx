import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import Hero from '../components/home/Hero';
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
    <div>
      <Hero />
      
      <div id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <ProductFilters />
        
        <div className="mt-6 md:mt-8">
          <ProductGrid products={products} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
