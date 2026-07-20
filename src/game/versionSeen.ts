const LAST_SEEN_VERSION_KEY = 'pang.last_seen_version.v1'

export function getLastSeenVersion(): string | null {
  return localStorage.getItem(LAST_SEEN_VERSION_KEY)
}

export function setLastSeenVersion(version: string): void {
  localStorage.setItem(LAST_SEEN_VERSION_KEY, version)
}
