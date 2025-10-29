<script setup lang="ts">
import { defineProps } from 'vue';
import { Card, CardContent, CardDescription, CardFooter, CardTitle, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

import { formatDistanceToNow, parseISO } from 'date-fns';

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
    }
  };
  user?: {
    id: number;
    name: string;
    image?: string;
  }
}>();

</script>

<template>
  <Card class="flex flex-col justify-around">
    <CardHeader class="flex items-center w-full gap-2">
      <CardTitle>
        <Avatar class="size-12 cursor-pointer">
          <AvatarImage :src="props.post.user?.image || 'user.png'" :alt="props.post.user?.name" class=" object-cover" />
          <AvatarFallback>{{ props.post.user?.name.charAt(0) }}</AvatarFallback>
        </Avatar>
      </CardTitle>
      <CardDescription>
        {{ props.post.user.name || 'Unknown' }}
      </CardDescription>
    </CardHeader>

    <CardContent class="space-y-4">
      <CardTitle>{{ props.post.title }}</CardTitle>
      <article class=" line-clamp-2 text-foreground text-md font-light">
        {{ props.post.body }}
      </article>
      <hr class="px-1">
    </CardContent>
    <CardFooter>
      <p class="text-md font-light text-muted-foreground">
        {{ formatTimeAgo(props.post.updated_at) }}
      </p>
    </CardFooter>
  </Card>
</template>
