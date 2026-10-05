export default function StickyBuyBar({ price, disabled, onBuy }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 bg-cream/95 dark:bg-navy/95 backdrop-blur border-t border-navy/10 dark:border-cream/10 md:hidden">
      <button 
        disabled={disabled}
        onClick={onBuy}
        className={`w-full py-4 rounded-full font-semibold transition-colors ${
          disabled 
            ? 'bg-navy/20 text-navy/50 dark:bg-cream/20 dark:text-cream/50 cursor-not-allowed'
            : 'bg-navy text-cream hover:bg-navy/90 dark:bg-cream dark:text-navy dark:hover:bg-cream/90'
        }`}
      >
        {disabled ? 'Sold Out' : `Buy on WhatsApp • Rs ${price}`}
      </button>
    </div>
  );
}
