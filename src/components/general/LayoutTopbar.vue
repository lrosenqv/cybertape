<template>
  <div class="topbar" :class="{ topbar__shrinked: shrinked }">
    <RouterLink to="/" class="topbar-logo">
      <LogoDark />
    </RouterLink>

    <div
      v-if="mobileView"
      ref="menu"
      class="topbar-mobile-wrapper"
      :class="{ __collapsed: !menuOpen }"
    >
      <div ref="burgerMenu" class="topbar-mobile-burger" @click.stop="toggleBurger">
        <span></span>
      </div>
      <template v-if="menuOpen">
        <nav class="topbar-mobile-nav">
          <RouterLink to="/discover" class="topbar-mobile-burger-nav-link">Discover</RouterLink>
          <RouterLink to="/mixer" class="topbar-mobile-burger-nav-link">Mixer</RouterLink>
        </nav>
        <UserCard @logout="logout" />
      </template>
    </div>

    <template v-else>
      <nav class="topbar-nav" :class="{ 'topbar-nav__mobile': mobileView }">
        <RouterLink to="/discover" class="topbar-nav-link">Discover</RouterLink>
        <span class="divider"></span>
        <RouterLink to="/mixer" class="topbar-nav-link">Mixer</RouterLink>
      </nav>
      <button class="topbar-user-btn" @click.stop="toggleUserCard"><IconUser /></button>
      <UserCard
        v-if="showUserCard"
        class="topbar-user-card"
        @close-card="toggleUserCard"
        @logout="logout"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import IconUser from '@/components/icons/IconUser.vue'
import UserCard from '@/components/general/UserCard.vue'
import LogoDark from '@/components/icons/LogoDark.vue'
import { logout } from '@/services/authorization'
import { useStore } from 'vuex'
const store = useStore()

const shrinked = ref<boolean>(false)
const hideNav = ref<boolean>(false)
const burgerMenu = ref<HTMLDivElement>()
const menu = ref<HTMLDivElement>()
const menuOpen = ref<boolean>(false)
const showUserCard = ref<boolean>(false)
const mobileView = computed(() => store.state.mobileView)
const app = document.body.querySelector('#app')

function toggleBurger() {
  burgerMenu.value?.toggleAttribute('active')
  menuOpen.value = !menuOpen.value
}
function toggleUserCard() {
  showUserCard.value = !showUserCard.value
}
app?.addEventListener('scroll', () => {
  if (app.scrollTop > 0) {
    shrinked.value = true
    setTimeout(() => {
      hideNav.value = true
    }, 1200)
  } else {
    shrinked.value = false
    hideNav.value = false
  }
})
watch(menuOpen, (isOpen) => {
  if (isOpen)
    document.body.addEventListener(
      'click',
      (e) => {
        if (e.target !== menu.value) toggleBurger()
      },
      { once: true }
    )
})
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.topbar {
  align-items: center;
  color: variables.$color-neutral__dark;
  display: grid;
  grid-template-columns: variables.$grid-template-standard;
  grid-template-rows: 40px auto;
  padding: variables.$padding-large variables.$padding-large 0;

  position: fixed;
  width: 100vw;
  z-index: 1;
  @include variables.font-size-paragraph;

  &-logo {
    align-self: flex-start;
    color: variables.$color-neutral__dark;
    grid-column-start: 1;
    height: 100%;
    width: 60px;
    position: relative;

    transition: all 0.8s;
    &:hover {
      color: white;
      transform: scale(1.1, 1.1);
    }
  }
  @media screen and (min-width: 768px) {
    grid-template-rows: 60px auto;
    padding: variables.$padding-x-large variables.$padding-body 0;
  }
  @media screen and (min-width: 1024px) {
    grid-template-rows: 80px auto;
    padding-inline: calc(2 * #{variables.$padding-body});
    &-logo {
      grid-column: 1;
    }
  }
  &-nav {
    align-items: center;
    color: transparent;
    display: flex;
    grid-column: 5 / 9;
    height: 100%;
    justify-content: space-around;
    text-align: center;
    top: 0;
    transition: all 0.6s;
    &-link {
      font-weight: 700;
      text-align: center;
      transition: all 0.6s;
    }
    .divider {
      background-color: variables.$color-neutral__dark;
      display: inline-block;
      height: 50%;
      width: 2px;
    }
  }
  &-user {
    &__collapsed {
      background-color: transparent;
      width: fit-content;
    }
    &-btn {
      background-color: transparent;
      color: variables.$color-neutral__dark;
      grid-column: 12;
      height: 60px;
      justify-self: flex-end;
      transition: all 0.3s;
      width: 60px;

      &:hover {
        color: white;
        transform: scale(1.1, 1.1);
      }
    }
    &-card {
      grid-column: 8 / 13;
      justify-self: flex-end;
    }
  }

  &__shrinked {
    .topbar-logo {
      color: white;
      transform: scale(0.9, 0.9);
    }
    .topbar-mobile-wrapper span {
      background-color: variables.$color-neutral__light;
      &::after,
      &::before {
        background-color: variables.$color-neutral__light;
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
    .topbar-user-btn {
      color: variables.$color-neutral__light;
    }
  }

  // mobile
  &-mobile {
    &-wrapper {
      background-color: variables.$color-neutral__dark;
      border-radius: variables.$border-radius-small;
      display: flex;
      flex-direction: column;
      height: 290px;
      width: 250px;
      text-align: right;
      padding: 70px variables.$padding-large variables.$padding-large;
      position: absolute;
      top: 14px;
      transition: all 0.4s;
      right: 24px;
      @include variables.font-size-label;
      &.__collapsed {
        background-color: transparent;
        padding: 0;
        height: fit-content;
        width: fit-content;
        transition: all 0.4s;
      }
      .user-card {
        margin-top: auto;
      }
    }
    &-nav {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 15px;
      a {
        color: variables.$color-neutral__light;
      }
    }
    &-burger {
      align-self: flex-start;
      cursor: pointer;
      position: absolute;
      top: 22px;
      right: 6px;
      width: 35px;
      z-index: 20;
      span {
        background-color: variables.$color-neutral__dark;
        border-radius: variables.$border-radius-small;
        display: block;
        height: 3px;
        transition: background-color 0.5s ease-in-out;
        width: 100%;

        &::before,
        &::after {
          content: '';
          background-color: variables.$color-neutral__dark;
          border-radius: variables.$border-radius-small;
          display: block;
          height: 3px;
          transition: all 0.5s ease-in-out;
          width: 100%;
        }
        &::before {
          transform: translateY(-12px);
        }
        &::after {
          transform: translateY(12px);
          margin-top: -3px;
        }
      }
      &[active] {
        span {
          background-color: transparent;
          &::before {
            background-color: variables.$color-neutral__greige-light;
            transform: rotateZ(45deg) translateY(0);
          }
          &::after {
            background-color: variables.$color-neutral__greige-light;
            transform: rotateZ(-45deg) translateY(0);
          }
        }
      }
    }
  }
}
</style>
