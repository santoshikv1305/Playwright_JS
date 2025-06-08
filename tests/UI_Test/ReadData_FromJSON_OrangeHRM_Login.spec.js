const fs = require('fs');
const { test, expect } = require('@playwright/test');

// Reads the JSON file and saves it  
let objects = fs.readFileSync('./tests/TestData/OrangeHRM_Login.json')
const users = JSON.parse(objects);

//import { test, expect } from '@playwright/test';
for (const record of users) {
    //test('test', async ({ page }) =>
    test(`WebOrder Login Functionality: ${record.test_case}`, async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.getByRole('textbox', { name: 'Username' }).fill(record.uname);
        await page.getByRole('textbox', { name: 'Password' }).fill(record.password);
        await page.getByRole('button', { name: 'Login' }).click();
        //await expect(page.getByLabel('Sidepanel').getByRole('list')).toContainText('Dashboard');
        if ('Dashboard' == record.exp_res) {
            await expect(page.getByLabel('Sidepanel').getByRole('list')).toContainText(record.exp_res);
        }
        else if ('Invalid credentials' == record.exp_res) {
            //await page.waitForLoadState();
            //await expect(page.getByRole('alert')).toContainText(record.exp_res);
            await expect(page.getByText('Invalid credentials')).toHaveText(record.exp_res);
        }
        else {
           // await expect(page.locator('span')).toContainText('Required');
            await expect(page.getByText('Required')).toHaveText(record.exp_res);
        }
    })
};