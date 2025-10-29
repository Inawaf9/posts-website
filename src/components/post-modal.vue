<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import PostCard from './post-card.vue';
import { usePostsStore } from '@/stores/posts';

import { formatDistanceToNow, parseISO } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Icon } from '@iconify/vue';

function formatTimeAgo(dateString: string) {
  if (!dateString) return "غير محدد";
  const date = parseISO(dateString);
  const diffInHours = (new Date().getTime() - date.getTime()) / (1000 * 60 * 60);

  if (diffInHours < 24) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else {
    return date.toLocaleDateString();
  }
};

const props = defineProps<{
  post: {
    id: number;
    title: string;
    body: string;
    user_id: number;
    updated_at: string;
    user: {
      id: number;
      name: string;
      image?: string;
    };
  };
  user?: {
    id: number;
    name: string;
    image?: string;
  }
}>();

const { deletePost } = usePostsStore();

</script>

<template>
  <Dialog>
    <DialogTrigger class="cursor-pointer" as-child>
      <PostCard v-bind="props" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <div>
            <Avatar class="size-12 cursor-pointer">
              <AvatarImage :src="props.post.user?.image || 'user.png'" :alt="props.post.user?.name" class=" object-cover" />
              <AvatarFallback>{{ props.post.user?.name.charAt(0) }}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h2 class="text-sm text-muted-foreground">{{ props.post.user?.name }}</h2>
          </div>
        </DialogTitle>
        <DialogDescription class="flex flex-col justify-around space-y-4 mt-4 text-left">

          <DialogTitle>{{ props.post.title }}</DialogTitle>

          <article class=" text-foreground text-md font-light whitespace-pre-wrap">
            {{ props.post.body }}
          </article>

          <hr class="px-1">

          <p class="text-md font-light text-muted-foreground">
            {{ formatTimeAgo(props.post.updated_at) }}
          </p>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <div v-if="props.user && props.user.id === props.post.user_id" class="flex items-center justify-between w-full">
          <Button variant="link" as-child class="cursor-pointer flex items-center gap-.5">
            <Icon icon="mdi:pencil-outline" class="inline mr-1" />
            <RouterLink :to="`/me/posts/${props.post.id}/edit`">Edit Post</RouterLink>
          </Button>
          <form @submit.prevent="deletePost(props.post)">
            <Button type="submit" variant="link" class="text-red-400 cursor-pointer flex items-center gap-.5">
              <Icon icon="mdi:delete-outline" class="inline mr-1" />
              Delete Post
            </Button>
          </form>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
