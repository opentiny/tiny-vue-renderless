const externalEnvs = ['alpha-open', 'open']

export function isInternalEnv() {
  return !externalEnvs.includes(import.meta.env.MODE)
}
