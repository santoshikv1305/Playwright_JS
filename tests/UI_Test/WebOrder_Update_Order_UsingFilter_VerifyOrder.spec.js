//const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';

test('Create Order - Update Order - Verify Order @smoke', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');

  // Login
  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');

  // Click Order
  await page.getByRole('link', { name: 'Order', exact: true }).click();
  await expect(page).toHaveURL(/.*Process\.aspx/);

  // Fill order form
  await page.getByRole('combobox', { name: 'Product:*' }).selectOption('FamilyAlbum');
  await page.getByLabel('Quantity:*').fill('5');

  const ExpUserName = 'Megha' + Math.floor(Math.random() * 1000000);
  await page.getByLabel('Customer name:*').fill(ExpUserName);
  await page.getByLabel('Street:*').fill('BTM');
  await page.getByLabel('City:*').fill('Bangalore');
  await page.getByLabel('Zip:*').fill('560076');
  await page.getByLabel('Visa').check();
  await page.getByLabel('Card Nr:*').fill('1234567891');
  await page.getByLabel('Expire date (mm/yy):*').fill('12/23');
  await page.getByRole('link', { name: 'Process' }).click();

  // Verify success
  await expect(page.locator('strong')).toHaveText('New order has been successfully added.');

  // View all orders
  await page.getByRole('link', { name: 'View all orders' }).click();
  const userRow = page.locator('table tr').filter({
    has: page.locator('td').filter({ hasText: ExpUserName })
  });

  // Verify user exists
await expect(
  page.locator('#ctl00_MainContent_orderGrid td').filter({ hasText: ExpUserName })
).toHaveText(ExpUserName, { timeout: 5000 });

  // Click Edit in the same row
  await page
  .locator('#ctl00_MainContent_orderGrid tr', {
    has: page.locator('td', { hasText: ExpUserName })
  })
  .locator('input[alt="Edit"]')
  .click(); // assume only one per row

  // Change city
  const cityInput = page.locator('#ctl00_MainContent_fmwOrder_TextBox3');
await cityInput.fill('Delhi');
await page.locator('#ctl00_MainContent_fmwOrder_UpdateButton').click();

// Verify updated city
const updatedUserRow = page.locator('#ctl00_MainContent_orderGrid tr').filter({
  has: page.locator('td', { hasText: ExpUserName })
});

// Now confirm that the City column value in this row is "Delhi"
await expect(updatedUserRow.locator('td', { hasText: 'Delhi' })).toHaveText('Delhi', { timeout: 5000 });



  // Logout
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL(/.*Login\.aspx/);
});
