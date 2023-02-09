<template>
  <header class="home-header">
    <template v-if="!mobileView">
      <div class="circle circle__left">
        <CircleSubjective class="circle-text" />
      </div>
      <div class="circle circle__right">
        <CircleBangers class="circle-text" />
        <CircleOnly class="circle-text circle-text__second" />
      </div>
    </template>

    <template v-else>
      <h1>subjective. bangers. only.</h1>
    </template>
    <img src="@/assets/Arrow.svg" />
    <DecorStripes class="stripes" />
    <div class="home-header-scroll-mouse">
      <div class="home-header-scroll-mouse__wheel"></div>
    </div>
  </header>

  <main class="home-main">
    <h2 class="home-main-title">About</h2>
    <p class="home-main-text">
      Getting tired of listening to the same old songs in your playlists? Does Spotify’s algorithms
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
import DecorStripes from '@/components/DecorStripes.vue'
import CircleSubjective from '@/components/CircleSubjective.vue'
import CircleBangers from '@/components/CircleBangers.vue'
import CircleOnly from '@/components/CircleOnly.vue'
import FlipTile from '@/components/FlipTile.vue'
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
  border-radius: 40px 40px 0 0;
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
    flex-shrink: 1;
  }

  &-scroll-mouse {
    align-self: center;
    border: 1px solid white;
    border-radius: 10px;
    justify-self: center;
    width: 20px;
    height: 40px;
    grid-column: 6 / 8;
    grid-row: 6;
    &__wheel {
      animation: elasticus 2s cubic-bezier(0.6, 0.02, 1, 0.8) infinite;
      background-color: variables.$color-neutral__greige-light;
      border-radius: 10px;
      height: 8px;
      margin: 4px auto;
      position: relative;
      top: 0;
      width: 8px;
    }
  }
  .stripes {
    grid-column: 1 / -1;
    grid-row: 4 / 7;
    height: 100%;
  }

  @media screen and (min-width: 768px) {
    .circle {
      align-self: center;
      align-items: center;
      aspect-ratio: 1 / 1;
      background-color: variables.$color-neutral__greige-light;
      background-image: url('@/assets/TextureLight.jpg');
      border-radius: 100%;
      display: flex;
      grid-row: 2 / 5;
      justify-content: center;
      position: relative;
      z-index: 2;
      svg {
        position: absolute;
        zoom: 1.005;
      }
      &__left {
        justify-self: flex-end;
        grid-column: 2 / 5;
        width: 100%;
        > svg {
          animation: rotate 20s normal linear infinite;
        }
      }
      &__right {
        align-items: center;
        display: flex;
        grid-column: 8 / 12;
        justify-self: left;
        justify-items: center;
        width: 100%;
        > svg:nth-child(1) {
          animation: rotate 30s normal linear infinite;
        }
        > svg:nth-child(2) {
          animation: rotate 22s reverse linear infinite;
          width: 65%;
        }
      }
    }
    .stripes {
      grid-row: 3 / 7;
      height: 90%;
    }
    &-scroll-mouse {
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
  padding-inline: variables.$padding-body;
  height: 80vh;
  scroll-snap-align: start none;

  &-title {
    grid-column: 2 / 6;
    grid-row: 2 / 4;
  }
  &-text {
    grid-column: 2/ 12;
    grid-row: 3 / 4;
    line-height: 161.8%;
  }
  .flip-tile-container {
    display: flex;
    flex-direction: column;
    grid-column: 2 / 12;
    grid-row: 4 / 7;
    justify-content: flex-end;
    padding-top: variables.$padding-large;
    row-gap: 20px;

    .flip-tile:nth-child(1) {
      align-self: flex-end;
    }
    .flip-tile:nth-child(2) {
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
      grid-column: 2/ 7;
      grid-row: 3 / 4;
      line-height: 161.8%;
    }
    .flip-tile-container {
      grid-column: 8 / 12;
      grid-row: 3 / 6;
      justify-content: unset;
      row-gap: 50px;

      .flip-tile:nth-child(1) {
        align-self: flex-start;
      }
      .flip-tile:nth-child(2) {
        align-self: flex-end;
      }
    }
  }
  @media screen and (min-width: 1024px) {
    .flip-tile-container {
      grid-column: 8 / 12;
      grid-row: 2 / 6;

      .flip-tile:nth-child(1) {
        align-self: flex-end;
      }
      .flip-tile:nth-child(2) {
        align-self: flex-start;
      }
    }
  }
}

@keyframes elasticus {
  0% {
    opacity: 0;
    top: 0;
  }
  40% {
    opacity: 1;
    height: 18px;
    top: 24%;
  }
  50% {
    height: 8px;
    top: 50%;
  }
  70% {
    opacity: 0;
    top: 50%;
  }
  100% {
    opacity: 0;
    top: 0%;
  }
}
</style>
