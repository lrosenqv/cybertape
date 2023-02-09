<template>
  <div class="slider-range">
    <label :for="title">{{ title.replace('target_', '') }}</label>
    <div class="slider-wrapper">
      <span class="slider-wrapper-line"></span>
      <input
        :value="modelValue"
        type="range"
        :id="title"
        min="0"
        max="1"
        step="0.01"
        class="slider"
        @change="(e) => selectLimit(e)"
      />
      <span class="slider-wrapper-line"></span>
    </div>
    <InfoTooltip v-if="description.length" :text="description" />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import InfoTooltip from '@/components/general/InfoTooltip.vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
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
  (e: 'update:modelValue', value: string): void
}>()

const { title, description, modelValue } = toRefs(props)

function selectLimit(e: Event) {
  const range = e.target as HTMLInputElement
  const rangeValue = range.valueAsNumber.toPrecision(1)
  emits('update:modelValue', rangeValue)
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
  width: 160px;
  -moz-transform: rotate(270deg);

  &::-webkit-slider-thumb {
    appearance: none;
    background: variables.$color-neutral__dark;
    background-image: url('@/assets/SliderPusher.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 4px;
    cursor: pointer;
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.29));
    height: 43px;
    transform: rotate(90deg);
    width: 65px;
    -webkit-appearance: none;
  }
  &-range {
    column-gap: 5px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    height: fit-content;
    row-gap: 10px;
    touch-action: none;
    width: 120px;
    .infobox {
      align-self: flex-end;
      grid-column: 3;
      grid-row: 2;
    }
    label {
      color: variables.$color-neutral__greige-light;
      grid-row: 1;
      grid-column: 1 / 3;
      justify-self: center;
      text-transform: capitalize;
      @include variables.font-size-paragraph__small;
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
    grid-column: 2;
    grid-row: 2;
    height: 170px;
    justify-content: center;
    justify-self: center;
    width: 75px;
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
  @media screen and (min-width: 769px) {
    &-range {
      row-gap: 5px;
    }
    width: 165px;
    &::-webkit-slider-thumb {
      height: 45px;
      width: 49;
    }
    &-wrapper {
      height: 175px;
      width: 60px;
    }
  }
  /*   &::-moz-range-thumb {
    background: variables.$color-neutral__greige-light;
    border-radius: 4px;
    cursor: pointer;
    height: 35.5px;
    width: 48px;
  } */
}
</style>
