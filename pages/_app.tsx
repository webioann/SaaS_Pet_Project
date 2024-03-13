import type { AppProps } from 'next/app'
import './_app-global.scss'

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}