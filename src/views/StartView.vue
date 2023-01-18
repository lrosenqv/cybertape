<template>
  <div class="start">
    <div class="start-img"></div>
    <div class="start-text">Log in to your Spotify account to use the application</div>
    <button class="start-button" @click="authRequest">Log In</button>
  </div>
</template>

<script setup lang="ts">
import { authRequest, getAccessToken } from '@/services/authorization'
import { onBeforeMount } from 'vue'

const params = new URLSearchParams(window.location.search)
const codeQuery = params.get('code')

onBeforeMount(() => {
  if (codeQuery) {
    getAccessToken(codeQuery)
  }
})
</script>

<style lang="scss"></style>
