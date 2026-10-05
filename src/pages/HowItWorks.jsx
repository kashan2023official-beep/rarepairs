import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: "What if the shoe doesn't fit?",
    a: "We list exact UK/US/EU sizes. If it still doesn't fit, you can return it within 3 days — but the Rs 500 deposit is not refunded for fit-related returns."
  },
  {
    q: "How do I know it's authentic?",
    a: "Every pair passes a 12-point authentication check and comes with an authenticity card. If you can prove a pair is fake, we refund 100% including deposit and shipping."
  },
  {
    q: "Can I see more photos before buying?",
    a: "Yes — message us on WhatsApp and we'll send additional angles or close-ups."
  },
  {
    q: "How long does delivery take?",
    a: "2–3 days for major cities, 3–5 days elsewhere."
  },
  {
    q: "Why the deposit?",
    a: "Fake and prank orders are common in Pakistan. The Rs 500 deposit commits serious buyers and lets us reserve the pair for you. It's applied to your final total — not an extra fee."
  }
];

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState(null);

  if (typeof document !== 'undefined') {
    document.title = 'How It Works | RarePairs';
  }

  return (
    <div className="bg-cream dark:bg-navy min-h-screen text-navy dark:text-cream font-sans transition-colors duration-300">
      
      {/* HERO */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 border-b border-navy/10 dark:border-cream/10">
        <div className="absolute inset-0 pointer-events-none hero-mesh-gradient opacity-30 dark:opacity-40"></div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Every pair, verified.<br/>Every order, protected.</h1>
          <p className="text-lg md:text-xl text-navy/80 dark:text-cream/80 max-w-2xl mx-auto">
            From the moment we source a pair to the moment it arrives at your door — here's exactly how RarePairs works.
          </p>
        </div>
      </section>

      {/* 01 AUTHENTICATION */}
      <section className="py-16 md:py-24 border-b border-navy/10 dark:border-cream/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="uppercase tracking-wider text-navy/60 dark:text-cream/60 text-xs font-bold mb-4 block">01 — Authentication</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">How we authenticate</h2>
            <p className="text-lg text-navy/80 dark:text-cream/80">Not every secondhand sneaker is worth your money. Here's how we make sure ours are.</p>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-xl mb-2">Step 1 — Sourcing</h3>
              <p className="text-navy/80 dark:text-cream/80">We source from verified resellers, trusted thrift markets, and private collectors across Pakistan. Every pair has a traceable origin before it reaches us.</p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">Step 2 — Multi-Point Inspection</h3>
              <p className="text-navy/80 dark:text-cream/80">Each pair goes through a 12-point check: stitching patterns, sole wear, insole branding, tongue tags, size tag fonts, lace quality, midsole integrity, and more. Fakes usually fail within the first 3 checks.</p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">Step 3 — Deep Clean & Restore</h3>
              <p className="text-navy/80 dark:text-cream/80">Every pair is professionally cleaned — uppers, midsoles, insoles, laces. Leather is conditioned. Suede is brushed. We only restore what preserves authenticity — no repainting, no fake aging.</p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">Step 4 — Photo Documentation</h3>
              <p className="text-navy/80 dark:text-cream/80">We photograph every pair from 4 angles: front, side, top, and sole. You see exactly what you're buying — no filters, no misleading angles.</p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">Step 5 — Condition Grade</h3>
              <p className="text-navy/80 dark:text-cream/80">We assign a score from 1–10. No exaggerations. A 7 is a 7. If there's creasing, discoloration, or a scuff, we tell you before you buy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 ORDERING */}
      <section className="py-16 md:py-24 border-b border-navy/10 dark:border-cream/10 bg-navy/5 dark:bg-cream/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-3xl mx-auto text-center">
            <span className="uppercase tracking-wider text-navy/60 dark:text-cream/60 text-xs font-bold mb-4 block">02 — Ordering</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">How to order</h2>
            <p className="text-lg text-navy/80 dark:text-cream/80">A simple 6-step flow from browsing to checkout.</p>
          </div>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-[2px] bg-navy/10 dark:bg-cream/10 md:-translate-x-1/2"></div>
            
            <div className="space-y-12 relative z-10">
              {/* Steps */}
              {[
                { title: "Browse the Collection", desc: "Filter by size, condition, brand, and price. Every pair is one-of-one, so if you see something you like, act fast." },
                { title: "Check the Details", desc: "Each product page shows real photos, condition grade, size (UK/US/EU), description, and delivery info." },
                { title: "Tap \"Buy on WhatsApp\"", desc: "No account needed. No lengthy checkout. Click the button and a short form opens." },
                { title: "Share Your Details", desc: "Name, phone, delivery address, and optional notes (e.g. \"prefer evening delivery\")." },
                { title: "Order Reaches Us Instantly", desc: "Your order arrives on our WhatsApp with full details. You'll get an email confirmation within seconds." },
                { title: "We Confirm Within 2 Hours", desc: "We reply on WhatsApp to confirm your order, share payment details, and give you a delivery estimate." }
              ].map((step, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row items-start ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Circle/Number */}
                  <div className="absolute left-0 md:left-1/2 w-14 h-14 bg-cream dark:bg-navy border-2 border-navy dark:border-cream rounded-full flex items-center justify-center font-heading text-xl font-bold md:-translate-x-1/2 z-20">
                    {idx + 1}
                  </div>
                  
                  {/* Content Box */}
                  <div className={`ml-20 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'} pt-2`}>
                    <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                    <p className="text-navy/80 dark:text-cream/80 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 DELIVERY */}
      <section className="py-16 md:py-24 border-b border-navy/10 dark:border-cream/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="uppercase tracking-wider text-navy/60 dark:text-cream/60 text-xs font-bold mb-4 block">03 — Delivery</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Delivery across Pakistan</h2>
            <p className="text-lg text-navy/80 dark:text-cream/80">We ship to every city in Pakistan.</p>
          </div>
          
          <div className="mb-12 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-navy/20 dark:border-cream/20">
                  <th className="py-4 pr-4 font-bold">Delivery zone</th>
                  <th className="py-4 px-4 font-bold">Time</th>
                  <th className="py-4 pl-4 font-bold text-right">Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/10 dark:divide-cream/10">
                <tr>
                  <td className="py-4 pr-4">Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar</td>
                  <td className="py-4 px-4 text-navy/80 dark:text-cream/80">2–3 business days</td>
                  <td className="py-4 pl-4 text-right">Rs 250</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4">All other cities</td>
                  <td className="py-4 px-4 text-navy/80 dark:text-cream/80">3–5 business days</td>
                  <td className="py-4 pl-4 text-right">Rs 350</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-medium">Orders over Rs 15,000</td>
                  <td className="py-4 px-4 text-navy/80 dark:text-cream/80">2–5 business days</td>
                  <td className="py-4 pl-4 text-right font-medium">Free</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="space-y-6 text-navy/80 dark:text-cream/80">
            <p><strong className="text-navy dark:text-cream">Packaging:</strong> Every pair ships in a protective box with bubble wrap, tissue paper, and an authenticity card. Original boxes are included when available.</p>
            <p><strong className="text-navy dark:text-cream">Tracking:</strong> You'll get WhatsApp updates at every stage — packed, shipped, out for delivery, delivered.</p>
          </div>
        </div>
      </section>

      {/* 04 PAYMENT */}
      <section className="py-16 md:py-24 border-b border-navy/10 dark:border-cream/10 bg-navy/5 dark:bg-cream/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="uppercase tracking-wider text-navy/60 dark:text-cream/60 text-xs font-bold mb-4 block">04 — Payment</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">Payment</h2>
            <p className="text-lg text-navy/80 dark:text-cream/80 font-medium">Cash on Delivery (COD) — with a Rs 500 deposit</p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <p className="font-medium text-amber-900 dark:text-amber-100 mb-4">
              To protect both you and us from fake orders, all COD orders require a Rs 500 advance deposit, paid via Easypaisa, JazzCash, or bank transfer.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-amber-800/90 dark:text-amber-200/90">
              <li>Deducted from your final total — you pay the balance on delivery</li>
              <li>Fully refundable if we cancel or can't fulfill your order</li>
              <li>Non-refundable if you cancel after dispatch or refuse delivery</li>
            </ul>
          </div>

          <div className="bg-cream dark:bg-navy border border-navy/10 dark:border-cream/10 p-6 rounded-lg mb-12 max-w-sm">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-navy/70 dark:text-cream/70">Sneaker price:</span>
                <span className="font-medium">Rs 12,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy/70 dark:text-cream/70">Shipping:</span>
                <span className="font-medium">Rs 250</span>
              </div>
              <div className="flex justify-between text-sold dark:text-sold-dark">
                <span>Deposit paid upfront:</span>
                <span className="font-medium">- Rs 500</span>
              </div>
              <div className="pt-3 border-t border-navy/10 dark:border-cream/10 flex justify-between font-bold text-base">
                <span>Pay on delivery:</span>
                <span>Rs 12,250</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-xl">Online Payment (Optional)</h3>
            <p className="text-navy/80 dark:text-cream/80">Prefer to pay in full upfront? Choose one of these:</p>
            <ul className="list-disc pl-5 space-y-2 text-navy/80 dark:text-cream/80">
              <li>Easypaisa</li>
              <li>JazzCash</li>
              <li>Bank transfer (Meezan, HBL, UBL)</li>
              <li>SadaPay / NayaPay</li>
            </ul>
            <p className="font-medium mt-4">Full prepayment gets you free shipping and priority dispatch.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 border-b border-navy/10 dark:border-cream/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-10 text-center">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-navy/10 dark:border-cream/10 rounded-lg overflow-hidden bg-white/50 dark:bg-navy/50 backdrop-blur-sm">
                <button 
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="font-medium pr-8">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-[500px] py-4 border-t border-navy/10 dark:border-cream/10' : 'max-h-0 py-0'}`}
                >
                  <p className="text-navy/80 dark:text-cream/80">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8">Ready to find your pair?</h2>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-cream bg-navy dark:text-navy dark:bg-cream rounded-full hover:bg-navy/90 dark:hover:bg-cream/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Shop the collection <span className="ml-2">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
