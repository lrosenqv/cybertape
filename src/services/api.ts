import type { ICategories } from '@/models/ICategory'
import type { IPlaylistResponse } from '@/models/IPlaylist'
import type { ISearch } from '@/models/ISearch'
import axios from 'axios'

const baseUrl = 'https://api.spotify.com/v1/'
const accessToken = sessionStorage.getItem('access_token')

// Get all avaliable, selectable categories
async function getCategories() {
  const response = await axios.get<ICategories>(baseUrl + 'browse/categories?limit=50', {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  return response.data.categories
}
// Generate new playlist from selected category
async function getCategoryPlaylists(category_id: string) {
  const response = await axios.get<IPlaylistResponse>(
    baseUrl + `browse/categories/${category_id}/playlists?&limit=10`,
    {
      headers: { Authorization: 'Bearer ' + accessToken }
    }
  )
  return response.data.playlists
}
async function searchArtist(query: string) {
  const response = await axios.get<ISearch>(baseUrl + `search?type=artist&q=${query}`, {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  return response.data.artists
}
async function searchTracks(query: string) {
  const response = await axios.get<ISearch>(baseUrl + `search?type=track&q=${query}`, {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  console.log(response.data.tracks)
  return response.data.tracks
}
async function getRecommendations(
  seed_artists: string,
  seed_tracks: string,
  seed_genres: string,
  settings: string
) {
  const body = new URLSearchParams({
    seed_artists,
    seed_tracks,
    seed_genres
  })
  const response = await axios.get(baseUrl + 'recommendations?' + body + settings, {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  return response.data
}
async function getGenreSeeds() {
  const response = await axios.get(baseUrl + 'recommendations/available-genre-seeds', {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  return response.data.genres
}

export {
  getCategories,
  getCategoryPlaylists,
  searchArtist,
  searchTracks,
  getGenreSeeds,
  getRecommendations
}
