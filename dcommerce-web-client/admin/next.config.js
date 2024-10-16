/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-dcommerce-product-images.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/resized/**",
      },
    ],
  },
};
