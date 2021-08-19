export default function add(a: number, b: number): number {
  if (process.env.NODE_ENV !== 'production') {
    console.log('This code would not appear on production builds');
  }
  return a + b;
}
