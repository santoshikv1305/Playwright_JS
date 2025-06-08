import { test, expect } from '@playwright/test';

test('Login to Weborders @smoke', async ({ page }) => {
  // Navigate to Salesforce login
   await page.goto('https://fun-enterprise-9859.lightning.force.com/');

  // Fill in credentials and login
  await page.fill('input#username', 'kvsantoshi.reddy-hcuk@force.com');
  await page.fill('input#password', 'Haritha@k9');
  await page.getByRole('button', { name: 'Log In' }).click();

  // Wait for page to stabilize
  await page.waitForLoadState('networkidle');

  // Optional: handle "Remind Me Later" if present
  const remindMeLaterLink = page.getByRole('link', { name: 'Remind Me Later' });
  if (await remindMeLaterLink.isVisible().catch(() => false)) {
    await remindMeLaterLink.click();
    console.log('🟡 "Remind Me Later" prompt handled.');
  } else {
    console.log('✅ "Remind Me Later" prompt not present, continuing...');
  }

  // Navigate to Accounts
  const accountsLink = page.getByLabel('Main').getByRole('link', { name: 'Accounts' });
  await accountsLink.waitFor({ state: 'visible', timeout: 10000 });
  await accountsLink.click();

  // Click 'New' to add account
  const newButton = page.getByRole('button', { name: 'New' });
  await newButton.waitFor({ state: 'attached' });
  await newButton.click();

  // Fill in 'Account Name'
  const accountNameField = page.getByLabel('*Account Name');
  await accountNameField.waitFor({ state: 'visible' });
  await accountNameField.fill('Testing');

  // Select 'Type' = Analyst
  const typeComboBox = page.getByRole('combobox', { name: 'Type' });
  await typeComboBox.waitFor({ state: 'attached' });
  await typeComboBox.click();

  const analystOption = page.getByRole('option', { name: 'Analyst' });
  await analystOption.waitFor({ state: 'visible' });
  await analystOption.click();

  // Fill Description
  const descriptionField = page.getByLabel('Description');
  await descriptionField.waitFor({ state: 'visible' });
  await descriptionField.fill('Welcome to Salesforce');

  // Click Save
  const saveButton = page.getByRole('button', { name: 'Save', exact: true });
  await saveButton.waitFor({ state: 'attached' });
  await saveButton.click();

  // Assert account was saved and displayed
  const highlights = page.locator('records-highlights2');
  await expect(highlights).toContainText('Testing');

  await expect(page.getByText('Show All Activities', { exact: true })).toBeVisible();

  // Log out
  const profileBtn = page.getByRole('button', { name: 'View profile' });
  await profileBtn.waitFor({ state: 'attached' });
  await profileBtn.click();

  const logoutLink = page.getByRole('link', { name: 'Log Out' });
  await logoutLink.waitFor({ state: 'visible' });
  await logoutLink.click();
});
