#!/usr/bin/env bash
# Vercel's "Ignored Build Step". Exit 0 skips the deployment, exit 1 builds.
# Vercel runs it from the project's root directory, `docs`.
#
# Only `main` deploys, and only when the site or what it is built from changed:
# the site itself, the library it documents and runs, and the workspace's
# lockfile, catalog and root package.json.

if [ "$VERCEL_GIT_COMMIT_REF" != "main" ]; then
  echo "Skipping: $VERCEL_GIT_COMMIT_REF is not main."
  exit 0
fi

# The commit of the last deployment, or the one before this commit.
base="${VERCEL_GIT_PREVIOUS_SHA:-HEAD^}"

# A base the clone does not have, like on the first deployment, builds.
if ! git cat-file -e "$base^{commit}" 2>/dev/null; then
  echo "Building: $base is not in the clone."
  exit 1
fi

if git diff --quiet "$base" HEAD -- . ../packages/terracotta ../pnpm-lock.yaml ../pnpm-workspace.yaml ../package.json; then
  echo "Skipping: nothing the site is built from changed since $base."
  exit 0
fi
echo "Building: the site or the library changed since $base."
exit 1
