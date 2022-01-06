import firebase from '../firebase/clientApp'

export const getStore = async (id) => {
  console.log('getStore', { id } )
  const db = firebase.firestore()
  const collection = db.collection('stores')
  const doc = await collection.doc(id).get()

  if (!doc.exists) {
    return null
  }

  return doc.data()
}

export const addLike = async (id) => {
  console.log('addLike', { id } )

  return new Promise((resolve, reject) => {
    const db = firebase.firestore()
    const collection = db.collection('stores')

    if (id) {
      collection.doc(id).get()
        .then((doc) => {
          if (doc.exists) {
            const updatedData = {             
              likes: (doc.data().likes || 0) + 1,
              updated: new Date(), //serverTimestamp() // TODO UPGRADE TO NEWER FIRESTORE VERSION
            }
            doc.ref.update(updatedData).then(() => {
              resolve({ ...doc.data(), ...updatedData })
            })
          } else {
            reject(`Error saving store: not found: ${id}`)
          }
        })
    } else {
      reject(`Error saving store: not found: ${id}`)
    }
  })
}

export const getStores = (onSuccess) => {
  console.log('getStores')
  const db = firebase.firestore()
  const collection = db.collection('stores')
  
  // return collection.get().then((rs) => rs.docs.map((d) => { return { ...d.data(), id: d.id } }))  
  
  const cleanup = collection.onSnapshot((rs) => {
    if(onSuccess) {
      onSuccess(rs.docs.map((d) => { return { ...d.data(), id: d.id } }))
    }
  })

  return cleanup
}
