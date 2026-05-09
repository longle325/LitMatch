import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const srcPath = decodeURIComponent(new URL("./src", import.meta.url).pathname);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": srcPath,
    },
  },
  server: {
    host: "127.0.0.1",
  },
});
