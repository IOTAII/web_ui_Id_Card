const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Your API endpoints prefix
    createProxyMiddleware({
      target: 'http://3.109.34.34:8080', // Your server address
      changeOrigin: true,
    })
  );
};
