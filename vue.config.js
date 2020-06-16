module.exports = {
  runtimeCompiler: true,
  publicPath: '/', // 设置打包文件相对路径
  devServer: {
    disableHostCheck: true,
    // open: process.platform === 'darwin',
    // host: 'localhost',
    port: 8080,
    // open: true, //配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://localhost:8787/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
   },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  lintOnSave:false,
}
