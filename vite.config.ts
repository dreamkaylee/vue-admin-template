import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

import { warpperEnv } from './build'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const { VITE_PORT, VITE_BASE_URL, VITE_HTTPS } = warpperEnv(env)
  return {
    // 打包配置
    build: {
      target: 'modules',
      outDir: 'dist', //指定输出路径
      assetsDir: 'assets', // 指定生成静态资源的存放路径
      sourcemap: false, //构建后是否生成 source map 文件
      chunkSizeWarningLimit: 1000, // chunk 大小警告的限制（以 kbs 为单位）默认：500
      cssTarget: 'chrome61', // 防止 vite 将 rgba() 颜色转化为 #RGBA 十六进制符号的形式（要兼容的场景是安卓微信中的 webview 时，它不支持 CSS 中的 #RGBA 十六进制颜色符号）
      minify: 'terser', // 混淆器，terser构建后文件体积更小
      terserOptions: {
        // 生产环境时移除console.log() 和 debugger
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          // 指定打包输出的js文件名称
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    // vite插件
    plugins: [vue()],
    // 配置别名
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 配置前端服务地址和端口
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      https: VITE_HTTPS,
      cors: false,
      // 配置反向代理、跨域
      proxy: {
        '/api': {
          target: VITE_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
