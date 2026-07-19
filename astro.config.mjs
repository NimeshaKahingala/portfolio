// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build
export default defineConfig({
  site: 'https://nimesha.dev',
  trailingSlash: 'always',
  integrations: [sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
