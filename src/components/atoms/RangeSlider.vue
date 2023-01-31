<template>
  <div class="slider-wrapper">
    <span class="slider-wrapper-line"></span>
    <input
      v-model="rangeValue"
      type="range"
      :id="title"
      min="0"
      max="1"
      step="0.01"
      class="slider"
      orient="vertical"
      @change="selectLimit"
    />
    <label :for="title">{{ title }}</label>
    <span class="slider-wrapper-line"></span>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'

const rangeValue = ref<number>(0)
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
const emits = defineEmits<{
  (e: 'rangeValue', value: number, title: string): void
}>()

const { title } = toRefs(props)

function selectLimit() {
  emits('rangeValue', rangeValue.value, title.value)
}
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.slider {
  appearance: none;
  background: #0f0f0f;
  border-radius: 4px;
  height: 13px;
  outline: none;
  position: relative;
  transform: rotate(270deg);
  z-index: 2;
  width: 215px;
  -moz-transform: rotate(270deg);

  &::-webkit-slider-thumb {
    appearance: none;
    background: variables.$color-neutral__greige-light;
    background-image: url('@/assets/Slider.svg');
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 4px;
    cursor: pointer;
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.29));
    height: 35px;
    transform: rotate(90deg);
    width: 45px;
    -webkit-appearance: none;
  }

  &::-moz-range-thumb {
    background: variables.$color-neutral__greige-light;
    border-radius: 4px;
    cursor: pointer;
    height: 35px;
    width: 45px;
  }

  &-wrapper {
    align-items: center;
    background-color: transparent;
    background: linear-gradient(
      270.57deg,
      rgba(54, 54, 54, 0.2475) -28.6%,
      rgba(29, 28, 28, 0.0726) -1.86%,
      rgba(11, 11, 11, 0.2904) 58.5%,
      rgba(27, 26, 26, 0.0726) 105.93%,
      rgba(29, 29, 29, 0.0726) 136.97%
    );
    border-radius: 7px;
    box-shadow: inset 0px 0px 5px 3px rgba(0, 0, 0, 0.26);
    display: flex;
    flex-direction: column;
    height: 225px;
    justify-content: center;
    margin-top: 30px;
    width: 50px;

    &-line {
      background-color: variables.$color-neutral__greige;
      height: 1px;
      position: absolute;
      width: 33%;
      z-index: 1;

      &:first-of-type {
        align-self: flex-start;
      }
      &:last-of-type {
        align-self: flex-end;
      }
    }

    label {
      color: variables.$color-neutral__greige-light;
      font-size: variables.$font-size-paragraph__small;
      position: absolute;
      top: -30px;
    }
  }
}
</style>
