const fs = require('fs');
const path = require('path');

const cliRoot = path.join(process.env.APPDATA, 'npm', 'node_modules', '@bubblewrap', 'cli');
const { InquirerPrompt } = require(path.join(cliRoot, 'dist', 'lib', 'Prompt'));
const { JdkInstaller } = require(path.join(cliRoot, 'dist', 'lib', 'JdkInstaller'));
const { AndroidSdkToolsInstaller } = require(path.join(cliRoot, 'dist', 'lib', 'AndroidSdkToolsInstaller'));

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function main() {
  const workspaceRoot = path.resolve(__dirname, '..');
  const toolchainRoot = path.join(workspaceRoot, 'android-toolchain');
  const jdkRoot = path.join(toolchainRoot, 'jdk');
  const sdkRoot = path.join(toolchainRoot, 'android_sdk');
  const bubblewrapConfigDir = path.join(process.env.USERPROFILE, '.bubblewrap');
  const bubblewrapConfigPath = path.join(bubblewrapConfigDir, 'config.json');

  await ensureDir(toolchainRoot);
  await ensureDir(jdkRoot);
  await ensureDir(sdkRoot);
  await ensureDir(bubblewrapConfigDir);

  const prompt = new InquirerPrompt();
  const jdkInstaller = new JdkInstaller(process, prompt);
  const jdkPath = await jdkInstaller.install(jdkRoot);

  const config = {
    jdkPath,
    androidSdkPath: sdkRoot,
  };

  const sdkInstaller = new AndroidSdkToolsInstaller(process, prompt);
  await sdkInstaller.install(sdkRoot);

  await fs.promises.writeFile(bubblewrapConfigPath, JSON.stringify(config, null, 2));

  console.log(JSON.stringify(config, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
