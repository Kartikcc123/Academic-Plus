# Android App Packaging With Bubblewrap

This project is PWA-ready and can be wrapped into an Android app using Bubblewrap and a Trusted Web Activity.

## Hard requirements

Bubblewrap cannot build a valid Android wrapper from a local folder alone.

You need:

1. A live `https://` production URL
2. The PWA manifest reachable at:
   `https://YOUR_DOMAIN/manifest.webmanifest`
3. The same origin serving the app shell
4. A matching Digital Asset Links file at:
   `https://YOUR_DOMAIN/.well-known/assetlinks.json`
5. Bubblewrap, Java, Android SDK, and Android build tools installed on the machine that will build the Android package

## Recommended Android identifiers

Use these values unless you have a stronger naming scheme:

- App name: `Academic Plus`
- Launcher name: `Academic Plus`
- Package ID: `com.academicplus.app`
- Start URL: `https://YOUR_DOMAIN/`
- Web manifest URL: `https://YOUR_DOMAIN/manifest.webmanifest`

## Install Bubblewrap

```bash
npm install -g @bubblewrap/cli
```

## Initialize the Android wrapper

Run this after the site is deployed:

```bash
bubblewrap init --manifest=https://YOUR_DOMAIN/manifest.webmanifest
```

During prompts, use values similar to:

- Domain: `your_domain`
- Application name: `Academic Plus`
- Package ID: `com.academicplus.app`
- Start URL: `https://YOUR_DOMAIN/`
- Display mode: `standalone`
- Theme color: `#102033`
- Background color: `#fcfaf5`

Bubblewrap will generate the Android wrapper project and signing configuration prompts.

## Build the Android app

```bash
bubblewrap build
```

This produces the Android package from the generated wrapper project.

## Digital Asset Links

The wrapped Android app must be verified against your domain. Publish an `assetlinks.json` file at:

`https://YOUR_DOMAIN/.well-known/assetlinks.json`

Use the template in [assetlinks.template.json](/d:/ACP/docs/assetlinks.template.json) and replace:

- `com.academicplus.app` if your package name changes
- `YOUR_RELEASE_SHA256_FINGERPRINT` with the SHA-256 signing certificate fingerprint from the Android keystore used to sign the release build

## Suggested release flow

1. Deploy the PWA to production over HTTPS.
2. Confirm `https://YOUR_DOMAIN/manifest.webmanifest` loads correctly.
3. Install Bubblewrap.
4. Run `bubblewrap init --manifest=...`.
5. Build with `bubblewrap build`.
6. Publish the generated `assetlinks.json` to `/.well-known/assetlinks.json`.
7. Rebuild/retest if the signing fingerprint changes.

## Notes

- The current repo is ready on the web side, but the actual Android wrapper cannot be generated until a real production URL exists.
- If you want, the next step can be:
  - deploying this app first, or
  - generating a full Bubblewrap wrapper once you provide the final HTTPS domain.

## References

- Bubblewrap: https://github.com/GoogleChromeLabs/bubblewrap
- Trusted Web Activity quick start: https://developer.chrome.com/docs/android/trusted-web-activity/quick-start
