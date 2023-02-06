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
    <section
      class="main-mixer-section main-mixer-section__left"
      :class="{ '-collapsed': !searchOpen && mobileView, '-expanded': searchOpen && mobileView }"
    >
      <div class="main-mixer-section__left-header">
        <h3>Search</h3>
        <IconChevron v-if="mobileView" @click="toggleSearch" />
      </div>
      <MixerSearch
        :mobile-view="mobileView"
        :search-open="searchOpen"
        :genres="genres"
        @emit-seeds="onSelectSeeds"
      />
    </section>

    <section class="main-mixer-section main-mixer-section__right">
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
import IconChevron from '@/components/icons/IconChevron.vue'

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
const mobileView = ref<boolean>(false)
const searchOpen = ref<boolean>(false)

onMounted(async () => {
  const genresFromApi = await getGenreSeeds()
  genres.value = genresFromApi

  if (window.innerWidth <= 769) mobileView.value = true
  window.addEventListener('rezise', () => {
    if (window.innerWidth <= 769) mobileView.value = true
  })
})

function toggleSearch() {
  searchOpen.value = !searchOpen.value
}
function onSettingsChange(settings: String[]) {
  settingsString.value = `&${settings.join('&')}`
}
function onSelectSeeds(artists: string[], tracks: string[], genres: string[]) {
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
  grid-template-rows: 8vh auto;
  padding: 0 variables.$padding-large;

  h2 {
    grid-column: 1 / -1;
    grid-row: 2;
    @include variables.font-size-title;
  }
  @media screen and (min-width: 769px) {
    column-gap: 24px;
    grid-template-rows: 13vh auto;
    padding: 0 calc(2 * #{variables.$padding-body});
    h2 {
      @include variables.font-size-h2;
    }
  }
  @media screen and (min-width: 1024px) {
    grid-template-rows: 20vh auto;
    padding: 0 calc(2 * #{variables.$padding-body});
  }
}
.main-mixer {
  background-color: variables.$color__blue-light;
  background-image: url('@/assets/BackgroundBlue.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  gap: 15px;
  display: grid;
  grid-template-columns: variables.$grid-template-standard;
  grid-template-rows: auto 70vh 35vh;
  padding: 0 variables.$padding-large;

  @media screen and (min-width: 769px) {
    column-gap: 24px;
    grid-template-rows: 25vh 40vh 10vh;
    padding: 0 calc(2 * #{variables.$padding-body});
  }

  @media screen and (min-width: 1024px) {
    column-gap: 24px;
    grid-template-rows: 65vh 15vh;
    padding: 0 calc(2 * #{variables.$padding-body});
  }

  &-section {
    border-radius: variables.$border-radius-medium;
    box-shadow: variables.$shadow-1;
    grid-row: 1;
    padding: variables.$padding-large variables.$padding-large;

    h3 {
      grid-column: 1 / -1;
      font-size: 20px;
    }

    &__left {
      background-color: variables.$color-neutral__greige-light;
      color: variables.$color-neutral__greige-dark;
      display: flex;
      flex-direction: column;
      grid-column: 1 / -1;
      grid-row: 1;
      &.-collapsed {
        height: 5vh;
        transition: all 0.2s;
        padding: variables.$padding-small variables.$padding-x-large;
      }
      &.-expanded {
        height: 28vh;
        gap: 8px;
        transition: all 0.2s;
        .main-mixer-section__left-header svg {
          transform: rotate(180deg);
        }
      }
      &-header {
        align-items: center;
        display: flex;
        justify-content: space-between;
      }
    }

    &__right {
      background-color: variables.$color-neutral__dark;
      background-image: url('@/assets/TextureLeather.jpg');
      background-size: cover;
      display: flex;
      flex-direction: column;
      gap: 20px;
      grid-column: 1 / -1;
      grid-row: 2;

      h3 {
        color: variables.$color-neutral__greige-light;
      }
    }
    @media screen and (min-width: 1024px) {
      padding: calc(2 * #{variables.$padding-x-large}) calc(2 * #{variables.$padding-x-large});
      &__left {
        grid-column: 1 / 6;
        grid-row: 1;
      }
      &__right {
        grid-column: 6 / 13;
        grid-row: 1;
      }
    }
  }
}
</style>
