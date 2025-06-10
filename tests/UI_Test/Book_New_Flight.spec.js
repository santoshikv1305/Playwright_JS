import { test, expect } from '@playwright/test';
 
test('Blazedemo - Booking flight', async ({ page }) => {
  //adding for testing purpose
  await page.goto('https://blazedemo.com/index.php');
  await page.locator('select[name="fromPort"]').selectOption('San Diego');
  await page.locator('select[name="toPort"]').selectOption('Berlin');
  await page.getByRole('button', { name: 'Find Flights' }).click();
  await expect(page.locator('table tbody tr').first().getByRole('button', { name: 'Choose This Flight' })).toBeVisible();
  await page.locator('table tbody tr').first().getByRole('button', { name: 'Choose This Flight' }).click();
  await expect(page.locator('body')).toContainText('Please submit the form below to purchase the flight.');
  await page.getByPlaceholder('First Last').fill('John Doe');
  await page.getByPlaceholder('Main St.').fill('123 ABC Street');
  await page.getByPlaceholder('Anytown').fill('Bangalore');
  await page.getByPlaceholder('State').fill('KA');
  await page.getByPlaceholder('12345').fill('1234567');
  await page.locator('#cardType').selectOption('amex');
  await page.getByPlaceholder('Credit Card Number').fill('123456789');
  await page.getByPlaceholder('John Smith').fill('John Doe');
  await page.getByRole('button', { name: 'Purchase Flight' }).click();
  await expect(page.getByRole('heading')).toContainText('Thank you for your purchase today!');
});
