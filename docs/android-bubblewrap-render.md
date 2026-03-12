# Bubblewrap Setup For Academic Plus

Production app URL:

`https://academic-plus-ajay1.onrender.com/`

Manifest URL:

`https://academic-plus-ajay1.onrender.com/manifest.json`

Recommended Android app identity:

- App name: `Academic Plus`
- Launcher name: `Academic Plus`
- Package ID: `com.academicplus.app`
- Start URL: `/`
- Host: `academic-plus-ajay1.onrender.com`

## Official references

- Bubblewrap / TWA quick start:
  https://developer.chrome.com/docs/android/trusted-web-activity/quick-start
- PWA in Play / Bubblewrap flow:
  https://developers.google.com/chromeos/app-development/publish/pwa-in-play

## Install Bubblewrap

```bash
npm install -g @bubblewrap/cli
```

## Initialize the Android wrapper

Create a separate folder for the Android wrapper project and run:

```bash
mkdir academic-plus-android
cd academic-plus-android
bubblewrap init --manifest=https://academic-plus-ajay1.onrender.com/manifest.json
```

When Bubblewrap asks questions, use:

- Package ID: `com.academicplus.app`
- App name: `Academic Plus`
- Launcher name: `Academic Plus`
- Domain / host: `academic-plus-ajay1.onrender.com`
- Start URL: `/`
- Display mode: `standalone`
- Theme color: `#102033`
- Background color: `#fcfaf5`

If Bubblewrap offers to download Android dependencies automatically, allow it. Chrome’s official docs recommend that path for first-time setup.

## Build the Android package

After init finishes:

```bash
bubblewrap build
```

This produces the Android output for testing / Play submission.

## Asset Links requirement

Trusted Web Activity verification requires:

`https://academic-plus-ajay1.onrender.com/.well-known/assetlinks.json`

That file must contain:

- package name: `com.academicplus.app`
- SHA-256 fingerprint from the signing key used to sign the Android release

You cannot finish TWA verification until you have the real signing fingerprint.

## After Bubblewrap creates the keystore

Use your generated keystore fingerprint and update the file template from:

[assetlinks.template.json](/d:/ACP/docs/assetlinks.template.json)

Then publish it at:

`client/public/.well-known/assetlinks.json`

and redeploy Render.

## Current blocker on this machine

The current environment does not have:

- `bubblewrap`
- Android SDK command-line tools on PATH
- signing tools on PATH

So the actual Android wrapper cannot be generated here without installing external dependencies.
