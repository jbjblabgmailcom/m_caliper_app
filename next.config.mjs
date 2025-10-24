import { withNextVideo } from 'next-video/process'; // Corrected import path for CommonJS

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ADDED configuration for Next.js Image component
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '', // Leaving port empty matches all ports
        pathname: '**', // Matches any path on the hostname
      },
    ],
  },
};
 
export default withNextVideo(nextConfig);