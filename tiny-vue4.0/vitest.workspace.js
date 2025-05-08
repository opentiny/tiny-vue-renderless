import { defineWorkspace } from 'vitest/config'

// 集中管理：多个项目中都会有单元测试
export default defineWorkspace([
  './packages/components/pc/vitest.config.ts',
  './packages/hooks/vitest.config.ts',
  './packages/utils/vitest.config.ts',
])
