const fs = require('fs');
const { test, expect } = require('@playwright/test');
// Reads the JSON file and saves it  
let objects = fs.readFileSync('./tests/TestData/WebOrder_Login.json')
const users = JSON.parse(objects);

for (const record of users) {
  test(`WebOrder Login: ${record.test_case}`, async ({ page }) => {
    //console.log(record.name, record.password, record.exp_result);
    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
    await page.getByLabel('Username:').fill(record.name);
    await page.getByLabel('Password:').fill(record.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/default.aspx');
    await page.getByRole('link', { name: 'Logout' }).click();
    const login = page.locator('#ctl00_MainContent_login_button');
    await expect(login).toBeVisible();

});
}
