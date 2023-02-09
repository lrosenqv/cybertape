import type { IPlaylist } from '@/models/IPlaylist'
import axios from 'axios'
import { store } from '@/store/store'

const baseUrl = 'https://api.spotify.com/v1/'
const accessToken = sessionStorage.getItem('access_token')

// Get existing playlist
async function getPlaylistById(playlist_url: string) {
  const response = await axios.get<IPlaylist>(playlist_url, {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  return response.data
}
// Creates a new playlist on current users' spotify
async function createPlaylist(name: string) {
  const userId = store.state.currentUser.userId
  const response = await axios.post(
    baseUrl + `users/${userId}/playlists`,
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
export { getPlaylistById, createPlaylist, addTracksToPlaylist }
