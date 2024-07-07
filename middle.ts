// export { default } from 'next-auth/middleware'
import { NextRequest } from 'next/server'
import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        console.log('REQUEST -->', request.nextUrl.pathname)
        console.log('REQUEST -->', request.nextauth.token)
    }
)

export const config = {
    matcher: ['/account', '/profile', '/protected/:path*']
}