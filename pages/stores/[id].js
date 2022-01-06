import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getStore } from '../../fetchData/stores'

export default function CSRPage() {
  const router = useRouter()
  const { id } = router.query
  const [store, setStore] = useState([])

  useEffect(() => {
    if (id) {
      getStore(id).then((s) => {
        if (!s) {
          setStore({ notFound: true })
        }

        setStore({ ...s, loaded: true })
      })
    }
  }, [])

  return (
    <div className="container">
      <Head>
        <title>Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Store</h1>
        <ul>
          { store.loaded && 
            <li>
              <b>name:</b> {store.name}
            </li>
          }   
        </ul>      
      </main>

      <Link href="/stores" passHref>
        <a>Back</a>
      </Link>      

    </div>
  )
}
