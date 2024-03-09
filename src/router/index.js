import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/:pathMatch(.*)*", //
    component: () => import("@/views/error/404.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/register/index.vue"),
  },
  {
    path: "/workinfo",
    name: "WorkInfo",
    component: () => import("@/views/work_info/index.vue"),
  },
  {
    path: "/companyinfo",
    name: "CompanyInfo",
    component: () => import("@/views/company_info/index.vue"),
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: () => import("@/views/recommend_work/index.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/profile/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
