import { defineConfig } from 'vite';

import externals from '@yellowspot/vite-plugin-externals';

export default defineConfig({
  plugins: [
    externals({
      jquery: 'jQuery',
    })
  ]
});
