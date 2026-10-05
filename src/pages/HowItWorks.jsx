import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  ShieldCheck, 
  BadgeCheck, 
  Truck, 
  MessageCircle, 
  PackageCheck,
  Check
} from 'lucide-react';
import { useInView } from '../hooks/useInView';

// Reusable components
function SectionHeader({ number, label, heading, intro }) {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ease-out flex flex-col items-start ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="font-heading text-[64px] md:text-[96px] text-navy/10 dark:text-cream/10 leading-none mb-6">
        {number}
      </div>
      <div className="w-16 h-px bg-navy/20 dark:bg-cream/20 mb-4" />
      <div className="uppercase tracking-[0.2em] text-xs text-navy/60 dark:text-cream/60 font-bold mb-4">
        {label}
      </div>
      <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
        {heading}
      </h2>
      <p className="text-navy/70 dark:text-cream/70 max-w-2xl text-lg leading-relaxed">
        {intro}
      </p>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 my-16 md:my-24">
      <div className="w-12 h-px bg-navy/15 dark:bg-cream/15" />
      <div className="w-1.5 h-1.5 rotate-45 bg-navy/30 dark:bg-cream/30" />
      <div className="w-12 h-px bg-navy/15 dark:bg-cream/15" />
    </div>
  );
}

function FaqItem({ q, a }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="rounded-2xl border border-navy/10 dark:border-cream/10 overflow-hidden bg-cream/50 dark:bg-navy-card/50 backdrop-blur-sm transition-colors">
      <button 
        className="w-full px-5 py-5 text-left flex justify-between items-center focus:outline-none hover:bg-navy/[0.02] dark:hover:bg-cream/[0.02] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium pr-8">{q}</span>
        <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-navy/70 dark:text-cream/70 leading-relaxed pt-2">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  if (typeof document !== 'undefined') {
    document.title = 'How It Works | RarePairs';
  }

  const [roadmapRef, isRoadmapInView] = useInView({ threshold: 0.1 });
  const [delivRef, isDelivInView] = useInView({ threshold: 0.15 });
  const [payRef, isPayInView] = useInView({ threshold: 0.15 });
  const [faqRef, isFaqInView] = useInView({ threshold: 0.15 });
  const [ctaRef, isCtaInView] = useInView({ threshold: 0.15 });

  const faqs = [
    { q: "What if the shoe doesn't fit?", a: "We list exact UK/US/EU sizes. If it still doesn't fit, you can return it within 3 days — but the Rs 500 deposit is not refunded for fit-related returns." },
    { q: "How do I know it's authentic?", a: "Every pair passes a 12-point authentication check and comes with an authenticity card. If you can prove a pair is fake, we refund 100% including deposit and shipping." },
    { q: "Can I see more photos before buying?", a: "Yes — message us on WhatsApp and we'll send additional angles or close-ups." },
    { q: "How long does delivery take?", a: "2–3 days for major cities, 3–5 days elsewhere." },
    { q: "Why the deposit?", a: "Fake and prank orders are common in Pakistan. The Rs 500 deposit commits serious buyers and lets us reserve the pair for you. It's applied to your final total — not an extra fee." }
  ];

  const roadmapSteps = [
    { title: "Browse the Collection", desc: "Filter by size, condition, brand, and price. Every pair is one-of-one, so if you see something you like, act fast." },
    { title: "Check the Details", desc: "Each product page shows real photos, condition grade, size (UK/US/EU), description, and delivery info." },
    { title: "Tap \"Buy on WhatsApp\"", desc: "No account needed. No lengthy checkout. Click the button and a short form opens." },
    { title: "Share Your Details", desc: "Name, phone, delivery address, and optional notes (e.g. \"prefer evening delivery\")." },
    { title: "Order Reaches Us Instantly", desc: "Your order arrives on our WhatsApp with full details. You'll get an email confirmation within seconds." },
    { title: "We Confirm Within 2 Hours", desc: "We reply on WhatsApp to confirm your order, share payment details, and give you a delivery estimate." }
  ];

  return (
    <div className="bg-cream dark:bg-navy min-h-screen text-navy dark:text-cream font-sans transition-colors duration-300">
      
      {/* HERO */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 border-b border-navy/10 dark:border-cream/10">
        <div className="absolute inset-0 pointer-events-none hero-mesh-gradient opacity-30 dark:opacity-40"></div>
        <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Every pair, verified.<br/>Every order, protected.</h1>
          <p className="text-lg md:text-xl text-navy/80 dark:text-cream/80 max-w-2xl mx-auto">
            From the moment we source a pair to the moment it arrives at your door — here's exactly how RarePairs works.
          </p>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-10 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 bg-cream/50 dark:bg-navy-card/50 backdrop-blur-sm border border-navy/10 dark:border-cream/10 px-4 py-2 rounded-xl md:rounded-full">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-medium">12-point authentication</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-cream/50 dark:bg-navy-card/50 backdrop-blur-sm border border-navy/10 dark:border-cream/10 px-4 py-2 rounded-xl md:rounded-full">
              <BadgeCheck className="w-4 h-4" />
              <span className="text-xs font-medium">Authenticity card included</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-cream/50 dark:bg-navy-card/50 backdrop-blur-sm border border-navy/10 dark:border-cream/10 px-4 py-2 rounded-xl md:rounded-full">
              <Truck className="w-4 h-4" />
              <span className="text-xs font-medium">Free shipping over Rs 15,000</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-cream/50 dark:bg-navy-card/50 backdrop-blur-sm border border-navy/10 dark:border-cream/10 px-4 py-2 rounded-xl md:rounded-full">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-medium">2-hour WhatsApp reply</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24">
        
        {/* 01 AUTHENTICATION */}
        <section>
          <SectionHeader 
            number="01" 
            label="AUTHENTICATION" 
            heading="How we authenticate" 
            intro="Not every secondhand sneaker is worth your money. Here's how we make sure ours are." 
          />
          
          <div className="mt-16 space-y-0">
            {[
              { t: "Sourcing", d: "We source from verified resellers, trusted thrift markets, and private collectors across Pakistan. Every pair has a traceable origin before it reaches us." },
              { t: "Multi-Point Inspection", d: "Each pair goes through a 12-point check: stitching patterns, sole wear, insole branding, tongue tags, size tag fonts, lace quality, midsole integrity, and more. Fakes usually fail within the first 3 checks." },
              { t: "Deep Clean & Restore", d: "Every pair is professionally cleaned — uppers, midsoles, insoles, laces. Leather is conditioned. Suede is brushed. We only restore what preserves authenticity — no repainting, no fake aging." },
              { t: "Photo Documentation", d: "We photograph every pair from 4 angles: front, side, top, and sole. You see exactly what you're buying — no filters, no misleading angles." },
              { t: "Condition Grade", d: "We assign a score from 1–10. No exaggerations. A 7 is a 7. If there's creasing, discoloration, or a scuff, we tell you before you buy." },
            ].map((step, idx, arr) => {
              const [ref, inView] = useInView({ threshold: 0.1 });
              return (
                <div 
                  key={idx}
                  ref={ref}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                  className={`flex gap-5 items-start py-6 transition-all duration-700 ease-out ${idx !== arr.length - 1 ? 'border-b border-navy/10 dark:border-cream/10' : ''} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <div className="w-10 h-10 rounded-full border border-navy/20 dark:border-cream/20 flex items-center justify-center font-heading text-lg text-navy dark:text-cream flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy dark:text-cream mb-1">{step.t}</h3>
                    <p className="text-navy/70 dark:text-cream/70 leading-relaxed">{step.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <Divider />

        {/* 02 ORDERING */}
        <section>
          <SectionHeader 
            number="02" 
            label="ORDERING" 
            heading="How to order" 
            intro="A simple 6-step flow from browsing to checkout." 
          />

          <div ref={roadmapRef} className="relative mt-20 md:mt-24 pb-8">
            {/* Cinematic Vertical Line */}
            <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2">
              <div 
                className="w-full h-full bg-gradient-to-b from-navy/40 via-navy/20 to-transparent dark:from-cream/40 dark:via-cream/20 origin-top transition-transform duration-[1200ms] ease-out"
                style={{ transform: isRoadmapInView ? 'scaleY(1)' : 'scaleY(0)' }}
              />
            </div>
            
            <div className="space-y-12 md:space-y-16 relative z-10">
              {roadmapSteps.map((step, idx) => {
                const [ref, inView] = useInView({ threshold: 0.1 });
                return (
                  <div 
                    key={idx} 
                    ref={ref}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                    className={`relative flex flex-col md:flex-row items-start transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    {/* Circle Node */}
                    <div className="absolute left-[20px] md:left-1/2 top-8 w-4 h-4 rounded-full bg-navy dark:bg-cream ring-4 ring-cream dark:ring-navy md:-translate-x-1/2 z-20 shadow-sm" />
                    
                    {/* Content Box */}
                    <div className={`ml-16 md:ml-0 md:w-[45%] ${idx % 2 === 0 ? 'md:pl-0' : 'md:pr-0'}`}>
                      <div className="rounded-2xl border border-navy/10 dark:border-cream/10 bg-cream/50 dark:bg-navy-card/50 p-6 backdrop-blur-sm shadow-sm transition-shadow">
                        <span className="block text-xs font-bold tracking-widest text-navy/40 dark:text-cream/40 mb-3">
                          STEP 0{idx + 1}
                        </span>
                        <h3 className="font-heading text-xl md:text-2xl font-bold mb-2">{step.title}</h3>
                        <p className="text-navy/70 dark:text-cream/70 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Divider />

        {/* 03 DELIVERY */}
        <section>
          <SectionHeader 
            number="03" 
            label="DELIVERY" 
            heading="Delivery across Pakistan" 
            intro="We ship to every city in Pakistan." 
          />

          <div 
            ref={delivRef}
            className={`mt-16 transition-all duration-700 ease-out ${isDelivInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {/* Desktop Table */}
            <div className="hidden md:block rounded-2xl border border-navy/10 dark:border-cream/10 overflow-hidden mb-12 shadow-sm bg-cream/50 dark:bg-navy-card/50 backdrop-blur-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-navy/5 dark:bg-cream/5">
                  <tr>
                    <th className="py-4 px-6 text-xs tracking-wider text-navy/60 dark:text-cream/60 uppercase font-bold">Delivery zone</th>
                    <th className="py-4 px-6 text-xs tracking-wider text-navy/60 dark:text-cream/60 uppercase font-bold">Time</th>
                    <th className="py-4 px-6 text-xs tracking-wider text-navy/60 dark:text-cream/60 uppercase font-bold text-right">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-navy/5 dark:border-cream/5 bg-transparent">
                    <td className="py-5 px-6 font-medium">Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar</td>
                    <td className="py-5 px-6 text-navy/80 dark:text-cream/80">2–3 business days</td>
                    <td className="py-5 px-6 text-right font-medium">Rs 250</td>
                  </tr>
                  <tr className="border-t border-navy/5 dark:border-cream/5 bg-navy/[0.02] dark:bg-cream/[0.02]">
                    <td className="py-5 px-6 font-medium">All other cities</td>
                    <td className="py-5 px-6 text-navy/80 dark:text-cream/80">3–5 business days</td>
                    <td className="py-5 px-6 text-right font-medium">Rs 350</td>
                  </tr>
                  <tr className="border-t border-navy/5 dark:border-cream/5 bg-transparent">
                    <td className="py-5 px-6 font-bold">Orders over Rs 15,000</td>
                    <td className="py-5 px-6 text-navy/80 dark:text-cream/80 font-medium">2–5 business days</td>
                    <td className="py-5 px-6 text-right font-bold text-amber-600 dark:text-rare-dark flex items-center justify-end gap-1">
                      <Check className="w-4 h-4" /> Free
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 mb-10">
              <div className="rounded-2xl border border-navy/10 dark:border-cream/10 p-5 bg-cream/50 dark:bg-navy-card/50 backdrop-blur-sm">
                <h4 className="font-bold mb-2">Major Cities</h4>
                <p className="text-sm text-navy/60 dark:text-cream/60 mb-1 leading-relaxed">Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-navy/5 dark:border-cream/5">
                  <span className="text-navy/80 dark:text-cream/80 text-sm">2–3 business days</span>
                  <span className="font-bold">Rs 250</span>
                </div>
              </div>
              
              <div className="rounded-2xl border border-navy/10 dark:border-cream/10 p-5 bg-navy/[0.02] dark:bg-cream/[0.02] backdrop-blur-sm">
                <h4 className="font-bold mb-2">All other cities</h4>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-navy/5 dark:border-cream/5">
                  <span className="text-navy/80 dark:text-cream/80 text-sm">3–5 business days</span>
                  <span className="font-bold">Rs 350</span>
                </div>
              </div>

              <div className="rounded-2xl border border-navy/10 dark:border-cream/10 p-5 bg-cream/50 dark:bg-navy-card/50 backdrop-blur-sm">
                <h4 className="font-bold mb-2">Orders over Rs 15,000</h4>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-navy/5 dark:border-cream/5">
                  <span className="text-navy/80 dark:text-cream/80 text-sm">2–5 business days</span>
                  <span className="font-bold text-amber-600 dark:text-rare-dark flex items-center gap-1"><Check className="w-4 h-4"/> Free</span>
                </div>
              </div>
            </div>

            {/* Callouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border-l-4 border-navy/30 dark:border-cream/30 bg-navy/[0.02] dark:bg-cream/[0.02] p-5 pl-6">
                <PackageCheck className="w-5 h-5 mb-3 text-navy/70 dark:text-cream/70" />
                <h4 className="font-semibold mb-2">Packaging</h4>
                <p className="text-navy/70 dark:text-cream/70 text-sm leading-relaxed">
                  Every pair ships in a protective box with bubble wrap, tissue paper, and an authenticity card. Original boxes are included when available.
                </p>
              </div>
              <div className="rounded-xl border-l-4 border-navy/30 dark:border-cream/30 bg-navy/[0.02] dark:bg-cream/[0.02] p-5 pl-6">
                <MessageCircle className="w-5 h-5 mb-3 text-navy/70 dark:text-cream/70" />
                <h4 className="font-semibold mb-2">Tracking</h4>
                <p className="text-navy/70 dark:text-cream/70 text-sm leading-relaxed">
                  You'll get WhatsApp updates at every stage — packed, shipped, out for delivery, delivered.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* 04 PAYMENT */}
        <section>
          <SectionHeader 
            number="04" 
            label="PAYMENT" 
            heading="Payment" 
            intro="Cash on Delivery (COD) — with a Rs 500 deposit" 
          />

          <div 
            ref={payRef}
            className={`mt-16 flex flex-col md:flex-row gap-8 items-start transition-all duration-700 ease-out ${isPayInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            {/* Main Deposit Card */}
            <div className="flex-1 rounded-3xl border-2 border-amber-500/30 dark:border-rare-dark/30 bg-amber-50/50 dark:bg-rare-dark/5 p-8 md:p-12 w-full">
              <div className="uppercase tracking-widest text-xs font-bold text-amber-700 dark:text-rare-dark mb-6">
                DEPOSIT
              </div>
              <div className="font-heading text-[64px] md:text-[96px] font-bold text-amber-700 dark:text-rare-dark leading-none tracking-tight mb-8">
                Rs 500
              </div>
              <div className="w-24 h-px bg-amber-500/40 dark:bg-rare-dark/40 mb-8" />
              <p className="text-amber-900/90 dark:text-rare-dark/90 mb-8 leading-relaxed">
                To protect both you and us from fake orders, all COD orders require a Rs 500 advance deposit, paid via Easypaisa, JazzCash, or bank transfer.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 mt-0.5 text-amber-600 dark:text-rare-dark flex-shrink-0" />
                  <span className="text-amber-900/90 dark:text-rare-dark/90">Deducted from your final total — you pay the balance on delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 mt-0.5 text-amber-600 dark:text-rare-dark flex-shrink-0" />
                  <span className="text-amber-900/90 dark:text-rare-dark/90">Fully refundable if we cancel or can't fulfill your order</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 mt-0.5 text-amber-600 dark:text-rare-dark flex-shrink-0" />
                  <span className="text-amber-900/90 dark:text-rare-dark/90">Non-refundable if you cancel after dispatch or refuse delivery</span>
                </li>
              </ul>
            </div>

            {/* Example Card */}
            <div className="w-full md:w-[320px] flex-shrink-0 rounded-2xl border border-navy/10 dark:border-cream/10 bg-cream/50 dark:bg-navy-card/50 p-6 backdrop-blur-sm mt-0 md:mt-24">
              <div className="uppercase tracking-widest text-xs font-bold text-navy/50 dark:text-cream/50 mb-6">
                EXAMPLE
              </div>
              <div className="space-y-4 text-sm tabular-nums">
                <div className="flex justify-between">
                  <span className="text-navy/70 dark:text-cream/70">Sneaker price</span>
                  <span>Rs 12,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-navy/70 dark:text-cream/70">Shipping</span>
                  <span>Rs 250</span>
                </div>
                <div className="flex justify-between text-amber-700 dark:text-rare-dark">
                  <span>Deposit paid upfront</span>
                  <span>- Rs 500</span>
                </div>
                <div className="pt-4 border-t border-navy/10 dark:border-cream/10 flex justify-between font-bold text-base">
                  <span>Pay on delivery</span>
                  <span>Rs 12,250</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="font-semibold mb-6">Online Payment (Optional)</p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {['Easypaisa', 'JazzCash', 'Meezan', 'HBL', 'UBL', 'SadaPay'].map((method) => (
                <div key={method} className="rounded-full border border-navy/10 dark:border-cream/10 px-4 py-2 text-sm bg-cream/30 dark:bg-navy-card/30 backdrop-blur-sm">
                  {method}
                </div>
              ))}
            </div>
            <p className="text-navy/60 dark:text-cream/60 text-sm">
              Full prepayment gets you free shipping and priority dispatch.
            </p>
          </div>
        </section>

        <Divider />

        {/* FAQ */}
        <section>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-center">FAQ</h2>
            <div 
              ref={faqRef}
              className={`space-y-3 transition-all duration-700 ease-out ${isFaqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              {faqs.map((faq, idx) => (
                <FaqItem key={idx} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* FINAL CTA */}
      <section 
        ref={ctaRef}
        className={`py-20 md:py-28 bg-navy dark:bg-cream text-cream dark:text-navy text-center transition-all duration-700 ease-out ${isCtaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      >
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-10 leading-tight">
            Ready to find your pair?
          </h2>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium bg-cream text-navy dark:bg-navy dark:text-cream rounded-full hover:opacity-90 transition-opacity shadow-lg"
          >
            Shop the collection <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
