<template>
  <div class="top">
    <LayoutTopbar />
  </div>
  <RouterView />
  <footer>
    <p>Front End Development degree project 2023 - <a href="#">lrosenqv</a></p>
    <a href="#">Github Repo</a>
  </footer>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { getUserName } from '@/services/authorization'
import LayoutTopbar from '@/components/LayoutTopbar.vue'

const store = useStore()

onMounted(() => {
  const accessToken = sessionStorage.getItem('access_token') || ''
  if (accessToken) getUserName(accessToken)
  if (window.innerWidth <= 768) store.commit('setMobileView', true)
})
window.addEventListener('resize', () => {
  if (window.innerWidth <= 768) store.commit('setMobileView', true)
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
  height: 20vh;
  padding: variables.$padding-body 48px;

  a {
    color: variables.$color__green-light;
    transition: color 0.5s;
    font-weight: 500;
    &:hover {
      color: variables.$color__green;
    }
  }
  p {
    @include variables.font-size-paragraph__small;
  }
}
</style>
