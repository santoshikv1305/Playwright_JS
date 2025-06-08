import { test, expect } from '@playwright/test';

test.describe('Visual Regression Testing Example', () => {
 
  test('Full Page Snapshot', async ({ page }) => {
    //setting browser size
    //await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.waitForTimeout(5000)
    expect(await page.screenshot()).toMatchSnapshot('OrangeHRM_Login_Page.png')
  })

  test('Single Element Snapshot', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.waitForTimeout(5000) 
    const pageElement = page.locator("//button[@type='submit']")
    expect(await pageElement.screenshot()).toMatchSnapshot('LoginButton.png')
  })
})
