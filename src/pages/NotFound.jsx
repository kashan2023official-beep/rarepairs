import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

export default function NotFound() {
  useSEO({ title: 'Page Not Found', description: 'The requested page could not be found.' });
  
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-8xl md:text-9xl font-bold text-navy dark:text-cream opacity-20 mb-4">404</h1>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-navy dark:text-cream mb-6">Page Not Found</h2>
      <p className="text-navy/70 dark:text-cream/70 max-w-md mx-auto mb-10 text-lg">
        The page you're looking for doesn't exist or has been moved to a new home.
      </p>
      <Link to="/" className="inline-flex items-center justify-center px-8 min-h-[44px] rounded-full font-bold bg-navy text-cream dark:bg-cream dark:text-navy hover:bg-navy/90 dark:hover:bg-cream/90 transition-colors">
        Return to Shop
      </Link>
    </div>
  );
}
