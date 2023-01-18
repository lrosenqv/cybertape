import type { ICategories } from '@/models/ICategory'
import type { IPlaylist, IPlaylistResponse, IPlaylists } from '@/models/IPlaylist'
import axios from 'axios'

const baseUrl = 'https://api.spotify.com/v1/'
const accessToken = sessionStorage.getItem('access_token')

async function getPlaylistById(playlist_id: string) {
  const response = await axios.get<IPlaylist>(playlist_id, {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  /* const response = await axios.get(baseUrl + `playlists/${playlist_id}`, {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  return response.data */
  return response.data
}

async function getCategoryPlaylists(category_id: string) {
  const response = await axios.get<IPlaylistResponse>(
    baseUrl + `browse/categories/${category_id}/playlists?&limit=10`,
    {
      headers: { Authorization: 'Bearer ' + accessToken }
    }
  )
  return response.data.playlists
}

async function getCategories() {
  const response = await axios.get<ICategories>(baseUrl + 'browse/categories?limit=50', {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  return response.data.categories
}
export { getCategoryPlaylists, getCategories, getPlaylistById }
