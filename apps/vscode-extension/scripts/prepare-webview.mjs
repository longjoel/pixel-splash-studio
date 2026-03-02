import { cp, mkdir, readFile, rm, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const rendererDistDir = path.join(repoRoot, 'dist');
const targetDir = path.join(repoRoot, 'apps/vscode-extension/media/web');

const ensureDir = async (dir) => {
  await mkdir(dir, { recursive: true });
};

const extractAssets = (html) => {
  const scriptMatches = Array.from(
    html.matchAll(/<script[^>]*type="module"[^>]*src="([^"]+)"/g)
  ).map((match) => match[1]);
  const styleMatches = Array.from(
    html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)
  ).map((match) => match[1]);

  const normalize = (assetPath) =>
    assetPath.replace(/^\.\//, '').replace(/^\/+/, '');

  return {
    scripts: scriptMatches.map(normalize),
    styles: styleMatches.map(normalize),
  };
};

const run = async () => {
  const indexPath = path.join(rendererDistDir, 'index.html');
  const indexHtml = await readFile(indexPath, 'utf8');
  const manifest = extractAssets(indexHtml);

  await rm(targetDir, { recursive: true, force: true });
  await ensureDir(targetDir);

  await cp(path.join(rendererDistDir, 'assets'), path.join(targetDir, 'assets'), {
    recursive: true,
  });

  await writeFile(path.join(targetDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('[prepare-webview] Wrote manifest with assets:', manifest);
};

run().catch((error) => {
  console.error('[prepare-webview] Failed:', error);
  process.exit(1);
});
