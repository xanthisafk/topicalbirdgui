// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  server: { port: 8888 },

  adapter: node({
    mode: 'standalone'
  })
});