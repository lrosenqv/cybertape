<template>
  <div class="vue-component">
    <button @click="handleClick">Close</button>
    <div v-for="track in tracks" :key="track.id">
      {{ track.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITrack } from '../../models/ITrack'
import { toRefs } from 'vue'

const props = defineProps({
  tracks: {
    type: Array<ITrack>,
    required: true
  }
})
const { tracks } = toRefs(props)
const emits = defineEmits<{
  (e: 'closeComponent'): void
}>()

function handleClick() {
  emits('closeComponent')
}
</script>
<style lang="scss" scoped>
.vue-component {
  background-color: blue;
}
</style>
