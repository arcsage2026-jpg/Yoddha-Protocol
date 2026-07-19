import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.svg"],
      manifest: {
        name: "Yoddha Protocol",
        short_name: "Yoddha",
        description: "12-week warrior training — Shaolin, yoga, pehlwani, calisthenics, Tai Chi.",
        theme_color: "#191410",
        background_color: "#191410",
        display: "standalone",
        orientation: "portrait",
        icons: [
          { src: "icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,woff2}"]
      }
    })
  ]
});
