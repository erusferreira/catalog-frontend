import { defineConfig } from 'vite';
import tsconfigPaths from "vite-tsconfig-paths";
import federation from "@originjs/vite-plugin-federation";
import EnvironmentPlugin from 'vite-plugin-environment';
import dotenv from 'dotenv';
dotenv.config()

const envMode = process.env.VITE_ENV_MODE;
const domainAddress = process.env.DOMAIN_ADDRESS;
const remoteAdminPath = process.env.MICROFRONTEND_ADMIN_PATH;
const remoteMerchantPath = process.env.MICROFRONTEND_MERCHANT_PATH;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    EnvironmentPlugin('all'),
    tsconfigPaths(),
    federation({
      name: "app",
      remotes: {
        admin: envMode === 'production' ?
        `${domainAddress}${remoteAdminPath}` : 
          "http://localhost:5000/assets/remoteEntry.js",
        merchant: envMode === 'production' ?
        `${domainAddress}${remoteMerchantPath}` :
          "http://localhost:5003/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
