<template>
  <div class="overlay">
    <div>
      <input v-model="playlistName" placeholder="Playlist name" />
      <button @click="createList">Create Playlist</button>
    </div>
    <button @click="handleClick">Close Overlay</button>
  </div>
</template>
<script lang="ts" setup>
import type { ITrack } from '@/models/ITrack'
import { createPlaylist, addTracksToPlaylist } from '@/services/playlist'
import { ref, toRefs } from 'vue'

const props = defineProps({
  tracks: {
    type: Array<ITrack>,
    required: true
  }
})
const { tracks } = toRefs(props)
const emits = defineEmits<{
  (e: 'closeComponent'): void
}>()

function handleClick() {
  emits('closeComponent')
}
const playlistName = ref('')

async function createList() {
  const uris = tracks.value.map((track) => {
    return track.uri
  })
  const res = await createPlaylist(playlistName.value)
  if (res.status === 201) {
    const addTracks = await addTracksToPlaylist(res.data.id, uris)
    console.log(addTracks)
  }
}
</script>
<style lang="scss" scoped>
.overlay {
  height: 100vh;
  width: 100vw;
  background-color: rgb(47, 47, 47);
  filter: blur(50%);
}
</style>
