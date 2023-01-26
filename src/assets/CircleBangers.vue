<template>
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <defs>
      <path
        id="circle"
        d="
        M 50, 50
        m -37, 0
        a 37,37 0 1,1 74,0
        a 37,37 0 1,1 -74,0"
      />
    </defs>
    <text font-size="9" textLength="228" word-spacing="2" lengthAdjust="spacing">
      <textPath xlink:href="#circle">bangers - bangers - bangers - bangers - bangers -</textPath>
    </text>
  </svg>
</template>

<style lang="scss" scoped>
@use '@/style/variables.scss';

svg {
  // animation: rotate 20s normal linear infinite;
}
</style>
