<template>
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

    <circle class="knob-circle-bottom" r="47" fill="url(#knob-bottom-pattern)" />
    <circle class="knob-circle-top" r="33" fill="url(#knob-top-pattern)" />
    <circle class="knob-overlay" r="48" fill="url(#knob-gradient)" clipPath="url(#overlay-clip)" />
    <rect class="knob-pointer" width="3" height="6" x="49" y="7" fill="white" />
  </svg>
</template>

<style lang="scss" scoped>
@use '@/style/variables.scss';

svg {
  height: 100%;
  width: 100%;

  circle {
    cx: 50;
    cy: 50;
  }
  .knob {
    &-circle-top {
      stroke: #bbbbbb;
      stroke-width: 1.5;
    }
    &-pointer {
      transform-origin: center center;
      rx: 3;
      ry: 2;
    }
  }
}
</style>
