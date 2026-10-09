import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 solo para el fondo del hero, que se ve a pantalla completa.
    qualities: [75, 90],
  },
};

export default nextConfig;
