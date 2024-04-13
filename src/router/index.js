import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

import chartsRouter from "./modules/charts";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },

      {
        path: "profile",
        name: "Profile",
        component: () => import("@/views/profile/index"),
        hidden: true,
        meta: { title: "个人信息" },
      },
    ],
  },
  // chartsRouter,
  // {
  //   path: "/dataanalysis",
  //   component: Layout,
  //   name: "dataAnalysis",
  //   children: [
  //     {
  //       path: "data1",
  //       name: "data1",
  //       component: () => import("@/views/dataanalysis/index"),
  //       meta: { title: "数据分析", icon: "build-fill" },
  //     },
  //   ],
  // },

  // {
  //   path: "/analysis",
  //   component: Layout,
  //   name: "Analysis",
  //   meta: { title: "分析", icon: "international" },
  //   children: [
  //     {
  //       path: "dataanalaysis",
  //       name: "dataAnalysis",
  //       component: () => import("@/views/analysis/dataanalysis"),
  //       meta: { title: "数据分析", icon: "form" },
  //     },
  //     {
  //       path: "useranalysis",
  //       name: "userAnalysis",
  //       component: () => import("@/views/analysis/useranalysis"),
  //       meta: { title: "用户分析", icon: "form" },
  //     },
  //   ],
  // },

  // {
  //   path: "/page1",
  //   component: Layout,
  //   redirect: "/page1/page1",
  //   name: "page1",
  //   meta: { title: "界面1", icon: "build" },
  //   children: [
  //     {
  //       path: "page1",
  //       name: "page1",
  //       component: () => import("@/views/page1/page1"),
  //       meta: { title: "page1", icon: "build-fill" },
  //     },
  //     {
  //       path: "page2",
  //       name: "page2",
  //       component: () => import("@/views/page1/page2"),
  //       meta: { title: "page2", icon: "build-fill" },
  //     },
  //     {
  //       path: "page3",
  //       name: "page3",
  //       component: () => import("@/views/page1/page3"),
  //       meta: { title: "page3", icon: "build-fill" },
  //     },
  //   ],
  // },

  // {
  //   path: "/page2",
  //   component: Layout,
  //   redirect: "/page2/page1",
  //   name: "page2",
  //   meta: { title: "界面2", icon: "build" },
  //   children: [
  //     {
  //       path: "page1",
  //       name: "page1",
  //       component: () => import("@/views/page2/page1"),
  //       meta: { title: "page1", icon: "build-fill" },
  //     },
  //     {
  //       path: "page2",
  //       name: "page2",
  //       component: () => import("@/views/page2/page2"),
  //       meta: { title: "page2", icon: "build-fill" },
  //     },
  //     {
  //       path: "page3",
  //       name: "page3",
  //       component: () => import("@/views/page2/page3"),
  //       meta: { title: "page3", icon: "build-fill" },
  //     },
  //   ],
  // },

  {
    path: "/sys",
    component: Layout,
    redirect: "/sys/user",
    name: "sysManage",
    meta: { title: "系统管理", icon: "el-icon-s-help" },
    children: [
      {
        path: "user",
        name: "user",
        component: () => import("@/views/sys/user"),
        meta: { title: "用户管理", icon: "user" },
      },
      {
        path: "role",
        name: "role",
        component: () => import("@/views/sys/role"),
        meta: { title: "角色管理", icon: "tree" },
      },
    ],
  },

  // {
  //   path: "/test",
  //   component: Layout,
  //   redirect: "/test/test1",
  //   name: "test",
  //   meta: { title: "测试模块", icon: "build" },
  //   children: [
  //     {
  //       path: "test1",
  //       name: "test1",
  //       component: () => import("@/views/test/test1"),
  //       meta: { title: "测试模块1", icon: "build-fill" },
  //     },
  //     {
  //       path: "test2",
  //       name: "test2",
  //       component: () => import("@/views/test/test2"),
  //       meta: { title: "测试模块2", icon: "build-fill" },
  //     },
  //     {
  //       path: "test3",
  //       name: "test3",
  //       component: () => import("@/views/test/test3"),
  //       meta: { title: "测试模块3", icon: "build-fill" },
  //     },
  //   ],
  // },
  //
  // {
  //   path: "/form",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "index",
  //       name: "Form",
  //       component: () => import("@/views/form/index"),
  //       meta: { title: "Form", icon: "form" },
  //     },
  //   ],
  // },
  //

  // {
  //   path: "/nested",
  //   component: Layout,
  //   redirect: "/nested/menu1",
  //   name: "Nested",
  //   meta: {
  //     title: "Nested",
  //     icon: "nested",
  //   },
  //   children: [
  //     {
  //       path: "menu1",
  //       component: () => import("@/views/nested/menu1/index"), // Parent router-view
  //       name: "Menu1",
  //       meta: { title: "Menu1" },
  //       children: [
  //         {
  //           path: "menu1-1",
  //           component: () => import("@/views/nested/menu1/menu1-1"),
  //           name: "Menu1-1",
  //           meta: { title: "Menu1-1" },
  //         },
  //         {
  //           path: "menu1-2",
  //           component: () => import("@/views/nested/menu1/menu1-2"),
  //           name: "Menu1-2",
  //           meta: { title: "Menu1-2" },
  //           children: [
  //             {
  //               path: "menu1-2-1",
  //               component: () =>
  //                 import("@/views/nested/menu1/menu1-2/menu1-2-1"),
  //               name: "Menu1-2-1",
  //               meta: { title: "Menu1-2-1" },
  //             },
  //             {
  //               path: "menu1-2-2",
  //               component: () =>
  //                 import("@/views/nested/menu1/menu1-2/menu1-2-2"),
  //               name: "Menu1-2-2",
  //               meta: { title: "Menu1-2-2" },
  //             },
  //           ],
  //         },
  //         {
  //           path: "menu1-3",
  //           component: () => import("@/views/nested/menu1/menu1-3"),
  //           name: "Menu1-3",
  //           meta: { title: "Menu1-3" },
  //         },
  //       ],
  //     },
  //     {
  //       path: "menu2",
  //       component: () => import("@/views/nested/menu2/index"),
  //       name: "Menu2",
  //       meta: { title: "menu2" },
  //     },
  //   ],
  // },
  //
  // {
  //   path: "external-link",
  //   component: Layout,
  //   children: [
  //     {
  //       path: "https://panjiachen.github.io/vue-element-admin-site/#/",
  //       meta: { title: "External Link", icon: "link" },
  //     },
  //   ],
  // },
  //
  // // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
