<template>
  <div class="tape-rack">
    <div
      v-for="item in list"
      :key="item.id"
      class="tape-rack-space"
      @click="emits('onClick', item)"
    >
      <AudioTape :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ICategoryItem } from '@/models/ICategory'
import type { PropType } from 'vue'
import { toRefs } from 'vue'
import AudioTape from './AudioTape.vue'

const props = defineProps({
  list: {
    type: Array as PropType<ICategoryItem[]>,
    required: true
  }
})
const emits = defineEmits<{
  (e: 'onClick', item: ICategoryItem): void
}>()
const { list } = toRefs(props)
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.tape-rack {
  background-color: rgb(220, 220, 214);
  border-radius: variables.$border-radius-medium;
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: repeat(16, 36px);
  gap: 12px;
  justify-content: center;
  padding-block: variables.$padding-x-large calc(2 * #{variables.$padding-x-large});
  padding-inline: 0 variables.$padding-large;
  transform: rotate(5deg) skew(-15deg, 10deg);

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 200px);
    grid-template-rows: repeat(12, 36px);
  }
}
</style>
