import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { getStores } from '../../fetchData/stores'

export default function CSRPage() {
  const [stores, setStores] = useState([])

  useEffect(() => {
    const cleanup = getStores((stores) => {
      console.log('stores', stores)
      setStores(stores)
    })

    return cleanup
  }, [])

  return ( 
    <div className="container">
      <Head>
        <title>Stores</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 

      <main>
        <h1 className="title">Stores</h1>

        <ul>
          { stores.map((store) =>
            <li key={store.id}>
              <Link href={`/stores/${store.id}`} passHref>
                <a>{ store.name }</a>
              </Link>
            </li>        
          )}
        </ul>
      </main>

      <Link href="/" passHref>
        <a>Home</a>
      </Link>      
    </div>
  )
}
