import { useState, useRef } from 'react';
import { X, UploadCloud } from 'lucide-react';

export default function ImageUpload({ images, onChange, onUpload }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    setUploading(true);
    const newUrls = [];
    
    for (const file of files) {
      try {
        const compressedBlob = await compressImage(file, 1200, 0.8);
        const url = await onUpload(compressedBlob);
        if (url) newUrls.push(url);
      } catch (err) {
        console.error('Upload failed', err);
      }
    }
    
    onChange([...images, ...newUrls]);
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  const moveImage = (index, direction) => {
    if (index + direction < 0 || index + direction >= images.length) return;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[index + direction];
    newImages[index + direction] = temp;
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((url, i) => (
          <div key={i} className="relative aspect-square rounded-xl bg-cream dark:bg-navy overflow-hidden border border-navy/10 dark:border-cream/10 group">
            <img src={url} alt={`Preview ${i}`} className="w-full h-full object-contain"  loading="lazy" decoding="async"/>
            <div className="absolute top-2 right-2 flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              {i > 0 && (
                <button type="button" onClick={() => moveImage(i, -1)} className="p-1.5 bg-black/50 rounded-md text-white hover:bg-black/80 min-h-[44px] min-w-[44px] flex items-center justify-center">
                  &lt;
                </button>
              )}
              {i < images.length - 1 && (
                <button type="button" onClick={() => moveImage(i, 1)} className="p-1.5 bg-black/50 rounded-md text-white hover:bg-black/80 min-h-[44px] min-w-[44px] flex items-center justify-center">
                  &gt;
                </button>
              )}
              <button type="button" onClick={() => removeImage(i)} className="p-1.5 bg-sold/80 rounded-md text-white hover:bg-sold min-h-[44px] min-w-[44px] flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
            {i === 0 && <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 text-white text-[10px] rounded uppercase font-bold tracking-wider pointer-events-none">Cover</div>}
          </div>
        ))}
        
        <label className={`aspect-square rounded-xl border-2 border-dashed border-navy/20 dark:border-cream/20 flex flex-col items-center justify-center cursor-pointer hover:bg-navy/5 dark:hover:bg-cream/5 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
          <UploadCloud className="w-8 h-8 text-navy/60 dark:text-cream/60 mb-2" />
          <span className="text-xs font-semibold text-navy/60 dark:text-cream/60">{uploading ? 'Uploading...' : 'Add Image'}</span>
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*" 
            multiple 
            onChange={handleFileChange} 
            className="hidden" 
            capture="environment"
          />
        </label>
      </div>
    </div>
  );
}

function compressImage(file, maxWidth, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/webp', quality);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
}
