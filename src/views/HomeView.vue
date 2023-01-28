<template>
  <header class="home-header">
    <button class="logout-btn" @click="logout">Log Out</button>
    <div class="circle circle__left">
      <CircleSubjective class="circle-text" />
    </div>
    <div class="circle circle__right">
      <CircleBangers class="circle-text" />
      <CircleOnly class="circle-text circle-text__second" />
    </div>
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
        title="browse"
        subtitle="your favorites"
        text="Select a favorite track, album or artist as a starting point to find related music"
        :invert-style="true"
      />
      <FlipTile
        title="create"
        subtitle="a mixtape"
        text="Create a new mix of tracks based on your selections"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import DecorStripes from '@/components/DecorStripes.vue'
import CircleSubjective from '@/assets/CircleSubjective.vue'
import CircleBangers from '@/assets/CircleBangers.vue'
import CircleOnly from '@/assets/CircleOnly.vue'
import { logout } from '@/services/authorization'

import FlipTile from '@/components/FlipTile.vue'
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.home-header {
  align-items: flex-end;
  justify-content: center;
  background-color: variables.$color-neutral__greige-light;
  background-image: url('@/assets/Background-Light.jpg');
  border-radius: 40px 40px 0 0;
  display: grid;
  grid-template-columns: variables.$grid-template-standard;
  grid-template-rows: 30% repeat(5, 1fr);
  height: 100vh;

  &-scroll-mouse {
    align-self: center;
    border: 1px solid variables.$color-neutral__greige-light;
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

  .circle {
    align-self: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    background-color: variables.$color-neutral__greige-light;
    background-image: url('@/assets/Background-Light.jpg');
    border-radius: 100%;
    display: flex;
    grid-row: 2 / 5;
    justify-content: center;
    position: relative;
    z-index: 2;

    &__left {
      grid-column: 3 / 5;
      width: 100%;
    }

    &__right {
      grid-column: 8 / 11;
      box-sizing: border-box;
      justify-self: right;
      width: 85%;
    }

    &-text {
      border-radius: 100%;
      position: absolute;
      top: 0;

      &__second {
        top: 12%;
      }
    }
  }
  .stripes {
    grid-column: 1 / -1;
    grid-row: 3 / 7;
  }

  .logout-btn {
    grid-row: 2;
    // position: absolute;
  }
}

.home-main {
  background-color: variables.$color__blue;
  border-radius: variables.$border-radius-medium;
  box-shadow: variables.$shadow-1;
  display: grid;
  grid-template-columns: variables.$grid-template-standard;
  grid-template-rows: 15vh auto auto 1fr;
  height: 80vh;
  scroll-snap-align: start none;

  &-title {
    grid-column: 3 / 5;
    grid-row: 2;
  }
  &-text {
    grid-column: 3/ 7;
    grid-row: 3;
    line-height: 161.8%;
  }

  .flip-tile-container {
    display: flex;
    flex-direction: column;
    grid-column: 8 / 11;
    grid-row: 2 / 5;
    row-gap: 16px;

    .flip-tile:nth-child(1) {
      align-self: center;
      border-radius: 10px;
    }
    .flip-tile:nth-child(2) {
      align-self: flex-end;
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
