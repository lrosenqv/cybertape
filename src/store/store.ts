import { createStore } from 'vuex'

const store = createStore({
  state: {
    codeVerifier: '',
    currentUser: ''
  },
  mutations: {
    setCodeVerifier(state, payload) {
      return (state.codeVerifier = payload)
    },
    setCurrentUser(state, payload) {
      console.log(payload)
      return (state.currentUser = payload)
    }
  }
})

export { store }
