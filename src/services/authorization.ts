import SHA256 from 'crypto-js/sha256'

// Generates random string containing numbers and letters
function generateRandomString(length: Number) {
  let string = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    string += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return string
}

function authRequest() {
  const state = generateRandomString(16)
  const scope = 'user-read-private user-read-email'

  const authOptions = new URLSearchParams({
    response_type: 'code',
    client_id: import.meta.env.VITE_CLIENT_ID,
    scope: scope,
    redirect_uri: import.meta.env.VITE_REDIRECT_URI,
    state: state,
    code_challenge_method: import.meta.env.VITE_CODE_CHALLENGE_METHOD,
    code_challenge: SHA256(state).toString()
  })
  window.location.assign('https://accounts.spotify.com/authorize?' + authOptions.toString())
}

export { authRequest }
