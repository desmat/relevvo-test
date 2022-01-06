import * as firestore from "firebase/firestore"
import * as firebase from '../firebase/clientApp'

const COLLECTION_NAME = 'stores'

export const getStore = (id) => {
  // console.log('getStore', { id } )
  
  return new Promise((resolve, reject) => {
    firestore.getDoc(firestore.doc(firebase.db, COLLECTION_NAME, id)).then((doc) => {
      if (!doc.exists()) {
        reject(`Store not found: ${id}`)
      }

      resolve({ ...doc.data(), id: doc.id })
    })
  })
}


export const addLike = async (id) => {
  // console.log('addLike', { id } )

  return new Promise((resolve, reject) => {
    if (id) {
      firestore.getDoc(firestore.doc(firebase.db, COLLECTION_NAME, id)).then((doc) => {
        if (doc.exists()) {
          const updatedData = {             
            likes: (doc.data().likes || 0) + 1,
            updated: firestore.serverTimestamp(),
          }
          firestore.updateDoc(firestore.doc(firebase.db, COLLECTION_NAME, id), updatedData).then(() => {
            resolve({ ...doc.data(), ...updatedData })
          }).catch((error) => {
            reject(`Error saving store ${id}: ${error}`)
          })
        } else {
          reject(`Error saving store ${id}: not found`)
        }
      })
    } else {
      reject(`Error saving store ${id}: not found`)
    }
  })
}

export const getStores = (onUpdate) => {
  // console.log('getStores')
  const collection = firestore.collection(firebase.db, COLLECTION_NAME)

  const cleanup = firestore.onSnapshot(collection, (rs) => {
    if(onUpdate) {
      onUpdate(rs.docs.map((d) => { return { ...d.data(), id: d.id } }))
    }
  })

  return cleanup
}
