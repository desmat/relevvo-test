import * as firestore from "firebase/firestore"
import * as firebase from '../firebase/clientApp'

const COLLECTION_NAME = 'users'

export const getUser = (id) => {
  // console.log('getUser', { id } )
  
  return new Promise((resolve, reject) => {
    firestore.getDoc(firestore.doc(firebase.db, COLLECTION_NAME, id)).then((doc) => {
      if (!doc.exists()) {
        reject(`User not found: ${id}`)
      }

      resolve({ ...doc.data(), id: doc.id })
    })
  })
}

export const saveUserLocation = async (location, id) => {
  // console.log('saveUserLocation', { id, location } )
  return saveUser({ location: new firestore.GeoPoint(location.latitude, location.longitude) }, id)
}

export const saveUser = async (data, id) => {
  // console.log('saveUser', { id, data } )

  return new Promise((resolve, reject) => {
    firestore.getDoc(firestore.doc(firebase.db, COLLECTION_NAME, id)).then((doc) => {
      if (doc.exists()) {
        const updatedData = { 
          ...data,
          updated: firestore.serverTimestamp(),
        }

        firestore.updateDoc(firestore.doc(firebase.db, COLLECTION_NAME, id), updatedData).then(() => {
          updatedData.id = id
          updatedData.updated = firestore.serverTimestamp()
          resolve({ ...doc.data(), ...updatedData })
        }).catch((error) => reject(`Error saving user ${id}: ${error}`))
      } else {
        const updatedData = { 
          ...data, 
          created: firestore.serverTimestamp(),
        }

        firestore.setDoc(firestore.doc(firebase.db, COLLECTION_NAME, id), updatedData).then(() => {
          updatedData.id = id
          updatedData.created = firestore.serverTimestamp()
          resolve(updatedData)
        }).catch((error) => reject(`Error saving user ${id}: ${error}`))
      }
    })
  })
}

export const getUsers = (onUpdate) => {
  // console.log('getUsers')
  const collection = firestore.collection(firebase.db, COLLECTION_NAME)

  const cleanup = firestore.onSnapshot(collection, (rs) => {
    if(onUpdate) {
      onUpdate(rs.docs.map((d) => { return { ...d.data(), id: d.id } }))
    }
  })

  return cleanup
}
