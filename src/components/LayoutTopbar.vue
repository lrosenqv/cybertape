<template>
  <div class="topbar">
    <RouterLink to="/" class="topbar-logo__link">
      <div class="topbar-logo">
        <div>Cyber</div>
        <div>Tape</div>
      </div>
    </RouterLink>
    <nav class="topbar-nav">
      <RouterLink to="/discover">Discover</RouterLink>
      <RouterLink to="/browse">Browse</RouterLink>
      <RouterLink to="/mixer">Mixer</RouterLink>
    </nav>
    <div class="topbar-divider"></div>
    <div class="topbar-user">{{ currentUser }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const currentUser = computed(() => store.state.currentUser)
</script>
<style lang="scss" scoped>
@use '@/style/variables.scss';
.topbar {
  align-content: center;
  align-items: center;
  color: variables.$color-neutral__dark;
  display: grid;
  font-size: variables.$font-size-paragraph;
  // gap: 20px;
  grid-template-columns: variables.$grid-template-standard;
  padding: variables.$padding-x-large calc(2 * #{variables.$padding-x-large});
  position: fixed;
  width: 100vw;
  z-index: 999;

  &-logo {
    &__link {
      grid-column: 1 / 5;
      position: relative;
    }

    div {
      font-size: 31px;
      line-height: 0.7;
    }

    div:nth-child(2) {
      left: 33px;
      position: relative;
    }

    &::after {
      background-color: variables.$color-neutral__greige-dark;
      content: '';
      display: inline-block;
      height: 2px;
      top: 50%;
      position: absolute;
      width: 100%;
    }
  }
  &-nav {
    align-items: center;
    display: flex;
    grid-column: 5 / 9;
    text-align: center;

    a {
      width: 100%;
      text-align: center;
    }

    a:not(:last-of-type) {
      border-right: 2px solid variables.$color-neutral__greige-dark;
    }
  }

  /* &-divider {
    background-color: variables.$color-neutral__greige-dark;
    content: '';
    display: inline-block;
    height: 2px;
    grid-column: 9 / 12;
  } */

  &-user {
    align-self: stretch;
    cursor: pointer;
    grid-column: 9 / 13;
    grid-row: 1;
    line-height: 1;
    margin-right: 12px;
    text-align: end;

    &:hover {
      color: variables.$color__blue;
    }

    &::before {
      background-color: variables.$color-neutral__greige-dark;
      content: '';
      display: inline-block;
      height: 2px;
      left: 0;
      position: absolute;
      top: 50%;
      width: 100%;
    }
  }
}
</style>
