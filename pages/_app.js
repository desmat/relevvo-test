import dynamic from "next/dynamic";
import UserProvider from '../context/userContext'

// Custom App to wrap it with context provider
function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default App
