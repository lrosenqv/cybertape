<template>
  <div class="overlay-modal" @click.self="handleClick">
    <div class="playlist-preview">
      <div class="playlist-preview-save">
        <h3>Save to Spotify?</h3>
        <div class="playlist-preview-save-form">
          <SearchInput
            v-model="playlistName"
            class="playlist-preview-save__input"
            placeholder="Playlist name"
          />
          <button @click="createList">Save</button>
        </div>
      </div>

      <div class="playlist-preview-list-wrapper">
        <h4>Preview</h4>
        <ul class="playlist-preview-list">
          <li v-for="track in tracks" :key="track.id" class="playlist-preview-list__item">
            <img :src="track.album.images[2].url" />
            <div class="playlist-preview-list__item-text">
              {{ track.name }}<span>{{ track.artists[0].name }}</span>
            </div>
          </li>
        </ul>
      </div>
      <button class="playlist-preview__close-btn" @click="handleClick">X</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ITrack } from '@/models/ITrack'
import { createPlaylist, addTracksToPlaylist } from '@/services/playlist'
import { ref, toRefs, onMounted } from 'vue'
import SearchInput from './atoms/SearchInput.vue'

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
onMounted(() => [console.log(tracks.value)])
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
@use '@/style/variables.scss';
.overlay-modal {
  align-items: center;
  background-color: rgba(11, 11, 11, 0.544);
  backdrop-filter: blur(50px);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 999;
}
.playlist-preview {
  background-color: variables.$color-neutral__dark;
  backdrop-filter: blur(30px);
  column-gap: 40px;
  border-radius: variables.$border-radius-medium;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  min-height: 40vh;
  max-height: 70vh;
  overflow: hidden;
  padding: calc(2 * #{variables.$padding-body});
  position: relative;
  z-index: 999;
  width: 60vw;

  &-save {
    align-self: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    grid-row: 1 / -1;
    &__input {
      width: 80%;
    }
    button {
      color: variables.$color__green;
      background-color: transparent;
      border-radius: variables.$border-radius-small;
      border: 2px solid variables.$color__green;
      font-size: variables.$font-size-paragraph;
      font-weight: 600;
      padding: variables.$padding-x-small variables.$padding-small;
    }
    &-form {
      display: flex;
      gap: 10px;
    }
  }

  h4 {
    color: variables.$color-neutral__greige;
    font-size: variables.$font-size-label;
    grid-column: 2;
    grid-row: 1;
    margin: 0;
  }
  &-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: variables.$color-neutral__light;
    font-weight: 600;

    &-wrapper {
      grid-column: 2;
      grid-row: 2;
      height: 100%;
      overflow-y: auto;
    }

    &__item {
      align-items: center;
      display: flex;
      gap: 10px;

      &-text {
        display: flex;
        flex-direction: column;
        font-size: variables.$font-size-paragraph;
        gap: 4px;
        font-weight: 600;
        span {
          font-size: variables.$font-size-paragraph__small;
          color: variables.$color-neutral__greige-light;
        }
      }
      img {
        width: 10%;
      }
    }
  }

  &__close-btn {
    background-color: transparent;
    color: variables.$color__yellow;
    font-weight: 600;
    position: absolute;
    top: variables.$padding-large;
    right: variables.$padding-x-large;
  }
}
</style>
