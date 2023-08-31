const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    '/api', createProxyMiddleware({
        target :  "http://43.200.177.135:8080",
        changeOrigin : true,
    })
  )
};



// app.use(createProxyMiddleware("/api", { // https://github.com/chimurai/http-proxy-middleware
//     target: "http://43.200.177.135:8080",
//     changeOrigin : true,
//   }));