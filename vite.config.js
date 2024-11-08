export default {
  server: {
    https: true // Required for AR.js camera access
  },
  appType: 'spa',
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  plugins: [
    {
      name: 'configure-response-headers',
      configureServer: server => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          next();
        });
      },
    },
    {
      name: 'html-routes',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/marker') {
            req.url = '/marker.html';
          } else if (req.url === '/preview') {
            req.url = '/preview.html';
          }
          next();
        });
      }
    }
  ]
}