import { test, expect } from '@playwright/test'

test('自动匹配', async ({ page }) => {
  page.on('pageerror', (exception) => expect(exception).toBeNull())
  await page.goto('search-box#auto-match')

  const tags = page.locator('.tvp-search-box__tag')
  await page.getByRole('textbox', { name: '选择属性筛选，或输入关键字搜索' }).click()
  await page
    .locator('li')
    .filter({ hasText: /^名称$/ })
    .locator('div')
    .first()
    .click()
  await expect(page.locator('form div').filter({ hasText: '名称 :' })).toHaveCount(1)
  await page.locator('li').filter({ hasText: 'ecs-1' }).click()
  await expect(tags).toHaveCount(1)
  await expect(tags.last()).toHaveText('名称 : ecs-1')
  await expect(tags.last()).toHaveAttribute('title', '名称 : ecs-1')

  await page.getByRole('textbox', { name: '添加筛选条件' }).click()
  await page.getByRole('textbox', { name: '添加筛选条件' }).fill('0.4')
  await page.locator('div').filter({ hasText: '个人IP地址：192.168.0.4' }).nth(1).click()
  await expect(tags.last()).toHaveText('个人IP地址 : 192.168.0.4')
  await expect(page.locator('.tvp-search-box__text-highlight')).toHaveText('0.4')
})
