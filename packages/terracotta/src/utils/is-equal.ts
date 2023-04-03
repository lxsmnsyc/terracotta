/* eslint-disable no-self-compare */

// Object.is is too slow
// === is too inaccurate
export default function isEqual(a: unknown, b: unknown) {
  return a === b || ((a !== a) && (b !== b));
}
