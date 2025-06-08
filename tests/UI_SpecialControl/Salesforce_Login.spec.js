import { test, expect } from '@playwright/test';

test('Login to Weborders @smoke', async ({ page }) => {
  await page.goto('https://fun-enterprise-9859.lightning.force.com/');

  // 🔐 Login
  await page.fill('input#username', 'kvsantoshi.reddy-hcuk@force.com');
  await page.fill('input#password', 'Haritha@k9');
  await page.getByRole('button', { name: 'Log In' }).click();
  //await page.waitForLoadState('networkidle');

  // Handle optional "Remind Me Later"
  const remindMeLaterLink = page.getByRole('link', { name: 'Remind Me Later' });
  if (await remindMeLaterLink.isVisible().catch(() => false)) {
    await remindMeLaterLink.click();
    console.log('🟡 "Remind Me Later" prompt handled.');
  } else {
    console.log('✅ "Remind Me Later" prompt not present, continuing...');
  }


    await page.getByLabel('Main').getByRole('link', { name: 'Accounts' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByLabel('*Account Name').fill('Testing');
  //await page.waitForTimeout(2000);
  await page.getByRole('combobox', { name: 'Type' }).click();
  //await page.waitForTimeout(1000);
  await page.getByRole('option', { name: 'Analyst' }).click();
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill('Welcome to Salesforce');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await expect(page.locator('records-highlights2')).toContainText('Testing');
  await expect(page.getByText('Show All Activities', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'View profile' }).click();
  await page.getByRole('link', { name: 'Log Out' }).click();
});
