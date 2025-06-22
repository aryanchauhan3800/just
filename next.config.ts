import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	eslint: {
		// ✅ This disables ESLint during `next build`
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;