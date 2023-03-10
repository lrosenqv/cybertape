<template>
  <div class="mixer">
    <header class="mixer-header">
      <h2>Playlist mixer</h2>
      <p>You have to select at least one artist, track or genre, but no more than 5 of each.</p>
    </header>
    <main class="mixer-main">
      <PreviewPlaylist
        v-if="overlayOpen"
        :tracks="generatedPlaylist"
        @closeComponent="overlayOpen = false"
      />
      <section
        class="mixer-main-section mixer-main-section__left"
        :class="{ '-collapsed': !searchOpen && mobileView, '-expanded': searchOpen && mobileView }"
      >
        <div class="mixer-main-section__left-header">
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

      <section class="mixer-main-section mixer-main-section__right">
        <MixerSettings
          id="mixer-settings"
          :knobs="settings.knobs"
          :sliders="settings.sliders"
          :toggles="settings.toggles"
          @emit-settings="onSettingsChange"
          @create-mix="createMix"
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import settings from '@/assets/mixer_settings.json'
import type { ITrack } from '@/models/ITrack'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { getGenres, getRecommendations } from '@/services/api'
import MixerSearch from '@/components/mixer/MixerSearch.vue'
import MixerSettings from '@/components/mixer/MixerSettings.vue'
import PreviewPlaylist from '@/components/general/PreviewPlaylist.vue'
import IconChevron from '@/components/icons/IconChevron.vue'

const store = useStore()

const mobileView = computed(() => store.state.mobileView)
const genres = ref<String[]>([])
const overlayOpen = ref<boolean>(false)
const searchOpen = ref<boolean>(false)
const generatedPlaylist = ref<ITrack[]>([])
const settingsString = ref<string>('')
const seed_artists = ref<string>('')
const seed_tracks = ref<string>('')
const seed_genres = ref<string>('')

onMounted(async () => {
  const genresFromApi = await getGenres()
  genres.value = genresFromApi
})
function toggleSearch() {
  searchOpen.value = !searchOpen.value
}
// Preparing params for API request
function onSettingsChange(settings: String[]) {
  settingsString.value = `&${settings.join('&')}`
}
function onSelectSeeds(artists: string[], tracks: string[], genres: string[]) {
  seed_artists.value = artists.join(',')
  seed_tracks.value = tracks.join(',')
  seed_genres.value = genres.join(',')
}
// Create mix from selections
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

<style lang="scss" scoped>
@use '@/style/variables.scss';

.mixer {
  background: url('@/assets/TextureRed.jpg'), variables.$color__red;
  border-radius: variables.$border-radius-large variables.$border-radius-large 0 0;
  display: grid;
  grid-template-columns: variables.$grid-template-standard;
  grid-template-rows: variables.$grid-rows-template-mobile;
  justify-items: center;
  min-height: 100vh;
  padding: 0 variables.$padding-large variables.$padding-x-large;

  &-header {
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    grid-column: 1 / -1;
    grid-row: 2 / 3;
    max-width: 1200px;
    padding-bottom: variables.$padding-medium;
    width: 100%;
    scroll-snap-align: center none;
    h2 {
      @include variables.font-size-title;
    }
  }
  &-main {
    display: flex;
    flex-direction: column;
    gap: 10px;
    grid-row: 3 / 9;
    grid-column: 1 / -1;
    max-width: 1200px;
    width: 100%;

    &-section {
      border-radius: variables.$border-radius-medium;
      box-shadow: variables.$shadow-1;
      grid-row: 1;
      padding: variables.$padding-large;
      h3 {
        font-size: 20px;
        font-weight: 500;
      }
      &__left {
        background-color: variables.$color-neutral__greige-light;
        color: variables.$color-neutral__greige-dark;
        display: flex;
        flex-direction: column;
        transition: all 0.2s;
        padding: variables.$padding-small variables.$padding-x-large;
        &.-collapsed {
          gap: 0;
          height: 40px;
        }
        &.-expanded {
          height: 250px;
          gap: 8px;
          .main-mixer-section__left-header svg {
            transform: rotate(180deg);
          }
        }
        &-header {
          align-items: center;
          display: flex;
          justify-content: space-between;
          scroll-snap-align: center none;
        }
      }
      &__right {
        background-color: variables.$color-neutral__dark;
        background-image: url('@/assets/TextureLeather.jpg');
        background-size: cover;
        height: fit-content;
      }
    }
  }
  @media screen and (min-width: 769px) {
    grid-template-columns: variables.$grid-template-standard;
    grid-template-rows: variables.$grid-rows-template-tablet;
    padding: 0 variables.$padding-body variables.$padding-body;

    &-header {
      align-self: flex-end;
      grid-column: 1 / -1;
      height: fit-content;
      h2 {
        @include variables.font-size-h2;
      }
    }
    &-main {
      gap: 20px;
      &-section {
        height: 100%;
        padding: variables.$padding-x-large;
      }
    }
  }
  @media screen and (min-width: 1024px) {
    height: 100vh;
    grid-template-rows: variables.$grid-rows-template-standard;

    &-main {
      flex-direction: row;
      display: grid;
      height: fit-content;
      &-section {
        padding: variables.$padding-body;
        h3 {
          @include variables.font-size-subtitle;
        }
      }
    }
  }
}
</style>
