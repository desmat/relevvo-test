import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useUser } from '../../context/userContext'
import { getStore, addLike } from '../../fetchData/stores'
import * as utils from '../../fetchData/utils'

export default function Page() {
  const router = useRouter()
  const { id } = router.query
  const { loadingUser, user } = useUser()
  const [store, setStore] = useState({})

  const like = () => {
    if (store) {
      addLike(id).then((updatedStore) => {
        setStore({ ...updatedStore, loaded: true })
      }).catch(console.error)
      // anticipate
      setStore({ ...store, likes: (store.likes || 0) + 1 })
    }
  }

  useEffect(() => {
    if (id) {
      getStore(id).then((s) => {
        if (!s) {
          setStore({ notFound: true })
        }

        const distance = s.location && user && user.location && utils.calcDistance(s.location, user.location)
        setStore({ ...s, distance, loaded: true })
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
        { store.loaded && 
          <ul>
            <li>
              <b>name:</b> {store.name}
              </li>
            <li>
              <b>likes:</b> {store.likes || 0}
            </li>
            <li>
              <b>location:</b> {store.location && utils.locationToArray(store.location).toString()}{store.location && user && user.location ? ` (${utils.formatDistance(utils.calcDistance(store.location, user.location))} away)` : ''}
            </li>
          </ul>      
        }   
      </main>

      <p><a style={{ cursor: 'pointer' }} onClick={like}>LIKE</a></p>

      <Link href="/stores" passHref>
        <a>Back</a>
      </Link>      

    </div>
  )
}
