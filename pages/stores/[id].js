import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useUser } from '../../context/userContext'
import { getStore, addLike, saveStore, deleteStore } from '../../api/stores'
import * as utils from '../../api/utils'

import * as mui from '@mui/material'
// import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MapIcon from '@mui/icons-material/Map';

const NEW_STORE_ID = 'new'

const editFabStyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
}
const deleteFabStyle = {
  position: 'fixed',
  bottom: 16,
  // right: 66,
  right: 16,
}

const backFabStyle = {
  position: 'fixed',
  top: 16,
  left: 16,
}

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

  const confirmDelete = () => {
    if (store) {
      if (confirm(`Delete store ${store.name}?`)) {
        deleteStore(id).then(() => {
          router.push(`/stores`)
        }).catch(console.error)
      }
    }
  }

  const saveNewStore = () => {
    const storeToSave = {
      name: store.newName,
    }

    if (store.newLongitude && store.newLatitude) {
      storeToSave.location = { 
        longitude: parseFloat(store.newLongitude),
        latitude: parseFloat(store.newLatitude),
      }
    }

    if (user) {
      storeToSave.createdBy = user.id
    }

    // console.log('saveNewStore', { store, storeToSave })

    saveStore(storeToSave)
    .then((savedStore) => {
      console.log('saveNewStore success', { savedStore })
      if (savedStore.id) {
        router.push(`/stores/${savedStore.id}`)
      }
    }).catch((error) => {
      // TOOD proper error handling
      console.error('Error saving new store', error)
    })
  }
  
  const editNewStore = (field, val) => {
    // console.log('editNewStore', { field, val })
    setStore({
      ...store,
      [field]: val,
    })
  }
  
  useEffect(() => {
    if (id && id !== NEW_STORE_ID) {
      getStore(id).then((s) => {
        if (!s) {
          setStore({ notFound: true })
        }

        const distance = s.location && user && user.location && utils.calcDistance(s.location, user.location)
        setStore({ ...s, distance, loaded: true })
      })
    }
  }, [id])

  return (
    <mui.Container>
      <Head>
        <title>Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 

      <mui.Container align="center">

        {id === NEW_STORE_ID &&
          <mui.Typography variant="h3" align="center" gutterBottom>
            New Store
          </mui.Typography>
        }
        {id !== NEW_STORE_ID &&
          <mui.Typography variant="h3" align="center" gutterBottom>
            {store.name}
          </mui.Typography>
        }

        {id === NEW_STORE_ID &&
          <mui.Box sx={{ minWidth: 275, maxWidth: 600, padding: 1 }}>
            <mui.Card variant="outlined" sx={{ padding: 2 }}>
              <mui.CardHeader
                sx={{ color: 'text.secondary'}}
                title="Name"
              />            
              <mui.TextField 
                fullWidth
                // value={store.name}
                onChangeCapture={(event) => editNewStore('newName', event.target.value)}
                />
            </mui.Card>
          </mui.Box>
        }

        {id !== NEW_STORE_ID &&
          <mui.Box sx={{ minWidth: 275, maxWidth: 600, padding: 1 }}>
            <mui.Card variant="outlined" sx={{ padding: 2 }}>
              <mui.CardHeader
                sx={{ color: 'text.secondary'}}
                title="About"
              />            
              <mui.Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              </mui.Typography>
            </mui.Card>
          </mui.Box>
        }

        {id === NEW_STORE_ID &&
          <mui.Box sx={{ minWidth: 275, maxWidth: 600, padding: 1 }}>
            <mui.Card variant="outlined" sx={{ padding: 2 }}>
              <mui.CardHeader
                sx={{ color: 'text.secondary'}}
                title="Location"
              />            
              <mui.TextField 
                fullWidth
                type="number"
                label="lat"
                value={store.location && store.location.latitude}
                onChangeCapture={(event) => editNewStore('newLatitude', event.target.value)}
              />
              <mui.TextField 
                fullWidth
                type="number"
                label="long"
                value={store.location && store.location.longitude}
                onChangeCapture={(event) => editNewStore('newLongitude', event.target.value)}
              />
            </mui.Card>
          </mui.Box>
        }
        {store.location &&
          <mui.Box sx={{ minWidth: 275, maxWidth: 600, padding: 1 }}>
            <mui.Card variant="outlined" sx={{ padding: 2 }}>
              <mui.CardHeader
                sx={{ color: 'text.secondary'}}
                title="Location"
                color="secondary"
                // subheader={store.location && user && user.location && `${utils.formatDistance(utils.calcDistance(store.location, user.location))} away`}
                action={
                  <mui.IconButton aria-label="like" color="primary">
                    <a 
                      style={{ color: "rgba(0, 0, 0, 0.54)" }}
                      target="_blank" 
                      href={store.location && `https://www.google.com/maps/search/?api=1&query=${store.location.latitude}%2C${store.location.longitude}`}
                    >
                      <MapIcon color="text.secondary"/>
                    </a>
                  </mui.IconButton>
                }
              />            
              <mui.Typography>
                {store.location && utils.locationToArray(store.location).toString()}{store.location && user && user.location ? ` (${utils.formatDistance(utils.calcDistance(store.location, user.location))} away)` : ''}
                {/* {store.location && utils.locationToArray(store.location).toString()} */}
              </mui.Typography>
            </mui.Card>
          </mui.Box>
        }

        {id !== NEW_STORE_ID &&
          <mui.Box sx={{ minWidth: 275, maxWidth: 600, padding: 1 }}>
            <mui.Card variant="outlined" sx={{ padding: 2 }}>
              <mui.CardHeader
                sx={{ color: 'text.secondary'}}
                title="Number of likes"
                action={
                  <mui.IconButton aria-label="like">
                    <FavoriteBorderIcon />
                  </mui.IconButton>
                }
                onClick={like}
              />            
              <mui.Typography>
                {store.likes || 0}
              </mui.Typography>
            </mui.Card>
          </mui.Box>
        }

        {id === NEW_STORE_ID &&
          <mui.Container sx={{ padding: 2 }}>
            <mui.Button 
              size="large"
              variant="contained"
              disableElevation
              onClick={() => saveNewStore()}
            >
              Save Store
            </mui.Button>
          </mui.Container>  
        }

      </mui.Container>

      <Link href="/stores" passHref>
        <mui.Fab size="small" variant="circular" sx={backFabStyle} aria-label="Back" color="inherit">
          <ArrowBackIosNewIcon />
        </mui.Fab>
      </Link>      

      {/* <mui.Fab size="small" sx={editFabStyle} aria-label="Add" color="primary">
        <Edit />
      </mui.Fab> */}

      <mui.Fab onClick={confirmDelete} disabled={!user || store.createdBy !== user.id} size="small" sx={deleteFabStyle} aria-label="Add" color="secondary">
        <Delete />
      </mui.Fab>

    </mui.Container>
  )
}
