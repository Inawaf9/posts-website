<script setup lang="ts">
import NavBar from '@/components/nav-bar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="px-8 py-8">
    <NavBar />
  </header>
  <main class="container px-4 md:px-6 lg:px-8 lg:max-w-7xl mx-auto">
    <RouterView />
  </main>
  <footer>
    <div class="text-center py-8 text-sm text-muted-foreground">
      &copy; 2025 My Posts App. All rights reserved.
    </div>
  </footer>
</template>

