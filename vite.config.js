import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // 必须加，让 Vite 监听外部主机
    port: 5173,
    allowedHosts: [
      '.gitpod.io' // 允许所有 gitpod 域名
    ]
  }
})


