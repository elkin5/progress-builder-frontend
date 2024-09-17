// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: [
//     'vuetify'
//   ]
// })

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
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

