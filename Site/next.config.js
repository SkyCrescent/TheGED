/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig


// next.config.js
module.exports = {
   async headers() {
      return [
         {
            source: '/api/',
            headers: [
               {
                  key: 'Access-Control-Allow-Methods',
                  value: 'POST',
               },
            ],
         },
      ];
   },
};

