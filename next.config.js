const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['shared', 'ui', 'tailwind-config'],
  serverRuntimeConfig: {
    uniformProjectId: process.env.UNIFORM_PROJECT_ID,
    uniformApiKey: process.env.UNIFORM_API_KEY,
    uniformCliBaseUrl: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
    uniformCliBaseEdgeUrl: process.env.UNIFORM_CLI_BASE_EDGE_URL || 'https://uniform.global',
    uniformPreviewSecret: process.env.UNIFORM_PREVIEW_SECRET || 'javadrip',
  },
  publicRuntimeConfig: {
    appVersion: process.env.npm_package_version || '',
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'cdn11.bigcommerce.com' },
      { protocol: 'https', hostname: 'zzuo-001.dx.commercecloud.salesforce.com' },
    ],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
