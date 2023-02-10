<template>
  <LayoutTopbar />
  <RouterView />
  <footer>
    <p>Front End Development degree project 2023 - <a href="#">lrosenqv</a></p>
    <a href="#">Github Repo</a>
  </footer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { getUser } from '@/services/authorization'
import LayoutTopbar from '@/components/general/LayoutTopbar.vue'

const store = useStore()

onMounted(() => {
  const accessToken = sessionStorage.getItem('access_token') || ''
  if (accessToken) getUser(accessToken)
  if (window.innerWidth < 768) store.commit('setMobileView', true)
})
window.addEventListener('resize', () => {
  if (window.innerWidth < 768) store.commit('setMobileView', true)
  else store.commit('setMobileView', false)
})
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
footer {
  color: variables.$color-neutral__greige-light;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 30vh;
  padding: variables.$padding-body 48px;
  scroll-snap-align: center none;
  @include variables.font-size-paragraph;

  a {
    color: variables.$color__green-light;
    font-weight: 500;
  }
  @media screen and (min-width: 1024px) {
    height: 20vh;
  }
}
</style>
