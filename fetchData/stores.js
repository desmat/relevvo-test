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
