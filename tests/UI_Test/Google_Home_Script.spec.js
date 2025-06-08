import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

    await page.goto("https://www.google.co.in/")
    await page.waitForLoadState("page load")
    await page.locator("//textarea[@id='APjFqb']").fill("Plawright")
    await page.locator("//textarea[@id='APjFqb']").click({key: "Enter"})
})
