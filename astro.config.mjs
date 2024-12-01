// import sitemap from '@astrojs/sitemap';
// import tailwind from '@astrojs/tailwind';
// import vercel from '@astrojs/vercel/serverless';
// import { defineConfig } from 'astro/config';

// // https://astro.build/config
// export default defineConfig({
// 	site: 'https://achyutkoirala.com.np', // Required for sitemap -> Replace with your site's URL
// 	output: 'hybrid',
// 	integrations: [tailwind(), sitemap()],
// 	adapter: vercel(),
// });
import { defineConfig } from "astro/config"

import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  site: "https://achyutkoirala.com.np",
  output: "static",
  integrations: [tailwind()],
})
