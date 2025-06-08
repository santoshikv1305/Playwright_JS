// @ts-check
import { test, expect } from '@playwright/test';

test('Scroll To Particular Element Example @sanity', async ({ page }) => {
  //test.setTimeout(80000)
  await page.goto('https://stackoverflow.com/');
  //await page.pause()
  const element = page.locator("//a[text()='Press']")
  await element.scrollIntoViewIfNeeded()
  await element.click()
  await page.waitForTimeout(5000)
});