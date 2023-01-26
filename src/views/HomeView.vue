<template>
  <header>
    <nav>
      <RouterLink to="/">CyberTape</RouterLink>
      <RouterLink to="/discover">Discover</RouterLink>
      <RouterLink to="/browse">Browse</RouterLink>
      <RouterLink to="/mixer">Mixer</RouterLink>
    </nav>
    <!-- <button @click="logout">Log Out</button> -->
  </header>
  <main>
    <RouterView />

    <div class="circle circle__left">
      <CircleSubjective class="circle-text" />
    </div>
    <div class="circle circle__right">
      <CircleBangers class="circle-text" />
      <CircleOnly class="circle-text circle-text__second" />
    </div>

    <img class="arrow-icon" src="@/assets/Arrow.svg" />
    <DecorStripes class="stripes" />
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import DecorStripes from '@/components/DecorStripes.vue'
import CircleSubjective from '@/assets/CircleSubjective.vue'
import CircleBangers from '@/assets/CircleBangers.vue'
import CircleOnly from '@/assets/CircleOnly.vue'
import { logout } from '@/services/authorization'
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

header {
  nav {
    position: absolute;
    top: 0;
    z-index: 999;
  }
}

main {
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
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: variables.$color-neutral__greige-light;
    background-image: url('@/assets/Background-Light.jpg');
    border-radius: 100%;
    grid-row: 2 / 4;
    max-height: 100%;
    padding-top: 100%;
    position: relative;
    z-index: 2;

    &__left {
      grid-column: 3 / 5;
      width: 100%;
    }

    &__right {
      grid-column: 8 / 11;
      box-sizing: border-box;
      padding-top: 85%;
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
}
</style>
