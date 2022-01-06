import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { getUsers, saveUser } from '../../fetchData/users'

export default function Page() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const cleanup = getUsers((users) => {
      console.log('users', users)
      setUsers(users)
    })

    return cleanup
  }, [])

  return ( 
    <div className="container">
      <Head>
        <title>Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 

      <main>
        <h1 className="title">Users</h1>

        <ul>
          { users.map((user) =>
            <li key={user.id}>
              <Link href={`/users/${user.id}`} passHref>
                <a>{ user.id }</a>
              </Link>
            </li>        
          )}
        </ul>
      </main>

      <p><a style={{ cursor: 'pointer' }} onClick={() => saveUser({ r: Math.floor(Math.random() * 100) })}>ADD</a></p>

      <Link href="/" passHref>
        <a>Home</a>
      </Link>      
    </div>
  )
}
