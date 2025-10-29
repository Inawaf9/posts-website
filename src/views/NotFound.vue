<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/vue';

</script>
<template>
    <div class=" flex flex-col items-center justify-center text-center">
        <h1 class="text-6xl font-bold">404</h1>
        <p class="text-xl text-muted-foreground mt-2">
            <Icon icon="mdi:magnify-close" class="inline-block w-6 h-6" />
            Page Not Found
        </p>
        <Button as-child class="mt-4" variant="link">
            <RouterLink to="/">
                Go Home
            </RouterLink>
        </Button>
    </div>
</template>