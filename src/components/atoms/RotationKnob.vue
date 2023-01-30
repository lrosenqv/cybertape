<template>
  <div class="knob">
    <svg fill="none" width="100" height="100" viewBox="0 0 100 100">
      <defs>
        <pattern id="knob-top-pattern" height="100" width="100" patternUnits="userSpaceOnUse">
          <image height="100" width="100" xlink:href="@/assets/KnobTopCircle.jpg" />
        </pattern>
        <pattern id="knob-bottom-pattern" height="100" width="100" patternUnits="userSpaceOnUse">
          <image height="100" width="100" xlink:href="@/assets/TextureDark.png" />
        </pattern>

        <radialGradient id="knob-gradient" cx="80%" cy="40%" fx="85%" fy="25%" r="60%">
          <stop offset="9%" stop-color="white" stop-opacity="1" />
          <stop offset="100%" stop-color="black" stop-opacity="0.7" />
        </radialGradient>
      </defs>

      <circle id="knob-circle-bottom" cx="50" cy="50" r="47" fill="url(#knob-bottom-pattern)" />
      <circle id="knob-circle-top" cx="50" cy="50" r="33" fill="url(#knob-top-pattern)" />
      <rect width="2.5" height="5" x="49" y="7" rx="3" ry="1" fill="white" />
      <circle
        id="knob-circle-overlay"
        cx="50"
        cy="50"
        r="47"
        fill="url(#knob-gradient)"
        opacity="0.4"
      />
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.knob {
  cursor: grab;
  background: linear-gradient(
      270.57deg,
      rgba(54, 54, 54, 0.2475) -28.6%,
      rgba(29, 28, 28, 0.0726) -1.86%,
      rgba(11, 11, 11, 0.2904) 58.5%,
      rgba(27, 26, 26, 0.0726) 105.93%,
      rgba(29, 29, 29, 0.0726) 136.97%
    ),
    linear-gradient(
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
  height: 74px;
  width: 74px;
}
svg {
  height: 100%;
  width: 100%;

  #knob-circle-top {
    stroke: rgb(172, 172, 172);
    stroke-width: 1px;
  }
  #knob-circle-overlay {
    background-image: radial-gradient(farthest corner at 40px 40px, #ffffff 0%, #000000 100%);
  }
}
</style>
