import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import Badge from '../../components/ui/Badge';

export default function Orders() {
  const [expandedId, setExpandedId] = useState(null);
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['admin_orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`*, product:products(name, size_uk)`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const { error } = await supabase.from('orders').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin_orders'] })
  });

  const formatWhatsAppMessage = (order) => {
    return encodeURIComponent(`Hi ${order.customer_name},\n\nThis is an update regarding your order for the ${order.product?.name}.\n\nYour order status is now: ${order.status}.\n\nLet me know if you have any questions!`);
  };

  if (isLoading) return <div className="p-20 text-center text-navy/50 dark:text-cream/50">Loading orders...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/dashboard" className="p-2 rounded-full hover:bg-navy/5 dark:hover:bg-cream/5 text-navy dark:text-cream min-h-[44px] min-w-[44px] flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-display text-3xl font-bold text-navy dark:text-cream">Orders</h1>
      </div>

      <div className="bg-cream dark:bg-navy-card rounded-xl border border-navy/10 dark:border-cream/10 overflow-hidden">
        <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-navy/5 dark:bg-cream/5 border-b border-navy/10 dark:border-cream/10 text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70">
          <div>Date</div>
          <div className="col-span-2">Customer & Product</div>
          <div>Amount</div>
          <div>Status</div>
          <div></div>
        </div>

        <div className="divide-y divide-navy/5 dark:divide-cream/5">
          {orders?.map(order => (
            <div key={order.id} className="flex flex-col">
              {/* Row Header */}
              <div 
                className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 items-center hover:bg-navy/5 dark:hover:bg-cream/5 transition-colors cursor-pointer"
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
              >
                <div className="text-sm text-navy/70 dark:text-cream/70 hidden md:block">
                  {new Date(order.created_at).toLocaleDateString()}
                </div>
                
                <div className="md:col-span-2 min-w-0">
                  <div className="flex justify-between md:hidden mb-1">
                    <span className="text-xs text-navy/50">{new Date(order.created_at).toLocaleDateString()}</span>
                    <Badge type={order.status === 'pending' ? 'rare' : order.status === 'cancelled' ? 'sold' : 'available'}>{order.status}</Badge>
                  </div>
                  <h3 className="font-bold text-navy dark:text-cream truncate">{order.customer_name}</h3>
                  <p className="text-sm text-navy/70 dark:text-cream/70 truncate">{order.product?.name || 'Unknown Product'}</p>
                </div>
                
                <div className="font-medium text-navy dark:text-cream hidden md:block">
                  Rs {order.amount}
                </div>
                
                <div className="hidden md:block">
                  <select 
                    value={order.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateStatusMutation.mutate({ id: order.id, status: e.target.value });
                    }}
                    onClick={e => e.stopPropagation()}
                    className="bg-transparent border border-navy/20 dark:border-cream/20 rounded px-2 py-1 min-h-[44px] text-sm text-navy dark:text-cream outline-none cursor-pointer w-full max-w-[140px]"
                  >
                    <option value="pending" className="bg-cream dark:bg-navy-card">Pending</option>
                    <option value="confirmed" className="bg-cream dark:bg-navy-card">Confirmed</option>
                    <option value="shipped" className="bg-cream dark:bg-navy-card">Shipped</option>
                    <option value="delivered" className="bg-cream dark:bg-navy-card">Delivered</option>
                    <option value="cancelled" className="bg-cream dark:bg-navy-card">Cancelled</option>
                  </select>
                </div>
                
                <div className="flex justify-end hidden md:flex text-navy/50 dark:text-cream/50">
                  <button className="min-h-[44px] min-w-[44px] flex items-center justify-center">{expandedId === order.id ? <ChevronUp /> : <ChevronDown />}</button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === order.id && (
                <div className="p-4 md:p-6 bg-navy/5 dark:bg-cream/5 border-t border-navy/5 dark:border-cream/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70 mb-3">Customer Details</h4>
                    <div className="space-y-2 text-sm text-navy dark:text-cream">
                      <p><span className="font-semibold w-20 inline-block">Name:</span> {order.customer_name}</p>
                      <p><span className="font-semibold w-20 inline-block">Email:</span> {order.customer_email}</p>
                      <p><span className="font-semibold w-20 inline-block">Phone:</span> {order.customer_phone}</p>
                      <p className="flex"><span className="font-semibold w-20 inline-block shrink-0">Address:</span> <span>{order.customer_address}</span></p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-navy/70 dark:text-cream/70 mb-3">Order Details</h4>
                    <div className="space-y-2 text-sm text-navy dark:text-cream mb-6">
                      <p><span className="font-semibold w-20 inline-block">Amount:</span> Rs {order.amount}</p>
                      <p><span className="font-semibold w-20 inline-block">Size:</span> UK {order.product?.size_uk}</p>
                      <p><span className="font-semibold w-20 inline-block">Notes:</span> {order.notes || 'None'}</p>
                      <div className="md:hidden mt-4">
                        <span className="font-semibold block mb-1">Status:</span>
                        <select 
                          value={order.status}
                          onChange={(e) => updateStatusMutation.mutate({ id: order.id, status: e.target.value })}
                          className="bg-transparent border border-navy/20 dark:border-cream/20 rounded px-2 py-1 min-h-[44px] text-sm text-navy dark:text-cream outline-none w-full"
                        >
                          <option value="pending" className="bg-cream dark:bg-navy-card">Pending</option>
                          <option value="confirmed" className="bg-cream dark:bg-navy-card">Confirmed</option>
                          <option value="shipped" className="bg-cream dark:bg-navy-card">Shipped</option>
                          <option value="delivered" className="bg-cream dark:bg-navy-card">Delivered</option>
                          <option value="cancelled" className="bg-cream dark:bg-navy-card">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    
                    <a 
                      href={`https://wa.me/${order.customer_phone.replace(/\D/g, '')}?text=${formatWhatsAppMessage(order)}`}
                      target="_blank" rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 min-h-[44px] rounded-full font-bold bg-[#25D366] text-cream hover:bg-[#128C7E] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" /> Open in WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
          {(!orders || orders.length === 0) && (
            <div className="p-8 text-center text-navy/50 dark:text-cream/50">No orders found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
