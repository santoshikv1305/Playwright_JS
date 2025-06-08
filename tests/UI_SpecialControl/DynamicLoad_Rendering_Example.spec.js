const { test, expect } = require('@playwright/test');

test('Dynamic Load Element- Wait for Selector', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/dynamic-loading/2');
    await page.getByRole('button', { name: 'Start' }).click();
    await page.waitForSelector("//h4[normalize-space()='Hello World!']");
    await expect(page.locator("//h4[normalize-space()='Hello World!']")).toHaveText("Hello World!")
  });

  test.only('Dynamic Load Element- Wait for Load State with specific time', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/slow');
    //await page.getByRole('button', { name: 'Start' }).click();
    //await page.waitForSelector("//strong[normalize-space()='The slow task has finished. Thanks for waiting!']")
    await page.waitForTimeout(10000) // Forceful time 
    await expect(page.locator("//strong[normalize-space()='The slow task has finished. Thanks for waiting!']")).toHaveText("The slow task has finished. Thanks for waiting!")
  });