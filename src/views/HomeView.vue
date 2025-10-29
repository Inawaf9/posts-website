<script setup lang="ts">

import PostCard from '@/components/post-card.vue';
import PostModal from '@/components/post-modal.vue';
import { useAuthStore } from '@/stores/auth';
import { usePostsStore } from '@/stores/posts';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const posts = storeToRefs(usePostsStore()).posts;
const user = storeToRefs(useAuthStore()).user;

onMounted(async () => {
  await usePostsStore().getPosts();
});
</script>

<template>
  <div>
    <div v-if="posts.length <= 0" class="w-full">
      <h1 class="text-2xl font-bold text-center">No posts available</h1>
    </div>
    <div v-else>
      <h1 class="text-2xl font-bold text-center mb-4">Posts</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PostModal v-for="post in posts" :key="post.id" :post="post" :user="user" />
      </div>
    </div>
  </div>
</template>
