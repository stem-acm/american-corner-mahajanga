module.exports = {
  '/api/**': {
    target: process.env.API_PROXY_TARGET || 'http://localhost:5002',
    secure: false,
    changeOrigin: true,
  },
};
