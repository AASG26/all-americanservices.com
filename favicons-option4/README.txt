All-American Services Group — Favicon Package (Option 4: House + Foundation)
=============================================================================

FILES
-----
  favicon.ico                   Multi-size .ico (16/32/48) — legacy browsers
  favicon.svg                   Vector master — modern browsers, infinitely scalable
  favicon-16x16.png             Browser tabs
  favicon-32x32.png             Browser tabs (retina), bookmarks
  favicon-48x48.png             Windows site tiles
  apple-touch-icon.png          180×180 — iOS home screen
  android-chrome-192x192.png    Android home screen
  android-chrome-512x512.png    PWA splash screen, app stores
  site.webmanifest              PWA manifest (theme color, icons)

INSTALL
-------
1. Drop all files into the root of your website (same directory as index.html).

2. Add these lines inside the <head> of index.html:

   <link rel="icon" href="/favicon.ico" sizes="any">
   <link rel="icon" type="image/svg+xml" href="/favicon.svg">
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
   <link rel="manifest" href="/site.webmanifest">
   <meta name="theme-color" content="#0f2b5d">

3. Hard-refresh your browser (Ctrl+Shift+R / Cmd+Shift+R) — favicons are
   aggressively cached, so old ones can stick around.
