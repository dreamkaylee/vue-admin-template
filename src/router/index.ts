import { createRouter, createWebHashHistory, type Router, type RouteRecordRaw } from 'vue-router'

/**
 * 自动导入全部静态路由，无需再手动引入！匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件
 * 如何匹配所有文件请看：https://github.com/mrmlnc/fast-glob#basic-syntax
 * 如何排除文件请看：https://cn.vitejs.dev/guide/features.html#negative-patterns
 */
const modules: Record<string, any> = import.meta.glob(
  ['./modules/**/*.ts', '!./modules/**/remaining.ts'],
  {
    eager: true
  }
)

const routes: RouteRecordRaw[] = []

Object.keys(modules).forEach(key => {
  routes.push(modules[key].default)
})

const router: Router = createRouter({
  // 指定路由模式
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 路由地址
  routes: routes
})

export default router
