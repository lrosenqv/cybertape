<template>
  <LayoutTopbar class="topbar" />
  <RouterView />
  <footer>
    <p>Front End Development degree project 2023 - <a href="#">lrosenqv</a></p>
    <a href="#">Github Repo</a>
  </footer>
</template>

<script setup lang="ts">
import LayoutTopbar from '@/components/LayoutTopbar.vue'
import { getUserName } from '@/services/authorization'
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

footer {
  display: flex;
  flex-direction: column;
  height: 15vh;
  padding: variables.$padding-medium variables.$padding-body;

  a {
    color: variables.$color__green-light;
    transition: color 0.5s;
    &:hover {
      color: variables.$color__green;
    }
  }
}
</style>
