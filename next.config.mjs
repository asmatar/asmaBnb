import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} 
const nextConfig = {};

export default nextConfig;*/
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cgttmkwcbvtneztdpkod.supabase.co",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
