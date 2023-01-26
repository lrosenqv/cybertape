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

    <DecorStripes />
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import DecorStripes from '@/components/DecorStripes.vue'
import { logout } from '@/services/authorization'
</script>

<style lang="scss">
nav {
  position: absolute;
  top: 0;
  z-index: 999;
}
main {
  background-color: #ede8e3;
  height: 100vh;
  border-radius: 40px 40px 0 0;
}
</style>
