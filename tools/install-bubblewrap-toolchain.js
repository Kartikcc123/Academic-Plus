const fs = require('fs/promises');
const path = require('path');
const os = require('os');

async function main() {
  const globalNodeModules = path.join(process.env.APPDATA, 'npm', 'node_modules', '@bubblewrap', 'cli');
  const { JdkInstaller } = require(path.join(globalNodeModules, 'dist', 'lib', 'JdkInstaller.js'));
  const { AndroidSdkToolsInstaller } = require(path.join(globalNodeModules, 'dist', 'lib', 'AndroidSdkToolsInstaller.js'));
  const { InquirerPrompt } = require(path.join(globalNodeModules, 'dist', 'lib', 'Prompt.js'));

  const toolchainRoot = path.resolve('d:/ACP/android-toolchain');
  const jdkRoot = path.join(toolchainRoot, 'jdk');
  const sdkRoot = path.join(toolchainRoot, 'android_sdk');

  await fs.mkdir(toolchainRoot, { recursive: true });
  await fs.mkdir(jdkRoot, { recursive: true });
  await fs.mkdir(sdkRoot, { recursive: true });

  const prompt = new InquirerPrompt();

  const hasJdk = await pathExists(path.join(jdkRoot, 'jdk-17.0.11+9', 'release'));
  const hasSdk = await pathExists(path.join(sdkRoot, 'cmdline-tools'));

  let installedJdkPath = path.join(jdkRoot, 'jdk-17.0.11+9');
  if (!hasJdk) {
    console.log('Installing JDK 17...');
    const jdkInstaller = new JdkInstaller(process, prompt);
    installedJdkPath = await jdkInstaller.install(jdkRoot);
  } else {
    console.log(`Using existing JDK at ${installedJdkPath}`);
  }

  if (!hasSdk) {
    console.log('Installing Android command line tools...');
    const sdkInstaller = new AndroidSdkToolsInstaller(process, prompt);
    await sdkInstaller.install(sdkRoot);
  } else {
    console.log(`Using existing Android SDK tools at ${sdkRoot}`);
  }

  const bubblewrapConfigDir = path.join(os.homedir(), '.bubblewrap');
  const bubblewrapConfigPath = path.join(bubblewrapConfigDir, 'config.json');
  await fs.mkdir(bubblewrapConfigDir, { recursive: true });
  await fs.writeFile(
    bubblewrapConfigPath,
    JSON.stringify(
      {
        jdkPath: installedJdkPath,
        androidSdkPath: sdkRoot,
      },
      null,
      2,
    ),
    'utf8',
  );

  console.log(`Bubblewrap config written to ${bubblewrapConfigPath}`);
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
