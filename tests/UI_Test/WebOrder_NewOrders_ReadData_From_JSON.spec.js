const fs = require('fs');
const { test, expect } = require('@playwright/test');
let objects = fs.readFileSync('./tests/TestData/WebOrder_NewOrders.json')
const users = JSON.parse(objects);
users.forEach(users => {
  const products = Array.isArray(users.product) ? users.product : [users.product];
  products.forEach(product => {
    test(`${users.test_case} - Product: ${product}`, async ({ page }) => {
      // Step 1: Login
      await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
      await page.getByLabel('Username:').fill(users.uname);
      await page.getByLabel('Password:').fill(users.password);
      await page.getByRole('button', { name: 'Login' }).click();

      // Step 2: Verify login
      await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');

      // Step 3: Go to Order page
      await page.getByRole('link', { name: 'Order', exact: true }).click();
      await expect(page.url()).toContain('/Process.aspx');

      // Step 4: Fill in the order form
      await page.getByRole('combobox', { name: 'Product:*' }).selectOption(product);
      await page.getByLabel('Quantity:*').fill(users.quantity);

      const customerName = users.customerName ? users.customerName + Date.now() : '';
      if (users.customerName) await page.getByLabel('Customer name:*').fill(customerName);
      if (users.street) await page.getByLabel('Street:*').fill(users.street);
      if (users.city) await page.getByLabel('City:*').fill(users.city);
      if (users.zip) await page.getByLabel('Zip:*').fill(users.zip);

      if (users.cardType) await page.getByLabel(users.cardType).check();
      if (users.cardNumber) await page.getByLabel('Card Nr:*').fill(users.cardNumber);
      if (users.expiryDate) await page.getByLabel('Expire date (mm/yy):*').fill(users.expiryDate);

      // Step 5: Submit the order
      await page.getByRole('link', { name: 'Process' }).click();

      // Step 6: Validation and Assertion using If-Else
      if (
        users.customerName &&
        users.street &&
        users.city &&
        users.zip &&
        users.cardNumber &&
        users.expiryDate &&
        parseInt(users.quantity) > 0
      ) {
        // Positive scenario
        const successMsg = await page.locator("//strong[normalize-space()='New order has been successfully added.']");
        await expect(successMsg).toContainText('New order has been successfully added.');

        // Verify order in order list
        await page.getByRole('link', { name: 'View all orders' }).click();
        await expect(page.locator(`//td[normalize-space()='${customerName}']`)).toHaveText(customerName);

        // Logout
        await page.getByRole('link', { name: 'Logout' }).click();
        await expect(page.url()).toContain("/Login.aspx");
      } else {
        // Negative scenario
        const pageContent = await page.content();
        //console.log(pageContent);
        await expect(pageContent).toContain(users.exp_res);
        //console.log(pageContent);
      }
    });
  });
});
