import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUser } from '../../context/userContext'
import { getStores } from '../../api/stores'
import { saveUserLocation } from '../../api/users'
import * as utils from '../../api/utils'

import * as mui from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

const fabStyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
}

const backFabStyle = {
  position: 'fixed',
  top: 16,
  left: 16,
}

function StoresPage() {
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
      // console.log('stores', stores)
      setStores(stores.map(addDistanceToStore))
    })

    // // try to get and save user location
    // const options = {} // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition#syntax
    // navigator.geolocation.getCurrentPosition((pos) => {
    //   // console.log('getCurrentPosition success', pos)
    //   if (!loadingUser && user) {
    //     saveUserLocation(pos.coords, user.uid)
    //   }
    // }, (error) => {
    //   console.warn('getCurrentPosition error', error)
    // }, [options])

    return cleanup
  }, [])

  return ( 
    <mui.Container>
      <Head>
        <title>Stores</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 

      <mui.Container align="center">
        <mui.Typography variant="h3" align="center" gutterBottom>
          Stores Nearby
        </mui.Typography>

        <mui.Container align="left" style={{ width: 'fit-content' }}>

          <mui.List dense={false}>
            {stores.sort(sortStoresByLikes).sort(sortStoresByDistance).map((store) => {
              return (
                <mui.ListItem 
                  key={store.id}
                  // secondaryAction={
                  //   // <mui.IconButton edge="end" aria-label="delete">
                  //   //   <Clear />
                  //   // </mui.IconButton>
                  //   <mui.IconButton edge="end" aria-label="edit">
                  //     <Edit />
                  //   </mui.IconButton>
                  // }        
                  disablePadding
                  >

                  <Link href={`/stores/${store.id}`} passHref>
                    <mui.ListItemButton>
                      {store.likes > 0 &&
                        <mui.ListItemIcon>
                          <StarIcon />
                        </mui.ListItemIcon>                    
                      }
                      <mui.ListItemText
                        sx={{ maxWidth: 600 }}
                        inset={!store.likes}
                        primary={store.name}
                        secondary={store.distance && `${utils.formatDistance(store.distance)} away`}
                      />
                    </mui.ListItemButton>
                  </Link>                
                </mui.ListItem>
              )    
            })}
          </mui.List>
        </mui.Container>
      </mui.Container>

      {/* <mui.Container align="center">
        <Link href="/" passHref>
          <mui.Button 
            component="a" 
            color="primary"
            variant="outlined"
          >
            Back
          </mui.Button>
        </Link>      
      </mui.Container> */}

      <Link href="/" passHref>
        <mui.Fab size="small" variant="circular" sx={backFabStyle} aria-label="Back" color="inherit">
          <ArrowBackIosNewIcon />
        </mui.Fab>
      </Link>      

      <Link href="/stores/new" passHref>
        <mui.Fab disabled={!user || user.isAnonymous} size="small" sx={fabStyle} aria-label="Add" color="primary">
          <AddIcon />
        </mui.Fab>
      </Link>        
    </mui.Container>
  )
}

export default StoresPage
