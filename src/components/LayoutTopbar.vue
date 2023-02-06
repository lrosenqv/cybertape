<template>
  <div class="topbar" :class="{ topbar__collapsed: collapsed }">
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
        <div class="topbar-mobile-user">
          <img :src="store.state.currentUserImg" />
          <div class="topbar-mobile-user__text">
            <a :href="store.state.currentUserLink">{{ currentUser }}</a>
            <button @click="logout">Log out</button>
          </div>
        </div>
      </template>
    </div>

    <!--  <nav class="topbar-nav" :class="{ 'topbar-nav__mobile': mobileView }">
      <RouterLink to="/discover" class="topbar-nav-link">Discover</RouterLink>
      <RouterLink to="/mixer" class="topbar-nav-link">Mixer</RouterLink>
    </nav>
    <div class="topbar-divider"></div>
    <div class="topbar-user">{{ currentUser }}</div> -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
import { useStore } from 'vuex'
import { logout } from '@/services/authorization'
const store = useStore()
const currentUser = computed(() => store.state.currentUser)
const collapsed = ref<boolean>(false)
const hideNav = ref<boolean>(false)

const burgerMenu = ref<HTMLDivElement>()
const menuOpen = ref<boolean>(false)

const app = document.body.querySelector('#app')

function toggleBurger() {
  burgerMenu.value?.toggleAttribute('active')
  menuOpen.value = !menuOpen.value
}
const props = defineProps({
  mobileView: {
    type: Boolean,
    required: true
  }
})
const { mobileView } = toRefs(props)

app?.addEventListener('scroll', () => {
  if (app.scrollTop > 80) {
    collapsed.value = true
    setTimeout(() => {
      hideNav.value = true
    }, 1200)
  } else {
    collapsed.value = false
    hideNav.value = false
  }
})

watch(
  mobileView,
  (newView) => {
    console.log(newView)
  },
  { immediate: true }
)
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
        width: 60%;
        @include variables.font-size-paragraph;
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

  // mobile
  &-mobile {
    &-wrapper {
      background-color: variables.$color-neutral__dark;
      border-radius: variables.$border-radius-small;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 240px;
      width: 180px;
      text-align: right;
      padding: 50px variables.$padding-large 0;
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
    }
    &-nav {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      a {
        color: variables.$color-neutral__light;
      }
    }
    &-user {
      border-top: 2px solid variables.$color-neutral__greige-dark;
      display: flex;
      gap: 15px;
      padding-top: variables.$padding-medium;
      &__text {
        display: flex;
        flex-direction: column;
        text-align: left;
        a {
          color: variables.$color-neutral__light;
          font-weight: 600;
        }
        button {
          background-color: transparent;
          color: variables.$color__yellow;
          @include variables.font-size-paragraph;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      img {
        border-radius: 50%;
        width: 50px;
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
        background-color: variables.$color-neutral__greige-dark;
        border-radius: variables.$border-radius-small;
        display: block;
        height: 3px;
        transition: background-color 0.5s ease-in-out;
        width: 100%;

        &::before,
        &::after {
          content: '';
          background-color: variables.$color-neutral__greige-dark;
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
