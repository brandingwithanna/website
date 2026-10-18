import { cp, mkdir, readFile, readdir, rm, stat } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(join(root, 'index.html'), 'utf8');
for (const pattern of [/<title>[^<]+<\/title>/i, /name="description" content="[^"]+"/i, /rel="icon"/i]) {
  if (!pattern.test(html)) throw new Error(`Missing page metadata: ${pattern}`);
}
for (const file of ['config.js', 'site.js']) new Script(await readFile(join(root, file), 'utf8'), { filename: file });
for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const ref = match[1];
  if (/^(?:https?:|data:|#|mailto:)/.test(ref)) continue;
  await stat(join(root, ref.split(/[?#]/)[0]));
}
async function checkAssets(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const file = join(dir, item.name);
    if (item.isDirectory()) await checkAssets(file);
    else {
      const { size } = await stat(file);
      const max = /\.(png|jpe?g|webp|avif|svg|gif)$/i.test(file) ? 1_000_000 : /\.(mp4|webm|mov)$/i.test(file) ? 10_000_000 : 50_000_000;
      if (size >= max) throw new Error(`Asset exceeds size limit: ${item.name}`);
    }
  }
}
await checkAssets(join(root, 'images')); await checkAssets(join(root, 'fonts'));
const output = join(root, 'public');
await rm(output, { recursive: true, force: true }); await mkdir(output);
for (const file of ['index.html', 'styles.css', 'config.js', 'site.js', 'images', 'fonts']) {
  await cp(join(root, file), join(output, file), { recursive: true });
}
console.log('Build passed. Static website ready in public/.');
