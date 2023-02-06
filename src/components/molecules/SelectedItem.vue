<template>
  <div class="selected-items">
    <div
      class="selected-item"
      :class="{
        artist: item.type === 'artist',
        track: item.type === 'track',
        genre: item.type === 'genre'
      }"
    >
      {{ item.title }}
      <button @click="emits('removeItem')">X</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import type { PropType } from 'vue'
import type { LIST_ITEM } from '@/models/LIST_ITEM'

// Props
const props = defineProps({
  item: {
    type: Object as PropType<LIST_ITEM>,
    required: true
  }
})

// Emits
const emits = defineEmits<{
  (e: 'removeItem'): void
}>()

// Composables
const { item } = toRefs(props)
// Functions
// Watchers
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
.selected-item {
  border-radius: 8px;
  color: white;
  padding: variables.$padding-x-small;
  @media screen and (min-width: 769px) {
    padding: variables.$padding-small;
  }

  button {
    background-color: transparent;
    color: white;
    font-weight: 800;
    padding-left: 8px;
  }
}
.artist {
  background-color: variables.$color__blue;
}
.track {
  background-color: variables.$color__green-dark;
}
.genre {
  background-color: variables.$color__yellow;
}
</style>
