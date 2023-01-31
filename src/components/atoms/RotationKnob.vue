<template>
  <div class="knob-wrapper">
    <label>{{ title }}</label>
    <div ref="knob" class="knob" @mousedown="drag_start" @mouseup="drag_end">
      <KnobSVG />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from 'vue'
import KnobSVG from '@/components/atoms/KnobSVG.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
const emits = defineEmits<{
  (e: 'knobValue', value: string, title: string): void
}>()

const knob = ref<HTMLElement>()
const current_rotation = ref<string>('')
const dragging_knob = ref<boolean>(false)
const { title } = toRefs(props)

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
  emits('knobValue', rotationString, title.value)
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
.knob {
  background: linear-gradient(
    270.57deg,
    rgba(54, 54, 54, 0.2475) -28.6%,
    rgba(29, 28, 28, 0.0726) -1.86%,
    rgba(11, 11, 11, 0.2904) 58.5%,
    rgba(27, 26, 26, 0.0726) 105.93%,
    rgba(29, 29, 29, 0.0726) 136.97%
  );
  border-radius: 50% 50%;
  box-shadow: inset 0px 0px 5px 3px rgba(0, 0, 0, 0.26);
  cursor: grab;
  display: inline-block;
  height: 72px;
  width: 72px;

  &-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 10px;
    width: fit-content;

    label {
      color: variables.$color-neutral__greige-light;
      font-size: variables.$font-size-paragraph__small;
      width: fit-content;
    }
  }
}
</style>
