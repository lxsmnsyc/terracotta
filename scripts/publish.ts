/**
 * Publishes every public workspace package whose current version is not on npm
 * yet, then tags the release so the Changesets action can open a GitHub release
 * for it.
 *
 * This stands in for `changeset publish`, which publishes through
 * `pnpm publish`. npm trusted publishing authenticates in the npm CLI itself,
 * and `pnpm publish` has been reported failing to pick that up where
 * `npm publish` succeeds. So each package is packed with pnpm, which rewrites
 * `workspace:` and `catalog:` specifiers into real ranges, and the tarball is
 * published with npm.
 *
 * A version already on npm is skipped rather than published again, which npm
 * would reject. The Changesets action runs this on every push to `main` that has
 * no pending changesets, most of which have nothing new to publish.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** The fields of a package manifest this script reads. */
interface Manifest {
  name: string;
  version: string;
  private?: boolean;
  scripts?: Record<string, string>;
}

function isManifest(value: unknown): value is Manifest {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    typeof value.name === 'string' &&
    'version' in value &&
    typeof value.version === 'string'
  );
}

function readManifest(dir: string): Manifest {
  const parsed: unknown = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
  if (!isManifest(parsed)) {
    throw new Error(`${dir}/package.json has no name or version`);
  }
  return parsed;
}

/** Progress for the Actions log. */
function log(message: string): void {
  process.stdout.write(`${message}\n`);
}

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PACKAGES = join(ROOT, 'packages');

function run(command: string, args: string[], cwd: string): void {
  execFileSync(command, args, { cwd, stdio: 'inherit' });
}

function isPublished(name: string, version: string): boolean {
  try {
    const found = execFileSync('npm', ['view', `${name}@${version}`, 'version'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    return found.trim() === version;
  } catch {
    // `npm view` exits non-zero for a version the registry does not have.
    return false;
  }
}

/**
 * The dist-tag to publish under. A prerelease goes out under its identifier
 * (`2.0.0-next.9` under `next`), because `npm publish` otherwise defaults to
 * `latest` and would point every stable user at a prerelease.
 */
function distTagOf(version: string): string {
  const prerelease = /^\d+\.\d+\.\d+-([0-9A-Za-z-]+)/.exec(version);
  return prerelease ? prerelease[1] : 'latest';
}

let published = 0;

for (const entry of readdirSync(PACKAGES, { withFileTypes: true })) {
  if (!entry.isDirectory()) {
    continue;
  }
  const dir = join(PACKAGES, entry.name);
  const pkg = readManifest(dir);
  if (pkg.private) {
    continue;
  }

  if (isPublished(pkg.name, pkg.version)) {
    log(`${pkg.name}@${pkg.version} is already on npm, skipping.`);
    continue;
  }

  const tag = distTagOf(pkg.version);
  log(`Publishing ${pkg.name}@${pkg.version} under "${tag}".`);

  // Publishing a tarball skips the package's lifecycle scripts, so the build
  // `prepublishOnly` would have run has to happen before packing.
  let build: string | undefined;
  if (pkg.scripts?.prepublishOnly) {
    build = 'prepublishOnly';
  } else if (pkg.scripts?.build) {
    build = 'build';
  }
  if (build !== undefined) {
    run('pnpm', ['run', build], dir);
  }

  const out = mkdtempSync(join(tmpdir(), 'terracotta-pack-'));
  try {
    run('pnpm', ['pack', '--pack-destination', out], dir);
    const tarball = readdirSync(out).find((file) => file.endsWith('.tgz'));
    if (tarball === undefined) {
      throw new Error(`pnpm pack produced no tarball for ${pkg.name}`);
    }
    // Trusted publishing attaches provenance on its own, so no token and no
    // `--provenance` flag are needed.
    run('npm', ['publish', join(out, tarball), '--access', 'public', '--tag', tag], dir);
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
  published += 1;
}

// Tags every public package version that has no git tag yet, and records each
// one in the `CHANGESETS_OUTPUT` file the Changesets action reads to push the
// tag and open a GitHub release. Run even when nothing was published, so a
// release whose tagging failed after a successful publish is tagged next time.
run('pnpm', ['exec', 'changeset', 'git-tag'], ROOT);

log(published > 0 ? `Published ${published} package(s).` : 'Nothing new to publish.');
