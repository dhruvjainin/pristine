// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://pristine-ui.pages.dev",
  output: "static",
  trailingSlash: "ignore",
  build: { format: "directory" },
});
