//import { test, expect } from '@playwright/test';
import { test, expect } from '@playwright/test';

test('Login and Then Create Order and Verify Order', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  await page.getByLabel('Username:').fill('Tester');
  await page.getByLabel('Password:').fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx')
  //await page.getByRole('link', { name: 'Order' }).nth(1).click();
  await page.getByRole('link', { name: 'Order', exact:true }).click();
  //Verify that user has clicked on Order Link
  await page.url().includes('/Process.aspx')
  await page.getByRole('combobox', { name: 'Product:*' }).selectOption('FamilyAlbum');
  await page.getByLabel('Quantity:*').fill('5');
  await page.getByLabel('Customer name:*').fill('Reddy');
  //await page.getByLabel('Street:*').click();
  await page.getByLabel('Street:*').fill('BTM');
  //await page.getByLabel('City:*').click();
  await page.getByLabel('City:*').fill('Bangalore');
  //await page.getByLabel('Zip:*').click();
  await page.getByLabel('Zip:*').fill('560076');
  await page.getByLabel('Visa').check();
  await page.getByLabel('Card Nr:*').fill('1234567891');
  await page.getByLabel('Expire date (mm/yy):*').fill('12/23');
  await page.getByRole('link', { name: 'Process' }).click();

  const neworder = await page.locator("//strong[normalize-space()='New order has been successfully added.']")
  console.log(neworder)
  await expect(neworder).toContainText('New order has been successfully added.')

  await page.getByRole('link', { name: 'View all orders' }).click();

  await expect(page.locator("//td[text()='Reddy']")).toHaveText('Reddy')

  await page.getByRole('link', { name: 'Logout' }).click();
  await page.url().includes("/Login.aspx")
  await expect(page).toHaveURL("http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx?ReturnUrl=%2fsamples%2fTestComplete11%2fWebOrders%2fDefault.aspx")
});