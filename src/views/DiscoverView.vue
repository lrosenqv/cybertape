<template>
  <div class="discover">
    <header class="discover-header">
      <h2>Discover</h2>
      <p>Pick a category to mix some of its' most popular tracks!</p>
    </header>
    <main class="discover-main">
      <TapeRack :list="categories" @on-clicked="handleClick" />
      <PreviewPlaylist
        v-if="openOverlay"
        :tracks="generatedPlaylist"
        @close-component="toggleOverlay"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import type { ICategory } from '@/models/ICategory'
import type { ITrack } from '@/models/ITrack'
import type { IPlaylist } from '@/models/IPlaylist'
import { getCategories, getCategoryPlaylists } from '@/services/api'
import { getPlaylistById } from '@/services/playlist'
import { ref, onMounted } from 'vue'
import TapeRack from '@/components/TapeRack.vue'
import PreviewPlaylist from '@/components/general/PreviewPlaylist.vue'

const categories = ref<ICategory[]>([])
const generatedPlaylist = ref<ITrack[]>([])
const openOverlay = ref<boolean>(false)

onMounted(async () => {
  const categoriesReq = await getCategories()
  categories.value = categoriesReq.categories.items
})
async function handleClick(item: any) {
  const playlists = await getCategoryPlaylists(item.id)

  const shuffle = playlists.items.sort(() => 0.5 - Math.random())
  const selected = shuffle.slice(0, 5)

  selected.map(async (object) => {
    const playlist: IPlaylist = await getPlaylistById(object.href)
    const filter = playlist.tracks.items.map((item) => {
      return item.track
    })
    const sorted = filter.sort((a, b) => {
      return b.popularity - a.popularity
    })
    const mostPopularTracks = sorted.splice(0, 4)
    mostPopularTracks.forEach((track: ITrack) => {
      generatedPlaylist.value.push(track)
    })
  })
  toggleOverlay()
}
function toggleOverlay() {
  if (openOverlay.value === false) generatedPlaylist.value = []
  openOverlay.value = !openOverlay.value
}
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.discover {
  background: url('@/assets/TextureLight.jpg'), darken(variables.$color__green-dark, 20%);
  background-blend-mode: overlay;
  border-radius: variables.$border-radius-large variables.$border-radius-large 0 0;
  display: grid;
  height: 100vh;
  grid-template-columns: variables.$grid-template-standard;
  grid-template-rows: variables.$grid-rows-template-mobile;
  padding-inline: variables.$padding-large;

  &-header {
    grid-column: 1 / -1;
    grid-row: 2;
    scroll-snap-align: center none;
    h2 {
      @include variables.font-size-title;
    }
    padding-bottom: variables.$padding-medium;
  }
  &-main {
    grid-column: 1 / -1;
    grid-row: 3 / 8;
    height: 100%;
  }
  @media screen and (min-width: 768px) {
    grid-template-rows: variables.$grid-rows-template-tablet;
    padding: 0 variables.$padding-body variables.$padding-body;
    &-header {
      align-self: flex-end;
      grid-row: 1 / 3;
      h2 {
        @include variables.font-size-h2;
      }
    }
    &-main {
      grid-row: 3 / 7;
    }
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: variables.$grid-template-standard;
    grid-template-rows: variables.$grid-rows-template-standard;
    justify-items: center;
    padding: 0 variables.$padding-body variables.$padding-body;

    &-header {
      align-self: flex-end;
      grid-column: 1 / -1;
      grid-row: 2 / 3;
      scroll-snap-align: center none;
      max-width: 1200px;
      padding-bottom: 40px;
      width: 100%;
    }
    &-main {
      grid-column: 1 /12;
      grid-row: 3 / 7;
      height: fit-content;
      max-width: 1000px;
      margin-left: auto;
    }
  }
}
</style>
