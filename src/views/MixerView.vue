<template>
  <div class="mixer">
    <PreviewPlaylist
      v-if="overlayOpen"
      :tracks="generatedPlaylist"
      @closeComponent="overlayOpen = false"
    />
    <h3>Selected:</h3>
    <div class="selectedList">
      <div class="selected" v-for="(id, index) in selectedIds" :key="id.id">
        {{ id.name }}<button @click="removeSelected(index)">X</button>
      </div>
    </div>
    <button @click="createPlaylist">Get playlist</button>
    <input v-model="inputSearch" placeholder="Search Artist" @input="searchForText" />
    <input v-model="trackSearch" placeholder="Search Tracks" @input="searchForTrack" />
    <div>{{ selectedGenre }}</div>

    <SelectDropdown :options="genres" placeholder="Select Genre" @selectOption="onSelectGenre" />
    <div v-if="inputSearch.length > 1">
      <ul>
        <li v-for="result in searchResults" :key="result.id" @click="selectResult(result)">
          {{ result.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { searchArtist, getGenreSeeds, searchTracks, getRecommendations } from '@/services/api'
import type { IArtist } from '@/models/IArtist'
import type { ITrack } from '@/models/ITrack'
import PreviewPlaylist from '@/components/PreviewPlaylist.vue'
import SelectDropdown from '@/components/icons/atoms/SelectDropdown.vue'
const inputSearch = ref('')
const trackSearch = ref('')
const searchResults = ref<IArtist[]>([])
const selectedIds = ref<IArtist[]>([])
const genres = ref<String[]>([])
const selectedGenre = ref('')
const overlayOpen = ref<boolean>(false)
const generatedPlaylist = ref<ITrack[]>([])

const selections = ref({
  seed_artists: '',
  seed_genres: '',
  seed_tracks: '',
  limit: 0,
  max_acousticness: 0,
  max_danceability: 0,
  max_energy: 0,
  max_mode: 0,
  max_popularity: 0,
  max_tempo: 0,
  max_valence: 0
})

onMounted(async () => {
  const genresFromApi = await getGenreSeeds()
  genres.value = genresFromApi
})

function onSelectGenre(text: string) {
  selections.value.seed_genres = text
}
async function searchForText() {
  const result = await searchArtist(inputSearch.value)
  searchResults.value = result.items
}
async function searchForTrack() {
  const result = await searchTracks(trackSearch.value)
}

function selectResult(artist: IArtist) {
  if (selectedIds.value.length < 5) selectedIds.value.push(artist)
  else return
}
function removeSelected(indexToDelete: number) {
  selectedIds.value.splice(indexToDelete, 1)
}
async function createPlaylist() {
  const idList = selectedIds.value.map((selected) => selected.id).toString()
  const res = await getRecommendations(idList, selectedGenre.value)
  generatedPlaylist.value = res.tracks
  overlayOpen.value = true
}
</script>

<style lang="scss">
li {
  cursor: pointer;
  &:hover {
    outline: 1px solid red;
  }
}
.selected {
  background-color: cornflowerblue;
  width: fit-content;
  height: fit-content;
  padding: 6px;
  &List {
    display: flex;
    gap: 10px;
  }
}
</style>
