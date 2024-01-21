// Object.is is too slow
// === is too inaccurate
export default function isEqual(a: unknown, b: unknown): boolean {
  return a === b || (a !== a && b !== b);
}
