import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx' // 对jsx语法支持
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    eslintPlugin({
      // exclude: ['./node_modules/**'],
      include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts']
    }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    })
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 9988,
    strictPort: true,
    https: false,
    open: true,
    proxy: {}
  }
})
