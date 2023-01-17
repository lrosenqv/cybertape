<template>
  <div></div>
</template>

<script lang="ts" setup>
import { exchangeToken } from '@/services/authorization'
import { onBeforeMount } from 'vue'
const params = new URLSearchParams(window.location.search)
const codeQuery = params.get('code')
onBeforeMount(() => {
  if (codeQuery) {
    exchangeToken(codeQuery)
  }
})
</script>
