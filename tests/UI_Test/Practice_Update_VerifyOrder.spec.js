import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  //login
  await page.getByRole('textbox', { name: 'Username:' }).fill('Tester');
  await page.getByRole('textbox', { name: 'Password:' }).fill('test');
  await page.getByRole('button', { name: 'Login' }).click();
  //create order
  await page.getByRole('link', { name: 'Order', exact: true }).click();
  await page.getByLabel('Product:*').selectOption('FamilyAlbum');
  await page.getByRole('textbox', { name: 'Quantity:*' }).fill('30');

  //to genearte a unique name everytime record is created
  const UserName = 'Santoshi' + Date.now();
  
  await page.getByRole('textbox', { name: 'Customer name:*' }).fill(UserName);
  await page.getByRole('textbox', { name: 'Street:*' }).fill('hyd');
  await page.getByRole('textbox', { name: 'City:*' }).fill('hyd1');
  await page.getByRole('textbox', { name: 'Zip:*' }).fill('500023');
  await page.getByRole('radio', { name: 'Visa' }).check();
  await page.getByRole('textbox', { name: 'Card Nr:*' }).fill('765432097');
  await page.getByRole('textbox', { name: 'Expire date (mm/yy):*' }).fill('23/25');
  await page.getByRole('link', { name: 'Process' }).click();

  //verify record is created
  await expect(page.getByRole('strong')).toContainText('New order has been successfully added.');

  //verify name is added in orders list
  await page.getByRole('link', { name: 'View all orders' }).click();
  await expect(page.locator("//td[normalize-space()='"+UserName+"']")).toHaveText(UserName)

  //Edit button
  await page.pause(5000);
  await page.locator("//td[normalize-space()='"+UserName+"']//following-sibling::td/input").click();
//await page.getByRole('row', { name: 'Santoshi FamilyAlbum 30 05/28/2025 hyd hyd1   500023 Visa 765432097 23/25 Edit', exact: true }).getByRole('button').click();
//   //await page.getByRole('row').filter({has: page.getByRole('cell,{name:"'+UserName+'",exact:true}')}).getByRole('button',{name:'Edit',exact:true}).click();
//   //await page.getByRole('row', { name: RegExp(UserName) }).getByRole('button', { name: 'Edit' }).click();
//   const userRow = page.locator('table').locator('tr', { hasText: UserName });
//   await page.getByRole(userRow.locator('input[value="Edit"]')).click();
//  // await userRow.locator('input[value="Edit"]').click();

  //update record
  await page.locator('#ctl00_MainContent_fmwOrder_TextBox2').fill('Banglr');
  await page.getByRole('link', { name: 'Update' }).click();

  //verify update
  await expect(page.getByRole('cell', { name: 'hyd1', exact: true })).toBeVisible();

  //logout
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});