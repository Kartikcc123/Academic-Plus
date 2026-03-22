const fs = require('fs');
const path = require('path');

const defaults = {
  applicationId: 'com.academicplus.app',
  appName: 'Academic Plus',
  launcherName: 'Academic Plus',
  domain: 'your-domain.com',
  themeColor: '#102033',
  backgroundColor: '#fcfaf5',
  startUrl: '/',
  fingerprint: 'REPLACE_WITH_YOUR_PLAY_APP_SIGNING_SHA256',
};

function parseArgs(argv) {
  const values = {};

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (!current.startsWith('--')) continue;

    const key = current.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith('--')) {
      values[key] = 'true';
      continue;
    }

    values[key] = next;
    index += 1;
  }

  return values;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const config = {
    applicationId: args.applicationId || defaults.applicationId,
    appName: args.appName || defaults.appName,
    launcherName: args.launcherName || args.appName || defaults.launcherName,
    domain: (args.domain || defaults.domain).replace(/^https?:\/\//i, '').replace(/\/+$/, ''),
    themeColor: args.themeColor || defaults.themeColor,
    backgroundColor: args.backgroundColor || defaults.backgroundColor,
    startUrl: args.startUrl || defaults.startUrl,
    fingerprint: args.fingerprint || defaults.fingerprint,
  };

  const root = path.resolve(__dirname, '..');
  const twaDir = path.join(root, 'twa');
  const wellKnownDir = path.join(root, 'client', 'public', '.well-known');

  ensureDir(twaDir);
  ensureDir(wellKnownDir);

  const webManifestUrl = `https://${config.domain}/manifest.webmanifest`;
  const iconUrl = `https://${config.domain}/icons/icon-512.png`;
  const maskableIconUrl = `https://${config.domain}/icons/icon-maskable.png`;

  const bubblewrapConfig = {
    packageId: config.applicationId,
    host: config.domain,
    name: config.appName,
    launcherName: config.launcherName,
    display: 'standalone',
    themeColor: config.themeColor,
    navigationColor: config.themeColor,
    backgroundColor: config.backgroundColor,
    startUrl: config.startUrl,
    applicationId: config.applicationId,
    webManifestUrl,
    iconUrl,
    maskableIconUrl,
    fallbackType: 'customtabs',
    enableNotifications: false,
    shortcuts: [],
    features: {
      playBilling: false,
    },
    generatorApp: 'bubblewrap',
  };

  const assetLinks = [
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: config.applicationId,
        sha256_cert_fingerprints: [config.fingerprint],
      },
    },
  ];

  writeJson(path.join(twaDir, 'bubblewrap.config.json'), bubblewrapConfig);
  writeJson(path.join(wellKnownDir, 'assetlinks.json'), assetLinks);

  process.stdout.write(
    [
      'TWA files prepared:',
      `- ${path.join(twaDir, 'bubblewrap.config.json')}`,
      `- ${path.join(wellKnownDir, 'assetlinks.json')}`,
      '',
      `Next: deploy https://${config.domain}/.well-known/assetlinks.json and run Bubblewrap against ${webManifestUrl}.`,
    ].join('\n'),
  );
}

main();
