<template>
  <LayoutTopbar :mobile-view="mobileView" />
  <RouterView />
  <footer>
    <p>Front End Development degree project 2023 - <a href="#">lrosenqv</a></p>
    <a href="#">Github Repo</a>
  </footer>
</template>

<script setup lang="ts">
import LayoutTopbar from '@/components/LayoutTopbar.vue'
import { getUserName } from '@/services/authorization'
import { onMounted, onBeforeUpdate, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const mobileView = ref<boolean>(false)
onMounted(() => {
  const accessToken = sessionStorage.getItem('access_token') || ''
  if (accessToken) getUserName(accessToken)
  if (window.innerWidth <= 768) mobileView.value = true
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) mobileView.value = true
  })
})

onBeforeUpdate(() => {
  const currentRoute = router.currentRoute
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
    &:hover {
      color: variables.$color__green;
    }
  }
  p {
    @include variables.font-size-paragraph__small;
  }
}
</style>
