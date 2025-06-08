import { test, expect } from '@playwright/test';

test('Login, create, edit and verify Account in Salesforce @smoke', async ({ page }) => {
  await page.goto('https://fun-enterprise-9859.lightning.force.com/');

  // 🔐 Login
  await page.fill('input#username', 'kvsantoshi.reddy-hcuk@force.com');
  await page.fill('input#password', 'Haritha@k9');
  await page.getByRole('button', { name: 'Log In' }).click();
  //await page.waitForLoadState('networkidle');

  const remindMeLaterLink = page.getByRole('link', { name: 'Remind Me Later' });
  if (await remindMeLaterLink.isVisible().catch(() => false)) {
    await remindMeLaterLink.click();
    console.log('🟡 "Remind Me Later" prompt handled.');
  } else {
    console.log('✅ "Remind Me Later" prompt not present, continuing...');
  }

  // Navigate to Accounts
  const accountsLink = page.getByLabel('Main').getByRole('link', { name: 'Accounts' });
  await accountsLink.waitFor({ state: 'visible' });
  await accountsLink.click();

  // Create new account
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByLabel('*Account Name').waitFor();
  await page.getByLabel('*Account Name').fill('Testing');
  await page.getByRole('combobox', { name: 'Type' }).click();
  await page.getByRole('option', { name: 'Analyst' }).waitFor();
  await page.getByRole('option', { name: 'Analyst' }).click();
  await page.getByLabel('Description').fill('Welcome to Salesforce');
  await page.getByRole('button', { name: 'Save', exact: true }).click();

  // ✅ Verify initial account name
  const highlights = page.locator('records-highlights2');
  await expect(highlights).toContainText('Testing');

  // 🔁 EDIT ACCOUNT NAME
  await page.locator("//button[normalize-space()='Edit']").first().click();

  const accountNameEditField = page.getByLabel('*Account Name');
  await accountNameEditField.waitFor();
  await accountNameEditField.fill('Testing Updated');
  await page.getByRole('button', { name: 'Save', exact: true }).click();

  // ✅ Verify updated account name
  await expect(highlights).toContainText('Testing Updated');

  // ✅ Additional verification (optional)
  await expect(page.getByText('Show All Activities', { exact: true })).toBeVisible();

  // 🔚 Log out
  const profileBtn = page.getByRole('button', { name: 'View profile' });
  await profileBtn.waitFor();
  await profileBtn.click();

  const logoutLink = page.getByRole('link', { name: 'Log Out' });
  await logoutLink.waitFor();
  await logoutLink.click();
});
