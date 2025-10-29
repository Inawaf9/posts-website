<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import ThemeToggle from '@/components/theme-toggle.vue';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Icon } from '@iconify/vue';

const authStore = useAuthStore();

function logout() {
  authStore.logout();
}
</script>

<template>
  <div class="w-full flex items-center justify-between">
    <nav class="hidden lg:block">
      <ul class="flex items-center justify-center gap-4">
        <li>
          <Button variant="link" as-child>
            <RouterLink to="/" active-class="underline">Home</RouterLink>
          </Button>
        </li>
        <li v-if="authStore.user">
          <Button variant="link" as-child>
            <RouterLink to="/me/posts/new" active-class="underline">Create Post</RouterLink>
          </Button>
        </li>
      </ul>
    </nav>
    <nav class="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Icon icon="mdi:menu" class="size-8" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>
              <ul class="flex flex-col items-center justify-center gap-4">
                <li>
                  <Button variant="link" as-child>
                    <RouterLink to="/" active-class="underline">Home</RouterLink>
                  </Button>
                </li>
                <li v-if="authStore.user">
                  <Button variant="link" as-child>
                    <RouterLink to="/me/posts/new" active-class="underline">Create Post</RouterLink>
                  </Button>
                </li>
              </ul>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
    <div class="flex items-center gap-6">
      <div v-if="!authStore.user" class="space-x-4">
        <Button as-child size="sm" variant="ghost">
          <RouterLink to="/login" active-class="underline">Login</RouterLink>
        </Button>
        <Button as-child size="sm" variant="ghost">
          <RouterLink to="/register" active-class="underline">Register</RouterLink>
        </Button>
      </div>
      <DropdownMenu v-else>
        <DropdownMenuTrigger as-child>
          <Avatar class="size-12 cursor-pointer">
            <AvatarImage :src="authStore.user?.image || 'user.png'" :alt="authStore.user?.name" class=" object-cover" />
            <AvatarFallback>{{ authStore.user?.name.charAt(0) }}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <!-- <DropdownMenuItem as-child>
            <RouterLink to="/me/posts" class="w-full">My Posts</RouterLink>
          </DropdownMenuItem> -->
          <DropdownMenuItem as-child>
            <RouterLink to="/me/settings">Settings</RouterLink>
          </DropdownMenuItem>
          <DropdownMenuItem as-child>
            <Button type="button" size="sm" variant='destructive' class="cursor-pointer w-full"
              @click="logout">
              <Icon icon="mdi:logout" class="inline mr-1" />
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ThemeToggle />
    </div>
  </div>
</template>
