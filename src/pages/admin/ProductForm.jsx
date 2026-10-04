import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../../lib/supabase';
import ImageUpload from '../../components/admin/ImageUpload';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: { status: 'available', is_rare: false, condition: 'New' }
  });
  
  const nameValue = watch('name');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  useEffect(() => {
    if (isEdit) {
      supabase.from('products').select('*').eq('id', id).single().then(({ data, error }) => {
        if (data) {
          reset(data);
          setImages(data.images || []);
          setTags(data.tags || []);
          setSlugManuallyEdited(true); // Don't auto-update existing slugs
        }
        setLoading(false);
      });
    }
  }, [id, isEdit, reset]);

  useEffect(() => {
    if (nameValue && !slugManuallyEdited) {
      setValue('slug', nameValue.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  }, [nameValue, slugManuallyEdited, setValue]);

  const uploadImage = async (blob) => {
    const fileName = `${id || 'new'}/${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
    const { data, error } = await supabase.storage.from('product-images').upload(fileName, blob, {
      contentType: 'image/webp'
    });
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName);
    return publicUrl;
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = {
        ...data,
        images,
        tags,
        price: parseFloat(data.price),
        compare_at_price: data.compare_at_price ? parseFloat(data.compare_at_price) : null,
        condition_score: data.condition_score ? parseInt(data.condition_score) : null,
        updated_at: new Date().toISOString(),
      };

      if (isEdit) {
        const { error } = await supabase.from('products').update(payload).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([payload]);
        if (error) throw error;
      }
      
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to save product: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  if (loading) return <div className="p-8 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto text-navy dark:text-cream" /></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/dashboard" className="p-2 rounded-full hover:bg-navy/5 dark:hover:bg-cream/5 text-navy dark:text-cream min-h-[44px] min-w-[44px] flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-display text-3xl font-bold text-navy dark:text-cream">
          {isEdit ? 'Edit Product' : 'Add Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Images */}
        <div className="bg-white dark:bg-navy-card p-6 rounded-xl border border-navy/10 dark:border-cream/10">
          <h2 className="text-lg font-bold text-navy dark:text-cream mb-4">Images</h2>
          <ImageUpload images={images} onChange={setImages} onUpload={uploadImage} />
        </div>

        {/* Basic Info */}
        <div className="bg-white dark:bg-navy-card p-6 rounded-xl border border-navy/10 dark:border-cream/10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase text-navy/70 dark:text-cream/70 mb-2">Name *</label>
            <input {...register('name', { required: true })} className="w-full bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-3 min-h-[44px] text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase text-navy/70 dark:text-cream/70 mb-2">Slug *</label>
            <input 
              {...register('slug', { required: true })} 
              onChange={(e) => {
                setSlugManuallyEdited(true);
                setValue('slug', e.target.value);
              }}
              className="w-full bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-3 min-h-[44px] text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none" 
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase text-navy/70 dark:text-cream/70 mb-2">Description</label>
            <textarea {...register('description')} rows={4} className="w-full bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-3 text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none resize-none" />
          </div>
        </div>

        {/* Pricing & Status */}
        <div className="bg-white dark:bg-navy-card p-6 rounded-xl border border-navy/10 dark:border-cream/10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase text-navy/70 dark:text-cream/70 mb-2">Price (₹) *</label>
            <input type="number" {...register('price', { required: true })} className="w-full bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-3 min-h-[44px] text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-navy/70 dark:text-cream/70 mb-2">Compare at Price (₹)</label>
            <input type="number" {...register('compare_at_price')} className="w-full bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-3 min-h-[44px] text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-navy/70 dark:text-cream/70 mb-2">Status</label>
            <select {...register('status')} className="w-full bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-3 min-h-[44px] text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none">
              <option value="available" className="bg-cream dark:bg-navy-card">Available</option>
              <option value="sold" className="bg-cream dark:bg-navy-card">Sold</option>
              <option value="reserved" className="bg-cream dark:bg-navy-card">Reserved</option>
            </select>
          </div>
          <div className="flex items-center mt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" {...register('is_rare')} className="w-5 h-5 min-h-[44px] min-w-[44px] m-0" />
              <span className="text-navy dark:text-cream font-bold">Mark as Rare Find</span>
            </label>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white dark:bg-navy-card p-6 rounded-xl border border-navy/10 dark:border-cream/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase text-navy/70 dark:text-cream/70 mb-2">Size UK *</label>
            <input {...register('size_uk', { required: true })} className="w-full bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-3 min-h-[44px] text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-navy/70 dark:text-cream/70 mb-2">Size US</label>
            <input {...register('size_us')} className="w-full bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-3 min-h-[44px] text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-navy/70 dark:text-cream/70 mb-2">Size EU</label>
            <input {...register('size_eu')} className="w-full bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-3 min-h-[44px] text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-navy/70 dark:text-cream/70 mb-2">Condition *</label>
            <select {...register('condition')} className="w-full bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-3 min-h-[44px] text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none">
              <option value="New" className="bg-cream dark:bg-navy-card">New</option>
              <option value="Like New" className="bg-cream dark:bg-navy-card">Like New</option>
              <option value="Good" className="bg-cream dark:bg-navy-card">Good</option>
              <option value="Fair" className="bg-cream dark:bg-navy-card">Fair</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-navy/70 dark:text-cream/70 mb-2">Condition Score (1-10)</label>
            <input type="number" min="1" max="10" {...register('condition_score')} className="w-full bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-3 min-h-[44px] text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-navy/70 dark:text-cream/70 mb-2">Brand</label>
            <input {...register('brand')} className="w-full bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-3 min-h-[44px] text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none" />
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-bold uppercase text-navy/70 dark:text-cream/70 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((t, idx) => (
                <span key={idx} className="bg-navy/10 dark:bg-cream/10 px-3 py-1 rounded-full text-sm flex items-center gap-1 text-navy dark:text-cream">
                  {t} <button type="button" onClick={() => setTags(tags.filter((_, i) => i !== idx))} className="min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                value={tagInput} 
                onChange={e => setTagInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && addTag(e)}
                placeholder="Add a tag..."
                className="flex-1 bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-3 min-h-[44px] text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none" 
              />
              <button type="button" onClick={addTag} className="px-6 rounded-lg font-bold bg-navy text-cream dark:bg-cream dark:text-navy min-h-[44px]">Add</button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="fixed bottom-0 inset-x-0 p-4 bg-cream/95 dark:bg-navy/95 backdrop-blur border-t border-navy/10 dark:border-cream/10 z-40 flex justify-end">
          <button 
            type="submit" 
            disabled={saving}
            className="w-full md:w-auto px-12 py-3 min-h-[44px] rounded-full font-bold bg-available text-white hover:bg-available/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : (isEdit ? 'Save Changes' : 'Create Product')}
          </button>
        </div>
      </form>
    </div>
  );
}
