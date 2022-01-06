import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useUser } from '../../context/userContext'
import { getStores } from '../../fetchData/stores'
import { saveUserLocation } from '../../fetchData/users'
import * as utils from '../../fetchData/utils'

export default function Page() {
  const [stores, setStores] = useState([])
  const { loadingUser, user } = useUser()

  const addDistanceToStore = (store) => {
    return {
      ...store, 
      // distance: location && store.location && utils.calcDistance(store.location, location)
      distance: user && user.location && store.location && utils.calcDistance(store.location, user.location)
    }
  }

  const sortStoresByDistance = ((a, b) => {
    return (a.distance || Number.MAX_SAFE_INTEGER) - (b.distance || Number.MAX_SAFE_INTEGER)
  })

  const sortStoresByLikes = ((a, b) => {
    return (b.likes || 0) - (a.likes || 0)
  })

  useEffect(() => {
    if (!loadingUser && user && user.location) {
      setStores(stores.map(addDistanceToStore))
    }
  }, [user])

  useEffect(() => {
    const cleanup = getStores((stores) => {
      console.log('stores', stores)
      setStores(stores.map(addDistanceToStore))
    })

    // try to get and save user location
    // NOTE let's build some smoother UX about getting location, why and failing
    const options = {} // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition#syntax
    navigator.geolocation.getCurrentPosition((pos) => {
      // console.log('getCurrentPosition success', pos)
      if (!loadingUser && user) {
        saveUserLocation(pos.coords, user.uid)
      }
    }, (error) => {
      console.warn('getCurrentPosition error', error)
    }, [options])

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
          { stores.sort(sortStoresByLikes).sort(sortStoresByDistance).map((store) =>
            <li key={store.id}>
              <Link href={`/stores/${store.id}`} passHref>
                <a>{ store.name }</a> 
              </Link>
              {store.distance && 
                ` (${utils.formatDistance(store.distance)} away)`
              }
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
