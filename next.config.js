const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['shared', 'ui', 'tailwind-config'],
  serverRuntimeConfig: {
    uniformProjectId: process.env.UNIFORM_PROJECT_ID,
    uniformApiKey: process.env.UNIFORM_API_KEY,
    uniformCliBaseUrl: process.env.UNIFORM_CLI_BASE_URL || 'https://uniform.app',
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
    ],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
  },
};

module.exports = nextConfig;
