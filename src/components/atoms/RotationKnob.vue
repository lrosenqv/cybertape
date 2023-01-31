<template>
  <div ref="knob_wrapper" class="knob-wrapper">
    <svg fill="none" width="100" height="100" viewBox="0 0 100 100">
      <defs>
        <radialGradient id="knob-gradient" cx="80%" cy="40%" fx="85%" fy="25%" r="60%">
          <stop offset="9%" stop-color="white" stop-opacity="0.4" />
          <stop offset="100%" stop-color="black" stop-opacity="0.3" />
        </radialGradient>

        <pattern id="knob-top-pattern" height="100" width="100" patternUnits="userSpaceOnUse">
          <image height="100" width="100" xlink:href="@/assets/KnobTopCircle.jpg" />
        </pattern>

        <pattern id="knob-bottom-pattern" height="100" width="100" patternUnits="userSpaceOnUse">
          <image height="100" width="100" xlink:href="@/assets/TextureDark.png" />
        </pattern>
        <clipPath id="overlay-clip">
          <circle cx="50" cy="50" r="47" />
        </clipPath>
      </defs>
      <g class="knob">
        <circle
          class="knob-circle-bottom"
          cx="50"
          cy="50"
          r="47"
          fill="url(#knob-bottom-pattern)"
        />
        <circle
          class="knob-circle-top"
          cx="50"
          cy="50"
          r="33"
          fill="url(#knob-top-pattern)"
          stroke="#BBBBBB"
          stroke-width="1.5"
        />
        <rect
          ref="knob"
          class="knob-pointer"
          width="2.5"
          height="5"
          x="49"
          y="7"
          rx="3"
          ry="1"
          fill="white"
        />
        <circle
          class="knob-overlay"
          cx="50"
          cy="50"
          r="48"
          fill="url(#knob-gradient)"
          clipPath="url(#overlay-clip)"
          @mousedown="drag_start"
          @mouseup="drag_end"
        />
      </g>
    </svg>
    <!-- <div class="path">
      <svg>
        <path id="arc1" fill="none" stroke="#446688" stroke-width="20" />
      </svg>
    </div> -->
    <!-- <input type="range" min="0" max="1" step="0.01" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const knob = ref<HTMLElement>()
const knob_wrapper = ref<HTMLElement>()

const current_rotation = ref<number>(0)
const rotationSnap: number = 5

const dragging_knob = ref<boolean>(false)

function drag_start() {
  dragging_knob.value = true
}
function drag_end() {
  dragging_knob.value = false
}
function drag_rotate(e: MouseEvent) {
  const rect = knob_wrapper.value?.getBoundingClientRect()
  if (rect) {
    let mouseX: number = rect.left + rect.width / 2
    let mouseY: number = rect.top + rect.height / 2
    let radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY)
    let rotation = radianDegrees * (180 / Math.PI) * -1 + 180
    if (knob.value) knob.value.style.transform = `rotate(${rotation}deg)`
  }
}
watch(dragging_knob, (isDragging) => {
  if (isDragging) {
    window.addEventListener('mousemove', drag_rotate, false)
  }
})
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.knob-wrapper {
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
  display: inline-block;
  height: 72px;
  width: 72px;
}
svg {
  height: 100%;
  width: 100%;
}
.knob-pointer {
  transform-origin: center center;
}
.knob-overlay {
  cursor: grab;
}
</style>
