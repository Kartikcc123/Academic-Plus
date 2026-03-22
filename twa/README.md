# TWA Setup

This folder prepares the app for Trusted Web Activity packaging for the Play Store.

## 1. Generate TWA config

Run:

```powershell
cd d:\ACP\client
npm run twa:prepare -- --domain your-domain.com --applicationId com.academicplus.app --fingerprint AA:BB:CC:DD
```

This updates:

- `d:\ACP\twa\bubblewrap.config.json`
- `d:\ACP\client\public\.well-known\assetlinks.json`

## 2. Deploy and verify

Deploy the site so this URL is live:

```text
https://your-domain.com/.well-known/assetlinks.json
```

Your domain must be HTTPS and must serve the same web app manifest at:

```text
https://your-domain.com/manifest.webmanifest
```

## 3. Generate Android wrapper

If Bubblewrap is installed:

```powershell
cd d:\ACP
bubblewrap init --manifest https://your-domain.com/manifest.webmanifest
```

Then build the Android project:

```powershell
bubblewrap build
```

## 4. Play Store signing note

Use the Play App Signing SHA-256 fingerprint in `assetlinks.json`, not only your local debug keystore fingerprint.
