import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2024-01';

const shopify = shopifyApi({
  apiKey: '765137b68ca7f605992d521c39116e5a',
  apiSecretKey: '9cd7790357cd6e033168b3bf292645d7',
  scopes: ['write_orders', 'write_products', 'read_products'],
  hostName: 'https://codnns.netlify.app',
  apiVersion: '2024-01',
  isEmbeddedApp: true,
  restResources,
});

export default shopify;