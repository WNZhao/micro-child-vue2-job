const { defineConfig } = require('@vue/cli-service')

console.log('BASE_API:', process.env.VUE_APP_BASE_API)

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:4523/m1/6202454-5895755-default',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'  // 不移除 /api 前缀
        }
      }
    }
  }
})
