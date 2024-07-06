export { default } from 'next-auth/middleware'

export const middlewareConfig = {
    matcher: ['/account', '/profile', '/protected/:path*']
}