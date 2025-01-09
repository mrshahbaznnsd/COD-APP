import { register } from "@shopify/web-pixels-extension";

register(({ configuration, analytics, browser }) => {
  // Listen for app bridge messages
  window.addEventListener('message', (event) => {
    if (event.data.type === 'showCODForm') {
      const { productId, variantId } = event.data;
      
      // Create modal container if it doesn't exist
      let modalContainer = document.getElementById('cod-modal-container');
      if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'cod-modal-container';
        document.body.appendChild(modalContainer);
      }

      // Load and show the COD form
      const formUrl = `${configuration.appUrl}/cod-form?productId=${productId}&variantId=${variantId}`;
      
      // Create modal iframe
      const iframe = document.createElement('iframe');
      iframe.src = formUrl;
      iframe.style.position = 'fixed';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      iframe.style.zIndex = '9999';
      
      modalContainer.innerHTML = '';
      modalContainer.appendChild(iframe);
    }
  });
});