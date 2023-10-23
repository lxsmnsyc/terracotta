import {
  Menu,
  MenuItem,
} from 'terracotta';
import { JSX } from 'solid-js';

function ChevronDownIcon(props: JSX.IntrinsicElements['svg']): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

function Separator() {
  return (
    <div class="flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-200" />
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <div class="w-full flex items-center justify-center">
      <Menu class="overflow-hidden w-64 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white flex flex-col space-y-1 p-1">
        <MenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-purple-600 hover:text-white focus:outline-none focus:bg-purple-600 focus:text-white">
          Open Link in New Tab
        </MenuItem>
        <MenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-purple-600 hover:text-white focus:outline-none focus:bg-purple-600 focus:text-white">
          Open Link in New Window
        </MenuItem>
        <MenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-purple-600 hover:text-white focus:outline-none focus:bg-purple-600 focus:text-white">
          Open Link in New Incognito Window
        </MenuItem>
        <Separator />
        <MenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-purple-600 hover:text-white focus:outline-none focus:bg-purple-600 focus:text-white">
          Save Link As...
        </MenuItem>
        <MenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-purple-600 hover:text-white focus:outline-none focus:bg-purple-600 focus:text-white">
          Copy Link Address
        </MenuItem>
        <Separator />
        <MenuItem as="button" class="text-sm p-1 text-left rounded hover:bg-purple-600 hover:text-white focus:outline-none focus:bg-purple-600 focus:text-white">
          Inspect
        </MenuItem>
      </Menu>
    </div>
  );
}
