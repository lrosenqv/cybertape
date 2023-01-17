import { createStore } from 'vuex'

const store = createStore({
  state: {
    codeVerifier: ''
  },
  mutations: {
    setCodeVerifier(state, payload) {
      return (state.codeVerifier = payload)
    }
  }
})

export { store }
