const { createClient } = require('@supabase/supabase-js');
const { z } = require('zod');
const { Resend } = require('resend');

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

const checkoutSchema = z.object({
  product_id: z.string().uuid(),
  customer_name: z.string().min(1),
  customer_email: z.string().email(),
  customer_phone: z.string().min(10),
  customer_address: z.string().min(10),
  notes: z.string().optional(),
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const validatedData = checkoutSchema.parse(body);
    
    // Fetch product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', validatedData.product_id)
      .single();
      
    if (productError || !product) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Product not found' }) };
    }
    
    // Check if available
    if (product.status !== 'available') {
      return { statusCode: 409, body: JSON.stringify({ error: 'Product already sold' }) };
    }
    
    // Mark sold (optimistic lock)
    const { data: updatedProduct, error: updateError } = await supabase
      .from('products')
      .update({ status: 'sold' })
      .eq('id', product.id)
      .eq('status', 'available')
      .select()
      .single();
      
    if (updateError || !updatedProduct) {
      return { statusCode: 409, body: JSON.stringify({ error: 'Product already sold' }) };
    }
    
    // Create order row
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        product_id: product.id,
        customer_name: validatedData.customer_name,
        customer_email: validatedData.customer_email,
        customer_phone: validatedData.customer_phone,
        customer_address: validatedData.customer_address,
        notes: validatedData.notes || '',
        amount: product.price,
        status: 'pending'
      })
      .select()
      .single();
      
    if (orderError) {
      console.error('Order creation failed:', orderError);
    }
    
    const orderId = order ? order.id : 'unknown';

    // Build wa.me URL
    const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER || '910000000000';
    const message = `🛒 New Order — RarePairs

Product: ${product.name}
Size: UK ${product.size_uk}
Price: Rs ${product.price}

Customer: ${validatedData.customer_name}
Phone: ${validatedData.customer_phone}
Email: ${validatedData.customer_email}
Address: ${validatedData.customer_address}
Notes: ${validatedData.notes || 'None'}

Order ID: ${orderId}`;

    const whatsapp_url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;

    // Send email via Resend
    try {
      if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'leave_blank_for_now') {
        await resend.emails.send({
          from: process.env.FROM_EMAIL || 'orders@rarepairs.com',
          to: validatedData.customer_email,
          bcc: process.env.ADMIN_EMAIL || 'admin@rarepairs.com',
          subject: `Your RarePairs order — ${product.name}`,
          html: `
            <div style="font-family: 'Inter', sans-serif; background-color: #F4F1EA; color: #1A2B42; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 8px;">
              <h1 style="font-family: 'Pacifico', cursive; margin-bottom: 24px;">RarePairs</h1>
              <h2>Order Confirmed!</h2>
              <p>Hi ${validatedData.customer_name},</p>
              <p>We've received your order for the <strong>${product.name}</strong>.</p>
              <div style="background-color: #FFFFFF; padding: 20px; border-radius: 8px; margin: 24px 0;">
                <p style="margin: 0;"><strong>Size:</strong> UK ${product.size_uk}</p>
                <p style="margin: 8px 0 0 0;"><strong>Price:</strong> Rs ${product.price}</p>
              </div>
              <p>We'll confirm with you on WhatsApp shortly to arrange payment and shipping.</p>
              <p>Thanks for giving this pair a second chance!</p>
              <br>
              <p style="font-size: 12px; opacity: 0.7;">Order ID: ${orderId}</p>
            </div>
          `
        });
      }
    } catch (emailError) {
      console.error('Failed to send email via Resend:', emailError);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ order_id: orderId, whatsapp_url })
    };

  } catch (err) {
    console.error(err);
    if (err instanceof z.ZodError) {
      return { statusCode: 400, body: JSON.stringify({ error: err.errors }) };
    }
    return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
  }
};
