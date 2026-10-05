import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Announcement() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const dismissedUntil = localStorage.getItem('announcement_dismissed_until');
    if (!dismissedUntil) {
      setIsVisible(true);
    } else {
      const now = new Date().getTime();
      if (now > parseInt(dismissedUntil, 10)) {
        setIsVisible(true);
      }
    }
  }, []);

  if (!isVisible && !isClosing) return null;

  const handleDismiss = () => {
    setIsClosing(true);
    // Set timestamp for 7 days from now
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const hideUntil = new Date().getTime() + sevenDaysInMs;
    localStorage.setItem('announcement_dismissed_until', hideUntil.toString());

    // Wait for animation to finish before unmounting
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 250);
  };

  return (
    <div
      className={`bg-navy text-cream dark:bg-cream dark:text-navy transition-all duration-250 ease-in-out overflow-hidden ${
        isClosing ? 'opacity-0 max-h-0 py-0' : 'opacity-100 max-h-24 py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-center min-h-[28px]">
        <p className="text-sm font-medium text-center px-8 pr-12 line-clamp-2 md:line-clamp-1">
          🎉 Free shipping on orders over Rs 10,000 — Limited time
        </p>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="absolute right-2 sm:right-6 flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] text-cream/70 hover:text-cream dark:text-navy/70 dark:hover:text-navy transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
