import { createStore } from 'vuex'

const store = createStore({
  state: {
    codeVerifier: '',
    currentUser: {
      username: '',
      uri: '',
      srcImg: ''
    }
  },
  mutations: {
    setCodeVerifier(state, payload) {
      return (state.codeVerifier = payload)
    },
    setCurrentUser(state, payload) {
      return (state.currentUser = {
        username: payload.id,
        uri: payload.uri,
        srcImg: payload.images[0].url
      })
    }
  }
})

export { store }
