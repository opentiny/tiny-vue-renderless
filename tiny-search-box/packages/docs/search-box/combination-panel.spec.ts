import { test, expect } from '@playwright/test'

test('自有组合面板插槽', async ({ page }) => {
  page.on('pageerror', (exception) => expect(exception).toBeNull())
  await page.goto('search-box#combination-panel')

  const component = page.locator('.tvp-search-box')
  const attrEls = page.locator('.tvp-search-box__first-panel > li .tiny-dropdown-item__label > span').first()
  const tags = component.locator('.tvp-search-box__tag')

  await component.getByRole('textbox', { name: '选择属性筛选，或输入关键字搜索' }).click()
  await expect(attrEls).toHaveText('名称')
  await expect(attrEls).toHaveAttribute('title', '名称')

  await page
    .locator('li')
    .filter({ hasText: /^名称$/ })
    .locator('div')
    .first()
    .click()

  await expect(page.locator('form div').filter({ hasText: '名称 :' })).toHaveCount(1)
  await page.locator('li').filter({ hasText: 'obs-2' }).click()
  await expect(tags).toHaveCount(1)
  await expect(tags.last()).toHaveText('名称 : obs-2')
  await expect(tags.last()).toHaveAttribute('title', '名称 : obs-2')

  await component.getByRole('textbox', { name: '添加筛选条件' }).click()
  await page.locator('div').filter({ hasText: '可用地区' }).nth(2).click()
  await page.locator('label').filter({ hasText: '全选' }).locator('span').nth(1).click()
  await page.getByRole('button', { name: '确认' }).click()
  await expect(tags.nth(1)).toHaveText('可用地区 : 华南区')
  await expect(tags.nth(2)).toHaveText('可用地区 : 华北区')
  await expect(tags.nth(3)).toHaveText('可用地区 : 西北区')
  await expect(tags.nth(4)).toHaveText('可用地区 : 西南区')

  await component.getByRole('textbox', { name: '添加筛选条件' }).click()
  await page.locator('li').filter({ hasText: '名称' }).locator('div').nth(1).click()
  await page.locator('.slot-header > .back-svg').first().click()
  await expect(page.getByText('使用＂＂潜在匹配项属性类型名称可用地区ecs-1obs-')).toHaveCount(1)
})
