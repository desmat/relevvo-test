import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import { useUser } from '../context/userContext'
import { saveUserLocation } from '../api/users'
import * as utils from '../api/utils'

import * as mui from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MapIcon from '@mui/icons-material/Map';

export default function Home() {
  // Our custom hook to get context values
  const { loadingUser, user, setUser, login } = useUser()

  const findCurrentLocation = () => {
    // try to get and save user location
    const options = {} // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition#syntax
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log('getCurrentPosition success', pos)
      if (user) {
        saveUserLocation(pos.coords, user.uid).then((user) => {
          console.log('getCurrentPosition saveUserLocation success', { user } )
          setUser(user)
        })        
      }
    }, (error) => {
      console.warn('getCurrentPosition error', error)
    }, [options])
  }

  return (
    <mui.Container>
      <Head>
        <title>Relevvo Engineering Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 

      <mui.Container align="center">
        <mui.Typography variant="h3" align="center" gutterBottom>
          Relevvo Engineering Test
        </mui.Typography>

        <mui.Container align="center">
          <mui.Box sx={{ minWidth: 275, maxWidth: 800, padding: 1 }}>
              <mui.Card variant="outlined" sx={{ padding: 2 }}>
                {/* <mui.CardHeader
                  sx={{ color: 'text.secondary'}}
                  title="About"
                />             */}
                <mui.Typography sx={{ padding: 1 }}>
                  This is my submission for the Revevvo Engineering Test, specifically the front-end variation. 
                  It aims to demostrate competency with Javacript, React, cloud technologies such as Firebase 
                  and Vercel, and other tools used in every-day full-stack engineering.                
                </mui.Typography>
                <mui.Typography sx={{ padding: 1 }}> 
                  See test instructions here: <a href="https://github.com/relevvo/relevvo-test">https://github.com/relevvo/relevvo-test</a>
                </mui.Typography>
                <mui.Typography sx={{ padding: 1 }}>
                  This demo application shows what a Yelp-like geo-aware application might do: 
                  Users saving and publishing information about their favorite shops, discovering and learning about shops closeby, 
                  and contributing meta information related to those entities, in this case simply recording a 'Like'.
                </mui.Typography>
                <mui.Typography sx={{ padding: 1 }}> 
                  A more complete version might allow Vendor and Customer User types to interact with each other, 
                  with different access rights and user experiences. For example a Vendor might
                  publish a promotion for Customers to discover, share meta data about and possibly register usage.
                </mui.Typography>

              </mui.Card>
            </mui.Box>

            <mui.Box sx={{ minWidth: 275, maxWidth: 800, padding: 1 }}>
              <mui.Card variant="outlined" sx={{ padding: 2 }}>
                <mui.CardHeader
                  sx={{ color: 'text.secondary'}}
                  title="Instruction"
                />            
                <mui.Typography sx={{ padding: 1 }}>
                  Current UX flow involves the User starting the application, logging in via Google, recording their 
                  location, browsing to the list of Stores to find closest existing Stores, viewing details, registering Like's
                  and obtaininig mapping/navigation details. 
                </mui.Typography>
                <mui.Typography sx={{ padding: 1 }}>
                  A User can also publish new Stores along with GPS coordinate (hint: grab those from the google maps url).
                  In a more complete application a mapping API would be used to assist the User in finding businesses and 
                  obtaining those GPS coordinates.
                </mui.Typography>
              </mui.Card>
            </mui.Box>

            <mui.Box sx={{ minWidth: 275, maxWidth: 800, padding: 1 }}>
              <mui.Card variant="outlined" sx={{ padding: 2 }}>
                <mui.CardHeader
                  sx={{ color: 'text.secondary'}}
                  title="Auth, Geo and main functionality"
                />            

              <mui.Typography sx={{ padding: 1 }}> 
                <b>Main functionality</b>
                <br/>
                <Link href={`/stores`} passHref>
                  <a>View list of Stores</a>
                </Link>
                <br/>
                (This would be the main page of the app)
                <br/>
                {/* <Link href={`/users`} passHref>
                    <a>View list of Users</a>
                </Link> */}
              </mui.Typography>

              <mui.Typography sx={{ padding: 2 }}>
                <b>
                  Auth status: 
                  {user && user && user.provider === 'google.com' &&
                    ` Logged in via google`
                  }
                  {!user && 
                    ` Not logged in`
                  }
                  {user && user && user.isAnonymous && 
                    ` Anonymous`
                  }
                </b>

                <br/>
                <mui.Button 
                  variant="text" 
                  size="small"
                  disabled={!user || user && user.isAnonymous}  
                  onClick={() => !user.isAnonymous && login()}
                >
                  Login anonymously
                </mui.Button>

                <br/>
                <mui.Button 
                  variant="text" 
                  size="small"
                  disabled={!user || user && user.provider === 'google.com'}
                  onClick={() => user.provider !== 'google.com' && login('google')}
                >
                  Login via google
                </mui.Button>

                <br/>
                (Enable pop-ups)
              </mui.Typography>

              <mui.Typography sx={{ padding: 2 }}>          
                <b>
                  Current location: 
                  {user && user.location &&
                    ` ${utils.locationToArray(user.location).toString()}`
                  }
                  {!(user && user.location) &&
                    ` Unknown`
                  }
                </b>

                <br/>
                <mui.Button 
                  variant="text" 
                  size="small"
                  onClick={findCurrentLocation}
                >
                  Set current location
                </mui.Button>

                <br/>
                (Grant browser's request for location)
              </mui.Typography>
              
            </mui.Card>
          </mui.Box>


        </mui.Container>
      </mui.Container>
    </mui.Container>
  )

}
