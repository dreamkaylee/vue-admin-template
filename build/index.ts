/**
 * 处理环境变量
 */
const warpperEnv = (envConf: Recordable): ViteEnv => {
  const ret: ViteEnv = {
    VITE_BASE_URL: '',
    VITE_PORT: 5173
  }

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }

    ;(ret[envName as keyof typeof ret] as any) = realName

    if (typeof realName === 'string') {
      process.env[envName] = realName
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }

  return ret
}

export { warpperEnv }
