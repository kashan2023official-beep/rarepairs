import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';

export default function ProductCard({ id, name, slug, price, size_uk, condition, status, is_rare, images }) {
  const isSold = status === 'sold';
  const displayImage = images && images.length > 0 ? images[0] : 'https://placehold.co/600x600/F4F1EA/1A2B42?text=Sneaker';

  return (
    <Link to={`/product/${slug}`} className={`group block ${isSold ? 'opacity-70' : ''}`}>
      <div className="relative aspect-square rounded-xl overflow-hidden bg-white dark:bg-navy-card border border-navy/5 dark:border-cream/10 transition-transform group-hover:-translate-y-1">
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {status === 'available' && <Badge type="available">Available</Badge>}
          {status === 'sold' && <Badge type="sold">Sold</Badge>}
          {is_rare && <Badge type="rare">Rare Find</Badge>}
        </div>

        {/* Image */}
        <img src={displayImage} alt={name} loading="lazy" className="w-full h-full object-contain p-6"  decoding="async"/>

        {/* Sold Overlay */}
        {isSold && (
          <div className="absolute inset-0 bg-cream/55 dark:bg-navy/55 flex items-center justify-center">
             <div className="transform -rotate-12 border-4 border-sold dark:border-sold-dark text-sold dark:text-sold-dark font-display font-bold text-3xl sm:text-4xl tracking-widest px-4 py-1 rounded opacity-80 uppercase">
                SOLD
             </div>
          </div>
        )}
      </div>

      <div className="mt-3 px-1">
        <h2 className="text-[13px] sm:text-[15px] font-semibold leading-snug text-navy dark:text-cream truncate">
          {name}
        </h2>
        <p className="text-xs sm:text-[12px] mt-1 text-navy/60 dark:text-cream/60">
          UK {size_uk} · {condition}
        </p>
        <p className="text-[13px] sm:text-[15px] font-bold mt-1 text-navy dark:text-cream">
          {new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(price)}
        </p>
      </div>
    </Link>
  );
}
