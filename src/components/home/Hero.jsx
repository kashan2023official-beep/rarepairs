import { ArrowRight } from 'lucide-react';

// Pure CSS Mesh Gradients
// Light mode: cream base #F4F1EA with three layered radial-gradient glows
const LIGHT_MESH_GRADIENT = [
  'radial-gradient(circle at 20% 20%, #FFFFFF 0%, rgba(255, 255, 255, 0) 55%)',
  'radial-gradient(circle at 80% 30%, #EBE7DE 0%, rgba(235, 231, 222, 0) 55%)',
  'radial-gradient(circle at 40% 80%, #F0E9D9 0%, rgba(240, 233, 217, 0) 55%)',
].join(', ');

// Dark mode: navy base #1A2B42 with three layered radial-gradient glows
const DARK_MESH_GRADIENT = [
  'radial-gradient(circle at 20% 20%, #2A3F5C 0%, rgba(42, 63, 92, 0) 55%)',
  'radial-gradient(circle at 80% 30%, #1F2F48 0%, rgba(31, 47, 72, 0) 55%)',
  'radial-gradient(circle at 40% 80%, #243B58 0%, rgba(36, 59, 88, 0) 55%)',
].join(', ');

// Inline SVG noise with <feTurbulence> data URI for tactile texture
const NOISE_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")";

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden transition-colors duration-500 bg-[#F4F1EA] dark:bg-[#1A2B42] animate-fade-in-up"
      aria-label="RarePairs Hero"
    >
      {/* Layered Mesh Gradient — Light Mode */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-100 dark:opacity-0"
        style={{
          backgroundColor: '#F4F1EA',
          backgroundImage: LIGHT_MESH_GRADIENT,
        }}
        aria-hidden="true"
      />

      {/* Layered Mesh Gradient — Dark Mode */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 dark:opacity-100"
        style={{
          backgroundColor: '#1A2B42',
          backgroundImage: DARK_MESH_GRADIENT,
        }}
        aria-hidden="true"
      />

      {/* Tactile SVG Noise Texture Overlay (3.5% opacity) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: NOISE_DATA_URI }}
        aria-hidden="true"
      />

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-16">
          
          {/* Left Column: Headline + Subhead + CTA */}
          <div className="w-full md:w-[48%] lg:w-[45%] text-center md:text-left flex flex-col items-center md:items-start z-10">
            <span className="inline-block px-3.5 py-1 mb-4 rounded-full text-xs font-semibold tracking-wider uppercase bg-navy/5 text-navy dark:bg-cream/10 dark:text-cream transition-colors duration-500">
              Curated Thrift & Archive
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-navy dark:text-cream leading-[1.12] transition-colors duration-500">
              Rare pairs, <br className="hidden sm:inline" />
              second chances.
            </h1>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-navy/75 dark:text-cream/75 max-w-lg font-normal leading-relaxed transition-colors duration-500">
              Curated thrifted sneakers. Authenticated. Cleaned. Ready for their next miles.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#collection"
                id="hero-shop-cta"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-navy text-cream dark:bg-cream dark:text-navy font-semibold text-base shadow-lg shadow-navy/10 dark:shadow-black/30 hover:opacity-90 active:scale-[0.98] transition-all duration-300"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#how-it-works"
                className="text-sm font-medium text-navy/70 hover:text-navy dark:text-cream/70 dark:hover:text-cream transition-colors py-2 px-3"
              >
                How we authenticate →
              </a>
            </div>
          </div>

          {/* Right Column: Floating White Sneaker + Synchronized Shadow */}
          <div className="w-full md:w-[52%] lg:w-[55%] flex items-center justify-center relative">
            {/* Sneaker Wrapper: ~75% on mobile (<768px), ~55% of hero on desktop */}
            <div className="relative w-[75%] sm:w-[65%] md:w-full max-w-[340px] sm:max-w-[420px] md:max-w-[560px] lg:max-w-[620px] mx-auto select-none">
              
              {/* Layer 1 & 2: Vertical Float + Organic Micro-tilt */}
              <div 
                className="relative z-10 w-full animate-hero-float origin-center flex items-center justify-center"
                style={{ transform: 'rotate(-8deg)' }}
              >
                <img
                  src="/hero/sneaker.webp"
                  srcSet="/hero/sneaker.webp 1x, /hero/sneaker@2x.webp 2x"
                  alt="Floating white sneaker archive piece"
                  width={4000}
                  height={4000}
                  className="w-full h-auto object-contain pointer-events-none drop-shadow-sm"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>

              {/* Layer 3: Synchronized Levitating Soft Shadow */}
              <div
                className="absolute left-1/2 pointer-events-none z-0 animate-hero-shadow"
                style={{
                  top: '78%',
                  width: '64%',
                  height: '32px',
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Light Mode Shadow: radial-gradient ellipse with navy tint */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 opacity-100 dark:opacity-0"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(26,43,66,0.18) 0%, rgba(26,43,66,0) 70%)',
                  }}
                  aria-hidden="true"
                />

                {/* Dark Mode Shadow: radial-gradient ellipse with pure black depth */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 dark:opacity-100"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 70%)',
                  }}
                  aria-hidden="true"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
