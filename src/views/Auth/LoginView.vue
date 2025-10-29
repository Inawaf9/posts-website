<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { reactive } from 'vue';


const errors = storeToRefs(useAuthStore()).errors;
const { authenticate } = useAuthStore();

const formData = reactive({
  email: '',
  password: '',
})

</script>

<template>
  <Card class="lg:w-2/3 mx-auto mt-10">
    <CardHeader>
      <CardTitle class="text-center">Login</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="authenticate('login', formData)" class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input name='email' type="email" v-model='formData.email' />
        </div>
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input name='password' type="password" v-model='formData.password' />
        </div>
        <p v-if='errors.credentials' class="text-red-400 text-small font-light">{{ errors.credentials }}</p>
        <Button type="submit" class="w-full">Login</Button>
      </form>
    </CardContent>
    <CardFooter>
      <p class="text-center text-sm text-muted-foreground">
        Don't have an account?
        <RouterLink to="/register" class="text-primary hover:underline cursor-pointer">Register</RouterLink>
      </p>
    </CardFooter>
  </Card>
</template>
