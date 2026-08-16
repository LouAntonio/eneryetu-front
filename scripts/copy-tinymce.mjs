import { cpSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, '../node_modules/tinymce');
const dest = join(root, '../public/tinymce');

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log('TinyMCE copied to public/tinymce');
