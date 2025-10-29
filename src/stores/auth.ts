import { defineStore } from "pinia";


export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: null,
      errors: {}
    };
  },

  actions: {
    async getUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          this.user = data;
        } else {
          this.user = null;
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },

    async authenticate(authRoute: "login" | "register", formData: object) {
      try {
        const res = await fetch(`/api/${authRoute}`, {
          method: "POST",
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          this.user = data.user;
          this.errors = {};
          localStorage.setItem("token", data.token);
          //redirect to home page
          this.router.push({ name: "home" });
        } else {
          this.errors = data.errors || {};
        }
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    },

    async logout() {
      try {
        const res = await fetch("/api/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.ok) {
          this.user = null;
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  }
});
