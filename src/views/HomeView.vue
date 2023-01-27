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
    <img class="arrow-icon" src="@/assets/Arrow.svg" />
  </header>

  <main class="home-main">
    <h2 class="home-main-title">About</h2>
    <p class="home-main-text">
      Getting tired of listening to the same old songs in your playlists? Does Spotify’s algorithms
      not quite work out the way you want? Is finding new music too time consuming?
    </p>

    <div class="home-main-infobox infobox-1">
      <h3>discover <span>categories</span></h3>
    </div>

    <div class="home-main-infobox infobox-2">
      <h3>browse <span>favorites</span></h3>
    </div>

    <div class="home-main-infobox infobox-3">
      <h3>create <span>mixes</span></h3>
    </div>
  </main>
</template>

<script setup lang="ts">
import DecorStripes from '@/components/DecorStripes.vue'
import CircleSubjective from '@/assets/CircleSubjective.vue'
import CircleBangers from '@/assets/CircleBangers.vue'
import CircleOnly from '@/assets/CircleOnly.vue'
import { getUserName, logout } from '@/services/authorization'
import { onMounted, onBeforeUpdate } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(() => {
  const accessToken = sessionStorage.getItem('access_token') || ''
  if (accessToken) getUserName(accessToken)
})

onBeforeUpdate(() => {
  const currentRoute = router.currentRoute
  console.log(currentRoute)
})
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

header {
  align-items: flex-end;
  justify-content: center;
  background-color: variables.$color-neutral__greige-light;
  background-image: url('@/assets/Background-Light.jpg');
  border-radius: 40px 40px 0 0;
  display: grid;
  grid-template-columns: variables.$grid-template-standard;
  grid-template-rows: 30% repeat(5, 1fr);
  height: 100vh;

  .arrow-icon {
    grid-column: 6 / 8;
    grid-row: 6;
    align-self: center;
    justify-self: center;
    margin-bottom: variables.$margin-x-large;
    position: relative;
    z-index: 3;
  }

  .circle {
    align-self: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    display: flex;
    justify-content: center;
    background-color: variables.$color-neutral__greige-light;
    background-image: url('@/assets/Background-Light.jpg');
    border-radius: 100%;
    grid-row: 2 / 5;
    position: relative;
    z-index: 2;

    &__left {
      grid-column: 3 / 5;
      width: 100%;
    }

    &__right {
      grid-column: 8 / 11;
      box-sizing: border-box;
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
  grid-template-rows: 20vh auto auto 1fr;
  height: 85vh;
  scroll-snap-align: start;

  &-title {
    grid-column: 3 / 5;
    grid-row: 2;
  }
  &-text {
    grid-column: 3/ 7;
    grid-row: 3;
    line-height: 161.8%;
  }
  &-infobox {
    display: flex;

    &.infobox-1 {
      grid-column: 8 / 11;
      grid-row: 2;
    }

    &.infobox-2 {
      grid-column: 9 / 12;
      grid-row: 3;
    }
    &.infobox-3 {
      grid-column: 8 / 11;
      grid-row: 4;
    }
  }
  h3 span {
    font-size: variables.$font-size-subtitle;
  }
}
</style>
