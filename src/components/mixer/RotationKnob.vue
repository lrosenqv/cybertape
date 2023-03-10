<template>
  <div class="rotation-knob">
    <label>{{ label }}</label>
    <div class="knob-wrapper">
      <div
        ref="knob"
        class="knob"
        @mousedown="drag_start"
        @mouseup="drag_end"
        @touchstart.prevent="drag_start"
        @touchend="drag_end"
      >
        <KnobSVG />
      </div>
    </div>
    <InfoTooltip v-if="description.length" :text="description" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from 'vue'
import KnobSVG from '@/components/mixer/KnobSVG.vue'
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
  label: {
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

const knob = ref<HTMLElement>()
const current_rotation = ref<string>('')
const dragging_knob = ref<boolean>(false)
const { label, description } = toRefs(props)

function drag_start() {
  dragging_knob.value = true
  if (knob.value) knob.value.style.cursor = 'grabbing'
}
function drag_end() {
  dragging_knob.value = false
  if (knob.value) knob.value.style.cursor = 'grab'
}
function drag_rotate(e: MouseEvent | TouchEvent) {
  const rect = knob.value?.getBoundingClientRect()
  if (rect) {
    let mouseX: number = rect.left + rect.width / 2
    let mouseY: number = rect.top + rect.height / 2

    let radianDegrees: number = 0
    if (window.TouchEvent && e instanceof TouchEvent) {
      radianDegrees = Math.atan2(e.touches[0].pageY - mouseY, e.touches[0].pageX - mouseX)
    } else if (e instanceof MouseEvent)
      radianDegrees = Math.atan2(e.pageY - mouseY, e.pageX - mouseX)
    let rotation = radianDegrees * (180 / Math.PI) + 90
    const knobEl = knob.value?.children[0].lastChild as HTMLElement

    if (knobEl && rotation >= -90 && rotation <= 90) {
      const newRotation = normalize(rotation, -90, 90)
      setRotation(newRotation)
      knobEl.style.transform = `rotate(${rotation}deg)`
    }
  }
}
function setRotation(rotation: number) {
  const rotationString = rotation.toPrecision(1)
  current_rotation.value = rotationString
  emits('update:modelValue', rotationString)
}
function normalize(value: number, min: number, max: number) {
  return (value - min) / (max - min)
}
watch(dragging_knob, (isDragging) => {
  if (isDragging) {
    window.addEventListener('mousemove', drag_rotate)
    window.addEventListener('touchmove', drag_rotate)
  }
  if (!isDragging) {
    window.removeEventListener('mousemove', drag_rotate)
    window.removeEventListener('touchmove', drag_rotate)
  }
})
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
.rotation-knob {
  display: grid;
  grid-template-columns: auto 1fr auto;
  height: fit-content;
  row-gap: 10px;
  width: 100%;
  max-width: 120px;
  label {
    color: variables.$color-neutral__greige-light;
    grid-row: 1;
    grid-column: 1 / 3;
    text-transform: capitalize;
    text-align: center;
    @include variables.font-size-paragraph__small;
  }
  .knob {
    @include variables.backdrop-gradient;
    border-radius: 50% 50%;
    cursor: grab;
    display: inline-block;
    height: 82px;
    width: 82px;
    &-wrapper {
      display: flex;
      flex-direction: column;
      grid-column: 1 / 3;
      grid-row: 2;
      justify-content: center;
      justify-self: center;
      row-gap: 10px;
      text-align: center;
      width: fit-content;
    }
  }
  .infobox {
    align-self: flex-end;
    grid-column: 3;
    grid-row: 2;
  }
  @media screen and (min-width: 768px) {
    .knob-wrapper {
      height: 68px;
      width: 68px;
    }
    .knob {
      height: 78px;
      width: 78px;
    }
  }
  @media screen and (min-width: 1024px) {
    gap: 15px;
    .knob-wrapper {
      height: 72px;
      width: 72px;
    }
  }
  .knob {
    height: 82px;
    width: 82px;
  }
}
</style>
