import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "p2p-media-loader-core",
    "node-datachannel",
    "webrtc-polyfill",
    "bittorrent-tracker",
    "p2p-media-loader-hlsjs",
  ],
};

export default nextConfig;
