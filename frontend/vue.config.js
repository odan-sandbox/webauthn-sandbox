module.exports = {
  devServer: {
    proxy: {
      "^/webauthn": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  }
};
