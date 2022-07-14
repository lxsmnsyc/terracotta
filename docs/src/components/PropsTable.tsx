import {
  For,
  JSX,
} from 'solid-js';
import { PropInfo } from '../page-data/meta';
import CodeSnippet from './CodeSnippet';

export interface PropsTableProps {
  props: PropInfo[];
}

export default function PropsTable(props: PropsTableProps): JSX.Element {
  return (
    <div class="overflow-scroll">
      <table class="min-w-full table-auto text-sm dark:border-gray-50">
        <thead class="bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900">
          <tr>
            <th class="p-2 rounded-tl-lg rounded-bl-lg">Name</th>
            <th class="p-2">Type</th>
            <th class="p-2">Default</th>
            <th class="p-2 rounded-tr-lg rounded-br-lg">Description</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-900 dark:divide-gray-50">
          <For each={props.props}>
            {(item) => (
              <tr>
                <td class="p-2">{item.name}</td>
                <td><CodeSnippet code={item.type} /></td>
                <td><CodeSnippet code={item.default} /></td>
                <td class="p-2">{item.description}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
