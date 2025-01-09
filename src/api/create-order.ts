import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

export async function createOrder(shopDomain: string, accessToken: string, orderData: any) {
  const client = new shopifyApi({
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: true,
    hostName: shopDomain,
    apiKey: process.env.SHOPIFY_API_KEY!,
    apiSecretKey: process.env.SHOPIFY_API_SECRET!,
  });

  const order = {
    line_items: [
      {
        variant_id: orderData.variantId,
        quantity: 1,
      },
    ],
    customer: {
      first_name: orderData.fullName.split(' ')[0],
      last_name: orderData.fullName.split(' ').slice(1).join(' '),
      email: 'cod@example.com', // You might want to make this optional
      phone: orderData.phone,
    },
    shipping_address: {
      address1: orderData.address,
      city: orderData.city,
      first_name: orderData.fullName.split(' ')[0],
      last_name: orderData.fullName.split(' ').slice(1).join(' '),
      phone: orderData.phone,
    },
    financial_status: 'pending',
    payment_gateway_names: ['cash_on_delivery'],
    note: orderData.notes,
    tags: ['COD'],
  };

  try {
    const response = await client.rest.post({
      path: 'orders',
      data: { order },
    });

    return response.body;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}