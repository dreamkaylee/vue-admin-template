import { fileURLToPath, URL } from "url"

import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import dayjs from "dayjs"
import { defineConfig, loadEnv } from "vite"

import { wrapperEnv } from "./build/utils"
import { createProxy } from "./build/vite/proxy"
import pkg from "./package.json"

const { name, version, dependencies, devDependencies } = pkg
const __APP_INFO__ = {
  pkg: { name, version, dependencies, devDependencies },
  lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
}

// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  const env = loadEnv(configEnv.mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv

  const isBuild = configEnv.command === "build"

  return {
    base: VITE_PUBLIC_PATH,
    root: process.cwd(),
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    },
    server: {
      https: isBuild,
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    plugins: [vue(), vueJsx()]
  }
})
