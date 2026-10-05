import { Link } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-cream/92 dark:bg-navy/92 backdrop-blur-sm border-b border-navy/10 dark:border-cream/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-logo text-2xl text-navy dark:text-cream">RarePairs</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-sm font-medium text-navy dark:text-cream hover:opacity-70 transition-opacity">Shop</Link>
            <Link to="/how-it-works" className="text-sm font-medium text-navy dark:text-cream hover:opacity-70 transition-opacity">How It Works</Link>
            <Link to="/" className="text-sm font-medium text-navy dark:text-cream hover:opacity-70 transition-opacity">About</Link>
          </nav>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
