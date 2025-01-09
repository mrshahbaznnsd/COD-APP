import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface AuthCallbackProps {
  // Add any props you need here
}

const AuthCallback: React.FC<AuthCallbackProps> = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    const hmac = new URLSearchParams(window.location.search).get('hmac');
    const timestamp = new URLSearchParams(window.location.search).get('timestamp');
    const shopDomain = new URLSearchParams(window.location.search).get('shop');

    // Verify the HMAC signature
    // This is a security measure to ensure the request is coming from Shopify
    // You can use the `crypto-js` library to verify the signature
    // For this example, we'll assume the verification is successful

    // Exchange the authorization code for an access token
    const exchangeToken = async () => {
      try {
        const response = await axios.post(`https://${shopDomain}/oauth/access_token`, {
          client_id: '765137b68ca7f605992d521c39116e5a',
          client_secret: '9cd7790357cd6e033168b3bf292645d7',
          code,
        });

        setAccessToken(response.data.access_token);
        setShop(shopDomain);
      } catch (error) {
        console.error(error);
      }
    };

    exchangeToken();
  }, []);

  if (accessToken && shop) {
    // Use the access token to make API calls to Shopify
    // For this example, we'll just display a success message
    return <div>Authorization successful! Access token: {accessToken}</div>;
  }

  return <div>Loading...</div>;
};

export default AuthCallback;