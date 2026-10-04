export default function Footer() {
  return (
    <footer className="bg-navy dark:bg-cream py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="font-logo text-2xl text-cream dark:text-navy">RarePairs</span>
            <p className="mt-4 text-sm text-cream/70 dark:text-navy/70">
              Rare pairs, second chances. Curated thrifted sneakers. Authenticated. Cleaned. Ready for their next miles.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-cream dark:text-navy uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-cream/70 dark:text-navy/70 hover:text-cream dark:hover:text-navy transition-colors">All Sneakers</a></li>
              <li><a href="#" className="text-sm text-cream/70 dark:text-navy/70 hover:text-cream dark:hover:text-navy transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-sm text-cream/70 dark:text-navy/70 hover:text-cream dark:hover:text-navy transition-colors">Rare Finds</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-cream dark:text-navy uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-cream/70 dark:text-navy/70 hover:text-cream dark:hover:text-navy transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm text-cream/70 dark:text-navy/70 hover:text-cream dark:hover:text-navy transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-sm text-cream/70 dark:text-navy/70 hover:text-cream dark:hover:text-navy transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-cream dark:text-navy uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-cream/70 dark:text-navy/70 hover:text-cream dark:hover:text-navy transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-cream/70 dark:text-navy/70 hover:text-cream dark:hover:text-navy transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-cream/10 dark:border-navy/10">
          <p className="text-xs text-center text-cream/60 dark:text-navy/60">
            &copy; {new Date().getFullYear()} RarePairs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
