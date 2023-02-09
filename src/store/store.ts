import { createStore } from 'vuex'

const store = createStore({
  state: {
    codeVerifier: '',
    currentUser: {
      userId: '',
      uri: '',
      srcImg: ''
    },
    mobileView: false
  },
  mutations: {
    setCodeVerifier(state, payload) {
      return (state.codeVerifier = payload)
    },
    setCurrentUser(state, payload) {
      return (state.currentUser = {
        userId: payload.id,
        uri: payload.uri,
        srcImg: payload.images[0].url
      })
    },
    setMobileView(state, payload) {
      return (state.mobileView = payload)
    }
  }
})

export { store }
