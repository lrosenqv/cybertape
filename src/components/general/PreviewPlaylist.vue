<template>
  <div class="overlay-modal" @click.self="handleClick">
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
        <ButtonBorder
          text="x"
          :secondary="true"
          class="playlist-preview__close-btn"
          @on-click="handleClick"
        />
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
  </div>
</template>
<script lang="ts" setup>
import type { ITrack } from '@/models/ITrack'
import type { PropType } from 'vue'
import { ref, toRefs } from 'vue'
import { createPlaylist, addTracksToPlaylist } from '@/services/playlist'
import ButtonBorder from '@/components/general/ButtonBorder.vue'
import TextInput from '@/components/general/TextInput.vue'

const props = defineProps({
  tracks: {
    type: Array as PropType<ITrack[]>,
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
@import '@/style/variables.scss';
.overlay-modal {
  background-color: #0b0b0b8b;
  backdrop-filter: blur(50px);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1;
  button {
    z-index: 2;
  }

  .playlist-preview {
    background-color: variables.$color-neutral__dark;
    border-radius: variables.$border-radius-medium;
    display: grid;
    gap: 20px;
    grid-template-rows: auto 1fr;
    min-height: 40vh;
    max-height: 70vh;
    height: fit-content;
    overflow: hidden;
    padding: variables.$padding-x-large;
    padding-top: 70px;
    width: 90vw;
    transition: all 0.2s;
    top: 10vh;

    &-save {
      align-self: center;
      display: flex;
      flex-direction: column;
      gap: 20px;
      grid-column: 1 / -1;
      h3 {
        font-weight: 500;
        @include variables.font-size-title;
      }
      &__input {
        flex-grow: 1;
        height: 100%;
        width: fit-content;
      }
      &-form {
        display: flex;
        gap: 10px;
      }
    }
    h4 {
      color: variables.$color-neutral__greige;
      font-weight: 500;
      grid-column: 2;
      grid-row: 1;
      margin: 0;
      @include variables.font-size-label;
    }
    &-list {
      color: variables.$color-neutral__light;
      display: flex;
      flex-direction: column;
      font-weight: 600;
      gap: 6px;
      overflow-y: auto;
      @include scrollbar-standard;

      &-wrapper {
        display: flex;
        flex-direction: column;
        gap: 12px;
        grid-column: 1 / -1;
        grid-row: 2;
        height: 100%;
        overflow: auto;
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
    &__success {
      align-items: center;
      display: flex;
      flex-direction: column;
      gap: 30px;
      margin-top: auto;
      max-width: 80vw;
      text-align: center;
      p {
        @include variables.font-size-subtitle;
        span {
          color: variables.$color__yellow;
          font-style: italic;
        }
      }
      a {
        color: variables.$color__green;
        text-decoration: underline;
        transition: all 0.2s;
        @include variables.font-size-label;
        &:hover {
          color: variables.$color__green-light;
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
      z-index: 2;
      @include variables.font-size-label;
    }

    @media screen and (min-width: 768px) {
      padding-inline: variables.$padding-body;
      padding-bottom: variables.$padding-body;
    }
    @media screen and (min-width: 1024px) {
      gap: 60px;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
      padding: calc(#{variables.$padding-medium} + #{variables.$padding-body});
      padding-right: 0;
      width: 70vw;

      &-save {
        grid-column: 1;
        &__input {
          width: 80%;
        }
      }
      &-list {
        &-wrapper {
          grid-column: 2;
          grid-row: 1;
        }
      }
    }
  }
}
</style>
