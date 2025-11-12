/* eslint-disable no-restricted-exports */
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/list', // protect /list
    '/list/:path*', // protect any subpaths just in case
    '/add',
    '/routes/:path*',
  ],
};
