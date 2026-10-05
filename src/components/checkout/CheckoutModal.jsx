import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, CheckCircle2, Loader2, ArrowRight, Info } from 'lucide-react';

const checkoutSchema = z.object({
  customer_name: z.string().min(1, 'Name is required'),
  customer_email: z.string().email('Valid email is required'),
  customer_phone: z.string().regex(/^(\+92|0)?3\d{9}$/, 'Please enter a valid Pakistani phone number (+92 3XX XXXXXXX)'),
  customer_address: z.string().min(10, 'Address must be at least 10 characters'),
  notes: z.string().optional(),
});

export default function CheckoutModal({ isOpen, onClose, product }) {
  const [status, setStatus] = useState('idle'); // idle, submitting, success, sold
  const [whatsappUrl, setWhatsappUrl] = useState(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema)
  });

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: product.id, ...data }),
      });
      
      if (res.status === 409) {
        setStatus('sold');
        return;
      }
      
      if (!res.ok) {
        throw new Error('Failed to submit order');
      }

      const responseData = await res.json();
      setWhatsappUrl(responseData.whatsapp_url);
      setStatus('success');
      
      setTimeout(() => {
        window.open(responseData.whatsapp_url, '_blank');
      }, 800);
      
    } catch (error) {
      console.error(error);
      setStatus('idle');
      alert('An error occurred. Please try again.');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && status !== 'submitting') {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-navy/60 dark:bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={handleBackdropClick}
    >
      <div className="w-full md:w-[500px] md:max-w-[90vw] bg-cream dark:bg-navy-card md:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up md:animate-fade-in relative border border-navy/10 dark:border-cream/10">
        
        <div className="flex justify-between items-center p-5 md:p-6 border-b border-navy/10 dark:border-cream/10 shrink-0">
          <h2 className="font-display text-2xl font-bold text-navy dark:text-cream">
            {status === 'success' ? 'Order Sent!' : status === 'sold' ? 'Already Sold' : 'Checkout'}
          </h2>
          <button aria-label="Close"  
            onClick={onClose}
            disabled={status === 'submitting'}
            className="text-navy/50 hover:text-navy dark:text-cream/50 dark:hover:text-cream transition-colors disabled:opacity-50"
          ><X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-5 md:p-6 overflow-y-auto">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-available dark:text-available-dark mx-auto mb-6" />
              <p className="text-navy dark:text-cream text-lg mb-8">
                Your order details have been saved. Check WhatsApp to confirm with us.
              </p>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-full font-bold bg-navy text-cream hover:bg-navy/90 dark:bg-cream dark:text-navy dark:hover:bg-cream/90 transition-colors"
              >
                Open WhatsApp <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          ) : status === 'sold' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-sold/10 dark:bg-sold-dark/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <X className="w-8 h-8 text-sold dark:text-sold-dark" />
              </div>
              <h3 className="text-xl font-bold text-navy dark:text-cream mb-2">Sorry, this pair just sold</h3>
              <p className="text-navy/70 dark:text-cream/70 mb-8">
                Someone else beat you to it. Don't worry, we add new curated pairs regularly.
              </p>
              <button 
                onClick={onClose}
                className="w-full py-4 rounded-full font-bold bg-navy text-cream hover:bg-navy/90 dark:bg-cream dark:text-navy dark:hover:bg-cream/90 transition-colors"
              >
                Browse Similar Pairs
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-4 p-4 mb-6 bg-cream dark:bg-navy rounded-xl border border-navy/5 dark:border-cream/5">
                <img src={product.images[0]} alt={product.name} className="w-16 h-16 rounded object-contain bg-cream/50"  loading="lazy" decoding="async"/>
                <div>
                  <h4 className="font-semibold text-navy dark:text-cream text-sm">{product.name}</h4>
                  <p className="text-xs text-navy/60 dark:text-cream/60 mt-1">UK {product.size_uk} • {product.condition}</p>
                  <p className="font-bold text-navy dark:text-cream mt-1">
                    {new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(product.price)}
                  </p>
                </div>
              </div>

              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="customer_name" className="block text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70 mb-1">Name *</label>
                  <input 
                    id="customer_name"
                    {...register('customer_name')}
                    className={`w-full bg-transparent border rounded-lg px-4 py-3 text-navy dark:text-cream focus:ring-1 outline-none transition-colors ${errors.customer_name ? 'border-sold dark:border-sold-dark focus:ring-sold' : 'border-navy/20 dark:border-cream/20 focus:ring-navy dark:focus:ring-cream'}`}
                    placeholder="Jane Doe"
                  />
                  {errors.customer_name && <p className="text-sold dark:text-sold-dark text-xs mt-1">{errors.customer_name.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="customer_email" className="block text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70 mb-1">Email *</label>
                  <input 
                    id="customer_email"
                    type="email"
                    {...register('customer_email')}
                    className={`w-full bg-transparent border rounded-lg px-4 py-3 text-navy dark:text-cream focus:ring-1 outline-none transition-colors ${errors.customer_email ? 'border-sold dark:border-sold-dark focus:ring-sold' : 'border-navy/20 dark:border-cream/20 focus:ring-navy dark:focus:ring-cream'}`}
                    placeholder="jane@example.com"
                  />
                  {errors.customer_email && <p className="text-sold dark:text-sold-dark text-xs mt-1">{errors.customer_email.message}</p>}
                </div>

                <div>
                  <label htmlFor="customer_phone" className="block text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70 mb-1">Phone *</label>
                  <input 
                    id="customer_phone"
                    type="tel"
                    {...register('customer_phone')}
                    className={`w-full bg-transparent border rounded-lg px-4 py-3 text-navy dark:text-cream focus:ring-1 outline-none transition-colors ${errors.customer_phone ? 'border-sold dark:border-sold-dark focus:ring-sold' : 'border-navy/20 dark:border-cream/20 focus:ring-navy dark:focus:ring-cream'}`}
                    placeholder="+92 3XX XXXXXXX"
                  />
                  {errors.customer_phone && <p className="text-sold dark:text-sold-dark text-xs mt-1">{errors.customer_phone.message}</p>}
                </div>

                <div>
                  <label htmlFor="customer_address" className="block text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70 mb-1">Shipping Address *</label>
                  <textarea 
                    id="customer_address"
                    {...register('customer_address')}
                    rows={2}
                    className={`w-full bg-transparent border rounded-lg px-4 py-3 text-navy dark:text-cream focus:ring-1 outline-none transition-colors resize-none ${errors.customer_address ? 'border-sold dark:border-sold-dark focus:ring-sold' : 'border-navy/20 dark:border-cream/20 focus:ring-navy dark:focus:ring-cream'}`}
                    placeholder="Full address with city / postal code"
                  />
                  {errors.customer_address && <p className="text-sold dark:text-sold-dark text-xs mt-1">{errors.customer_address.message}</p>}
                </div>

                <div>
                  <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70 mb-1">Notes (Optional)</label>
                  <input 
                    id="notes"
                    {...register('notes')}
                    className="w-full bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-3 text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none transition-colors"
                    placeholder="Any special instructions"
                  />
                </div>
              </form>
            </>
          )}
        </div>

        {status === 'idle' && (
          <div className="p-5 md:p-6 border-t border-navy/10 dark:border-cream/10 bg-navy/5 dark:bg-cream/5 shrink-0">
            <p className="text-xs text-navy/60 dark:text-cream/60 text-center mt-3 mb-2">
              <Info className="w-3 h-3 inline-block mr-1" />
              Cash on Delivery orders require a Rs 500 advance deposit — adjusted against your final total.
            </p>
            <button 
              type="submit"
              form="checkout-form"
              className="w-full py-4 rounded-full font-bold bg-navy text-cream hover:bg-navy/90 dark:bg-cream dark:text-navy dark:hover:bg-cream/90 transition-colors flex items-center justify-center"
            >
              Confirm & Continue to WhatsApp
            </button>
          </div>
        )}
        
        {status === 'submitting' && (
          <div className="p-5 md:p-6 border-t border-navy/10 dark:border-cream/10 bg-navy/5 dark:bg-cream/5 shrink-0">
            <button 
              disabled
              className="w-full py-4 rounded-full font-bold bg-navy/50 text-cream dark:bg-cream/50 dark:text-navy cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Loader2 className="w-5 h-5 animate-spin" /> Processing...
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
