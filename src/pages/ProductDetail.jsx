import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { useProducts } from '../hooks/useProducts';
import ProductGallery from '../components/product/ProductGallery';
import ProductGrid from '../components/product/ProductGrid';
import StickyBuyBar from '../components/product/StickyBuyBar';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import CheckoutModal from '../components/checkout/CheckoutModal';
import { useState } from 'react';
import { useSEO } from '../hooks/useSEO';

export default function ProductDetail() {
  const { slug } = useParams();
  const { data: product, isLoading } = useProduct(slug);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  // Fetch related products (mock logic for now)
  const { data: allProducts } = useProducts({ status: 'Available' });
  const relatedProducts = allProducts?.filter(p => p.id !== product?.id).slice(0, 4) || [];

  useSEO({ 
    title: product ? product.name : (isLoading ? 'Loading...' : 'Not Found'), 
    description: product?.description || 'View this authentic curated sneaker on RarePairs.' 
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <Skeleton className="aspect-square rounded-2xl" />
           <div className="space-y-6">
             <Skeleton className="h-10 w-3/4" />
             <Skeleton className="h-6 w-1/4" />
             <div className="grid grid-cols-2 gap-4"><Skeleton className="h-16" /><Skeleton className="h-16" /></div>
             <Skeleton className="h-32" />
           </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-navy dark:text-cream">Product not found</h2>
      </div>
    );
  }

  const isSold = product.status === 'sold';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32 md:pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative">
        {/* Left: Gallery */}
        <div className="md:sticky md:top-24 h-max relative">
           <ProductGallery images={product.images} alt={product.name} />
           {isSold && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="transform -rotate-12 border-4 border-sold dark:border-sold-dark text-sold dark:text-sold-dark font-display font-bold text-5xl md:text-7xl tracking-widest px-8 py-2 rounded opacity-80 uppercase">
                  SOLD
               </div>
             </div>
           )}
        </div>

        {/* Right: Details */}
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
             {product.status === 'available' && <Badge type="available">Available</Badge>}
             {product.status === 'sold' && <Badge type="sold">Sold</Badge>}
             {product.is_rare && <Badge type="rare">Rare Find</Badge>}
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold text-navy dark:text-cream leading-tight">
            {product.name}
          </h1>
          
          <div className="mt-4 flex items-baseline gap-4">
            <span className="text-2xl font-bold text-navy dark:text-cream">
              {new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(product.price)}
            </span>
            {product.compare_at_price && (
              <span className="text-lg line-through text-navy/60 dark:text-cream/60">
                {new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(product.compare_at_price)}
              </span>
            )}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-y border-navy/10 dark:border-cream/10 py-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-navy/60 dark:text-cream/60">Size (UK)</p>
              <p className="mt-1 text-lg font-medium text-navy dark:text-cream">{product.size_uk}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-navy/60 dark:text-cream/60">Condition</p>
              <p className="mt-1 text-lg font-medium text-navy dark:text-cream">{product.condition} <span className="text-sm text-navy/50 dark:text-cream/50">({product.condition_score}/10)</span></p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-navy/60 dark:text-cream/60">Brand</p>
              <p className="mt-1 text-lg font-medium text-navy dark:text-cream">{product.brand}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-navy/60 dark:text-cream/60">Category</p>
              <p className="mt-1 text-lg font-medium text-navy dark:text-cream">{product.category}</p>
            </div>
          </div>

          <div className="mt-8">
             <h3 className="text-lg font-bold text-navy dark:text-cream">About this pair</h3>
             <p className="mt-4 text-navy/70 dark:text-cream/70 leading-relaxed whitespace-pre-wrap">
               {product.description}
             </p>
          </div>

          <div className="mt-10 hidden md:flex flex-col gap-4">
             {isSold ? (
               <div className="p-4 bg-navy/5 dark:bg-cream/5 rounded-xl text-center text-navy/70 dark:text-cream/70">
                 This pair has found a new home.
               </div>
             ) : (
               <button 
                 onClick={() => setIsCheckoutOpen(true)}
                 className="w-full py-4 rounded-full font-bold bg-navy text-cream hover:bg-navy/90 dark:bg-cream dark:text-navy dark:hover:bg-cream/90 transition-colors"
               >
                 Buy on WhatsApp
               </button>
             )}
             <button className="w-full py-3 rounded-full font-semibold border border-navy/20 text-navy dark:border-cream/20 dark:text-cream hover:bg-navy/5 dark:hover:bg-cream/5 transition-colors">
               Size Guide
             </button>
          </div>
        </div>
      </div>

      <div className="mt-24 border-t border-navy/10 dark:border-cream/10 pt-16">
        <h2 className="text-2xl font-display font-bold text-navy dark:text-cream mb-8">More like this</h2>
        <ProductGrid products={relatedProducts} isLoading={!allProducts} />
      </div>

      <StickyBuyBar price={product.price} disabled={isSold} onBuy={() => setIsCheckoutOpen(true)} />
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        product={product} 
      />
    </div>
  );
}
