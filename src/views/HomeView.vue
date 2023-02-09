<template>
  <header class="home-header">
    <template v-if="!mobileView">
      <div class="circle circle__left">
        <DecorCircle class="circle-text" text="subjective - subjective - subjective - " />
      </div>
      <div class="circle circle__right">
        <DecorCircle class="circle-text" text="bangers - bangers - bangers - bangers - " />
        <DecorCircle class="circle-text" text="only - only - only - only - only - " />
      </div>
    </template>
    <template v-else>
      <h1>subjective. bangers. only.</h1>
    </template>
    <DecorStripes class="home-header-stripes" />
    <DecorMouse class="home-header-mouse" />
  </header>

  <main class="home-main">
    <h2 class="home-main-title">About</h2>
    <p class="home-main-text">
      Getting tired of listening to the same old songs in your playlists? Does Spotify's algorithms
      not quite work out the way you want? Is finding new music too time consuming?
    </p>
    <section class="flip-tile-container">
      <FlipTile
        title="discover"
        subtitle="new categories"
        text="Create a playlist by selecting one of the pre-defined categories"
      />
      <FlipTile
        title="create"
        subtitle="a mixtape"
        text="Create a new mix of tracks based on your selections"
        :invert-style="true"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import DecorCircle from '@/components/general/DecorCircle.vue'
import DecorMouse from '@/components/general/DecorMouse.vue'
import DecorStripes from '@/components/general/DecorStripes.vue'

import FlipTile from '@/components/general/FlipTile.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const mobileView = computed(() => store.state.mobileView)
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
.home-header {
  align-items: flex-end;
  background-color: variables.$color-neutral__greige-light;
  background-image: url('@/assets/TextureLight.jpg');
  border-radius: variables.$border-radius-large variables.$border-radius-large 0 0;
  display: grid;
  grid-template-columns: variables.$grid-template-standard;
  grid-template-rows: variables.$grid-rows-template-standard;
  height: 100vh;
  overflow: hidden;
  justify-content: center;
  scroll-snap-align: start none;
  h1 {
    bottom: -24px;
    color: variables.$color-neutral__dark;
    font-weight: 600;
    grid-column: 1 / -1;
    display: inline-block;
    grid-row: 2 / 4;
    margin: 0;
    z-index: 1;
  }
  &-stripes {
    grid-column: 1 / -1;
    grid-row: 4 / 7;
    height: 100%;
  }
  &-mouse {
    align-self: center;
    grid-column: 6 / 8;
    grid-row: 6;
    justify-self: center;
  }
  @media screen and (min-width: 768px) {
    .circle {
      align-self: center;
      aspect-ratio: 1 / 1;
      background: inherit;
      border-radius: 100%;
      display: flex;
      grid-row: 2 / 5;
      justify-content: center;
      z-index: 2;
      svg {
        position: absolute;
        zoom: 1.005;
        @include variables.font-size-paragraph__small;
      }
      &__left {
        grid-column: 2 / 5;
        > svg {
          width: 95%;
          animation: rotate 20s normal linear infinite;
        }
      }
      &__right {
        grid-column: 8 / 12;
        > svg:nth-child(1) {
          animation: rotate 30s normal linear infinite;
          width: 95%;
        }
        > svg:nth-child(2) {
          animation: rotate 22s reverse linear infinite;
          width: 60%;
        }
      }
    }
    &-stripes {
      grid-row: 3 / 7;
      height: 90%;
    }
  }
}
.home-main {
  background: url('@/assets/TextureLight.jpg'), darken(variables.$color__blue, 5%);
  background-blend-mode: soft-light;
  border-radius: variables.$border-radius-medium;
  box-shadow: variables.$shadow-1;
  display: grid;
  grid-template-columns: variables.$grid-template-standard;
  grid-template-rows: variables.$grid-rows-template-tablet;
  padding: 0 variables.$padding-body variables.$padding-body;
  height: 80vh;
  scroll-snap-align: start none;

  &-title {
    grid-column: 1 / -1;
    grid-row: 2;
  }
  &-text {
    grid-column: 1/ -1;
    grid-row: 3 / 4;
  }
  .flip-tile {
    &-container {
      display: flex;
      flex-direction: column;
      grid-column: 2 / 12;
      grid-row: 4 / 8;
      padding-top: variables.$padding-large;
      row-gap: 20px;
    }
    &:nth-child(1) {
      align-self: flex-end;
    }
    &:nth-child(2) {
      align-self: flex-start;
    }
  }
  @media screen and (min-width: 768px) {
    grid-template-rows: variables.$grid-rows-template-standard;
    &-title {
      grid-column: 2 / 6;
      grid-row: 2 / 3;
    }
    &-text {
      grid-column: 2/ 12;
      grid-row: 3 / 4;
    }
    .flip-tile {
      &-container {
        grid-column: 1 / -1;
        grid-row: 4 / 7;
        flex-direction: row;
        justify-content: space-around;
      }
    }
  }
  @media screen and (min-width: 1024px) {
    &-text {
      grid-column: 2/ 7;
      grid-row: 3 / 5;
    }
    .flip-tile {
      &-container {
        flex-direction: column;
        grid-column: 7 / 12;
        grid-row: 2 / 7;
      }
    }
  }
}
</style>
