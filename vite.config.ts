import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
});