# PWA and offline behavior

`manifest.webmanifest` configures standalone landscape launch under the GitHub Pages base path. The service worker uses a network-first strategy and caches the application shell and successfully fetched runtime assets.

The service worker is registered only in production. Deploy smoke tests should confirm `index.html`, the JavaScript/CSS bundles, manifest, icon, and `sw.js` are all served below `/orbit/`.

## Manual install button

Chromium browsers only show their automatic "install app" banner once an
engagement heuristic is met (repeat visits, time on site), and some
browsers never show one at all — a player can easily never see it. To give
a reliable install path, `App.tsx` listens for the `beforeinstallprompt`
event, stops it from auto-firing (`event.preventDefault()`), and stashes it.
The main screen shows an "Install App" button next to Fullscreen whenever
that stashed event is available; tapping it replays the browser's own
native prompt (`event.prompt()`).

- If the app is already running standalone (`display-mode: standalone` or
  iOS's `navigator.standalone`), no install UI is shown.
- On browsers that never fire `beforeinstallprompt`, Settings shows a
  static instructional hint instead, so there's still a clear next step:
  - iOS Safari: "Share → Add to Home Screen"
  - Samsung Internet (Chromium-based, but doesn't reliably fire the event):
    "browser menu → Add page to → Home screen" — detected via the
    `SamsungBrowser` UA token, since there's no feature-detectable signal.
- On other browsers that don't support the event and don't match a known
  UA (e.g. desktop Firefox), no install UI is shown — there's no
  programmatic or documented manual path to offer.
