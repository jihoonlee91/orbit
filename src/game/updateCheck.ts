// Polls the deployed index.html (bypassing the HTTP cache) for its
// build-time app-version meta tag, so a long-lived session/installed PWA can
// notice a newer version has been deployed without needing to fully
// close and reopen.
export async function isUpdateAvailable(): Promise<boolean> {
  try {
    const url = `${import.meta.env.BASE_URL}index.html?_=${Date.now()}`
    const response = await fetch(url, { cache: 'no-store' })
    if (!response.ok) return false

    const html = await response.text()
    const match = /<meta\s+name="app-version"\s+content="([^"]+)"/i.exec(html)
    const latestVersion = match?.[1]
    return latestVersion !== undefined && latestVersion !== __APP_VERSION__
  } catch {
    return false
  }
}

export async function clearAppCache(): Promise<void> {
  if ('caches' in window) {
    const keys = await caches.keys()
    await Promise.all(keys.map((key) => caches.delete(key)))
  }
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    await Promise.all(registrations.map((reg) => reg.unregister()))
  }
}
