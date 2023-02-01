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
      <h3>Search</h3>
      <div class="selectedList">
        <div class="selected" v-for="(id, index) in selectedIds" :key="id.id">
          {{ id.name }}<button @click="removeSelected(index)">X</button>
        </div>
      </div>
      <button @click="createPlaylist">Get playlist</button>
      <TextInput placeholder="Search artists" @stringInput="searchForArtist" />
      <TextInput placeholder="Search tracks" @stringInput="searchForTrack" />
      <SelectDropdown :options="genres" placeholder="Select Genre" @selectOption="onSelectGenre" />

      <SearchResults v-if="results_artists.length > 1" :list="results_artists" />
      <SearchResults
        v-if="results_tracks.length > 1"
        :list="results_tracks"
        :show-subtitles="true"
      />
    </section>

    <section class="main-mixer-section main-mixer-section__right">
      <h3>Settings</h3>
      <div id="knobs">
        <RotationKnob
          title="Danceability"
          description="How suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity."
          @knob-value="onKnobChange"
        />
        <RotationKnob title="Energy" @knob-value="onKnobChange" />
        <RotationKnob title="Danceability" @knob-value="onKnobChange" />
        <RotationKnob title="Valence" @knob-value="onKnobChange" />
      </div>

      <div id="sliders">
        <RangeSlider title="Acoustic" @range-value="onSliderChange" />
        <RangeSlider title="Instrumental" @range-value="onSliderChange" />
        <RangeSlider title="Popularity" @range-value="onSliderChange" />
        <RangeSlider title="Tempo" @range-value="onSliderChange" />
      </div>
      <div id="toggles">
        <ToggleSlider
          title="Nmbr of tracks"
          :min="10"
          :max="20"
          :steps="5"
          :step-labels="['10', '15', '20']"
          @toggle-value="onToggleChange"
        />
        <ToggleSlider
          title="Mode"
          :min="0"
          :max="1"
          :steps="1"
          :step-labels="['Minor', 'Major']"
          @toggle-value="onToggleChange"
        />
      </div>
      <div id="buttons">
        <MixerButton text="reset" size="_small" color="_red" @emit-click="resetSelection" />
        <MixerButton text="Mix" @emit-click="onMixBtnClick" />
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
import RotationKnob from '@/components/atoms/RotationKnob.vue'
import ToggleSlider from '@/components/atoms/ToggleSlider.vue'
import MixerButton from '@/components/atoms/MixerButton.vue'
import SearchResults from '@/components/atoms/SearchResults.vue'

const results_artists = ref<IArtist[]>([])
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
    results_artists.value = result.items
  } else results_artists.value = []
}
async function searchForTrack(searchString: string) {
  if (searchString.length > 2) {
    const result = await searchTracks(searchString)
    results_tracks.value = result.items
  } else results_tracks.value = []
}
function onSliderChange(value: number, title: string) {
  // console.log(value, title)
}
function onKnobChange(value: string, title: string) {
  // console.log(value, title)
}
function onToggleChange(value: number) {
  selections.value.limit = value
}
function onMixBtnClick() {
  // console.log('clicked!')
}
function resetSelection() {
  // console.log('clicked!')
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
  background-size: cover;
  background-repeat: no-repeat;
  column-gap: 24px;
  display: grid;
  grid-template-columns: variables.$grid-template-standard;
  grid-template-rows: 65vh 15vh;
  padding: 0 calc(2 * #{variables.$padding-body});

  &-section {
    border-radius: variables.$border-radius-medium;
    box-shadow: variables.$shadow-1;
    grid-row: 1;
    padding: calc(2 * #{variables.$padding-x-large}) calc(3 * #{variables.$padding-x-large});

    &__left {
      background-color: variables.$color-neutral__greige-light;
      color: variables.$color-neutral__greige-dark;
      grid-column: 1 / 6;
    }

    &__right {
      background-color: variables.$color-neutral__dark;
      background-image: url('@/assets/TextureLeather.jpg');
      background-size: cover;
      display: grid;
      gap: 20px;
      grid-column: 6 / 13;
      grid-template-columns: inherit;
      grid-template-rows: repeat(6, 1fr);

      h3 {
        color: variables.$color-neutral__greige-light;
        grid-column: 1 / -1;
      }

      #sliders {
        column-gap: 60px;
        display: flex;
        grid-column: 1 / 9;
        grid-row: 4 / 7;
        justify-content: space-around;
      }
      #knobs {
        column-gap: 30px;
        display: flex;
        grid-column: 1 / 9;
        grid-row: 2 / 4;
        justify-content: space-between;
      }
      #toggles {
        display: flex;
        flex-direction: column;
        gap: 30px;
        grid-column: 9 / 13;
        grid-row: 2 / 6;
        justify-self: flex-end;
      }
      #buttons {
        display: flex;
        grid-column: 10 / 13;
        grid-row: 6 / 7;
        justify-content: space-between;
        button {
          margin-top: auto;
        }
      }
    }
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
