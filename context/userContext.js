import { useState, useEffect, createContext, useContext } from 'react'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth'
import { saveUser } from '../fetchData/users'

export const UserContext = createContext()

export default function UserContextComp({ children }) {
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true) // Helpful, to update the UI accordingly.

  useEffect(() => {
    const auth = getAuth()

    // Listen authenticated user
    const unsubscriber = onAuthStateChanged(auth, (user) => {
      try {
        if (user) {
          // User is signed in.
          console.log('User authenticated', user.uid)
          const { uid, displayName, email, photoURL, isAnonymous } = user

          saveUser({ uid, displayName, email, photoURL, isAnonymous }, uid).then((savedUser) => {
            // console.log('UserContextComp useEffect saveUser success', { user })
            setUser(savedUser)
          }).catch((error) => console.warning('Error saving user data', error))
        } else {
          setUser(null)
        }
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
        console.error('Error authenticating user', error)
      } finally {
        setLoadingUser(false)
      }
    })

    // Authenticate anoymously
    signInAnonymously(auth)
      .then(() => {
        // // Signed in..
        console.log('Signed in anonymously')
      })
      .catch((error) => {
        console.error('Error signing anonymously', { error })
      })    

    // Unsubscribe auth listener on unmount
    return () => unsubscriber()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext)
