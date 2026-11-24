import { defineConfig } from 'tsup';
export default defineConfig({ entry: ['src/index.ts'], format: ['esm', 'cjs'], dts: true, clean: true, sourcemap: true, external: ['react', 'react-dom'], outExtension: ({ format }) => ({ js: format === 'cjs' ? '.cjs' : '.js' }), loader: { '.css': 'copy' } });
