import { test, expect } from '@playwright/test'

// 定位器写法： https://playwright.dev/docs/api/class-location
// 期望写法： https://playwright.dev/docs/api/class-locatorassertions
test('$capName$的E2E测试', async ({ page }) => {
  page.on('pageerror', (exception) => expect(exception).toBeNull())
  await page.goto('/')

  await expect(page.locator('h1')).toHaveText('You did it!')
})
