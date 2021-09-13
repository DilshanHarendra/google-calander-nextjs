import '../styles/globals.css'
import '../styles/globals.css'
import '../styles/main.css'
import BaseLayout from "../layout/BaseLayout";
function MyApp({ Component, pageProps }) {
  return <BaseLayout>
    <Component {...pageProps} />
  </BaseLayout>
}

export default MyApp
