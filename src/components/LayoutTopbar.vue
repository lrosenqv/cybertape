<template>
  <div ref="topbar" class="topbar" :class="{ topbar__collapsed: collapsed }">
    <RouterLink to="/" class="topbar-logo__link">
      <div class="topbar-logo">
        <div>Cyber</div>
        <div>Tape</div>
      </div>
    </RouterLink>
    <nav ref="navlinks" class="topbar-nav">
      <RouterLink to="/discover" class="topbar-nav-link">Discover</RouterLink>
      <RouterLink to="/browse" class="topbar-nav-link">Browse</RouterLink>
      <RouterLink to="/mixer" class="topbar-nav-link">Mixer</RouterLink>
    </nav>
    <div class="topbar-divider"></div>
    <div class="topbar-user">{{ currentUser }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const currentUser = computed(() => store.state.currentUser)
const collapsed = ref<boolean>(false)
const hideNav = ref<boolean>(false)
const currentScrollTop = ref<Number>(0)

const topbar = ref<HTMLDivElement>()
const navlinks = ref<HTMLElement>()

const app = document.body.querySelector('#app')

app?.addEventListener('scroll', () => {
  if (app.scrollTop > 80) {
    collapsed.value = true
    setTimeout(() => {
      hideNav.value = true
    }, 1200)
  } else {
    collapsed.value = false
    hideNav.value = false
    /* setTimeout(() => {
      hideNav.value = false
    }, 1200) */
  }
})
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
.topbar {
  align-content: center;
  align-items: center;
  color: variables.$color-neutral__dark;
  display: grid;
  font-size: variables.$font-size-paragraph;
  grid-template-columns: variables.$grid-template-standard;
  padding: variables.$padding-x-large calc(2 * #{variables.$padding-x-large});
  position: fixed;
  width: 100vw;
  z-index: 999;

  &-logo {
    display: flex;
    flex-direction: column;
    transition: all 1s;
    width: 100px;

    &__link {
      grid-column: 1 / 5;
      position: relative;

      &::after {
        background-color: variables.$color-neutral__greige-dark;
        content: '';
        display: inline-block;
        height: 2px;
        top: 50%;
        position: absolute;
        transition: all 1s;
        width: 100%;
      }
    }

    div {
      font-size: 31px;
      line-height: 0.8;
      transition: all 0.8s;
      width: fit-content;
    }

    div:nth-child(2) {
      align-self: flex-end;
      position: relative;
    }
  }
  &-nav {
    align-items: center;
    color: transparent;
    display: flex;
    grid-column: 5 / 9;
    text-align: center;
    top: 0;
    transition: all 0.8s;

    &-link {
      width: 100%;
      text-align: center;
      transition: all 0.8s;
    }

    a:not(:last-of-type) {
      border-right: 2px solid variables.$color-neutral__greige-dark;
    }
  }

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
      right: 0;
      position: absolute;
      top: 50%;
      transition: all 1.2s;
      width: 100%;
    }
  }

  &__collapsed {
    .topbar-logo {
      width: 75px;
      &__link {
        grid-column: 1;

        &::after {
          background-color: white;
          width: 0;
        }
      }
      div {
        color: white;
        font-size: 25px;
        width: 60%;
      }
    }
    .topbar-nav {
      top: -80px;
    }
    .topbar-nav-link {
      color: transparent;
      &:not(:last-of-type) {
        border-color: transparent;
      }
    }
    .topbar-user {
      color: white;
      grid-column: 12;
      transition: all 1.2s;

      &::before {
        background-color: white;
        right: 0;
        width: 0;
      }
    }
  }
}
</style>
