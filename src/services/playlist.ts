import type { IUser } from '@/models/IUser'
import axios from 'axios'

const baseUrl = 'https://api.spotify.com/v1/'
const accessToken = sessionStorage.getItem('access_token')

// Create a new private playlist
async function createPlaylist(name: string) {
  const user = await getUser()
  const response = await axios.post(
    baseUrl + `users/${user.id}/playlists`,
    { name: name, description: '', public: 'false' },
    {
      headers: { Authorization: 'Bearer ' + accessToken }
    }
  )
  return response
}
// Add tracks to the new playlist
async function addTracksToPlaylist(playlist_id: string, uris: string[]) {
  const body = {
    position: 0,
    uris: uris
  }
  const response = await axios.post(baseUrl + `playlists/${playlist_id}/tracks`, body, {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  return response
}
async function getUser() {
  const response = await axios.get<IUser>(baseUrl + 'me', {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  return response.data
}
export { getUser, createPlaylist, addTracksToPlaylist }
