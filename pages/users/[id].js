import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getUser, saveUser } from '../../fetchData/users'
import * as utils from '../../fetchData/utils'

export default function Page() {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState({})

  useEffect(() => {
    if (id) {
      getUser(id).then((user) => {
        setUser({ ...user, loaded: true })
      }).catch(console.error)
    }
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">User</h1>
        { user.loaded && 
          <ul>
            <li>
              <b>id:</b> {user.id}
            </li>
            <li>
              <b>location:</b> {user.location && `${utils.locationToArray(user.location)}`}
            </li>
          </ul>      
        }   
      </main>

      <p><a style={{ cursor: 'pointer' }} onClick={() => saveUser({ r: Math.floor(Math.random() * 100) }, user.id)}>UPDATE</a></p>

      <Link href="/users" passHref>
        <a>Back</a>
      </Link>      

    </div>
  )
}
