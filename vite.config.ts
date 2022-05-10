import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    eslintPlugin({
      // exclude: ['./node_modules/**'],
      include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts']
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 9988,
    strictPort: true,
    https: false,
    open: true,
    proxy: {}
  }
})
