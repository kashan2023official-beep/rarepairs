import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useProducts(filters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('id, name, slug, description, price, compare_at_price, size_uk, size_us, size_eu, condition, condition_score, category, brand, status, is_rare, images, tags');
      
      if (filters.status && filters.status !== 'All') {
        query = query.eq('status', filters.status.toLowerCase());
      } else if (!filters.status) {
        query = query.eq('status', 'available');
      }
      
      if (filters.condition && filters.condition !== 'All') {
        query = query.eq('condition', filters.condition);
      }
      
      if (filters.sizes && filters.sizes.length > 0) {
        query = query.in('size_uk', filters.sizes);
      }

      if (filters.sort === 'Price: Low to High') {
        query = query.order('price', { ascending: true });
      } else if (filters.sort === 'Price: High to Low') {
        query = query.order('price', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}
