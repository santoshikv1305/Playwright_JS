// webTablePagination.spec.js
const { test, expect } = require('@playwright/test');

test.describe('WebTable Pagination and Salary Check', () => {
  const tgtFName = 'Zorita';
  const expSalary = '$115,000';

  test('Search for a name and verify salary', async ({ page }) => {
    await page.goto('https://datatables.net/examples/data_sources/server_side');
    await page.waitForSelector('#example');

    let found = false;

    // Loop until found or Next button is disabled
    while (!found) {
      const rows = await page.$$('#example tbody tr');

      for (const row of rows) {
        const nameCell = await row.$('td:nth-child(1)');
        const nameText = await nameCell.textContent();

        if (nameText.trim() === tgtFName) {
          const salaryCell = await row.$('td:nth-child(6)');
          const salaryText = await salaryCell.textContent();

          console.log(`Found ${tgtFName} with salary: ${salaryText.trim()}`);
          expect(salaryText.trim()).toBe(expSalary);
          found = true;
          break;
        }
      }

      // If not found, click "Next" unless it's disabled
      if (!found) {
        const nextButton = await page.locator('button[aria-label="Next"]');
        const isDisabled = await nextButton.getAttribute('class');
        if (isDisabled && isDisabled.includes('disabled')) break;
        await nextButton.click();
        await page.waitForTimeout(1000);
      }
    }

    expect(found).toBe(true); // Fail the test if not found after pagination
  });
});