import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.auth0.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
