<template>
  <div class="rotation-knob">
    <label>{{ title.replace('target_', '') }}</label>
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
import KnobSVG from '@/components/atoms/KnobSVG.vue'
import InfoTooltip from '@/components/atoms/InfoTooltip.vue'

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

const knob = ref<HTMLElement>()
const current_rotation = ref<string>('')
const dragging_knob = ref<boolean>(false)
const { title, description } = toRefs(props)

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

    let radianDegrees: number =
      e instanceof TouchEvent
        ? Math.atan2(e.touches[0].pageY - mouseY, e.touches[0].pageX - mouseX)
        : Math.atan2(e.pageY - mouseY, e.pageX - mouseX)

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

  label {
    color: variables.$color-neutral__greige-light;
    grid-row: 1;
    grid-column: 1 / 3;
    justify-self: center;
    text-transform: capitalize;
    @include variables.font-size-paragraph__small;
  }
  .infobox {
    align-self: flex-end;
    grid-column: 3;
    grid-row: 2;
  }
}
.knob {
  @include variables.backdrop-gradient;
  border-radius: 50% 50%;
  cursor: grab;
  display: inline-block;
  height: 72px;
  width: 72px;

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
</style>
