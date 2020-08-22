import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

export default (context, inject) => {
  const { store } = context

  let app = null;

  const firebaseConfig = {
      apiKey: "AIzaSyBwzb_wTZGWexlaSq0_H9PvarimHkat2P4",
      authDomain: "kid-credits.firebaseapp.com",
      databaseURL: "https://kid-credits.firebaseio.com",
      projectId: "kid-credits",
      storageBucket: "kid-credits.appspot.com",
      messagingSenderId: "1017841230878",
      appId: "1:1017841230878:web:b68f471a55cfc5ee3c3a0f"
  }

  app = firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig)

  // export const db = app.database()
  inject('fireDb', app.database())
  inject('fireStorage', app.storage())

  const fireAuth = app.auth()
  inject('fireAuth', fireAuth)

  // inject('fireAuth', app.auth())
  
  fireAuth.onAuthStateChanged(user => {
    if (user) {
      store.commit('setUser', user)
    } else {
      store.commit('removeUser') 
    } 
  })
}