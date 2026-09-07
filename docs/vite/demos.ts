import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { highlight } from './highlighter';

const SOURCE_PREFIX = 'virtual:demo-source/';
const REGISTRY_ID = 'virtual:demo-registry';
const RESOLVED_REGISTRY_ID = '\0' + REGISTRY_ID;

export const DEMOS_DIR = 'src/demos';

/** `disclosure/toggle-label` -> `Toggle label` */
function titleOf(id: string): string {
  const name = id.slice(id.lastIndexOf('/') + 1).replace(/-/g, ' ');
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function fileOf(root: string, id: string): string {
  return path.join(root, DEMOS_DIR, `${id}.tsx`);
}

/**
 * One virtual module per demo instead of a single registry of sources: a doc
 * page imports only the demos it embeds, so a page's chunk never carries the
 * highlighted source of the other twenty-two components' examples.
 */
export function demosPlugin(): Plugin {
  let root = process.cwd();

  return {
    name: 'terracotta-docs:demos',

    configResolved(config) {
      root = config.root;
    },

    resolveId(id) {
      if (id === REGISTRY_ID) {
        return RESOLVED_REGISTRY_ID;
      }
      if (id.startsWith(SOURCE_PREFIX)) {
        return '\0' + id;
      }
      return undefined;
    },

    async load(id) {
      if (id === RESOLVED_REGISTRY_ID) {
        const dir = path.join(root, DEMOS_DIR);
        const ids = await collectDemoIds(dir);
        const entries = ids
          .map(
            (demoId) =>
              `  ${JSON.stringify(demoId)}: () => import(${JSON.stringify(
                `/${DEMOS_DIR}/${demoId}.tsx`,
              )}),`,
          )
          .join('\n');

        return `export const demos = {\n${entries}\n};\n`;
      }

      if (!id.startsWith('\0' + SOURCE_PREFIX)) {
        return undefined;
      }

      const demoId = id.slice(('\0' + SOURCE_PREFIX).length);
      const file = fileOf(root, demoId);
      const source = await fs.readFile(file, 'utf8');

      this.addWatchFile(file);

      return [
        `export const id = ${JSON.stringify(demoId)};`,
        `export const title = ${JSON.stringify(titleOf(demoId))};`,
        `export const code = ${JSON.stringify(await highlight(source, 'tsx'))};`,
      ].join('\n');
    },

    hotUpdate({ file, modules }) {
      const dir = path.join(root, DEMOS_DIR);
      if (!file.startsWith(dir + path.sep) || !file.endsWith('.tsx')) {
        return undefined;
      }

      const demoId = file.slice(dir.length + 1, -'.tsx'.length);
      const virtual = this.environment.moduleGraph.getModuleById('\0' + SOURCE_PREFIX + demoId);

      return virtual ? [...modules, virtual] : undefined;
    },
  };
}

async function collectDemoIds(dir: string, prefix = ''): Promise<string[]> {
  let dirents;
  try {
    dirents = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  const ids: string[] = [];
  for (const dirent of dirents) {
    if (dirent.isDirectory()) {
      ids.push(...(await collectDemoIds(path.join(dir, dirent.name), `${prefix}${dirent.name}/`)));
    } else if (dirent.name.endsWith('.tsx')) {
      ids.push(prefix + dirent.name.slice(0, -'.tsx'.length));
    }
  }
  return ids.sort();
}
