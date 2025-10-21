import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Allow access from any network interface
    port: 8080, // Dev server port
  },

  plugins: [
    react(), // React support with SWC (faster build)
    mode === "development" && componentTagger(), // Tag components only in dev mode
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Shortcut for imports (e.g., "@/components/Navbar")
      "@assets": path.resolve(__dirname, "./src/assets"), // Easy access to images/logos
      "@components": path.resolve(__dirname, "./src/components"), // Shortcut for components
    },
  },

  // 👇 Optional: Build optimizations
  build: {
    outDir: "dist",
    sourcemap: mode === "development",
  },

  // 👇 Optional: Define environment variables
  define: {
    __APP_VERSION__: JSON.stringify("1.0.0"),
  },
}));
