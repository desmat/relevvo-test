import * as geofire from 'geofire-common'

export const calcGeohash = (location) => {
  return geofire.geohashForLocation(locationToArray(location))
}

export const calcDistance = (from, to) => {
  // console.log('calcDistance', { from, to })
  return geofire.distanceBetween(locationToArray(from), locationToArray(to))
}

export const locationToArray = (location) => {
  return location instanceof Array ? 
    location : 
    [location.latitude, location.longitude]
}

export const locationToGeopoint = (location) => {
  return location instanceof Array ? 
    { latitude: location[0], longitude: location[1] } :
    location
}

export const formatDistance = (distanceInKm) => {
  if (distanceInKm < 0.5) {
    return `${Math.round(distanceInKm * 1000)}m`
  } else if (distanceInKm < 10) {
    return `${Math.round(distanceInKm * 100) / 100}km`
  } else if (distanceInKm < 100) {
    return `${Math.round(distanceInKm * 10) / 10}km`
  } else {
    return `${Math.round(distanceInKm)}km`
  }
}
