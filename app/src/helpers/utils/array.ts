export function getUniqueArray<T>(array: T[]): T[] {
  return Array.from(new Set(array))
}
