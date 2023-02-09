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
import type { IPlaylist } from '@/models/IPlaylist'

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
  background: url('@/assets/Background-Light.jpg'), darken(variables.$color__green-dark, 20%);
  background-blend-mode: overlay;
  border-radius: variables.$border-radius-large variables.$border-radius-large 0 0;
  display: grid;
  gap: 20px;
  height: 100%;
  grid-template-columns: 100%;
  grid-template-rows: variables.$grid-rows-template-mobile;
  padding-inline: variables.$padding-body;

  &-header {
    grid-row: 2;
    h2 {
      @include variables.font-size-title;
    }
  }
  &-main {
    grid-row: 3 / 8;
    height: 100%;
  }
  @media screen and (min-width: 768px) {
    grid-template-rows: variables.$grid-rows-template-tablet;
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
    padding-inline: variables.$padding-body;
    gap: 0;
    padding-bottom: calc(#{variables.$padding-body} + #{variables.$padding-medium});

    &-header {
      grid-column: 2 / 6;
      grid-row: 1 / 3;
      scroll-snap-align: center none;
    }
    &-main {
      align-self: flex-end;
      flex-basis: content;
      grid-column: 3 / 13;
      grid-row: 3 / 8;
      height: fit-content;
      padding: 0;
    }
  }
}
</style>
