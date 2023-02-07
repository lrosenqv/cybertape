<template>
  <div class="overlay-modal" @click.self="handleClick">
    <div class="playlist-preview-wrapper">
      <template v-if="!success">
        <div class="playlist-preview">
          <div class="playlist-preview-save">
            <h3>Save to Spotify?</h3>
            <div class="playlist-preview-save-form">
              <TextInput
                v-model="playlistName"
                class="playlist-preview-save__input"
                placeholder="Playlist name"
                :light-color="true"
              />
              <ButtonBorder text="Save" @on-click="createList" />
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
        </div>
      </template>
      <template v-if="success">
        <div class="playlist-preview__success">
          <p>
            Successfully added tracks to <span>{{ playlistName }}</span>
          </p>
          <a :href="playlistUrl">Listen on Spotify</a>
        </div>
      </template>
      <button class="playlist-preview__close-btn" @click="handleClick">X</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { ITrack } from '@/models/ITrack'
import { createPlaylist, addTracksToPlaylist } from '@/services/playlist'
import { ref, toRefs } from 'vue'
import ButtonBorder from '@/components/atoms/ButtonBorder.vue'
import TextInput from '@/components/atoms/TextInput.vue'

const props = defineProps({
  tracks: {
    type: Array<ITrack>,
    required: true
  }
})

const emits = defineEmits<{
  (e: 'closeComponent'): void
}>()

function handleClick() {
  emits('closeComponent')
}
const { tracks } = toRefs(props)
const playlistName = ref<string>('')
const playlistUrl = ref<string>('')
const success = ref<boolean>(false)

async function createList() {
  const uris = tracks.value.map((track) => {
    return track.uri
  })
  const res = await createPlaylist(playlistName.value)
  if (res.status === 201) {
    const addTracks = await addTracksToPlaylist(res.data.id, uris)
    if (addTracks.status === 201) {
      success.value = true
      playlistUrl.value = res.data.uri
    }
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
  column-gap: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  min-height: 40vh;
  max-height: 70vh;
  height: fit-content;
  overflow: hidden;
  position: relative;
  z-index: 999;
  width: 60vw;
  transition: all 0.2s;

  &-wrapper {
    background-color: variables.$color-neutral__dark;
    backdrop-filter: blur(30px);
    border-radius: variables.$border-radius-medium;
    min-height: 20vh;
    overflow: hidden;
    padding: calc(2 * #{variables.$padding-body});
  }
  &__success {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 30px;
    text-align: center;
    margin-top: auto;
    a {
      color: variables.$color__green;
      text-decoration: underline;
      transition: all 0.2s;
      @include variables.font-size-label;
      &:hover {
        color: variables.$color__green-light;
      }
    }
    p {
      @include variables.font-size-title;
      span {
        color: variables.$color__yellow;
        font-style: italic;
      }
    }
  }

  &-save {
    align-self: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    grid-row: 1 / -1;
    &__input {
      width: 80%;
    }
    &-form {
      display: flex;
      gap: 10px;
    }
  }

  h4 {
    color: variables.$color-neutral__greige;
    grid-column: 2;
    grid-row: 1;
    margin: 0;
    @include variables.font-size-label;
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
        font-weight: 600;
        gap: 4px;
        @include variables.font-size-paragraph;
        span {
          @include variables.font-size-paragraph__small;
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
