import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ja|en|my)/:path*']
};
// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"], // Exclude /api, /_next, and static files
// };