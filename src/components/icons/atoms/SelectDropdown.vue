<template>
  <div class="select">
    <select v-model="selectedOption">
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="(option, index) in options" :key="index" :value="option">{{ option }}</option>
    </select>
    <IconChevron class="select-arrow" />
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref, watch } from 'vue'
import IconChevron from '@/components/icons/IconChevron.vue'

const props = defineProps({
  options: {
    type: Array<String>,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  }
})
const emits = defineEmits<{
  (e: 'selectOption', option: string): void
}>()

const { options, placeholder } = toRefs(props)
const selectedOption = ref('')

watch(selectedOption, (newVal) => {
  emits('selectOption', newVal)
})
</script>

<style lang="scss">
@use '@/style/variables.scss';

.select {
  align-items: center;
  display: grid;
  grid-template-areas: 'select';
  height: 35px;
  width: 250px;
  padding: variables.$padding-small;

  &-arrow {
    justify-self: end;
    margin-right: variables.$margin-medium;
    position: relative;
  }
}
select,
.select-arrow {
  grid-area: select;
}
select {
  appearance: none;
  background-color: transparent;
  border-radius: variables.$border-radius-small;
  border: 1px solid variables.$color-neutral__light;
  color: variables.$color-neutral__light;
  cursor: pointer;
  font-size: variables.$font-size-paragraph;
  font-weight: 500;
  margin-left: variables.$margin-medium;
  outline: none;
  padding: variables.$padding-x-small variables.$padding-medium;
  position: relative;
  z-index: 1;
}
</style>
