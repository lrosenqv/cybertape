<template>
  <div class="mixer">
    <header class="mixer-header">
      <h2>Playlist mixer</h2>
      <p>Lorem Ipsum dolor sit amet</p>
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
  </div>
</template>

<script setup lang="ts">
import type { ITrack } from '@/models/ITrack'
import { ref, onMounted, computed } from 'vue'
import { getGenres, getRecommendations } from '@/services/api'
import PreviewPlaylist from '@/components/PreviewPlaylist.vue'
import MixerSettings from '@/components/organisms/MixerSettings.vue'
import settings from '@/assets/mixer_settings.json'
import MixerSearch from '@/components/organisms/MixerSearch.vue'
import IconChevron from '@/components/icons/IconChevron.vue'
import { useStore } from 'vuex'
const store = useStore()

const genres = ref<String[]>([])
const overlayOpen = ref<boolean>(false)
const searchOpen = ref<boolean>(false)
const generatedPlaylist = ref<ITrack[]>([])
const settingsString = ref<string>('')
const seed_artists = ref<string>('')
const seed_tracks = ref<string>('')
const seed_genres = ref<string>('')
const mobileView = computed(() => store.state.mobileView)

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
  const genresFromApi = await getGenres()
  genres.value = genresFromApi
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

.mixer {
  background: url('@/assets/TextureLight.jpg'), variables.$color__red;
  background-blend-mode: soft-light;
  border-radius: variables.$border-radius-large variables.$border-radius-large 0 0;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: variables.$grid-rows-template-mobile;
  height: 100vh;
  padding-bottom: variables.$padding-x-large;
  padding-inline: variables.$padding-large;

  &-header {
    display: flex;
    flex-direction: column;
    grid-column: 1;
    grid-row: 2;
    padding-bottom: variables.$padding-x-large;
    scroll-snap-align: center none;

    h2 {
      grid-column: 1 / -1;
      grid-row: 2;
      @include variables.font-size-title;
    }
  }
  &-main {
    display: grid;
    gap: 15px;
    grid-row: 3 / 8;
    grid-template-rows: auto 1fr;
    height: 100%;

    &-section {
      border-radius: variables.$border-radius-medium;
      box-shadow: variables.$shadow-1;
      grid-row: 1;

      h3 {
        font-size: 20px;
      }
      &__left {
        background-color: variables.$color-neutral__greige-light;
        color: variables.$color-neutral__greige-dark;
        display: flex;
        flex-direction: column;
        grid-column: 1;
        grid-row: 1;
        transition: all 0.2s;
        padding: variables.$padding-medium variables.$padding-x-large;
        &.-collapsed {
          gap: 0;
          height: 4.5vh;
          transition: all 0.2s;
        }
        &.-expanded {
          height: 25vh;
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
          scroll-snap-align: center none;
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
        height: fit-content;
        padding-block: variables.$padding-large;
      }
    }
  }

  @media screen and (min-width: 769px) {
    grid-template-columns: variables.$grid-template-standard;
    grid-template-rows: variables.$grid-rows-template-tablet;
    padding-inline: variables.$padding-body;

    &-header {
      align-self: flex-end;
      grid-column: 2 / 12;
      height: fit-content;
      padding-bottom: variables.$padding-x-large;
      h2 {
        @include variables.font-size-h2;
      }
    }
    &-main {
      display: flex;
      grid-row: 3 / 8;
      grid-column: 2 / 12;
      flex-direction: column;

      &-section {
        width: 100%;
        &__left {
          height: 100%;
        }
        &__right {
          height: 100%;
          padding-inline: variables.$padding-body;
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    grid-template-rows: variables.$grid-rows-template-standard;
    padding-inline: variables.$padding-body;

    &-main {
      flex-direction: row;
      grid-row: 3 / 7;
      grid-column: 2 / 12;

      &-section {
        padding: variables.$padding-body;
        h3 {
          font-size: 26px;
          font-weight: 500;
        }
        &__left {
          row-gap: 15px;
          flex-shrink: 0.9;
        }
        &__right {
          padding-right: calc(2 * #{variables.$padding-x-large});
          flex-shrink: 0.8;
        }
      }
    }
  }
}
</style>
