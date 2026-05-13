/** @type {import("next").NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/interactive-pets",
        destination: "/plushy-companions",
        // Permanent (HTTP 308) so search engines transfer ranking authority
        // from the old URL to the new one.
        permanent: true
      }
    ];
  }
};
module.exports = nextConfig;
