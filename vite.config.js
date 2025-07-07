// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://chizatoback.onrender.com", // 🔁 Cambiado para apuntar al backend local
        changeOrigin: true,
        secure: false, // Opcional, útil si usás HTTPS con certificado autofirmado
      },
    },
  },
});
