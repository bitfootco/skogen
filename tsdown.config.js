import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts', 'src/plugin.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  deps: {
    neverBundle: ['react', 'react-dom', 'tailwindcss'],
  },
});
