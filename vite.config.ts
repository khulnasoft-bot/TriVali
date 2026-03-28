import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Trivali',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
    },
    rollupOptions: {
      external: ['property-expr', 'tiny-case', 'toposort', 'type-fest'],
      output: {
        globals: {
          'property-expr': 'propertyExpr',
          'tiny-case': 'tinyCase',
          'toposort': 'toposort',
          'type-fest': 'typeFest',
        },
      },
    },
    sourcemap: true,
    minify: false,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'lib',
    }),
  ],
});
