import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { getProfileData } from '../../fetchData/getProfileData'

export default function CSRPage() {
  const router = useRouter()
  const { username } = router.query
  const [user, setUser] = useState({})

  useEffect(() => {
    if (username) {
      getProfileData(username).then((profile) => {
        if (!profile) {
          setUser({ notFound: true })
        }

        setUser({ username, profile, loaded: true })
      })
    }
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Next.js w/ Firebase Client-Side</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Next.js w/ Firebase Client-Side</h1>
        { user.loaded && 
          <>
            <h2>{user.username}</h2>
            <p>{user.profile.message}</p>
          </>
        } 
      </main>
    </div>
  )
}
