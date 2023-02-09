<template>
  <div id="start">
    <div id="start-text">
      <h1>Ready for some new mixes?</h1>
      <p>Log in to your Spotify account to try it out!</p>
      <ButtonBorder text="Log in" @on-click="authRequest" />
    </div>
    <div class="start-stripes">
      <div class="start-stripes-wrapper start-stripes-wrapper__1">
        <span v-for="stripe of 25" :key="stripe"></span>
      </div>
      <div class="start-stripes-wrapper start-stripes-wrapper__2">
        <span v-for="stripe of 25" :key="stripe"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ButtonBorder from '@/components/atoms/ButtonBorder.vue'
import { authRequest, getAccessToken } from '@/services/authorization'
import { onBeforeMount } from 'vue'

const params = new URLSearchParams(window.location.search)
const codeQuery = params.get('code')

onBeforeMount(() => {
  if (codeQuery) {
    getAccessToken(codeQuery)
  }
})
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';
#start {
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
  justify-content: space-around;
  padding-block: 20px 40px;

  @media screen and (min-width: 768px) {
    padding-block: 80px;
    gap: 15px;
  }
  &-text {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-inline: variables.$padding-large;

    @media screen and (min-width: 768px) {
      padding-inline: variables.$padding-body;
      gap: 40px;
    }

    h1 {
      font-weight: 600;
      margin: 0;
      @include variables.font-size-h2;
    }
    p {
      font-weight: 500;
    }

    button {
      width: fit-content;
    }
  }

  .start-stripes {
    display: flex;
    flex-direction: column;
    height: 30vh;
    justify-content: space-between;
    width: 100vw;

    @media screen and (min-width: 768px) {
      height: 35vh;
    }

    &-wrapper {
      display: flex;
      justify-content: space-between;

      &__2 {
        transform: rotate(180deg);
      }
      span {
        animation: animate 1.7s ease-in-out infinite;
        background-color: variables.$color-neutral__greige-light;
        height: 18vh;
        transform-origin: bottom;
        width: 2px;
      }
      @for $i from 1 through 30 {
        span:nth-child(#{$i}n) {
          animation-delay: #{$i * 0.1}s;
        }
      }
    }
  }
}

@keyframes animate {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.3);
  }
}
</style>
