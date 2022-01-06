import { serverTimestamp } from "firebase/firestore"
import firebase from '../firebase/clientApp'

export const getUser = async (id) => {
  console.log('getUser', { id } )
  const db = firebase.firestore()
  const collection = db.collection('users')
  const doc = await collection.doc(id).get()

  if (!doc.exists) {
    return null
  }
  
  return { ...doc.data(), id: doc.id }
}

export const saveUser = async (data, id = undefined) => {
  console.log('saveUser', { id, data } )
  const db = firebase.firestore()
  const collection = db.collection('users')

  if (id) {
    collection.doc(id).get()
      .then((doc) => {
        if (doc.exists) {
          const updatedData = { 
            ...doc.data(), 
            data, 
            updated: new Date(), //serverTimestamp() // TODO UPGRADE TO NEWER FIRESTORE VERSION
          }
          doc.ref.update(updatedData).then(() => {
            // TODO call onSuccess
            // onSuccess( ... collection.doc(id).get() ... )
          })
        } else {
          // TODO call onError
          console.log('Error saving user: not found', { id, data })
        }
      })
  } else {
    const updatedData = { 
      ...data, 
      created: new Date(), //serverTimestamp() // TODO UPGRADE TO NEWER FIRESTORE VERSION
    }

    collection.add(updatedData).then((ref) => {
      // TODO call onSuccess 
      updatedData.id = ref.id
      console.log('saveUser success', updatedData)
    })
  }
}

export const getUsers = (onSuccess) => {
  console.log('getUsers')
  const db = firebase.firestore()
  const collection = db.collection('users')
  
  // return collection.get().then((rs) => rs.docs.map((d) => { return { ...d.data(), id: d.id } }))  
  
  const cleanup = collection.onSnapshot((rs) => {
    if(onSuccess) {
      onSuccess(rs.docs.map((d) => { return { ...d.data(), id: d.id } }))
    }
  })

  return cleanup
}
