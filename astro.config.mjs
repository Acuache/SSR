// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import db from "@astrojs/db";
import vercel from "@astrojs/vercel";
// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), db()],
  output: "static",
  adapter: vercel(),
});