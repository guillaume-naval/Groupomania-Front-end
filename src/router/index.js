import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Profile.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import NotFound from "@/views/NotFound.vue";
import Profile from "@/views/Profile.vue";

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: "/profil",
    name: "Profile",
    component: Home,
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
    },
  },
  {
    name: "NotFound",
    path: "/:pathMatch(.*)",
    component: NotFound,
    meta: {
      title: "404 Not Found",
    },    
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profile,
    meta: {
      title: "Profil",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
