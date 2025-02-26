export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove non-alphanumeric characters
    .replace(/--+/g, "-") // Replace multiple hyphens with a single one
    .trim();
}

export function getLastPathSegment(path: string): string {
  return path.split("/").filter(Boolean).pop() || ""; // Get last segment
}
