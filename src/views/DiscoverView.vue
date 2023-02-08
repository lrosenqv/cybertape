<template>
  <div class="discover">
    <header class="discover-header">
      <h2>Discover</h2>
      <p>Pick a category to generate a mix of its' most popular tracks!</p>
    </header>
    <main class="discover-main">
      <TapeRack :list="categories.items" @on-clicked="handleClick" />
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

<style lang="scss" scoped>
@use '@/style/variables.scss';

.discover {
  background-color: variables.$color__green-dark;
  border-radius: variables.$border-radius-large variables.$border-radius-large 0 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20vh 55vh 10vh;
  padding-top: 20vh;
  padding-inline: variables.$padding-body;

  &-header {
    align-self: flex-end;
    grid-row: 1;
    h2 {
      @include variables.font-size-title;
    }
  }
  &-main {
    grid-row: 2;
    height: 100%;
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: variables.$grid-template-standard;
    grid-template-rows: 20vh 15vh 55vh 15vh;
    padding-inline: calc(2 * #{variables.$padding-body});
    padding-top: 0;

    &-header,
    header {
      grid-column: 1 / -1;
      grid-row: 1 / 3;
      scroll-snap-align: center none;
      h2 {
        @include variables.font-size-h2;
      }
    }
    &-main {
      grid-column: 4 / 13;
      grid-row: 2 / 4;
      justify-self: center;
    }
  }
}
</style>
