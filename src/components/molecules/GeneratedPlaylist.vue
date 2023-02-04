<template>
  <div class="overlay-modal">
    <div class="vue-component">
      <button @click="handleClick">Close</button>
      <div v-for="track in tracks" :key="track.id">
        {{ track.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITrack } from '@/models/ITrack'
import type { PropType } from 'vue'
import { toRefs } from 'vue'

const props = defineProps({
  tracks: {
    type: Array as PropType<ITrack[]>,
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
.overlay-modal {
  background-color: rgb(15, 15, 15);
  position: fixed;
  top: 0;
  left: 0;
}
</style>
