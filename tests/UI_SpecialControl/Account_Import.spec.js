import { test, expect } from '@playwright/test';
import path from 'path';
//checking the push in git by adding a comment line

test('Salesforce: Login, Import File via Accounts, and Verify @smoke', async ({ page }) => {
   await page.goto('https://fun-enterprise-9859.lightning.force.com/');

  // 🔐 Login
  await page.fill('input#username', 'kvsantoshi.reddy-hcuk@force.com');
  await page.fill('input#password', 'Haritha@k9');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForLoadState('networkidle');

  // Handle optional "Remind Me Later"
  const remindMeLaterLink = page.getByRole('link', { name: 'Remind Me Later' });
  if (await remindMeLaterLink.isVisible().catch(() => false)) {
    await remindMeLaterLink.click();
    console.log('🟡 "Remind Me Later" prompt handled.');
  } else {
    console.log('✅ "Remind Me Later" prompt not present, continuing...');
  }

  // 📁 Click Accounts
//   const accountsLink = page.getByLabel('Main').getByRole('link', { name: 'Accounts' });
//   await accountsLink.waitFor({ state: 'visible' });
//   await accountsLink.click();
// 🔼 Upload file
  const filePath = 'tests/TestData/SalesforceSample_accounts.csv'; // make sure SalesforceSample_accounts.csv exists

await page.getByRole('button', { name: 'Import' }).click();
  await page.locator('span').filter({ hasText: 'Import from FileUpload' }).first().click();
  await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByLabel('Upload FilesOr drop files').setInputFiles([]);
//   await page.getByText('Upload Files').click();
  await page.getByLabel('Upload FilesOr drop files').setInputFiles(filePath);
  await page.getByRole('button', { name: 'Next' }).click();
  const table = page.getByRole('table');
  await table.waitFor({ state: 'visible' });
  await expect(table).toContainText('Salesforce Field');
  await page.getByRole('button', { name: 'Start Import' }).click();
  
  await page.getByRole('button', { name: 'Continue Import' }).click();
  await expect(page.getByRole('heading')).toContainText('We Imported Your Accounts');
  await page.getByRole('button', { name: 'Done' }).click();
  await page.getByRole('button', { name: 'Select a List View: Accounts' }).click();
  await page.getByRole('option', { name: 'All Accounts' }).click();
  await expect(page.locator('tbody')).toContainText('Enim Associates(Sample)');

  // 🔚 Log out
  const profileBtn = page.getByRole('button', { name: 'View profile' });
  await profileBtn.waitFor();
  await profileBtn.click();

  const logoutLink = page.getByRole('link', { name: 'Log Out' });
  await logoutLink.waitFor();
  await logoutLink.click();
});