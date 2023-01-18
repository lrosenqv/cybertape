<template>
  <div class="mixer">
    <h3>Selected:</h3>
    <div class="selectedList">
      <div class="selected" v-for="(id, index) in selectedIds" :key="id.id">
        {{ id.name }}<button @click="removeSelected(index)">X</button>
      </div>
    </div>
    <button @click="createPlaylist">Get playlist</button>
    <input v-model="inputSearch" placeholder="Search" @input="searchForText" />
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
import { searchArtist, getArtistSeeds } from '@/services/api'
import type { IArtist } from '@/models/IArtist'
const inputSearch = ref('')
const searchResults = ref<IArtist[]>([])
const selectedIds = ref<IArtist[]>([])

async function searchForText() {
  const result = await searchArtist(inputSearch.value)
  searchResults.value = result.items
}

function selectResult(artist: IArtist) {
  selectedIds.value.push(artist)
}
function removeSelected(indexToDelete: number) {
  selectedIds.value.splice(indexToDelete, 1)
}
async function createPlaylist() {
  const playlist = selectedIds.value.map(async (selected) => {
    const res = await getArtistSeeds(selected.id)
    console.log(res)
  })
  console.log(playlist)
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
