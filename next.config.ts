// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    // output: 'export', // This enables static HTML export
    // images: {
    //   unoptimized: true, // For static export, we need this for images
    //   // Add domains if you have external images
    //   domains: ['example.com'],
    // },
    // Any other existing config...
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'export', // This enables static HTML export
//     images: {
//       unoptimized: true, // For static export, we need this for images
//       // Add domains if you have external images
//       domains: ['example.com'],
//     },
//     // Any other existing config...
//   }
  
//   module.exports = nextConfig