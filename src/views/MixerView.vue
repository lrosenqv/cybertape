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
      <MixerSearch :genres="genres" @emit-seeds="onSelectSeeds" />
    </section>

    <section class="main-mixer-section main-mixer-section__right">
      <h3>Settings</h3>
      <MixerSettings
        v-model="settingsModel"
        id="mixer-settings"
        :knobs="settings.knobs"
        :sliders="settings.sliders"
        :toggles="settings.toggles"
        @emit-settings="onSettingsChange"
        @create-mix="createMix"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import type { IArtist } from '@/models/IArtist'
import type { ITrack } from '@/models/ITrack'
import { ref, onMounted } from 'vue'
import { getGenreSeeds, getRecommendations } from '@/services/api'
import PreviewPlaylist from '@/components/PreviewPlaylist.vue'
import MixerSettings from '@/components/organisms/MixerSettings.vue'
import settings from '@/assets/mixer_settings.json'
import MixerSearch from '@/components/organisms/MixerSearch.vue'

const selectedIds = ref<IArtist[]>([])
const genres = ref<String[]>([])
const overlayOpen = ref<boolean>(false)
const generatedPlaylist = ref<ITrack[]>([])
const settingsString = ref<string>('')

const seed_artists = ref<string>('')
const seed_tracks = ref<string>('')
const seed_genres = ref<string>('')

const settingsModel = ref({
  limit: 0,
  target_acousticness: 0,
  target_danceability: 0,
  target_energy: 0,
  target_mode: 0,
  target_popularity: 0,
  target_tempo: 0,
  target_valence: 0
})

onMounted(async () => {
  const genresFromApi = await getGenreSeeds()
  genres.value = genresFromApi
})
function onSettingsChange(settings: String[]) {
  settingsString.value = `&${settings.join('&')}`
}
function onSelectSeeds(artists: string[], tracks: string[], genres: string[]) {
  // seed_artists.value = artists.map((artist) => artist.toString())
  seed_artists.value = artists.join(',')
  seed_tracks.value = tracks.join(',')
  seed_genres.value = genres.join(',')
}
function selectResult(artist: IArtist) {
  if (selectedIds.value.length < 5) selectedIds.value.push(artist)
  else return
}
async function createMix() {
  const res = await getRecommendations(
    seed_artists.value,
    seed_tracks.value,
    seed_genres.value,
    settingsString.value
  )
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
    padding: calc(2 * #{variables.$padding-x-large}) calc(2 * #{variables.$padding-x-large});

    &__left {
      background-color: variables.$color-neutral__greige-light;
      color: variables.$color-neutral__greige-dark;
      display: flex;
      flex-direction: column;
      grid-column: 1 / 6;
    }

    &__right {
      background-color: variables.$color-neutral__dark;
      background-image: url('@/assets/TextureLeather.jpg');
      background-size: cover;
      display: flex;
      flex-direction: column;
      gap: 20px;
      grid-column: 6 / 13;

      h3 {
        color: variables.$color-neutral__greige-light;
        grid-column: 1 / -1;
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
