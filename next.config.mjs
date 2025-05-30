const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'starter.skillgener.com' },
      { protocol: 'https', hostname: 'starterback.skillgener.com' },
      { protocol: 'http', hostname: 'starterback.skillgener.com' },
      { protocol: 'https', hostname: 'fms.skillgener.com' },
      { protocol: 'http', hostname: 'fms.skillgener.com' },
      { protocol: 'https', hostname: 'fn.skillgener.com' },
      { protocol: 'http', hostname: 'fn.skillgener.com' },
      { protocol: 'http', hostname: '127.0.0.1', port: '8000' },
      { protocol: 'http', hostname: '192.168.100.156', port: '8000' },
      { protocol: 'http', hostname: 'www.w3.org' },
      { protocol: 'http', hostname: '192.168.51.197' },
      { protocol: 'http', hostname: 'localhost' },
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