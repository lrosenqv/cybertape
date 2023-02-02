<template>
  <div class="slider-range">
    <label :for="title">{{ title }}</label>
    <div class="slider-wrapper">
      <span class="slider-wrapper-line"></span>
      <input
        v-model="rangeSlider"
        type="range"
        :id="title"
        min="0"
        max="1"
        step="0.01"
        class="slider"
        @change="selectLimit"
      />
      <span class="slider-wrapper-line"></span>
    </div>
    <InfoTooltip v-if="description.length" :text="description" />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import InfoTooltip from '@/components/atoms/InfoTooltip.vue'

const rangeSlider = ref<number>(0)
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: ''
  }
})
const emits = defineEmits<{
  (e: 'rangeValue', value: number, title: string): void
}>()

const { title, description } = toRefs(props)

function selectLimit() {
  emits('rangeValue', rangeSlider.value, title.value)
}
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.slider {
  appearance: none;
  background: #0f0f0f;
  border-radius: 4px;
  height: 14px;
  outline: none;
  position: relative;
  transform: rotate(270deg);
  z-index: 2;
  width: 190px;
  -moz-transform: rotate(270deg);

  &::-webkit-slider-thumb {
    appearance: none;
    background: variables.$color-neutral__dark;
    background-image: url('@/assets/Slider.svg');
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 4px;
    cursor: pointer;
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.29));
    height: 35.5px;
    transform: rotate(90deg);
    width: 48px;
    -webkit-appearance: none;
  }

  &::-moz-range-thumb {
    background: variables.$color-neutral__greige-light;
    border-radius: 4px;
    cursor: pointer;
    height: 35.5px;
    width: 48px;
  }
  &-range {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: fit-content;
    position: relative;

    .infobox {
      right: -25px;
    }

    label {
      color: variables.$color-neutral__greige-light;
      font-size: variables.$font-size-paragraph__small;
    }
    img {
      position: absolute;
      right: -20px;
      bottom: 0;
    }
  }
  &-wrapper {
    @include variables.backdrop-gradient;
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 200px;
    justify-content: center;
    width: 60px;

    &-line {
      background-color: variables.$color-neutral__greige-light;
      height: 1.5px;
      position: absolute;
      width: 30%;
      z-index: 1;

      &:first-of-type {
        align-self: flex-start;
        margin-left: variables.$margin-x-small;
      }
      &:last-of-type {
        align-self: flex-end;
        margin-right: variables.$margin-x-small;
      }
    }
  }
}
</style>
