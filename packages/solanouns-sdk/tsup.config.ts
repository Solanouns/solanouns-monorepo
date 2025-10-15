import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'client/token': 'src/client/token.ts',
    'client/auction-house': 'src/client/auction-house.ts',
    'client/governance': 'src/client/governance.ts',
    'utils/image': 'src/utils/image.ts',
    'utils/solana': 'src/utils/solana.ts',
  },
  format: ['esm'],
  dts: {
    compilerOptions: {
      composite: false,
    },
  },
  clean: true,
  target: 'es2021',
  sourcemap: true,
  treeshake: true,
  splitting: false,
  minify: false,
  loader: {
    '.json': 'json',
  },
});