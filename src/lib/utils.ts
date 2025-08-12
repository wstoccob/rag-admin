/**
 * Utility function to extract filename from path
 */
export function getFileName(path: string): string {
  return path.split('\\').pop() || path.split('/').pop() || path;
}
