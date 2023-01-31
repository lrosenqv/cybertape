<template>
  <div class="toggle-wrapper">
    <div class="toggle-indicator">
      <div class="toggle-indicator__numbers">
        <span>10</span>
        <span>15</span>
        <span>20</span>
      </div>
      <div class="toggle-indicator__graphics">
        <svg viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="8" r="1" fill="white" />
          <circle cx="50" cy="8" r="1" fill="white" />
          <circle cx="65" cy="8" r="1" fill="white" />
          <g stroke="white" stroke-width="1">
            <line x1="18.5" x2="18.5" y1="2" y2="8" />
            <line x1="18" x2="30" y1="8" y2="8" />
            <line x1="70" x2="82" y1="8" y2="8" />
            <line x1="81.5" x2="81.5" y1="2" y2="8" />
          </g>
        </svg>
      </div>
    </div>
    <input
      class="toggle"
      v-model="toggleSlider"
      type="range"
      min="10"
      max="20"
      step="5"
      @change="toggleSelection"
    />
    <label>Nmbr of tracks</label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits<{
  (e: 'toggleValue', value: number): void
}>()
const toggleSlider = ref<number>(10)

function toggleSelection() {
  emits('toggleValue', toggleSlider.value)
}
</script>
<style lang="scss" scoped>
@use '@/style/variables.scss';

.toggle {
  appearance: none;
  background: #0f0f0f;
  border-radius: 4px;
  height: 33px;
  outline: none;
  position: relative;
  z-index: 2;
  padding-inline: 6px;
  width: 75px;

  &::-webkit-slider-thumb {
    appearance: none;
    background: variables.$color-neutral__greige-light;
    background-image: url('@/assets/Slider.svg');
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 4px;
    cursor: pointer;
    filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.29));
    height: 35px;
    width: 29px;
    transform: rotate(90deg);
    -webkit-appearance: none;
  }

  &::-moz-range-thumb {
    background: variables.$color-neutral__greige-light;
    border-radius: 4px;
    cursor: pointer;
    height: 35px;
    width: 27px;
  }

  &-indicator {
    height: 40%;
    width: 100%;
    &__numbers {
      display: flex;
      font-size: variables.$font-size-caption;
      height: 50%;
      justify-content: space-around;
      margin: 0 auto;
      width: 95%;
    }
    &__graphics {
      height: 50%;
      width: 100%;
    }
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
    height: 70px;
    justify-content: center;
    margin-top: 30px;
    width: 120px;
  }
}
label {
  color: variables.$color-neutral__greige-light;
  font-size: variables.$font-size-paragraph__small;
  position: absolute;
  top: -25px;
}
</style>
