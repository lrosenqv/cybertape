<template>
  <div class="topbar" :class="{ topbar__shrinked: shrinked }">
    <RouterLink to="/" class="topbar-logo__link">
      <div class="topbar-logo">
        <div>Cyber</div>
        <div>Tape</div>
      </div>
    </RouterLink>

    <div v-if="mobileView" class="topbar-mobile-wrapper" :class="{ __collapsed: !menuOpen }">
      <div ref="burgerMenu" class="topbar-mobile-burger" @click="toggleBurger">
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
import { ref, computed } from 'vue'
import IconUser from '@/components/icons/IconUser.vue'
import UserCard from '@/components/atoms/UserCard.vue'
import { logout } from '@/services/authorization'
import { useStore } from 'vuex'
const store = useStore()

const shrinked = ref<boolean>(false)
const hideNav = ref<boolean>(false)
const burgerMenu = ref<HTMLDivElement>()
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
  if (app.scrollTop > 80) {
    shrinked.value = true
    setTimeout(() => {
      hideNav.value = true
    }, 1200)
  } else {
    shrinked.value = false
    hideNav.value = false
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
  grid-template-columns: variables.$grid-template-standard;
  padding: variables.$padding-x-large calc(2 * #{variables.$padding-x-large});
  position: fixed;
  width: 100vw;
  z-index: 999;
  @include variables.font-size-paragraph;

  &-logo {
    display: flex;
    flex-direction: column;
    transition: all 1s;
    width: 100px;

    &__link {
      grid-column: 1 / 5;
      position: relative;
    }
    div {
      line-height: 0.8;
      transition: all 0.8s;
      width: fit-content;
      @include variables.font-size-label;
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
    grid-column: 6 / 8;
    height: 100%;
    justify-content: space-between;
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
      @media screen and (min-width: 1024px) {
        grid-column: 11 / 13;
      }
    }
  }

  &__shrinked {
    .topbar-logo {
      width: 75px;
      &__link {
        grid-column: 1;
      }
      div {
        color: variables.$color-neutral__light;
        width: 60%;
        @include variables.font-size-paragraph;
      }
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
      height: 24px;
      position: absolute;
      top: 22px;
      right: 20px;
      width: 32px;
      z-index: 20;
      span {
        background-color: variables.$color-neutral__dark;
        background-blend-mode: difference;
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
          transform: translateY(-10px);
        }
        &::after {
          transform: translateY(10px);
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
