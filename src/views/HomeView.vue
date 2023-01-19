<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/discover">Discover</RouterLink>
      <RouterLink to="/browse">Browse</RouterLink>
      <RouterLink to="/mixer">Mixer</RouterLink>
    </nav>
    <button @click="logout">Log Out</button>
  </header>
  <main>
    <button @click="refreshToken">Refresh</button>
    <RouterView />
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import { logout, refreshToken } from '@/services/authorization'
</script>

<style lang="ts"></style>
