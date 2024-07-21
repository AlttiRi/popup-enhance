import {defineConfig} from "vite";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src")
      }
    ]
  },
  base: "./",
  server: {
    open: "./"
  },
  esbuild: {
    target: "es2021",
  },
  build: {
    target: "es2020",
    sourcemap: true,
    minify: false,
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        minifyInternalExports: false,
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
        manualChunks(id) {
          if (id.includes("popup-enh-core")) {
            return "popup-enh-core";
          }
          if (id.includes("popup-enh-extra")) {
            return "popup-enh-extra";
          }
        },
      }
    }
  }
});
