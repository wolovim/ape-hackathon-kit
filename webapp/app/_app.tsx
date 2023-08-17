import type { AppProps } from 'next/app';

import './polyfills';
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}