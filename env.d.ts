/// <reference types="vite/client" />

type Recordable<T = any> = Record<string, T>

interface ViteEnv {
  VITE_APP_TITLE?: string
  VITE_BASE_URL: string
  VITE_PORT: number
  VITE_HTTPS?: boolean
}
