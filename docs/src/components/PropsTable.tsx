import {
  For,
  JSX,
} from 'solid-js';
import { PropInfo } from '../page-data/meta';
import ClientOnly from './ClientOnly';
import CodeSnippet from './CodeSnippet';

export interface PropsTableProps {
  props: PropInfo[];
}

export default function PropsTable(props: PropsTableProps): JSX.Element {
  return (
    <div class="overflow-auto">
      <table class="min-w-full table-auto text-sm">
        <thead class="bg-gray-800 text-gray-50">
          <tr>
            <th class="p-2 rounded-tl-lg rounded-bl-lg">Name</th>
            <th class="p-2">Type</th>
            <th class="p-2">Default</th>
            <th class="p-2 rounded-tr-lg rounded-br-lg">Description</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-800 dark:divide-gray-50">
          <For each={props.props}>
            {(item) => (
              <tr>
                <td class="p-2">{item.name}</td>
                <td>
                  <ClientOnly>
                    <CodeSnippet code={item.type} />
                  </ClientOnly>
                </td>
                <td>
                  <ClientOnly>
                    <CodeSnippet code={item.default} />
                  </ClientOnly>
                </td>
                <td class="p-2">{item.description}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
}
