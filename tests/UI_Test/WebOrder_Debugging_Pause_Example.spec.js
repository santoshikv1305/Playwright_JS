//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');
test('test', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').fill('test');
  // Pause on the following line.
  await page.pause();
  await page.getByRole('button', { name: 'Login' }).click();
  console.log('Clicked on Login button')
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
  await page.getByRole('link', { name: 'Logout' }).click();
  const login = page.locator('#ctl00_MainContent_login_button');
  console.log(login)
  await expect(login).toBeVisible();
});