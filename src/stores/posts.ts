import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const usePostsStore = defineStore("posts", {
  state: () => {
    return {
      posts: [],
      errors: {},
      post: null,
    };
  },
  actions: {
    async createPost(formData: object) {
      try {
        const res = await fetch("/api/posts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          method: "POST",
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          this.posts.push(data);
          this.errors = {};

          this.router.push({ name: "home" });
        } else {
          this.errors = data.errors || {};
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    async getPosts() {
      try {
        const res = await fetch("/api/posts", {
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          this.posts = data;
          this.errors = {};
        } else {
          this.errors = data.errors || {};
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    async getPost(id: number) {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "GET",
        });
        const data = await res.json();
        if (res.ok) {
          this.post = data.post;
        } else {
          this.errors = data.errors || {};
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    },
    async editPost(post: object & { id: number, user_id: number }, formData: object) {
      try {
        const authStore = useAuthStore();
        if (authStore.user.id === post.user_id) {
          const res = await fetch(`/api/posts/${post.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            method: "PUT",
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (res.ok) {
            // const index = this.posts.findIndex((post: { id: number }) => post.id === post.id);
            // if (index !== -1) {
            //   this.posts[index] = data;
            // }
            await this.getPosts();
            this.errors = {};

            this.router.push({ name: "home" });
          } else {
            this.errors = data.errors || {};
          }
        }
      } catch (error) {
        console.error("Error editing post:", error);
      }
    },
    async deletePost(post: object & { id: number, user_id: number }) {
      try {
        const authStore = useAuthStore();
        if (post.user_id === authStore.user?.id) {
          const res = await fetch(`/api/posts/${post.id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            method: "DELETE",
          });
          if (res.ok) {
            this.errors = {};
            await this.getPosts();
            this.router.push({ name: "home" });

          } else {
            const data = await res.json();
            this.errors = data.errors || {};
          }
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }

  },

});
