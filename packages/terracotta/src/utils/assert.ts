export default function assert<T extends Error>(
  cond: unknown,
  error: T,
): asserts cond {
  if (!cond) {
    throw error;
  }
}
