import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: { 
    serverActions: { 
      allowedOrigins: ['localhost:3000'] 
    } 
  },
  images: { 
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'] 
  },
  output: 'standalone',
};

export default nextConfig;
