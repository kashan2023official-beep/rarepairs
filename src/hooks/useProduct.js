import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useProduct(slug) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, slug, description, price, compare_at_price, size_uk, size_us, size_eu, condition, condition_score, category, brand, status, is_rare, images, tags')
        .eq('slug', slug)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}
