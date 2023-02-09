<template>
  <div ref="usercard" class="user-card">
    <img :src="currentUser.srcImg" />
    <div class="user-card-text">
      <a :href="currentUser.uri">{{ currentUser.userId }}</a>
      <ButtonBorder text="Log out" :secondary="true" @click="emits('logout')" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import ButtonBorder from '@/components/general/ButtonBorder.vue'
const store = useStore()

const emits = defineEmits<{
  (e: 'closeCard'): void
  (e: 'logout'): void
}>()

const currentUser = computed(() => store.state.currentUser)
const usercard = ref<HTMLDivElement>()

onMounted(() => {
  document.body.addEventListener('click', (e) => {
    if (e.target !== usercard.value) emits('closeCard')
  })
})
</script>

<style lang="scss" scoped>
@use '@/style/variables.scss';

.user-card {
  align-items: center;
  background-color: variables.$color-neutral__dark;
  border-top: 1px solid variables.$color-neutral__greige-dark;
  display: flex;
  gap: 10px;
  padding-top: variables.$padding-medium;

  img {
    border-radius: 50%;
    height: 60px;
    width: 60px;
  }
  &-text {
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: left;
    a {
      color: variables.$color-neutral__light;
      font-weight: 500;
      @include variables.font-size-paragraph;
    }
  }

  @media screen and (min-width: 768px) {
    border: none;
    border-radius: variables.$border-radius-medium;
    gap: 30px;
    padding: variables.$padding-medium variables.$padding-large;
    z-index: -1;
    @include variables.font-size-label;
    img {
      height: 75px;
      width: 75px;
    }
  }
  @media screen and (min-width: 1024px) {
    border-radius: variables.$border-radius-medium;
    gap: 30px;
    padding: variables.$padding-large variables.$padding-x-large;
    z-index: -1;
    @include variables.font-size-label;
    img {
      height: 75px;
      width: 75px;
    }
  }
}
</style>
