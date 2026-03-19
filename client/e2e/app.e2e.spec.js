import { test, expect } from '@playwright/test';

test.describe('ShopSmart E2E – User Flow', () => {

  test('Step 1: Page loads and displays the ShopSmart heading', async ({ page }) => {
    await page.goto('/');

    // Verify the main heading is visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('ShopSmart');
  });

  test('Step 2: Backend Status card is displayed', async ({ page }) => {
    await page.goto('/');

    // Verify the "Backend Status" card renders
    const card = page.locator('.card');
    await expect(card).toBeVisible();
    await expect(card.locator('h2')).toHaveText('Backend Status');
  });

  test('Step 3: Loading state appears before data loads', async ({ page }) => {
    // Intercept the API call and delay it
    await page.route('**/api/health', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'ok', message: 'Healthy', timestamp: new Date().toISOString() }),
      });
    });

    await page.goto('/');

    // Verify loading text appears
    const loadingText = page.locator('text=Loading backend status...');
    await expect(loadingText).toBeVisible();
  });

  test('Step 4: Full user flow – Load page → See status → Verify health data', async ({ page }) => {
    // Mock the backend API response
    await page.route('**/api/health', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'ok',
          message: 'ShopSmart API is running',
          timestamp: '2026-03-19T10:00:00.000Z',
        }),
      });
    });

    // Step A: Navigate to the app
    await page.goto('/');

    // Step B: Verify heading loaded
    await expect(page.locator('h1')).toHaveText('ShopSmart');

    // Step C: Wait for API data to render and verify status
    const statusSpan = page.locator('.status-ok');
    await expect(statusSpan).toBeVisible();
    await expect(statusSpan).toHaveText('ok');

    // Step D: Verify the message and timestamp are displayed
    await expect(page.locator('text=ShopSmart API is running')).toBeVisible();
    await expect(page.locator('text=2026-03-19T10:00:00.000Z')).toBeVisible();
  });

  test('Step 5: App handles backend failure gracefully', async ({ page }) => {
    // Mock a failed API response
    await page.route('**/api/health', (route) => route.abort());

    await page.goto('/');

    // Page should still render heading even if API fails
    await expect(page.locator('h1')).toHaveText('ShopSmart');

    // The loading text should remain since fetch failed
    await expect(page.locator('text=Loading backend status...')).toBeVisible();
  });
});
