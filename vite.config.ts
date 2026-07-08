import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const base =
  process.env.GITHUB_PAGES === "true" && repoName ? `/${repoName}/` : "/";

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [tailwindcss(), svelte()],
  resolve: { alias: { $lib: path.resolve("./src/lib") } },
});
