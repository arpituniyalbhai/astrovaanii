export function clearAppStorage() {
  if (typeof window === "undefined") return;

  // Remove every cached browser value so a different user starts clean.
  localStorage.clear();
}
