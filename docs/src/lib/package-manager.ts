import { createSignal } from 'solid-js';

/**
 * The package manager the install commands are written for. The choice lives
 * in the `data-pm` attribute of the root element and in local storage. Every
 * install chip renders the command for each manager, and the stylesheet shows
 * the chosen one, so a prerendered page never flashes the default.
 */

export const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun'] as const;

export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

export const PACKAGE_MANAGER_STORAGE_KEY = 'tc-docs-package-manager';

const DEFAULT_PACKAGE_MANAGER: PackageManager = 'npm';

const ADD_COMMANDS: Record<PackageManager, string> = {
  npm: 'npm install',
  pnpm: 'pnpm add',
  yarn: 'yarn add',
  bun: 'bun add',
};

export const PACKAGE_NAME = 'terracotta';

export function isPackageManager(value: string | null | undefined): value is PackageManager {
  return value != null && (PACKAGE_MANAGERS as readonly string[]).includes(value);
}

/** Builds the command that installs Terracotta with `manager`. */
export function buildInstallCommand(manager: PackageManager): string {
  return `${ADD_COMMANDS[manager]} ${PACKAGE_NAME}`;
}

// Starts at the default on the client too, so hydration matches the
// prerendered markup. `restorePackageManager` applies the stored choice after.
const [packageManager, setPackageManagerSignal] =
  createSignal<PackageManager>(DEFAULT_PACKAGE_MANAGER);

export { packageManager };

/** Returns the choice the boot script in `Document` copied to the root element. */
export function readPackageManager(): PackageManager {
  const value = document.documentElement.dataset.pm;
  return isPackageManager(value) ? value : DEFAULT_PACKAGE_MANAGER;
}

export function restorePackageManager(): void {
  setPackageManagerSignal(readPackageManager());
}

export function setPackageManager(manager: PackageManager): void {
  setPackageManagerSignal(manager);
  document.documentElement.dataset.pm = manager;
  try {
    localStorage.setItem(PACKAGE_MANAGER_STORAGE_KEY, manager);
  } catch {
    // Storage can be blocked. The choice then lasts for this page only.
  }
}

/** Runs in `<head>` before the first paint, next to the theme boot script. */
export const PACKAGE_MANAGER_BOOT_SCRIPT = `(function(){try{
var m=localStorage.getItem(${JSON.stringify(PACKAGE_MANAGER_STORAGE_KEY)});
if(${JSON.stringify(PACKAGE_MANAGERS)}.indexOf(m)>=0)document.documentElement.dataset.pm=m;
}catch(e){}})()`;
