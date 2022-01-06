import dynamic from "next/dynamic";
// import UserProvider from '../context/userContext'

// Custom App to wrap it with context provider
function App({ Component, pageProps }) {
  return (
    // <UserProvider>
      <Component {...pageProps} />
    // </UserProvider>
  )
}

App.getInitialProps = async (ctx) => {
  console.log('App.getInitialProps')
  return {}
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});


// import dynamic from "next/dynamic";
// // import '../styles/globals.css'

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// MyApp.getInitialProps = async (ctx) => {
//   console.log('MyApp.getInitialProps', ctx)
//   return {}
// }

// export default MyApp

// export default dynamic(() => Promise.resolve(MyApp), {
//   ssr: false,
// });

