<template>
  <div class="discover">
    <header class="discover-header">
      <h2>Discover</h2>
      <p>Pick a category to generate a mix of its' most popular tracks!</p>
    </header>
    <main class="discover-main">
      <TapeRack :list="categories.items" @on-click="handleClick" />
      <PreviewPlaylist
        v-if="openOverlay"
        :tracks="generatedPlaylist"
        @close-component="toggleOverlay"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCategories, getCategoryPlaylists, getPlaylistById } from '@/services/api'
import type { ICategory } from '@/models/ICategory'
import type { ITrack } from '@/models/ITrack'
import TapeRack from '@/components/atoms/TapeRack.vue'
import PreviewPlaylist from '@/components/PreviewPlaylist.vue'

const categories = ref<ICategory>({ href: '', items: [], next: '' })
const generatedPlaylist = ref<ITrack[]>([])
const openOverlay = ref<boolean>(false)

onMounted(async () => {
  categories.value = await getCategories()
})
async function handleClick(item: any) {
  const playlists = await getCategoryPlaylists(item.id)
  const shuffle = playlists.items.sort(() => 0.5 - Math.random())
  const selected = shuffle.slice(0, 5)

  selected.map(async (sel) => {
    const hello = await getPlaylistById(sel.href)
    const filter = hello.tracks.items.map((item) => {
      return item.track
    })
    const sorted = filter.sort((a, b) => {
      return b.popularity - a.popularity
    })

    const mostPopularTracks = sorted.splice(0, 4)
    mostPopularTracks.forEach((track) => {
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

<style lang="scss">
@use '@/style/variables.scss';

.discover {
  background-color: variables.$color__green-dark;
  border-radius: variables.$border-radius-large variables.$border-radius-large 0 0;
  display: grid;
  grid-template-columns: variables.$grid-template-standard;
  grid-template-rows: 75vh 10vh;
  padding: 0 variables.$padding-large;
  padding-top: 20vh;
  overflow: hidden;

  &-header {
    grid-column: 1 / 4;
    grid-row: 1;

    h2 {
      grid-column: 1 / -1;
      grid-row: 2;
      @include variables.font-size-title;
    }
    p {
      grid-column: 1 / 4;
      grid-row: 3;
    }
  }
  &-main {
    align-self: flex-end;
    grid-column: 5 / 12;
    grid-row: 1 / 2;
  }

  @media screen and (min-width: 1024px) {
    padding-inline: calc(2 * #{variables.$padding-body});
    h2 {
      @include variables.font-size-h2;
    }
  }
}
</style>
