import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        //target: "http://localhost:5000", // 🔁 Cambiado para apuntar al backend local
        target: "https://chizatoback.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
