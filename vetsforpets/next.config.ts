import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Recomendado para evitar errores en desarrollo
  images: {
    domains: ["res.cloudinary.com"],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
