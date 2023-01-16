<template>
  <div class="start">
    <div class="start-img"></div>
    <div class="start-text">Log in to your Spotify account to use the application</div>
    <button class="start-button" @click="authRequest">Log In</button>
  </div>
</template>

<script setup lang="ts">
import { authRequest } from '@/services/authorization'
</script>

<style lang="scss"></style>
