/** @type {import("next").NextConfig} */
const nextConfig = {
  // Dev-only: allows the ngrok tunnel host to hit the local dev server.
  allowedDevOrigins: ["donor-scallion-urging.ngrok-free.dev"],
  async redirects() {
    return [
      {
        source: "/interactive-pets",
        destination: "/plushy-companions",
        // Permanent (308) so search engines transfer ranking authority
        // from the old URL to the new one.
        permanent: true
      },
      // Legacy "best-for-X" URLs superseded by the "best-pets-for-X" naming.
      // These pages were left live and unlinked after the rename, creating
      // duplicate/orphaned content. Redirecting (rather than deleting)
      // preserves any inbound links or ranking signals the old URLs had.
      {
        source: "/best-for-anxiety",
        destination: "/best-pets-for-anxiety",
        permanent: true
      },
      {
        source: "/best-for-anxiety/:path*",
        destination: "/best-pets-for-anxiety/:path*",
        permanent: true
      },
      {
        source: "/best-for-autism",
        destination: "/best-pets-for-autism",
        permanent: true
      },
      {
        source: "/best-for-autism/:path*",
        destination: "/best-pets-for-autism/:path*",
        permanent: true
      },
      {
        source: "/best-for-children",
        destination: "/best-pets-for-children-and-families",
        permanent: true
      },
      {
        source: "/best-for-children/:path*",
        destination: "/best-pets-for-children-and-families/:path*",
        permanent: true
      },
      {
        source: "/best-for-former-cat-owners",
        destination: "/best-pets-for-former-cat-owners",
        permanent: true
      },
      {
        source: "/best-for-former-cat-owners/:path*",
        destination: "/best-pets-for-former-cat-owners/:path*",
        permanent: true
      },
      {
        source: "/best-for-former-dog-owners",
        destination: "/best-pets-for-former-dog-owners",
        permanent: true
      },
      {
        source: "/best-for-former-dog-owners/:path*",
        destination: "/best-pets-for-former-dog-owners/:path*",
        permanent: true
      },
      {
        source: "/best-for-loneliness",
        destination: "/best-pets-for-loneliness",
        permanent: true
      },
      {
        source: "/best-for-loneliness/:path*",
        destination: "/best-pets-for-loneliness/:path*",
        permanent: true
      },
      {
        source: "/best-for-memory-care",
        destination: "/best-pets-for-seniors-in-memory-care-facilities",
        permanent: true
      },
      {
        source: "/best-for-memory-care/:path*",
        destination: "/best-pets-for-seniors-in-memory-care-facilities/:path*",
        permanent: true
      },
      {
        source: "/best-for-privacy-conscious-families",
        destination: "/best-pets-for-privacy-conscious-families",
        permanent: true
      },
      {
        source: "/best-for-privacy-conscious-families/:path*",
        destination: "/best-pets-for-privacy-conscious-families/:path*",
        permanent: true
      },
      {
        source: "/best-for-seniors-living-alone",
        destination: "/best-pets-for-seniors-living-alone",
        permanent: true
      },
      {
        source: "/best-for-seniors-living-alone/:path*",
        destination: "/best-pets-for-seniors-living-alone/:path*",
        permanent: true
      },
      {
        source: "/best-for-seniors-with-dementia",
        destination: "/best-pets-for-seniors-with-dementia",
        permanent: true
      },
      {
        source: "/best-for-seniors-with-dementia/:path*",
        destination: "/best-pets-for-seniors-with-dementia/:path*",
        permanent: true
      },
      {
        source: "/best-for-seniors-with-vision-challenges",
        destination: "/best-pets-for-seniors-with-vision-challenges",
        permanent: true
      },
      {
        source: "/best-for-seniors-with-vision-challenges/:path*",
        destination: "/best-pets-for-seniors-with-vision-challenges/:path*",
        permanent: true
      },
      {
        source: "/best-for-tech-savvy-seniors",
        destination: "/best-pets-for-tech-savvy-seniors",
        permanent: true
      },
      {
        source: "/best-for-tech-savvy-seniors/:path*",
        destination: "/best-pets-for-tech-savvy-seniors/:path*",
        permanent: true
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
