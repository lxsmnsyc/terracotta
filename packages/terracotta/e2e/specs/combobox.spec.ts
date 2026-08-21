import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=combobox');
});

test('exposes the input as a combobox that owns the popup', async ({ page }) => {
  const input = page.getByRole('combobox');

  await expect(input).toHaveAttribute('aria-expanded', 'false');

  await input.click();

  await expect(input).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('listbox')).toBeVisible();
});

test('keeps DOM focus in the input and tracks the option with aria-activedescendant', async ({
  page,
}) => {
  const input = page.getByRole('combobox');
  await input.click();

  await page.keyboard.press('ArrowDown');

  // Virtual focus: the input keeps DOM focus so typing continues to work.
  await expect(input).toBeFocused();
  const active = await input.getAttribute('aria-activedescendant');
  expect(active).not.toBeNull();
  // Opening activates the selected option, so the first arrow key steps past
  // `ada` rather than landing on it.
  await expect(page.locator(`#${active}`)).toHaveText('grace');
});

test('skips disabled options with the arrow keys', async ({ page }) => {
  const input = page.getByRole('combobox');
  await input.click();

  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');

  // grace, then `katherine` is disabled so the second step reaches
  // `margaret`.
  const active = await input.getAttribute('aria-activedescendant');
  await expect(page.locator(`#${active}`)).toHaveText('margaret');
});

test('filters the options as you type, once the query settles', async ({ page }) => {
  await page.getByRole('combobox').click();

  await page.keyboard.type('gra');

  // The query is debounced by 250 ms, so this waits rather than asserting now.
  await expect(page.getByRole('option', { name: 'grace' })).toHaveAttribute('tc-matches', '');
  await expect(page.getByRole('option', { name: 'ada' })).not.toHaveAttribute('tc-matches', '');
});

test('commits a selection with Enter', async ({ page }) => {
  await page.getByRole('combobox').click();

  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  await expect(page.getByTestId('selection')).toHaveText('grace');
});

test('commits a selection on click', async ({ page }) => {
  await page.getByRole('combobox').click();

  await page.getByRole('option', { name: 'margaret' }).click();

  await expect(page.getByTestId('selection')).toHaveText('margaret');
});

test('closes on Escape without changing the selection', async ({ page }) => {
  await page.getByRole('combobox').click();

  await page.keyboard.press('Escape');

  await expect(page.getByRole('listbox')).toBeHidden();
  await expect(page.getByTestId('selection')).toHaveText('ada');
});

test('leaves the input in the tab order', async ({ page }) => {
  await page.getByTestId('before').focus();

  await page.keyboard.press('Tab');

  await expect(page.getByRole('combobox')).toBeFocused();
});
