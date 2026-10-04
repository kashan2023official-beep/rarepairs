import { useState } from 'react';

export default function ProductGallery({ images = [], alt }) {
  const [mainImage, setMainImage] = useState(images[0] || 'https://placehold.co/600x600/F4F1EA/1A2B42?text=No+Image');

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square bg-white dark:bg-navy-card border border-navy/5 dark:border-cream/10 rounded-2xl overflow-hidden p-8">
        <img src={mainImage} alt={alt} className="w-full h-full object-contain"  loading="lazy" decoding="async"/>
      </div>
      
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button 
              key={idx} 
              onClick={() => setMainImage(img)}
              className={`aspect-square bg-white dark:bg-navy-card border rounded-xl overflow-hidden p-2 transition-colors ${
                mainImage === img 
                  ? 'border-navy dark:border-cream' 
                  : 'border-navy/5 dark:border-cream/10 hover:border-navy/30 dark:hover:border-cream/30'
              }`}
            >
              <img src={img} alt={`${alt} view ${idx + 1}`} className="w-full h-full object-contain"  loading="lazy" decoding="async"/>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
