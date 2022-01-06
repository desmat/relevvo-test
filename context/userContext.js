import { useState, useEffect, createContext, useContext } from 'react'
import { getAuth, signInAnonymously, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { saveUser } from '../fetchData/users'

export const UserContext = createContext()

const signinAnonymously = () => {
  const auth = getAuth()

  signInAnonymously(auth).then(() => {
    console.log('Signed in anonymously')
  })
  .catch((error) => {
    console.error('Error signing in anonymously', { error })
  })
}

const signinWithGoogle = () => {
  console.log('signinWithGoogle')
  
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
    
  signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
    console.log('Signed in with google', { token, user })
  }).catch((error) => {
    console.warn('Error signing in with google', { error })
  })
}

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true) // Helpful, to update the UI accordingly.

  const login = (provider) => {
    console.log('UserContextComp login', { provider })
    if (provider === 'google') return signinWithGoogle()
    else signinAnonymously()
  }

  const logout = () => {
    console.warn('UserContextComp login (TODO)')
    // TODO
  }
  
  useEffect(() => {
    const auth = getAuth()

    // Listen authenticated user
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          // User is signed in.
          console.log('User authenticated', user.uid, user, user.providerData.length[0])
          const authenticatedUser = {  
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL, 
            isAnonymous: user.isAnonymous, 
            provider: user.providerData && user.providerData.length > 0 && user.providerData[0] && user.providerData[0].providerId || user.providerId,
          }

          saveUser(authenticatedUser, user.uid).then((savedUser) => {
            // console.log('UserContextComp useEffect saveUser success', { user })
            // TODO make sure the first time location service is granted that page loads correctly with distantes
            setUser(savedUser)
          }).catch((error) => console.warning('Error saving user data', error))
        } else {
          setUser(null)
          // TODO maybe rethink this approach
          console.log('User not authenticated, signing in anonymously')
          signinAnonymously()
        }
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
        console.error('Error authenticating user', error)
      } finally {
        setLoadingUser(false)
      }
    })

    // Unsubscribe auth listener on unmount
    return () => unsubscriber()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext)
