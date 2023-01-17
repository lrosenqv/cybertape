import axios from 'axios'
import router from '@/router'

const client_id = import.meta.env.VITE_CLIENT_ID
const redirect_uri = import.meta.env.VITE_REDIRECT_URI

function generateRandomString(length: number) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return text
}

async function generateCodeChallenge(codeVerifier: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier))

  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function generateUrlWithSearchParams(url: string, params: any) {
  const urlObject = new URL(url)
  urlObject.search = new URLSearchParams(params).toString()

  return urlObject.toString()
}

async function exchangeToken(code: string) {
  const code_verifier = localStorage.getItem('code_verifier') || ''

  const body = new URLSearchParams({
    client_id,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri,
    code_verifier
  })
  const res = await axios.post('https://accounts.spotify.com/api/token', body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
  })
  if (res.status === 200) {
    processTokenResponse(res.data)
    router.replace('/')
  }
}
function processTokenResponse(data: any) {
  const access_token = data.access_token
  const refresh_token = data.refresh_token

  const t = new Date()
  const expires_at = t.setSeconds(t.getSeconds() + data.expires_in)

  localStorage.setItem('access_token', access_token)
  localStorage.setItem('refresh_token', refresh_token)
  localStorage.setItem('expires_at', expires_at.toString())
}

function authRequest() {
  const codeVerifier = generateRandomString(64)

  generateCodeChallenge(codeVerifier).then((code_challenge) => {
    window.localStorage.setItem('code_verifier', codeVerifier)

    const url = generateUrlWithSearchParams('https://accounts.spotify.com/authorize', {
      response_type: 'code',
      client_id,
      scope: 'user-read-private user-read-email',
      code_challenge_method: 'S256',
      code_challenge,
      redirect_uri
    })
    window.location.assign(url)
  })
}

/* function refreshToken() {
  const refresh_token = localStorage.getItem('refresh_token') || ''
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: new URLSearchParams({
      client_id,
      grant_type: 'refresh_token',
      refresh_token
    })
  }).then(processTokenResponse)
} */

/*
function logout() {
  localStorage.clear();
  window.location.reload();
} */
export { authRequest, exchangeToken }
