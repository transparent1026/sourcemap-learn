import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue()],
  build: {
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true,
    // rollupOptions: {
    //   input: ['src/index.html']
    // }
  },
});
