const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'starter.skillgener.com' },
      { protocol: 'https', hostname: 'starterback.skillgener.com' },
      { protocol: 'http', hostname: 'starterback.skillgener.com' },
      { protocol: 'http', hostname: '127.0.0.1', port: '8000' },
      { protocol: 'http', hostname: 'localhost', port: '8000' },
    ],
  },
  // compiler: {
  //   removeConsole: {
  //     exclude: ["error", "warn"],
  //   },
  // },
  webpack: (config, options) => {
    config.resolve.fallback = { fs: false, path: false, os: false };
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.module.rules.push({
      test: /\.(ts)x?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            onlyCompileBundledFiles: true,
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;