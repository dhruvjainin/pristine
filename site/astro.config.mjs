// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://pristine.pages.dev",
  output: "static",
  trailingSlash: "ignore",
  build: { format: "directory" },
});
