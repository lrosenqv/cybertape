import type { ICategories } from '@/models/ICategory'
import type { IPlaylist, IPlaylistResponse } from '@/models/IPlaylist'
import type { ISearch } from '@/models/ISearch'
import type { ISeed } from '@/models/ISeed'
import axios from 'axios'

const baseUrl = 'https://api.spotify.com/v1/'
const accessToken = sessionStorage.getItem('access_token')

async function getPlaylistById(playlist_url: string) {
  const response = await axios.get<IPlaylist>(playlist_url, {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
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
  console.log(response.data)
  return response.data.tracks
}

async function getArtistSeeds(ids: string) {
  const response = await axios.get<ISeed>(baseUrl + `recommendations?seed_artists=${ids}`, {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  return response.data
}

async function getGenreSeeds() {
  const response = await axios.get<String[]>(baseUrl + 'recommendations/available-genre-seeds', {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  return response.data
}

export {
  getCategoryPlaylists,
  getCategories,
  getPlaylistById,
  searchArtist,
  searchTracks,
  getArtistSeeds,
  getGenreSeeds
}
