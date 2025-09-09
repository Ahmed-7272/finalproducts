// This file is used to intercept and prevent Vite client requests
// It's loaded as a client-side script to prevent 404 errors

// Intercept fetch requests to /@vite/client
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  if (url && typeof url === 'string' && url.includes('/@vite/client')) {
    // Return a resolved promise with an empty response to prevent 404 errors
    return Promise.resolve(new Response('', {
      status: 200,
      headers: { 'Content-Type': 'application/javascript' }
    }));
  }
  
  // Otherwise, use the original fetch
  return originalFetch.apply(this, arguments);
};

// Prevent script loading for Vite client
const originalCreateElement = document.createElement;
document.createElement = function(tagName) {
  const element = originalCreateElement.apply(document, arguments);
  
  if (tagName.toLowerCase() === 'script') {
    const originalSetAttribute = element.setAttribute;
    element.setAttribute = function(name, value) {
      if (name === 'src' && typeof value === 'string' && value.includes('/@vite/client')) {
        // Don't set the src attribute for Vite client scripts
        return element;
      }
      return originalSetAttribute.apply(this, arguments);
    };
  }
  
  return element;
};

console.log('Vite client interceptor loaded');