<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { reactive, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { usePostsStore } from '@/stores/posts';

const { errors } = storeToRefs(usePostsStore());
const { createPost } = usePostsStore();

const MAX_BODY_LENGTH = 600;

const formData = reactive({
  title: '',
  body: ''
});

const remainingChars = computed(() => MAX_BODY_LENGTH - formData.body.length);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Create Post</CardTitle>
      <CardDescription>Create a new post</CardDescription>
    </CardHeader>

    <CardContent>
      <form @submit.prevent="() => createPost(formData)" class="space-y-4">
        <div class="space-y-2">
          <Label for="title">Title</Label>
          <Input name="title" v-model="formData.title" />
          <p v-if="errors.title" class="text-red-400 text-sm font-light">
            {{ errors.title[0] }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="body">Body</Label>
          <Textarea name="body" v-model="formData.body" rows="6" :maxlength="MAX_BODY_LENGTH" />
          <div class="flex justify-between text-sm text-gray-500">
            <p v-if="errors.body" class="text-red-400 font-light">
              {{ errors.body[0] }}
            </p>
            <span>{{ remainingChars }} / {{ MAX_BODY_LENGTH }}</span>
          </div>
        </div>

        <Button type="submit" class="w-full"
          :disabled="formData.body.length === 0 || formData.body.length > MAX_BODY_LENGTH">
          New Post
        </Button>
      </form>
    </CardContent>
  </Card>
</template>