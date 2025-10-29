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
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

</script>

<template>
  <Card class="lg:w-2/3 mx-auto mt-10">
    <CardHeader>
      <CardTitle class="text-center">Register</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="authenticate('register', formData)" class="space-y-4">
        <div class="space-y-2">
          <Label for="name">Name</Label>
          <Input name='name' v-model='formData.name' />
          <p v-if='errors.name' class="text-red-400 text-small font-light">{{ errors.name[0] }}</p>
        </div>
        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input name='email' type="email" v-model='formData.email' />
          <p v-if='errors.email' class="text-red-400 text-small font-light">{{ errors.email[0] }}</p>
        </div>
        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input name='password' type="password" v-model='formData.password' />
          <p v-if='errors.password' class="text-red-400 text-small font-light">{{ errors.password[0] }}</p>
        </div>
        <div class="space-y-2">
          <Label for="password_confirmation">Confirm Password</Label>
          <Input name='password_confirmation' type="password" v-model='formData.password_confirmation' />
        </div>
        <Button type="submit" class="w-full">Register</Button>
      </form>
    </CardContent>
    <CardFooter>
      <p class="text-center text-sm text-muted-foreground">
        Already have an account?
        <RouterLink to="/login" class="text-primary hover:underline cursor-pointer">Login</RouterLink>
      </p>
    </CardFooter>
  </Card>
</template>
