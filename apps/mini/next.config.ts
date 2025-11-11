import { fileURLToPath } from "url";
import type { NextConfig } from "next";
import createJiti from "jiti";

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
createJiti(fileURLToPath(import.meta.url))("./src/env");

const nextConfig: NextConfig = {
  transpilePackages: ["@myapp/db", "@myapp/ui"],

  typedRoutes: true,
  typescript: { ignoreBuildErrors: true },

  // Server-side packages that should not be bundled
  serverExternalPackages: ["pino-pretty", "lokijs", "encoding"],
  turbopack: {
    // Turbopack handles Node.js polyfills differently than webpack
    // For browser bundles, these modules are automatically excluded
    resolveAlias: {},
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
