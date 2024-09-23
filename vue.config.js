const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL || 'http://localhost:3000', // Usa la variable de entorno o un valor predeterminado
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        onProxyRes: (proxyRes) => {
          // Asegúrate de que los encabezados CORS estén en las respuestas
          proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        }
      },
    },
  },
});