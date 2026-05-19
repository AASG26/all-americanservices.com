# All-American Services Group — Favicon Package (Option 4: House + Foundation)

## Files

| File | Purpose |
|------|---------|
| `favicon.ico` | Multi-size .ico (16/32/48) — legacy browsers |
| `favicon.svg` | Vector master — modern browsers, infinitely scalable |
| `favicon-16x16.png` | Browser tabs |
| `favicon-32x32.png` | Browser tabs (retina), bookmarks |
| `favicon-48x48.png` | Windows site tiles |
| `apple-touch-icon.png` | 180×180 — iOS home screen |
| `android-chrome-192x192.png` | Android home screen |
| `android-chrome-512x512.png` | PWA splash screen, app stores |

`site.webmanifest` lives at `docs/site.webmanifest` and references the two Android icons above.

## Current `<head>` tags in `index.html`

```html
<link rel="icon" href="/images/favicons/favicon.ico" sizes="any" />
<link rel="icon" type="image/svg+xml" href="/images/favicons/favicon.svg" />
<link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="48x48" href="/images/favicons/favicon-48x48.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/images/favicons/android-chrome-192x192.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#0f2b5d" />
```

> Favicons are aggressively cached — hard-refresh with Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac) after any changes.
