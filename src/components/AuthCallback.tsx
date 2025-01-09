import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as crypto from 'crypto';

interface AuthCallbackProps {
  // Add any props you need here
}

const AuthCallback: React.FC<AuthCallbackProps> = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [shop, setShop] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    const hmac = new URLSearchParams(window.location.search).get('hmac');
    const timestamp = new URLSearchParams(window.location.search).get('timestamp');
    const shopDomain = new URLSearchParams(window.location.search).get('shop');

    if (!code || !hmac || !shopDomain || !timestamp) {
      setError('Missing required query parameters.');
      return;
    }

    // Function to verify HMAC signature
    const verifyHmac = (hmac: string, params: URLSearchParams) => {
      const secret = '9cd7790357cd6e033168b3bf292645d7'; // Your Shopify secret key
      const queryString = params
        .toString()
        .split('&')
        .filter((param) => param.split('=')[0] !== 'hmac') // Exclude hmac from the query string
        .join('&');

      const calculatedHmac = crypto
        .createHmac('sha256', secret)
        .update(queryString)
        .digest('hex');

      return hmac === calculatedHmac;
    };

    // Verify the HMAC signature
    if (!verifyHmac(hmac, new URLSearchParams(window.location.search))) {
      setError('Invalid HMAC signature.');
      return;
    }

    // Exchange the authorization code for an access token
    const exchangeToken = async () => {
      try {
        const response = await axios.post(`https://${shopDomain}/admin/oauth/access_token`, {
          client_id: '765137b68ca7f605992d521c39116e5a',
          client_secret: '9cd7790357cd6e033168b3bf292645d7',
          code,
        });

        setAccessToken(response.data.access_token);
        setShop(shopDomain);
      } catch (error) {
        setError('Failed to exchange token: ' + error.message);
        console.error(error);
      }
    };

    exchangeToken();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (accessToken && shop) {
    // Use the access token to make API calls to Shopify
    // For this example, we'll just display a success message
    return <div>Authorization successful! Access token: {accessToken}</div>;
  }

  return <div>Loading...</div>;
};

export default AuthCallback;
