//Run "npm install xlsx" to install the xlsx file

import { test, expect, Page } from '@playwright/test';
import { CommonFunction } from './CommonFunction';

test.describe('WebOrder All Test Scenario calling BaseClass', () => {
  let commonfun;
  let records;
  let page = Page;
  commonfun = new CommonFunction();
  commonfun.ReadExcelFile('./tests/TestData/TestAllScenario.xlsx', 0).then((data) => {
    records = data;
  })
  //Page can be directly used in test not in hooks, in hooks we can use browser and assign new page to page
  test.beforeAll(async ({ browser }) => {

    page = await browser.newPage();

    await page.goto('http://secure.smartbearsoftware.com/samples/TestComplete11/WebOrders/Login.aspx');
  })

  test('WebOrder App', async () => {
    for (const record of records) {
      console.log(records)
      //console.log(record.uname, record.pass);

      await page.fill('input[name="ctl00\\$MainContent\\$username"]', record.uname);

      // Fill input[name="ctl00\$MainContent\$password"]
      await page.fill('input[name="ctl00\\$MainContent\\$password"]', record.pass);

      // Click text=Login
      await page.click('text=Login');
      await page.waitForLoadState()
      //Check condition whether Valid or Invalid
      const del = await page.$("#ctl00_MainContent_btnDelete");
      if (del) {

        const name = await page.$eval("//h2[normalize-space()='List of All Orders']", el => el.textContent.trim())
        expect(name).toBe('List of All Orders')
        // Click text=Logout
        await page.click('text=Logout');
        await page.waitForLoadState(); // The promise resolves after 'load' event.

      } else {
        const name = await page.$eval("#ctl00_MainContent_status", el => el.textContent.trim())
        expect(name).toBe('Invalid Login or Password.')

      }

    }
  })

})