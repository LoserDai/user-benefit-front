/*
 * @Description: 配置文件
 * @Author: Allen
 * @Date: 2025-02-07 16:23:00
 * @LastEditors: Allen
 * @LastEditTime: 2025-03-05 01:41:38
 */
module.exports = {
  publicPath: './',
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/', // 本地后端地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}