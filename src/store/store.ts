import { createStore } from 'vuex'

const store = createStore({
  state: {
    codeVerifier: '',
    currentUser: '',
    currentUserImg: '',
    currentUserLink: ''
  },
  mutations: {
    setCodeVerifier(state, payload) {
      return (state.codeVerifier = payload)
    },
    setCurrentUser(state, payload) {
      return (state.currentUser = payload)
    },
    setCurrentUserImg(state, payload) {
      return (state.currentUserImg = payload)
    },
    setCurrentUserLink(state, payload) {
      return (state.currentUserLink = payload)
    }
  }
})

export { store }
