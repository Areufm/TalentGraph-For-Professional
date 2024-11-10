import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/home/index.vue";
import MainLayout from "@/components/MainLayout/MainLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/error/404.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: { title: "登录账户" },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/register/index.vue"),
    meta: { title: "注册账户" },
  },
  {
    path: "/",
    redirect: "/home",
    component: MainLayout,
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
        meta: { title: "首页" },
      },
      {
        path: "/work-info/neo4j=:neo4j",
        name: "WorkInfo",
        component: () => import("@/views/work-info/index.vue"),
        meta: { title: "工作详细信息" },
      },
      {
        path: "/recommend",
        name: "Recommend",
        component: () => import("@/views/recommend_work/index.vue"),
        meta: { title: "推荐岗位" },
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/profile/index.vue"),
        meta: { title: "个人信息" },
      },
      {
        path: "/research/query=:query",
        name: "Research",
        component: () => import("@/views/research/index.vue"),
        meta: { title: "搜索结果" },
      },
    ],
  },
  {
    path: "/form",
    name: "Form",
    component: () => import("@/views/form/index.vue"),
    meta: { title: "在线填写" },
  },
];

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }), // 每次跳转后滚动条回到顶部
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  window.document.title = to.meta.title
    ? to.meta.title + " - 职业猫"
    : "职业猫";
  next();
});

export default router;
