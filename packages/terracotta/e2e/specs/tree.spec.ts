import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/?case=tree');
});

test('is one tab stop, and the arrow keys open and walk the tree', async ({ page }) => {
  await page.getByRole('button', { name: 'Before' }).focus();
  await page.keyboard.press('Tab');
  const documents = page.getByRole('treeitem', { name: 'Documents' });
  await expect(documents).toBeFocused();

  await page.keyboard.press('ArrowRight');
  await expect(documents).toHaveAttribute('aria-expanded', 'true');

  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('treeitem', { name: 'CV.pdf' })).toBeFocused();

  await page.keyboard.press('ArrowDown');
  const music = page.getByRole('treeitem', { name: 'Music' });
  await expect(music).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'After' })).toBeFocused();

  // Tab returns to the node that last had focus.
  await page.keyboard.press('Shift+Tab');
  await expect(music).toBeFocused();
});

test('selects a node on click and with Enter', async ({ page }) => {
  const music = page.getByRole('treeitem', { name: 'Music' });
  await music.click();
  await expect(music).toHaveAttribute('aria-selected', 'true');
  await expect(music).toBeFocused();

  await page.keyboard.press('Home');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('treeitem', { name: 'Documents' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(music).toHaveAttribute('aria-selected', 'false');
});
