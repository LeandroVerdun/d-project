// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
<<<<<<< HEAD
        target: "https://www.omdbapi.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
=======
        target: "http://localhost:5000", // 🔁 Cambiado para apuntar al backend local
        changeOrigin: true,
        secure: false, // Opcional, útil si usás HTTPS con certificado autofirmado
>>>>>>> backup-local-cambios
      },
    },
  },
});
