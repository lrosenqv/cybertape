<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/discover">Discover</RouterLink>
      <RouterLink to="/mixer">Mixer</RouterLink>
    </nav>
    <button @click="logout">Log Out</button>
  </header>
  <main>
    <RouterView />
  </main>
  <footer></footer>
</template>

<script setup lang="ts">
import { logout } from '@/services/authorization'
</script>

<style lang="ts"></style>
