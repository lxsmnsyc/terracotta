/* eslint-disable no-self-compare */
export default function isEqual(a: unknown, b: unknown) {
  return a === b || ((a !== a) && (b !== b));
}
