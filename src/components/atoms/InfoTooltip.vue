<template>
  <div class="infobox" @click="onHover" @mouseenter="onHover" @mouseleave="onHover">
    <img src="@/assets/IconInfo.svg" alt="information icon" />
    <div v-if="showTooltip" class="infobox-text">
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})
const { text } = toRefs(props)
const showTooltip = ref<boolean>(false)

function onHover() {
  showTooltip.value = !showTooltip.value
}
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.infobox {
  cursor: pointer;
  height: 18px;
  width: 18px;

  &-text {
    background-color: variables.$color-neutral__light;
    border-radius: variables.$border-radius-small;
    position: absolute;
    left: -91px;
    top: 28px;
    width: 200px;
    z-index: 999;

    p {
      color: variables.$color-neutral__dark;
      font-weight: 400;
      padding: variables.$padding-medium;
      @include variables.font-size-paragraph__small;
      &::after {
        content: '';
        display: block;
        position: absolute;
        bottom: 100%;
        left: 50%;
        margin-left: -8px;
        border-width: 8px;
        border-style: solid;
        border-color: transparent transparent variables.$color-neutral__greige-light transparent;
      }
    }
  }
}
</style>
