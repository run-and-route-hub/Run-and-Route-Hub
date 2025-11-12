/* eslint-disable no-restricted-exports */
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/list/:path*',
    '/routes/:path*',
    '/dashboard/:path*',
  ],
};
