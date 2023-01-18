<template>
  <div class="discover">
    <div class="categories">
      <div v-for="(item, index) in categories?.items" :key="index">
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCategories } from '@/services/api'
import type { ICategory } from '@/models/ICategory'

const categories = ref<ICategory>({ href: '', items: [], next: '' })

onMounted(async () => {
  categories.value = await getCategories()
})
</script>

<style lang="scss"></style>
