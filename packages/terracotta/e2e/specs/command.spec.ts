import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=command');
});

test('shows the option list without needing to be opened', async ({ page }) => {
  await expect(page.getByRole('listbox')).toBeVisible();
  await expect(page.getByRole('option')).toHaveCount(4);
});

test('keeps DOM focus in the input while the arrow keys move the active option', async ({
  page,
}) => {
  const input = page.getByRole('combobox');
  await input.click();

  // The list is always open, so the first option is active from the start.
  await expect(page.locator(`#${await input.getAttribute('aria-activedescendant')}`)).toHaveText(
    'open file',
  );

  await page.keyboard.press('ArrowDown');

  await expect(input).toBeFocused();
  const active = await input.getAttribute('aria-activedescendant');
  await expect(page.locator(`#${active}`)).toHaveText('close file');
});

test('skips disabled options with the arrow keys', async ({ page }) => {
  const input = page.getByRole('combobox');
  await input.click();

  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  const active = await input.getAttribute('aria-activedescendant');
  await expect(page.locator(`#${active}`)).toHaveText('rename file');

  // `delete file` is disabled, so the next step wraps to the top instead.
  await page.keyboard.press('ArrowDown');
  const wrapped = await input.getAttribute('aria-activedescendant');
  await expect(page.locator(`#${wrapped}`)).toHaveText('open file');
});

test('leaves Home and End to the text field', async ({ page }) => {
  const input = page.getByRole('combobox');
  await input.click();
  await page.keyboard.press('ArrowDown');

  await page.keyboard.press('End');

  // The input handles only the arrow keys and Enter, so Home and End stay with
  // the caret rather than jumping to the first or last option.
  const active = await input.getAttribute('aria-activedescendant');
  await expect(page.locator(`#${active}`)).toHaveText('close file');
});

test('filters the options as you type, once the query settles', async ({ page }) => {
  await page.getByRole('combobox').click();

  await page.keyboard.type('ren');

  await expect(page.getByRole('option', { name: 'rename file' })).toHaveAttribute('tc-matches', '');
  await expect(page.getByRole('option', { name: 'open file' })).not.toHaveAttribute(
    'tc-matches',
    '',
  );
});

test('commits a selection with Enter', async ({ page }) => {
  await page.getByRole('combobox').click();

  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');

  await expect(page.getByTestId('selection')).toHaveText('close file');
});

test('leaves the input in the tab order and the options out of it', async ({ page }) => {
  await page.getByTestId('before').focus();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('combobox')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByTestId('after')).toBeFocused();
});
