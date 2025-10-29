<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { onMounted, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { usePostsStore } from '@/stores/posts';
import { useRoute } from 'vue-router';
import { Textarea } from '@/components/ui/textarea';

const route = useRoute()
const postId = route.params.id;
console.log(postId);
const errors = storeToRefs(usePostsStore()).errors;
const post = storeToRefs(usePostsStore()).post;
const { editPost, getPost } = usePostsStore();

const formData = reactive({
  title: '',
  body: ''
});

onMounted(async() => {
  await getPost(Number(postId));
  await Object.assign(formData, {
    title: post.value?.title,
    body: post.value?.body
  });
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Edit Post</CardTitle>
      <CardDescription>Edit your post</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="editPost(post, formData)" class="space-y-4">
        <div class="space-y-2">
          <Label for="title">Title</Label>
          <Input name="title" v-model="formData.title"  />
          <p v-if='errors.title' class="text-red-400 text-small font-light">{{ errors.title[0] }}</p>
        </div>
        <div class="space-y-2">
          <Label for="body">Body</Label>
          <Textarea name="body" v-model="formData.body" rows="6" ></Textarea>
          <p v-if='errors.body' class="text-red-400 text-small font-light">{{ errors.body[0] }}</p>
        </div>
        <Button type="submit" class="w-full">Update Post</Button>
      </form>
    </CardContent>
  </Card>
</template>
