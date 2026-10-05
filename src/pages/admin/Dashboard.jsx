import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Edit2, Trash2, Plus, Search, Check, X } from 'lucide-react';
import Badge from '../../components/ui/Badge';

export default function Dashboard() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin_products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const { error } = await supabase.from('products').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin_products'] })
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin_products'] })
  });

  const filteredProducts = products?.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-3xl font-bold text-navy dark:text-cream">Inventory</h1>
        <div className="flex flex-wrap gap-4 items-center">
          <Link to="/admin/orders" className="text-sm font-semibold text-navy/70 hover:text-navy dark:text-cream/70 dark:hover:text-cream underline min-h-[44px] flex items-center">
            View Orders
          </Link>
          <Link to="/admin/products/new" className="inline-flex items-center justify-center gap-2 px-6 min-h-[44px] rounded-full font-bold bg-navy text-cream hover:bg-navy/90 dark:bg-cream dark:text-navy dark:hover:bg-cream/90 transition-colors">
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/60 dark:text-cream/60" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg pl-10 pr-4 py-2.5 min-h-[44px] text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-transparent border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-2.5 min-h-[44px] text-navy dark:text-cream focus:ring-1 focus:ring-navy dark:focus:ring-cream outline-none cursor-pointer"
        >
          <option value="All" className="bg-cream dark:bg-navy-card">All Statuses</option>
          <option value="available" className="bg-cream dark:bg-navy-card">Available</option>
          <option value="sold" className="bg-cream dark:bg-navy-card">Sold</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-navy/50 dark:text-cream/50">Loading inventory...</div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white dark:bg-navy-card rounded-xl border border-navy/10 dark:border-cream/10 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy/5 dark:bg-cream/5 border-b border-navy/10 dark:border-cream/10">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70">Product</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70">Size</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70">Price</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70">Status</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/5 dark:divide-cream/5">
                {filteredProducts?.map(p => (
                  <tr key={p.id} className="hover:bg-navy/5 dark:hover:bg-cream/5 transition-colors">
                    <td className="p-4 flex items-center gap-4">
                      <img src={p.images?.[0] || 'https://placehold.co/100'} alt={p.name} className="w-12 h-12 rounded object-contain bg-cream/50 dark:bg-navy/50"  loading="lazy" decoding="async"/>
                      <div>
                        <p className="font-semibold text-navy dark:text-cream">{p.name}</p>
                        <p className="text-xs text-navy/50 dark:text-cream/50">{p.condition}</p>
                      </div>
                    </td>
                    <td className="p-4 text-navy dark:text-cream">UK {p.size_uk}</td>
                    <td className="p-4 font-medium text-navy dark:text-cream">
                      {new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(p.price)}
                    </td>
                    <td className="p-4">
                      <Badge type={p.status}>{p.status}</Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleStatusMutation.mutate({ id: p.id, newStatus: p.status === 'available' ? 'sold' : 'available' })}
                          className="min-h-[44px] min-w-[44px] rounded text-navy/50 hover:text-navy hover:bg-navy/10 dark:text-cream/50 dark:hover:text-cream dark:hover:bg-cream/10 transition-colors flex items-center justify-center"
                          title={p.status === 'available' ? 'Mark Sold' : 'Mark Available'}
                        >
                          {p.status === 'available' ? <X className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                        </button>
                        <Link to={`/admin/products/${p.id}/edit`} className="min-h-[44px] min-w-[44px] rounded text-navy/50 hover:text-navy hover:bg-navy/10 dark:text-cream/50 dark:hover:text-cream dark:hover:bg-cream/10 transition-colors flex items-center justify-center">
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(p.id, p.name)}
                          className="min-h-[44px] min-w-[44px] rounded text-sold hover:bg-sold/10 dark:text-sold-dark dark:hover:bg-sold-dark/10 transition-colors flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredProducts?.map(p => (
              <div key={p.id} className="bg-white dark:bg-navy-card p-4 rounded-xl border border-navy/10 dark:border-cream/10 flex gap-4">
                <img src={p.images?.[0] || 'https://placehold.co/100'} alt={p.name} className="w-20 h-20 rounded-lg object-contain bg-cream/50 dark:bg-navy/50"  loading="lazy" decoding="async"/>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-navy dark:text-cream truncate">{p.name}</h3>
                  <p className="text-sm text-navy/60 dark:text-cream/60 mt-1">UK {p.size_uk} • Rs {p.price}</p>
                  <div className="mt-2"><Badge type={p.status}>{p.status}</Badge></div>
                </div>
                <div className="flex flex-col gap-2 justify-between">
                  <Link to={`/admin/products/${p.id}/edit`} className="rounded bg-navy/5 text-navy dark:bg-cream/5 dark:text-cream text-center min-h-[44px] min-w-[44px] flex items-center justify-center">
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => toggleStatusMutation.mutate({ id: p.id, newStatus: p.status === 'available' ? 'sold' : 'available' })}
                    className="rounded bg-navy/5 text-navy dark:bg-cream/5 dark:text-cream min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    {p.status === 'available' ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
