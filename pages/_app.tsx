import 'tailwindcss/tailwind.css'
import { SessionProvider } from "../contexts/sessionContext"

function MyApp({ Component, pageProps }) {
  return (
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    )
}

export default MyApp
