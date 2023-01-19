<template>
  <div class="mixer">
    <h3>Selected:</h3>
    <div class="selectedList">
      <div class="selected" v-for="(id, index) in selectedIds" :key="id.id">
        {{ id.name }}<button @click="removeSelected(index)">X</button>
      </div>
    </div>
    <button @click="createPlaylist">Get playlist</button>
    <input v-model="inputSearch" placeholder="Search Artist" @input="searchForText" />
    <input v-model="trackSearch" placeholder="Search Tracks" @input="searchForTrack" />
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
import { ref } from 'vue'
import { searchArtist, getGenreSeeds, searchTracks } from '@/services/api'
import type { IArtist } from '@/models/IArtist'
const inputSearch = ref('')
const trackSearch = ref('')
const searchResults = ref<IArtist[]>([])
const selectedIds = ref<IArtist[]>([])

async function searchForText() {
  const result = await searchArtist(inputSearch.value)
  // searchResults.value = result
}
async function searchForTrack() {
  const result = await searchTracks(trackSearch.value)
  // console.log(result)
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
  // const seeds = await getArtistSeeds(idList)
  const genres = await getGenreSeeds()
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
