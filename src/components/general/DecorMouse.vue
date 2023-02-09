<template>
  <div class="scroll-mouse">
    <div class="scroll-mouse__wheel"></div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.scroll-mouse {
  border: 1px solid white;
  border-radius: 10px;
  width: 20px;
  height: 40px;
  &__wheel {
    animation: scroll-anim 2s cubic-bezier(0.6, 0.02, 1, 0.8) infinite;
    background-color: variables.$color-neutral__greige-light;
    border-radius: 10px;
    height: 8px;
    margin: 4px auto;
    position: relative;
    top: 0;
    width: 8px;
  }
}
@keyframes scroll-anim {
  0% {
    opacity: 0;
    top: 0;
  }
  40% {
    opacity: 1;
    height: 18px;
    top: 24%;
  }
  50% {
    height: 8px;
    top: 50%;
  }
  70% {
    opacity: 0;
    top: 50%;
  }
  100% {
    opacity: 0;
    top: 0%;
  }
}
</style>
