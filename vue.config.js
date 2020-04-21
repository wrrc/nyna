module.exports = {
  // publicPath: '',
  // outputDir: '',
  // runtimeCompiler: true, // 如果遇到报 Invalid options in vue.config.js: "compiler" is not allowed 这个错误就这样写   runtimeCompiler: true
  devServer: {
    host: '127.0.0.1',
    port: 8083,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => { },
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:8080',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  }
}