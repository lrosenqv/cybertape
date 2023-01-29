<template>
  <header class="header-mixer">
    <h2>Playlist mixer</h2>
  </header>
  <main class="main-mixer">
    <PreviewPlaylist
      v-if="overlayOpen"
      :tracks="generatedPlaylist"
      @closeComponent="overlayOpen = false"
    />

    <section class="main-mixer-section main-mixer-section__left">
      <h3>Selected:</h3>
      <div class="selectedList">
        <div class="selected" v-for="(id, index) in selectedIds" :key="id.id">
          {{ id.name }}<button @click="removeSelected(index)">X</button>
        </div>
      </div>
      <button @click="createPlaylist">Get playlist</button>

      <TextInput placeholder="Search artists" @stringInput="searchForArtist" />
      <TextInput placeholder="Search tracks" @stringInput="searchForTrack" />
      <SelectDropdown :options="genres" placeholder="Select Genre" @selectOption="onSelectGenre" />

      <div v-if="searchResults.length > 1">
        <ul>
          <li v-for="result in searchResults" :key="result.id" @click="selectResult(result)">
            {{ result.name }}
          </li>
        </ul>
      </div>
    </section>

    <section class="main-mixer-section main-mixer-section__right">
      <div id="sliders">
        <RangeSlider title="Acousticness" />
        <RangeSlider title="Tempo" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { searchArtist, getGenreSeeds, searchTracks, getRecommendations } from '@/services/api'
import type { IArtist } from '@/models/IArtist'
import type { ITrack } from '@/models/ITrack'
import PreviewPlaylist from '@/components/PreviewPlaylist.vue'
import SelectDropdown from '@/components/atoms/SelectDropdown.vue'
import TextInput from '@/components/atoms/TextInput.vue'
import RangeSlider from '@/components/atoms/RangeSlider.vue'
const searchResults = ref<IArtist[]>([])
const results_tracks = ref<ITrack[]>([])
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

async function searchForArtist(searchString: string) {
  if (searchString.length > 2) {
    const result = await searchArtist(searchString)
    searchResults.value = result.items
  } else searchResults.value = []
}

async function searchForTrack(searchString: string) {
  if (searchString.length > 2) {
    const result = await searchTracks(searchString)
    results_tracks.value = result.items
  } else results_tracks.value = []
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
@use '@/style/variables.scss';
.header-mixer {
  background-color: variables.$color__blue;
  background-image: url('@/assets/BackgroundBlue.jpg');
  background-position: center;
  border-radius: 40px 40px 0 0;
  display: grid;
  grid-template-columns: variables.$grid-template-standard;
  grid-template-rows: 20vh auto;
  padding: 0 calc(2 * #{variables.$padding-body});

  h2 {
    grid-column: 1 / -1;
    grid-row: 2;
  }
}
.main-mixer {
  background-color: variables.$color__blue-light;
  background-image: url('@/assets/BackgroundBlue.jpg');
  background-position: center;
  column-gap: 24px;
  display: grid;
  grid-template-columns: variables.$grid-template-standard;
  grid-template-rows: 60vh 20vh;
  padding: 0 calc(2 * #{variables.$padding-body});

  &-section {
    border-radius: variables.$border-radius-medium;
    box-shadow: variables.$shadow-1;
    grid-row: 1;
    padding: variables.$padding-large calc(2 * #{variables.$padding-x-large});

    &__left {
      background-color: variables.$color-neutral__greige-light;
      color: variables.$color-neutral__greige-dark;
      grid-column: 1 / 6;
    }

    &__right {
      background-color: variables.$color-neutral__dark;
      background-image: url('@/assets/TextureLeather.jpg');
      background-size: cover;
      grid-column: 6 / 13;

      #sliders {
        column-gap: 60px;
        display: flex;
      }
    }
  }
}
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
  padding: variables.$padding-small;
  &List {
    display: flex;
    gap: 10px;
  }
}
</style>
