import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue';
import RegisterView from '@/views/Auth/RegisterView.vue';
import { useAuthStore } from '@/stores/auth';
import LoginView from '@/views/Auth/LoginView.vue';
import CreatePostView from '@/views/Posts/CreatePostView.vue';
import EditPostView from '@/views/Posts/EditPostView.vue';
import NotFound from '@/views/NotFound.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        guest: true,
        title: 'Register',
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        guest: true,
        title: 'Login',
       }
    },
    {
      path: '/me/posts/new',
      name: 'create-post',
      component: CreatePostView,
      meta: {
        auth: true,
        title: 'Create Post',
       }
    },
    {
      path: '/me/posts/:id/edit',
      name: 'edit-post',
      component: () => EditPostView,
      meta: {
        auth: true,
        title: 'Edit Post',
       }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

router.beforeEach(async(to) => {
  const authStore = useAuthStore();
  await authStore.getUser();

  if(authStore.user && to.meta.guest ) {
  return { name: "home" };
  }
  if(!authStore.user && to.meta.auth ) {
    return { name: "login" };
  }
});

router.afterEach((to) => {
  document.title =  'Posts App - '+(to.meta.title as string) || "Posts App";
});

export default router
