import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: false,
	experimental: {
		swcPlugins: [['@swc-jotai/react-refresh', {}]],
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.ytimg.com',
				port: '',
				pathname: '**',
			}
		]
	}
};

export default nextConfig;
