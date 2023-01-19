<template>
  <div class="discover">
    <GeneratedPlaylist
      v-if="openOverlay"
      :tracks="generatedPlaylist"
      @close-component="toggleOverlay"
    />
    <div class="categories">
      <div v-for="(item, index) in categories?.items" :key="index">
        <p @click="handleClick(item)">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCategories, getCategoryPlaylists, getPlaylistById } from '@/services/api'
import type { ICategory } from '@/models/ICategory'
import type { ITrack } from '@/models/ITrack'
import GeneratedPlaylist from '@/components/icons/atoms/molecules/GeneratedPlaylist.vue'

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
p {
  cursor: pointer;
  margin: 0;
  &:hover {
    outline: 1px dotted magenta;
  }
}
</style>
