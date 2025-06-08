import { test, expect } from '@playwright/test';
import assert from 'assert';

test.describe('Hooks Example in Playwright', () => {

  test.beforeEach(async ({ page }) => {
    // Go to http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
    await page.getByLabel('Username:').fill('Tester');
    await page.getByLabel('Password:').fill('test');
    await page.getByRole('button', { name: ' Login ' }).click();
    await expect(page.getByRole('link', { name: 'Logout' })).toHaveText("Logout")

  })
  test('Go to Order Page', async ({ page }) => {
    await page.getByRole('link', { name: 'Order' }).nth(1).click();

  });

  test('Go to View All Order Page', async ({ page }) => {
    await page.getByRole('link', { name: 'View all orders' }).click();

  });

  test.skip('Go to View all products Page', async ({ page }) => {
    await page.getByRole('link', { name: 'View all products' }).click();

  });

  test.afterEach('Logout from app', async ({ page }) => {
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page).toHaveURL("http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx")
  });
});