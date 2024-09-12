// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// export default nextConfig;

module.exports = {
    env: {
        KOPIS_API_KEY: process.env.KOPIS_API_KEY,
    },
};

module.exports = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    babel: {
        plugins: [
            [
                'styled-components',
                {
                    ssr: true,
                    displayName: true,
                    preprocess: false,
                },
            ],
        ],
    },
};
